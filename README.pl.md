![Supports aarch64 Architecture][aarch64-shield]![Supports amd64 Architecture][amd64-shield][![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|        | `Stable`                                                                                                                                                                                                     | `Edge`                                                                                                                                                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wersja | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Przetłumaczone przewodniki

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
 [![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![Dutch](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.nl.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)

## Wstęp

`CarConnectivity-Addon`Umożliwia połączenie i pobieranie informacji o pojazdu z usług online kompatybilnych producentów. Ten przewodnik wyjaśnia, jak prawidłowo skonfigurować moduł.
Po prostu pakuję[Praca (doskonała) wykonana przez Till.](https://github.com/tillsteinbach/CarConnectivity)

Jego praca jest również dostępna jako obrazy Docker. Więc jeśli używasz`Home Assistant`jako samodzielny`docker`, możesz go również bezpośrednio użyć.

**⚠️ Projekt jest nadal w trakcie opracowywania,`reverse engineering`interfejsu API, który ma zostać ukończony i komunikacja z MQTT/Asystentem Home, który ma zostać dostosowany**

## Dodaj repozytorium

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Ogólna konfiguracja

Wypełnij tylko ustawienia dla marek pojazdów, które posiadasz.**Pozostaw wszystkie inne pola puste.**

### 1. Wybór marki pojazdu

Wybierz producenta odpowiadającego Twojemu pojazdowi od obsługiwanych marek:

-   `Seat`
-   `Cupra`
-   `Skoda`
-   `Volkswagen`
-   `Tronity`
-   `Volvo`
-   `Audi`

Jeśli posiadasz wiele pojazdów od różnych marek, możesz skonfigurować wiele sekcji.

### 2. Łączenie się z usługami online producenta

Każdy producent samochodów zapewnia usługę online, która umożliwia zdalne dostęp do danych pojazdu. Aby się połączyć, musisz podać poświadczenia logowania.

#### Wymagane informacje:

Dla`Seat`,`Cupra`,`Skoda`,`Volkswagen`I`Tronity`:

-   `Brand`: Marka producenta.
-   `Username`: Adres e -mail używany do zalogowania się do usługi producenta.
-   `Password`: Hasło do konta producenta.
-   `PIN Code`: 4-cyfrowy kod wymagany do zdalnego dostępu do niektórych funkcji pojazdu.
-   `Refresh Interval`: Określa, jak często (w sekundach) dane pojazdu są aktualizowane.
-   `Warning:`Zbyt często ustawienie prędkości odświeżania może przekraczać limity żądania API nałożone przez producenta, co powoduje tymczasowe ograniczenia dostępu.

⚠️ Możesz użyć 2 kont dla 2 różnych marek lub 2 samochodów tej samej marki, które nie są powiązane z tym samym kontem.

Dla`Volvo`:

-   `API Key primary`: Klucz podstawowy Volvo API.
-   `API Key secondary`: Klucz wtórny Volvo API.
-   `Vehicule Token`: Token dostępu do pojazdu.
-   `Vehicule Location Token`: Token dostępu do punktu końcowego lokalizacji.
-   `Refresh Interval`: Określa, jak często (w sekundach) dane pojazdu są aktualizowane.
-   `Warning:`Zbyt często ustawienie prędkości odświeżania może przekraczać limity żądania API nałożone przez producenta, co powoduje tymczasowe ograniczenia dostępu.

### 3. Konfiguracja MQTT (obowiązkowa)

Musisz użyć`MQTT`Aby wysłać dane pojazdu do`Home Assistant`, Skonfiguruj te ustawienia:

-   `Username`: Login Broker MQTT
-   `Password`: Hasło brokera MQTT
-   `Broker Address`: Nazwa IP lub domeny serwera MQTT

⚠️ Jeśli jeszcze nie używasz MQTT`Home Assistant`, możesz na przykład dodać, na przykład[`Mosquito Addon`I`MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4.`WEBUI`

Możesz uzyskać dostęp do`Carconnectivity`oryginalny interfejs z używania bezpośrednio z`Home Assistant`.
Możesz zdefiniować własne poświadczenia dostępu:

-   `Username`: admin
-   `Password`: secret

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Poziom rejestrowania

Zdefiniuj ilość informacji zarejestrowanych w dziennikach:

-   `Info`: Wyświetla ogólne informacje operacyjne.
-   `Warning`: Wyświetla tylko ostrzeżenia.
-   `Error`: Wyświetla tylko komunikaty o błędach.
-   `Debug`: Wyświetla dodatkowe szczegóły przydatne do rozwiązywania problemów.

### 6. Poziom rejestrowania API

Zdefiniuj ilość informacji zarejestrowanych w dziennikach:

-   `Info`: Wyświetla ogólne informacje operacyjne.
-   `Warning`: Wyświetla tylko ostrzeżenia.
-   `Error`: Wyświetla tylko komunikaty o błędach.
-   `Debug`: Wyświetla dodatkowe szczegóły przydatne do rozwiązywania problemów.

### 7.`ABRP - A Better Routeplanner`

Dla każdego pojazdu, który chcesz połączyć z ABRP (lepszy planner trasy), musisz podać unikalny identyfikator dla każdego pojazdu (`vin`) a także token uwierzytelniający (`token`). Te pary wartości pozwalają ustalić dopasowanie między pojazdem a jego tokenem w systemie ABRP.

#### Wymagania wstępne

Aby odzyskać token, przejdź do pojazdu na lepszym planierze trasy, wybierz „Dane na żywo”, a następnie połącz swój pojazd za pomocą sekcji „Generic”. Zostanie wyświetlony token wklejania do konfiguracji. Musisz skonfigurować dopasowanie między VIN a tokenem dla każdego pojazdu, które chcesz połączyć z ABRP.

#### Format konfiguracji

Każda linia powinna postępować zgodnie z tym formatem:

-   `vin`: To pole reprezentuje**Numer identyfikacji pojazdu**(Vin). Jest unikalny dla każdego pojazdu i zawiera 17 znaków alfanumerycznych.
-   `token`: To pole reprezentuje**Token uwierzytelnienia**specyficzne dla każdego pojazdu. Ten token jest generowany przez ABRP po podłączeniu pojazdu z platformą.

##### Przykład prawidłowej konfiguracji:

    - vin: TMBLJ9NY8SF000000
      token: 1623fdc3-4aaf-49f5-b51a-1e55435435da2
    - vin: TMLLJ9NY23F000000
      token: 12afe123-59d4-8a3d-b9ef-29367de7f8749

### 8. Tryb ekspertów

Tryb ekspertów umożliwia użycie wszystkich natywnych funkcji Carconnectivity, w tym tych, które nie są dostępne za pośrednictwem interfejsu graficznego-o ile odpowiednie funkcje są obsługiwane przez dodatkowe binarie.

⚠️ Ostrzeżenie:
Ten tryb wyłącza wszystkie kontrole walidacji treści i bezpieczeństwo. W rezultacie nawet niewielki błąd (taki jak nieprawidłowa składnia JSON) może uniemożliwić prawidłowe uruchomienie dodatku.

Tryb ekspertów jest przeznaczony tylko dla zaawansowanych użytkowników.
Aby korzystać z niego bezpiecznie, musisz:

Zapoznaj się z składnią i strukturą JSON.

Tryb ekspertów umożliwia użycie niestandardowego pliku konfiguracyjnego. Po włączeniu tego trybu użytkownik może podać plik o nazwie`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json`zawierające pożądane ustawienia. To całkowicie zastępuje konfigurację z interfejsu graficznego, który będzie dostępny w`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json`. Katalog`/addon_configs/1b1291d4_carconnectivity-addon/`może nie pojawić się w`Home Assistant`system plików. W takim przypadku przełożony powinien zostać ponownie uruchomiony.

Lista funkcji obsługiwanych i oczekiwanych parametrów zapoznaj się z oficjalną dokumentacją CarConnectivity.

## Najlepsze praktyki

-   **Wypełnij tylko ustawienia posiadanych marek pojazdów.**
-   \***\*Nie udostępniaj swoich poświadczeń logowania. \*\***
-   **Dostosuj interwał odświeżania, aby uniknąć przekroczenia limitów żądania API. Pamiętaj, że limit wydaje się być około 1000 wymagań/dzień.**
-   **Użyj poziomu rejestrowania „debugowania” tylko podczas problemów z rozwiązywaniem problemów.**\`\*\*

* * *

Jeśli masz jakieś pytania lub problemy podczas konfiguracji, patrz dokumentacja modułu.
Jeśli znajdziesz błąd, otwórz problem.
