## 0.8.8

### 🚀 New Features
- **Volkswagen EU Data Act connector** (read-only): works around the VAG API lockdown that breaks the regular VW/Seat/Cupra connectors (`403`). Available for VW/Seat/Cupra/Bentley, and as an alternative data source for Audi/Skoda.
- **Multi-brand EU Data Act**: pick the brand directly in the configuration (VW, Seat, Cupra, Audi, Skoda, Bentley).
- **New in-app configuration page**: configure your vehicles, MQTT, dashboard and ABRP from a web page instead of editing YAML. **How to access it:** open the add-on Web UI (the Ingress entry in the Home Assistant sidebar, or the "Open Web UI" button), then use the **Configuration** tab in the top navigation bar. When the dashboard is disabled, the add-on opens straight on the configuration page.
- **Automatic config migration**: on first open, your existing configuration is imported into the new page (the old `carconnectivity.UI.json` is kept as a `.bak`). In addition, manufacturer connectors that are now blocked (SEAT/Cupra/VW) are migrated to EU Data Act automatically at startup.
- **Read-only notice**: a warning is shown (config page and dashboard) when EU Data Act is in use, since location, remote control and vehicle images are not available with it.
- **Localized interface** in 8 languages (English, French, German, Italian, Spanish, Polish, Portuguese, Norwegian), based on the browser language.
- **Per-component log levels**: a collapsed "Per-component levels (advanced)" block in the configuration page lets you override the log level of each vehicle account (log + API) and each plugin (MQTT, dashboard, ABRP, MQTT Home Assistant) individually, e.g. debug the MQTT plugin alone while everything else stays at the global level ("default" inherits it, as before).
- **HA Configuration tab**: the add-on Configuration tab in Home Assistant now simply points to the in-app configuration page (the old YAML options are gone).
- **Locale auto-fill**: the country and language of your Home Assistant are filled directly into the generated configuration (EU Data Act and Volkswagen North America connectors).

### 🛠️ Fixes & Updates

- **CarConnectivity-connector-vw-eu-data-act** → v0.2.0 (new in this add-on)
- **CarConnectivity-connector-seatcupra** removed (API blocked since May 2026, replaced by EU Data Act)
- **CarConnectivity-connector-volkswagen** removed (API blocked since May 2026, replaced by EU Data Act)
- **CarConnectivity-connector-renaultdacia** → v0.1a1 (new in this add-on)

 --- 

## 0.8.7

### 🚀 New Features
- Smaller image: the SEAT/Cupra and Volkswagen (Europe) manufacturer connectors are no longer bundled. They have been blocked (`403`) since May 2026 and are replaced by the read-only EU Data Act connector; existing configurations are migrated automatically.

### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → v0.6.4
- **CarConnectivity-connector-skoda** → v0.12.6
- **CarConnectivity-connector-volkswagen** → v0.10.6
- **CarConnectivity-connector-tronity** → v0.7.3
- **CarConnectivity-plugin-abrp** → v0.8.3
- **CarConnectivity-plugin-mqtt** → v0.10.5.post1
- **CarConnectivity-plugin-mqtt_homeassistant** → v0.6.6
- **CarConnectivity** → v0.11.10
- **CarConnectivity-plugin-webui** → v0.7.3

 --- 

## 0.8.6


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → v0.1.22

 --- 

## 0.8.4


### 🛠️ Fixes & Updates

