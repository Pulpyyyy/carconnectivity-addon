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

## Adicionar repositório

[![\`Addon Home Assistant\`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configuração geral

Preencha apenas as configurações para as marcas de veículos que você possui.**Deixe todos os outros campos vazios.**

### 1. Selecionando sua marca de veículo

Escolha o fabricante correspondente ao seu veículo das marcas suportadas:

-   `Seat`
-   `Cupra`
-   `Skoda`
-   `Volkswagen`
-   `Tronity`
-   `Volvo`
-   `Audi`

Se você possui vários veículos de diferentes marcas, poderá configurar várias seções.

### 2. Conectando -se aos serviços on -line do fabricante

Cada fabricante de automóveis fornece um serviço on -line que permite acessar os dados do seu veículo remotamente. Para se conectar, você precisa fornecer suas credenciais de login.

#### Informações necessárias:

Para`Seat`,`Cupra`,`Skoda`,`Volkswagen`e`Tronity`:

-   `Brand`: A marca do fabricante.
-   `Username`: O endereço de e -mail usado para fazer login no serviço do fabricante.
-   `Password`: A senha da sua conta do fabricante.
-   `PIN Code`: Um código de 4 dígitos necessário para o acesso remoto a determinados recursos do veículo.
-   `Refresh Interval`: Define com que frequência (em segundos) os dados do veículo são atualizados.
-   `Warning:`A definição de uma taxa de atualização com muita frequência pode exceder os limites de solicitação da API impostos pelo fabricante, resultando em restrições de acesso temporário.

⚠️ Você pode usar 2 contas para 2 marcas diferentes ou 2 carros da mesma marca que não estão vinculados à mesma conta.

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

O modo especialista permite o uso de um arquivo de configuração personalizado. Quando este modo está ativado, o usuário pode fornecer um arquivo nomeado`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json`contendo as configurações desejadas. Isso substitui completamente a configuração da interface gráfica, que estará disponível em`/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.UI.json`. O diretório`/addon_configs/1b1291d4_carconnectivity-addon/`pode não aparecer no`Home Assistant`sistema de arquivos. Se for esse o caso, o supervisor deve ser reiniciado.

Consulte a documentação oficial da carconnectividade para obter a lista de funções suportadas e parâmetros esperados.

## Práticas recomendadas

-   **Preencha apenas as configurações das marcas de veículos que você possui.**
-   \***\*Não compartilhe suas credenciais de login. \*\***
-   **Ajuste o intervalo de atualização para evitar exceder os limites da solicitação da API. Lembre -se de que o limite parece ser cerca de 1000 req/dia.**
-   **Use o nível de registro "Debug" somente ao solucionar problemas.**\`\*\*

* * *

Se você tiver alguma dúvida ou encontrar problemas durante a configuração, consulte a documentação do módulo.
Se você encontrar um bug, abra um problema.
