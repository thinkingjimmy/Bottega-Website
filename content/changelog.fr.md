# Journal des modifications

Ce fichier consigne les jalons du produit, pas les itérations internes d’implémentation.


## 2026-10-06 — v0.2.1

macOS avec puce Apple et Web. Le protocole 14, les contenus cloud et les mots de passe de synchronisation sont conservés. Quittez Bottega puis remplacez l’application manuellement depuis 0.2.0. Signature ad-hoc, sans notarisation Apple. Cette préversion est exclue de GitHub Latest. L’usage CPU au repos, les vérifications sur appareils physiques et la signature officielle restent à vérifier.

- **Un premier lancement plus court.** Choisissez le dossier de contenu et un Agent. Skills et Memory se configurent ensuite. La détection contourne les entrées PATH défectueuses et trouve aussi le CLI inclus dans l’application Codex sur macOS.
- **Importer l’historique à la demande.** Les réglages du Project proposent uniquement les historiques des Agents installés. Après la proposition initiale, rouvrir le Project ou redémarrer ne lance plus d’analyse automatique.
- **Conserver le choix de l’Agent.** Les préférences et le modèle du premier message restent déterminés pendant le chargement du catalogue. Les menus de saisie et la disposition des réglages du Project sont plus cohérents.
- **Des commandes Memory cohérentes.** La visibilité du plugin et l’autorisation du service sont distinctes. Le service choisi et les données restent enregistrés, avec le consentement nécessaire.
- **Récupérer les Sketch.** Réessayez après une erreur de compilation native ou d’initialisation sans perdre le dessin confirmé.
- **Synchronisation et connexion plus claires.** Les conséquences du mot de passe sont expliquées une fois. Vérifiez ordinateur, compte et code avant d’approuver une connexion. La saisie distante indique comment rétablir la synchronisation.

## 2026-10-04 — v0.2.0

Préversion pour macOS avec puce Apple et Web : mises à jour manuelles, signature ad-hoc, sans notarisation. Windows, Linux et Android sont prévus séparément. Le protocole 14 exige la mise à jour des ordinateurs utilisant le protocole 13. Les contenus cloud et mots de passe sont conservés. Quittez l’application et sauvegardez son contenu et ses données avant l’installation. La signature officielle et les vérifications détaillées sur appareils restent en cours.

- **Tous les plugins au même endroit.** Les réglages présentent capacités, dépendances, sources et usage. Base, Providers, Workflow, Sketch, Memory et Dock partagent les mêmes commandes. Les désactiver conserve le contenu.
- **Configurations d’Agent et workflows.** Choisissez modèle et raisonnement dans des listes. Les erreurs conservent les modifications. Skills, MCP et Memory ont des autorisations explicites. Les quatre Agents vérifiés peuvent exécuter les étapes ; planification et revue restent en lecture seule.
- **Plugins Sketch modifiables.** L’image et sa source restent disponibles, avec plusieurs versions. Une compilation ratée garde la dernière version fonctionnelle. Les redémarrages et mises à jour protègent les dessins confirmés et les modifications ouvertes.
- **Memory sous contrôle visible.** Désactivé par défaut, le service peut être suspendu ou repris depuis le Web sur l’ordinateur propriétaire. Memory dans un workflow demande une autorisation distincte, reste en lecture seule et ne capture aucun souvenir.
- **Dock sur l’écran choisi.** Choisissez écran principal, externe ou nommé, puis bord gauche, bas ou droit. Le placement est local et la disposition peut se synchroniser. Cette préversion coexiste avec le Dock système ; son remplacement est indisponible.
- **Un espace Web plus complet.** Les menus App et Base s’adaptent aux petits écrans. Actions hors ligne, rapports et preuves sont visibles. Les notifications sont facultatives. Les Apps statiques et liées à Base fonctionnent ; les interfaces server App restent sur ordinateur.
- **Une récupération plus claire.** Les erreurs de dossier et de démarrage proposent des actions précises. Quitter attend l’enregistrement du brouillon. Les erreurs de chargement ou compilation préservent le travail et le prochain lancement. Les mises à jour gardent les modifications locales et les Chats sauvegardés.

