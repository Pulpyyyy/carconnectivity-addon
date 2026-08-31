"use strict";
// Relative URLs so everything works under the Home Assistant Ingress base path.
let KINDS = [];
// Connectors/plugins the page does not manage, kept verbatim on save.
let PASSTHROUGH_CONNECTORS = [];
let PASSTHROUGH_PLUGINS = [];
const LOG_LEVELS = ["debug", "info", "warning", "error", "critical"];

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
function el(id) { return document.getElementById(id); }
function val(id) { return el(id).value.trim(); }
function setVal(id, v) { if (v !== undefined && v !== null) el(id).value = v; }
function kindByValue(v) { return KINDS.find((k) => k.value === v); }

function fillSelect(sel, options, selected) {
  sel.innerHTML = "";
  for (const o of options) {
    const opt = document.createElement("option");
    opt.value = o.value; opt.textContent = o.label;
    if (o.value === selected) opt.selected = true;
    sel.appendChild(opt);
  }
}

// ── Vehicles ────────────────────────────────────────────────────────────────
function refreshSource(card, kindValue, selectedSource) {
  const kind = kindByValue(kindValue);
  const wrap = card.querySelector(".v-source-wrap");
  const sel = card.querySelector(".v-source");
  // Non-VAG brands (Volvo, Renault/Dacia, Tronity) have no data-source concept.
  if (!kind || !kind.sources || kind.sources.length === 0) { wrap.hidden = true; sel.innerHTML = ""; return; }
  wrap.hidden = false;
  // Always show the data source. Offer "Automatic" only when more than one works;
  // single-source brands show their one source so it is visible (not blank).
  const tr = (s) => ({ value: s.value, label: tSource(s.value, s.label) });
  const opts = kind.has_choice
    ? [{ value: "auto", label: t("auto_source") }, ...kind.sources.map(tr)]
    : kind.sources.map(tr);
  fillSelect(sel, opts, selectedSource || (kind.has_choice ? "auto" : kind.sources[0].value));
}

// The EU Data Act read-only warning (top bar) is shown only when at least one
// vehicle actually uses that source: brands whose only source is EU Data Act
// (VW / Seat / Cupra / Bentley), or Škoda / Audi explicitly set to it. "auto"
// resolves to the manufacturer connector, so it does not count.
function usesEuDataAct(accounts) {
  return accounts.some((acc) => {
    const kind = kindByValue(acc.brand);
    if (!kind) return false;
    const sources = kind.sources.map((s) => s.value);
    if (!sources.includes("eu_data_act")) return false;
    if (!kind.has_choice) return true; // eu_data_act is the only source
    return acc.data_source === "eu_data_act";
  });
}
function updateEuWarning() {
  el("eu-warning").hidden = !usesEuDataAct(collect().accounts);
}

// Fields can depend on the selected data source: a kind whose manufacturer
// connector has its own schema (Škoda public API) carries `manufacturer_fields`.
// "auto" resolves the way the backend does (kind.auto_source).
function fieldsFor(kind, source) {
  if (!kind) return [];
  if (!kind.manufacturer_fields) return kind.fields;
  const effective = (!source || source === "auto")
    ? (kind.auto_source || (kind.sources[0] && kind.sources[0].value))
    : source;
  return effective === "eu_data_act" ? kind.fields : kind.manufacturer_fields;
}
function cardSource(card) {
  const wrap = card.querySelector(".v-source-wrap");
  return wrap.hidden ? null : card.querySelector(".v-source").value;
}
function collectCardFields(card) {
  const d = {};
  for (const inp of card.querySelectorAll(".v-field")) {
    const v = inp.value.trim();
    if (v) d[inp.dataset.key] = v;
  }
  return d;
}

// Inject the fields the selected brand needs (login, keys, client id/secret…).
function renderFields(card, kindValue, data = {}) {
  const kind = kindByValue(kindValue);
  const wrap = card.querySelector(".v-fields");
  wrap.innerHTML = "";
  if (!kind) return;
  const fields = fieldsFor(kind, cardSource(card));
  for (const f of fields) {
    const label = document.createElement("label");
    label.innerHTML = tField(f.key, f.label) + (f.optional ? ` <span class="hint">${t("optional")}</span>` : "");
    const input = document.createElement("input");
    input.className = "v-field";
    input.dataset.key = f.key;
    if (f.secret) input.type = "password";
    else if (f.type === "number") {
      input.type = "number";
      if (f.min != null) { input.min = f.min; input.placeholder = f.min; }
    }
    if (data[f.key] !== undefined && data[f.key] !== null) input.value = data[f.key];
    label.appendChild(input);
    wrap.appendChild(label);
  }
  // Source-specific note (e.g. where the Škoda API key comes from and its limits).
  if (kind.manufacturer_note && fields === kind.manufacturer_fields) {
    const p = document.createElement("p");
    p.className = "hint v-note";
    p.textContent = t(kind.manufacturer_note);
    wrap.appendChild(p);
  }
}

