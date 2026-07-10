"""Convert the UI model (accounts + settings) to ``carconnectivity.json`` and back.

Data-driven: every vehicle account has a `brand` (a KINDS key) and the fields its
kind declares (see const.KINDS). VAG kinds also carry an optional `data_source`.
MQTT + mqtt_homeassistant are always emitted (the HA backbone); webui/abrp are
emitted with a `disabled` flag. Connectors/plugins the page does not know are
preserved verbatim (passthrough).
"""
from __future__ import annotations

from typing import Any

from const import KINDS, SOURCE_EU_DATA_ACT, connector_for, resolve_source

_DEFAULT_LOG = "info"
_DEFAULT_API_LOG = "error"

_EU_BRAND_TO_KEY = {k["eu_brand"]: key for key, k in KINDS.items() if k.get("eu_brand")}
_MANU_CONN_TO_KEY = {k["manufacturer_connector"]: key for key, k in KINDS.items() if k.get("manufacturer_connector")}
_FIXED_CONN_TO_KIND = {k["connector"]: key for key, k in KINDS.items() if k.get("connector")}
_MANAGED_PLUGINS = {"mqtt", "mqtt_homeassistant", "webui", "abrp"}


def _field_value(field: dict, raw: Any) -> Any:
    if field.get("type") == "number":
        try:
            return int(raw)
        except (TypeError, ValueError):
            return raw
    return raw


def build_connector(account: dict[str, Any], api_log_level: str = _DEFAULT_API_LOG) -> dict[str, Any]:
    """Map one UI account to a CarConnectivity connector entry."""
    kind_key = account.get("brand")
    kind = KINDS.get(kind_key)
    if not kind:
        raise ValueError(f"Unknown brand '{kind_key}'")
    if kind.get("sources"):
        source = resolve_source(kind_key, account.get("data_source", "auto"))
        ctype, extra = connector_for(kind_key, source)
    else:
        ctype, extra = connector_for(kind_key, None)

    config: dict[str, Any] = dict(extra)  # brand for EU Data Act
    for f in kind["fields"]:
        v = account.get(f["key"])
        if v not in (None, ""):
            config[f["key"]] = _field_value(f, v)
    # Optional per-account level overrides; absent means "inherit the globals"
    # (log_level is then simply not written, api_log_level gets the global).
    if account.get("log_level"):
        config["log_level"] = account["log_level"]
    config["api_log_level"] = account.get("api_log_level") or api_log_level
    return {"type": ctype, "config": config}


def build_config(state: dict[str, Any]) -> dict[str, Any]:
    """Assemble the full carconnectivity.json from the UI state model."""
    accounts = state.get("accounts") or []
    settings = state.get("settings") or {}
    log_level = settings.get("log_level") or _DEFAULT_LOG
    api_log_level = settings.get("api_log_level") or _DEFAULT_API_LOG

    # Optional per-plugin log levels (e.g. {"mqtt": "debug"}). A missing/empty
    # entry means "inherit the global level" — nothing special is emitted, the
    # plugin gets the global level exactly as before.
    plugin_logs = settings.get("plugin_logs") or {}

    def _plugin_level(name: str) -> str:
        return plugin_logs.get(name) or log_level

    connectors: list[dict[str, Any]] = []
    for i, acc in enumerate(accounts):
        c = build_connector(acc, api_log_level)
        c["connector_id"] = f'{c["type"]}_{i + 1}'
        connectors.append(c)

    used_ids = {c.get("connector_id") for c in connectors}
    for pc in state.get("_passthrough_connectors") or []:
        pc = dict(pc)
        cid = pc.get("connector_id")
        if not cid or cid in used_ids:
            base, n = pc.get("type", "connector"), 1
            while f"{base}_{n}" in used_ids:
                n += 1
            cid = f"{base}_{n}"
            pc["connector_id"] = cid
        used_ids.add(cid)
        connectors.append(pc)

    mqtt = dict(settings.get("mqtt") or {})
    mqtt["log_level"] = _plugin_level("mqtt")
    plugins: list[dict[str, Any]] = [{"type": "mqtt", "config": mqtt}]

    webui = settings.get("webui") or {}
    webui_user = webui.get("username") or "autologin"
    plugins.append({
        "type": "webui",
        "disabled": not webui.get("enabled", False),
        "config": {
            "username": webui_user,
            "password": webui.get("password", ""),
            "app_config": {"LOGIN_DISABLED": webui_user == "autologin"},
            "log_level": _plugin_level("webui"),
        },
    })

    abrp = settings.get("abrp") or {}
    tokens = {t["vin"]: t["token"] for t in (abrp.get("tokens") or []) if t.get("vin") and t.get("token")}
    plugins.append({"type": "abrp", "disabled": not abrp.get("enabled", False),
                    "config": {"tokens": tokens, "log_level": _plugin_level("abrp")}})

    plugins.append({"type": "mqtt_homeassistant", "config": {"log_level": _plugin_level("mqtt_homeassistant")}})
    plugins.extend(state.get("_passthrough_plugins") or [])

    return {"carConnectivity": {"log_level": log_level, "connectors": connectors, "plugins": plugins}}