## 2026-09-30 — v0.1.9

Sauvegardez le dossier Bottega et les données de l’application. La base 0.1.8 est isolée sans modification et l’index reconstruit depuis le dossier. Le cloud est réinitialisé pour cette version : reconnectez-vous et définissez le mot de passe sur le premier ordinateur. Protocole 13. Distribution limitée aux DMG/ZIP macOS avec puce Apple, sans signature ni notarisation. Depuis 0.1.0 ou 0.1.1, installez manuellement.

- **Plan · Develop · Review.** Lancez un workflow depuis une ligne Base, confirmez le plan, acceptez le résultat, accordez une exception ou demandez une reprise. Ajout de Stage et des critères d’acceptation, avec pause, annulation, nouvelle tentative et rappels. Claude et Codex sont pris en charge.
- **Configurations d’Agent réutilisables.** Enregistrez Provider, modèle, instructions, permissions, espace de travail et réseau. Blank, Planner, Developer et Reviewer servent de départ. Les configurations se synchronisent ; les changements concernent les prochaines exécutions.
- **Plugins et Apps.** Gérez Base, les quatre Providers, Workflow, Extensions et les plugins des Agents ensemble. Désactiver ne supprime aucune donnée.
- **Needs you sur Web et téléphone.** Lancez, confirmez, approuvez, renvoyez, suspendez ou annulez une exécution. La cloche rassemble les décisions en attente. Les interfaces des Apps statiques et liées à Base deviennent disponibles.
- **Node inclus.** MCP intégré, compilateur d’App, adaptateurs d’Agent et scripts Node utilisent le Node 24 fourni, sans dépendre du PATH.
- **Des limites plus strictes pour les Agents.** Les réglages du CLI GitHub sont protégés. Une revue n’augmente pas les permissions. Les outils de navigateur restent dans les onglets autorisés et Codex utilise le bac à sable dans les modes de confirmation, approbation et planification.
- **Des conversations plus stables.** Les brouillons survivent à la fermeture, aux plantages et redémarrages. Les messages en file partent même hors écran. L’envoi attend la fin du démarrage ; un fichier défaillant propose Réessayer ou Ignorer.
- **Connexion approuvée par code.** Dans le navigateur, choisissez le code affiché sur l’ordinateur qui demande la connexion.
- **Réglages et récupération simplifiés.** Lab et le maintien des connexions disparaissent. Development Kanban n’est plus fourni, mais une copie installée reste disponible. Un dossier absent ouvre la récupération.
- **Protocole 13.** Synchronisation des configurations d’Agent, colonnes de workflow, exécutions et éléments Needs you.

## 2026-09-24 — v0.1.8

Les données et réglages locaux de 0.1.7 et les contenus cloud sont conservés. Le protocole 10 impose la mise à jour de tous les ordinateurs du compte. Cette version fournit macOS arm64, Windows x64 et Linux x64, sans signature ni notarisation. macOS reste la plateforme principale ; la parité ailleurs continue.

- **Bottega Dock.** Sur macOS 15 ou ultérieur avec puce Apple, accédez aux Apps, Finder, Downloads, Trash et quotas. Cette version permet coexistence ou remplacement du Dock système, avec récupération après arrêt imprévu et Restore System Dock.
- **Disposition du Dock synchronisée.** Elle suit le compte avec chiffrement de bout en bout. Les modifications simultanées sont fusionnées lorsque possible, puis les conflits demandent confirmation.
- **Des réglages cohérents.** Dock, Sync et Memory partagent sections, lignes, progression et erreurs. Les procédures utilisent un même dialogue ; la configuration initiale montre les étapes à gauche.
- **Déplacer le dossier Bottega.** Les chemins suivent le déplacement au redémarrage. Vers un autre disque, le contenu est copié et vérifié avant d’envoyer l’ancienne copie à la corbeille.
- **Effacer les données de cet ordinateur.** Supprimez conversations, réglages, clés et connexion, puis revenez à la configuration. Le dossier peut aller à la corbeille. Les données cloud restent disponibles après reconnexion.
- **Reconfigurer après suppression du dossier.** Un dossier absent relance la configuration. Une copie de conversation illisible est déplacée dans .trash et signalée une fois.
- **Protocole 10.** Il transporte la disposition chiffrée du Dock. Les données locales restent inchangées.

