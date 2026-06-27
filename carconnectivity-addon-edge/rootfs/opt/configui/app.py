"""Tiny Flask backend for the addon's custom configuration page.

Served behind Home Assistant Ingress (via nginx). It reads/writes the UI model
(STATE_PATH) and regenerates the CarConnectivity config (CONFIG_PATH) the addon
loads. All routes are relative, so they work under the Ingress base path.
"""
from __future__ import annotations

import json
import os
import socket
import threading

from flask import Flask, jsonify, request, send_from_directory

from const import STATE_PATH, CONFIG_PATH, kind_catalog
from generator import build_config, parse_config

# Existing addon-managed configs to import from on first open (in priority order).
_IMPORT_SOURCES = (
    CONFIG_PATH,
    "/config/carconnectivity.UI.json",
    "/config/carconnectivity.expert.json",
)

HERE = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder=os.path.join(HERE, "static"), static_url_path="")

_DEFAULT_STATE = {
    "accounts": [],
    "settings": {"mqtt": {}, "webui": {"enabled": False}},
}


def _read_json(path: str):
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (FileNotFoundError, ValueError):
        return None


def _load_state() -> dict:
    # 1) The page's own model is authoritative once it exists.
    own = _read_json(STATE_PATH)
    if own is not None:
        return own
    # 2) First open: import an existing addon config so the user edits what's live.
    for path in _IMPORT_SOURCES:
        cfg = _read_json(path)
        if cfg is not None:
            imported = parse_config(cfg)
            imported["_imported_from"] = path
            return imported
    # 3) Nothing yet — start fresh.
    return dict(_DEFAULT_STATE)


_MAX_ACCOUNTS = 50          # a household has a few vehicles, not 50
_MAX_PASSTHROUGH = 50       # unknown connectors/plugins preserved verbatim

# Serialise the STATE+CONFIG write pair so two concurrent saves (waitress runs
# several threads) cannot interleave and leave the two files out of sync.
_write_lock = threading.Lock()


def _ensure_shape(state) -> str | None:
    """Structural guard. Returns a human-readable error, or None if the payload is
    safe to process. Catches a malformed body before it can crash build_config."""
    if not isinstance(state, dict):
        return "Invalid payload: expected a JSON object"
    accounts = state.get("accounts", [])
    if not isinstance(accounts, list) or any(not isinstance(a, dict) for a in accounts):
        return "Invalid payload: 'accounts' must be a list of objects"
    if len(accounts) > _MAX_ACCOUNTS:
        return f"Too many accounts (max {_MAX_ACCOUNTS})"
    if not isinstance(state.get("settings", {}), dict):
        return "Invalid payload: 'settings' must be an object"
    for key in ("_passthrough_connectors", "_passthrough_plugins"):
        val = state.get(key, [])
        if not isinstance(val, list) or any(not isinstance(x, dict) for x in val):
            return f"Invalid payload: '{key}' must be a list of objects"
        if len(val) > _MAX_PASSTHROUGH:
            return f"Invalid payload: '{key}' too large"
    return None


def _atomic_write(path: str, data: dict) -> None:
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)
    os.replace(tmp, path)


@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.get("/api/brands")
def api_brands():
    return jsonify(kind_catalog())


@app.get("/api/webui")
def api_webui():
    """Whether the webui dashboard is actually reachable. nginx proxies '/' to the
    webui plugin on 127.0.0.1:4000 (its fixed internal port). The live routing —
    not the saved config flag — decides whether the Dashboard tab is shown."""
    up = False
    try:
        with socket.create_connection(("127.0.0.1", 4000), timeout=0.3):
            up = True
    except OSError:
        up = False
    return jsonify({"up": up})


@app.get("/api/state")
def api_get_state():
    return jsonify(_load_state())


@app.post("/api/state")
def api_post_state():
    state = request.get_json(force=True, silent=True)
    shape_err = _ensure_shape(state)
    if shape_err:
        return jsonify({"ok": False, "errors": [{"index": -1, "error": shape_err}]}), 400
    accounts = state.get("accounts") or []
    # Per-account validation driven by the kind's field schema, so the UI can
    # point at the offending row (fields differ per brand: VAG login, Volvo keys…).
    from const import KINDS
    from generator import build_connector
    errors = []
    for idx, acc in enumerate(accounts):
        kind = KINDS.get(acc.get("brand"))
        if not kind:
            errors.append({"index": idx, "error": "Brand is required"})
            continue
        missing = [f["label"] for f in kind["fields"] if not f.get("optional") and not acc.get(f["key"])]
        if missing:
            errors.append({"index": idx, "error": "Required: " + ", ".join(missing)})
            continue
        try:
            build_connector(acc)
        except ValueError as err:
            errors.append({"index": idx, "error": str(err)})
    if errors:
        return jsonify({"ok": False, "errors": errors}), 400

    try:
        config = build_config(state)
    except ValueError as err:
        return jsonify({"ok": False, "errors": [{"index": -1, "error": str(err)}]}), 400

    with _write_lock:
        _atomic_write(STATE_PATH, state)
        _atomic_write(CONFIG_PATH, config)

        # Once the page owns the config, retire the legacy tempio-era file so it is
        # not re-imported on a later first-open and does not linger in /config.
        # Renamed (not deleted) to .bak so the user can still recover it.
        legacy = "/config/carconnectivity.UI.json"
        try:
            if os.path.exists(legacy):
                os.replace(legacy, legacy + ".bak")
        except OSError:
            pass

    return jsonify({"ok": True, "connectors": len(config["carConnectivity"]["connectors"])})


if __name__ == "__main__":
    # 8099 is nginx's Ingress port; the config backend runs on a separate internal
    # port and nginx proxies the /configui/ path to it (cohabits with the webui).
    # Served with waitress (production WSGI server) instead of Flask's dev server.
    port = int(os.environ.get("CONFIGUI_PORT", "8098"))
    from waitress import serve
    serve(app, host="127.0.0.1", port=port, threads=4)
