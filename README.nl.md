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
| Versie | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

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

`CarConnectivity-Addon` stelt u in staat verbinding te maken met de online services van compatibele fabrikanten en informatie over uw voertuig op te halen. Deze handleiding legt uit hoe de module correct kan worden geconfigureerd.
Ik verpak eenvoudigweg [het (uitstekende) werk van Till.](https://github.com/tillsteinbach/CarConnectivity)

Zijn werk is ook beschikbaar als Docker-images. Dus als u `Home Assistant` als stand-alone `docker` gebruikt, kunt u het ook direct gebruiken.

**⚠️Het project is nog in ontwikkeling, `reverse engineering` van de api moet nog worden voltooid en de communicatie met MQTT/Home Assistant moet nog worden aangepast.⚠️**

> [!IMPORTANT]
> ### 🚧 VAG-API-blokkering : Volkswagen / Seat / Cupra (mei 2026)
>
> Sinds eind mei 2026 heeft de Volkswagen-groep de toegang van derden tot zijn API's beperkt. De gewone VW/Seat/Cupra-connectoren geven `403`-fouten en halen geen gegevens meer op, ook al werken de officiële apps nog. Er is momenteel geen oplossing voor deze connectoren.
>
> **Tijdelijke oplossing:** de alleen-lezen connector `EU Data Act` is **✅ geïntegreerd in deze add-on** (zie de speciale sectie hieronder); geblokkeerde configuraties worden er automatisch naar gemigreerd.

> [!TIP]
> ### Er is een Edge-versie beschikbaar
> De **Edge**-versie is de **ontwikkelversie** (een werk in uitvoering, geen definitieve versie): ze biedt de nieuwste functies als eerste en kan onstabiel zijn. Installeer **"CarConnectivity Add-on Edge"** vanuit dezelfde repository.

## Voeg repository toe

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configuratie

De add-on wordt volledig geconfigureerd via zijn **ingebouwde configuratiepagina**, niet via het tabblad met opties van Home Assistant (dat alleen een verwijzing ernaar toont).

**Zo opent u de pagina:** tabblad **Info** van de add-on → knop **OPEN WEB UI** → knop **Configuratie** ("Configuration") in de bovenbalk van de pagina. Wanneer het webdashboard is uitgeschakeld (of nog niet is gestart), opent de Web UI direct op de configuratiepagina.

Bij de eerste keer openen wordt een bestaande configuratie **automatisch geïmporteerd** (ook een configuratie die door een oudere versie van de add-on is gemaakt), en geblokkeerde Seat / Cupra / Volkswagen (Europa)-connectoren worden bij het opstarten **automatisch gemigreerd** naar de EU Data Act-connector. **Start de add-on opnieuw** na het opslaan om de nieuwe configuratie toe te passen.

### 1. Voertuigen

Klik op **"+ Voertuig toevoegen"** ("+ Add vehicle") en kies uw merk; voeg één kaart per account toe. Ondersteunde merken:
- `Audi`
- `Bentley` *(alleen EU Data Act)*
- `Cupra` *(alleen EU Data Act: de fabrikantconnector is geblokkeerd sinds mei 2026)*
- `Renault / Dacia`
- `SEAT` *(alleen EU Data Act: de fabrikantconnector is geblokkeerd sinds mei 2026)*
- `Škoda`
- `Tronity`
- `Volkswagen (Europe)` *(alleen EU Data Act: de fabrikantconnector is geblokkeerd sinds mei 2026)*
- `Volkswagen (North America)` *(land automatisch ingesteld op basis van de landinstelling van uw Home Assistant: standaard `us`, `ca` als uw HA is geconfigureerd voor Canada)*
- `Volvo`

De juiste **gegevensbron** wordt voor u gekozen. Een keuze verschijnt alleen wanneer er meer dan één werkt (Škoda en Audi kunnen zowel hun fabrikantaccount als het alleen-lezen EU Data Act-portaal gebruiken; `Automatic` geeft de voorkeur aan die van de fabrikant).

⚠️ U kunt meerdere voertuigen toevoegen, van verschillende merken of twee auto's van hetzelfde merk die niet aan hetzelfde account zijn gekoppeld.

### 2. Verbinding maken met de online services van de fabrikant

De velden die op elke voertuigkaart worden getoond, zijn afhankelijk van het merk:

Voor de VAG-merken (`Volkswagen`, `SEAT`, `Cupra`, `Škoda`, `Audi`, `Bentley`, `Volkswagen North America`):
- `Username`: Het e-mailadres dat wordt gebruikt om in te loggen op de service van de fabrikant.
- `Password`: Het wachtwoord voor uw fabrikantaccount.
- `S-PIN` *(optioneel)*: De 4-cijferige code die nodig is voor externe toegang tot bepaalde voertuigfuncties.
- `VIN` *(optioneel)*: Beperk het account tot één voertuig.

Voor `Volvo`:
- `API key (primary)` / `API key (secondary)`: Volvo API-sleutels.
- `Vehicle token`: Toegangstoken voor het voertuig.
- `Location token` *(optioneel)*: Toegangstoken voor het locatie-eindpunt.
- `Interval` *(optioneel, seconden)*: Verversingsinterval. ⚠️ Te frequente verversingen kunnen de API-aanvraaglimieten van de fabrikant overschrijden en tijdelijke beperkingen veroorzaken.

Voor `Renault / Dacia`:
- `Username` / `Password`: De inloggegevens van uw My Renault-account.
- `Locale` *(optioneel)*: bijv. `fr_FR`, `de_DE`.
- `VIN` *(optioneel)*: Beperk het account tot één voertuig.

Voor `Tronity`:
- `Client ID` / `Client secret`: Uw Tronity API-inloggegevens.
- `Interval` *(optioneel, seconden)*: Verversingsinterval.
- `VIN` *(optioneel)*: Beperk het account tot één voertuig.

#### De gegevensbron `EU Data Act` (Seat, Cupra, Volkswagen Europa, Bentley; optioneel voor Škoda en Audi)

Wanneer een voertuig de EU Data Act-gegevensbron gebruikt, zijn slechts twee velden van belang:
- `Username`: het e-mailadres van uw merkaccount (Volkswagen ID, SEAT, Cupra, enz.).
- `Password`: het wachtwoord van datzelfde merkaccount.

Deze **alleen-lezen** connector vervangt de connectoren Seat / Cupra / Volkswagen (Europa) die sinds mei 2026 zijn geblokkeerd (`403`). Hij vernieuwt de gegevens ongeveer elke 15 minuten en **kan geen externe commando's, locatie of voertuigafbeeldingen verzenden** (een waarschuwing in de bovenbalk herinnert u hieraan zolang hij in gebruik is). Het merk, het verversingsinterval en de OIDC-locale (land/taal) worden automatisch ingesteld: u verstrekt alleen uw inloggegevens.

> ⚠️ **Verplichte instelling, doe dit eerst, anders werkt het niet.** Deze connector *downloadt* alleen de datasets die het EU Data Act-portaal produceert; hij maakt ze nooit voor u aan. Als u deze stap overslaat, maakt de add-on wel verbinding maar **ontvangt hij geen gegevens**, wat er precies uit kan zien alsof uw inloggegevens worden geweigerd. U moet zich eenmalig op het portaal registreren en een permanente gegevenslevering inschakelen:
>
> 1. Open **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** en klik op **Log in**. Kies uw merk (Volkswagen, SEAT, Cupra, ...) en meld u aan met **hetzelfde account** dat u in de officiële app van uw merk gebruikt.
> 2. Selecteer uw voertuig en geef **My Data Portal** toestemming voor toegang.
> 3. Klik op **Request customised data** (ook weergegeven als *Get customised data*) en stel in:
>    - **alle dataclusters**,
>    - een **interval van 15 minuten**,
>    - een **onbeperkte / doorlopende** duur (geen einddatum),
>    - een naam naar keuze (bijvoorbeeld `All data 15min`).
> 4. Verstuur de aanvraag en **heb geduld**. De eerste datasets kunnen **enkele uren, soms meer dan 24 uur**, op zich laten wachten. Daarna wordt ongeveer elke 15 minuten een nieuw ZIP-bestand gepubliceerd en haalt de add-on het automatisch op.
>
> U kunt de voortgang op elk moment controleren door opnieuw op het portaal in te loggen en de lijst met gegevensleveringen van het voertuig te bekijken. Zolang er geen doorlopende aanvraag actief is die bestanden produceert, heeft de connector niets om te lezen.

Volledige details en beperkingen: [CarConnectivity-connector-vw-eu-data-act](https://github.com/mikrohard/CarConnectivity-connector-vw-eu-data-act).

### 3. MQTT-configuratie (verplicht)
`MQTT` is de manier waarop voertuiggegevens `Home Assistant` bereiken:
- `Broker host`: IP- of domeinnaam van de MQTT-server (laat leeg voor de standaardwaarde van de Home Assistant Mosquitto-add-on, `core-mosquitto`)
- `Port`: poort van de broker (standaard `1883`)
- `Username` / `Password`: inloggegevens van de MQTT-broker

⚠️ Als u MQTT nog niet gebruikt op `Home Assistant`, kunt u bijvoorbeeld [`Mosquitto Addon` en de `MQTT integration`](https://www.home-assistant.io/integrations/mqtt) toevoegen

### 4. Webdashboard
Het originele `CarConnectivity`-dashboard kan worden ingeschakeld met de schakelaar **"Het CarConnectivity-webdashboard inschakelen"** ("Enable the CarConnectivity web dashboard"). Zodra de add-on opnieuw is gestart, opent de Web UI op het dashboard, en kunt u via de bovenbalk op elk moment wisselen tussen **Dashboard** en **Configuratie**.

- `Login user` / `Login password` *(optioneel)*: laat de gebruiker leeg (of `autologin`) om automatisch te worden ingelogd; stel beide in om een login te vereisen.

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Logboekniveau
Definieer de hoeveelheid informatie die is vastgelegd in logboeken:
- `Info`: Toont algemene operationele informatie.
- `Warning`: Toont alleen waarschuwingen.
- `Error`: Geeft alleen foutmeldingen weer.
- `Debug`: Toont aanvullende details die nuttig zijn voor het oplossen van problemen.

### 6. API-logboekniveau
Definieer de hoeveelheid informatie die is vastgelegd in logboeken:
- `Info`: Toont algemene operationele informatie.
- `Warning`: Toont alleen waarschuwingen.
- `Error`: Geeft alleen foutmeldingen weer.
- `Debug`: Toont aanvullende details die nuttig zijn voor het oplossen van problemen.

#### Niveaus per component (geavanceerd)

De twee bovenstaande niveaus gelden globaal. Om één component te onderzoeken zonder het log te overspoelen, klapt u **"Niveaus per component (geavanceerd)"** ("Per-component levels (advanced)") open in de sectie Logging van de configuratiepagina: elk geconfigureerd voertuigaccount (log- + API-niveau) en elke plugin (MQTT, Webdashboard, ABRP, MQTT Home Assistant) krijgt een eigen selector. `default` erft het globale niveau, zodat u bijvoorbeeld alles op `info` kunt houden en alleen de MQTT-plugin op `debug` kunt zetten. Een badge op de ingeklapte regel toont hoeveel overrides er actief zijn.

Opmerking: een `debug`-override op een **voertuigaccount** maakt ook de gedeelde HTTP-bibliotheken uitgebreid voor de hele add-on; plugin-overrides zijn volledig geïsoleerd.

### 7. `ABRP - A Better Routeplanner`

Schakel **"Gegevens naar ABRP verzenden"** ("Send data to ABRP") in en voeg vervolgens één regel per voertuig toe met **"+ ABRP-token toevoegen"** ("+ Add ABRP token"):

- `VIN`: het **voertuigidentificatienummer** (17 alfanumerieke tekens), uniek voor elk voertuig.
- `ABRP token`: het **authenticatietoken** dat door ABRP voor dat voertuig wordt gegenereerd.

#### Voorwaarden

Om uw token op te halen, gaat u naar uw voertuig op A Better Routeplanner, selecteert u "Live Data" en koppelt u vervolgens uw voertuig via het gedeelte "Generic". Het token om in de configuratie te plakken wordt weergegeven. Voeg een VIN/token-regel toe voor elk voertuig dat u met ABRP wilt verbinden.

### 8. Deskundige modus
De expertmodus maakt het gebruik van alle native Carconnectivity-functies mogelijk, inclusief functies die niet beschikbaar zijn via de grafische interface, zolang de overeenkomstige functies worden ondersteund door de add-on-binaries.

⚠️ Waarschuwing:
Deze modus schakelt alle inhoudsvalidatie en veiligheidscontroles uit. Als gevolg hiervan kan zelfs een kleine fout (zoals een ongeldige JSON-syntaxis) voorkomen dat de add-on correct wordt gestart.

De expertmodus is alleen bedoeld voor geavanceerde gebruikers.
Om deze veilig te gebruiken, moet u:

Bekend zijn met JSON-syntaxis en -structuur.

De expertmodus wordt geactiveerd door de enkele **aanwezigheid** van een bestand `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` met de gewenste instellingen (geen optie om aan te vinken). Dit bestand heeft voorrang en vervangt volledig de configuratie die door de configuratiepagina wordt gegenereerd, die wordt weggeschreven naar `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.json` (het bewerkbare model van de pagina wordt apart opgeslagen in `carconnectivity.configui.json`). De map `/addon_configs/1b1291d4_carconnectivity-addon/` verschijnt mogelijk niet meteen in het bestandssysteem van `Home Assistant`. Als dit het geval is, start dan de supervisor opnieuw.

Raadpleeg de officiële Carconnectivity-documentatie voor de lijst met ondersteunde functies en verwachte parameters.

## Best practices
- **Voeg alleen voertuigkaarten toe voor de accounts die u bezit.**
- **Deel uw inloggegevens niet.**
- **Pas het verversingsinterval aan (waar beschikbaar) om te voorkomen dat API-aanvraaglimieten worden overschreden. Onthoud dat de limiet ongeveer 1000 req/dag lijkt te zijn.**
- **Gebruik het logniveau "Debug" alleen bij het oplossen van problemen, en geef de voorkeur aan een override per component om de rest van het log rustig te houden.**
- **Start de add-on opnieuw na het opslaan van de configuratie.**

---

Als u vragen hebt of problemen ondervindt tijdens de configuratie, raadpleeg dan de moduledocumentatie.
Als u een bug vindt, open dan een issue.