function addVehicle(data = {}) {
  const card = el("vehicle-tpl").content.firstElementChild.cloneNode(true);
  applyI18n(card);
  const brandSel = card.querySelector(".v-brand");
  fillSelect(brandSel, KINDS, data.brand || (KINDS[0] && KINDS[0].value));
  refreshSource(card, brandSel.value, data.data_source);
  renderFields(card, brandSel.value, data);
  // Per-account level overrides live on the card itself (not as brand fields),
  // and are edited from the advanced logging table.
  if (data.log_level) card.dataset.logLevel = data.log_level;
  if (data.api_log_level) card.dataset.apiLogLevel = data.api_log_level;
  // Typed values survive a source flip (and flip back): Škoda's two sources
  // show different fields, so stash what the hidden schema held.
  card._stash = Object.assign({}, data);
  brandSel.addEventListener("change", () => {
    card._stash = {};
    refreshSource(card, brandSel.value);
    renderFields(card, brandSel.value);
    renderAdvLogs();
  });
  card.querySelector(".v-source").addEventListener("change", () => {
    card._stash = Object.assign({}, card._stash, collectCardFields(card));
    renderFields(card, brandSel.value, card._stash);
  });
  card.querySelector(".remove").addEventListener("click", () => { card.remove(); renderAdvLogs(); });
  el("vehicles").appendChild(card);
  renderAdvLogs();
}

// ── Per-component log levels (advanced) ──────────────────────────────────────
// One collapsed block: a row per configured vehicle (log + API) and one per
// managed plugin. "default" (empty value) inherits the global level and emits
// nothing; only real overrides are saved. Rows are re-rendered whenever the
// vehicle list changes; plugin choices live in PLUGIN_LOGS.
let PLUGIN_LOGS = {};
const ADV_PLUGINS = ["mqtt", "webui", "abrp", "mqtt_homeassistant"];

function pluginLabel(key) {
  if (key === "webui") return t("web_dashboard");
  if (key === "mqtt_homeassistant") return "MQTT Home Assistant";
  return key.toUpperCase();
}

function levelSelect(value, onChange) {
  const sel = document.createElement("select");
  fillSelect(sel, [{ value: "", label: t("default_level") }, ...LOG_LEVELS.map((l) => ({ value: l, label: l }))], value || "");
  sel.addEventListener("change", onChange);
  return sel;
}

function advCol(i18nKey, sel) {
  const lab = document.createElement("label");
  lab.className = "adv-col";
  const span = document.createElement("span");
  span.className = "hint"; span.textContent = t(i18nKey);
  lab.appendChild(span); lab.appendChild(sel);
  return lab;
}

function updateAdvBadge() {
  let n = ADV_PLUGINS.filter((k) => PLUGIN_LOGS[k]).length;
  for (const c of document.querySelectorAll(".vehicle")) {
    n += (c.dataset.logLevel ? 1 : 0) + (c.dataset.apiLogLevel ? 1 : 0);
  }
  el("adv_logs_badge").textContent = n ? t("overrides_count", { n }) : "";
}

function renderAdvLogs() {
  const wrap = el("adv_logs_rows");
  if (!wrap) return;
  wrap.innerHTML = "";
  const addRow = (label) => {
    const row = document.createElement("div");
    row.className = "adv-row";
    const name = document.createElement("span");
    name.className = "adv-name"; name.textContent = label;
    row.appendChild(name);
    wrap.appendChild(row);
    return row;
  };
  document.querySelectorAll(".vehicle").forEach((card, i) => {
    const opt = card.querySelector(".v-brand").selectedOptions[0];
    const row = addRow(`${opt ? opt.textContent : "?"} ${i + 1}`);
    row.appendChild(advCol("log_col", levelSelect(card.dataset.logLevel, (e) => { card.dataset.logLevel = e.target.value; updateAdvBadge(); })));
    row.appendChild(advCol("api_col", levelSelect(card.dataset.apiLogLevel, (e) => { card.dataset.apiLogLevel = e.target.value; updateAdvBadge(); })));
  });
  for (const key of ADV_PLUGINS) {
    const row = addRow(pluginLabel(key));
    row.appendChild(advCol("log_col", levelSelect(PLUGIN_LOGS[key], (e) => { PLUGIN_LOGS[key] = e.target.value; updateAdvBadge(); })));
  }
  updateAdvBadge();
}

// ── ABRP tokens ──────────────────────────────────────────────────────────────
function addToken(data = {}) {
  const row = el("token-tpl").content.firstElementChild.cloneNode(true);
  applyI18n(row);
  row.querySelector(".t-vin").value = data.vin || "";
  row.querySelector(".t-token").value = data.token || "";
  row.querySelector(".t-remove").addEventListener("click", () => row.remove());
  el("abrp_tokens").appendChild(row);
}

