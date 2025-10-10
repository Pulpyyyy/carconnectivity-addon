![Supports aarch64 Architecture][aarch64-shield]![Supports amd64 Architecture][amd64-shield][![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|          | `Stable`                                                                                                                                                                                                     | `Edge`                                                                                                                                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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

`CarConnectivity-Addon`Ti consente di connettere e recuperare informazioni sul veicolo dai servizi online dei produttori compatibili. Questa guida spiega come configurare correttamente il modulo.
Sto semplicemente confezionando[Il lavoro (eccellente) svolto da Till.](https://github.com/tillsteinbach/CarConnectivity)

Il suo lavoro è disponibile anche come Docker Images. Quindi se stai usando`Home Assistant`come autonomo`docker`, puoi usarlo direttamente anche tu.

**⚠️ Il progetto è ancora in fase di sviluppo,`reverse engineering`dell'API da completare e comunicare con MQTT/Assistente di casa da adattare.**

## Add repository

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configurazione generale

Compila solo le impostazioni per i marchi di veicoli che possiedi.**Lascia vuoti tutti gli altri campi.**

### 1. Selezione del marchio del veicolo

Scegli il produttore corrispondente al tuo veicolo dai marchi supportati:

-   `Seat`
-   `Cupra`
-   `Skoda`
-   `Volkswagen`
-   `Tronity`
-   `Volvo`
-   `Audi`

Se possiedi più veicoli di marchi diversi, è possibile configurare più sezioni.

### 2. Connessione ai servizi online del produttore

Ogni produttore di automobili fornisce un servizio online che consente di accedere ai dati del veicolo in remoto. Per connetterti, è necessario fornire le credenziali di accesso.

#### Informazioni richieste:

Per`Seat`,`Cupra`,`Skoda`,`Volkswagen`E`Tronity`:

-   `Brand`: Il marchio del produttore.
-   `Username`: L'indirizzo e -mail utilizzato per accedere al servizio del produttore.
-   `Password`: The password for your manufacturer account.
-   `PIN Code`: Un codice a 4 cifre richiesto per l'accesso remoto a determinate funzionalità del veicolo.
-   `Refresh Interval`: Definisce la frequenza con cui (in secondi) i dati del veicolo vengono aggiornati.
-   `Warning:`L'impostazione di una frequenza di aggiornamento troppo frequentemente può superare i limiti di richiesta API imposti dal produttore, con conseguenti restrizioni di accesso temporanee.

⚠️ Puoi utilizzare 2 account per 2 marchi diversi o 2 auto di uno stesso marchio che non sono collegati allo stesso account.

Per`Volvo`:

-   `API Key primary`: Chiave primaria API Volvo.
-   `API Key secondary`: Chiave secondaria API Volvo.
-   `Vehicule Token`: Token di accesso per il veicolo.
-   `Vehicule Location Token`: Token di accesso per l'endpoint di posizione.
-   `Refresh Interval`: Definisce la frequenza con cui (in secondi) i dati del veicolo vengono aggiornati.
-   `Warning:`L'impostazione di una frequenza di aggiornamento troppo frequentemente può superare i limiti di richiesta API imposti dal produttore, con conseguenti restrizioni di accesso temporanee.

### 3. Configurazione MQTT (obbligatoria)

Devi usare`MQTT`Per inviare i dati del veicolo a`Home Assistant`, Configura queste impostazioni:

-   `Username`: Accesso al broker MQTT
-   `Password`: Password del broker MQTT
-   `Broker Address`: IP o nome di dominio del server MQTT

⚠️ Se non stai già usando MQTT`Home Assistant`, puoi aggiungere, ad esempio,[`Mosquito Addon`E`MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4.`WEBUI`

Puoi accedere al`Carconnectivity`L'interfaccia originale dall'uso direttamente da`Home Assistant`.
Puoi definire le tue credenziali di accesso:

-   `Username`: admin
-   `Password`: secret

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Livello di registrazione

Definire la quantità di informazioni registrate nei registri:

-   `Info`: Visualizza informazioni operative generali.
-   `Warning`: Mostra solo avvertimenti.
-   `Error`: Visualizza solo i messaggi di errore.
-   `Debug`: Visualizza ulteriori dettagli utili per la risoluzione dei problemi.

### 6. Livello di registrazione API

Definire la quantità di informazioni registrate nei registri:

-   `Info`: Visualizza informazioni operative generali.
-   `Warning`: Mostra solo avvertimenti.
-   `Error`: Visualizza solo i messaggi di errore.
-   `Debug`: Visualizza ulteriori dettagli utili per la risoluzione dei problemi.

### 7.`ABRP - A Better Routeplanner`

Per ogni veicolo che si desidera connettere ad ABRP (un percorso migliore), è necessario fornire un identificatore univoco per ciascun veicolo (`vin`) così come un token di autenticazione (`token`). Queste coppie di valori consentono di stabilire una corrispondenza tra il veicolo e il suo token nel sistema ABRP.

#### Prerequisiti

Per recuperare il token, visitare il veicolo su un percorso migliore, selezionare "Dati in tempo reale" e quindi collegare il veicolo utilizzando la sezione "generica". Verrà visualizzato il token da incollare nella configurazione. È necessario configurare una corrispondenza tra il VIN e il token per ogni veicolo che si desidera connettere ad ABRP.

#### Formato di configurazione

Each line should follow this format:

-   `vin`: This field represents the **Numero di identificazione del veicolo**(Vin). È unico per ogni veicolo e contiene 17 caratteri alfanumerici.
-   `token`: Questo campo rappresenta un**token di autenticazione**specifico per ogni veicolo. Questo token è generato da ABRP quando si collega il veicolo alla piattaforma.

##### Esempio di una configurazione valida:

    - vin: TMBLJ9NY8SF000000
      token: 1623fdc3-4aaf-49f5-b51a-1e55435435da2
    - vin: TMLLJ9NY23F000000
      token: 12afe123-59d4-8a3d-b9ef-29367de7f8749

### 8. Modalità esperta

Expert Mode enables the use of all native Carconnectivity functions, including those not available through the graphical interface—as long as the corresponding functions are supported by the add-on binaries.

⚠️ ATTENZIONE:
Questa modalità disabilita tutti i controlli di convalida e sicurezza dei contenuti. Di conseguenza, anche un piccolo errore (come una sintassi JSON non valida) può impedire l'avvio corretto del componente aggiuntivo.

La modalità Expert è destinata solo agli utenti avanzati.
Per usarlo in modo sicuro, devi:

Conoscere la sintassi e la struttura JSON.

La modalità Expert consente l'uso di un file di configurazione personalizzato. Quando questa modalità è abilitata, l'utente può fornire un file denominato`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json`contenente le impostazioni desiderate. Ciò sostituisce completamente la configurazione dall'interfaccia grafica, che sarà disponibile in`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json`. La directory`/addon_configs/1b1291d4_carconnectivity-addon/`potrebbe non apparire in`Home Assistant`file system. In tal caso, il supervisore dovrebbe essere riavviato.

Fare riferimento alla documentazione ufficiale di Carconnettività per l'elenco delle funzioni supportate e dei parametri previsti.

## Best practice

-   **Compila solo le impostazioni per i marchi del veicolo che possiedi.**
-   \***\*Non condividere le credenziali di accesso. \*\***
-   **Regolare l'intervallo di aggiornamento per evitare il superamento dei limiti di richiesta API. Ricorda il limite sembra essere circa 1000 req/giorno.**
-   **Utilizzare il livello di registrazione "debug" solo durante la risoluzione dei problemi.**\`\*\*

* * *

In caso di domande o problemi di incontro durante la configurazione, fare riferimento alla documentazione del modulo.
Se trovi un bug, apri un problema.
