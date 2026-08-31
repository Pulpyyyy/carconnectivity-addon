"""Startup migration: switch the blocked manufacturer brands to EU Data Act.

SEAT, Cupra and Volkswagen (Europe) no longer work through their manufacturer
connectors (seatcupra / volkswagen) — only through EU Data Act. This rewrites any
such connector in place, in ANY config the addon loads (expert.json or the
generated UI config), so the migration is not limited to the config page.

Škoda gets the same treatment when its config predates connector v0.13: the
public-API connector raises AuthenticationError without an `api_key`, and the
core instantiates connectors without a net, so one stale Škoda entry would stop
the whole addon. Moving it to EU Data Act (where the username/password still
work) keeps the addon booting; the user can switch back after creating an API
key in the MyŠkoda app.

Idempotent: a config already on EU Data Act is left unchanged. Other connectors
(Volvo, Audi/VW-NA manufacturer, Škoda with an api_key, …) are untouched.

The same pass also fills a missing MQTT broker (see ensure_mqtt_broker), the one
omission that stops CarConnectivity from starting at all.

CLI:  python migrate.py <in.json> <out.json>   # prints migrated brand labels
"""
from __future__ import annotations

import json
import os
import sys
from typing import Any

from const import DEFAULT_MQTT_BROKER, DEFAULT_MQTT_PORT, KINDS


def migrate_config(config: dict[str, Any]) -> tuple[dict[str, Any], list[str]]:
    """Migrate blocked connectors to vw_eu_data_act in place. Returns (config, labels)."""
    cc = config.get("carConnectivity") if isinstance(config, dict) else None
    if not isinstance(cc, dict):
        return config, []
    connectors = cc.get("connectors") or []
    migrated: list[str] = []

    for c in connectors:
        ctype = c.get("type")
        cfg = c.setdefault("config", {})
        if ctype == "seatcupra":
            kind_key = (cfg.get("brand") or "").lower()
            kind = KINDS.get(kind_key)
            if not kind or not kind.get("eu_brand"):
                continue  # unknown brand → leave as-is
            c["type"] = "vw_eu_data_act"
            cfg["brand"] = kind["eu_brand"]
            migrated.append(kind["label"])
        elif ctype == "volkswagen":
            c["type"] = "vw_eu_data_act"
            cfg["brand"] = KINDS["volkswagen"]["eu_brand"]
            migrated.append(KINDS["volkswagen"]["label"])
        elif ctype == "skoda" and not cfg.get("api_key") and not cfg.get("vins"):
            c["type"] = "vw_eu_data_act"
            cfg["brand"] = KINDS["skoda"]["eu_brand"]
            migrated.append(KINDS["skoda"]["label"])

    if migrated:
        _ensure_unique_ids(connectors)
    return config, migrated


def migrate_state(state: dict[str, Any]) -> list[str]:
    """Same Škoda pre-v0.13 move, but on the page's own model (STATE_PATH).

    The state file is authoritative once it exists and is never re-parsed from
    the generated config, so without this pass the page would keep showing a
    manufacturer-source Škoda account whose runtime copy migrate_config already
    rewrote. Returns the migrated brand labels (for the page notice)."""
    labels: list[str] = []
    for acc in state.get("accounts") or []:
        if (acc.get("brand") == "skoda"
                and acc.get("data_source") != "eu_data_act"
                and not acc.get("api_key") and not acc.get("vins")
                and (acc.get("username") or acc.get("password"))):
            acc["data_source"] = "eu_data_act"
            labels.append(KINDS["skoda"]["label"])
    return labels


def inject_locale(config: dict[str, Any], country: str, lang: str, na_country: str) -> None:
    """Fill country/language from the HA locale where the config left them unset.

    The options→tempio path injects these via sed; the page/expert path does not,
    so do it here for vw_eu_data_act (OIDC state) and volkswagen_na (region).
    """
    cc = config.get("carConnectivity") if isinstance(config, dict) else None
    if not isinstance(cc, dict):
        return
    for c in cc.get("connectors") or []:
        ctype = c.get("type")
        cfg = c.setdefault("config", {})
        if ctype == "vw_eu_data_act":
            if country and not cfg.get("country"):
                cfg["country"] = country
            if lang and not cfg.get("language"):
                cfg["language"] = lang
        elif ctype == "volkswagen_na":
            if na_country and not cfg.get("country"):
                cfg["country"] = na_country


def ensure_mqtt_broker(config: dict[str, Any]) -> bool:
    """Fill an enabled mqtt plugin's missing broker/port. Returns True if it did.

    CarConnectivity exits at startup when the broker is missing ("No MQTT broker
    specified in config"), and a config page older than 0.8.17 could save one
    without it. Repairing the RUNTIME copy makes such an addon boot again on
    update instead of leaving the user with a container that never starts; the
    source config is untouched, so the page still shows the field as they left it.
    """
    cc = config.get("carConnectivity") if isinstance(config, dict) else None
    if not isinstance(cc, dict):
        return False
    for plugin in cc.get("plugins") or []:
        if not isinstance(plugin, dict) or plugin.get("type") != "mqtt" or plugin.get("disabled"):
            continue
        cfg = plugin.setdefault("config", {})
        if not isinstance(cfg, dict) or cfg.get("broker"):
            return False
        cfg["broker"] = DEFAULT_MQTT_BROKER
        if not cfg.get("port"):
            cfg["port"] = DEFAULT_MQTT_PORT
        return True
    return False


def _ensure_unique_ids(connectors: list[dict[str, Any]]) -> None:
    """Give every connector a unique connector_id (migration can create duplicate
    vw_eu_data_act instances that would otherwise collide)."""
    seen: set[str] = set()
    for c in connectors:
        cid = c.get("connector_id") or c.get("type", "connector")
        if cid in seen:
            base, n = c.get("type", "connector"), 1
            while f"{base}_{n}" in seen:
                n += 1
            cid = f"{base}_{n}"
        c["connector_id"] = cid
        seen.add(cid)


def main(argv: list[str]) -> int:
    if len(argv) != 3:
        print("usage: migrate.py <in.json> <out.json>", file=sys.stderr)
        return 2
    with open(argv[1], "r", encoding="utf-8") as fh:
        config = json.load(fh)
    config, migrated = migrate_config(config)
    inject_locale(config, os.environ.get("HA_COUNTRY", ""), os.environ.get("HA_LANG", ""),
                  os.environ.get("NA_COUNTRY", ""))
    ensure_mqtt_broker(config)
    with open(argv[2], "w", encoding="utf-8") as fh:
        json.dump(config, fh, indent=2, ensure_ascii=False)
    # Printed for the entrypoint to surface in the addon log.
    print(",".join(migrated))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
