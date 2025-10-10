![Supports aarch64 Architecture][aarch64-shield]![Supports amd64 Architecture][amd64-shield][![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|         | `Stable`                                                                                                                                                                                                     | `Edge`                                                                                                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Vertaalde gidsen

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
 [![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![Dutch](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.nl.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)

## Invoering

`CarConnectivity-Addon`Hiermee kunt u informatie over uw voertuig ophalen en ophalen van online services van compatibele fabrikanten. Deze handleiding legt uit hoe de module correct kan worden geconfigureerd.
Ik ben gewoon een verpakking[Het werk (uitstekend) gedaan door tot.](https://github.com/tillsteinbach/CarConnectivity)

Zijn werk is ook beschikbaar als Docker -afbeeldingen. Dus als je gebruikt`Home Assistant`Als stand-alone`docker`, u kunt het ook direct gebruiken.

**⚠️Het project is nog in ontwikkeling,`reverse engineering` of the api to be completed and communication with MQTT/Home assistant to be adapted.⚠️**

## Voeg repository toe

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Algemene configuratie

Only fill in the settings for the brands of vehicles you own. **Laat alle andere velden leeg.**

### 1. Selecteer uw voertuigmerk

Kies de fabrikant die overeenkomt met uw voertuig uit de ondersteunde merken:

-   `Seat`
-   `Cupra`
-   `Skoda`
-   `Volkswagen`
-   `Tronity`
-   `Volvo`
-   `Audi`

Als u meerdere voertuigen van verschillende merken bezit, kunt u meerdere secties configureren.

### 2. Verbinding maken met de online services van de fabrikant

Elke autofabrikant biedt een online service waarmee u op afstand toegang hebt tot de gegevens van uw voertuig. Om verbinding te maken, moet u uw inloggegevens verstrekken.

#### Vereiste informatie:

Voor`Seat`,`Cupra`,`Skoda`,`Volkswagen`En`Tronity`:

-   `Brand`: Het merk van de fabrikant.
-   `Username`: Het e -mailadres dat wordt gebruikt om in te loggen op de service van de fabrikant.
-   `Password`: Het wachtwoord voor uw fabrikantaccount.
-   `PIN Code`: Een 4-cijferige code die nodig is voor externe toegang tot bepaalde voertuigfuncties.
-   `Refresh Interval`: Definieert hoe vaak (in seconden) de gegevens van het voertuig worden bijgewerkt.
-   `Warning:`Het instellen van een verversingssnelheid te vaak kan de API -aanvraaglimieten overschrijden die door de fabrikant worden opgelegd, wat resulteert in tijdelijke toegangsbeperkingen.

⚠️ U kunt 2 accounts gebruiken voor 2 verschillende merken of 2 auto's van hetzelfde merk die niet zijn gekoppeld aan hetzelfde account.

Voor`Volvo`:

-   `API Key primary`: Volvo API primaire sleutel.
-   `API Key secondary`: Volvo API secundaire sleutel.
-   `Vehicule Token`: Toegangstoken voor het voertuig.
-   `Vehicule Location Token`: Toegangstoken voor het eindpunt van de locatie.
-   `Refresh Interval`: Definieert hoe vaak (in seconden) de gegevens van het voertuig worden bijgewerkt.
-   `Warning:`Het instellen van een verversingssnelheid te vaak kan de API -aanvraaglimieten overschrijden die door de fabrikant worden opgelegd, wat resulteert in tijdelijke toegangsbeperkingen.

### 3. MQTT -configuratie (verplicht)

U moet gebruiken`MQTT`om voertuiggegevens naar te verzenden`Home Assistant`, configureer deze instellingen:

-   `Username`: MQTT -inlogmakelaar
-   `Password`: MQTT -makelaarswachtwoord
-   `Broker Address`: IP- of domeinnaam van de MQTT -server

⚠️ Als u MQTT nog niet gebruikt`Home Assistant`, u kunt bijvoorbeeld toevoegen[`Mosquito Addon`En`MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4.`WEBUI`

U hebt toegang tot de`Carconnectivity`'s originele interface van het rechtstreeks gebruik`Home Assistant`.
U kunt uw eigen toegangsreferenties definiëren:

-   `Username`: admin
-   `Password`: secret

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Logboekniveau

Definieer de hoeveelheid informatie die is vastgelegd in logboeken:

-   `Info`: Toont algemene operationele informatie.
-   `Warning`: Toont alleen waarschuwingen.
-   `Error`: Geeft alleen foutmeldingen weer.
-   `Debug`: Toont aanvullende details die nuttig zijn voor het oplossen van problemen.

### 6. API -logboekniveau

Definieer de hoeveelheid informatie die is vastgelegd in logboeken:

-   `Info`: Toont algemene operationele informatie.
-   `Warning`: Toont alleen waarschuwingen.
-   `Error`: Geeft alleen foutmeldingen weer.
-   `Debug`: Toont aanvullende details die nuttig zijn voor het oplossen van problemen.

### 7.`ABRP - A Better Routeplanner`

Voor elk voertuig dat u wilt aansluiten op ABRP (een betere routeplanner), moet u voor elk voertuig een unieke identificatie geven (`vin`) evenals een authenticatietoken (`token`). Met deze paren waarden kunt u een match tussen uw voertuig en het token in het ABRP -systeem vaststellen.

#### Voorwaarden

Om uw token op te halen, gaat u naar uw voertuig op een betere routeplanner, selecteert u "Live Data", en koppelt u vervolgens uw voertuig met het gedeelte "Generieke". Het token om in de configuratie te plakken wordt weergegeven. U moet een match configureren tussen de VIN en het token voor elk voertuig dat u wilt verbinding maken met ABRP.

#### Configuratieformaat

Elke regel moet dit formaat volgen:

-   `vin`: Dit veld vertegenwoordigt het**Voertuigidentificatienummer**(Vin). Het is uniek voor elk voertuig en bevat 17 alfanumerieke tekens.
-   `token`: Dit veld vertegenwoordigt een**authenticatietoken**specifiek voor elk voertuig. Dit token wordt gegenereerd door ABRP wanneer u uw voertuig op het platform verbindt.

##### Voorbeeld van een geldige configuratie:

    - vin: TMBLJ9NY8SF000000
      token: 1623fdc3-4aaf-49f5-b51a-1e55435435da2
    - vin: TMLLJ9NY23F000000
      token: 12afe123-59d4-8a3d-b9ef-29367de7f8749

### 8. Deskundige modus

De expertmodus maakt het gebruik van alle native carconnectiviteitsfuncties mogelijk, inclusief die niet beschikbaar via de grafische interface-zolang de overeenkomstige functies worden ondersteund door de add-on binaries.

⚠️ WAARSCHUWING:
Deze modus schakelt alle inhoudsvalidatie en veiligheidscontroles uit. Als gevolg hiervan kan zelfs een kleine fout (zoals een ongeldige JSON-syntaxis) voorkomen dat de add-on correct wordt gelanceerd.

De expertmodus is alleen bedoeld voor geavanceerde gebruikers.
Om het veilig te gebruiken, moet u:

Wees bekend met JSON -syntaxis en structuur.

De expertmodus maakt het gebruik van een aangepast configuratiebestand mogelijk. Wanneer deze modus is ingeschakeld, kan de gebruiker een bestand met de naam geven`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json`met de gewenste instellingen. Dit vervangt de configuratie volledig van de grafische interface, die beschikbaar zal zijn in`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json`. De map`/addon_configs/1b1291d4_carconnectivity-addon/`mag niet verschijnen in de`Home Assistant`Bestandssysteem. Als dit het geval is, moet de supervisor opnieuw worden gestart.

Raadpleeg de officiële carconnectiviteitsdocumentatie voor de lijst met ondersteunde functies en verwachte parameters.

## Best practices

-   **Vul alleen de instellingen in voor de voertuigmerken die u bezit.**
-   \***\*Deel uw inloggegevens niet. \*\***
-   **Pas het vernieuwingsinterval aan om te voorkomen dat API -aanvraaglimieten worden overschreden. Onthoud dat de limiet ongeveer 1000 req/dag lijkt te zijn.**
-   **Gebruik het "foutopsporingsniveau" alleen bij problemen met het oplossen van problemen.**\`\*\*

* * *

Als u vragen hebt of problemen ondervindt tijdens de configuratie, raadpleegt u de moduledocumentatie.
Als u een bug vindt, open dan een probleem.