// ── Collect / save ───────────────────────────────────────────────────────────
function collect() {
  const accounts = [];
  for (const card of document.querySelectorAll(".vehicle")) {
    const acc = { brand: card.querySelector(".v-brand").value };
    if (!card.querySelector(".v-source-wrap").hidden) acc.data_source = card.querySelector(".v-source").value;
    for (const inp of card.querySelectorAll(".v-field")) {
      const v = inp.value.trim();
      if (v) acc[inp.dataset.key] = v;
    }
    if (card.dataset.logLevel) acc.log_level = card.dataset.logLevel;
    if (card.dataset.apiLogLevel) acc.api_log_level = card.dataset.apiLogLevel;
    accounts.push(acc);
  }

  const mqtt = {};
  if (val("mqtt_broker")) mqtt.broker = val("mqtt_broker");
  if (val("mqtt_port")) mqtt.port = parseInt(val("mqtt_port"), 10);
  if (val("mqtt_username")) mqtt.username = val("mqtt_username");
  if (val("mqtt_password")) mqtt.password = val("mqtt_password");

  const tokens = [];
  for (const row of document.querySelectorAll(".token")) {
    const vin = row.querySelector(".t-vin").value.trim();
    const token = row.querySelector(".t-token").value.trim();
    if (vin || token) tokens.push({ vin, token });
  }

  // Per-plugin overrides: an empty value means "inherit the global level" and
  // is simply not sent.
  const plugin_logs = {};
  for (const key of ADV_PLUGINS) if (PLUGIN_LOGS[key]) plugin_logs[key] = PLUGIN_LOGS[key];

  return {
    accounts,
    settings: {
      log_level: val("log_level"),
      api_log_level: val("api_log_level"),
      plugin_logs,
      mqtt,
      webui: { enabled: el("webui_enabled").checked, username: val("webui_username") || "autologin", password: el("webui_password").value },
      abrp: { enabled: el("abrp_enabled").checked, tokens },
    },
    _passthrough_connectors: PASSTHROUGH_CONNECTORS,
    _passthrough_plugins: PASSTHROUGH_PLUGINS,
  };
}

