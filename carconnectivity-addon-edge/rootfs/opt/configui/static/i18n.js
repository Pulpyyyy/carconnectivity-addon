// Lightweight i18n module for the CarConnectivity Home Assistant addon config UI.
// Plain browser JavaScript: no imports, no build step, classic <script src>.
// Globals exposed: I18N, I18N_FIELDS, I18N_SOURCES, i18nLang, I18N_LANG,
// t, tField, tSource, applyI18n.

var I18N = {
  en: {
    sub: "Add your vehicles. Pick your brand: the right data source is chosen for you; a choice only appears when more than one works.",
    vehicles: "Vehicles",
    add_vehicle: "+ Add vehicle",
    required: "(required)",
    optional: "(optional)",
    mqtt_hint: "How vehicles appear in Home Assistant. Leave blank to use the Home Assistant Mosquitto broker defaults.",
    broker_host: "Broker host",
    port: "Port",
    username: "Username",
    password: "Password",
    web_dashboard: "Web dashboard",
    enable_webui: "Enable the CarConnectivity web dashboard",
    login_user: "Login user",
    autologin_hint: "(use “autologin” to be logged in automatically)",
    login_password: "Login password",
    send_abrp: "Send data to ABRP",
    add_abrp: "+ Add ABRP token",
    logging: "Logging",
    general_log: "General log level",
    api_log: "API log level",
    api_log_hint: "(per-connector network calls)",
    default_level: "default (inherit)",
    adv_logs: "Per-component levels (advanced)",
    log_col: "log",
    api_col: "API",
    overrides_count: "{n} custom",
    save: "Save",
    brand: "Brand",
    data_source: "Data source",
    vin: "VIN",
    abrp_token: "ABRP token",
    remove: "Remove",
    dashboard: "Dashboard",
    configuration: "Configuration",
    auto_source: "Automatic (recommended)",
    saving: "Saving…",
    saved: "Saved ({n} vehicle account(s)). Restart the addon to apply.",
    save_error: "Could not save: check the highlighted vehicles.",
    error: "Error: {msg}",
    load_failed: "Failed to load: {msg}",
    imported: "Imported your existing configuration from {path}. Review it, then Save to take over.",
    migrated: "Moved to EU Data Act (manufacturer access is blocked for these brands): {brands}. Confirm and Save.",
    preserved: "Preserved as-is (managed elsewhere, not editable here): {items}.",
    brand_required: "Brand is required",
    required_fields: "Required: {fields}"
  },
  fr: {
    sub: "Ajoutez vos véhicules. Choisissez votre marque: la bonne source de données est sélectionnée pour vous ; un choix n’apparaît que lorsque plusieurs sont possibles.",
    vehicles: "Véhicules",
    add_vehicle: "+ Ajouter un véhicule",
    required: "(obligatoire)",
    optional: "(facultatif)",
    mqtt_hint: "Comment les véhicules apparaissent dans Home Assistant. Laissez vide pour utiliser les valeurs par défaut du broker Mosquitto de Home Assistant.",
    broker_host: "Hôte du broker",
    port: "Port",
    username: "Nom d’utilisateur",
    password: "Mot de passe",
    web_dashboard: "Tableau de bord web",
    enable_webui: "Activer le tableau de bord web CarConnectivity",
    login_user: "Utilisateur de connexion",
    autologin_hint: "(utilisez « autologin » pour être connecté automatiquement)",
    login_password: "Mot de passe de connexion",
    send_abrp: "Envoyer les données à ABRP",
    add_abrp: "+ Ajouter un jeton ABRP",
    logging: "Journalisation",
    general_log: "Niveau de journal général",
    api_log: "Niveau de journal API",
    api_log_hint: "(appels réseau par connecteur)",
    default_level: "défaut (hérite du global)",
    adv_logs: "Niveaux par composant (avancé)",
    log_col: "journal",
    api_col: "API",
    overrides_count: "{n} personnalisé(s)",
    save: "Enregistrer",
    brand: "Marque",
    data_source: "Source de données",
    vin: "VIN",
    abrp_token: "Jeton ABRP",
    remove: "Supprimer",
    dashboard: "Tableau de bord",
    configuration: "Configuration",
    auto_source: "Automatique (recommandé)",
    saving: "Enregistrement…",
    saved: "Enregistré ({n} compte(s) de véhicule). Redémarrez l’addon pour appliquer.",
    save_error: "Impossible d’enregistrer: vérifiez les véhicules en surbrillance.",
    error: "Erreur : {msg}",
    load_failed: "Échec du chargement : {msg}",
    imported: "Configuration existante importée depuis {path}. Vérifiez-la, puis enregistrez pour la reprendre.",
    migrated: "Basculé vers l’EU Data Act (l’accès constructeur est bloqué pour ces marques) : {brands}. Confirmez et enregistrez.",
    preserved: "Conservé tel quel (géré ailleurs, non modifiable ici) : {items}.",
    brand_required: "La marque est obligatoire",
    required_fields: "Requis : {fields}"
  },
  de: {
    sub: "Fügen Sie Ihre Fahrzeuge hinzu. Wählen Sie Ihre Marke: die richtige Datenquelle wird für Sie ausgewählt; eine Auswahl erscheint nur, wenn mehr als eine möglich ist.",
    vehicles: "Fahrzeuge",
    add_vehicle: "+ Fahrzeug hinzufügen",
    required: "(erforderlich)",
    optional: "(optional)",
    mqtt_hint: "Wie Fahrzeuge in Home Assistant erscheinen. Leer lassen, um die Standardwerte des Home-Assistant-Mosquitto-Brokers zu verwenden.",
    broker_host: "Broker-Host",
    port: "Port",
    username: "Benutzername",
    password: "Passwort",
    web_dashboard: "Web-Dashboard",
    enable_webui: "CarConnectivity-Web-Dashboard aktivieren",
    login_user: "Anmeldebenutzer",
    autologin_hint: "(„autologin“ verwenden, um automatisch angemeldet zu werden)",
    login_password: "Anmeldepasswort",
    send_abrp: "Daten an ABRP senden",
    add_abrp: "+ ABRP-Token hinzufügen",
    logging: "Protokollierung",
    general_log: "Allgemeine Protokollstufe",
    api_log: "API-Protokollstufe",
    api_log_hint: "(Netzwerkaufrufe pro Connector)",
    default_level: "Standard (erbt)",
    adv_logs: "Stufen pro Komponente (erweitert)",
    log_col: "Protokoll",
    api_col: "API",
    overrides_count: "{n} angepasst",
    save: "Speichern",
    brand: "Marke",
    data_source: "Datenquelle",
    vin: "VIN",
    abrp_token: "ABRP-Token",
    remove: "Entfernen",
    dashboard: "Dashboard",
    configuration: "Konfiguration",
    auto_source: "Automatisch (empfohlen)",
    saving: "Speichern…",
    saved: "Gespeichert ({n} Fahrzeugkonto/-konten). Starten Sie das Addon neu, um die Änderungen zu übernehmen.",
    save_error: "Speichern fehlgeschlagen: überprüfen Sie die markierten Fahrzeuge.",
    error: "Fehler: {msg}",
    load_failed: "Laden fehlgeschlagen: {msg}",
    imported: "Vorhandene Konfiguration aus {path} importiert. Überprüfen Sie sie und speichern Sie dann, um sie zu übernehmen.",
    migrated: "Auf EU Data Act umgestellt (Herstellerzugriff ist für diese Marken gesperrt): {brands}. Bestätigen und speichern.",
    preserved: "Unverändert beibehalten (anderswo verwaltet, hier nicht bearbeitbar): {items}.",
    brand_required: "Marke ist erforderlich",
    required_fields: "Erforderlich: {fields}"
  },
  it: {
    sub: "Aggiungi i tuoi veicoli. Scegli la marca: la fonte dati corretta viene selezionata per te; una scelta appare solo quando ne funziona più di una.",
    vehicles: "Veicoli",
    add_vehicle: "+ Aggiungi veicolo",
    required: "(obbligatorio)",
    optional: "(facoltativo)",
    mqtt_hint: "Come appaiono i veicoli in Home Assistant. Lascia vuoto per usare le impostazioni predefinite del broker Mosquitto di Home Assistant.",
    broker_host: "Host del broker",
    port: "Porta",
    username: "Nome utente",
    password: "Password",
    web_dashboard: "Dashboard web",
    enable_webui: "Abilita la dashboard web CarConnectivity",
    login_user: "Utente di accesso",
    autologin_hint: "(usa “autologin” per accedere automaticamente)",
    login_password: "Password di accesso",
    send_abrp: "Invia i dati ad ABRP",
    add_abrp: "+ Aggiungi token ABRP",
    logging: "Registrazione",
    general_log: "Livello di log generale",
    api_log: "Livello di log API",
    api_log_hint: "(chiamate di rete per connettore)",
    default_level: "predefinito (eredita)",
    adv_logs: "Livelli per componente (avanzato)",
    log_col: "log",
    api_col: "API",
    overrides_count: "{n} personalizzati",
    save: "Salva",
    brand: "Marca",
    data_source: "Fonte dati",
    vin: "VIN",
    abrp_token: "Token ABRP",
    remove: "Rimuovi",
    dashboard: "Dashboard",
    configuration: "Configurazione",
    auto_source: "Automatico (consigliato)",
    saving: "Salvataggio…",
    saved: "Salvato ({n} account veicolo). Riavvia l’addon per applicare.",
    save_error: "Impossibile salvare: controlla i veicoli evidenziati.",
    error: "Errore: {msg}",
    load_failed: "Caricamento non riuscito: {msg}",
    imported: "Configurazione esistente importata da {path}. Esaminala, poi salva per assumerne il controllo.",
    migrated: "Spostato su EU Data Act (l’accesso del produttore è bloccato per queste marche): {brands}. Conferma e salva.",
    preserved: "Mantenuto così com’è (gestito altrove, non modificabile qui): {items}.",
    brand_required: "La marca è obbligatoria",
    required_fields: "Obbligatori: {fields}"
  },
  es: {
    sub: "Agrega tus vehículos. Elige tu marca: la fuente de datos correcta se selecciona por ti; solo aparece una opción cuando funciona más de una.",
    vehicles: "Vehículos",
    add_vehicle: "+ Agregar vehículo",
    required: "(obligatorio)",
    optional: "(opcional)",
    mqtt_hint: "Cómo aparecen los vehículos en Home Assistant. Déjalo en blanco para usar los valores predeterminados del broker Mosquitto de Home Assistant.",
    broker_host: "Host del broker",
    port: "Puerto",
    username: "Nombre de usuario",
    password: "Contraseña",
    web_dashboard: "Panel web",
    enable_webui: "Habilitar el panel web de CarConnectivity",
    login_user: "Usuario de inicio de sesión",
    autologin_hint: "(usa “autologin” para iniciar sesión automáticamente)",
    login_password: "Contraseña de inicio de sesión",
    send_abrp: "Enviar datos a ABRP",
    add_abrp: "+ Agregar token ABRP",
    logging: "Registro",
    general_log: "Nivel de registro general",
    api_log: "Nivel de registro de API",
    api_log_hint: "(llamadas de red por conector)",
    default_level: "predeterminado (hereda)",
    adv_logs: "Niveles por componente (avanzado)",
    log_col: "registro",
    api_col: "API",
    overrides_count: "{n} personalizados",
    save: "Guardar",
    brand: "Marca",
    data_source: "Fuente de datos",
    vin: "VIN",
    abrp_token: "Token ABRP",
    remove: "Eliminar",
    dashboard: "Panel",
    configuration: "Configuración",
    auto_source: "Automático (recomendado)",
    saving: "Guardando…",
    saved: "Guardado ({n} cuenta(s) de vehículo). Reinicia el addon para aplicar.",
    save_error: "No se pudo guardar: revisa los vehículos resaltados.",
    error: "Error: {msg}",
    load_failed: "Error al cargar: {msg}",
    imported: "Configuración existente importada desde {path}. Revísala y luego guarda para tomar el control.",
    migrated: "Cambiado a EU Data Act (el acceso del fabricante está bloqueado para estas marcas): {brands}. Confirma y guarda.",
    preserved: "Conservado tal cual (gestionado en otro lugar, no editable aquí): {items}.",
    brand_required: "La marca es obligatoria",
    required_fields: "Obligatorios: {fields}"
  },
  pl: {
    sub: "Dodaj swoje pojazdy. Wybierz markę: odpowiednie źródło danych zostanie wybrane za Ciebie; wybór pojawia się tylko wtedy, gdy działa więcej niż jedno.",
    vehicles: "Pojazdy",
    add_vehicle: "+ Dodaj pojazd",
    required: "(wymagane)",
    optional: "(opcjonalne)",
    mqtt_hint: "Jak pojazdy pojawiają się w Home Assistant. Pozostaw puste, aby użyć domyślnych ustawień brokera Mosquitto w Home Assistant.",
    broker_host: "Host brokera",
    port: "Port",
    username: "Nazwa użytkownika",
    password: "Hasło",
    web_dashboard: "Panel internetowy",
    enable_webui: "Włącz panel internetowy CarConnectivity",
    login_user: "Użytkownik logowania",
    autologin_hint: "(użyj „autologin”, aby logować się automatycznie)",
    login_password: "Hasło logowania",
    send_abrp: "Wysyłaj dane do ABRP",
    add_abrp: "+ Dodaj token ABRP",
    logging: "Rejestrowanie",
    general_log: "Ogólny poziom dziennika",
    api_log: "Poziom dziennika API",
    api_log_hint: "(wywołania sieciowe na konektor)",
    default_level: "domyślny (dziedziczy)",
    adv_logs: "Poziomy według komponentu (zaawansowane)",
    log_col: "dziennik",
    api_col: "API",
    overrides_count: "{n} niestandardowe",
    save: "Zapisz",
    brand: "Marka",
    data_source: "Źródło danych",
    vin: "VIN",
    abrp_token: "Token ABRP",
    remove: "Usuń",
    dashboard: "Panel",
    configuration: "Konfiguracja",
    auto_source: "Automatycznie (zalecane)",
    saving: "Zapisywanie…",
    saved: "Zapisano ({n} konto(a) pojazdu). Uruchom ponownie dodatek, aby zastosować.",
    save_error: "Nie można zapisać: sprawdź wyróżnione pojazdy.",
    error: "Błąd: {msg}",
    load_failed: "Nie udało się wczytać: {msg}",
    imported: "Zaimportowano istniejącą konfigurację z {path}. Sprawdź ją, a następnie zapisz, aby przejąć kontrolę.",
    migrated: "Przeniesiono do EU Data Act (dostęp producenta jest zablokowany dla tych marek): {brands}. Potwierdź i zapisz.",
    preserved: "Zachowano bez zmian (zarządzane gdzie indziej, tu nieedytowalne): {items}.",
    brand_required: "Marka jest wymagana",
    required_fields: "Wymagane: {fields}"
  },
  pt: {
    sub: "Adicione os seus veículos. Escolha a sua marca: a fonte de dados correta é selecionada para si; uma escolha só aparece quando mais do que uma funciona.",
    vehicles: "Veículos",
    add_vehicle: "+ Adicionar veículo",
    required: "(obrigatório)",
    optional: "(opcional)",
    mqtt_hint: "Como os veículos aparecem no Home Assistant. Deixe em branco para usar os valores predefinidos do broker Mosquitto do Home Assistant.",
    broker_host: "Anfitrião do broker",
    port: "Porta",
    username: "Nome de utilizador",
    password: "Palavra-passe",
    web_dashboard: "Painel web",
    enable_webui: "Ativar o painel web CarConnectivity",
    login_user: "Utilizador de início de sessão",
    autologin_hint: "(use “autologin” para iniciar sessão automaticamente)",
    login_password: "Palavra-passe de início de sessão",
    send_abrp: "Enviar dados para ABRP",
    add_abrp: "+ Adicionar token ABRP",
    logging: "Registo",
    general_log: "Nível de registo geral",
    api_log: "Nível de registo da API",
    api_log_hint: "(chamadas de rede por conector)",
    default_level: "predefinição (herda)",
    adv_logs: "Níveis por componente (avançado)",
    log_col: "registo",
    api_col: "API",
    overrides_count: "{n} personalizados",
    save: "Guardar",
    brand: "Marca",
    data_source: "Fonte de dados",
    vin: "VIN",
    abrp_token: "Token ABRP",
    remove: "Remover",
    dashboard: "Painel",
    configuration: "Configuração",
    auto_source: "Automático (recomendado)",
    saving: "A guardar…",
    saved: "Guardado ({n} conta(s) de veículo). Reinicie o addon para aplicar.",
    save_error: "Não foi possível guardar: verifique os veículos destacados.",
    error: "Erro: {msg}",
    load_failed: "Falha ao carregar: {msg}",
    imported: "Configuração existente importada de {path}. Reveja-a e depois guarde para assumir o controlo.",
    migrated: "Movido para EU Data Act (o acesso do fabricante está bloqueado para estas marcas): {brands}. Confirme e guarde.",
    preserved: "Mantido tal como está (gerido noutro local, não editável aqui): {items}.",
    brand_required: "A marca é obrigatória",
    required_fields: "Obrigatórios: {fields}"
  },
  no: {
    sub: "Legg til kjøretøyene dine. Velg merket: riktig datakilde velges for deg; et valg vises bare når mer enn ett fungerer.",
    vehicles: "Kjøretøy",
    add_vehicle: "+ Legg til kjøretøy",
    required: "(påkrevd)",
    optional: "(valgfritt)",
    mqtt_hint: "Hvordan kjøretøy vises i Home Assistant. La stå tomt for å bruke standardverdiene til Home Assistant Mosquitto-megleren.",
    broker_host: "Megler-vert",
    port: "Port",
    username: "Brukernavn",
    password: "Passord",
    web_dashboard: "Nettpanel",
    enable_webui: "Aktiver CarConnectivity-nettpanelet",
    login_user: "Påloggingsbruker",
    autologin_hint: "(bruk «autologin» for å logge inn automatisk)",
    login_password: "Påloggingspassord",
    send_abrp: "Send data til ABRP",
    add_abrp: "+ Legg til ABRP-token",
    logging: "Logging",
    general_log: "Generelt loggnivå",
    api_log: "API-loggnivå",
    api_log_hint: "(nettverkskall per kobling)",
    default_level: "standard (arver)",
    adv_logs: "Nivåer per komponent (avansert)",
    log_col: "logg",
    api_col: "API",
    overrides_count: "{n} tilpasset",
    save: "Lagre",
    brand: "Merke",
    data_source: "Datakilde",
    vin: "VIN",
    abrp_token: "ABRP-token",
    remove: "Fjern",
    dashboard: "Panel",
    configuration: "Konfigurasjon",
    auto_source: "Automatisk (anbefalt)",
    saving: "Lagrer…",
    saved: "Lagret ({n} kjøretøykonto(er)). Start tillegget på nytt for å bruke endringene.",
    save_error: "Kunne ikke lagre: sjekk de uthevede kjøretøyene.",
    error: "Feil: {msg}",
    load_failed: "Kunne ikke laste inn: {msg}",
    imported: "Importerte din eksisterende konfigurasjon fra {path}. Se gjennom den, og lagre deretter for å overta.",
    migrated: "Flyttet til EU Data Act (produsenttilgang er blokkert for disse merkene): {brands}. Bekreft og lagre.",
    preserved: "Beholdt som den er (administreres et annet sted, kan ikke redigeres her): {items}.",
    brand_required: "Merke er påkrevd",
    required_fields: "Påkrevd: {fields}"
  }
};

