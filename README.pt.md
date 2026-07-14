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

`CarConnectivity-Addon` permite conectar e recuperar informações sobre o seu veículo a partir dos serviços online dos fabricantes compatíveis. Este guia explica como configurar corretamente o módulo.
Estou simplesmente embalando [o trabalho (excelente) feito por Till.](https://github.com/tillsteinbach/CarConnectivity)

Seu trabalho também está disponível como imagens do Docker. Então, se você está usando `Home Assistant` como um `docker` independente, você também pode usá-lo diretamente.

**⚠️O projeto ainda está em desenvolvimento, `reverse engineering` da API a ser concluída e comunicação com o MQTT/Home Assistant a ser adaptada.⚠️**

> [!IMPORTANT]
> ### 🚧 Bloqueio da API da VAG : Volkswagen / Seat / Cupra (maio de 2026)
>
> Desde o final de maio de 2026, o Grupo Volkswagen restringiu o acesso de terceiros às suas APIs. Os conectores habituais VW/Seat/Cupra retornam erros `403` e já não recuperam dados, mesmo que os aplicativos oficiais continuem a funcionar. Atualmente não existe qualquer correção para estes conectores.
>
> **Solução alternativa:** o conector somente leitura `EU Data Act` está **✅ integrado neste add-on** (veja a seção dedicada abaixo); as configurações bloqueadas são migradas para ele automaticamente.

> [!TIP]
> ### Está disponível uma versão Edge
> A versão **Edge** é a **versão de desenvolvimento** (um trabalho em curso, não uma versão final): disponibiliza primeiro as funcionalidades mais recentes e pode ser instável. Instale o **"CarConnectivity Add-on Edge"** a partir do mesmo repositório.

## Adicionar repositório

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configuração

O add-on é configurado inteiramente a partir de sua **página de configuração integrada**, e não da aba de opções do Home Assistant (que apenas exibe um ponteiro para ela).

**Como abri-la:** aba **Info** do add-on → botão **OPEN WEB UI** → botão **Configuração** na barra superior da página. Quando o painel web está desativado (ou ainda não foi iniciado), a Web UI abre diretamente na página de configuração.

Na primeira abertura, uma configuração existente é **importada automaticamente** (incluindo uma produzida por uma versão mais antiga do add-on), e os conectores bloqueados Seat / Cupra / Volkswagen (Europa) são **migrados automaticamente** para o conector EU Data Act na inicialização. Depois de salvar, **reinicie o add-on** para aplicar a nova configuração.

### 1. Veículos

Clique em **"+ Adicionar veículo"** e escolha a sua marca; adicione um cartão por conta. Marcas suportadas:
- `Audi`
- `Bentley` *(somente EU Data Act)*
- `Cupra` *(somente EU Data Act: o conector do fabricante está bloqueado desde maio de 2026)*
- `Renault / Dacia`
- `SEAT` *(somente EU Data Act: o conector do fabricante está bloqueado desde maio de 2026)*
- `Škoda`
- `Tronity`
- `Volkswagen (Europe)` *(somente EU Data Act: o conector do fabricante está bloqueado desde maio de 2026)*
- `Volkswagen (North America)` *(país definido automaticamente pela configuração de país do seu Home Assistant: `us` por padrão, `ca` se o seu HA estiver configurado para o Canadá)*
- `Volvo`

A **fonte de dados** correta é escolhida para você. Uma escolha só aparece quando mais de uma funciona (Škoda e Audi podem usar a conta do fabricante ou o portal somente leitura EU Data Act; `Automatic` prefere a do fabricante).

⚠️ Você pode adicionar vários veículos, de marcas diferentes ou dois carros da mesma marca que não estejam vinculados à mesma conta.

### 2. Conectando-se aos serviços online do fabricante

Os campos exibidos em cada cartão de veículo dependem da marca:

Para as marcas VAG (`Volkswagen`, `SEAT`, `Cupra`, `Škoda`, `Audi`, `Bentley`, `Volkswagen North America`):
- `Username`: O endereço de e-mail usado para fazer login no serviço do fabricante.
- `Password`: A senha da sua conta do fabricante.
- `S-PIN` *(opcional)*: O código de 4 dígitos necessário para o acesso remoto a determinados recursos do veículo.
- `VIN` *(opcional)*: Restringe a conta a um único veículo.

Para `Volvo`:
- `API key (primary)` / `API key (secondary)`: Chaves da API Volvo.
- `Vehicle token`: Token de acesso para o veículo.
- `Location token` *(opcional)*: Token de acesso para o endpoint de localização.
- `Interval` *(opcional, segundos)*: Intervalo de atualização. ⚠️ Atualizações muito frequentes podem exceder os limites de solicitação da API do fabricante e provocar restrições temporárias.

Para `Renault / Dacia`:
- `Username` / `Password`: As credenciais da sua conta My Renault.
- `Locale` *(opcional)*: ex. `fr_FR`, `de_DE`.
- `VIN` *(opcional)*: Restringe a conta a um único veículo.

Para `Tronity`:
- `Client ID` / `Client secret`: Suas credenciais da API Tronity.
- `Interval` *(opcional, segundos)*: Intervalo de atualização.
- `VIN` *(opcional)*: Restringe a conta a um único veículo.

#### A fonte de dados `EU Data Act` (Seat, Cupra, Volkswagen Europa, Bentley; opcional para Škoda e Audi)

Quando um veículo usa a fonte de dados EU Data Act, apenas dois campos importam:
- `Username`: o e-mail da sua conta da marca (Volkswagen ID, SEAT, Cupra, etc.).
- `Password`: a senha dessa mesma conta da marca.

Este conector **somente leitura** substitui os conectores Seat / Cupra / Volkswagen (Europa) que estão bloqueados (`403`) desde maio de 2026. Ele atualiza os dados aproximadamente a cada 15 minutos e **não pode enviar comandos remotos, localização ou imagens do veículo** (um aviso na barra superior lembra você disso sempre que ele estiver em uso). A marca, o intervalo de atualização e a localidade OIDC (país/idioma) são definidos automaticamente: você só fornece as suas credenciais.

> ⚠️ **Configuração obrigatória, faça isto primeiro ou não funcionará.** Este conector apenas *descarrega* os conjuntos de dados que o portal EU Data Act produz; ele nunca os cria por você. Se você pular esta etapa, o add-on conecta mas **não recebe nenhum dado**, o que pode parecer exatamente que as suas credenciais estão sendo rejeitadas. Você deve se registrar no portal e ativar uma entrega permanente de dados uma única vez:
>
> 1. Abra **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** e clique em **Log in**. Escolha a sua marca (Volkswagen, SEAT, Cupra, ...) e entre com a **mesma conta** que você usa no aplicativo oficial da marca.
> 2. Selecione o seu veículo e autorize o **My Data Portal** a acessá-lo.
> 3. Clique em **Request customised data** (também exibido como *Get customised data*) e configure:
>    - **todos os clusters de dados**,
>    - um **intervalo de 15 minutos**,
>    - uma duração **ilimitada / contínua** (sem data de término),
>    - um nome à sua escolha (por exemplo `All data 15min`).
> 4. Envie e depois **seja paciente**. Os primeiros conjuntos de dados podem levar **várias horas, às vezes mais de 24 horas**, para aparecer. Depois disso, um novo arquivo ZIP é publicado aproximadamente a cada 15 minutos e o add-on o recupera automaticamente.
>
> Você pode verificar o progresso a qualquer momento entrando novamente no portal e consultando a lista de entregas de dados do veículo. Enquanto nenhuma solicitação contínua estiver ativa e produzindo arquivos, o conector não tem nada para ler.

Detalhes completos e limitações: [CarConnectivity-connector-vw-eu-data-act](https://github.com/mikrohard/CarConnectivity-connector-vw-eu-data-act).

### 3. Configuração MQTT (obrigatória)
`MQTT` é como os dados do veículo chegam ao `Home Assistant`:
- `Broker host`: IP ou nome de domínio do servidor MQTT (deixe em branco para o padrão do add-on Mosquitto do Home Assistant, `core-mosquitto`)
- `Port`: porta do broker (padrão `1883`)
- `Username` / `Password`: credenciais do broker MQTT

⚠️ Se você ainda não está usando o MQTT no `Home Assistant`, você pode acrescentar, por exemplo, [`Mosquitto Addon` e a `MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4. Painel web
O painel original do `CarConnectivity` pode ser ativado com o botão **"Ativar o painel web CarConnectivity"**. Depois que o add-on reinicia, a Web UI abre no painel, e a barra superior permite alternar entre **Painel** e **Configuração** a qualquer momento.

- `Login user` / `Login password` *(opcional)*: deixe o usuário vazio (ou `autologin`) para entrar automaticamente; defina ambos para exigir um login.

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Nível de registro
Defina a quantidade de informações registradas em logs:
- `Info`: Exibe informações operacionais gerais.
- `Warning`: Exibe apenas avisos.
- `Error`: Exibe apenas mensagens de erro.
- `Debug`: Exibe detalhes adicionais úteis para solução de problemas.

### 6. Nível de registro da API
Defina a quantidade de informações registradas em logs:
- `Info`: Exibe informações operacionais gerais.
- `Warning`: Exibe apenas avisos.
- `Error`: Exibe apenas mensagens de erro.
- `Debug`: Exibe detalhes adicionais úteis para solução de problemas.

#### Níveis por componente (avançado)

Os dois níveis acima se aplicam globalmente. Para diagnosticar um único componente sem inundar o log, expanda **"Níveis por componente (avançado)"** na seção "Registo" da página de configuração: cada conta de veículo configurada (nível de log + API) e cada plugin (MQTT, painel web, ABRP, MQTT Home Assistant) recebe seu próprio seletor. `default` herda o nível global, então você pode, por exemplo, manter tudo em `info` e definir apenas o plugin MQTT como `debug`. Um selo na linha recolhida mostra quantas personalizações estão ativas.

Nota: uma personalização `debug` em uma **conta de veículo** também torna as bibliotecas HTTP compartilhadas verbosas para todo o add-on; as personalizações de plugin são totalmente isoladas.

### 7. `ABRP - A Better Routeplanner`

Ative **"Enviar dados para ABRP"** e depois adicione uma linha por veículo com **"+ Adicionar token ABRP"**:

- `VIN`: o **Número de identificação do veículo** (17 caracteres alfanuméricos), exclusivo de cada veículo.
- `ABRP token`: o **token de autenticação** gerado pelo ABRP para esse veículo.

#### Pré-requisitos

Para recuperar seu token, vá ao seu veículo em A Better Routeplanner, selecione "Dados ao vivo" e depois vincule seu veículo usando a seção "genérico". O token para colar na configuração será exibido. Adicione uma linha VIN/token para cada veículo que deseja conectar ao ABRP.

### 8. Modo de especialista
O modo de especialista permite o uso de todas as funções nativas do Carconnectivity, incluindo aquelas que não estão disponíveis na interface gráfica, desde que as funções correspondentes sejam suportadas pelos binários do add-on.

⚠️ Aviso:
Este modo desativa todas as verificações de validação e segurança de conteúdo. Como resultado, mesmo um pequeno erro (como uma sintaxe JSON inválida) pode impedir que o add-on seja iniciado corretamente.

O modo de especialista destina-se apenas a usuários avançados.
Para usá-lo com segurança, você deve:

Estar familiarizado com a sintaxe e a estrutura JSON.

O modo de especialista é ativado simplesmente pela **presença** de um arquivo `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` contendo as configurações desejadas (sem opção para alternar). Ele tem prioridade e substitui completamente a configuração produzida pela página de configuração, que é gravada em `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.json` (o modelo editável da página é salvo separadamente em `carconnectivity.configui.json`). O diretório `/addon_configs/1b1291d4_carconnectivity-addon/` pode não aparecer imediatamente no sistema de arquivos do `Home Assistant`. Se for esse o caso, reinicie o supervisor.

Consulte a documentação oficial do Carconnectivity para obter a lista de funções suportadas e os parâmetros esperados.

## Práticas recomendadas
- **Adicione cartões de veículo apenas para as contas que você possui.**
- **Não compartilhe suas credenciais de login.**
- **Ajuste o intervalo de atualização (quando disponível) para evitar exceder os limites de solicitação da API. Lembre-se de que o limite parece ser cerca de 1000 req/dia.**
- **Use o nível de registro "Debug" somente ao solucionar problemas e prefira uma personalização por componente para manter o resto do log silencioso.**
- **Reinicie o add-on depois de salvar a configuração.**

---

Se você tiver alguma dúvida ou encontrar problemas durante a configuração, consulte a documentação do módulo.
Se você encontrar um bug, abra um problema.
