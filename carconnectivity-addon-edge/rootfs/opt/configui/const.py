"""Vehicle "kinds" and their field schemas for the addon config page.

The page is data-driven: each kind (a selectable brand/source) declares the
fields its connector needs, so one vehicle card adapts to the chosen brand —
VAG (login + S-PIN), Volvo (API keys/tokens), Renault/Dacia (login + locale),
Tronity (client id/secret). Adding a connector = adding a KINDS entry.
"""
from __future__ import annotations

# Editable model written by the UI; the generated config the addon loads.
STATE_PATH = "/config/carconnectivity.configui.json"
CONFIG_PATH = "/config/carconnectivity.json"

SOURCE_EU_DATA_ACT = "eu_data_act"
SOURCE_MANUFACTURER = "manufacturer"
SOURCE_AUTO = "auto"
SOURCE_LABELS = {
    SOURCE_MANUFACTURER: "Manufacturer account (live data + remote control)",
    SOURCE_EU_DATA_ACT: "EU Data Act (official, read-only)",
}


def _f(key, label, secret=False, optional=False, typ="text"):
    return {"key": key, "label": label, "secret": secret, "optional": optional, "type": typ}


# Field schemas per connector family. The field `key` is the actual config key.
_VAG_FIELDS = [
    _f("username", "Username / email"),
    _f("password", "Password", secret=True),
    _f("spin", "S-PIN", secret=True, optional=True),
    _f("vin", "VIN", optional=True),
]
_VOLVO_FIELDS = [
    _f("key_primary", "API key (primary)", secret=True),
    _f("key_secondary", "API key (secondary)", secret=True, optional=True),
    _f("connected_volvo_vehicle_token", "Vehicle token", secret=True),
    _f("location_token", "Location token", secret=True, optional=True),
    _f("interval", "Interval (s)", optional=True, typ="number"),
]
_RENAULT_FIELDS = [
    _f("username", "Username / email"),
    _f("password", "Password", secret=True),
    _f("locale", "Locale", optional=True),  # e.g. de_DE, fr_FR
    _f("vin", "VIN", optional=True),
]
_TRONITY_FIELDS = [
    _f("client_id", "Client ID"),
    _f("client_secret", "Client secret", secret=True),
    _f("interval", "Interval (s)", optional=True, typ="number"),
    _f("vin", "VIN", optional=True),
]

# Each kind = one entry in the brand dropdown.
# VAG kinds carry `sources` (+ eu_brand / manufacturer_connector); others a fixed
# `connector`. All carry `fields`.
KINDS: dict[str, dict] = {
    "volkswagen":    {"label": "Volkswagen (Europe)", "sources": [SOURCE_EU_DATA_ACT], "eu_brand": "VOLKSWAGEN_PASSENGER_CARS", "fields": _VAG_FIELDS},
    "volkswagen_na": {"label": "Volkswagen (North America)", "sources": [SOURCE_MANUFACTURER], "manufacturer_connector": "volkswagen_na", "fields": _VAG_FIELDS},
    "seat":          {"label": "SEAT", "sources": [SOURCE_EU_DATA_ACT], "eu_brand": "SEAT", "fields": _VAG_FIELDS},
    "cupra":         {"label": "Cupra", "sources": [SOURCE_EU_DATA_ACT], "eu_brand": "CUPRA", "fields": _VAG_FIELDS},
    "bentley":       {"label": "Bentley", "sources": [SOURCE_EU_DATA_ACT], "eu_brand": "BENTLEY", "fields": _VAG_FIELDS},
    "skoda":         {"label": "Škoda", "sources": [SOURCE_MANUFACTURER, SOURCE_EU_DATA_ACT], "eu_brand": "SKODA", "manufacturer_connector": "skoda", "fields": _VAG_FIELDS},
    "audi":          {"label": "Audi", "sources": [SOURCE_MANUFACTURER, SOURCE_EU_DATA_ACT], "eu_brand": "AUDI", "manufacturer_connector": "audi", "fields": _VAG_FIELDS},
    "volvo":         {"label": "Volvo", "connector": "volvo", "fields": _VOLVO_FIELDS},
    "renaultdacia":  {"label": "Renault / Dacia", "sources": [SOURCE_MANUFACTURER], "manufacturer_connector": "renaultdacia", "fields": _RENAULT_FIELDS},
    "tronity":       {"label": "Tronity", "connector": "tronity", "fields": _TRONITY_FIELDS},
}

_AUTO_PREFERENCE = (SOURCE_MANUFACTURER, SOURCE_EU_DATA_ACT)


def kind_catalog() -> list[dict]:
    """Kind metadata for the UI: value, label, fields, and (if any) source choice."""
    out = []
    for key, k in sorted(KINDS.items(), key=lambda kv: kv[1]["label"]):
        sources = k.get("sources") or []
        out.append({
            "value": key,
            "label": k["label"],
            "fields": k["fields"],
            "sources": [{"value": s, "label": SOURCE_LABELS[s]} for s in sources],
            "has_choice": len(sources) > 1,
        })
    return out


def resolve_source(kind_key: str, data_source: str) -> str:
    """Resolve a VAG (kind, data_source) to a concrete source; raise if impossible."""
    sources = KINDS[kind_key].get("sources") or []
    if data_source in (None, "", SOURCE_AUTO):
        for pref in _AUTO_PREFERENCE:
            if pref in sources:
                return pref
        return sources[0]
    if data_source not in sources:
        raise ValueError(f"{KINDS[kind_key]['label']} is not available via '{SOURCE_LABELS.get(data_source, data_source)}'")
    return data_source


def connector_for(kind_key: str, source: str | None) -> tuple[str, dict]:
    """Return (connector_type, extra_config) for a kind (+ source for VAG)."""
    k = KINDS[kind_key]
    if not k.get("sources"):
        return k["connector"], {}
    if source == SOURCE_EU_DATA_ACT:
        return "vw_eu_data_act", {"brand": k["eu_brand"]}
    return k["manufacturer_connector"], {}