var I18N_FIELDS = {
  en: {
    username: "Username / email",
    password: "Password",
    spin: "S-PIN",
    vin: "VIN",
    key_primary: "API key (primary)",
    key_secondary: "API key (secondary)",
    connected_volvo_vehicle_token: "Vehicle token",
    location_token: "Location token",
    interval: "Interval (s)",
    client_id: "Client ID",
    client_secret: "Client secret",
    locale: "Locale"
  },
  fr: {
    username: "Nom d’utilisateur / e-mail",
    password: "Mot de passe",
    spin: "S-PIN",
    vin: "VIN",
    key_primary: "Clé API (primaire)",
    key_secondary: "Clé API (secondaire)",
    connected_volvo_vehicle_token: "Jeton du véhicule",
    location_token: "Jeton de localisation",
    interval: "Intervalle (s)",
    client_id: "Client ID",
    client_secret: "Secret client",
    locale: "Langue régionale"
  },
  de: {
    username: "Benutzername / E-Mail",
    password: "Passwort",
    spin: "S-PIN",
    vin: "VIN",
    key_primary: "API-Schlüssel (primär)",
    key_secondary: "API-Schlüssel (sekundär)",
    connected_volvo_vehicle_token: "Fahrzeug-Token",
    location_token: "Standort-Token",
    interval: "Intervall (s)",
    client_id: "Client ID",
    client_secret: "Client-Secret",
    locale: "Gebietsschema"
  },
  it: {
    username: "Nome utente / email",
    password: "Password",
    spin: "S-PIN",
    vin: "VIN",
    key_primary: "Chiave API (primaria)",
    key_secondary: "Chiave API (secondaria)",
    connected_volvo_vehicle_token: "Token del veicolo",
    location_token: "Token di posizione",
    interval: "Intervallo (s)",
    client_id: "Client ID",
    client_secret: "Client secret",
    locale: "Lingua"
  },
  es: {
    username: "Nombre de usuario / correo",
    password: "Contraseña",
    spin: "S-PIN",
    vin: "VIN",
    key_primary: "Clave API (primaria)",
    key_secondary: "Clave API (secundaria)",
    connected_volvo_vehicle_token: "Token del vehículo",
    location_token: "Token de ubicación",
    interval: "Intervalo (s)",
    client_id: "Client ID",
    client_secret: "Secreto de cliente",
    locale: "Configuración regional"
  },
  pl: {
    username: "Nazwa użytkownika / e-mail",
    password: "Hasło",
    spin: "S-PIN",
    vin: "VIN",
    key_primary: "Klucz API (główny)",
    key_secondary: "Klucz API (dodatkowy)",
    connected_volvo_vehicle_token: "Token pojazdu",
    location_token: "Token lokalizacji",
    interval: "Interwał (s)",
    client_id: "Client ID",
    client_secret: "Sekret klienta",
    locale: "Ustawienia regionalne"
  },
  pt: {
    username: "Nome de utilizador / e-mail",
    password: "Palavra-passe",
    spin: "S-PIN",
    vin: "VIN",
    key_primary: "Chave de API (primária)",
    key_secondary: "Chave de API (secundária)",
    connected_volvo_vehicle_token: "Token do veículo",
    location_token: "Token de localização",
    interval: "Intervalo (s)",
    client_id: "Client ID",
    client_secret: "Segredo do cliente",
    locale: "Região"
  },
  no: {
    username: "Brukernavn / e-post",
    password: "Passord",
    spin: "S-PIN",
    vin: "VIN",
    key_primary: "API-nøkkel (primær)",
    key_secondary: "API-nøkkel (sekundær)",
    connected_volvo_vehicle_token: "Kjøretøy-token",
    location_token: "Posisjons-token",
    interval: "Intervall (s)",
    client_id: "Client ID",
    client_secret: "Klienthemmelighet",
    locale: "Regioninnstilling"
  }
};