## 2026-09-23 — v0.1.7

Les données locales, contenus cloud et mots de passe de 0.1.6 sont conservés. Mettez tous les ordinateurs à jour pour le protocole 9. Installateurs macOS arm64, Windows x64 et Linux x64 sans signature ni notarisation ; la parité hors macOS continue.

- **Providers, Updates, Community.** Réglez Agent initial et ordre des listes, versions et mises à jour des CLI et de Bottega, puis liens communautaires. Update all met les CLI à jour avant Bottega. About et Backends sont regroupés.
- **Conserver une instruction impossible à appliquer maintenant.** Les Agents compatibles l’utilisent pendant le tour ; Kimi et OpenCode la gardent pour après. Un refus préserve le brouillon et un tour terminé permet un nouvel envoi.
- **Nettoyer les pièces jointes avant l’envoi distant.** Les photos sont limitées à 2048 px et débarrassées des métadonnées personnelles. Le format réel est vérifié et HEIC expliqué si indisponible. Après 20 heures, un téléversement non envoyé demande à être renouvelé.
- **Un mot de passe de synchronisation plus fort.** Les nouveaux mots de passe exigent 12 caractères, lettres, chiffres et diversité ; suites et mots usuels sont refusés. Les règles apparaissent pendant la saisie. Les anciens mots de passe restent valides.
- **La durée hors ligne est visible.** La saisie indique veille, hors ligne ou déconnexion et le temps depuis le dernier contact.
- **Protocole 9.** Il transporte le résultat des instructions supplémentaires et prépare le mobile. Les données locales restent inchangées.

## 2026-09-22 — v0.1.6

Quittez et sauvegardez dossier Bottega et données de l’application. La base 0.1.5 et ses fichiers sont isolés à l’identique, puis l’index est reconstruit depuis le dossier. Des réponses inachevées peuvent manquer ; recherche et synchronisation sont recréées. Le cloud est réinitialisé pour cette version : reconnectez-vous et définissez le mot de passe sur le premier ordinateur.

- **Une conversation appartient à son ordinateur d’origine.** Elle ne change plus d’ordinateur en cours d’exécution. Ouvrez celui qui possède le travail. Sélection d’exécuteur, transfert et file entre ordinateurs disparaissent.
- **Se connecter active le contrôle distant.** L’ordinateur connecté publie Projects et Chats et accepte leurs commandes. Aucun second interrupteur. La configuration commence localement ; la connexion établit ou demande le mot de passe de synchronisation.
- **Changer d’ordinateur dans la barre latérale.** Web, téléphone et bureau partagent des onglets avec état et durée. Les noms dupliqués sont distingués. Un compte sans ordinateur invite à commencer sur ordinateur.
- **Utiliser les Projects distants.** Une icône globe et le nom du propriétaire remplacent le dossier local. Les Chats créés sont exécutés et stockés là-bas. Épingler ne copie rien et détacher ne modifie pas le propriétaire.
- **Modifier les données même hors ligne.** Renommer, archiver, trier et modifier Base ou App fonctionnent, puis sont réconciliés au retour. Envoyer, arrêter ou approuver exige la connexion. Une décision déjà traitée indique l’ordinateur responsable.
- **Le dossier appartient à son ordinateur.** Le même ordinateur le reprend après réinstallation. Un autre est refusé avec le nom du propriétaire et une action claire. Un dossier jamais synchronisé reste transportable.
- **Continuer une conversation importée.** Les historiques Codex, Claude Code et Kimi retrouvent une saisie normale dans un nouveau profil ou après reconstruction, avec une limite visible de l’historique importé.
- **Un premier téléversement exact.** Sync affiche les octets réellement envoyés et le total. Les petites conversations passent d’abord et chaque message utilise environ deux fois moins d’allers-retours.
- **Protocole 8.** Le protocole et la base locale changent. Suivez les consignes de sauvegarde et récupération ci-dessus.

