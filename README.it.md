![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
[![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|          | `Stable`                                                                                                                         | `Edge`                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Versione | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Guide tradotte

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
[![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![Dutch](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.nl.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)


## Introduzione

`CarConnectivity-Addon` ti consente di connettere e recuperare informazioni sul veicolo dai servizi online dei produttori compatibili. Questa guida spiega come configurare correttamente il modulo.
Sto semplicemente confezionando [il lavoro (eccellente) svolto da Till.](https://github.com/tillsteinbach/CarConnectivity)

Il suo lavoro è disponibile anche come Docker Images. Quindi se stai usando `Home Assistant` come `docker` autonomo, puoi usarlo direttamente anche tu.

**⚠️ Il progetto è ancora in fase di sviluppo, il `reverse engineering` dell'API è da completare e la comunicazione con MQTT/Home Assistant da adattare.⚠️**

> [!IMPORTANT]
> ### 🚧 Blocco dell'API VAG : Volkswagen / Seat / Cupra (maggio 2026)
>
> Da fine maggio 2026, il gruppo Volkswagen ha limitato l'accesso di terze parti alle API. I connettori classici VW/Seat/Cupra restituiscono errori `403` e non recuperano più i dati, anche se le app ufficiali continuano a funzionare. Attualmente non esiste alcuna soluzione per questi connettori.
>
> **Soluzione alternativa:** il connettore di sola lettura `EU Data Act` è **✅ integrato in questo add-on** (vedi la sezione dedicata più avanti); le configurazioni bloccate vengono migrate automaticamente verso di esso.

> [!TIP]
> ### È disponibile una versione Edge
> La versione **Edge** è la **build di sviluppo** (un lavoro in corso, non una versione finale): offre per prime le nuove funzionalità e può essere instabile. Installa **"CarConnectivity Add-on Edge"** dallo stesso repository.

## Add repository

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configurazione

L'add-on si configura interamente dalla sua **pagina di configurazione integrata**, non dalla scheda delle opzioni di Home Assistant (che mostra soltanto un rimando ad essa).

**Come aprirla:** scheda **Info** dell'add-on → pulsante **OPEN WEB UI** → pulsante **"Configurazione"** nella barra superiore della pagina. Quando la dashboard web è disabilitata (o non è ancora avviata), la Web UI si apre direttamente sulla pagina di configurazione.

Alla prima apertura, una configurazione esistente viene **importata automaticamente** (compresa quella prodotta da una versione precedente dell'add-on), e i connettori Seat / Cupra / Volkswagen (Europa) bloccati vengono **migrati automaticamente** al connettore EU Data Act all'avvio. Dopo il salvataggio, **riavvia l'add-on** per applicare la nuova configurazione.

### 1. Veicoli

Clicca **"+ Aggiungi veicolo"** e scegli la tua marca; aggiungi una scheda per ogni account. Marche supportate:
- `Audi`
- `Bentley` *(solo EU Data Act)*
- `Cupra` *(solo EU Data Act: il connettore del produttore è bloccato da maggio 2026)*
- `Renault / Dacia`
- `SEAT` *(solo EU Data Act: il connettore del produttore è bloccato da maggio 2026)*
- `Škoda`
- `Tronity`
- `Volkswagen (Europe)` *(solo EU Data Act: il connettore del produttore è bloccato da maggio 2026)*
- `Volkswagen (North America)` *(paese impostato automaticamente dalle impostazioni del paese di Home Assistant: `us` per impostazione predefinita, `ca` se il tuo HA è configurato per il Canada)*
- `Volvo`

La **fonte dati** corretta viene selezionata per te. Una scelta appare solo quando ne funziona più di una (Škoda e Audi possono usare sia il loro account del produttore sia il portale EU Data Act di sola lettura; `Automatic` preferisce quello del produttore).

⚠️ Puoi aggiungere più veicoli, di marche diverse o due auto della stessa marca che non sono collegate allo stesso account.

### 2. Connessione ai servizi online del produttore

I campi mostrati su ogni scheda veicolo dipendono dalla marca:

Per le marche VAG (`Volkswagen`, `SEAT`, `Cupra`, `Škoda`, `Audi`, `Bentley`, `Volkswagen North America`):
- `Username`: l'indirizzo e-mail utilizzato per accedere al servizio del produttore.
- `Password`: la password del tuo account del produttore.
- `S-PIN` *(facoltativo)*: il codice a 4 cifre richiesto per l'accesso remoto a determinate funzionalità del veicolo.
- `VIN` *(facoltativo)*: limita l'account a un solo veicolo.

Per `Volvo`:
- `API key (primary)` / `API key (secondary)`: chiavi API Volvo.
- `Vehicle token`: token di accesso per il veicolo.
- `Location token` *(facoltativo)*: token di accesso per l'endpoint di posizione.
- `Interval` *(facoltativo, secondi)*: intervallo di aggiornamento. ⚠️ Aggiornamenti troppo frequenti possono superare i limiti di richiesta API imposti dal produttore e causare restrizioni temporanee.

Per `Renault / Dacia`:
- `Username` / `Password`: le credenziali del tuo account My Renault.
- `Locale` *(facoltativo)*: ad esempio `fr_FR`, `de_DE`.
- `VIN` *(facoltativo)*: limita l'account a un solo veicolo.

Per `Tronity`:
- `Client ID` / `Client secret`: le tue credenziali API Tronity.
- `Interval` *(facoltativo, secondi)*: intervallo di aggiornamento.
- `VIN` *(facoltativo)*: limita l'account a un solo veicolo.

#### La fonte dati `EU Data Act` (Seat, Cupra, Volkswagen Europa, Bentley; facoltativa per Škoda e Audi)

Quando un veicolo usa la fonte dati EU Data Act, contano solo due campi:
- `Username`: l'e-mail del tuo account di marca (Volkswagen ID, SEAT, Cupra, ecc.).
- `Password`: la password di quello stesso account di marca.

Questo connettore **di sola lettura** sostituisce i connettori Seat / Cupra / Volkswagen (Europa) bloccati (`403`) da maggio 2026. Aggiorna i dati circa ogni 15 minuti e **non può inviare comandi remoti, la posizione o le immagini del veicolo** (un avviso nella barra superiore te lo ricorda ogni volta che è in uso). La marca, l'intervallo di aggiornamento e la locale OIDC (paese/lingua) vengono impostati automaticamente: devi fornire solo le tue credenziali.

> ⚠️ **Configurazione obbligatoria, da fare per prima cosa, altrimenti non funzionerà.** Questo connettore si limita a *scaricare* i dataset che il portale EU Data Act produce; non li crea mai al posto tuo. Se salti questo passaggio l'add-on si connette ma **non riceve alcun dato**, il che può sembrare esattamente un rifiuto delle tue credenziali. Devi registrarti sul portale e abilitare una consegna permanente dei dati una sola volta:
>
> 1. Apri **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** e clicca **Log in**. Scegli la tua marca (Volkswagen, SEAT, Cupra, ...) e accedi con lo **stesso account** che usi nell'app ufficiale del marchio.
> 2. Seleziona il tuo veicolo e autorizza **My Data Portal** ad accedervi.
> 3. Clicca **Request customised data** (mostrato anche come *Get customised data*) e configura:
>    - **tutti i cluster di dati**,
>    - un **intervallo di 15 minuti**,
>    - una durata **illimitata / continua** (senza data di fine),
>    - un nome a tua scelta (ad esempio `All data 15min`).
> 4. Invia la richiesta, poi **sii paziente**. I primi dataset possono richiedere **diverse ore, a volte più di 24 ore**, per comparire. In seguito un nuovo file ZIP viene pubblicato circa ogni 15 minuti e l'add-on lo recupera automaticamente.
>
> Puoi verificare i progressi in qualsiasi momento accedendo di nuovo al portale e consultando l'elenco delle consegne di dati del veicolo. Finché nessuna richiesta continua è attiva e produce file, il connettore non ha nulla da leggere.

Tutti i dettagli e le limitazioni: [CarConnectivity-connector-vw-eu-data-act](https://github.com/mikrohard/CarConnectivity-connector-vw-eu-data-act).

### 3. Configurazione MQTT (obbligatoria)
`MQTT` è il modo in cui i dati del veicolo arrivano a `Home Assistant` :
- `Broker host`: IP o nome di dominio del server MQTT (lascia vuoto per il valore predefinito dell'add-on Mosquitto di Home Assistant, `core-mosquitto`)
- `Port`: porta del broker (predefinita `1883`)
- `Username` / `Password`: credenziali del broker MQTT

⚠️ Se non stai già usando MQTT su `Home Assistant`, puoi aggiungere, ad esempio, [`Mosquitto Addon` e la `MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4. Dashboard web
La dashboard originale di `CarConnectivity` può essere abilitata con l'interruttore **"Abilita la dashboard web CarConnectivity"**. Dopo il riavvio dell'add-on, la Web UI si apre sulla dashboard e la barra superiore ti permette di passare in qualsiasi momento tra **"Dashboard"** e **"Configurazione"**.

- `Login user` / `Login password` *(facoltativi)*: lascia l'utente vuoto (o `autologin`) per accedere automaticamente; imposta entrambi per richiedere un accesso.

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Livello di registrazione
Definire la quantità di informazioni registrate nei registri:
- `Info`: visualizza informazioni operative generali.
- `Warning`: mostra solo avvertimenti.
- `Error`: visualizza solo i messaggi di errore.
- `Debug`: visualizza ulteriori dettagli utili per la risoluzione dei problemi.

### 6. Livello di registrazione API
Definire la quantità di informazioni registrate nei registri:
- `Info`: visualizza informazioni operative generali.
- `Warning`: mostra solo avvertimenti.
- `Error`: visualizza solo i messaggi di errore.
- `Debug`: visualizza ulteriori dettagli utili per la risoluzione dei problemi.

#### Livelli per componente (avanzato)

I due livelli qui sopra si applicano globalmente. Per diagnosticare un singolo componente senza inondare il log, espandi **"Livelli per componente (avanzato)"** nella sezione Registrazione della pagina di configurazione: ogni account veicolo configurato (livello log + API) e ogni plugin (MQTT, dashboard web, ABRP, MQTT Home Assistant) ha il proprio selettore. `default` eredita il livello globale, quindi puoi ad esempio mantenere tutto su `info` e impostare solo il plugin MQTT su `debug`. Un badge sulla riga compressa mostra quante personalizzazioni sono attive.

Nota: una personalizzazione `debug` su un **account veicolo** rende verbose anche le librerie HTTP condivise per l'intero add-on; le personalizzazioni dei plugin sono completamente isolate.

### 7. `ABRP - A Better Routeplanner`

Abilita **"Invia i dati ad ABRP"**, poi aggiungi una riga per veicolo con **"+ Aggiungi token ABRP"** :

- `VIN`: il **numero di identificazione del veicolo** (17 caratteri alfanumerici), unico per ogni veicolo.
- `ABRP token`: il **token di autenticazione** generato da ABRP per quel veicolo.

#### Prerequisiti

Per recuperare il token, visita il tuo veicolo su A Better Routeplanner, seleziona "Dati in tempo reale" e quindi collega il veicolo utilizzando la sezione "generica". Verrà visualizzato il token da incollare nella configurazione. Aggiungi una riga VIN/token per ogni veicolo che desideri connettere ad ABRP.

### 8. Modalità esperta
La modalità Expert consente di utilizzare tutte le funzioni native di Carconnectivity, comprese quelle non disponibili tramite l'interfaccia grafica, purché le funzioni corrispondenti siano supportate dai binari dell'add-on.

⚠️ ATTENZIONE:
Questa modalità disabilita tutti i controlli di convalida e sicurezza dei contenuti. Di conseguenza, anche un piccolo errore (come una sintassi JSON non valida) può impedire l'avvio corretto del componente aggiuntivo.

La modalità Expert è destinata solo agli utenti avanzati.
Per usarla in modo sicuro, devi:

Conoscere la sintassi e la struttura JSON.

La modalità Expert si attiva con la semplice **presenza** di un file `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` contenente le impostazioni desiderate (nessuna opzione da attivare). Questo file ha la precedenza e sostituisce completamente la configurazione prodotta dalla pagina di configurazione, che viene scritta in `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.json` (il modello modificabile della pagina è salvato separatamente in `carconnectivity.configui.json`). La cartella `/addon_configs/1b1291d4_carconnectivity-addon/` potrebbe non apparire subito nel file system di `Home Assistant`. In tal caso, riavvia il supervisore.

Fare riferimento alla documentazione ufficiale di Carconnectivity per l'elenco delle funzioni supportate e dei parametri previsti.

## Best practice
- **Aggiungi schede veicolo solo per gli account che possiedi.**
- **Non condividere le credenziali di accesso.**
- **Regola l'intervallo di aggiornamento (dove disponibile) per evitare il superamento dei limiti di richiesta API. Ricorda che il limite sembra essere circa 1000 req/giorno.**
- **Utilizza il livello di registrazione "Debug" solo durante la risoluzione dei problemi e preferisci una personalizzazione per componente per mantenere silenzioso il resto del log.**
- **Riavvia l'add-on dopo aver salvato la configurazione.**

---

In caso di domande o problemi durante la configurazione, fare riferimento alla documentazione del modulo.
Se trovi un bug, apri una issue.