var I18N_SOURCES = {
  en: {
    manufacturer: "Manufacturer account (live data + remote control)",
    eu_data_act: "EU Data Act (official, read-only)",
    auto: "Automatic (recommended)"
  },
  fr: {
    manufacturer: "Compte constructeur (données en direct + contrôle à distance)",
    eu_data_act: "EU Data Act (officiel, lecture seule)",
    auto: "Automatique (recommandé)"
  },
  de: {
    manufacturer: "Herstellerkonto (Live-Daten + Fernsteuerung)",
    eu_data_act: "EU Data Act (offiziell, schreibgeschützt)",
    auto: "Automatisch (empfohlen)"
  },
  it: {
    manufacturer: "Account del produttore (dati in tempo reale + controllo remoto)",
    eu_data_act: "EU Data Act (ufficiale, sola lettura)",
    auto: "Automatico (consigliato)"
  },
  es: {
    manufacturer: "Cuenta del fabricante (datos en vivo + control remoto)",
    eu_data_act: "EU Data Act (oficial, solo lectura)",
    auto: "Automático (recomendado)"
  },
  pl: {
    manufacturer: "Konto producenta (dane na żywo + zdalne sterowanie)",
    eu_data_act: "EU Data Act (oficjalne, tylko do odczytu)",
    auto: "Automatycznie (zalecane)"
  },
  pt: {
    manufacturer: "Conta do fabricante (dados em direto + controlo remoto)",
    eu_data_act: "EU Data Act (oficial, só de leitura)",
    auto: "Automático (recomendado)"
  },
  no: {
    manufacturer: "Produsentkonto (sanntidsdata + fjernstyring)",
    eu_data_act: "EU Data Act (offisiell, skrivebeskyttet)",
    auto: "Automatisk (anbefalt)"
  }
};

