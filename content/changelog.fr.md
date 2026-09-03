# Journal des modifications

Ce fichier consigne les jalons du produit, pas les itérations internes d’implémentation.

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
