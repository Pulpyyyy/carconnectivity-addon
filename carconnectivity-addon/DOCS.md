# Home Assistant Add-on: CarConnectivity

# CarConnectivity-Addon Configuration Guide

## Introduction

The **CarConnectivity-Addon** module allows you to connect and retrieve information about your vehicle from compatible manufacturers' online services. This guide explains how to properly configure the module.
I am simply packaging the [excellent work done by Till.](https://github.com/tillsteinbach/CarConnectivity)

His work is also available as docker images. So if you're using Home Assistant as a stand-alone docker, you can directly use it too.

**⚠️The project is still under development, with reverse engineering of the api to be completed and communication with MQTT/Home assistant to be adapted.⚠️**

## Add repository

[![Addon Home Assistant](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

## General Configuration

Only fill in the settings for the brands of vehicles you own. **Leave all other fields empty.**

### 1. Selecting Your Vehicle Brand
Choose the manufacturer corresponding to your vehicle from the supported brands:
- **Seat**
- **Cupra**
- **Skoda**
- **Volkswagen**
- **Tronity**

If you own multiple vehicles from different brands, you can configure multiple sections.

### 2. Connecting to the Manufacturer’s Online Services
Each car manufacturer provides an online service that allows you to access your vehicle's data remotely. To connect, you need to provide your login credentials.

#### Required Information:
- **Username**: The email address used to log into the manufacturer’s service.
- **Password**: The password for your manufacturer account.
- **PIN Code**: A 4-digit code required for remote access to certain vehicle features.
- **Refresh Interval**: Defines how often (in seconds) the vehicle's data is updated.
  - **Warning:** Setting a refresh rate too frequently may exceed the API request limits imposed by the manufacturer, resulting in temporary access restrictions.

#### ⚠️ Special Case: Seat/Cupra Connector
The **Seat/Cupra** connector includes an additional option:
- **Manufacturer Brand**: Allows you to use brand-specific features.
  - Select the corresponding brand (**Seat** or **Cupra**) to ensure proper data retrieval.

### 3. MQTT Configuration (Mandatory)
You need to use **MQTT** to send vehicle data to home assistant, configure these settings:
- **Username**: MQTT broker login
- **Password**: MQTT broker password
- **Broker Address**: IP or domain name of the MQTT server

⚠️ If you're not already using MQTT on Home assistant, you can add, for example, [Mosquito addon AND MQTT integration](https://www.home-assistant.io/integrations/mqtt) 

### 4. WEBUI
You can visit http//x.x.x.x:4000 The WEBUI from Carconnectivity:
- **Username**: login
- **Password**: password
- **WEBUI Port**: 4000

### 5. Logging Level
Define the amount of information recorded in logs:
- **Info**: Displays general operational information.
- **Warning**: Displays only warnings.
- **Error**: Displays only error messages.
- **Debug**: Displays additional details useful for troubleshooting.

### 6. API Logging Level
Define the amount of information recorded in logs:
- **Info**: Displays general operational information.
- **Warning**: Displays only warnings.
- **Error**: Displays only error messages.
- **Debug**: Displays additional details useful for troubleshooting.

## Best Practices
- **Only fill in the settings for the vehicle brands you own.**
- **Do not share your login credentials.**
- **Adjust the refresh interval to avoid exceeding API request limits. Remember limit seems to be about 1000 req/day**
- **Use the "Debug" logging level only when troubleshooting issues.**

---

If you have any questions or encounter issues during configuration, refer to the module documentation.
If you find a bug, please open an issue