function i18nLang() {
  var supported = ["en", "fr", "de", "it", "es", "pl", "pt", "no"];
  var nav = (typeof navigator !== "undefined" && navigator.language) ? navigator.language : "en";
  var code = String(nav).slice(0, 2).toLowerCase();
  return supported.indexOf(code) !== -1 ? code : "en";
}

var I18N_LANG = i18nLang();

function t(key, params) {
  var table = I18N[I18N_LANG] || {};
  var str = (table[key] != null) ? table[key] : (I18N.en[key] != null ? I18N.en[key] : key);
  if (params && typeof str === "string") {
    str = str.replace(/\{(\w+)\}/g, function (m, k) {
      return (params[k] != null) ? params[k] : m;
    });
  }
  return str;
}

function tField(key, fallback) {
  var table = I18N_FIELDS[I18N_LANG] || {};
  if (table[key] != null) return table[key];
  if (I18N_FIELDS.en[key] != null) return I18N_FIELDS.en[key];
  return fallback;
}

function tSource(val, fallback) {
  var table = I18N_SOURCES[I18N_LANG] || {};
  if (table[val] != null) return table[val];
  if (I18N_SOURCES.en[val] != null) return I18N_SOURCES.en[val];
  return fallback;
}

function applyI18n(root) {
  var scope = root || document;
  var nodes = scope.querySelectorAll("[data-i18n]");
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
  }
}

