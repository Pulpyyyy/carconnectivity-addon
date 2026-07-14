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
| Version | [![GitHub release (latest by date)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/pulpyyyy/carconnectivity-addon/releases) | [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/pulpyyyy/carconnectivity-addon-edge-amd64?&sort=date&label=&style=for-the-badge)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/carconnectivity-addon-edge/CHANGELOG.md) |

# Guides traduits

[![French](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/FR.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.fr.md)
[![Italian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/IT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.it.md)
[![German](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/DE.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.de.md)
[![Spanish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/ES.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.es.md)
[![Polish](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pl.md)
[![Portuguese](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/PT.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.pt.md)
[![Norwegian](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NO.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.no.md)
[![Dutch](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/NL.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.nl.md)
[![English](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/US.svg)](https://github.com/Pulpyyyy/carconnectivity-addon/blob/main/README.md)


## Introduction

`CarConnectivity-Addon` vous permet de connecter et de récupérer des informations sur votre véhicule à partir des services en ligne des fabricants compatibles. Ce guide explique comment configurer correctement le module.
Je ne fais simplement qu'integrer [Le travail (excellent) fait par Till.](https://github.com/tillsteinbach/CarConnectivity)

Son travail est également disponible sous forme d'images Docker. Donc si vous utilisez `Home Assistant` en tant que `docker` autonome, vous pouvez également l'utiliser directement.

**⚠️ Le projet est toujours en cours de développement, le `reverse engineering` de l'API à terminer et la communication avec MQTT/Home Assistant à adapter.⚠️**

> [!IMPORTANT]
> ### 🚧 Blocage de l'API VAG : Volkswagen / Seat / Cupra (mai 2026)
>
> Depuis fin mai 2026, le groupe Volkswagen a restreint l'accès tiers à ses API. Les connecteurs classiques VW/Seat/Cupra renvoient des erreurs `403` et ne récupèrent plus de données, alors que les applications officielles fonctionnent toujours. Il n'existe actuellement aucun correctif pour ces connecteurs.
>
> **Contournement :** le connecteur en lecture seule `EU Data Act` est **✅ intégré dans cet add-on** (voir la section dédiée ci-dessous) ; les configurations bloquées y sont migrées automatiquement.

> [!TIP]
> ### Une version Edge est disponible
> La version **Edge** est la **version de développement** (un travail en cours, pas une version finale) : elle propose les nouvelles fonctionnalités en premier et peut être instable. Installez **"CarConnectivity Add-on Edge"** depuis le même référentiel.

## Ajouter le référentiel

[![`Addon Home Assistant`](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/.github/img/addon-ha.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPulpyyyy%2Fcarconnectivity-addon)


![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/mqtt_device.png)

## Configuration

L'add-on se configure entièrement depuis sa **page de configuration intégrée**, et non depuis l'onglet d'options de Home Assistant (qui n'affiche plus qu'un renvoi vers elle).

**Comment l'ouvrir :** onglet **Info** de l'add-on → bouton **OPEN WEB UI** → bouton **Configuration** dans la barre supérieure de la page. Lorsque le tableau de bord web est désactivé (ou pas encore démarré), la Web UI s'ouvre directement sur la page de configuration.

À la première ouverture, une configuration existante est **importée automatiquement** (y compris celle produite par une ancienne version de l'add-on), et les connecteurs Seat / Cupra / Volkswagen (Europe) bloqués sont **migrés automatiquement** vers le connecteur EU Data Act au démarrage. Après l'enregistrement, **redémarrez l'add-on** pour appliquer la nouvelle configuration.

### 1. Véhicules

Cliquez sur **« + Ajouter un véhicule »** et choisissez votre marque ; ajoutez une carte par compte. Marques prises en charge :
- `Audi`
- `Bentley` *(EU Data Act uniquement)*
- `Cupra` *(EU Data Act uniquement : le connecteur constructeur est bloqué depuis mai 2026)*
- `Renault / Dacia`
- `SEAT` *(EU Data Act uniquement : le connecteur constructeur est bloqué depuis mai 2026)*
- `Škoda`
- `Tronity`
- `Volkswagen (Europe)` *(EU Data Act uniquement : le connecteur constructeur est bloqué depuis mai 2026)*
- `Volkswagen (North America)` *(pays défini automatiquement à partir du paramètre de pays de votre Home Assistant : `us` par défaut, `ca` si votre HA est configuré pour le Canada)*
- `Volvo`

La bonne **source de données** est choisie pour vous. Un choix n'apparaît que lorsque plusieurs sont possibles (Škoda et Audi peuvent utiliser soit leur compte constructeur, soit le portail EU Data Act en lecture seule ; `Automatic` privilégie le compte constructeur).

⚠️ Vous pouvez ajouter plusieurs véhicules, de marques différentes ou deux voitures d'une même marque qui ne sont pas liées au même compte.

### 2. Connexion aux services en ligne du fabricant

Les champs affichés sur chaque carte de véhicule dépendent de la marque :

Pour les marques VAG (`Volkswagen`, `SEAT`, `Cupra`, `Škoda`, `Audi`, `Bentley`, `Volkswagen North America`) :
- `Username` : l'adresse e-mail utilisée pour se connecter au service du fabricant.
- `Password` : le mot de passe de votre compte fabricant.
- `S-PIN` *(facultatif)* : le code à 4 chiffres requis pour l'accès à distance à certaines fonctionnalités du véhicule.
- `VIN` *(facultatif)* : restreint le compte à un seul véhicule.

Pour `Volvo` :
- `API key (primary)` / `API key (secondary)` : clés de l'API Volvo.
- `Vehicle token` : jeton d'accès pour le véhicule.
- `Location token` *(facultatif)* : jeton d'accès pour le point de terminaison de localisation.
- `Interval` *(facultatif, secondes)* : intervalle de rafraîchissement. ⚠️ Des rafraîchissements trop fréquents peuvent dépasser les limites de demande de l'API imposées par le fabricant et entraîner des restrictions temporaires.

Pour `Renault / Dacia` :
- `Username` / `Password` : les identifiants de votre compte My Renault.
- `Locale` *(facultatif)* : par exemple `fr_FR`, `de_DE`.
- `VIN` *(facultatif)* : restreint le compte à un seul véhicule.

Pour `Tronity` :
- `Client ID` / `Client secret` : vos identifiants d'API Tronity.
- `Interval` *(facultatif, secondes)* : intervalle de rafraîchissement.
- `VIN` *(facultatif)* : restreint le compte à un seul véhicule.

#### La source de données `EU Data Act` (Seat, Cupra, Volkswagen Europe, Bentley ; en option pour Škoda et Audi)

Lorsqu'un véhicule utilise la source de données EU Data Act, seuls deux champs comptent :
- `Username` : l'e-mail de votre compte de marque (Volkswagen ID, SEAT, Cupra, etc.).
- `Password` : le mot de passe de ce même compte.

Ce connecteur **en lecture seule** remplace les connecteurs Seat / Cupra / Volkswagen (Europe) bloqués (`403`) depuis mai 2026. Il rafraîchit les données environ toutes les 15 minutes et **ne peut pas envoyer de commandes à distance, ni la localisation, ni les images du véhicule** (un avertissement dans la barre supérieure vous le rappelle dès qu'il est utilisé). La marque, l'intervalle de rafraîchissement et la locale OIDC (pays/langue) sont réglés automatiquement : vous ne fournissez que vos identifiants.

> ⚠️ **Configuration obligatoire, à faire en premier sinon cela ne fonctionnera pas.** Ce connecteur ne fait que *télécharger* les jeux de données produits par le portail EU Data Act ; il ne les crée jamais pour vous. Si vous sautez cette étape, l'add-on se connecte mais **ne reçoit aucune donnée**, ce qui peut ressembler exactement à un refus de vos identifiants. Vous devez vous inscrire sur le portail et activer une fois une livraison permanente des données :
>
> 1. Ouvrez **[eu-data-act.drivesomethinggreater.com](https://eu-data-act.drivesomethinggreater.com/)** et cliquez sur **Log in**. Choisissez votre marque (Volkswagen, SEAT, Cupra, ...) et connectez-vous avec le **même compte** que celui utilisé dans l'application officielle de votre marque.
> 2. Sélectionnez votre véhicule et autorisez **My Data Portal** à y accéder.
> 3. Cliquez sur **Request customised data** (aussi affiché comme *Get customised data*) et configurez :
>    - **tous les clusters de données**,
>    - un **intervalle de 15 minutes**,
>    - une durée **illimitée / continue** (pas de date de fin),
>    - un nom de votre choix (par exemple `All data 15min`).
> 4. Validez, puis **soyez patient**. Les premiers jeux de données peuvent mettre **plusieurs heures, parfois plus de 24 heures**, à apparaître. Ensuite, un nouveau fichier ZIP est publié environ toutes les 15 minutes et l'add-on le récupère automatiquement.
>
> Vous pouvez vérifier l'avancement à tout moment en vous reconnectant au portail et en consultant la liste des livraisons de données du véhicule. Tant qu'aucune demande continue n'est active et ne produit de fichiers, le connecteur n'a rien à lire.

Détails complets et limitations : [CarConnectivity-connector-vw-eu-data-act](https://github.com/mikrohard/CarConnectivity-connector-vw-eu-data-act).

### 3. Configuration MQTT (obligatoire)
`MQTT` est le moyen par lequel les données du véhicule arrivent dans `Home Assistant` :
- `Broker host` : IP ou nom de domaine du serveur MQTT (laissez vide pour la valeur par défaut de l'add-on Mosquitto de Home Assistant, `core-mosquitto`)
- `Port` : port du broker (par défaut `1883`)
- `Username` / `Password` : identifiants du broker MQTT

⚠️ Si vous n'utilisez pas déjà MQTT dans `Home Assistant`, vous pouvez ajouter, par exemple, [`Mosquitto Addon` et `MQTT integration`](https://www.home-assistant.io/integrations/mqtt)

### 4. Tableau de bord web
Le tableau de bord d'origine de `CarConnectivity` peut être activé avec l'interrupteur **« Activer le tableau de bord web CarConnectivity »**. Une fois l'add-on redémarré, la Web UI s'ouvre sur le tableau de bord, et la barre supérieure permet de basculer à tout moment entre **Tableau de bord** et **Configuration**.

- `Login user` / `Login password` *(facultatif)* : laissez l'utilisateur vide (ou `autologin`) pour être connecté automatiquement ; renseignez les deux pour exiger une connexion.

![image](https://raw.githubusercontent.com/Pulpyyyy/carconnectivity-addon/refs/heads/main/img/webui.png)

### 5. Niveau de journalisation
Définissez la quantité d'informations enregistrées dans les journaux :
- `Info` : affiche des informations opérationnelles générales.
- `Warning` : affiche uniquement les avertissements.
- `Error` : affiche uniquement les messages d'erreur.
- `Debug` : affiche des détails supplémentaires utiles pour le dépannage.

### 6. Niveau de journalisation de l'API
Définissez la quantité d'informations enregistrées dans les journaux :
- `Info` : affiche des informations opérationnelles générales.
- `Warning` : affiche uniquement les avertissements.
- `Error` : affiche uniquement les messages d'erreur.
- `Debug` : affiche des détails supplémentaires utiles pour le dépannage.

#### Niveaux par composant (avancé)

Les deux niveaux ci-dessus s'appliquent globalement. Pour dépanner un seul composant sans inonder le journal, dépliez **« Niveaux par composant (avancé) »** dans la section Journalisation de la page de configuration : chaque compte de véhicule configuré (niveau journal + niveau API) et chaque plugin (MQTT, tableau de bord web, ABRP, MQTT Home Assistant) dispose de son propre sélecteur. `default` hérite du niveau global, vous pouvez donc par exemple laisser tout le reste à `info` et passer uniquement le plugin MQTT en `debug`. Un badge sur la ligne repliée indique le nombre de personnalisations actives.

Note : une personnalisation `debug` sur un **compte de véhicule** rend aussi les bibliothèques HTTP partagées verbeuses pour tout l'add-on ; les personnalisations de plugins sont totalement isolées.

### 7. `ABRP - A Better Routeplanner`

Activez **« Envoyer les données à ABRP »**, puis ajoutez une ligne par véhicule avec **« + Ajouter un jeton ABRP »** :

- `VIN` : le **Vehicle Identification Number** (numéro d'identification du véhicule, 17 caractères alphanumériques), unique pour chaque véhicule.
- `ABRP token` : le **jeton d'authentification** généré par ABRP pour ce véhicule.

#### Pré-requis

Pour récupérer votre jeton, accédez à votre véhicule sur A Better Routeplanner, sélectionnez « Live Data », puis reliez votre véhicule à l'aide de la section « Generic ». Le jeton à coller dans la configuration s'affichera. Ajoutez une ligne VIN/jeton pour chaque véhicule que vous souhaitez connecter à ABRP.

### 8. Mode expert
Le mode expert permet d'utiliser toutes les fonctions natives de Carconnectivity, y compris celles non disponibles via l'interface graphique, tant que les fonctions correspondantes sont prises en charge par les binaires du module complémentaire.

⚠️ AVERTISSEMENT :
Ce mode désactive toutes les vérifications de la validation et de la sécurité du contenu. En conséquence, même une petite erreur (comme une syntaxe JSON non valide) peut empêcher le module complémentaire de se lancer correctement.

Le mode expert est uniquement destiné aux utilisateurs avancés.
Pour l'utiliser en toute sécurité, vous devez :

Être familier avec la syntaxe et la structure JSON.

Le mode expert s'active par la simple **présence** d'un fichier `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.expert.json` contenant les réglages souhaités (aucune option à cocher). Il est prioritaire et remplace complètement la configuration produite par la page de configuration, qui est écrite dans `/addon_configs/1b1291d4_carconnectivity-addon/carconnectivity.json` (le modèle éditable de la page est enregistré à part dans `carconnectivity.configui.json`). Le dossier `/addon_configs/1b1291d4_carconnectivity-addon/` peut ne pas apparaître tout de suite dans le système de fichiers `Home Assistant`. Si tel est le cas, redémarrez le superviseur.

Reportez-vous à la documentation officielle de Carconnectivity pour la liste des fonctions prises en charge et les paramètres attendus.

## Bonnes pratiques
- **N'ajoutez des cartes de véhicule que pour les comptes que vous possédez.**
- **Ne partagez pas vos informations d'identification de connexion.**
- **Ajustez l'intervalle de rafraîchissement (lorsqu'il est disponible) pour éviter de dépasser les limites de demande d'API. N'oubliez pas que la limite semble être d'environ 1000 req / jour.**
- **Utilisez le niveau de journalisation "Debug" uniquement lors du dépannage des problèmes, et préférez une personnalisation par composant pour garder le reste du journal silencieux.**
- **Redémarrez l'add-on après avoir enregistré la configuration.**

---

Si vous avez des questions ou rencontrez des problèmes pendant la configuration, reportez-vous à la documentation du module.
Si vous trouvez un bogue, veuillez ouvrir un problème.