## 2026-09-19 — v0.1.5

Nouveau stockage centré sur le dossier Bottega. Aucun import automatique des Chats, Projects, Apps, Bases, pièces jointes ou réglages de 0.1.4 et antérieures. Quittez, sauvegardez toutes les données et conservez Chat Homes et Projects externes. Déplacez l’ancien dossier vers une sauvegarde puis configurez un nouveau dossier. Les anciennes données ne sont pas modifiées.

- **Cloud Sync chiffré de bout en bout.** Facultatif, il utilise un mot de passe distinct défini sur le premier ordinateur. La clé est dérivée sur l’appareil et seul le texte chiffré est stocké. Aucune clé de récupération ni réinitialisation. Rejoignez avec le même compte et mot de passe.
- **Ouvrir le travail dans un navigateur.** Chats, pièces jointes, recherche des sept derniers jours, six vues Base, données App, archives, appareils et préférences sont disponibles sur Web et téléphone. Interfaces App personnalisées et outils locaux restent sur l’ordinateur.
- **Continuer depuis un autre appareil.** Lorsque le service autorise le contrôle distant, un ordinateur connecté et déverrouillé accepte envoi, arrêt, approbation et instructions. Sans cette autorisation, lecture et suivi d’un tour restent possibles.
- **Garder un dossier à soi.** Conversations, pièces jointes, résultats, Chat Homes, Projects, Bases, sources App et Skills y résident. Clés et permissions restent locales. Pour une sauvegarde complète, copiez après fermeture ; iCloud et Dropbox ne sont pas pris en charge.
- **Choisir la configuration initiale.** L’assistant de cette version propose local ou compte existant, puis dossier, Agents, Skills et Memory.
- **Examiner les résultats.** Visualisations, aperçus, sauvegarde, révélation, Quick Look, import de feuilles dans Base et résultats Claude sont disponibles. Les aperçus n’ont ni réseau ni stockage.
- **Mieux contrôler les quatre Agents.** Quota OpenCode Go, choix explicite d’Agent et modèle pour les titres, et maintien des connexions dans Lab, désactivé par défaut.
- **Opérations quotidiennes dans la barre latérale.** L’ordre des Chats se synchronise. Renommez et triez les Projects. Les confettis d’archivage sont facultatifs et respectent la réduction des animations.

## 2026-09-10 — v0.1.4

Nouveau format local : 0.1.3 et antérieures ne peuvent être ouvertes ou migrées automatiquement. Quittez, sauvegardez toutes les données ainsi que Chat Homes et Projects externes, déplacez l’ancien dossier puis démarrez avec un dossier neuf. Les anciens Chats, réglages et données d’App ne sont pas importés automatiquement.

- **Sketch dans la saisie.** Dessin, texte, huit formes, effacement partiel, annuler, rétablir, couleurs et épaisseur sont disponibles depuis +. Les brouillons restent modifiables et l’Agent reçoit un PNG sur fond blanc.
- **Voir le quota avant de choisir.** Codex, Claude Code et Kimi montrent solde et réinitialisation. OpenCode indique l’absence d’information unifiée dans cette version. La première requête reprend au retour et les actions de connexion ou réparation restent accessibles.
- **Protéger le travail local.** Cohérence et récupération de Chat, Base, Project, App et pièces jointes sont renforcées. Les interruptions conservent l’état. Aucun compte requis et pas de synchronisation cloud dans cette version.
- **Apps propriétaires cohérentes.** Development Kanban, Expense Tracker, Fitness Log et Design Canvas utilisent React et les mêmes conventions, avec leurs données et usages existants. Bottega 0.1.3 ou ultérieur est requis.
- **Choisir l’accès en arrière-plan.** Sur macOS, choisissez logo, icône monochrome ou panneau d’encoche. Sans encoche, une icône prend le relais. Le lancement à la connexion est indépendant ; les deux options sont désactivées au départ.
- **Des commandes plus fluides.** Navigation, taille du texte, renommage, progression et récupération App, partage et canevas Sketch ont des actions et dispositions cohérentes.