// EU Data Act read-only warning (shown in the top bar when that source is used).
I18N.en.eu_warning = "EU Data Act is read-only: features available before are no longer possible (location, remote control, vehicle images, …).";
I18N.fr.eu_warning = "EU Data Act est en lecture seule: des fonctions disponibles auparavant ne sont plus possibles (localisation, contrôle à distance, images du véhicule, …).";
I18N.de.eu_warning = "EU Data Act ist schreibgeschützt: zuvor verfügbare Funktionen sind nicht mehr möglich (Standort, Fernsteuerung, Fahrzeugbilder, …).";
I18N.it.eu_warning = "EU Data Act è di sola lettura: funzioni prima disponibili non sono più possibili (posizione, controllo remoto, immagini del veicolo, …).";
I18N.es.eu_warning = "EU Data Act es de solo lectura: funciones antes disponibles ya no son posibles (ubicación, control remoto, imágenes del vehículo, …).";
I18N.pl.eu_warning = "EU Data Act działa tylko do odczytu: funkcje dostępne wcześniej nie są już możliwe (lokalizacja, zdalne sterowanie, zdjęcia pojazdu, …).";
I18N.pt.eu_warning = "EU Data Act é só de leitura: funções antes disponíveis já não são possíveis (localização, controlo remoto, imagens do veículo, …).";
I18N.no.eu_warning = "EU Data Act er skrivebeskyttet: funksjoner som var tilgjengelige før, er ikke lenger mulige (posisjon, fjernstyring, kjøretøybilder, …).";