- **hassio-addons/base** → [21.0.0](https://github.com/hassio-addons/addon-base/releases/tag/v21.0.0)

 --- 

## 0.8.3


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-audi** → v0.3.2
- **CarConnectivity-connector-volkswagen-na** → v0.1.21

#### ⚠️ Known dependency bypasses
- ⚠️ `carconnectivity-connector-audi` v0.3.2 installed with `--no-deps` (upstream `requests` constraint conflict)

 --- 

## 0.7.7


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt** → v0.10.4

#### ⚠️ Known dependency bypasses
- ⚠️ `carconnectivity-connector-audi` v0.3.0 installed with `--no-deps` (upstream `requests` constraint conflict)

 --- 

## 0.7.6


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → v0.6.3

#### ⚠️ Known dependency bypasses
- ⚠️ `carconnectivity-connector-audi` v0.3.0 installed with `--no-deps` (upstream `requests` constraint conflict)

 --- 

## 0.7.3


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → v0.1.20

#### ⚠️ Known dependency bypasses
- ⚠️ `carconnectivity-connector-audi` v0.3.0 installed with `--no-deps` (upstream `requests` constraint conflict)

 --- 

## 0.7.2


### 🛠️ Fixes & Updates

- **hassio-addons/base** → [20.1.1](https://github.com/hassio-addons/addon-base/releases/tag/v20.1.1)

 --- 

## 0.6.26


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → v0.1.18

 --- 
 
 ## 0.6.25

### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → v0.6.2
- **CarConnectivity-connector-skoda** → v0.12.5
- **CarConnectivity-connector-volkswagen** → v0.10.5
- **CarConnectivity-connector-tronity** → v0.7.2
- **CarConnectivity-plugin-abrp** → v0.8.2
- **CarConnectivity-plugin-mqtt** → v0.10.3
- **CarConnectivity-plugin-mqtt_homeassistant** → v0.6.5
- **CarConnectivity** → v0.11.9
- **CarConnectivity-plugin-webui** → v0.7.2
- **hassio-addons/base** → [20.1.0](https://github.com/hassio-addons/addon-base/releases/tag/v20.1.0)

 --- 

## 0.6.24


### 🛠️ Fixes & Updates

- **hassio-addons/base** → [20.0.3](https://github.com/hassio-addons/addon-base/releases/tag/v20.0.3)

 --- 

## 0.6.23


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → v0.1.17

 --- 

## 0.6.22


### 🛠️ Fixes & Updates

- **hassio-addons/base** → [20.0.2](https://github.com/hassio-addons/addon-base/releases/tag/v20.0.2)

 --- 

## 0.6.20


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt** → v0.10.2

 --- 

## 0.6.20


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → v0.6.1

 --- 

## 0.6.18


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → v0.12.4

 --- 

## 0.6.15


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → v0.12.3

 --- 

## 0.6.14


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → v0.12.1

 --- 

## 0.6.13


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → v0.6
- **CarConnectivity-connector-skoda** → v0.12

 --- 

## 0.6.12


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt** → v0.10.1

 --- 

## 0.6.11


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → v0.1.16

 --- 

## 0.6.10

### 🚀 New Features

- Automatically detects US/CA settings for CarConnectivity-connector-volkswagen-na

 --- 

## 0.6.9


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.15](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.6.7


### 🛠️ Fixes & Updates

- **hassio-addons/base** → [20.0.1](https://github.com/hassio-addons/addon-base/releases/tag/v20.0.1)

 --- 

## 0.6.6


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen** → [v0.10.4](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)

 --- 

## 0.6.5


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.14](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.6.2


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.13](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.6.1


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.12](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 ---

## 0.6.0


### 🚀 New Features

- **Refactored configuration UI for better readability**
  Configuration options are now organized by groups for easier navigation
  ⚠️ **Breaking change: You will need to reconfigure the addon**

### 🛠️ Fixes & Updates

- Fix typo in config: "trionity" → "tronity"

 ---


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.12](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-audi** → [v0.3.0](https://github.com/acfischer42/CarConnectivity-connector-audi.git)
- **CarConnectivity-connector-volkswagen** → [v0.10.3](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-volkswagen-na** → [v0.1.12](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)
- **CarConnectivity-connector-tronity** → [v0.7.1](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-connector-volvo** → [v0.1a2](https://github.com/tillsteinbach/CarConnectivity-connector-volvo.git)
- **CarConnectivity-plugin-abrp** → [v0.8.1](https://github.com/tillsteinbach/CarConnectivity-plugin-abrp.git)
- **CarConnectivity-plugin-mqtt** → [v0.10](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.6.4](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity-plugin-webui** → [v0.7.1](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 

## 0.6.0


### 🚀 New Features

- **Refactored configuration UI for better readability**
  Configuration options are now organized by groups for easier navigation
  ⚠️ **Breaking change: You will need to reconfigure the addon**

### 🛠️ Fixes & Updates

- Fix typo in config: "trionity" → "tronity"

 ---

## 0.5.43


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.11](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.5.42


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.6.4](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)

 --- 

## 0.5.41


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-audi** → [v0.3.0](https://github.com/acfischer42/CarConnectivity-connector-audi.git)
- **CarConnectivity-connector-volkswagen-na** → [v0.1.10](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.5.40


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.9](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.5.39


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.8](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.5.38


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt** → [v0.10](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)

 --- 

## 0.5.37


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.12](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.10.3](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)

 --- 

## 0.5.36


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.7](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.5.35


### 🛠️ Fixes & Updates

- **CarConnectivity** → [v0.11.8](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.5.34


### 🛠️ Fixes & Updates

- **CarConnectivity** → [v0.11.7](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.5.33


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.5.2](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.11.8](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.10.2](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-plugin-mqtt** → [v0.9.2](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.6.3](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.11.6](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.7.1](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 

## 0.5.32


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.6.2](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)

 --- 

## 0.5.31


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.6](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.5.30


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-audi** → [v0.2.2](https://github.com/acfischer42/CarConnectivity-connector-audi.git)

 --- 

## 0.5.29


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.5.1](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.11.7](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.10.1](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.7.1](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-plugin-abrp** → [v0.8.1](https://github.com/tillsteinbach/CarConnectivity-plugin-abrp.git)
- **CarConnectivity-plugin-mqtt** → [v0.9.1](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.6.1](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.11.5](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.7](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 

## 0.5.28


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → [v0.11.6](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity** → [v0.11.3](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.5.26


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → [v0.11.5](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity** → [v0.11.2](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.5.25


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → [v0.11.3](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)

 --- 

## 0.5.24


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → [v0.11.2](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)

 --- 

## 0.5.23


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-abrp** → [v0.8](https://github.com/tillsteinbach/CarConnectivity-plugin-abrp.git)

 --- 

## 0.5.22


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen-na** → [v0.1.5](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.5.21


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.5](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.11](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.10](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.7](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-connector-volvo** → [v0.1a2](https://github.com/tillsteinbach/CarConnectivity-connector-volvo.git)
- **CarConnectivity-plugin-mqtt** → [v0.9](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.5.1](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.11.1](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 

## 0.5.19


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → [v0.10](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen-na** → [v0.1.4](https://github.com/zackcornelius/CarConnectivity-connector-volkswagen-na.git)

 --- 

## 0.5.18


### 🛠️ Fixes & Updates

- **CarConnectivity** → [v0.10](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.5.16


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-webui** → [v0.5.3](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 ---

## 0.5.15 (EDGE only) 


### 🛠️ Fixes & Updates
- **CarConnectivity-plugin-webui** → [v0.5.3a3](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

---

## 0.5.14


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.4.8](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-volkswagen** → [v0.9.3](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)

 --- 

## 0.5.13


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen** → [v0.9.2](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-plugin-mqtt** → [v0.8.1](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)

 --- 

## 0.5.9


### 🛠️ Fixes & Updates

- **CarConnectivity** → [v0.9.2](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.5.8


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt** → [v0.8](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)

 --- 

## 0.5.7


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → [v0.9](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)

 --- 

## 0.5.6


### 🛠️ Fixes & Updates

- **CarConnectivity** → [v0.9.1](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.5.4


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → [v0.8.2](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)

 --- 

## 0.5.3


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.4.7](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.8.1](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.9.1](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.6.4](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-plugin-mqtt** → [v0.7.4](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.4.1](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.8.1](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.5.2](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 

## 0.5.1


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-audi** → [v0.2.0](https://github.com/acfischer42/CarConnectivity-connector-audi.git)

 --- 

## 0.5.0


### 🚀 New Features

- Add Volkswagen for North America support, thanks @zackcornelius

 --- 

## 0.4.4


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-audi** → [v0.1.5](https://github.com/acfischer42/CarConnectivity-connector-audi.git)

 --- 

## 0.4.3


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-audi** → [v0.1.4](https://github.com/acfischer42/CarConnectivity-connector-audi.git)

 --- 

## 0.4.2


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen** → [v0.9](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity** → [v0.8](https://github.com/tillsteinbach/CarConnectivity.git)

No audi connector yet, only in edge

 --- 

## 0.4.1 (EDGE only)

### 🛠️ Fixes & Updates

- **CarConnectivity-connector-audi** → [v0.1.4](https://github.com/acfischer42/CarConnectivity-connector-audi.git)

 --- 

## 0.4.0 (EDGE only)

### 🚀 New Features

- Add audi support, thanks @acfischer42

 ---

## 0.3.10


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.4.6](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)

 --- 

## 0.3.9


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-volkswagen** → [v0.9a1](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)

 --- 

## 0.3.8


### 🛠️ Fixes & Updates

- **CarConnectivity** → [v0.8.0](https://github.com/tillsteinbach/CarConnectivity.git)

## 0.3.7


- **CarConnectivity-connector-volkswagen** → [v0.8.2](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- ⬆️ Update ghcr.io/hassio-addons/base Docker tag to v18

 --- 

## 0.3.6


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-skoda** → [v0.8](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.8.1](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)

 --- 

## 0.3.5


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.4.5](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-volkswagen** → [v0.8](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity** → [v0.7.2](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.3.4

### 🚀 New Features

- Add dutch
- Revoked UI for better readability
- Includes all new edge features

### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.4.4](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.7.3](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.7.3](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.6.3](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-plugin-mqtt** → [v0.7.3](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.7.3](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.7.1](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.5.1](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 


 ## 0.3.3 (EDGE only)


### 🛠️ Fixes & Updates

- Fix typo in template and add better traces in case of error in config UI

 --- 

 ## 0.3.2 (EDGE only)


### 🚀 New Features

- Use autologin as webui login to disable auth request

 --- 

 ## 0.3.1 (EDGE only)


### 🛠️ Fixes & Updates

- Rework a bit the way Config UI looks like

 --- 

 ## 0.3.0 (EDGE only)


### 🚀 New Features

- Add **CarConnectivity-plugin-abrp** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-plugin-abrp.git)

 --- 
 
 ## 0.2.12


### 🛠️ Fixes & Updates

- **⚠️Temporary removal of the volvo plugin**

 --- 

## 0.2.11 (EDGE only)


### 🛠️ Fixes & Updates

- **CarConnectivity** → [v0.7.1a3](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.2.10 (EDGE only)


### 🛠️ Fixes & Updates

- **CarConnectivity** → [v0.7.1a2](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.2.9


### 🛠️ Fixes & Updates

- Fix for usecase en-GB_GB returned

 --- 
 
 ## 0.2.8


### 🚀 New Features

- Get locale info from Home Assistant

 --- 
 
 ## 0.2.7


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.4.2](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.7.2](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.7.2](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.6.2](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-plugin-mqtt** → [v0.7.3](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)

 --- 

## 0.2.6


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.4](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.7](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.7](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-connector-volvo** → [v0.1a1](https://github.com/tillsteinbach/CarConnectivity-connector-volvo.git)
- **CarConnectivity-plugin-mqtt** → [v0.7](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.4](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.7](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.5](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 

## 0.2.5


### 🛠️ Fixes & Updates

- Fix for car pin with error 404

 --- 
 
 ## 0.2.4


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.4a1](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)

 --- 

## 0.2.3

### 🚀 New Features
- Use ingress to access WEBUI
  ⚠️ Broken: pin location is always 404

 --- 

## 0.2.2

### 🛠️ Fixes & Updates

- Fix for cache and token storage
 --- 

## 0.2.1

### 🚀 New Features
- **Add Volvo cars support(experimental)🚗🚙.**
⚠️ You may need to reconfigure the addon

 --- 

## 0.2.0

### 🚀 New Features
- Add Expert Mode

  Expert Mode enables the use of all native Carconnectivity functions, including those not available through the graphical interface—as long as the corresponding functions are supported by the add-on binaries.

  ⚠️ Warning:
  This mode disables all content validation and safety checks. As a result, even a small mistake (such as an invalid JSON syntax) can prevent the add-on from launching correctly.

  Expert Mode is intended for advanced users only.
  To use it safely, you must:

  Be familiar with JSON syntax and structure.

  Refer to the official Carconnectivity documentation for the list of supported functions and expected parameters.

 --- 

## 0.1.14

### 🚀 New Features
- Add translations for Polish, Spanish and Portuguese

### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.3](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.5](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-plugin-mqtt** → [v0.6](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.3](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.6](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.4](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)
- Fix for empty user/password for MQTT

 --- 

## 0.1.13

### 🚀 New Features


### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.3a1](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.6a1](https://github.com/tillsteinbach/CarConnectivity.git)

 --- 

## 0.1.12


### 🛠️ Fixes & Updates

- Fix connector for volkswagen

---

## 0.1.11

### 🚀 New Features
- The 1st car/account is required to get started

### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.2](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.5](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.5](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.4](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-plugin-mqtt** → [v0.5](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.2](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.5](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.3.1](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 

## 0.1.10


### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.2a5](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.2a8](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)

 --- 

## 0.1.9

### 🚀 New Features
- The 1st car/account is required to get started
### 🛠️ Fixes & Updates

- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.2a7](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- Update/fix translations,documentation and readme according to latest version
 --- 

## 0.1.8

### 🛠️ Fixes & Updates

- **CarConnectivity-connector-seatcupra** → [v0.2a4](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.5a2](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.5a3](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.2a6](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)

 --- 

## 0.1.7

### 🚀 New Features
- **Version available as docker images hosted on dockerhub**
- **Rework support for multiple cars 🚗🚙. You should now be able to have 2 cars at the same time, whatever the brand is.**
⚠️ You will need to reconfigure the addon
- 2 versions available : stable and edge
- **MQTT port available in config**

### 🛠️ Fixes & Updates
- **CarConnectivity-connector-seatcupra** → [v0.2a3](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra.git)
- **CarConnectivity-connector-skoda** → [v0.5a1](https://github.com/tillsteinbach/CarConnectivity-connector-skoda.git)
- **CarConnectivity-connector-volkswagen** → [v0.5a2](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen.git)
- **CarConnectivity-connector-tronity** → [v0.3a2](https://github.com/tillsteinbach/CarConnectivity-connector-tronity.git)
- **CarConnectivity-plugin-mqtt** → [v0.4.2](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt.git)
- **CarConnectivity-plugin-mqtt_homeassistant** → [v0.2a5](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant.git)
- **CarConnectivity** → [v0.5a4](https://github.com/tillsteinbach/CarConnectivity.git)
- **CarConnectivity-plugin-webui** → [v0.3a1](https://github.com/tillsteinbach/CarConnectivity-plugin-webui.git)

 --- 

## 0.1.6

### 🛠️ Fixes & Updates
  - `CarConnectivity-connector-volkswagen` → [v0.4.2](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen/releases)

---
## 0.1.5

### 🛠️ Fixes & Updates
- Allow empty username/password for MQTT (Thanks jonilala796)

---

## 0.1.4

### 🛠️ Fixes & Updates
- Updated MQTT HA to Version 0.1.1

---
 
## 0.1.3

### 🚀 New Features
- **Added WEBUI support (from jressel01) **  

### 🛠️ Fixes & Updates

- Updated connectors and plugins:  
  - `CarConnectivity-plugin-mqtt_homeassistant` → [v0.2](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt_homeassistant/releases)

---

## 0.1.2

### 🛠️ Fixes & Updates

- Updated connectors and plugins:  
  - `CarConnectivity-connector-seatcupra` → [v0.1.2](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra/releases)

---

## 0.1.1

### ➕ Added
- Seat/Cupra additionnal setting

---

## 0.1.0

### 🚀 New Features
- **Added support for multiple cars 🚗🚙**  
  ⚠️ **You will need to reconfigure the addon.**  
- Hide sensitive data when not needed  

### 🛠️ Improvements
- Optimize Docker build 🐳  
- Avoid certain warnings at startup ⚠️  

### 🛠️ Fixes & Updates
- Update `tempio` → [2024.11.2](https://github.com/home-assistant/tempio/releases)

---

## 0.0.3

### 🛠️ Fixes & Updates
- Fix Home Assistant versioning  
- Updated connectors and plugins:  
  - `CarConnectivity-connector-seatcupra` → [v0.1.1](https://github.com/tillsteinbach/CarConnectivity-connector-seatcupra/releases)
  - `CarConnectivity-plugin-mqtt` → [v0.4.2](https://github.com/tillsteinbach/CarConnectivity-plugin-mqtt/releases) 
  - `CarConnectivity-connector-skoda` → [v0.4.1](https://github.com/tillsteinbach/CarConnectivity-connector-skoda/releases)  
  - `CarConnectivity-connector-volkswagen` → [v0.4.1](https://github.com/tillsteinbach/CarConnectivity-connector-volkswagen/releases)

---

## 0.0.2

### ➕ Added
- Refresh interval option ⏳  

---

## 0.0.1

🎉 **Initial release!** 🚀





