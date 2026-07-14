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
| Versjon | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Oversatte guider

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
[![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![Dutch](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.nl.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)


## Introduksjon

`CarConnectivity-Addon` lar deg koble til og hente informasjon om kjøretøyet ditt fra kompatible produsenters online tjenester. Denne guiden forklarer hvordan du konfigurerer modulen riktig.
Jeg pakker ganske enkelt [arbeidet (utmerket) gjort av Till.](https://github.com/tillsteinbach/CarConnectivity)

Hans arbeid er også tilgjengelig som Docker-bilder. Så hvis du bruker `Home Assistant` som en frittstående `docker`, kan du også bruke den direkte.

**⚠️ Prosjektet er fremdeles under utvikling, `reverse engineering` av API-et skal fullføres og kommunikasjonen med MQTT/Home Assistant skal tilpasses. ⚠️**

> [!IMPORTANT]
> ### 🚧 VAG-API-blokkering : Volkswagen / Seat / Cupra (mai 2026)
>
> Siden slutten av mai 2026 har Volkswagen-konsernet begrenset tredjepartstilgang til API-ene sine. De vanlige VW/Seat/Cupra-koblingene returnerer `403`-feil og henter ikke lenger data, selv om de offisielle appene fortsatt fungerer. Det finnes for øyeblikket ingen løsning for disse koblingene.
>
> **Løsning:** den skrivebeskyttede koblingen `EU Data Act` er **✅ integrert i dette tillegget** (se den egne seksjonen nedenfor); blokkerte konfigurasjoner flyttes automatisk over til den.

> [!TIP]
> ### En Edge-versjon er tilgjengelig
> **Edge**-versjonen er **utviklingsbygget** (et pågående arbeid, ikke en ferdig versjon): den får de nyeste funksjonene først og kan være ustabil. Installer **"CarConnectivity Add-on Edge"** fra det samme depotet.

## Legg til depot

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Konfigurasjon

Tillegget konfigureres i sin helhet fra den **innebygde konfigurasjonssiden**, ikke fra Home Assistant-fanen for alternativer (som bare viser en henvisning til den).

**Slik åpner du den:** tilleggets **Info**-fane → **OPEN WEB UI**-knappen → **"Konfigurasjon"**-knappen i topplinjen på siden. Når nettpanelet er deaktivert (eller ikke startet ennå), åpnes Web UI direkte på konfigurasjonssiden.

Ved første åpning blir en eksisterende konfigurasjon **importert automatisk** (også en som er laget av en eldre versjon av tillegget), og blokkerte Seat / Cupra / Volkswagen (Europa)-koblinger blir **automatisk flyttet over** til EU Data Act-koblingen ved oppstart. Etter lagring må du **starte tillegget på nytt** for å ta i bruk den nye konfigurasjonen.

### 1. Kjøretøy

Klikk på **"+ Legg til kjøretøy"** og velg merket ditt; legg til ett kort per konto. Støttede merker:
- `Audi`
- `Bentley` *(kun EU Data Act)*
- `Cupra` *(kun EU Data Act: produsentkoblingen er blokkert siden mai 2026)*
- `Renault / Dacia`
- `SEAT` *(kun EU Data Act: produsentkoblingen er blokkert siden mai 2026)*
- `Škoda`
- `Tronity`
- `Volkswagen (Europe)` *(kun EU Data Act: produsentkoblingen er blokkert siden mai 2026)*
- `Volkswagen (North America)` *(land settes automatisk fra din Home Assistant-landsinnstilling: `us` som standard, `ca` hvis din HA er konfigurert for Canada)*
- `Volvo`

Riktig **datakilde** velges for deg. Et valg vises bare når mer enn én fungerer (Škoda og Audi kan bruke enten produsentkontoen sin eller den skrivebeskyttede EU Data Act-portalen; `Automatisk` foretrekker produsentkontoen).

⚠️ Du kan legge til flere kjøretøy, fra forskjellige merker eller to biler av samme merke som ikke er knyttet til samme konto.

### 2. Koble til produsentens online tjenester

Feltene som vises på hvert kjøretøykort avhenger av merket:

For VAG-merkene (`Volkswagen`, `SEAT`, `Cupra`, `Škoda`, `Audi`, `Bentley`, `Volkswagen North America`):
- `Username`: E-postadressen som brukes til å logge på produsentens tjeneste.
- `Password`: Passordet for produsentkontoen din.
- `S-PIN` *(valgfritt)*: Den 4-sifrede koden som kreves for fjerntilgang til visse kjøretøyfunksjoner.
- `VIN` *(valgfritt)*: Begrens kontoen til ett kjøretøy.

For `Volvo`:
- `API key (primary)` / `API key (secondary)`: Volvo API-nøkler.
- `Vehicle token`: Tilgangstoken for kjøretøyet.
- `Location token` *(valgfritt)*: Tilgangstoken for posisjonsendepunktet.
- `Interval` *(valgfritt, sekunder)*: Oppdateringsintervall. ⚠️ For hyppige oppdateringer kan overskride produsentens API-forespørselsgrenser og utløse midlertidige begrensninger.

For `Renault / Dacia`:
- `Username` / `Password`: Påloggingsinformasjonen for My Renault-kontoen din.
- `Locale` *(valgfritt)*: f.eks. `fr_FR`, `de_DE`.
- `VIN` *(valgfritt)*: Begrens kontoen til ett kjøretøy.

For `Tronity`:
- `Client ID` / `Client secret`: Tronity API-påloggingsinformasjonen din.
- `Interval` *(valgfritt, sekunder)*: Oppdateringsintervall.
- `VIN` *(valgfritt)*: Begrens kontoen til ett kjøretøy.

#### Datakilden `EU Data Act` (Seat, Cupra, Volkswagen Europe, Bentley; valgfri for Škoda og Audi)

Når et kjøretøy bruker EU Data Act-datakilden, er det bare to felt som betyr noe:
- `Username`: e-posten til merkekontoen din (Volkswagen ID, SEAT, Cupra, osv.).
- `Password`: passordet til den samme merkekontoen.

Denne **skrivebeskyttede** koblingen erstatter koblingene Seat / Cupra / Volkswagen (Europa) som har vært blokkert (`403`) siden mai 2026. Den oppdaterer data omtrent hvert 15. minutt og **kan ikke sende fjernkommandoer, plassering eller bilder av kjøretøyet** (en advarsel i topplinjen minner deg på dette når den er i bruk). Merke, oppdateringsintervall og OIDC-regioninnstilling (land/språk) settes automatisk: du oppgir kun påloggingsinformasjonen din.

> ⚠️ **Obligatorisk oppsett, gjør dette først, ellers fungerer det ikke.** Denne koblingen bare *laster ned* datasettene som EU Data Act-portalen produserer; den oppretter dem aldri for deg. Hvis du hopper over dette steget, kobler tillegget seg til, men **mottar ingen data**, noe som kan se ut nøyaktig som om påloggingsinformasjonen din blir avvist. Du må registrere deg på portalen og aktivere en permanent datautlevering én gang:
>
> 1. Åpne **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** og klikk på **Log in**. Velg merket ditt (Volkswagen, SEAT, Cupra, ...) og logg inn med **samme konto** som du bruker i den offisielle merkeappen.
> 2. Velg kjøretøyet ditt og gi **My Data Portal** tilgang til det.
> 3. Klikk på **Request customised data** (vises også som *Get customised data*) og konfigurer:
>    - **alle dataklynger**,
>    - et **intervall på 15 minutter**,
>    - en **ubegrenset / kontinuerlig** varighet (ingen sluttdato),
>    - et navn du velger selv (for eksempel `All data 15min`).
> 4. Send inn, og **vær tålmodig**. De første datasettene kan ta **flere timer, noen ganger mer enn 24 timer**, før de vises. Deretter publiseres en ny ZIP-fil omtrent hvert 15. minutt, og tillegget henter den automatisk.
>
> Du kan når som helst sjekke fremdriften ved å logge inn på portalen igjen og se på kjøretøyets liste over datautleveringer. Så lenge ingen kontinuerlig forespørsel er aktiv og produserer filer, har koblingen ingenting å lese.

Alle detaljer og begrensninger: [CarConnectivity-connector-vw-eu-data-act](https://github.com/mikrohard/CarConnectivity-connector-vw-eu-data-act).

### 3. MQTT-konfigurasjon (obligatorisk)
`MQTT` er måten kjøretøydata når `Home Assistant` på:
- `Broker host`: IP eller domenenavn på MQTT-serveren (la stå tomt for standardverdien til Home Assistant Mosquitto-tillegget, `core-mosquitto`)
- `Port`: meglerport (standard `1883`)
- `Username` / `Password`: påloggingsinformasjon for MQTT-megleren

⚠️ Hvis du ikke allerede bruker MQTT på `Home Assistant`, kan du for eksempel legge til [`Mosquitto Addon` og `MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4. Nettpanel
Det originale `CarConnectivity`-panelet kan aktiveres med bryteren **"Aktiver CarConnectivity-nettpanelet"**. Når tillegget har startet på nytt, åpnes Web UI på panelet, og topplinjen lar deg når som helst bytte mellom **"Panel"** og **"Konfigurasjon"**.

- `Login user` / `Login password` *(valgfritt)*: la brukeren stå tom (eller `autologin`) for å bli logget inn automatisk; sett begge for å kreve pålogging.

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Loggnivå
Definer mengden informasjon registrert i logger:
- `Info`: Viser generell operativ informasjon.
- `Warning`: Viser bare advarsler.
- `Error`: Viser bare feilmeldinger.
- `Debug`: Viser ytterligere detaljer som er nyttige for feilsøking.

### 6. API-loggnivå
Definer mengden informasjon registrert i logger:
- `Info`: Viser generell operativ informasjon.
- `Warning`: Viser bare advarsler.
- `Error`: Viser bare feilmeldinger.
- `Debug`: Viser ytterligere detaljer som er nyttige for feilsøking.

#### Nivåer per komponent (avansert)

De to nivåene ovenfor gjelder globalt. For å feilsøke en enkelt komponent uten å oversvømme loggen, utvid **"Nivåer per komponent (avansert)"** i Logging-seksjonen på konfigurasjonssiden: hver konfigurerte kjøretøykonto (logg- + API-nivå) og hver plugin (MQTT, Nettpanel, ABRP, MQTT Home Assistant) får sin egen velger. `default` arver det globale nivået, så du kan for eksempel beholde alt på `info` og sette bare MQTT-pluginen til `debug`. Et merke på den sammenfoldede linjen viser hvor mange tilpasninger som er aktive.

Merk: en `debug`-tilpasning på en **kjøretøykonto** gjør også de delte HTTP-bibliotekene detaljerte for hele tillegget; plugin-tilpasninger er helt isolerte.

### 7. `ABRP - A Better Routeplanner`

Aktiver **"Send data til ABRP"**, og legg deretter til én rad per kjøretøy med **"+ Legg til ABRP-token"**:

- `VIN`: **kjøretøyets identifikasjonsnummer** (17 alfanumeriske tegn), unikt for hvert kjøretøy.
- `ABRP token`: **autentiseringstokenet** generert av ABRP for det kjøretøyet.

#### Forutsetninger

For å hente tokenet ditt, gå til kjøretøyet ditt på A Better Routeplanner, velg "Live Data", og koble deretter kjøretøyet ditt ved å bruke "Generic"-delen. Tokenet som skal limes inn i konfigurasjonen vises. Legg til en VIN/token-rad for hvert kjøretøy du ønsker å koble til ABRP.

### 8. Ekspertmodus
Ekspertmodus muliggjør bruk av alle native Carconnectivity-funksjoner, inkludert de som ikke er tilgjengelige gjennom det grafiske grensesnittet, så lenge de tilsvarende funksjonene støttes av tilleggets binærfiler.

⚠️ Advarsel:
Denne modusen deaktiverer all innholdsvalidering og alle sikkerhetskontroller. Som et resultat kan selv en liten feil (for eksempel ugyldig JSON-syntaks) forhindre at tillegget starter riktig.

Ekspertmodus er kun ment for avanserte brukere.
For å bruke den trygt, må du:

Være kjent med JSON-syntaks og -struktur.

Ekspertmodus aktiveres ganske enkelt ved at en fil `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` med de ønskede innstillingene er **til stede** (ingen bryter å slå på). Den har forrang og erstatter fullstendig konfigurasjonen som lages av konfigurasjonssiden, som skrives til `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.json` (sidens redigerbare modell lagres separat i `carconnectivity.configui.json`). Katalogen `/addon_configs/1b1291d4_carconnectivity-addon/` vises kanskje ikke umiddelbart i `Home Assistant`-filsystemet. Hvis dette er tilfelle, start veilederen på nytt.

Se den offisielle Carconnectivity-dokumentasjonen for listen over støttede funksjoner og forventede parametere.

## Beste praksis
- **Legg bare til kjøretøykort for kontoene du eier.**
- **Ikke del påloggingsinformasjonen din.**
- **Juster oppdateringsintervallet (der det er tilgjengelig) for å unngå å overskride API-forespørselsgrenser. Husk at grensen ser ut til å være omtrent 1000 req/dag.**
- **Bruk "Debug"-loggnivået bare når du feilsøker problemer, og foretrekk en tilpasning per komponent for å holde resten av loggen rolig.**
- **Start tillegget på nytt etter at du har lagret konfigurasjonen.**

---

Hvis du har spørsmål eller møter problemer under konfigurasjonen, kan du se moduldokumentasjonen.
Hvis du finner en feil, kan du åpne et problem.
