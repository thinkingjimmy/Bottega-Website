# Journal des modifications

Ce fichier consigne les jalons du produit, pas les itérations internes d’implémentation.

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

- Publication du code de production actuel comme commit enfant normal de l’historique public propre, tandis que les tests, l’automatisation de développement et les preuves internes restent dans Bottega-Dev.
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
