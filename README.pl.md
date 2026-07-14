![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
[![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|        | `Stable`                                                                                                                         | `Edge`                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
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

`CarConnectivity-Addon` umożliwia połączenie i pobieranie informacji o pojeździe z usług online kompatybilnych producentów. Ten przewodnik wyjaśnia, jak prawidłowo skonfigurować moduł.
Po prostu pakuję [pracę (doskonałą) wykonaną przez Tilla.](https://github.com/tillsteinbach/CarConnectivity)

Jego praca jest również dostępna jako obrazy Docker. Więc jeśli używasz `Home Assistant` jako samodzielnego `docker`, możesz go również bezpośrednio użyć.

**⚠️Projekt jest nadal w trakcie opracowywania, `reverse engineering` interfejsu API pozostaje do ukończenia, a komunikacja z MQTT/Home assistant do dostosowania.⚠️**

> [!IMPORTANT]
> ### 🚧 Blokada API VAG : Volkswagen / Seat / Cupra (maj 2026)
>
> Od końca maja 2026 roku grupa Volkswagen ograniczyła dostęp firm trzecich do swoich API. Standardowe konektory VW/Seat/Cupra zwracają błędy `403` i nie pobierają już danych, mimo że oficjalne aplikacje nadal działają. Obecnie nie ma rozwiązania dla tych konektorów.
>
> **Obejście:** konektor tylko do odczytu `EU Data Act` jest **✅ zintegrowany z tym dodatkiem** (zobacz dedykowaną sekcję poniżej); zablokowane konfiguracje są automatycznie na niego migrowane.

> [!TIP]
> ### Dostępna jest wersja Edge
> Wersja **Edge** to **kompilacja rozwojowa** (prace w toku, nie wersja finalna): jako pierwsza otrzymuje najnowsze funkcje i może być niestabilna. Zainstaluj **"CarConnectivity Add-on Edge"** z tego samego repozytorium.

## Dodaj repozytorium

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Konfiguracja

Dodatek jest konfigurowany w całości z jego **wbudowanej strony konfiguracji**, a nie z zakładki opcji Home Assistant (która pokazuje jedynie odnośnik do niej).

**Jak ją otworzyć:** zakładka **Info** dodatku → przycisk **OPEN WEB UI** → przycisk **Konfiguracja** na górnym pasku strony. Gdy panel internetowy jest wyłączony (lub jeszcze nie został uruchomiony), Web UI otwiera się bezpośrednio na stronie konfiguracji.

Przy pierwszym otwarciu istniejąca konfiguracja jest **importowana automatycznie** (w tym utworzona przez starszą wersję dodatku), a zablokowane konektory Seat / Cupra / Volkswagen (Europa) są przy starcie **automatycznie migrowane** do konektora EU Data Act. Po zapisaniu **uruchom ponownie dodatek**, aby zastosować nową konfigurację.

### 1. Pojazdy

Kliknij **"+ Dodaj pojazd"** i wybierz swoją markę; dodaj jedną kartę na konto. Obsługiwane marki:
- `Audi`
- `Bentley` *(tylko EU Data Act)*
- `Cupra` *(tylko EU Data Act: konektor producenta jest zablokowany od maja 2026)*
- `Renault / Dacia`
- `SEAT` *(tylko EU Data Act: konektor producenta jest zablokowany od maja 2026)*
- `Škoda`
- `Tronity`
- `Volkswagen (Europe)` *(tylko EU Data Act: konektor producenta jest zablokowany od maja 2026)*
- `Volkswagen (North America)` *(kraj ustawiany automatycznie na podstawie ustawienia kraju w Home Assistant: domyślnie `us`, `ca` jeśli Twoje HA jest skonfigurowane dla Kanady)*
- `Volvo`

Właściwe **źródło danych** jest wybierane za Ciebie. Wybór pojawia się tylko wtedy, gdy działa więcej niż jedno (Škoda i Audi mogą używać konta producenta albo portalu tylko do odczytu EU Data Act; `Automatic` preferuje konto producenta).

⚠️ Możesz dodać wiele pojazdów, od różnych marek lub dwa samochody tej samej marki, które nie są powiązane z tym samym kontem.

### 2. Łączenie się z usługami online producenta

Pola wyświetlane na każdej karcie pojazdu zależą od marki:

Dla marek VAG (`Volkswagen`, `SEAT`, `Cupra`, `Škoda`, `Audi`, `Bentley`, `Volkswagen North America`):
- `Username`: Adres e-mail używany do zalogowania się do usługi producenta.
- `Password`: Hasło do konta producenta.
- `S-PIN` *(opcjonalne)*: 4-cyfrowy kod wymagany do zdalnego dostępu do niektórych funkcji pojazdu.
- `VIN` *(opcjonalne)*: Ogranicza konto do jednego pojazdu.

Dla `Volvo`:
- `API key (primary)` / `API key (secondary)`: Klucze API Volvo.
- `Vehicle token`: Token dostępu do pojazdu.
- `Location token` *(opcjonalne)*: Token dostępu do punktu końcowego lokalizacji.
- `Interval` *(opcjonalne, sekundy)*: Interwał odświeżania. ⚠️ Zbyt częste odświeżanie może przekroczyć limity żądań API producenta i spowodować tymczasowe ograniczenia.

Dla `Renault / Dacia`:
- `Username` / `Password`: Poświadczenia Twojego konta My Renault.
- `Locale` *(opcjonalne)*: np. `fr_FR`, `de_DE`.
- `VIN` *(opcjonalne)*: Ogranicza konto do jednego pojazdu.

Dla `Tronity`:
- `Client ID` / `Client secret`: Twoje poświadczenia API Tronity.
- `Interval` *(opcjonalne, sekundy)*: Interwał odświeżania.
- `VIN` *(opcjonalne)*: Ogranicza konto do jednego pojazdu.

#### Źródło danych `EU Data Act` (Seat, Cupra, Volkswagen Europa, Bentley; opcjonalnie dla Škody i Audi)

Gdy pojazd używa źródła danych EU Data Act, znaczenie mają tylko dwa pola:
- `Username`: adres e-mail Twojego konta marki (Volkswagen ID, SEAT, Cupra itp.).
- `Password`: hasło do tego samego konta marki.

Ten konektor **tylko do odczytu** zastępuje konektory Seat / Cupra / Volkswagen (Europa), które są zablokowane (`403`) od maja 2026. Odświeża dane mniej więcej co 15 minut i **nie może wysyłać zdalnych poleceń, lokalizacji ani obrazów pojazdu** (ostrzeżenie na górnym pasku przypomina o tym zawsze, gdy jest w użyciu). Marka, interwał odświeżania oraz ustawienia regionalne OIDC (kraj/język) są ustawiane automatycznie: podajesz tylko swoje poświadczenia.

> ⚠️ **Konfiguracja obowiązkowa, zrób to najpierw, w przeciwnym razie nic nie zadziała.** Ten konektor jedynie *pobiera* zestawy danych, które generuje portal EU Data Act; nigdy nie tworzy ich za Ciebie. Jeśli pominiesz ten krok, dodatek połączy się, ale **nie otrzyma żadnych danych**, co może wyglądać dokładnie tak, jakby Twoje poświadczenia były odrzucane. Musisz jednorazowo zarejestrować się w portalu i włączyć stałe dostarczanie danych:
>
> 1. Otwórz **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** i kliknij **Log in**. Wybierz swoją markę (Volkswagen, SEAT, Cupra, ...) i zaloguj się **tym samym kontem**, którego używasz w oficjalnej aplikacji marki.
> 2. Wybierz swój pojazd i autoryzuj dostęp do niego dla **My Data Portal**.
> 3. Kliknij **Request customised data** (wyświetlane także jako *Get customised data*) i skonfiguruj:
>    - **wszystkie klastry danych**,
>    - **interwał 15 minut**,
>    - **nieograniczony / ciągły** czas trwania (bez daty końcowej),
>    - dowolną nazwę (na przykład `All data 15min`).
> 4. Wyślij żądanie, a następnie **uzbrój się w cierpliwość**. Pojawienie się pierwszych zestawów danych może zająć **kilka godzin, czasem ponad 24 godziny**. Potem nowy plik ZIP jest publikowany mniej więcej co 15 minut, a dodatek pobiera go automatycznie.
>
> Postępy możesz sprawdzić w dowolnym momencie, logując się ponownie do portalu i przeglądając listę dostarczanych danych pojazdu. Dopóki żadne ciągłe żądanie nie jest aktywne i nie generuje plików, konektor nie ma niczego do odczytania.

Pełne szczegóły i ograniczenia: [CarConnectivity-connector-vw-eu-data-act](https://github.com/mikrohard/CarConnectivity-connector-vw-eu-data-act).

### 3. Konfiguracja MQTT (obowiązkowa)
`MQTT` to sposób, w jaki dane pojazdu trafiają do `Home Assistant`:
- `Broker host`: nazwa IP lub domeny serwera MQTT (pozostaw puste dla domyślnych ustawień dodatku Mosquitto w Home Assistant, `core-mosquitto`)
- `Port`: port brokera (domyślnie `1883`)
- `Username` / `Password`: poświadczenia brokera MQTT

⚠️ Jeśli jeszcze nie używasz MQTT w `Home Assistant`, możesz na przykład dodać [`Mosquitto Addon` i `MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4. Panel internetowy
Oryginalny panel `CarConnectivity` można włączyć przełącznikiem **"Włącz panel internetowy CarConnectivity"**. Po ponownym uruchomieniu dodatku Web UI otwiera się na panelu, a górny pasek pozwala w każdej chwili przełączać się między **Panel** a **Konfiguracja**.

- `Login user` / `Login password` *(opcjonalne)*: pozostaw użytkownika pustego (lub `autologin`), aby logować się automatycznie; ustaw oba pola, aby wymagać logowania.

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Poziom rejestrowania
Zdefiniuj ilość informacji zarejestrowanych w dziennikach:
- `Info`: Wyświetla ogólne informacje operacyjne.
- `Warning`: Wyświetla tylko ostrzeżenia.
- `Error`: Wyświetla tylko komunikaty o błędach.
- `Debug`: Wyświetla dodatkowe szczegóły przydatne do rozwiązywania problemów.

### 6. Poziom rejestrowania API
Zdefiniuj ilość informacji zarejestrowanych w dziennikach:
- `Info`: Wyświetla ogólne informacje operacyjne.
- `Warning`: Wyświetla tylko ostrzeżenia.
- `Error`: Wyświetla tylko komunikaty o błędach.
- `Debug`: Wyświetla dodatkowe szczegóły przydatne do rozwiązywania problemów.

#### Poziomy według komponentu (zaawansowane)

Dwa powyższe poziomy działają globalnie. Aby rozwiązywać problem z pojedynczym komponentem bez zalewania dziennika, rozwiń **"Poziomy według komponentu (zaawansowane)"** w sekcji Rejestrowanie strony konfiguracji: każde skonfigurowane konto pojazdu (poziom dziennika + API) i każda wtyczka (MQTT, panel internetowy, ABRP, MQTT Home Assistant) otrzymuje własny selektor. `default` dziedziczy poziom globalny, więc możesz na przykład zostawić wszystko na `info` i ustawić tylko wtyczkę MQTT na `debug`. Plakietka na zwiniętym wierszu pokazuje, ile nadpisań jest aktywnych.

Uwaga: nadpisanie `debug` na **koncie pojazdu** sprawia, że współdzielone biblioteki HTTP stają się szczegółowe dla całego dodatku; nadpisania wtyczek są w pełni izolowane.

### 7. `ABRP - A Better Routeplanner`

Włącz **"Wysyłaj dane do ABRP"**, a następnie dodaj po jednym wierszu na pojazd przyciskiem **"+ Dodaj token ABRP"**:

- `VIN`: **numer identyfikacyjny pojazdu** (17 znaków alfanumerycznych), unikalny dla każdego pojazdu.
- `ABRP token`: **token uwierzytelniający** wygenerowany przez ABRP dla tego pojazdu.

#### Wymagania wstępne

Aby odzyskać token, przejdź do swojego pojazdu w A Better Routeplanner, wybierz „Dane na żywo”, a następnie połącz swój pojazd za pomocą sekcji „Generic”. Zostanie wyświetlony token do wklejenia w konfiguracji. Dodaj wiersz VIN/token dla każdego pojazdu, który chcesz połączyć z ABRP.

### 8. Tryb ekspertów
Tryb ekspertów umożliwia użycie wszystkich natywnych funkcji Carconnectivity, w tym tych, które nie są dostępne za pośrednictwem interfejsu graficznego, o ile odpowiednie funkcje są obsługiwane przez binaria dodatku.

⚠️ Ostrzeżenie:
Ten tryb wyłącza wszystkie kontrole walidacji treści i bezpieczeństwa. W rezultacie nawet niewielki błąd (taki jak nieprawidłowa składnia JSON) może uniemożliwić prawidłowe uruchomienie dodatku.

Tryb ekspertów jest przeznaczony tylko dla zaawansowanych użytkowników.
Aby korzystać z niego bezpiecznie, musisz:

Zapoznać się ze składnią i strukturą JSON.

Tryb ekspertów aktywuje się przez samą **obecność** pliku `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` zawierającego żądane ustawienia (brak opcji do zaznaczenia). Ma on priorytet i całkowicie zastępuje konfigurację utworzoną przez stronę konfiguracji, która jest zapisywana w `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.json` (edytowalny model strony jest zapisywany osobno w `carconnectivity.configui.json`). Katalog `/addon_configs/1b1291d4_carconnectivity-addon/` może nie pojawić się od razu w systemie plików `Home Assistant`. W takim przypadku uruchom ponownie supervisora.

W celu uzyskania listy obsługiwanych funkcji i oczekiwanych parametrów zapoznaj się z oficjalną dokumentacją Carconnectivity.

## Najlepsze praktyki
- **Dodawaj karty pojazdów tylko dla kont, które posiadasz.**
- **Nie udostępniaj swoich poświadczeń logowania.**
- **Dostosuj interwał odświeżania (tam, gdzie jest dostępny), aby uniknąć przekroczenia limitów żądań API. Pamiętaj, że limit wydaje się wynosić około 1000 żądań/dzień.**
- **Użyj poziomu rejestrowania „Debug” tylko podczas rozwiązywania problemów i preferuj nadpisanie dla pojedynczego komponentu, aby reszta dziennika pozostała cicha.**
- **Uruchom ponownie dodatek po zapisaniu konfiguracji.**

---

Jeśli masz jakieś pytania lub problemy podczas konfiguracji, zapoznaj się z dokumentacją modułu.
Jeśli znajdziesz błąd, otwórz problem.
