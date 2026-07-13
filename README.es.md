![Supports aarch64 Architecture][aarch64-shield]![Supports amd64 Architecture][amd64-shield][![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|         | `Stable`                                                                                                                                                                                                     | `Edge`                                                                                                                                                                                                                                                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Versión | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Guías traducidas

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
 [![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![Dutch](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.nl.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)

## Introducción

`CarConnectivity-Addon`Le permite conectarse y recuperar información sobre su vehículo de los servicios en línea de los fabricantes compatibles. Esta guía explica cómo configurar correctamente el módulo.
Simplemente estoy empaquetando[El trabajo (excelente) realizado por Till.](https://github.com/tillsteinbach/CarConnectivity)

Su trabajo también está disponible como imágenes de Docker. Entonces, si estás usando`Home Assistant`como independiente`docker`, también puedes usarlo directamente.

**⚠️ El proyecto todavía está en desarrollo,`reverse engineering`de la API que se completará y la comunicación con MQTT/Asistente de inicio para ser adaptado.**

> [!IMPORTANT]
> ### 🚧 Bloqueo de la API de VAG : Volkswagen / Seat / Cupra (mayo de 2026)
>
> Desde finales de mayo de 2026, el Grupo Volkswagen ha restringido el acceso de terceros a sus API. Los conectores habituales de VW/Seat/Cupra devuelven errores `403` y ya no recuperan datos, aunque las aplicaciones oficiales sigan funcionando. Actualmente no existe ninguna solución para estos conectores.
>
> **Solución alternativa:** el conector de solo lectura `EU Data Act` está **✅ disponible en la versión `edge`** del complemento.
>
> ⚠️ **Configuración obligatoria:** este conector solo *descarga* datos que primero debe habilitar en el portal. Regístrese en [eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/), abra **Request customised data** y elija **todos los clústeres de datos**, un **intervalo de 15 minutos** y una **duración ilimitada**. Los primeros datos pueden tardar **varias horas** en aparecer. Sin esto, el conector no recupera nada, lo que puede parecer que sus credenciales están siendo rechazadas.
>
> 👉 Sigue el progreso en la [issue #142](https://github.com/Pulpyyyy/carconnectivity-addon/issues/142).

> [!TIP]
> ### Hay una versión Edge disponible
> La versión **Edge** es la **versión de desarrollo** (un trabajo en curso, no una versión final): incorpora primero las funciones más nuevas y puede ser inestable. Incluye el conector de solo lectura **EU Data Act** (la solución alternativa anterior) además de una nueva página de configuración integrada. Instala **"CarConnectivity Add-on Edge"** desde el mismo repositorio.

## Agregar repositorio

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configuración general

Solo complete la configuración de las marcas de vehículos que posee.**Deje todos los demás campos vacíos.**

### 1. Seleccionar la marca de su vehículo

Elija el fabricante correspondiente a su vehículo de las marcas compatibles:
- `Seat` *(obsoleto: bloqueado desde mayo de 2026, reemplazado automáticamente por el conector EU Data Act)*
- `Cupra` *(obsoleto: bloqueado desde mayo de 2026, reemplazado automáticamente por el conector EU Data Act)*
- `Skoda`
- `Volkswagen` *(Europa; obsoleto: bloqueado desde mayo de 2026, reemplazado automáticamente por el conector EU Data Act)*
- `Tronity`
- `Volvo`
- `Audi`
- `Volkswagen North America` *(país configurado automáticamente desde su ajuste de país en Home Assistant — uspor defecto,ca si su HA está configurado para Canadá)*
- `EU Data Act` *(conector común de solo lectura que reemplaza los conectores bloqueados Seat / Cupra / Volkswagen (Europa))*

Si posee múltiples vehículos de diferentes marcas, puede configurar varias secciones.

### 2. Conexión con los servicios en línea del fabricante

Cada fabricante de automóviles proporciona un servicio en línea que le permite acceder a los datos de su vehículo de forma remota. Para conectarse, debe proporcionar sus credenciales de inicio de sesión.

#### Información requerida:

Para `Skoda`, `Audi`, `Volkswagen North America` y `Tronity`:

-   `Brand`: La marca del fabricante.
-   `Username`: La dirección de correo electrónico utilizada para iniciar sesión en el servicio del fabricante.
-   `Password`: La contraseña para su cuenta de fabricante.
-   `PIN Code`: Un código de 4 dígitos requerido para el acceso remoto a ciertas características del vehículo.
-   `Refresh Interval`: Define con qué frecuencia (en segundos) se actualizan los datos del vehículo.
-   `Warning:`Establecer una velocidad de actualización con demasiada frecuencia puede exceder los límites de solicitud de API impuestos por el fabricante, lo que resulta en restricciones de acceso temporales.

⚠️ Puede usar 2 cuentas para 2 marcas diferentes o 2 autos de una misma marca que no están vinculadas a la misma cuenta.

Para `EU Data Act` (Seat, Cupra, Volkswagen Europa; solo lectura):

-   `Username`: el correo electrónico de su cuenta de marca (Volkswagen ID, SEAT, Cupra, etc.).
-   `Password`: la contraseña de esa misma cuenta de marca.

Este conector **de solo lectura** reemplaza los conectores Seat / Cupra / Volkswagen (Europa) que han estado bloqueados (`403`) desde mayo de 2026. Actualiza los datos aproximadamente cada 15 minutos y **no puede enviar comandos remotos, ubicación ni imágenes del vehículo**. La marca, el intervalo de actualización y la configuración regional (país/idioma) se establecen automáticamente: usted solo proporciona sus credenciales.

> ⚠️ **Paso obligatorio (de lo contrario el conector no recibe nada).** Habilite primero la entrega de datos en el portal: regístrese en **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** con la **misma cuenta** que la aplicación oficial de su marca, luego solicite **todos los clústeres de datos**, un **intervalo de 15 minutos** y una **duración ilimitada**. Los primeros datos pueden tardar **varias horas** en aparecer. El conector solo **descarga** lo que el portal ya ha producido: mientras no haya ningún archivo disponible del lado de EU Data Act, no puede **leer nada**, incluso con credenciales correctas (esto puede parecer un rechazo de credenciales).

Para`Volvo`:

-   `API Key primary`: Volvo API primary key.
-   `API Key secondary`: Clave secundaria Volvo API.
-   `Vehicule Token`: Token de acceso para el vehículo.
-   `Vehicule Location Token`: Token de acceso para el punto final de ubicación.
-   `Refresh Interval`: Define con qué frecuencia (en segundos) se actualizan los datos del vehículo.
-   `Warning:`Establecer una velocidad de actualización con demasiada frecuencia puede exceder los límites de solicitud de API impuestos por el fabricante, lo que resulta en restricciones de acceso temporales.

### 3. Configuración MQTT (obligatoria)

Necesitas usar`MQTT`para enviar datos del vehículo a`Home Assistant`, Configure estos ajustes:

-   `Username`: MQTT Broker Iniciar sesión
-   `Password`: Contraseña de mqtt corredor
-   `Broker Address`: IP o nombre de dominio del servidor MQTT

⚠️ si aún no estás usando mqtt en`Home Assistant`, puede agregar, por ejemplo,[`Mosquito Addon`Y`MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4.`WEBUI`

Puedes acceder al`Carconnectivity`La interfaz original del uso directamente desde`Home Assistant`.
Puede definir sus propias credenciales de acceso:

-   `Username`: admin
-   `Password`: secret

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Nivel de registro

Defina la cantidad de información registrada en los registros:

-   `Info`: Muestra información operativa general.
-   `Warning`: Muestra solo advertencias.
-   `Error`: Muestra solo mensajes de error.
-   `Debug`: Muestra detalles adicionales útiles para solucionar problemas.

### 6. Nivel de registro de API

Defina la cantidad de información registrada en los registros:

-   `Info`: Muestra información operativa general.
-   `Warning`: Muestra solo advertencias.
-   `Error`: Muestra solo mensajes de error.
-   `Debug`: Muestra detalles adicionales útiles para solucionar problemas.

### Anulaciones avanzadas de registro

De forma predeterminada se utilizan los ajustes globales de registro. En `logs.advanced`, puedes anular el nivel de registro de un único conector o plugin configurado, mientras todo lo demás mantiene la configuración global.

Usa `default` para heredar la configuración global. Por ejemplo, para depurar solo la primera cuenta de vehículo configurada y mantener el resto en `info`:

```yaml
logs:
  level: info
  api_level: info
  advanced:
    brand1:
      log_level: debug
      api_log_level: debug
```

Esto activa el registro de depuración solo para la primera cuenta de vehículo configurada, mientras que el resto del complemento sigue utilizando el nivel global `info`.

Las anulaciones de conectores están disponibles para `brand1`, `brand2` y `volvo`. Las anulaciones de plugins están disponibles para `mqtt`, `webui`, `abrp` y `mqtt_homeassistant`.

### 7.`ABRP - A Better Routeplanner`

Para cada vehículo que desea conectarse a ABRP (un mejor rutinPlanner), debe proporcionar un identificador único para cada vehículo (`vin`) así como un token de autenticación (`token`). Estos pares de valores le permiten establecer una coincidencia entre su vehículo y su token en el sistema ABRP.

#### Requisitos previos

Para recuperar su token, vaya a su vehículo en un mejor planeador de rutina, seleccione "datos en vivo" y luego vincule su vehículo utilizando la sección "genérica". Se mostrará el token para pegar en la configuración. Debe configurar una coincidencia entre el VIN y el token para cada vehículo que desea conectarse a ABRP.

#### Formato de configuración

Cada línea debe seguir este formato:

-   `vin`: Este campo representa el**Número de identificación del vehículo**(Vin). Es exclusivo de cada vehículo y contiene 17 caracteres alfanuméricos.
-   `token`: Este campo representa un**token de autenticación**específico de cada vehículo. ABRP genera este token cuando conecta su vehículo a la plataforma.

##### Ejemplo de una configuración válida:

    - vin: TMBLJ9NY8SF000000
      token: 1623fdc3-4aaf-49f5-b51a-1e55435435da2
    - vin: TMLLJ9NY23F000000
      token: 12afe123-59d4-8a3d-b9ef-29367de7f8749

### 8. Modo experto

El modo experto permite el uso de todas las funciones de carconectividad nativa, incluidas las que no están disponibles a través de la interfaz gráfica, siempre que las funciones correspondientes son compatibles con los binarios complementarios.

⚠️ ADVERTENCIA:
Este modo deshabilita todas las verificaciones de validación y seguridad de contenido. Como resultado, incluso un pequeño error (como una sintaxis JSON inválida) puede evitar que el complemento se inicie correctamente.

El modo experto está destinado solo a usuarios avanzados.
Para usarlo de manera segura, debe:

Estar familiarizado con la sintaxis y la estructura JSON.

El modo experto se activa por la simple **presencia** de un archivo `carconnectivity.expert.json` en el directorio de configuración del complemento (no hay ninguna opción que activar). Este archivo tiene prioridad y **reemplaza completamente** la configuración generada automáticamente:

- versión **stable**: la configuración producida a partir de las opciones del complemento se genera en `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json`; el archivo experto es `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json`.
- versión **edge**: la configuración producida por la página de configuración se genera en `/addon_configs/1b1291d4_carconnectivity-addon-edge/carconnectivity.json` (el modelo editable de la página se guarda por separado en `carconnectivity.configui.json`); el archivo experto es `/addon_configs/1b1291d4_carconnectivity-addon-edge/carconnectivity.expert.json`.

El directorio de configuración puede no aparecer de inmediato en el sistema de archivos de `Home Assistant`. Si este es el caso, reinicie el supervisor.

Consulte la documentación oficial de la carconectividad para obtener la lista de funciones compatibles y parámetros esperados.

## Mejores prácticas

-   **Solo complete la configuración de las marcas de vehículos que posee.**
-   \***\*No comparta sus credenciales de inicio de sesión. \*\***
-   **Ajuste el intervalo de actualización para evitar exceder los límites de solicitud de API. Recuerde que el límite parece ser de aproximadamente 1000 req/día.**
-   **Use el nivel de registro de "depuración" solo cuando resuelva problemas.**\`\*\*

* * *

Si tiene alguna pregunta o problema de encuentro durante la configuración, consulte la documentación del módulo.
Si encuentra un error, abra un problema.