## 2026-09-08 — v0.1.3

**Avant la mise à niveau :** 0.1.3 utilise un nouveau format de stockage local. Les bases Chat de 0.1.2 et des versions antérieures ne peuvent être ni ouvertes ni migrées automatiquement. Quittez Bottega et sauvegardez tout le dossier de données de l’application. Conservez cette copie pour l’ancienne version et démarrez 0.1.3 avec un dossier neuf ; les anciens Chats et réglages ne sont pas importés automatiquement.

- **Changer d’Agent dans un Chat.** Lorsque le Chat est au repos, choisissez Codex, Claude Code, Kimi Code ou OpenCode pour le prochain tour. Une seule transcription conserve les auteurs et les repères de changement. Le nouvel Agent reçoit un contexte limité et peut consulter l’historique pertinent.
- **Voir si un Agent est prêt.** Le compositeur affiche l’installation, l’authentification et la disponibilité du runtime, avec des actions d’installation, de connexion et de nouvelle tentative. Un Agent indisponible ne consomme plus silencieusement les tâches en attente ; la récupération reste limitée au Chat ou à l’Agent concerné.
- **Suivre les tâches hors de la fenêtre principale sur macOS.** Activez séparément le lancement à la connexion, l’exécution après fermeture de la fenêtre et le panneau flottant. En haut de l’écran, ce panneau affiche les tâches actives et les demandes nécessitant votre attention, permet la navigation au clavier et ouvre le Chat associé. Les trois options sont désactivées par défaut.
- **Vérifier la compatibilité avant d’installer une App.** Les quatre Apps first-party exigent désormais Bottega 0.1.3. Installation, reconstruction, autorisation et activation vérifient cette exigence. Après une mise à niveau et un redémarrage, le parcours peut reprendre le candidat initial. Un refus conserve la version fonctionnelle et ses permissions.
- **Renommer une App sans perturber son travail.** Le nom affiché peut changer sans modifier la version active, le code source, les données ni les permissions.
- **Simplifier l’ajout des Projects.** Les choix d’import d’historique n’apparaissent que si un historique CLI local existe ; les autres Projects s’ajoutent directement.

Les installeurs macOS arm64 DMG/ZIP, Windows x64 NSIS et Linux x64 AppImage restent non signés ; suivez les instructions de premier lancement. macOS demeure la plateforme principale. L’isolation native des Apps et la parité complète sur Windows/Linux sont toujours en cours. Depuis 0.1.0 ou 0.1.1, installez 0.1.3 manuellement à cause de l’ancien problème de mise à jour. La préparation du stockage ci-dessus concerne toutes les versions antérieures.

## 2026-09-05 — v0.1.2

**Depuis 0.1.0 ou 0.1.1 :** téléchargez et installez 0.1.2 manuellement depuis GitHub Releases. Leur bouton de mise à jour contient le problème corrigé ici et ne peut donc pas recevoir ce correctif.

- Correction du blocage des téléchargements de mise à jour par une clé de compatibilité indisponible dans les builds non signés. La barre latérale distingue installation automatique et téléchargement manuel, affiche la progression et conserve un accès à Releases ou About en cas d’échec d’une mise à jour ou d’une vérification en arrière-plan.
- Reconstruction de Fitness Log avec l’interface React du host. Les 72 exercices, 17 régions musculaires, cinq langues, démonstrations animées, plans d’entraînement et dispositions adaptatives claires/sombres sont conservés avec les API de composants et de données partagées.
- Chargement complet et récupérable des données des Apps. Les snapshots Base lisent toutes les pages et publient une révision cohérente. Les envois de plans Fitness conservent les mêmes identifiants de lignes lors des nouvelles tentatives ou des résultats incertains, évitant les doublons.
- Correction de la recherche dans le Chat et de la navigation : une page en échec attend une nouvelle tentative explicite, les anciennes réponses ne remplacent pas une requête récente et changer de Chat ne laisse plus visible la branche du worktree précédent.
- Réparation du démarrage des anciens schémas du catalogue d’Apps : les octets d’origine sont conservés en quarantaine avant la création d’un catalogue actuel vide. Les catalogues corrompus au format actuel exigent toujours une réparation explicite. La récupération des tours préparés et l’annulation de Memory sont également renforcées.
- Publication des installeurs macOS arm64 DMG/ZIP, Windows x64 NSIS et Linux x64 AppImage, toujours non signés et soumis aux mêmes étapes de premier lancement.

