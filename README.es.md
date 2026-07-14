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

`CarConnectivity-Addon` le permite conectarse y recuperar información sobre su vehículo desde los servicios en línea de los fabricantes compatibles. Esta guía explica cómo configurar correctamente el módulo.
Simplemente estoy empaquetando [el trabajo (excelente) realizado por Till.](https://github.com/tillsteinbach/CarConnectivity)

Su trabajo también está disponible como imágenes de Docker. Así que, si usa `Home Assistant` como `docker` independiente, también puede usarlo directamente.

**⚠️ El proyecto todavía está en desarrollo, el `reverse engineering` de la API está por completar y la comunicación con MQTT/Home Assistant por adaptar.⚠️**

> [!IMPORTANT]
> ### 🚧 Bloqueo de la API de VAG : Volkswagen / Seat / Cupra (mayo de 2026)
>
> Desde finales de mayo de 2026, el Grupo Volkswagen ha restringido el acceso de terceros a sus API. Los conectores habituales de VW/Seat/Cupra devuelven errores `403` y ya no recuperan datos, aunque las aplicaciones oficiales sigan funcionando. Actualmente no existe ninguna solución para estos conectores.
>
> **Solución alternativa:** el conector de solo lectura `EU Data Act` está **✅ integrado en este complemento** (consulte la sección dedicada más abajo); las configuraciones bloqueadas se migran a él automáticamente.

> [!TIP]
> ### Hay una versión Edge disponible
> La versión **Edge** es la **versión de desarrollo** (un trabajo en curso, no una versión final): incorpora primero las funciones más nuevas y puede ser inestable. Instale **"CarConnectivity Add-on Edge"** desde el mismo repositorio.

## Agregar repositorio

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configuración

El complemento se configura completamente desde su **página de configuración integrada**, no desde la pestaña de opciones de Home Assistant (que solo muestra un enlace hacia ella).

**Cómo abrirla:** pestaña **Info** del complemento → botón **OPEN WEB UI** → botón **Configuración** en la barra superior de la página. Cuando el panel web está deshabilitado (o aún no se ha iniciado), la Web UI se abre directamente en la página de configuración.

En la primera apertura, una configuración existente se **importa automáticamente** (incluida una producida por una versión anterior del complemento), y los conectores bloqueados Seat / Cupra / Volkswagen (Europa) se **migran automáticamente** al conector EU Data Act al arrancar. Después de guardar, **reinicie el complemento** para aplicar la nueva configuración.

### 1. Vehículos

Haga clic en **"+ Agregar vehículo"** y elija su marca; agregue una tarjeta por cuenta. Marcas compatibles:
- `Audi`
- `Bentley` *(solo EU Data Act)*
- `Cupra` *(solo EU Data Act: el conector del fabricante está bloqueado desde mayo de 2026)*
- `Renault / Dacia`
- `SEAT` *(solo EU Data Act: el conector del fabricante está bloqueado desde mayo de 2026)*
- `Škoda`
- `Tronity`
- `Volkswagen (Europe)` *(solo EU Data Act: el conector del fabricante está bloqueado desde mayo de 2026)*
- `Volkswagen (North America)` *(país configurado automáticamente a partir del ajuste de país de su Home Assistant: `us` por defecto, `ca` si su HA está configurado para Canadá)*
- `Volvo`

La **fuente de datos** correcta se elige por usted. Solo aparece una opción cuando funciona más de una (Škoda y Audi pueden usar su cuenta del fabricante o el portal de solo lectura EU Data Act; `Automatic` prefiere la del fabricante).

⚠️ Puede agregar varios vehículos, de marcas diferentes o dos coches de la misma marca que no estén vinculados a la misma cuenta.

### 2. Conexión con los servicios en línea del fabricante

Los campos que se muestran en cada tarjeta de vehículo dependen de la marca:

Para las marcas VAG (`Volkswagen`, `SEAT`, `Cupra`, `Škoda`, `Audi`, `Bentley`, `Volkswagen North America`):
- `Username`: la dirección de correo electrónico utilizada para iniciar sesión en el servicio del fabricante.
- `Password`: la contraseña de su cuenta del fabricante.
- `S-PIN` *(opcional)*: el código de 4 dígitos requerido para el acceso remoto a ciertas funciones del vehículo.
- `VIN` *(opcional)*: limita la cuenta a un solo vehículo.

Para `Volvo`:
- `API key (primary)` / `API key (secondary)`: claves de la API de Volvo.
- `Vehicle token`: token de acceso para el vehículo.
- `Location token` *(opcional)*: token de acceso para el punto final de ubicación.
- `Interval` *(opcional, segundos)*: intervalo de actualización. ⚠️ Actualizaciones demasiado frecuentes pueden exceder los límites de solicitudes de la API del fabricante y provocar restricciones temporales.

Para `Renault / Dacia`:
- `Username` / `Password`: las credenciales de su cuenta My Renault.
- `Locale` *(opcional)*: p. ej. `fr_FR`, `de_DE`.
- `VIN` *(opcional)*: limita la cuenta a un solo vehículo.

Para `Tronity`:
- `Client ID` / `Client secret`: sus credenciales de la API de Tronity.
- `Interval` *(opcional, segundos)*: intervalo de actualización.
- `VIN` *(opcional)*: limita la cuenta a un solo vehículo.

#### La fuente de datos `EU Data Act` (Seat, Cupra, Volkswagen Europa, Bentley; opcional para Škoda y Audi)

Cuando un vehículo usa la fuente de datos EU Data Act, solo importan dos campos:
- `Username`: el correo electrónico de su cuenta de marca (Volkswagen ID, SEAT, Cupra, etc.).
- `Password`: la contraseña de esa misma cuenta de marca.

Este conector **de solo lectura** reemplaza los conectores Seat / Cupra / Volkswagen (Europa) que están bloqueados (`403`) desde mayo de 2026. Actualiza los datos aproximadamente cada 15 minutos y **no puede enviar comandos remotos, ubicación ni imágenes del vehículo** (una advertencia en la barra superior se lo recuerda siempre que está en uso). La marca, el intervalo de actualización y la configuración regional OIDC (país/idioma) se establecen automáticamente: usted solo proporciona sus credenciales.

> ⚠️ **Configuración obligatoria, hágala primero o no funcionará.** Este conector solo *descarga* los conjuntos de datos que produce el portal EU Data Act; nunca los crea por usted. Si omite este paso, el complemento se conecta pero **no recibe ningún dato**, lo que puede parecer exactamente que sus credenciales están siendo rechazadas. Debe registrarse en el portal y habilitar una entrega de datos permanente una sola vez:
>
> 1. Abra **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** y haga clic en **Log in**. Elija su marca (Volkswagen, SEAT, Cupra, ...) e inicie sesión con la **misma cuenta** que usa en la aplicación oficial de la marca.
> 2. Seleccione su vehículo y autorice a **My Data Portal** a acceder a él.
> 3. Haga clic en **Request customised data** (también mostrado como *Get customised data*) y configure:
>    - **todos los clústeres de datos**,
>    - un **intervalo de 15 minutos**,
>    - una duración **ilimitada / continua** (sin fecha de fin),
>    - un nombre de su elección (por ejemplo `All data 15min`).
> 4. Envíe la solicitud y luego **tenga paciencia**. Los primeros conjuntos de datos pueden tardar **varias horas, a veces más de 24 horas**, en aparecer. Después, se publica un nuevo archivo ZIP aproximadamente cada 15 minutos y el complemento lo recoge automáticamente.
>
> Puede comprobar el progreso en cualquier momento volviendo a iniciar sesión en el portal y consultando la lista de entregas de datos del vehículo. Mientras no haya ninguna solicitud continua activa que produzca archivos, el conector no tiene nada que leer.

Detalles completos y limitaciones: [CarConnectivity-connector-vw-eu-data-act](https://github.com/mikrohard/CarConnectivity-connector-vw-eu-data-act).

### 3. Configuración MQTT (obligatoria)
`MQTT` es la vía por la que los datos del vehículo llegan a `Home Assistant`:
- `Broker host`: IP o nombre de dominio del servidor MQTT (déjelo en blanco para el valor predeterminado del complemento Mosquitto de Home Assistant, `core-mosquitto`)
- `Port`: puerto del broker (predeterminado `1883`)
- `Username` / `Password`: credenciales del broker MQTT

⚠️ Si aún no está usando MQTT en `Home Assistant`, puede agregar, por ejemplo, [`Mosquitto Addon` y la `MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4. Panel web
El panel original de `CarConnectivity` se puede habilitar con el interruptor **"Habilitar el panel web de CarConnectivity"**. Una vez que el complemento se reinicia, la Web UI se abre en el panel, y la barra superior permite cambiar entre **Panel** y **Configuración** en cualquier momento.

- `Login user` / `Login password` *(opcional)*: deje el usuario vacío (o `autologin`) para iniciar sesión automáticamente; configure ambos para exigir un inicio de sesión.

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Nivel de registro
Defina la cantidad de información registrada en los registros:
- `Info`: Muestra información operativa general.
- `Warning`: Muestra solo advertencias.
- `Error`: Muestra solo mensajes de error.
- `Debug`: Muestra detalles adicionales útiles para solucionar problemas.

### 6. Nivel de registro de API
Defina la cantidad de información registrada en los registros:
- `Info`: Muestra información operativa general.
- `Warning`: Muestra solo advertencias.
- `Error`: Muestra solo mensajes de error.
- `Debug`: Muestra detalles adicionales útiles para solucionar problemas.

#### Niveles por componente (avanzado)

Los dos niveles anteriores se aplican globalmente. Para diagnosticar un solo componente sin inundar el registro, despliegue **"Niveles por componente (avanzado)"** en la sección Registro de la página de configuración: cada cuenta de vehículo configurada (nivel de registro + nivel de API) y cada plugin (MQTT, panel web, ABRP, MQTT Home Assistant) tiene su propio selector. `default` hereda el nivel global, así que puede, por ejemplo, mantener todo en `info` y poner solo el plugin MQTT en `debug`. Una insignia en la línea plegada muestra cuántos niveles personalizados están activos.

Nota: un nivel `debug` personalizado en una **cuenta de vehículo** también hace más detalladas las bibliotecas HTTP compartidas para todo el complemento; los niveles personalizados de los plugins están completamente aislados.

### 7. `ABRP - A Better Routeplanner`

Habilite **"Enviar datos a ABRP"** y luego agregue una fila por vehículo con **"+ Agregar token ABRP"**:

- `VIN`: el **Número de identificación del vehículo** (17 caracteres alfanuméricos), único para cada vehículo.
- `ABRP token`: el **token de autenticación** generado por ABRP para ese vehículo.

#### Requisitos previos

Para recuperar su token, vaya a su vehículo en A Better Routeplanner, seleccione "Live Data" y luego vincule su vehículo utilizando la sección "Generic". Se mostrará el token para pegar en la configuración. Agregue una fila VIN/token para cada vehículo que desee conectar a ABRP.

### 8. Modo experto
El modo experto permite el uso de todas las funciones nativas de Carconnectivity, incluidas las que no están disponibles a través de la interfaz gráfica, siempre que las funciones correspondientes sean compatibles con los binarios del complemento.

⚠️ Advertencia:
Este modo deshabilita todas las verificaciones de validación y seguridad de contenido. Como resultado, incluso un pequeño error (como una sintaxis JSON inválida) puede evitar que el complemento se inicie correctamente.

El modo experto está destinado solo a usuarios avanzados.
Para usarlo de manera segura, debe:

Estar familiarizado con la sintaxis y la estructura JSON.

El modo experto se activa por la simple **presencia** de un archivo `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` que contenga los ajustes deseados (no hay ninguna opción que activar). Tiene prioridad y reemplaza completamente la configuración producida por la página de configuración, que se escribe en `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.json` (el modelo editable de la página se guarda por separado en `carconnectivity.configui.json`). El directorio `/addon_configs/1b1291d4_carconnectivity-addon/` puede no aparecer de inmediato en el sistema de archivos de `Home Assistant`. Si este es el caso, reinicie el supervisor.

Consulte la documentación oficial de Carconnectivity para obtener la lista de funciones compatibles y los parámetros esperados.

## Mejores prácticas
- **Agregue tarjetas de vehículo solo para las cuentas que posee.**
- **No comparta sus credenciales de inicio de sesión.**
- **Ajuste el intervalo de actualización (cuando esté disponible) para evitar exceder los límites de solicitud de API. Recuerde que el límite parece ser de aproximadamente 1000 req/día.**
- **Use el nivel de registro "Debug" solo cuando resuelva problemas, y prefiera un nivel personalizado por componente para mantener el resto del registro tranquilo.**
- **Reinicie el complemento después de guardar la configuración.**

---

Si tiene alguna pregunta o encuentra problemas durante la configuración, consulte la documentación del módulo.
Si encuentra un error, abra una issue.