def parse_config(config: dict[str, Any]) -> dict[str, Any]:
    """Import an existing carconnectivity.json into the editable UI model."""
    cc = (config or {}).get("carConnectivity", {}) or {}
    accounts: list[dict[str, Any]] = []
    passthrough_connectors: list[dict[str, Any]] = []
    migrated: list[str] = []
    # Per-connector api_log_level values: the most common one is the global
    # setting, any other value is a per-account override (kept on the account).
    api_levels: list[str] = []
    account_api: list[tuple[dict[str, Any], str | None]] = []

    for c in cc.get("connectors", []) or []:
        ctype = c.get("type")
        cfg = c.get("config", {}) or {}
        if cfg.get("api_log_level"):
            api_levels.append(cfg["api_log_level"])

        data_source = None
        if ctype == "vw_eu_data_act":
            kind_key = _EU_BRAND_TO_KEY.get(cfg.get("brand"))
            data_source = SOURCE_EU_DATA_ACT
        elif ctype in _MANU_CONN_TO_KEY:
            kind_key = _MANU_CONN_TO_KEY[ctype]  # skoda / audi / volkswagen_na
        elif ctype == "seatcupra":
            kind_key = (cfg.get("brand") or "").lower()
            if kind_key not in KINDS:
                passthrough_connectors.append(c); continue
            data_source = SOURCE_EU_DATA_ACT
            migrated.append(KINDS[kind_key]["label"])
        elif ctype == "volkswagen":
            kind_key, data_source = "volkswagen", SOURCE_EU_DATA_ACT
            migrated.append(KINDS["volkswagen"]["label"])
        elif ctype in _FIXED_CONN_TO_KIND:
            kind_key = _FIXED_CONN_TO_KIND[ctype]  # volvo / renaultdacia / tronity
        else:
            passthrough_connectors.append(c); continue
        if not kind_key or kind_key not in KINDS:
            passthrough_connectors.append(c); continue

        acc: dict[str, Any] = {"brand": kind_key}
        if data_source:
            acc["data_source"] = data_source
        for f in KINDS[kind_key]["fields"]:
            if cfg.get(f["key"]) not in (None, ""):
                acc[f["key"]] = cfg[f["key"]]
        if cfg.get("log_level"):
            acc["log_level"] = cfg["log_level"]
        account_api.append((acc, cfg.get("api_log_level")))
        accounts.append(acc)

    plugins = cc.get("plugins", []) or []

    def _plugin(ptype):
        return next((p for p in plugins if p.get("type") == ptype), None)

    mqtt_p = _plugin("mqtt")
    mqtt = {k: v for k, v in (mqtt_p.get("config", {}) if mqtt_p else {}).items()
            if k in ("broker", "port", "username", "password")}

    webui_p = _plugin("webui")
    webui = {"enabled": bool(webui_p) and not webui_p.get("disabled", False)}
    if webui_p:
        wc = webui_p.get("config", {}) or {}
        webui["username"] = wc.get("username", "autologin")
        webui["password"] = wc.get("password", "")

    abrp_p = _plugin("abrp")
    abrp = {"enabled": bool(abrp_p) and not abrp_p.get("disabled", False),
            "tokens": [{"vin": k, "token": v} for k, v in ((abrp_p.get("config", {}) or {}).get("tokens", {}) if abrp_p else {}).items()]}

    # Global api_log_level = the most common per-connector value (first seen
    # wins a tie); accounts whose value differs carry it as an override.
    api_log_level = None
    if api_levels:
        api_log_level = max(dict.fromkeys(api_levels),
                            key=lambda v: api_levels.count(v))
        for acc, v in account_api:
            if v and v != api_log_level:
                acc["api_log_level"] = v

    # A plugin whose log_level differs from the global one is a per-plugin
    # override; equal values are just the inherited default and stay implicit.
    global_log = cc.get("log_level") or _DEFAULT_LOG
    plugin_logs: dict[str, str] = {}
    for ptype in ("mqtt", "webui", "abrp", "mqtt_homeassistant"):
        p = _plugin(ptype)
        lvl = (p.get("config", {}) or {}).get("log_level") if p else None
        if lvl and lvl != global_log:
            plugin_logs[ptype] = lvl

    settings = {
        "log_level": global_log,
        "api_log_level": api_log_level or _DEFAULT_API_LOG,
        "mqtt": mqtt,
        "webui": webui,
        "abrp": abrp,
        "plugin_logs": plugin_logs,
    }

    passthrough_plugins = [p for p in plugins if p.get("type") not in _MANAGED_PLUGINS]

    return {
        "accounts": accounts,
        "settings": settings,
        "_passthrough_connectors": passthrough_connectors,
        "_passthrough_plugins": passthrough_plugins,
        "_migrated": migrated,
    }