// Persistent "restart required" banner and its shortcut to the HA addon page
// (where the Restart and Logs buttons live).
I18N.en.restart_needed = "The saved configuration is not applied yet: restart the addon.";
I18N.fr.restart_needed = "La configuration enregistrée n’est pas encore appliquée : redémarrez l’addon.";
I18N.de.restart_needed = "Die gespeicherte Konfiguration ist noch nicht aktiv: Starten Sie das Addon neu.";
I18N.it.restart_needed = "La configurazione salvata non è ancora applicata: riavvia l’addon.";
I18N.es.restart_needed = "La configuración guardada aún no está aplicada: reinicia el addon.";
I18N.pl.restart_needed = "Zapisana konfiguracja nie została jeszcze zastosowana: uruchom ponownie dodatek.";
I18N.pt.restart_needed = "A configuração guardada ainda não está aplicada: reinicie o addon.";
I18N.no.restart_needed = "Den lagrede konfigurasjonen er ikke tatt i bruk ennå: start tillegget på nytt.";
I18N.en.restart_link = "Open the addon page (Restart / Logs)";
I18N.fr.restart_link = "Ouvrir la page de l’addon (Redémarrer / Journal)";
I18N.de.restart_link = "Addon-Seite öffnen (Neu starten / Protokoll)";
I18N.it.restart_link = "Apri la pagina dell’addon (Riavvia / Registro)";
I18N.es.restart_link = "Abrir la página del addon (Reiniciar / Registro)";
I18N.pl.restart_link = "Otwórz stronę dodatku (Uruchom ponownie / Dziennik)";
I18N.pt.restart_link = "Abrir a página do addon (Reiniciar / Registo)";
I18N.no.restart_link = "Åpne tilleggssiden (Start på nytt / Logg)";
