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

**⚠️Das Projekt befindet sich noch in der Entwicklung,`reverse engineering`der API**

## Repository hinzufügen

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Allgemeine Konfiguration

Füllen Sie nur die Einstellungen für die Marken von Fahrzeugen aus, die Sie besitzen. **Lassen Sie alle anderen Felder leer.**

### 1. Wählen Sie Ihre Fahrzeugmarke aus

Wählen Sie den Hersteller aus, der Ihrem Fahrzeug aus den unterstützten Marken entspricht:

-   `Seat`
-   `Cupra`
-   `Skoda`
-   `Volkswagen`
-   `Tronity`
-   `Volvo`
-   `Audi`

Wenn Sie mehrere Fahrzeuge aus verschiedenen Marken besitzen, können Sie mehrere Abschnitte konfigurieren.

### 2.. Verbinden Sie sich mit den Online -Diensten des Herstellers

Jeder Autohersteller bietet einen Online -Service an, mit dem Sie auf die Daten Ihres Fahrzeugs remote zugreifen können. Um eine Verbindung herzustellen, müssen Sie Ihre Anmeldeinformationen angeben.

#### Erforderliche Informationen:

Für`seat`,`Cupra`,`Skoda`,`Volkswagen`Und`Tronity`:

-   `Brand`: Die Marke des Herstellers.
-   `Username`: Die E -Mail -Adresse, mit der sich bei der Hersteller App angemeldet haben.
-   `Password`: Das Passwort für Ihr Herstellerkonto.
-   `PIN Code`: Ein 4-stelliger Code, der für den Fernzugriff auf bestimmte Fahrzeugfunktionen erforderlich ist.
-   `Refresh Interval`: Definiert, wie oft (in Sekunden) die Daten des Fahrzeugs aktualisiert werden.
-   `Warning:`Das zu häufiges Einstellen einer Aktualisierungsrate kann die vom Hersteller auferlegten API -Anforderungsgrenzen überschreiten, was zu temporären Zugriffsbeschränkungen führt.

⚠️ Sie können 2 Konten für 2 verschiedene Marken oder 2 Autos derselben Marke verwenden, die nicht mit demselben Konto verbunden sind.

Für`Volvo`:

-   `API Key primary`: Volvo API primary key.
-   `API Key secondary`: Volvo API Sekundärschlüssel.
-   `Vehicule Token`: Access token for the vehicule.
-   `Vehicule Location Token`: Zugang zu Token für den Standortendpunkt.
-   `Refresh Interval`: Definiert, wie oft (in Sekunden) die Daten des Fahrzeugs aktualisiert werden.
-   `Warning:`Das zu häufiges Einstellen einer Aktualisierungsrate kann die vom Hersteller auferlegten API -Anforderungsgrenzen überschreiten, was zu temporären Zugriffsbeschränkungen führt.

### 3.. MQTT -Konfiguration (obligatorisch)

Sie müssen `MQTT` verwenden um Fahrzeugdaten an `Home Assistant` zu senden. Konfigurieren Sie diese Einstellungen:

-   `Username`: MQTT Broker Login
-   `Password`: MQTT Broker Passwort
-   `Broker Address`: IP- oder Domänenname des MQTT -Servers

⚠️ Wenn Sie MQTT noch nicht verwenden können Sie zum Beispiel hinzufügen,[`Mosquito Addon`Und`MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4.`WEBUI`

Sie können auf die oberfläche con `Carconnectivity` zugreifen. Die ursprüngliche Schnittstelle.
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

Der Expertenmodus ermöglicht die Verwendung einer benutzerdefinierten Konfigurationsdatei. Wenn dieser Modus aktiviert ist, kann der Benutzer eine Datei mit dem Namen  `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` anlegen. Sie enthält die gewünschten Einstellungen. Dies ersetzt die Konfiguration vollständig aus der grafischen Schnittstelle, die in der Datei `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json` verfügbar ist. 
Wenn das Verzeichnis `/addon_configs/1b1291d4_carconnectivity-addon/`nicht im`Home Assistant`Dateisystem erscheinen machen sie einen neustart vom Supervisor.

In der offiziellen Dokumentation von Carconnectivity finden Sie die Liste der unterstützten Funktionen und erwarteten Parameter.

## Best Practices

-   **Füllen Sie nur die Einstellungen für die Fahrzeugmarken aus, die Sie besitzen.**
-   \***\*Teilen Sie Ihre Login -Anmeldeinformationen nicht. \*\***
-   **Passen Sie das Aktualisierungsintervall an, um die Überschreitung von API -Anforderungsgrenzen zu vermeiden. Denken Sie daran, die Grenze scheint ungefähr 1000 REQ/Day zu sein.**
-   **Verwenden Sie das "Debug" -Protokollierungsebene nur bei Problembehebungsproblemen.**\`\*\*

* * *

Wenn Sie Fragen während der Konfiguration haben oder Probleme haben, lesen Sie die Moduldokumentation.
Wenn Sie einen Fehler finden, öffnen Sie bitte ein Problem.
