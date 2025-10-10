![Supports aarch64 Architecture][aarch64-shield]![Supports amd64 Architecture][amd64-shield][![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|         | `Stable`                                                                                                                                                                                                     | `Edge`                                                                                                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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

`CarConnectivity-Addon`Lar deg koble til og hente informasjon om kjøretøyet ditt fra kompatible produsenters online tjenester. Denne guiden forklarer hvordan du konfigurerer modulen riktig.
Jeg pakker ganske enkelt[Arbeidet (utmerket) gjort av Till.](https://github.com/tillsteinbach/CarConnectivity)

Hans arbeid er også tilgjengelig som Docker -bilder. Så hvis du bruker`Home Assistant`som en frittstående`docker`, kan du også bruke den direkte.

**⚠ Prosjektet er fremdeles under utvikling,`reverse engineering`av API som skal fullføres og kommunikasjon med MQTT/Home Assistant som skal tilpasses.⚠**

## Legg til depot

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Generell konfigurasjon

Bare fyll ut innstillingene for merkevarene du eier.**La alle andre felt tomme.**

### 1. Valg av kjøretøymerke

Velg produsenten som tilsvarer kjøretøyet ditt fra de støttede merkene:

-   `Seat`
-   `Cupra`
-   `Skoda`
-   `Volkswagen`
-   `Tronity`
-   `Volvo`
-   `Audi`

Hvis du eier flere kjøretøyer fra forskjellige merker, kan du konfigurere flere seksjoner.

### 2. Koble til produsentens online tjenester

Hver bilprodusent leverer en online tjeneste som lar deg få tilgang til kjøretøyets data eksternt. For å koble til, må du oppgi påloggingsinformasjon.

#### Nødvendig informasjon:

Til`Seat`,`Cupra`,`Skoda`,`Volkswagen`og`Tronity`:

-   `Brand`: Produsentens merkevare.
-   `Username`: E -postadressen som ble brukt til å logge på produsentens tjeneste.
-   `Password`: Passordet for produsentkontoen din.
-   `PIN Code`: En 4-sifret kode som kreves for fjerntilgang til visse kjøretøyfunksjoner.
-   `Refresh Interval`: Definerer hvor ofte (på sekunder) kjøretøyets data blir oppdatert.
-   `Warning:`Å sette en oppdateringsfrekvens for ofte kan overstige API -forespørselsgrensene pålagt av produsenten, noe som resulterer i midlertidige tilgangsbegrensninger.

⚠ Du kan bruke 2 kontoer for 2 forskjellige merker eller 2 biler av samme merke som ikke er koblet til samme konto.

Til`Volvo`:

-   `API Key primary`: Volvo API primærnøkkel.
-   `API Key secondary`: Volvo API sekundærnøkkel.
-   `Vehicule Token`: Tilgangstoken for kjøretøyet.
-   `Vehicule Location Token`: Tilgangstoken for plasseringsendpunktet.
-   `Refresh Interval`: Definerer hvor ofte (på sekunder) kjøretøyets data blir oppdatert.
-   `Warning:`Å sette en oppdateringsfrekvens for ofte kan overstige API -forespørselsgrensene pålagt av produsenten, noe som resulterer i midlertidige tilgangsbegrensninger.

### 3. MQTT -konfigurasjon (obligatorisk)

Du må bruke`MQTT`å sende kjøretøydata til`Home Assistant`, Konfigurer disse innstillingene:

-   `Username`: MQTT Megler pålogging
-   `Password`: MQTT Meglerpassord
-   `Broker Address`: IP eller domenenavn på MQTT -serveren

⚠️ If you're not already using MQTT on `Home Assistant`, kan du for eksempel legge til[`Mosquito Addon`et`MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4.`WEBUI`

Du kan få tilgang til`Carconnectivity`sitt originale grensesnitt fra å bruke direkte fra`Home Assistant`.
Du kan definere din egen tilgangsopplysning:

-   `Username`: admin
-   `Password`: secret

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Loggnivå

Definer mengden informasjon registrert i logger:

-   `Info`: Viser generell operativ informasjon.
-   `Warning`: Viser bare advarsler.
-   `Error`: Viser bare feilmeldinger.
-   `Debug`: Viser ytterligere detaljer som er nyttige for feilsøking.

### 6. API -loggnivå

Definer mengden informasjon registrert i logger:

-   `Info`: Viser generell operativ informasjon.
-   `Warning`: Viser bare advarsler.
-   `Error`: Viser bare feilmeldinger.
-   `Debug`: Viser ytterligere detaljer som er nyttige for feilsøking.

### 7.`ABRP - A Better Routeplanner`

For hvert kjøretøy du ønsker å koble til ABRP (en bedre ruteplan), må du gi en unik identifikator for hvert kjøretøy (`vin`) samt en autentiseringstoken (`token`). Disse verdiene lar deg etablere en kamp mellom kjøretøyet og dets token i ABRP -systemet.

#### Forutsetninger

For å hente tokenet ditt, gå til kjøretøyet ditt på en bedre ruteplan, velg "Live Data", og koble deretter kjøretøyet ditt ved å bruke den "generiske" -delen. Tokenet å lime inn i konfigurasjonen vises. Du må konfigurere en kamp mellom VIN og tokenet for hvert kjøretøy du ønsker å koble til ABRP.

#### Konfigurasjonsformat

Hver linje skal følge dette formatet:

-   `vin`: Dette feltet representerer**Kjøretøyets identifikasjonsnummer**(Vin). Det er unikt for hvert kjøretøy og inneholder 17 alfanumeriske tegn.
-   `token`: Dette feltet representerer en**Autentiseringstoken**spesifikk for hvert kjøretøy. Dette tokenet genereres av ABRP når du kobler kjøretøyet til plattformen.

##### Eksempel på en gyldig konfigurasjon:

    - vin: TMBLJ9NY8SF000000
      token: 1623fdc3-4aaf-49f5-b51a-1e55435435da2
    - vin: TMLLJ9NY23F000000
      token: 12afe123-59d4-8a3d-b9ef-29367de7f8749

### 8. Ekspertmodus

Ekspertmodus muliggjør bruk av alle innfødte carconnectivity-funksjoner, inkludert de som ikke er tilgjengelige gjennom det grafiske grensesnittet-så lenge de tilsvarende funksjonene støttes av tilleggsbokstene.

⚠ Advarsel:
Denne modusen deaktiverer all innholdsvalidering og sikkerhetskontroller. Som et resultat kan til og med en liten feil (for eksempel en ugyldig JSON-syntaks) forhindre at tillegget lanseres riktig.

Ekspertmodus er kun ment for avanserte brukere.
For å bruke det trygt, må du:

Vær kjent med JSON -syntaks og struktur.

Ekspertmodus tillater bruk av en tilpasset konfigurasjonsfil. Når denne modusen er aktivert, kan brukeren oppgi en som er navngitt fil`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json`inneholder de ønskede innstillingene. Dette erstatter konfigurasjonen helt fra det grafiske grensesnittet, som vil være tilgjengelig i`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json`. Katalogen`/addon_configs/1b1291d4_carconnectivity-addon/`kan ikke vises i`Home Assistant`filsystem. Hvis dette er tilfelle, bør veilederen startes på nytt.

Se den offisielle carconnectivity -dokumentasjonen for listen over støttede funksjoner og forventede parametere.

## Beste praksis

-   **Bare fyll ut innstillingene for kjøretøymerkene du eier.**
-   \***\*Ikke del påloggingsinformasjonen din. \*\***
-   **Juster oppdateringsintervallet for å unngå å overskride API -forespørselsgrenser. Husk at grensen ser ut til å være omtrent 1000 req/dag.**
-   **Bruk "feilsøking" -loggingsnivå bare når du feilsøker problemer.**\`\*\*

* * *

Hvis du har spørsmål eller møter problemer under konfigurasjonen, kan du se moduldokumentasjonen.
Hvis du finner en feil, kan du åpne et problem.
