![Supports aarch64 Architecture][aarch64-shield]![Supports amd64 Architecture][amd64-shield][![GitHub sourcecode](https://img.shields.io/badge/Source-GitHub-green)](https://github.com/Pulpyyyy/carconnectivity-addon/)[![GitHub release (latest by date)](https://img.shields.io/github/v/release/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/releases/latest)[![GitHub issues](https://img.shields.io/github/issues/Pulpyyyy/carconnectivity-addon)](https://github.com/Pulpyyyy/carconnectivity-addon/issues)

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg

# `Home Assistant Add-on: CarConnectivity`

|        | `Stable`                                                                                                                                                                                                     | `Edge`                                                                                                                                                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Versão | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Guias traduzidos

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
 [![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![Dutch](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.nl.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)

## Introdução

`CarConnectivity-Addon`Permite conectar e recuperar informações sobre o seu veículo a partir de serviços on -line dos fabricantes compatíveis. Este guia explica como configurar corretamente o módulo.
Estou simplesmente embalando[O trabalho (excelente) feito por Till.](https://github.com/tillsteinbach/CarConnectivity)

Seu trabalho também está disponível como imagens do Docker. Então, se você está usando`Home Assistant`como um independente`docker`, você também pode usá -lo diretamente.

**⚠️ O projeto ainda está em desenvolvimento,`reverse engineering`da API a ser concluída e comunicação com o MQTT/Home Assistant a ser adaptado.**

> [!IMPORTANT]
> ### 🚧 Bloqueio da API da VAG : Volkswagen / Seat / Cupra (maio de 2026)
>
> Desde o final de maio de 2026, o Grupo Volkswagen restringiu o acesso de terceiros às suas APIs. Os conectores habituais VW/Seat/Cupra retornam erros `403` e já não recuperam dados, mesmo que os aplicativos oficiais continuem a funcionar. Atualmente não existe qualquer correção para estes conectores.
>
> **Solução alternativa:** o conector somente leitura `EU Data Act` está **✅ disponível na versão `edge`** do add-on.
>
> ⚠️ **Configuração obrigatória:** este conector apenas *descarrega* dados que tem primeiro de ativar no portal. Registe-se em [eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/), abra **Request customised data** e escolha **todos os clusters de dados**, um **intervalo de 15 minutos** e uma **duração ilimitada**. Os primeiros dados podem demorar **várias horas** a aparecer. Sem isto, o conector não recupera nada, o que pode parecer que as suas credenciais estão a ser rejeitadas.
>
> 👉 Acompanhe o progresso na [issue #142](https://github.com/Pulpyyyy/carconnectivity-addon/issues/142).

> [!TIP]
> ### Está disponível uma versão Edge
> A versão **Edge** é a **versão de desenvolvimento** (um trabalho em curso, não uma versão final): disponibiliza primeiro as funcionalidades mais recentes e pode ser instável. Inclui o conector somente leitura **EU Data Act** (a solução alternativa acima) além de uma nova página de configuração integrada. Instale o **"CarConnectivity Add-on Edge"** a partir do mesmo repositório.

## Adicionar repositório

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configuração geral

Preencha apenas as configurações para as marcas de veículos que você possui.**Deixe todos os outros campos vazios.**

### 1. Selecionando sua marca de veículo

Escolha o fabricante correspondente ao seu veículo das marcas suportadas:
- `Seat` *(descontinuado: bloqueado desde maio de 2026, substituído automaticamente pelo conector EU Data Act)*
- `Cupra` *(descontinuado: bloqueado desde maio de 2026, substituído automaticamente pelo conector EU Data Act)*
- `Skoda`
- `Volkswagen` *(Europa; descontinuado: bloqueado desde maio de 2026, substituído automaticamente pelo conector EU Data Act)*
- `Tronity`
- `Volvo`
- `Audi`
- `Volkswagen North America` *(país definido automaticamente pelas configurações de país do seu Home Assistant — uspor padrão,ca se o seu HA estiver configurado para o Canadá)*
- `EU Data Act` *(conector comum somente leitura que substitui os conectores Seat / Cupra / Volkswagen (Europa) bloqueados)*

Se você possui vários veículos de diferentes marcas, poderá configurar várias seções.

### 2. Conectando -se aos serviços on -line do fabricante

Cada fabricante de automóveis fornece um serviço on -line que permite acessar os dados do seu veículo remotamente. Para se conectar, você precisa fornecer suas credenciais de login.

#### Informações necessárias:

Para `Skoda`, `Audi`, `Volkswagen North America` e `Tronity`:

-   `Brand`: A marca do fabricante.
-   `Username`: O endereço de e -mail usado para fazer login no serviço do fabricante.
-   `Password`: A senha da sua conta do fabricante.
-   `PIN Code`: Um código de 4 dígitos necessário para o acesso remoto a determinados recursos do veículo.
-   `Refresh Interval`: Define com que frequência (em segundos) os dados do veículo são atualizados.
-   `Warning:`A definição de uma taxa de atualização com muita frequência pode exceder os limites de solicitação da API impostos pelo fabricante, resultando em restrições de acesso temporário.

⚠️ Você pode usar 2 contas para 2 marcas diferentes ou 2 carros da mesma marca que não estão vinculados à mesma conta.

Para `EU Data Act` (Seat, Cupra, Volkswagen Europa; somente leitura):

-   `Username`: o e-mail da sua conta da marca (Volkswagen ID, SEAT, Cupra, etc.).
-   `Password`: a senha dessa mesma conta da marca.

Este conector **somente leitura** substitui os conectores Seat / Cupra / Volkswagen (Europa) que estão bloqueados (`403`) desde maio de 2026. Ele atualiza os dados aproximadamente a cada 15 minutos e **não pode enviar comandos remotos, localização ou imagens do veículo**. A marca, o intervalo de atualização e a localidade (país/idioma) são definidos automaticamente: você só fornece as suas credenciais.

> ⚠️ **Etapa obrigatória (caso contrário o conector não recebe nada).** Ative primeiro a entrega de dados no portal: registe-se em **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** com a **mesma conta** do aplicativo oficial da sua marca, depois solicite **todos os clusters de dados**, um **intervalo de 15 minutos** e uma **duração ilimitada**. Os primeiros dados podem demorar **várias horas** a aparecer. O conector apenas **descarrega** o que o portal já produziu: enquanto nenhum arquivo estiver disponível do lado do EU Data Act, ele não pode **ler nada**, mesmo com credenciais corretas (isto pode parecer uma rejeição de credenciais).

Para`Volvo`:

-   `API Key primary`: Chave primária da API Volvo.
-   `API Key secondary`: Chave secundária da API Volvo.
-   `Vehicule Token`: Acesse token para o veículo.
-   `Vehicule Location Token`: Acesse token para o terminal de localização.
-   `Refresh Interval`: Define com que frequência (em segundos) os dados do veículo são atualizados.
-   `Warning:`A definição de uma taxa de atualização com muita frequência pode exceder os limites de solicitação da API impostos pelo fabricante, resultando em restrições de acesso temporário.

### 3. Configuração MQTT (obrigatória)

Você precisa usar`MQTT`Para enviar dados do veículo para`Home Assistant`, definir estas configurações:

-   `Username`: MQTT Broker Login
-   `Password`: Senha do corretor MQTT
-   `Broker Address`: IP ou nome de domínio do servidor MQTT

⚠️ Se você ainda não está usando o MQTT em`Home Assistant`, você pode acrescentar, por exemplo,[`Mosquito Addon`E`MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4.`WEBUI`

You can access the `Carconnectivity`a interface original de usar diretamente de`Home Assistant`.
Você pode definir suas próprias credenciais de acesso:

-   `Username`: admin
-   `Password`: secret

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Nível de registro

Defina a quantidade de informações registradas em logs:

-   `Info`: Exibe informações operacionais gerais.
-   `Warning`: Exibe apenas avisos.
-   `Error`: Exibe apenas mensagens de erro.
-   `Debug`: Exibe detalhes adicionais úteis para solução de problemas.

### 6. Nível de registro da API

Defina a quantidade de informações registradas em logs:

-   `Info`: Exibe informações operacionais gerais.
-   `Warning`: Exibe apenas avisos.
-   `Error`: Exibe apenas mensagens de erro.
-   `Debug`: Exibe detalhes adicionais úteis para solução de problemas.

### Substituições avançadas de registo

As definições globais de registo são utilizadas por predefinição. Em `logs.advanced`, pode substituir o nível de registo de um único conector ou plugin configurado, enquanto todo o resto mantém a definição global.

Use `default` para herdar a definição global. Por exemplo, para depurar apenas a primeira conta de veículo configurada, mantendo as restantes em `info`:

```yaml
logs:
  level: info
  api_level: info
  advanced:
    brand1:
      log_level: debug
      api_log_level: debug
```

Isto ativa o registo de depuração apenas para a primeira conta de veículo configurada, enquanto o resto do add-on continua a usar o nível global `info`.

As substituições de conectores estão disponíveis para `brand1`, `brand2` e `volvo`. As substituições de plugins estão disponíveis para `mqtt`, `webui`, `abrp` e `mqtt_homeassistant`.

### 7.`ABRP - A Better Routeplanner`

Para cada veículo que você deseja conectar ao ABRP (um melhor planejador de rota), você deve fornecer um identificador exclusivo para cada veículo (`vin`), bem como um token de autenticação (`token`). Esses pares de valores permitem estabelecer uma correspondência entre seu veículo e seu token no sistema ABRP.

#### Pré -requisitos

Para recuperar seu token, vá ao seu veículo em um melhor planejador de rota, selecione "Dados ao vivo" e depois vincule seu veículo usando a seção "genérico". O token para colar na configuração será exibido. Você precisa configurar uma correspondência entre o VIN e o token para cada veículo que deseja conectar ao ABRP.

#### Formato de configuração

Cada linha deve seguir este formato:

-   `vin`: Este campo representa o**Número de identificação do veículo**(Vin). É exclusivo para cada veículo e contém 17 caracteres alfanuméricos.
-   `token`: Este campo representa um**Token de autenticação**específico para cada veículo. Este token é gerado pelo ABRP quando você conecta seu veículo à plataforma.

##### Exemplo de uma configuração válida:

    - vin: TMBLJ9NY8SF000000
      token: 1623fdc3-4aaf-49f5-b51a-1e55435435da2
    - vin: TMLLJ9NY23F000000
      token: 12afe123-59d4-8a3d-b9ef-29367de7f8749

### 8. Modo de especialista

O modo especialista permite o uso de todas as funções nativas da carconnectividade, incluindo aquelas que não estão disponíveis na interface gráfica-desde que as funções correspondentes sejam suportadas pelos binários complementares.

⚠️ Aviso:
Este modo desativa todas as verificações de validação e segurança de conteúdo. Como resultado, mesmo um pequeno erro (como uma sintaxe JSON inválida) pode impedir que o complemento seja lançado corretamente.

Modo de especialista destina -se apenas a usuários avançados.
Para usá -lo com segurança, você deve:

Familiarize -se com a sintaxe e estrutura JSON.

O modo especialista é ativado simplesmente pela **presença** de um arquivo `carconnectivity.expert.json` no diretório de configuração do add-on (sem opção para alternar). Este arquivo tem prioridade e **substitui completamente** a configuração gerada automaticamente:

- versão **stable**: a configuração produzida a partir das opções do add-on é gerada em `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json`; o arquivo expert é `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json`.
- versão **edge**: a configuração produzida pela página de configuração é gerada em `/addon_configs/1b1291d4_carconnectivity-addon-edge/carconnectivity.json` (o modelo editável da página é salvo separadamente em `carconnectivity.configui.json`); o arquivo expert é `/addon_configs/1b1291d4_carconnectivity-addon-edge/carconnectivity.expert.json`.

O diretório de configuração pode não aparecer imediatamente no sistema de arquivos do `Home Assistant`. Se for esse o caso, reinicie o supervisor.

Consulte a documentação oficial da carconnectividade para obter a lista de funções suportadas e parâmetros esperados.

## Práticas recomendadas

-   **Preencha apenas as configurações das marcas de veículos que você possui.**
-   \***\*Não compartilhe suas credenciais de login. \*\***
-   **Ajuste o intervalo de atualização para evitar exceder os limites da solicitação da API. Lembre -se de que o limite parece ser cerca de 1000 req/dia.**
-   **Use o nível de registro "Debug" somente ao solucionar problemas.**\`\*\*

* * *

Se você tiver alguma dúvida ou encontrar problemas durante a configuração, consulte a documentação do módulo.
Se você encontrar um bug, abra um problema.
