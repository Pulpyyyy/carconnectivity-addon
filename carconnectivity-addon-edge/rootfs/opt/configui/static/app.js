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

// The EU Data Act read-only warning is shown permanently in the top bar (see
// index.html), so there is no per-vehicle toggling to do here.

// Inject the fields the selected brand needs (login, keys, client id/secret…).
function renderFields(card, kindValue, data = {}) {
  const kind = kindByValue(kindValue);
  const wrap = card.querySelector(".v-fields");
  wrap.innerHTML = "";
  if (!kind) return;
  for (const f of kind.fields) {
    const label = document.createElement("label");
    label.innerHTML = tField(f.key, f.label) + (f.optional ? ` <span class="hint">${t("optional")}</span>` : "");
    const input = document.createElement("input");
    input.className = "v-field";
    input.dataset.key = f.key;
    if (f.secret) input.type = "password";
    else if (f.type === "number") input.type = "number";
    if (data[f.key] !== undefined && data[f.key] !== null) input.value = data[f.key];
    label.appendChild(input);
    wrap.appendChild(label);
  }
}

function addVehicle(data = {}) {
  const card = el("vehicle-tpl").content.firstElementChild.cloneNode(true);
  applyI18n(card);
  const brandSel = card.querySelector(".v-brand");
  fillSelect(brandSel, KINDS, data.brand || (KINDS[0] && KINDS[0].value));
  refreshSource(card, brandSel.value, data.data_source);
  renderFields(card, brandSel.value, data);
  brandSel.addEventListener("change", () => {
    refreshSource(card, brandSel.value);
    renderFields(card, brandSel.value);
  });
  card.querySelector(".remove").addEventListener("click", () => card.remove());
  el("vehicles").appendChild(card);
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

  return {
    accounts,
    settings: {
      log_level: val("log_level"),
      api_log_level: val("api_log_level"),
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
  for (const e of errors) if (e.index >= 0 && cards[e.index]) cards[e.index].querySelector(".v-error").textContent = tError(e.error);
}

async function save() {
  clearErrors();
  const status = el("status"); status.textContent = t("saving"); status.className = "";
  try {
    const r = await fetch("api/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(collect()) });
    const res = await r.json();
    if (!r.ok || !res.ok) {
      showErrors(res.errors || []);
      status.textContent = t("save_error"); status.className = "err"; return;
    }
    status.textContent = t("saved", { n: res.connectors }); status.className = "ok";
  } catch (e) { status.textContent = t("error", { msg: e.message }); status.className = "err"; }
}

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

  (state.accounts || []).forEach(addVehicle);

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
}

init().catch((e) => { el("status").textContent = t("load_failed", { msg: e.message }); });