function clearErrors() { document.querySelectorAll(".v-error").forEach((e) => (e.textContent = "")); }
// Translate the backend's known validation messages; leave others verbatim.
function tError(msg) {
  if (msg === "Brand is required") return t("brand_required");
  if (msg.startsWith("Required: ")) return t("required_fields", { fields: msg.slice(10) });
  return msg;
}
function showErrors(errors) {
  const cards = document.querySelectorAll(".vehicle");
  let first = null;
  for (const e of errors) if (e.index >= 0 && cards[e.index]) {
    cards[e.index].querySelector(".v-error").textContent = tError(e.error);
    if (!first) first = cards[e.index];
  }
  // Bring the first offending card into view: with several vehicles the error
  // can sit far above the Save button the user just clicked.
  if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function save() {
  clearErrors();
  const status = el("status"); status.textContent = t("saving"); status.className = "";
  try {
    const r = await fetch("api/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(collect()) });
    // The backend answers JSON on every path, errors included. Anything else
    // means the request never reached it (HA Ingress replies "502: Bad Gateway"
    // as plain text when the addon is down), so say that instead of letting the
    // JSON parse error surface as-is.
    const body = await r.text();
    let res;
    try { res = JSON.parse(body); }
    catch (_) { status.textContent = t("save_unreachable", { code: r.status }); status.className = "err"; return; }
    if (!r.ok || !res.ok) {
      showErrors(res.errors || []);
      status.textContent = t("save_error"); status.className = "err"; return;
    }
    status.textContent = t("saved", { n: res.connectors }); status.className = "ok";
    markClean();
    refreshRestartBanner();
  } catch (e) { status.textContent = t("error", { msg: e.message }); status.className = "err"; }
}

// ── Restart banner & unsaved-changes guard ──────────────────────────────────
// The banner state is a server-side fact (config saved after the addon started),
// so it survives switching to the dashboard and back. The link leaves the
// Ingress iframe (target=_top) for the HA addon page: Restart and Logs live
// there and are NOT duplicated in this page.
async function refreshRestartBanner() {
  try {
    const meta = await getJSON("api/meta");
    const banner = el("restart-banner");
    if (meta.restart_needed) {
      // Stick right below the appbar; its height is content-driven, measure it.
      const bar = document.querySelector(".appbar");
      if (bar) banner.style.top = bar.offsetHeight + "px";
      banner.style.display = "block";
    } else banner.style.display = "none";
    const link = el("restart-link");
    if (meta.addon_url) { link.href = meta.addon_url; link.hidden = false; }
    else link.hidden = true;
  } catch (_) { /* keep the banner as it is */ }
}

let DIRTY = false;
function updateSaveState() { el("save").disabled = !DIRTY; }
function markDirty() { DIRTY = true; updateSaveState(); }
function markClean() { DIRTY = false; updateSaveState(); }
window.addEventListener("beforeunload", (e) => {
  if (!DIRTY) return;
  e.preventDefault();
  e.returnValue = ""; // required by Chrome for the native confirmation dialog
});

function showNotice(state) {
  const msgs = [];
  if (state._imported_from) msgs.push(t("imported", { path: state._imported_from }));
  if (state._migrated && state._migrated.length) msgs.push(t("migrated", { brands: state._migrated.join(", ") }));
  const dropped = [...(state._passthrough_connectors || []).map((c) => c.type), ...(state._passthrough_plugins || []).map((p) => p.type)];
  if (dropped.length) msgs.push(t("preserved", { items: dropped.join(", ") }));
  if (!msgs.length) return;
  const div = document.createElement("div"); div.className = "notice";
  div.innerHTML = msgs.map((m) => `<p>${m}</p>`).join("");
  const main = document.querySelector("main"); main.insertBefore(div, main.querySelector("section"));
}

async function init() {
  document.documentElement.lang = I18N_LANG;
  applyI18n();
  KINDS = await getJSON("api/brands");
  const state = await getJSON("api/state");
  PASSTHROUGH_CONNECTORS = state._passthrough_connectors || [];
  PASSTHROUGH_PLUGINS = state._passthrough_plugins || [];
  showNotice(state);

  const lvl = LOG_LEVELS.map((l) => ({ value: l, label: l }));
  const s = state.settings || {};
  fillSelect(el("log_level"), lvl, s.log_level || "info");
  fillSelect(el("api_log_level"), lvl, s.api_log_level || "error");
  PLUGIN_LOGS = { ...(s.plugin_logs || {}) };

  (state.accounts || []).forEach(addVehicle);
  renderAdvLogs(); // also covers the no-vehicle case (plugin rows only)

  const mqtt = s.mqtt || {};
  setVal("mqtt_broker", mqtt.broker); setVal("mqtt_port", mqtt.port);
  setVal("mqtt_username", mqtt.username); setVal("mqtt_password", mqtt.password);

  const webui = s.webui || {};
  // The Dashboard tab appears only when the webui is actually reachable: the live
  // nginx routing decides, not the saved config flag (the config can say enabled
  // while the process is not running yet, e.g. before the addon is restarted).
  const dash = el("tab-dashboard");
  if (dash) {
    try {
      const w = await getJSON("api/webui");
      if (w.up) {
        dash.href = location.pathname.includes("/configui/") ? "../" : "./";
        dash.hidden = false;
        // In-page guard for the tab switch: beforeunload is ignored by the HA
        // companion apps (WKWebView), confirm() is not. Cleared on accept so
        // browsers do not stack their own generic beforeunload dialog on top.
        dash.addEventListener("click", (e) => {
          if (!DIRTY) return;
          if (confirm(t("unsaved_confirm"))) markClean();
          else e.preventDefault();
        });
      }
    } catch (_) { /* keep the Dashboard tab hidden */ }
  }
  el("webui_enabled").checked = !!webui.enabled;
  setVal("webui_username", webui.username && webui.username !== "autologin" ? webui.username : "");
  setVal("webui_password", webui.password);
  const toggleWebui = () => (el("webui_opts").style.display = el("webui_enabled").checked ? "" : "none");
  el("webui_enabled").addEventListener("change", toggleWebui); toggleWebui();

  const abrp = s.abrp || {};
  el("abrp_enabled").checked = !!abrp.enabled;
  (abrp.tokens || []).forEach(addToken);

  el("add").addEventListener("click", () => addVehicle());
  el("abrp_add").addEventListener("click", () => addToken());
  el("save").addEventListener("click", save);

  // Any edit marks the form dirty: field input/change, and the structural
  // buttons (add/remove vehicle or token) which do not fire input events.
  // Brand/source edits also retrigger the EU Data Act warning visibility.
  const main = document.querySelector("main");
  main.addEventListener("input", markDirty);
  main.addEventListener("change", () => { markDirty(); updateEuWarning(); });
  main.addEventListener("click", (e) => {
    if (e.target.closest("#add, #abrp_add, .remove, .t-remove")) { markDirty(); updateEuWarning(); }
  });

  // Save stays disabled until something changes. An imported or migrated
  // config counts as a pending change: it must be saveable as-is to be adopted.
  if (state._imported_from || (state._migrated && state._migrated.length)) markDirty();
  else updateSaveState();

  updateEuWarning();
  refreshRestartBanner();
}

init().catch((e) => { el("status").textContent = t("load_failed", { msg: e.message }); });
