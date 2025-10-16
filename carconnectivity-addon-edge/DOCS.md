![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
[![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|         | `Stable`                                                                                                                         | `Edge`                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Version | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Translated guides

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
 [![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)


## Introduction

`CarConnectivity-Addon` allows you to connect and retrieve information about your vehicle from compatible manufacturers' online services. This guide explains how to properly configure the module.
I am simply packaging [the work (excellent) done by Till.](https://github.com/tillsteinbach/CarConnectivity)

His work is also available as docker images. So if you're using `Home Assistant` as a stand-alone `docker`, you can directly use it too.

**⚠️The project is still under development, `reverse engineering` of the api to be completed and communication with MQTT/Home assistant to be adapted.⚠️**

## Add repository

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## General Configuration

Only fill in the settings for the brands of vehicles you own. **Leave all other fields empty.**

### 1. Selecting Your Vehicle Brand
Choose the manufacturer corresponding to your vehicle from the supported brands:
- `Seat`
- `Cupra`
- `Skoda`
- `Volkswagen`
- `Tronity`
- `Volvo`
- `Audi`
- `Volkswagen North America`

If you own multiple vehicles from different brands, you can configure multiple sections.

### 2. Connecting to the Manufacturer’s Online Services
Each car manufacturer provides an online service that allows you to access your vehicle's data remotely. To connect, you need to provide your login credentials.

#### Required Information:
For `Seat`, `Cupra`, `Skoda`, `Volkswagen`, `Volkswagen_na` and `Tronity`:
- `Brand`: The manufacturer’s brand.
- `Username`: The email address used to log into the manufacturer’s service.
- `Password`: The password for your manufacturer account.
- `PIN Code`: A 4-digit code required for remote access to certain vehicle features.
- `Refresh Interval`: Defines how often (in seconds) the vehicle's data is updated.
- `Warning:` Setting a refresh rate too frequently may exceed the API request limits imposed by the manufacturer, resulting in temporary access restrictions.

⚠️ You can use 2 accounts for 2 different brands or 2 cars of a same brand that are not linked to the same account.

For `Volvo`:
- `API Key primary`: Volvo API primary key.
- `API Key secondary`: Volvo API secondary key.
- `Vehicule Token`: Access token for the vehicule.
- `Vehicule Location Token`: Access token for the location endpoint.
- `Refresh Interval`: Defines how often (in seconds) the vehicle's data is updated.
- `Warning:` Setting a refresh rate too frequently may exceed the API request limits imposed by the manufacturer, resulting in temporary access restrictions.
  
### 3. MQTT Configuration (Mandatory)
You need to use `MQTT` to send vehicle data to `Home Assistant`, configure these settings:
- `Username`: MQTT broker login
- `Password`: MQTT broker password
- `Broker Address`: IP or domain name of the MQTT server

⚠️ If you're not already using MQTT on `Home Assistant`, you can add, for example, [`Mosquito Addon`et `MQTT integration`](https://www.home-assistant.io/integrations/mqtt) 

### 4. `WEBUI`
You can access the `Carconnectivity`'s original interface from  using directly from `Home Assistant`.
You can define your own access credentials:
- `Username`: admin
- `Password`: secret

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Logging Level
Define the amount of information recorded in logs:
- `Info`: Displays general operational information.
- `Warning`: Displays only warnings.
- `Error`: Displays only error messages.
- `Debug`: Displays additional details useful for troubleshooting.

### 6. API Logging Level
Define the amount of information recorded in logs:
- `Info`: Displays general operational information.
- `Warning`: Displays only warnings.
- `Error`: Displays only error messages.
- `Debug`: Displays additional details useful for troubleshooting.

### 7. `ABRP - A Better Routeplanner`

For each vehicle you wish to connect to ABRP (A Better Routeplanner), you must provide a unique identifier for each vehicle (`vin`) as well as an authentication token (`token`). These pairs of values allow you to establish a match between your vehicle and its token in the ABRP system.

#### Prerequisites

To retrieve your token, go to your vehicle on A Better Routeplanner, select "Live Data," and then link your vehicle using the "Generic" section. The token to paste into the configuration will be displayed. You need to configure a match between the VIN and the token for each vehicle you wish to connect to ABRP.

#### Configuration Format

Each line should follow this format:

- `vin`: This field represents the **Vehicle Identification Number** (VIN). It is unique to each vehicle and contains 17 alphanumeric characters.
- `token`: This field represents an **authentication token** specific to each vehicle. This token is generated by ABRP when you connect your vehicle to the platform.

##### Example of a valid configuration:

```
- vin: TMBLJ9NY8SF000000
  token: 1623fdc3-4aaf-49f5-b51a-1e55435435da2
- vin: TMLLJ9NY23F000000
  token: 12afe123-59d4-8a3d-b9ef-29367de7f8749
```

### 8. Expert Mode
Expert Mode enables the use of all native Carconnectivity functions, including those not available through the graphical interface—as long as the corresponding functions are supported by the add-on binaries.

⚠️ Warning:
This mode disables all content validation and safety checks. As a result, even a small mistake (such as an invalid JSON syntax) can prevent the add-on from launching correctly.

Expert Mode is intended for advanced users only.
To use it safely, you must:

Be familiar with JSON syntax and structure.

The Expert Mode allows the use of a custom configuration file. When this mode is enabled, the user can provide a file named `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` containing the desired settings. This completely replaces the configuration from the graphical interface, which will be available in `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json`. The directory `/addon_configs/1b1291d4_carconnectivity-addon/` may not appear in the `Home Assistant` file system. If this is the case, the supervisor should be restarted.

Refer to the official Carconnectivity documentation for the list of supported functions and expected parameters.

## Best Practices
- **Only fill in the settings for the vehicle brands you own.**
- ****Do not share your login credentials.****
- **Adjust the refresh interval to avoid exceeding API request limits. Remember limit seems to be about 1000 req/day.**
- **Use the "Debug" logging level only when troubleshooting issues.**`**

---

If you have any questions or encounter issues during configuration, refer to the module documentation.
If you find a bug, please open an issue.