## 2026-09-04 — v0.1.1

- Publication des installeurs v0.1.1 : DMG/ZIP macOS arm64, NSIS Windows x64 et AppImage Linux x64. Ils restent non signés ; les étapes de premier lancement de 0.1.0 s’appliquent toujours.
- Ajout de Chat Fork. Toute réponse de l’assistant peut démarrer un nouveau Chat qui hérite de l’historique antérieur en lecture seule. Dans un Git Project, le fork peut avoir son propre worktree géré par le produit pour éviter que deux branches écrasent la même copie de travail.
- Ajout d’un panneau d’historique à App Use et possibilité d’exécuter une App dans une fenêtre indépendante de la fenêtre principale.
- Unification d’App GUI Surface autour d’un seul ensemble de composants et d’un canal de messages partagé, sans copie du protocole dans chaque page d’App.
- Correction de deux pertes dans l’historique importé : l’actualisation conserve l’appartenance de chaque Chat à son Project et la réimportation met à jour son document de recherche de titre.
- Adaptation des trois étapes d’accueil aux fenêtres étroites. Les lignes de capacités suivent la largeur du conteneur et les descriptions sont regroupées autour de l’accueil Chat, de l’Agent et des compléments pour rester lisibles.
- Réparation des écarts de projection de recherche du magasin Chat par recalcul et réécriture dans le même circuit. En cas d’échec réel de l’autovérification, la barre latérale affiche une notice, une solution et un bouton ouvrant une issue GitHub préremplie.
- Séparation des données des versions installées dans un dossier `Bottega` dédié, pour qu’elles ne reconstruisent plus l’état local des builds de développement et réciproquement.
- Récupération des ledgers durables illisibles : conservation sous un nouveau nom en quarantaine, reconstruction à vide et poursuite du démarrage.
- Mise à jour des presets des Apps first-party intégrées vers leurs commits publiés.

## 2026-09-02 — v0.1.0

- Publication des premiers installeurs. Bottega est désormais disponible depuis GitHub Releases sous forme de DMG et ZIP macOS arm64, d’installeur NSIS Windows x64 et d’AppImage Linux x64, tous construits depuis le commit de ce tag. Ces builds ne sont pas signés ; le guide de démarrage documente l’étape unique que chaque plateforme demande au premier lancement.
- Reconstruction du magasin de Chat sur SQLite comme unique source de vérité. Conversations, turns, pièces jointes et facts vivent maintenant dans une seule base locale durable au lieu de fichiers par Chat : un Chat survit aux plantages, reprend sans réanalyse et cesse de ralentir à mesure qu’il s’allonge.
- Ouverture des longues conversations à coût constant. La timeline, le plan du Chat et la recherche dans le Chat sont paginés : ouvrir un Chat de dizaines de milliers de turns coûte autant qu’un Chat court, et remonter ne recharge jamais toute la transcription.
- Ajout d’une recherche plein texte fondée sur les grammes. La recherche traite désormais le chinois, le japonais et le coréen aussi fidèlement que les langues séparées par des espaces, et renvoie des résultats du magasin que lit la transcription.
- Unification de l’historique importé dans une seule timeline. Les sessions reprises des CLI locales Codex, Claude Code, Kimi Code et OpenCode s’affichent dans la même transcription que les Chats créés dans Bottega, avec le même plan, la même recherche et la même navigation, au lieu d’une vue séparée en lecture seule.
- Restriction des écritures de facts. Un turn ne met à jour que les facts qu’il possède réellement, si bien que turns concurrents, livraison de Memory et écritures Base ne s’écrasent plus mutuellement.
- Clôture des constats de la revue de fusion. App Use ne navigue qu’après un accusé completed, donc une App rejetée ou en cours de récupération ne déplace jamais la fenêtre ; la révocation de l’accès Base d’une App devient une étape atomique, si bien qu’accès et cycle de vie ne peuvent plus diverger ; l’épinglage des Apps et des Projects, l’apparence des Projects et la navigation des Settings ont été réorganisés pour que la barre latérale reflète toujours ce qui est réellement ouvert.

