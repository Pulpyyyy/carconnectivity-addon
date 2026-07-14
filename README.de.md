![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
[![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|         | `Stable`                                                                                                                         | `Edge`                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Version | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Übersetzte Anleitung

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
[![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![Dutch](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.nl.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)


## Einführung

`CarConnectivity-Addon` ermöglicht die Verbindung und den Abruf von Informationen über Ihr Fahrzeug von den Online-Diensten der kompatiblen Hersteller. In diesem Handbuch wird erläutert, wie das Modul ordnungsgemäß konfiguriert wird.
Ich nutze einfach [das ausgezeichnete Repository von Till.](https://github.com/tillsteinbach/CarConnectivity)

Sein Repository ist auch als Docker-Bild verfügbar. Also, wenn Sie `Home Assistant` als eigenständiges `docker` verwenden, können Sie es auch direkt verwenden.

**⚠️Das Projekt befindet sich noch in der Entwicklung, `reverse engineering` der API muss noch abgeschlossen und die Kommunikation mit MQTT/Home Assistant angepasst werden.⚠️**

> [!IMPORTANT]
> ### 🚧 VAG-API-Sperrung : Volkswagen / Seat / Cupra (Mai 2026)
>
> Seit Ende Mai 2026 hat der Volkswagen-Konzern den Zugriff Dritter auf seine APIs eingeschränkt. Die regulären VW/Seat/Cupra-Konnektoren liefern `403`-Fehler und rufen keine Daten mehr ab, obwohl die offiziellen Apps weiterhin funktionieren. Derzeit gibt es keine Lösung für diese Konnektoren.
>
> **Workaround:** Der schreibgeschützte Konnektor `EU Data Act` ist **✅ in dieses Add-on integriert** (siehe den entsprechenden Abschnitt weiter unten); gesperrte Konfigurationen werden automatisch darauf migriert.

> [!TIP]
> ### Eine Edge-Version ist verfügbar
> Die **Edge**-Version ist der **Entwicklungsbuild** (in Arbeit, keine fertige Version): Sie bietet die neuesten Funktionen zuerst und kann instabil sein. Installieren Sie **"CarConnectivity Add-on Edge"** aus demselben Repository.

## Repository hinzufügen

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Konfiguration

Das Add-on wird vollständig über seine **integrierte Konfigurationsseite** konfiguriert, nicht über den Optionen-Tab von Home Assistant (der nur einen Verweis darauf anzeigt).

**So öffnen Sie sie:** Add-on-Tab **Info** → Schaltfläche **OPEN WEB UI** → Schaltfläche **Konfiguration** in der oberen Leiste der Seite. Wenn das Web-Dashboard deaktiviert ist (oder noch nicht gestartet wurde), öffnet sich die Web UI direkt auf der Konfigurationsseite.

Beim ersten Öffnen wird eine vorhandene Konfiguration **automatisch importiert** (auch eine, die von einer älteren Version des Add-ons erzeugt wurde), und gesperrte Konnektoren für Seat / Cupra / Volkswagen (Europa) werden beim Start **automatisch** auf den EU Data Act-Konnektor **migriert**. Starten Sie das Add-on nach dem Speichern **neu**, um die neue Konfiguration zu übernehmen.

### 1. Fahrzeuge

Klicken Sie auf **"+ Fahrzeug hinzufügen"** und wählen Sie Ihre Marke; fügen Sie eine Karte pro Konto hinzu. Unterstützte Marken:
- `Audi`
- `Bentley` *(nur EU Data Act)*
- `Cupra` *(nur EU Data Act: der Hersteller-Konnektor ist seit Mai 2026 gesperrt)*
- `Renault / Dacia`
- `SEAT` *(nur EU Data Act: der Hersteller-Konnektor ist seit Mai 2026 gesperrt)*
- `Škoda`
- `Tronity`
- `Volkswagen (Europe)` *(nur EU Data Act: der Hersteller-Konnektor ist seit Mai 2026 gesperrt)*
- `Volkswagen (North America)` *(Land wird automatisch anhand Ihrer Home-Assistant-Ländereinstellung festgelegt: standardmäßig `us`, `ca`, wenn Ihr HA für Kanada konfiguriert ist)*
- `Volvo`

Die richtige **Datenquelle** wird für Sie ausgewählt. Eine Auswahl erscheint nur, wenn mehr als eine möglich ist (Škoda und Audi können entweder ihr Herstellerkonto oder das schreibgeschützte EU Data Act-Portal verwenden; `Automatisch` bevorzugt das Herstellerkonto).

⚠️ Sie können mehrere Fahrzeuge hinzufügen, von verschiedenen Marken oder zwei Autos derselben Marke, die nicht mit demselben Konto verbunden sind.

### 2. Verbindung mit den Online-Diensten des Herstellers

Die auf jeder Fahrzeugkarte angezeigten Felder hängen von der Marke ab:

Für die VAG-Marken (`Volkswagen`, `SEAT`, `Cupra`, `Škoda`, `Audi`, `Bentley`, `Volkswagen North America`):
- `Benutzername`: Die E-Mail-Adresse, mit der Sie sich beim Dienst des Herstellers anmelden.
- `Passwort`: Das Passwort für Ihr Herstellerkonto.
- `S-PIN` *(optional)*: Der 4-stellige Code, der für den Fernzugriff auf bestimmte Fahrzeugfunktionen erforderlich ist.
- `VIN` *(optional)*: Beschränkt das Konto auf ein Fahrzeug.

Für `Volvo`:
- `API-Schlüssel (primär)` / `API-Schlüssel (sekundär)`: Volvo-API-Schlüssel.
- `Fahrzeug-Token`: Zugriffstoken für das Fahrzeug.
- `Standort-Token` *(optional)*: Zugriffstoken für den Standortendpunkt.
- `Intervall` *(optional, Sekunden)*: Aktualisierungsintervall. ⚠️ Zu häufige Aktualisierungen können die API-Anforderungsgrenzen des Herstellers überschreiten und zu temporären Einschränkungen führen.

Für `Renault / Dacia`:
- `Benutzername` / `Passwort`: Ihre My-Renault-Zugangsdaten.
- `Gebietsschema` *(optional)*: z. B. `fr_FR`, `de_DE`.
- `VIN` *(optional)*: Beschränkt das Konto auf ein Fahrzeug.

Für `Tronity`:
- `Client ID` / `Client-Secret`: Ihre Tronity-API-Zugangsdaten.
- `Intervall` *(optional, Sekunden)*: Aktualisierungsintervall.
- `VIN` *(optional)*: Beschränkt das Konto auf ein Fahrzeug.

#### Die Datenquelle `EU Data Act` (Seat, Cupra, Volkswagen Europa, Bentley; optional für Škoda und Audi)

Wenn ein Fahrzeug die EU Data Act-Datenquelle verwendet, sind nur zwei Felder relevant:
- `Benutzername`: die E-Mail-Adresse Ihres Markenkontos (Volkswagen ID, SEAT, Cupra usw.).
- `Passwort`: das Passwort desselben Markenkontos.

Dieser **schreibgeschützte** Konnektor ersetzt die Konnektoren Seat / Cupra / Volkswagen (Europa), die seit Mai 2026 gesperrt (`403`) sind. Er aktualisiert die Daten etwa alle 15 Minuten und **kann keine Fernbefehle, keinen Standort und keine Fahrzeugbilder senden** (eine Warnung in der oberen Leiste erinnert Sie daran, solange er verwendet wird). Marke, Aktualisierungsintervall und OIDC-Gebietsschema (Land/Sprache) werden automatisch festgelegt: Sie geben nur Ihre Anmeldedaten an.

> ⚠️ **Obligatorische Einrichtung, führen Sie dies zuerst durch, sonst funktioniert es nicht.** Dieser Konnektor *lädt* nur die Datensätze herunter, die das EU Data Act-Portal erzeugt; er erstellt sie niemals für Sie. Wenn Sie diesen Schritt überspringen, verbindet sich das Add-on zwar, **erhält aber keine Daten**, was genauso aussehen kann, als würden Ihre Anmeldedaten abgelehnt. Sie müssen sich einmalig im Portal registrieren und eine dauerhafte Datenlieferung aktivieren:
>
> 1. Öffnen Sie **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** und klicken Sie auf **Log in**. Wählen Sie Ihre Marke (Volkswagen, SEAT, Cupra, ...) und melden Sie sich mit dem **gleichen Konto** an, das Sie in der offiziellen App Ihrer Marke verwenden.
> 2. Wählen Sie Ihr Fahrzeug aus und autorisieren Sie **My Data Portal** für den Zugriff darauf.
> 3. Klicken Sie auf **Request customised data** (auch als *Get customised data* angezeigt) und konfigurieren Sie:
>    - **alle Datencluster**,
>    - ein **Intervall von 15 Minuten**,
>    - eine **unbegrenzte / kontinuierliche** Dauer (kein Enddatum),
>    - einen Namen Ihrer Wahl (zum Beispiel `All data 15min`).
> 4. Senden Sie die Anfrage ab und **haben Sie Geduld**. Die ersten Datensätze können **mehrere Stunden, manchmal mehr als 24 Stunden**, brauchen, bis sie erscheinen. Danach wird etwa alle 15 Minuten eine neue ZIP-Datei veröffentlicht, die das Add-on automatisch abholt.
>
> Sie können den Fortschritt jederzeit prüfen, indem Sie sich erneut im Portal anmelden und die Liste der Datenlieferungen des Fahrzeugs ansehen. Solange keine kontinuierliche Anfrage aktiv ist und Dateien erzeugt, hat der Konnektor nichts zu lesen.

Alle Details und Einschränkungen: [CarConnectivity-connector-vw-eu-data-act](https://github.com/mikrohard/CarConnectivity-connector-vw-eu-data-act).

### 3. MQTT-Konfiguration (obligatorisch)
Über `MQTT` gelangen die Fahrzeugdaten zu `Home Assistant`:
- `Broker-Host`: IP- oder Domänenname des MQTT-Servers (leer lassen für den Standard des Home-Assistant-Mosquitto-Add-ons, `core-mosquitto`)
- `Port`: Broker-Port (Standard `1883`)
- `Benutzername` / `Passwort`: Zugangsdaten des MQTT-Brokers

⚠️ Wenn Sie MQTT auf `Home Assistant` noch nicht verwenden, können Sie zum Beispiel [`Mosquitto Addon` und die `MQTT integration`](https://www.home-assistant.io/integrations/mqtt) hinzufügen

### 4. Web-Dashboard
Das ursprüngliche `CarConnectivity`-Dashboard kann mit dem Schalter **"CarConnectivity-Web-Dashboard aktivieren"** aktiviert werden. Nach dem Neustart des Add-ons öffnet sich die Web UI auf dem Dashboard, und über die obere Leiste können Sie jederzeit zwischen **Dashboard** und **Konfiguration** wechseln.

- `Anmeldebenutzer` / `Anmeldepasswort` *(optional)*: Lassen Sie den Benutzer leer (oder `autologin`), um automatisch angemeldet zu werden; setzen Sie beide, um eine Anmeldung zu verlangen.

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Protokollierungsstufe
Definieren Sie die Menge an Informationen, die in den Protokollen aufgezeichnet wird:
- `Info`: Zeigt allgemeine Betriebsinformationen an.
- `Warning`: Zeigt nur Warnungen an.
- `Error`: Zeigt nur Fehlermeldungen an.
- `Debug`: Zeigt zusätzliche Details an, die für die Fehlerbehebung nützlich sind.

### 6. API-Protokollierungsstufe
Definieren Sie die Menge an Informationen, die in den Protokollen aufgezeichnet wird:
- `Info`: Zeigt allgemeine Betriebsinformationen an.
- `Warning`: Zeigt nur Warnungen an.
- `Error`: Zeigt nur Fehlermeldungen an.
- `Debug`: Zeigt zusätzliche Details an, die für die Fehlerbehebung nützlich sind.

#### Stufen pro Komponente (erweitert)

Die beiden oben genannten Stufen gelten global. Um eine einzelne Komponente zu untersuchen, ohne das Protokoll zu überfluten, klappen Sie **"Stufen pro Komponente (erweitert)"** im Abschnitt Protokollierung der Konfigurationsseite auf: Jedes konfigurierte Fahrzeugkonto (Protokoll- + API-Stufe) und jedes Plugin (MQTT, Web-Dashboard, ABRP, MQTT Home Assistant) erhält einen eigenen Selektor. `default` erbt die globale Stufe, sodass Sie zum Beispiel alles auf `info` lassen und nur das MQTT-Plugin auf `debug` setzen können. Ein Badge auf der eingeklappten Zeile zeigt, wie viele Anpassungen aktiv sind.

Hinweis: Eine `debug`-Anpassung bei einem **Fahrzeugkonto** macht auch die gemeinsam genutzten HTTP-Bibliotheken für das gesamte Add-on gesprächig; Plugin-Anpassungen sind vollständig isoliert.

### 7. `ABRP - A Better Routeplanner`

Aktivieren Sie **"Daten an ABRP senden"** und fügen Sie dann mit **"+ ABRP-Token hinzufügen"** eine Zeile pro Fahrzeug hinzu:

- `VIN`: die **Vehicle Identification Number** (Fahrzeug-Identifikationsnummer, 17 alphanumerische Zeichen), einzigartig für jedes Fahrzeug.
- `ABRP-Token`: das von ABRP für dieses Fahrzeug generierte **Authentifizierungstoken**.

#### Voraussetzungen

Um Ihr Token zu erhalten, gehen Sie zu Ihrem Fahrzeug in A Better Routeplanner, wählen Sie „Live Data" aus und verbinden Sie Ihr Fahrzeug über den Abschnitt „Generic". Das Token, das in die Konfiguration eingefügt werden muss, wird angezeigt. Fügen Sie für jedes Fahrzeug, das Sie mit ABRP verbinden möchten, eine VIN/Token-Zeile hinzu.

### 8. Expertenmodus
Der Expertenmodus ermöglicht die Verwendung aller nativen Carconnectivity-Funktionen, einschließlich derer, die nicht über die grafische Oberfläche verfügbar sind, solange die entsprechenden Funktionen von den Add-on-Binärdateien unterstützt werden.

⚠️ Warnung:
Dieser Modus deaktiviert alle Inhaltsvalidierungen und Sicherheitskontrollen. Infolgedessen kann selbst ein kleiner Fehler (z. B. eine ungültige JSON-Syntax) verhindern, dass das Add-on korrekt startet.

Der Expertenmodus ist nur für fortgeschrittene Benutzer gedacht.
Um ihn sicher zu verwenden, müssen Sie:

Mit der JSON-Syntax und -Struktur vertraut sein.

Der Expertenmodus wird allein durch die **Anwesenheit** einer Datei `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` mit den gewünschten Einstellungen aktiviert (keine Option zum Umschalten). Sie hat Vorrang und ersetzt vollständig die von der Konfigurationsseite erzeugte Konfiguration, die in `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.json` geschrieben wird (das bearbeitbare Modell der Seite wird separat in `carconnectivity.configui.json` gespeichert). Das Verzeichnis `/addon_configs/1b1291d4_carconnectivity-addon/` erscheint möglicherweise nicht sofort im `Home Assistant`-Dateisystem. Falls dies der Fall ist, starten Sie den Supervisor neu.

In der offiziellen Dokumentation von Carconnectivity finden Sie die Liste der unterstützten Funktionen und erwarteten Parameter.

## Best Practices
- **Fügen Sie nur Fahrzeugkarten für Konten hinzu, die Sie besitzen.**
- **Teilen Sie Ihre Anmeldedaten nicht.**
- **Passen Sie das Aktualisierungsintervall (wo verfügbar) an, um die API-Anforderungsgrenzen nicht zu überschreiten. Denken Sie daran, die Grenze scheint bei etwa 1000 Anfragen/Tag zu liegen.**
- **Verwenden Sie die Protokollierungsstufe "Debug" nur bei der Fehlerbehebung und bevorzugen Sie eine Anpassung pro Komponente, damit der Rest des Protokolls ruhig bleibt.**
- **Starten Sie das Add-on nach dem Speichern der Konfiguration neu.**

---

Wenn Sie Fragen haben oder während der Konfiguration auf Probleme stoßen, lesen Sie die Moduldokumentation.
Wenn Sie einen Fehler finden, öffnen Sie bitte ein Issue.
