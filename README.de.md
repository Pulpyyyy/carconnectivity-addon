![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
[![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg


# `Home Assistant Add-on: CarConnectivity`

|         | `Stable`                                                                                                                                                                                                     | `Edge`                                                                                                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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

`CarConnectivity-Addon`Ermöglicht die Verbindung und Abruf von Informationen über Ihr Fahrzeug von den Online -Diensten der kompatiblen Hersteller. In diesem Handbuch wird erläutert, wie das Modul ordnungsgemäß konfiguriert wird.
Ich nutze einfach [Das ausgezeichnete Repository von Till.](https://github.com/tillsteinbach/CarConnectivity)

Sein Repository ist auch als Docker -Bild verfügbar. Also, wenn Sie `Home Assistant`als eigenständiges`docker` verwenden, können Sie es auch direkt verwenden.

**⚠️Das Projekt befindet sich noch in der Entwicklung, `reverse engineering` der API muss noch abgeschlossen und die Kommunikation mit MQTT/Home Assistant angepasst werden.⚠️**

> [!IMPORTANT]
> ### 🚧 VAG-API-Sperrung : Volkswagen / Seat / Cupra (Mai 2026)
>
> Seit Ende Mai 2026 hat der Volkswagen-Konzern den Zugriff Dritter auf seine APIs eingeschränkt. Die regulären VW/Seat/Cupra-Konnektoren liefern `403`-Fehler und rufen keine Daten mehr ab, obwohl die offiziellen Apps weiterhin funktionieren. Derzeit gibt es keine Lösung für diese Konnektoren.
>
> **Workaround:** Der schreibgeschützte Konnektor `EU Data Act` ist **✅ in der `edge`-Version** des Add-ons verfügbar.
>
> ⚠️ **Obligatorische Einrichtung:** Dieser Konnektor *lädt* nur Daten herunter, die Sie zuvor im Portal aktivieren müssen. Registrieren Sie sich unter [eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/), öffnen Sie **Request customised data** und wählen Sie **alle Datencluster**, ein **Intervall von 15 Minuten** und eine **unbegrenzte Dauer**. Die ersten Daten können **mehrere Stunden** brauchen, bis sie erscheinen. Ohne dies ruft der Konnektor nichts ab, was so aussehen kann, als würden Ihre Anmeldedaten abgelehnt.
>
> 👉 Verfolgen Sie den Fortschritt im [Issue #142](https://github.com/Pulpyyyy/carconnectivity-addon/issues/142).

> [!TIP]
> ### Eine Edge-Version ist verfügbar
> Die **Edge**-Version ist der **Entwicklungsbuild** (in Arbeit, keine fertige Version): Sie bietet die neuesten Funktionen zuerst und kann instabil sein. Sie enthält den schreibgeschützten Konnektor **EU Data Act** (den oben genannten Workaround) sowie eine neue integrierte Konfigurationsseite. Installieren Sie **"CarConnectivity Add-on Edge"** aus demselben Repository.

## Repository hinzufügen

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Allgemeine Konfiguration

Füllen Sie nur die Einstellungen für die Marken von Fahrzeugen aus, die Sie besitzen. **Lassen Sie alle anderen Felder leer.**

### 1. Wählen Sie Ihre Fahrzeugmarke aus

Wählen Sie den Hersteller aus, der Ihrem Fahrzeug aus den unterstützten Marken entspricht:
- `Seat` *(veraltet: seit Mai 2026 gesperrt, automatisch durch den EU Data Act-Konnektor ersetzt)*
- `Cupra` *(veraltet: seit Mai 2026 gesperrt, automatisch durch den EU Data Act-Konnektor ersetzt)*
- `Skoda`
- `Volkswagen` *(Europa; veraltet: seit Mai 2026 gesperrt, automatisch durch den EU Data Act-Konnektor ersetzt)*
- `Tronity`
- `Volvo`
- `Audi`
- `Volkswagen North America` *(Land wird automatisch durch Ihre Home Assistant-Ländereinstellung festgelegt — standardmäßig `us`, oder `ca`, wenn Ihr HA für Kanada konfiguriert ist)*
- `EU Data Act` *(gemeinsamer schreibgeschützter Konnektor, der die gesperrten Konnektoren Seat / Cupra / Volkswagen (Europa) ersetzt)*

Wenn Sie mehrere Fahrzeuge aus verschiedenen Marken besitzen, können Sie mehrere Abschnitte konfigurieren.

### 2. Verbinden Sie sich mit den Online -Diensten des Herstellers

Jeder Autohersteller bietet einen Online -Service an, mit dem Sie auf die Daten Ihres Fahrzeugs remote zugreifen können. Um eine Verbindung herzustellen, müssen Sie Ihre Anmeldeinformationen angeben.

#### Erforderliche Informationen:

Für `Skoda`, `Audi`, `Volkswagen North America` und `Tronity`:

-   `Brand`: Die Marke des Herstellers.
-   `Username`: Die E -Mail -Adresse, mit der sich bei der Hersteller App angemeldet haben.
-   `Password`: Das Passwort für Ihr Herstellerkonto.
-   `PIN Code`: Ein 4-stelliger Code, der für den Fernzugriff auf bestimmte Fahrzeugfunktionen erforderlich ist.
-   `Refresh Interval`: Definiert, wie oft (in Sekunden) die Daten des Fahrzeugs aktualisiert werden.
-   `Warning:`Das zu häufiges Einstellen einer Aktualisierungsrate kann die vom Hersteller auferlegten API -Anforderungsgrenzen überschreiten, was zu temporären Zugriffsbeschränkungen führt.

⚠️ Sie können 2 Konten für 2 verschiedene Marken oder 2 Autos derselben Marke verwenden, die nicht mit demselben Konto verbunden sind.

Für `EU Data Act` (Seat, Cupra, Volkswagen Europa; schreibgeschützt):

-   `Username`: die E-Mail-Adresse Ihres Markenkontos (Volkswagen ID, SEAT, Cupra usw.).
-   `Password`: das Passwort desselben Markenkontos.

Dieser **schreibgeschützte** Konnektor ersetzt die Konnektoren Seat / Cupra / Volkswagen (Europa), die seit Mai 2026 gesperrt (`403`) sind. Er aktualisiert die Daten etwa alle 15 Minuten und **kann keine Fernbefehle, keinen Standort und keine Fahrzeugbilder senden**. Marke, Aktualisierungsintervall und Gebietsschema (Land/Sprache) werden automatisch festgelegt: Sie geben nur Ihre Anmeldedaten an.

> ⚠️ **Obligatorischer Schritt (sonst erhält der Konnektor nichts).** Aktivieren Sie zuerst die Datenlieferung im Portal: Registrieren Sie sich unter **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** mit demselben **Konto** wie die offizielle App Ihrer Marke und fordern Sie dann **alle Datencluster**, ein **Intervall von 15 Minuten** und eine **unbegrenzte Dauer** an. Die ersten Daten können **mehrere Stunden** brauchen, bis sie erscheinen. Der Konnektor **lädt** nur das herunter, was das Portal bereits erzeugt hat: Solange auf der EU Data Act-Seite keine Datei verfügbar ist, kann er **nichts lesen**, selbst mit korrekten Anmeldedaten (das kann wie eine Ablehnung der Anmeldedaten aussehen).

Für`Volvo`:

-   `API Key primary`: Volvo API Primärschlüssel.
-   `API Key secondary`: Volvo API Sekundärschlüssel.
-   `Vehicule Token`: Zugang zu Token für das Fahrzeug.
-   `Vehicule Location Token`: Zugang zu Token für den Standortendpunkt.
-   `Refresh Interval`: Definiert, wie oft (in Sekunden) die Daten des Fahrzeugs aktualisiert werden.
-   `Warning:`Das zu häufiges Einstellen einer Aktualisierungsrate kann die vom Hersteller auferlegten API -Anforderungsgrenzen überschreiten, was zu temporären Zugriffsbeschränkungen führt.

### 3. MQTT -Konfiguration (obligatorisch)

Sie müssen `MQTT` verwenden um Fahrzeugdaten an `Home Assistant` zu senden. Konfigurieren Sie diese Einstellungen:

-   `Username`: MQTT Broker Login
-   `Password`: MQTT Broker Passwort
-   `Broker Address`: IP- oder Domänenname des MQTT -Servers

⚠️ Wenn Sie MQTT noch nicht verwenden können Sie zum Beispiel hinzufügen,[`Mosquito Addon`Und`MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4.`WEBUI`

Sie können auf die oberfläche von `Carconnectivity` zugreifen. Die ursprüngliche Schnittstelle.
Sie können Ihre eigenen Zugriffsanmeldeinformationen definieren:

-   `Username`: admin
-   `Password`: secret

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Protokollierungsstufe

Definieren Sie die Menge an Informationen, die in Protokollen aufgezeichnet wurden:

-   `Info`: Zeigt allgemeine Betriebsinformationen an.
-   `Warning`: Zeigt nur Warnungen an.
-   `Error`: Zeigt nur Fehlermeldungen an.
-   `Debug`: Zeigt zusätzliche Details an, die für die Fehlerbehebung nützlich sind.

### 6. API -Protokollierungsstufe

Definieren Sie die Menge an Informationen, die in Protokollen aufgezeichnet wurden:

-   `Info`: Zeigt allgemeine Betriebsinformationen an.
-   `Warning`: Zeigt nur Warnungen an.
-   `Error`: Zeigt nur Fehlermeldungen an.
-   `Debug`: Zeigt zusätzliche Details an, die für die Fehlerbehebung nützlich sind.

### 7. `ABRP - A Better Routeplanner`

Für jedes Fahrzeug, das Sie mit ABRP (A Better Routeplanner) verbinden möchten, müssen Sie eine eindeutige Kennung für jedes Fahrzeug (`vin`) sowie ein Authentifizierungstoken (`token`) angeben. Diese Wertpaare ermöglichen die Zuordnung zwischen Ihrem Fahrzeug und seinem Token im ABRP-System.

#### Voraussetzungen

Um Ihr Token zu erhalten, gehen Sie zu Ihrem Fahrzeug in A Better Routeplanner, wählen Sie „Live Data“ aus und verbinden Sie Ihr Fahrzeug über den Abschnitt „Generic“. Das Token, das in der Konfiguration eingefügt werden muss, wird angezeigt. Sie müssen eine Zuordnung zwischen dem VIN und dem Token für jedes Fahrzeug konfigurieren, das Sie mit ABRP verbinden möchten.

#### Konfigurationsformat

Jede Zeile muss folgendem Format entsprechen:

- `vin`: Dieses Feld stellt die **Vehicle Identification Number** (Fahrzeug-Identifikationsnummer) dar. Es ist für jedes Fahrzeug einzigartig und besteht aus 17 alphanumerischen Zeichen.
- `token`: Dieses Feld stellt ein **Authentifizierungstoken** dar, das für jedes Fahrzeug spezifisch ist. Dieses Token wird von ABRP generiert, wenn Sie Ihr Fahrzeug mit der Plattform verbinden.

##### Beispiel für eine gültige Konfiguration:

```
- vin: TMBLJ9NY8SF000000
  token: 1623fdc3-4aaf-49f5-b51a-1e55435435da2
- vin: TMLLJ9NY23F000000
  token: 12afe123-59d4-8a3d-b9ef-29367de7f8749
```

### 8. Expertenmodus

Der Expertenmodus ermöglicht die Verwendung aller nativen Carconnektivitätsfunktionen, einschließlich derer, die nicht über die grafische Schnittstelle verfügbar sind. Solange die entsprechenden Funktionen durch die Add-On-Binärdateien unterstützt werden.

⚠️ Warnung:
Dieser Modus deaktiviert alle Inhaltsvalidierung und Sicherheitskontrollen. Infolgedessen kann selbst ein kleiner Fehler (z. B. eine ungültige JSON-Syntax) verhindern, dass das Add-On korrekt startet.

Der Expertenmodus ist nur für fortgeschrittene Benutzer gedacht.
Um es sicher zu verwenden, müssen Sie sich mit der JSON -Syntax und der Struktur auskennen.

Der Expertenmodus wird allein durch die **Anwesenheit** einer Datei `carconnectivity.expert.json` im Konfigurationsverzeichnis des Add-ons aktiviert (keine Option zum Aktivieren). Diese Datei hat Vorrang und **ersetzt vollständig** die automatisch generierte Konfiguration:

- Version **stable**: Die aus den Add-on-Optionen erzeugte Konfiguration wird in `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json` generiert; die Expertendatei ist `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json`.
- Version **edge**: Die von der Konfigurationsseite erzeugte Konfiguration wird in `/addon_configs/1b1291d4_carconnectivity-addon-edge/carconnectivity.json` generiert (das bearbeitbare Modell der Seite wird separat in `carconnectivity.configui.json` gespeichert); die Expertendatei ist `/addon_configs/1b1291d4_carconnectivity-addon-edge/carconnectivity.expert.json`.

Das Konfigurationsverzeichnis erscheint möglicherweise nicht sofort im `Home Assistant`-Dateisystem. Falls dies der Fall ist, starten Sie den Supervisor neu.

In der offiziellen Dokumentation von Carconnectivity finden Sie die Liste der unterstützten Funktionen und erwarteten Parameter.

## Best Practices

-   **Füllen Sie nur die Einstellungen für die Fahrzeugmarken aus, die Sie besitzen.**
-   **Teilen Sie Ihre Login -Anmeldeinformationen nicht.**
-   **Passen Sie das Aktualisierungsintervall an, um die Überschreitung von API -Anforderungsgrenzen zu vermeiden. Denken Sie daran, die Grenze scheint ungefähr 1000 REQ/Day zu sein.**
-   **Verwenden Sie das "Debug" -Protokollierungsebene nur bei Problembehebungsproblemen.**

* * *

Wenn Sie Fragen während der Konfiguration haben oder Probleme haben, lesen Sie die Moduldokumentation.
Wenn Sie einen Fehler finden, öffnen Sie bitte ein Problem.
