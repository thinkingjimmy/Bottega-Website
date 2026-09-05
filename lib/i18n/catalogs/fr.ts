/**
 * [INPUT]: Uses the English baseline and CatalogShape parity type
 * [OUTPUT]: Exports the complete French website catalog
 * [POS]: French translation of every visitor-visible website string
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { CatalogShape } from "../catalog-shape.ts";
import type { en } from "./en.ts";

export const fr = {
  meta: {
    siteTitle: "Bottega — l’atelier qui se construit lui-même",
    siteDescription: "Un seul atelier pour Codex, Claude Code, Kimi Code et OpenCode — local d’abord, avec les abonnements que vous payez déjà.",
  },
  language: { label: "Langue", selected: "Sélectionné" },
  nav: { features: "Fonctions", changelog: "Nouveautés", download: "Télécharger", downloadMac: "Télécharger pour macOS" },
  footer: {
    navigation: "Navigation du pied de page",
    links: { changelog: "Nouveautés", docs: "Documentation", github: "GitHub", issues: "Issues", download: "Télécharger" },
  },
  common: { readMore: "En savoir plus", replay: "Rejouer" },
  home: {
    hero: {
      menu: ["Fichier", "Édition", "Présentation", "Chat", "Fenêtre", "Aide"],
      date: "Mar. 1 sept.  9:36",
      chatChip: "Utilisez-le comme Codex",
      appChip: "Les Apps créées par votre Agent",
    },
    agents: {
      title: "Vos Agents, une seule barre latérale.",
      paragraphs: [
        "Codex, Claude, Kimi et OpenCode s’exécutent tous dans Bottega — directement via les CLI officielles que vous avez déjà installées, sans service d’Agent supplémentaire.",
        "Et chaque Agent utilise votre propre abonnement, sans frais supplémentaires.",
      ],
    },
    apps: {
      title: "Créez des Apps natives pour l’IA.",
      body: "Créez un coach sportif IA, un suivi de dépenses IA ou quelque chose d’entièrement nouveau. Décrivez l’idée : Bottega la transforme en App fonctionnelle, des données jusqu’à l’interface. Voici quatre Apps créées avec Bottega :",
    },
    customizable: {
      title: "Personnalisez chaque App par la conversation.",
      body: "Chaque App Bottega possède un code source modifiable. Cliquez sur Edit App et décrivez ce que vous souhaitez changer : votre Agent modifie directement le code pour mettre à jour les fonctionnalités, les données et l’interface, sans ouvrir d’éditeur de code séparé.",
    },
    base: {
      title: "Chaque Chat, un espace de données.",
      body: "Les informations de chaque conversation sont enregistrées dans Base. Laissez votre Agent les organiser, les synthétiser et les analyser directement, puis consultez les mêmes données sous forme de tableau, de graphique, de galerie ou de carte, sans rien exporter.",
    },
    fork: {
      title: "Publiez votre propre version.",
      body: "Bottega est distribué sous licence MIT. Vous êtes libre de forker le dépôt, de modifier le code et de partager votre propre version avec d’autres.",
      download: "Télécharger pour macOS",
      source: "Voir le code source",
      terminalLabel: "Commandes du terminal pour compiler Bottega",
    },
  },
  changelog: {
    metaTitle: "Nouveautés",
    metaDescription: "Les jalons produit de Bottega — le moment où chaque fonction a atteint sa première forme cohérente.",
    eyebrow: "Nouveautés",
    title: "Ce qui a réellement été livré.",
    introduction: "Des jalons produit, pas les itérations internes. Chaque date indique quand une fonction a pris pour la première fois une forme cohérente et utilisable.",
  },
  features: {
    sidebarLabel: "Fonctions",
    sidebarNavigation: "Documentation des fonctions",
    breadcrumb: "Fonctions",
    agents: {
      label: "Agents",
      menuCopy: "Codex, Claude, Kimi et OpenCode",
      title: "Changez d’Agent, gardez le même espace de travail.",
      deck: "Exécutez Codex, Claude Code, Kimi Code et OpenCode dans le même espace de travail local, avec leurs CLI officielles et vos abonnements existants, sans frais supplémentaires.",
    },
    apps: {
      label: "Apps",
      menuCopy: "Des interfaces conçues autour de votre tâche",
      title: "Transformez le travail de l’Agent en interface durable.",
      deck: "Une App donne à un workflow sa propre interface, ses données et ses autorisations, pour que le résultat utile ne reste pas prisonnier d’une transcription.",
      imageAlt: "Bibliothèque Apps de Bottega montrant Bottega Design Canvas installé et marqué Ready",
      imageCaption: "Capture de Bottega : une App installée possède une place durable dans la bibliothèque et un état de préparation explicite.",
      sections: [
        {
          heading: "Une App est une surface produit durable",
          paragraphs: [
            "Bottega installe des Apps statiques, adossées à un serveur ou à une Base depuis des révisions Git immuables. Une App peut fournir une GUI dédiée, des données structurées ou les deux, tandis que les Chats restent le point de contrôle pour demander du travail à un Agent.",
            "Les exemples officiels répondent à des tâches distinctes plutôt qu’à un tableau de bord générique : Design Canvas, Development Kanban, Expense Tracker et Fitness Log. Leurs interfaces diffèrent parce que chaque App épouse sa tâche.",
          ],
          points: [],
        },
        {
          heading: "L’interface et les données restent reliées",
          paragraphs: ["Une App adossée à une Base peut placer sa GUI à côté des lignes qui l’alimentent. L’utilisateur voit une surface adaptée ; l’Agent dispose d’outils explicites pour lire ou modifier les enregistrements sous-jacents."],
          points: [
            "Design Canvas affiche des propositions HTML autonomes et peut renvoyer au Chat des repères visuels numérotés.",
            "Development Kanban conserve tâches d’implémentation et constats de revue sous forme structurée.",
            "Expense Tracker normalise les dépenses en langage naturel dans un registre et des vues d’analyse.",
            "Fitness Log enregistre les séries et les projette dans une carte thermique musculaire.",
          ],
        },
        {
          heading: "L’installation possède une vraie frontière de confiance",
          paragraphs: [
            "Les autorisations d’une App sont déclarées et confirmées avant utilisation. L’accès aux données est accordé capacité par capacité — lecture, insertion, modification, suppression ou pièces jointes — pour une génération précise. Une GUI n’hérite jamais silencieusement d’un accès illimité aux fichiers ou données locaux.",
            "Les Apps réutilisables peuvent être partagées sans copier d’identifiants locaux ni d’état privé dans le paquet.",
          ],
          points: [],
        },
      ],
    },
    customizable: {
      label: "Personnalisable",
      menuCopy: "Modifiez une App dans son propre Chat source",
      title: "Modifiez l’App en parlant à sa source.",
      deck: "Pour les Apps dont la source est modifiable, Bottega ouvre un Chat Agent normal dans le Project source de l’App, au lieu de vous envoyer dans un éditeur séparé.",
      imageAlt: "Écran de détail de Bottega Design Canvas avec onglets App et Data, réglages, Chat et menu d’actions",
      imageCaption: "Capture de Bottega : la page d’une App réunit sa surface, ses données, son Chat d’utilisation, ses réglages et ses actions source.",
      sections: [
        {
          heading: "Modifier est une action produit de premier rang",
          paragraphs: [
            "Quand une App possède une source modifiable, sa page affiche Edit App dans les actions supplémentaires. Cette action reprend le Project d’édition de l’App et ouvre un Chat Agent standard lié à la source.",
            "Vous décrivez le changement avec le même modèle d’interaction que partout dans Bottega. L’Agent choisi peut examiner, modifier et reconstruire l’App dans les limites normales de l’espace de travail.",
          ],
          points: [],
        },
        {
          heading: "Utiliser et modifier sont deux contextes distincts",
          paragraphs: ["Le Chat d’utilisation sert à travailler avec l’App installée et ses enregistrements. Le Chat d’édition sert à changer l’App elle-même. Cette séparation empêche une demande d’utilisation ordinaire de devenir discrètement une modification du code source."],
          points: ["Le Chat d’utilisation reste lié à l’expérience de l’App installée.", "Edit App active le Project source dédié à l’App.", "L’autorisation des données reste limitée à la génération installée et n’est pas héritée de l’éditeur."],
        },
        {
          heading: "La source n’est pas une boîte noire",
          paragraphs: [
            "La même page peut aussi exposer le workbench, l’historique des versions, le chemin d’import et le partage GitHub quand ces actions s’appliquent. Le cycle de vie de la source reste visible au lieu d’être caché derrière une régénération opaque.",
            "Toutes les Apps tierces ne sont pas supposées modifiables. Bottega n’affiche l’action que lorsqu’une preuve source durable indique qu’elle est disponible.",
          ],
          points: [],
        },
      ],
    },
    base: {
      label: "Base",
      menuCopy: "Organisez et explorez vos données avec votre Agent",
      title: "Transformez vos conversations en données utiles.",
      deck: "Base est un espace de données local pour vous et votre Agent. Organisez et mettez à jour vos données dans le Chat, puis explorez-les sous six vues.",
      imageAlt: "Onglet Data de Bottega Design Canvas affichant une table Base vide et les commandes de filtre, de colonnes, de regroupement et d’ajout de lignes",
      imageCaption: "L’onglet Data de Bottega Design Canvas. Les Apps qui utilisent Base donnent accès à leurs données aux côtés de leur interface dédiée.",
      sections: [
        {
          heading: "Commencez par ce que vous voulez suivre",
          paragraphs: [
            "Suivez vos dépenses, organisez un inventaire ou créez une liste de tâches. Décrivez votre besoin à votre Agent : il peut créer les champs et les entrées dans Base, puis les compléter ou les modifier à votre demande.",
            "Poursuivez avec des questions comme « Quelles tâches restent à faire ? » ou « Combien ai-je dépensé ce mois-ci ? ». Votre Agent peut consulter et synthétiser directement les données, visibles juste à côté de la conversation.",
          ],
          points: [],
        },
        {
          heading: "Six vues, les mêmes données",
          paragraphs: ["Un tableau ou une liste pour les détails, un kanban pour l’avancement, un graphique pour les tendances, une galerie pour les médias ou une carte pour les lieux. Chaque vue reste reliée aux mêmes données."],
          points: ["Filtrez, triez et regroupez les données pour trouver l’essentiel.", "Calculez des valeurs avec des formules et reliez les entrées entre elles.", "Ajoutez des médias en pièces jointes et consultez l’historique de chaque entrée.", "Importez et exportez des fichiers CSV, JSON et XLSX."],
        },
        {
          heading: "Des données qui suivent votre travail",
          paragraphs: [
            "Gardez une Base propre à un Chat, ou utilisez une Base commune aux Chats d’un même Project. Vous retrouvez vos données à mesure que le travail avance.",
            "Les Apps peuvent proposer une interface dédiée autour d’une Base. Utilisez l’App pour votre tâche, puis ouvrez son onglet Data pour consulter et manipuler les données sous-jacentes.",
            "Base enregistre vos données localement. Les Apps reçoivent des autorisations distinctes pour lire, ajouter, modifier ou supprimer des entrées et gérer les pièces jointes. Chaque mise à jour vérifie les changements récents pour éviter qu’une ancienne modification ne les écrase.",
          ],
          points: [],
        },
      ],
    },
    agentsArticle: {
      stories: [
        {
          index: "01 · Multi-Agent",
          title: "Les CLI officielles. Un seul endroit pour travailler.",
          paragraphs: [
            "Bottega exécute Codex, Claude Code, Kimi Code et OpenCode via leurs CLI locales officielles. Il ne remplace pas leur environnement par une couche Agent générique.",
            "Authentification, abonnement et quotas restent chez le fournisseur. Les commandes de modèle et de reasoning effort proviennent du catalogue actif de chaque CLI, donc une option n’apparaît que si le backend peut réellement l’accepter.",
            "Une conversation reste liée à l’Agent qui l’a commencée. Ouvrez-en une autre pour changer d’Agent ; les deux peuvent vivre dans le même Project.",
          ],
        },
        {
          index: "02 · Parité des conversations",
          title: "Une interaction unifiée, pas un Agent unique.",
          paragraphs: [
            "Chaque Agent Harness possède son propre modèle d’exécution. Pour unifier l’expérience, Bottega fournit une même couche d’interaction et adapte à chaque backend les réponses en continu, l’état des outils, le mode Plan, les messages en file d’attente et d’autres fonctions.",
            "Voici la couverture actuelle des fonctions, toujours en cours d’évolution :",
          ],
        },
        {
          index: "03 · Collaboration entre Agents",
          title: "Au-delà d’une expérience unifiée, les Agents se relaient.",
          paragraphs: [
            "Laissez Claude cadrer le problème et préparer un Plan, puis transmettre à Codex le contexte nécessaire à l’implémentation. Une fois le travail terminé, le résultat revient automatiquement dans le Chat d’origine pour être révisé, modifié ou transmis à l’Agent suivant.",
            "Chaque Chat conserve son propre Agent, son espace de travail et l’historique de la tâche. Les messages peuvent être exécutés immédiatement ou placés en file d’attente ; le processus reste visible et les résultats traçables et réutilisables.",
          ],
        },
      ],
    },
  },
  demo: {
    chrome: {
      newChat: "Nouveau Chat", apps: "Apps", projects: "Projects", chats: "Chats", settings: "Réglages", showMore: "Afficher plus",
      ledger: "Registre", analysis: "Analyse", byMonth: "Par mois", date: "Date", amount: "Montant", category: "Catégorie", note: "Note", sum: "Somme", records: "{count} entrées",
      askAnything: "Demandez ce que vous voulez", approveForMe: "Approuver pour moi", currentAgent: "Agent actuel : {name}", currentModel: "Modèle actuel : {name}",
      recommended: "Recommandé", anotherApproach: "Aucune de ces réponses ; indiquez une autre approche à l’Agent", workedFor: "A travaillé {duration}", plan: "Plan",
      planCopied: "Plan copié", copyPlan: "Copier le Plan", closePlan: "Fermer le panneau Plan", openPlan: "Ouvrir le panneau Plan",
    },
    model: {
      advanced: "Avancé", disableFast: "Désactiver Fast", enableFast: "Activer Fast", model: "Modèle", effort: "Effort", unavailable: "Indisponible", quickTier: "Niveau rapide du modèle",
      efforts: { low: "Léger", medium: "Moyen", high: "Élevé", xhigh: "Très élevé", max: "Max" },
    },
    apps: {
      items: [
        { name: "Canvas de conception", description: "Transformez vos idées en canvas visuel modifiable" },
        { name: "Kanban de développement", description: "Planifiez tâches, avancement et points à traiter" },
        { name: "Suivi des dépenses", description: "Suivez vos dépenses par catégorie et dans le temps" },
        { name: "Journal d’entraînement", description: "Suivez vos séances et les muscles sollicités" },
      ],
    },
    baseViews: [
      { name: "Vue tableau", tab: "Tableau", blurb: "Colonnes typées, tris, filtres et somme sur chacune" },
      { name: "Vue graphique", tab: "Graphique", blurb: "Répartition par catégorie et dépenses par jour" },
      { name: "Vue galerie", tab: "Galerie", blurb: "La colonne des pièces jointes en miniatures" },
      { name: "Vue carte", tab: "Carte", blurb: "La colonne de position sous forme de repères" },
    ],
    ledger: {
      categories: ["Transport", "Équipement", "Courses", "Santé", "Restaurant"],
      notes: ["Didi, trajet aéroport", "Apple Store", "Hema Fresh", "Salle de sport, trimestre", "Ramen Ikkousha", "Train à grande vitesse", "Marché du quartier", "Déjeuner d’équipe", "Express aéroport", "Courses du week-end", "Bras d’écran", "Deux cafés", "Pharmacie", "Recharge métro", "Clavier mécanique", "Hema Fresh", "Nouilles tardives", "Dentiste"],
      categoryShare: "Répartition par catégorie", dailySpend: "Dépenses quotidiennes", location: "Position", where: "Lieu", label: "Libellé",
    },
    kanban: {
      tabs: ["Tâches", "Constats", "Tout"], lanes: ["En cours", "Revue", "Terminé"], task: "Tâche", source: "Source", doc: "Document",
      titles: ["Déplacer le panneau de réglages sous Agents", "Couvrir l’import CLI avec des tests d’intégration", "Auditer la mise à jour automatique", "Expliquer la négociation ACP dans la documentation", "Renommer /settings/backends sans casser les favoris", "Réduire l’onboarding à 42 mots", "Définir le protocole d’installation", "Séparer l’identité publiée de la source", "Livrer les notes de version 0.2.0"],
    },
    canvas: {
      live: "Actuel", focus: "Focus", directions: "Directions", compare: "Comparer", browse: "Parcourir", element: "Élément", region: "Région",
      desktop: "Bureau", tablet: "Tablette", mobile: "Mobile", fit: "Ajuster", anchors: "Repères", selectedCount: "{count} sélectionnés", stale: "obsolète", clear: "Effacer", addToChat: "Ajouter au Chat",
    },
    fitness: {
      trainingRecord: "Fitness Log · Journal d’entraînement", title: "La couverture, pas le coaching", subtitle: "Compte uniquement les séries terminées. Enregistrez et corrigez via le Chat d’utilisation ou la table de données.",
      revision: "Révision", createPlan: "Créer un plan d’entraînement", coverage: "Couverture", heatmap: "Carte thermique musculaire", body: "Corps", male: "Homme", timeRange: "Période", last30Days: "30 derniers jours",
      front: "Face", back: "Dos", intensity: "Intensité de couverture", offlineCatalog: "Catalogue hors ligne · 1324 exercices", exerciseCatalog: "Catalogue d’exercices", clearFilters: "Effacer les filtres",
      search: "Rechercher", searchHint: "Nom, alias, muscle ou équipement", bodyPart: "Partie du corps", muscleRegion: "Région musculaire", equipment: "Équipement", all: "Tout", exercises: "1324 exercices", showing: "Affichage 1–24", groups: ["Pectoraux", "Haut des jambes", "Dos"],
    },
    appMenu: { items: ["Modifier l’App", "Workbench de l’App", "À propos de cette App", "Importer", "Historique des versions", "Partager sur GitHub"], ask: "Ajoute un troisième volet à la vue de comparaison.", source: "Source de l’App" },
    chats: {
      releaseNotes: {
        title: "Publier les notes de version", ask: "Rédige les notes de version 0.2.0 à partir des PR fusionnées depuis 0.1.9.", trace: ["Lecture de 18 commits dans 4 paquets", "Modification de CHANGELOG.md"], reply: "Le Plan est ci-dessus. Dites go et je l’écris ; indiquez le groupe à changer et je le réorganise d’abord.",
        plan: { title: "Notes de version 0.2.0", sections: [
          { heading: "Résumé", items: ["Six changements majeurs depuis `0.1.9`, regroupés selon ce que l’utilisateur remarque d’abord.", "La parité des Agents ouvre la marche : `Kimi` et `OpenCode` atteignent désormais la même échelle d’autorisations que `Codex`.", "Deux refactorings internes tiennent sur une ligne ; personne hors du dépôt ne les a ressentis."] },
          { heading: "Séquence", items: ["Regrouper les 18 PR par surface touchée, pas par paquet de destination.", "Décrire ce qui change ; le numéro de PR est une provenance, pas l’actualité.", "Répliquer dans `docs/`, puis relire les deux fichiers pour garantir leur accord."] },
          { heading: "Fichiers", items: ["`CHANGELOG.md` — six entrées, plus récentes d’abord, dates absolues.", "`docs/changelog/README.md` — miroir public, mêmes six entrées."] },
          { heading: "Hors de cette passe", items: ["Le rattrapage `0.1.x` — la profondeur historique est une décision séparée.", "Le tag de Release et la page de téléchargement lisent ce fichier, ils ne l’écrivent pas."] },
        ] }, status: "Réponse en cours",
      },
      settingsPanel: { title: "Déplacer le panneau de réglages", ask: "Place les réglages backend sous Agents sans casser les liens profonds.", trace: ["Lecture de 9 fichiers dans components/settings", "12 appels trouvés"], reply: "Trois méthodes, qui ne diffèrent que par le sort des liens déjà enregistrés.", bullets: ["Les 12 appels sont mécaniques dans tous les cas.", "Les deux liens profonds et l’entrée de command palette ne le sont pas.", "La vraie question est donc la promesse faite aux anciens liens."], question: { eyebrow: "Main Agent · Stratégie de routes", text: "Les anciennes routes sont dans des favoris. Comment les déplacer ?", options: [{ label: "Garder des redirections", description: "Les anciens chemins rejoignent les nouveaux ; favoris et palette continuent d’arriver." }, { label: "Renommer sans transition", description: "Arbre plus propre, mais tous les liens enregistrés cessent de fonctionner." }, { label: "Livrer les deux une version", description: "Deux routes maintenant, suppression des anciennes en 0.3.0." }] } },
      changelog: { title: "Rédiger les nouveautés", ask: "Résume les fusions de la semaine pour la page des nouveautés.", trace: ["Lecture de 24 messages de commit", "Modification de docs/changelog/README.md"], reply: "Six entrées. La semaine forme un récit, pas une liste de fusions.", bullets: ["Six entrées, plus récentes d’abord, une ligne chacune.", "Les deux refactorings internes sont réunis : personne hors du dépôt ne les a ressentis.", "Dates absolues, jamais relatives : ces notes seront lues des mois plus tard."], status: "Modification de docs/changelog/README.md" },
      importTests: { title: "Couvrir l’import CLI", ask: "Ajoute des tests d’intégration pour l’import des sessions CLI existantes.", trace: ["Lecture du module d’import", "Exécution de 48 tests"], reply: "Tout est vert, et un chemin auparavant non testé est maintenant couvert.", bullets: ["48 tests passent, dont les quatre nouveaux.", "Un fichier de session incorrect fait échouer l’import, pas l’App.", "Les fixtures vivent près du module pour être immédiatement trouvées."], status: "Exécution de 48 tests" },
      onboarding: { title: "Raccourcir l’onboarding", ask: "Le premier écran ressemble à un manuel. Garde seulement ce qui précède le premier Chat.", trace: ["Lecture de 4 écrans d’onboarding", "Modification d’onboarding.ts dans 5 langues"], reply: "Tout ce que j’ai retiré était déjà exprimé par l’interface.", bullets: ["De 140 mots à 42.", "L’explication des autorisations se trouve maintenant là où elles sont choisies.", "Les cinq langues ont été réécrites, sans traduction automatique depuis l’anglais."], status: "Réflexion" },
      updatePath: { title: "Auditer le parcours de mise à jour", ask: "Suis la mise à jour automatique et trouve où un téléchargement partiel peut bloquer quelqu’un.", trace: ["Traçage de 3 états de mise à jour", "Exécution de la suite updater"], reply: "Une vraie faille, précisément celle rencontrée avec une connexion instable.", bullets: ["Une installation interrompue laisse le bouton sur Installation indéfiniment.", "Tout le reste récupère au redémarrage ; le téléchargement reprend depuis son ledger.", "Correction proposée : traiter l’absence du processus installer comme un échec, pas une attente."], status: "Lecture de electron/main/updater.ts" },
      settingsRoutes: { title: "Renommer les routes de réglages", ask: "Renomme /settings/backends en /settings/agents sans casser les favoris.", trace: ["12 appels trouvés", "12 fichiers modifiés"], reply: "Tout est renommé et aucun favori ne s’en aperçoit.", bullets: ["12 appels renommés sans recherche-remplacement.", "L’ancienne route redirige, favoris et palette arrivent toujours.", "Tests de routes au vert."], status: "Réponse en cours" },
      iconGrid: { title: "Comparer les deux grilles d’icônes", ask: "Les icônes de la barre semblent décalées d’un pixel par rapport au Composer. Quelle grille est fausse ?", trace: ["Mesure de 14 emplacements", "Lecture de sidebar-row.tsx"], reply: "Aucune. Le décalage apparent est un pixel d’air volontaire.", bullets: ["Aucune grille n’est fausse : les deux emplacements font 16px.", "La barre place une marque de 14px ; l’icône du Composer remplit l’emplacement.", "Vous voyez l’emplacement, pas l’icône."], status: "Réflexion" },
      acp: { title: "Expliquer la négociation ACP", ask: "Décris ce qui se passe entre le lancement d’une CLI et l’arrivée du premier token.", trace: ["Lecture du module de session ACP", "Traçage de 6 messages"], reply: "Trois allers-retours avant le premier token. Tout le reste suit un seul flux.", bullets: ["initialize — le client annonce ce qu’il sait afficher.", "session/new — la CLI ouvre une session dans votre répertoire.", "session/prompt — la suite est diffusée sur le même canal."], status: "Réponse en cours" },
    },
    agentsVisual: {
      pickerLabel: "Fenêtre produit du Hero Bottega avec le sélecteur d’Agent ouvert dans le Composer", matrixLabel: "Matrice des capacités de Codex, Claude, Kimi et OpenCode", capability: "Capacité",
      rows: [
        { label: "Réponses en continu", values: ["✅", "✅", "✅", "✅"] },
        { label: "Sélection Model / Thinking", values: ["✅", "✅", "✅", "✅"] },
        { label: "État des outils", values: ["✅", "✅", "✅", "✅"] },
        { label: "Mode Plan", values: ["✅", "✅", "✅", "✅"] },
        { label: "Mode file d’attente", values: ["✅", "✅", "✅", "✅"] },
        { label: "Approbations utilisateur", values: ["✅", "✅", "✅", "✅"] },
        { label: "Fonction @", values: ["✅", "✅", "✅", "✅"] },
        { label: "Browser Use", values: ["✅", "✅", "✅", "✅"] },
        { label: "Fork", values: ["✅", "✅", "✅", "✅"] },
        { label: "Modifier le message précédent", values: ["✅", "✅", "✅", "✅"] },
      ],
      collaborationLabel: "Claude rédige le Plan, Codex l'implémente, et le résultat revient dans le Chat d'origine pour la revue de Claude",
      chatPlan: "Unifier la barre de nav", chatImpl: "Implémentation nav", planLabel: "Plan", planTitle: "Plan d'implémentation de la navigation",
      relayFrom: "[Depuis la Section @{name} (source_section_id={id})]",
      queueItem: "@{name} · vérifier aussi les points de rupture mobiles",
      reviewLine: "L'intention du Plan et l'implémentation correspondent ; aucun problème bloquant.",
      notePlan: "D'abord, Claude transforme\nle problème en Plan",
      noteSend: "Déposer le travail dans\nla file d'un autre Chat",
      noteBack: "Une fois terminé, le résultat revient tout seul",
      noteReview: "De retour dans le Chat d'origine — réviser,\nou passer à l'Agent suivant",
      handoffCaption: "Trois images d'une même machine. Hors squelette, tout est le texte du produit — le titre du Plan, l'en-tête du message entrant, le verdict de la revue ; les deux transmissions appellent send_to_section et expect_reply.",
    },
  },
} satisfies CatalogShape<typeof en>;