## 2026-08-29 — Outils par Project, Extensions et aperçu du code de Design Canvas

- Publication des sources de production du bureau dans un historique public propre, sans tests internes ni automatisation de développement.
- Ajout de surcharges par Project exact pour les outils intégrés et les serveurs MCP manuels. Chaque turn fige son plan d’outils effectif, ses scope revisions, le support runtime et sa configuration MCP scellée avant tout effet de bord.
- Unification de la propriété des Extensions sous `global | exact Project` pour la gestion, les Skills, les App requirements, les sessions, les retained data et la récupération après suppression. Les anciens registres et ledgers explicitement vides migrent ; tout état portant une autorité live ou ambiguë reste fail closed.
- Ajout de Bottega Design Canvas avec artboards HTML autonomes, comparaison des directions et de l’historique, ancres visuelles numérotées, aperçu sandboxé et render check côté Agent.
- Avancement des quatre gitlinks des Apps first-party vers des commits publiquement accessibles. Il s’agit d’un aperçu du code source, pas de la release installer officielle `v0.1.0`, toujours soumise aux gates de publication.

## 2026-08-25 — Publication du code source

- Publication de Bottega sous licence MIT avec un nouvel historique Git réservé au contenu public.
- Mise en place d’une frontière stricte de repository : le code desktop de production et la documentation des jalons sont publics ; tests, données de test, application web, évaluations internes, TODO, notes de développement, journaux hebdomadaires et automatisation restent dans le repository de développement.
- Organisation de la documentation publique sous docs/, avec des sections de second niveau pour le démarrage, les fonctionnalités et le changelog, tandis que le README racine reste l’entrée GitHub.
- Adoption de **Bottega** comme identité du produit, du package, de la fenêtre, du build, du client ACP et des documents exportés.

## 2026-08-18 au 2026-08-23 — Collaboration durable

- Extension des références du workspace des Chats aux fichiers et aux Sections.
- Ajout du transfert durable d’images entre Sections et promotion des résultats de Subagent en Sections réutilisables et idle.
- Unification de la gestion locale des Skills pour Codex, Claude Code, Kimi Code et OpenCode.
- Ajout d’une fédération d’historique consultable en lecture seule et de la reprise des sessions Agent locales.

## 2026-08-08 au 2026-08-23 — Memory avec consentement explicite

- Ajout des providers locaux gérés OpenViking et EverOS.
- Introduction des scopes de partage Chat, groupe de Projects et personnel, avec consentement explicite et état de livraison observable.
- Ajout de la reconstruction, de la source, de la progression du téléchargement de modèles et d’un changement de version fiable.

## 2026-08-04 au 2026-08-21 — Apps, outils et navigateur

- Ajout d’un navigateur intégré multi-onglets contrôlé par CDP in-process.
- Extension de la plateforme d’outils intégrés aux Sections, à la recherche, aux Bases, aux fichiers, aux Apps et aux actions navigateur.
- Unification des Apps static, server et Base-backed avec des permissions liées à la génération et un GUI SDK contraint.

## 2026-07-28 au 2026-08-23 — Base

- Introduction de données structurées pour les Chats et Projects avec les vues Table, List, Kanban, Map, Chart et Gallery.
- Ajout des formules, relations, pièces jointes, historique des lignes, imports/exports et mutations d’App limitées par capability.

## 2026-07-16 au 2026-08-09 — Fondations desktop et multi-agent

- Passage d’un prototype web à un workspace desktop Electron.
- Connexion de Codex, Claude Code, Kimi Code et OpenCode via leurs CLI locales et ACP, tout en conservant la propriété des credentials par les CLI.
- Ajout des turns en streaming, approvals, Plan mode, message steering, Subagents, workspaces de Project, sémantique d’archive et frontières de fichiers au niveau de l’OS.
