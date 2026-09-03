/**
 * [INPUT]: Uses the English baseline and CatalogShape parity type
 * [OUTPUT]: Exports the complete Spanish website catalog
 * [POS]: Spanish translation of every visitor-visible website string
 * [PROTOCOL]: Update this header when changing this file, then verify README.md
 */

import type { CatalogShape } from "../catalog-shape.ts";
import type { en } from "./en.ts";

export const es = {
  meta: {
    siteTitle: "Bottega — el taller que se construye a sí mismo",
    siteDescription: "Un solo taller para Codex, Claude Code, Kimi Code y OpenCode — local primero y con las suscripciones que ya pagas.",
  },
  language: { label: "Idioma", autoDetect: "Detección automática", selected: "Seleccionado" },
  nav: { features: "Funciones", changelog: "Novedades", download: "Descargar", downloadMac: "Descargar para macOS" },
  footer: {
    navigation: "Navegación del pie de página",
    links: { changelog: "Novedades", docs: "Documentación", github: "GitHub", issues: "Issues", download: "Descargar" },
  },
  common: { readMore: "Más información", replay: "Repetir" },
  home: {
    hero: {
      menu: ["Archivo", "Edición", "Visualización", "Chat", "Ventana", "Ayuda"],
      date: "Mar 1 sep  9:36",
      chatChip: "Úsalo como Codex",
      appChip: "Apps creadas por tu Agent",
    },
    agents: {
      title: "Tus Agents, en una sola barra lateral.",
      paragraphs: [
        "Codex, Claude, Kimi y OpenCode se ejecutan en Bottega mediante las CLI oficiales que ya tienes instaladas, sin necesidad de instalar servicios de Agent adicionales.",
        "Además, cada Agent utiliza tu propia suscripción, sin costes adicionales.",
      ],
    },
    apps: {
      title: "Crea Apps nativas para la IA.",
      body: "Crea un entrenador personal con IA, un registro de gastos o algo completamente nuevo. Describe la idea y Bottega la convierte en una App funcional, desde los datos hasta la interfaz. Estas son cuatro Apps creadas con Bottega:",
    },
    customizable: {
      title: "Personaliza cualquier App conversando.",
      body: "Cada App de Bottega tiene código fuente editable. Haz clic en Edit App y describe lo que quieres cambiar: tu Agent modifica directamente el código para actualizar funciones, datos e interfaz, sin abrir otro editor de código.",
    },
    base: {
      title: "Cada Chat, un espacio de datos.",
      body: "La información de cada conversación se guarda en Base. Deja que tu Agent la organice, resuma y analice directamente; después, consulta los mismos datos como tabla, gráfico, galería o mapa, sin exportarlos.",
    },
    fork: {
      title: "Publica tu propia versión.",
      body: "Bottega se distribuye bajo la licencia MIT. Puedes crear un fork del repositorio, modificar el código y compartir tu propia versión con otras personas.",
      download: "Descargar para macOS",
      source: "Ver el código fuente",
      terminalLabel: "Comandos de terminal para compilar Bottega",
    },
  },
  changelog: {
    metaTitle: "Novedades",
    metaDescription: "Hitos de producto de Bottega: cuándo alcanzó cada función su primera forma coherente.",
    eyebrow: "Novedades",
    title: "Lo que realmente se publicó.",
    introduction: "Hitos de producto, no iteraciones internas. Cada fecha indica cuándo una función alcanzó por primera vez una forma coherente y utilizable.",
  },
  features: {
    sidebarLabel: "Funciones",
    sidebarNavigation: "Documentación de funciones",
    breadcrumb: "Funciones",
    agents: {
      label: "Agents",
      menuCopy: "Codex, Claude, Kimi y OpenCode",
      title: "Cambia de Agent, no de espacio de trabajo.",
      deck: "Ejecuta Codex, Claude Code, Kimi Code y OpenCode en el mismo espacio de trabajo local, usando sus CLI oficiales y tus suscripciones actuales, sin costes adicionales.",
    },
    apps: {
      label: "Apps",
      menuCopy: "Interfaces funcionales creadas alrededor de tu tarea",
      title: "Convierte el trabajo del Agent en una interfaz duradera.",
      deck: "Una App aporta a cada flujo su propia interfaz, datos y permisos para que el resultado útil no quede atrapado en una transcripción.",
      imageAlt: "Biblioteca de Apps de Bottega con Bottega Design Canvas instalado y marcado como Ready",
      imageCaption: "Captura de Bottega: una App instalada tiene un lugar duradero en la biblioteca y un estado de disponibilidad explícito.",
      sections: [
        {
          heading: "Una App es una superficie de producto duradera",
          paragraphs: [
            "Bottega instala Apps estáticas, respaldadas por servidor o por Base desde revisiones Git inmutables. Una App puede ofrecer una GUI dedicada, datos estructurados o ambos, mientras los Chats siguen siendo el punto de control para pedir trabajo a un Agent.",
            "Los ejemplos oficiales resuelven trabajos distintos en lugar de compartir un panel genérico: Design Canvas, Development Kanban, Expense Tracker y Fitness Log. Sus interfaces son diferentes porque cada App toma la forma de su tarea.",
          ],
          points: [],
        },
        {
          heading: "Interfaz y datos siguen conectados",
          paragraphs: ["Una App respaldada por Base puede colocar su GUI junto a las filas que la alimentan. La persona ve una superficie especializada; el Agent ve herramientas explícitas para leer o cambiar los registros subyacentes."],
          points: [
            "Design Canvas muestra propuestas HTML autocontenidas y puede devolver al Chat anclas visuales numeradas.",
            "Development Kanban conserva tareas de implementación y hallazgos de revisión como registros estructurados.",
            "Expense Tracker normaliza gastos en lenguaje natural en un libro y vistas de análisis.",
            "Fitness Log registra series y las proyecta en un mapa de calor muscular.",
          ],
        },
        {
          heading: "La instalación tiene un límite real de confianza",
          paragraphs: [
            "Los permisos de una App se declaran y confirman antes del uso. El acceso se concede por capacidad — lectura, inserción, modificación, eliminación o adjuntos — para una generación concreta. Una GUI no hereda en silencio acceso ilimitado a archivos o datos locales.",
            "Las Apps reutilizables se pueden compartir sin copiar credenciales locales ni estado privado del espacio en el paquete.",
          ],
          points: [],
        },
      ],
    },
    customizable: {
      label: "Personalizable",
      menuCopy: "Edita una App desde su propio Chat de código fuente",
      title: "Edita la App hablando con su código fuente.",
      deck: "Para Apps con código editable, Bottega abre un Chat de Agent normal dentro del Project fuente de la App, en lugar de enviarte a otro editor.",
      imageAlt: "Pantalla de detalle de Bottega Design Canvas con pestañas App y Data, ajustes, Chat y menú de acciones",
      imageCaption: "Captura de Bottega: la página de una App reúne su superficie, datos, Chat de uso, ajustes y acciones de código fuente.",
      sections: [
        {
          heading: "Editar es una acción de producto de primer nivel",
          paragraphs: [
            "Cuando una App tiene código editable, su página muestra Edit App entre las acciones adicionales. Esa acción reanuda el Project de edición y abre un Chat de Agent estándar vinculado al código.",
            "Describe el cambio con el mismo modelo de interacción que en el resto de Bottega. El Agent elegido puede inspeccionar, actualizar y recompilar la App dentro de los límites normales del espacio.",
          ],
          points: [],
        },
        {
          heading: "Usar y editar son contextos distintos",
          paragraphs: ["El Chat de uso sirve para trabajar con la App instalada y sus registros. El Chat de edición sirve para cambiar la propia App. Separar estos papeles evita que una petición de uso normal se convierta silenciosamente en un cambio de código."],
          points: ["El Chat de uso permanece ligado a la experiencia instalada.", "Edit App activa el Project fuente dedicado de la App.", "La autorización de datos sigue limitada a la generación instalada y no se hereda del editor."],
        },
        {
          heading: "El código fuente no es una caja negra",
          paragraphs: [
            "La misma página también muestra el workbench, el historial de versiones, la ruta de importación y el flujo para compartir en GitHub cuando corresponda. El ciclo de vida del código queda visible y no se trata la personalización como una regeneración oculta.",
            "No se da por hecho que toda App de terceros sea editable. Bottega solo muestra la acción cuando existe evidencia duradera de que el código está disponible.",
          ],
          points: [],
        },
      ],
    },
    base: {
      label: "Base",
      menuCopy: "Datos locales estructurados junto a la conversación",
      title: "Datos locales estructurados junto a cada conversación.",
      deck: "Una Base es la capa de datos por filas de Bottega para Chats, Projects y Apps con datos, situada junto a la conversación que la utiliza.",
      imageAlt: "Pestaña Data de una App de Bottega con tabla Base, vistas, filtros, columnas, agrupación y control para añadir filas",
      imageCaption: "Captura de Bottega: la misma página de App cambia de su GUI a un workbench Base completo.",
      sections: [
        {
          heading: "La conversación y el conjunto comparten propietario",
          paragraphs: [
            "Un Chat puede usar su propia Base local. Si no tiene una Base privada y pertenece a un Project, puede recurrir a la Base compartida del Project. La regla de propiedad es explícita, de modo que el Agent y la interfaz actúan sobre el mismo conjunto duradero.",
            "Los Agents reciben herramientas Base integradas para leer esquema y filas, consultar, agregar y hacer cambios con control de revisión. Un seguimiento, inventario, libro o plan puede convertirse en datos estructurados sin crear una hoja de cálculo aparte.",
          ],
          points: [],
        },
        {
          heading: "Seis vistas, una sola fuente de verdad",
          paragraphs: ["Table, List, Kanban, Map, Chart y Gallery son proyecciones de las mismas filas. Cambiar de vista no bifurca los datos en documentos distintos."],
          points: ["Filtra, ordena, agrupa y elige campos visibles sin reescribir registros.", "Usa fórmulas y relaciones para datos derivados o conectados.", "Adjunta archivos, consulta el historial e intercambia CSV, JSON o XLSX.", "Deja que una App muestre una GUI específica y mantén la Base disponible en la pestaña Data."],
        },
        {
          heading: "El acceso es deliberadamente limitado",
          paragraphs: [
            "El acceso de una App a una Base se limita por capacidad para una generación concreta. Lectura, inserción, modificación, eliminación y adjuntos son permisos separados, y los controles de revisión impiden que escrituras antiguas sobrescriban datos nuevos.",
            "Así, los Agents pueden operar una superficie local sin convertir cada interfaz instalada en un cliente de base de datos sin restricciones.",
          ],
          points: [],
        },
      ],
    },
    agentsArticle: {
      stories: [
        {
          index: "01 · Multi-Agent",
          title: "Las CLI oficiales. Un solo lugar para trabajar.",
          paragraphs: [
            "Bottega ejecuta Codex, Claude Code, Kimi Code y OpenCode mediante sus CLI locales oficiales. No sustituye sus entornos por una capa de Agent genérica.",
            "La autenticación, el acceso a suscripciones y las cuotas siguen con el proveedor. Los controles de modelo y reasoning effort vienen del catálogo activo de cada CLI, así que una opción solo aparece si el backend puede aceptarla.",
            "Una conversación permanece vinculada al Agent que la inició. Abre otra cuando quieras otro Agent; ambas pueden vivir en el mismo Project.",
          ],
        },
        {
          index: "02 · Paridad de conversación",
          title: "Unificamos la interacción, no los Agents.",
          paragraphs: [
            "Cada Agent Harness tiene su propio modelo de ejecución. Para unificar la experiencia, Bottega ofrece una misma capa de interacción y adapta a cada backend las respuestas en streaming, el estado de las herramientas, el modo Plan, los mensajes en cola y otras funciones.",
            "Esta es la cobertura actual de funciones, que seguimos ampliando:",
          ],
        },
        {
          index: "03 · Colaboración entre Agents",
          title: "Más allá de una experiencia unificada, los Agents completan el trabajo juntos.",
          paragraphs: [
            "Deja que Claude organice el problema y prepare un Plan, y que después pase a Codex el contexto necesario para implementarlo. Al terminar, el resultado vuelve automáticamente al Chat original para revisarlo, modificarlo o entregarlo al siguiente Agent.",
            "Cada Chat conserva su propio Agent, espacio de trabajo e historial de tareas. Los mensajes pueden ejecutarse de inmediato o esperar en una cola; el proceso permanece visible y los resultados son trazables y reutilizables.",
          ],
        },
      ],
    },
  },
  demo: {
    chrome: {
      newChat: "Nuevo Chat", apps: "Apps", projects: "Projects", chats: "Chats", settings: "Ajustes", showMore: "Mostrar más",
      ledger: "Libro", analysis: "Análisis", byMonth: "Por mes", date: "Fecha", amount: "Importe", category: "Categoría", note: "Nota", sum: "Suma", records: "{count} registros",
      askAnything: "Pregunta lo que quieras", approveForMe: "Aprobar por mí", currentAgent: "Agent actual: {name}", currentModel: "Modelo actual: {name}",
      recommended: "Recomendado", anotherApproach: "Ninguna; indica al Agent otro enfoque", workedFor: "Trabajó durante {duration}", plan: "Plan",
      planCopied: "Plan copiado", copyPlan: "Copiar Plan", closePlan: "Cerrar panel de Plan", openPlan: "Abrir panel de Plan",
    },
    model: {
      advanced: "Avanzado", disableFast: "Desactivar Fast", enableFast: "Activar Fast", model: "Modelo", effort: "Esfuerzo", unavailable: "No disponible", quickTier: "Nivel rápido del modelo",
      efforts: { low: "Ligero", medium: "Medio", high: "Alto", xhigh: "Muy alto", max: "Máximo" },
    },
    apps: {
      items: [
        { name: "Lienzo de diseño", description: "Convierte ideas en un lienzo visual editable" },
        { name: "Kanban de desarrollo", description: "Organiza tareas, avances y hallazgos" },
        { name: "Control de gastos", description: "Registra gastos y consulta categorías y tendencias" },
        { name: "Registro de entrenamiento", description: "Registra entrenamientos y músculos trabajados" },
      ],
    },
    baseViews: [
      { name: "Vista de tabla", tab: "Tabla", blurb: "Columnas tipadas, orden, filtros y suma en cualquiera" },
      { name: "Vista de gráfico", tab: "Gráfico", blurb: "Proporción por categoría y gasto por día" },
      { name: "Vista de galería", tab: "Galería", blurb: "La columna de adjuntos como miniaturas" },
      { name: "Vista de mapa", tab: "Mapa", blurb: "La columna de ubicación como marcadores" },
    ],
    ledger: {
      categories: ["Transporte", "Equipo", "Compra", "Salud", "Restaurantes"],
      notes: ["Didi, viaje al aeropuerto", "Apple Store", "Hema Fresh", "Gimnasio, trimestre", "Ramen Ikkousha", "Tren de alta velocidad", "Mercado del barrio", "Comida de equipo", "Expreso al aeropuerto", "Compra del fin de semana", "Brazo para monitor", "Dos cafés", "Farmacia", "Recarga de metro", "Teclado mecánico", "Hema Fresh", "Fideos, tarde", "Dentista"],
      categoryShare: "Proporción por categoría", dailySpend: "Gasto diario", location: "Ubicación", where: "Lugar", label: "Etiqueta",
    },
    kanban: {
      tabs: ["Tareas", "Hallazgos", "Todo"], lanes: ["En curso", "Revisión", "Terminado"], task: "Tarea", source: "Origen", doc: "Documento",
      titles: ["Mover el panel de ajustes bajo Agents", "Cubrir la importación CLI con pruebas de integración", "Auditar el flujo de actualización automática", "Explicar el saludo ACP en la documentación", "Renombrar /settings/backends sin romper favoritos", "Reducir el onboarding a 42 palabras", "Definir el protocolo de instalación", "Separar identidad publicada y origen", "Publicar las notas de la versión 0.2.0"],
    },
    canvas: {
      live: "Actual", focus: "Enfoque", directions: "Direcciones", compare: "Comparar", browse: "Explorar", element: "Elemento", region: "Región",
      desktop: "Escritorio", tablet: "Tableta", mobile: "Móvil", fit: "Ajustar", anchors: "Anclas", selectedCount: "{count} seleccionadas", stale: "obsoleta", clear: "Borrar", addToChat: "Añadir al Chat",
    },
    fitness: {
      trainingRecord: "Fitness Log · Registro de entrenamiento", title: "Cobertura, no entrenamiento", subtitle: "Solo cuenta series terminadas. Registra y corrige desde el Chat de uso o la tabla de datos.",
      revision: "Revisión", createPlan: "Crear plan de entrenamiento", coverage: "Cobertura", heatmap: "Mapa de calor muscular", body: "Cuerpo", male: "Hombre", timeRange: "Periodo", last30Days: "Últimos 30 días",
      front: "Frente", back: "Espalda", intensity: "Intensidad de cobertura", offlineCatalog: "Catálogo sin conexión · 1324 ejercicios", exerciseCatalog: "Catálogo de ejercicios", clearFilters: "Borrar filtros",
      search: "Buscar", searchHint: "Nombre, alias, músculo o equipo", bodyPart: "Parte del cuerpo", muscleRegion: "Región muscular", equipment: "Equipo", all: "Todo", exercises: "1324 ejercicios", showing: "Mostrando 1–24", groups: ["Pecho", "Piernas superiores", "Espalda"],
    },
    appMenu: { items: ["Editar App", "Workbench de la App", "Acerca de esta App", "Importar", "Historial de versiones", "Compartir en GitHub"], ask: "Añade un tercer panel a la vista de comparación.", source: "Código de la App" },
    chats: {
      releaseNotes: {
        title: "Publicar las notas de versión", ask: "Redacta las notas 0.2.0 a partir de los PR fusionados desde 0.1.9.", trace: ["Lectura de 18 commits en 4 paquetes", "Edición de CHANGELOG.md"], reply: "El Plan está arriba. Di adelante y lo escribo; indica qué grupo cambiar y lo reorganizo primero.",
        plan: { title: "Notas de la versión 0.2.0", sections: [
          { heading: "Resumen", items: ["Seis cambios principales desde `0.1.9`, agrupados por lo que la persona nota primero.", "La paridad de Agents abre la lista: `Kimi` y `OpenCode` ya alcanzan la misma escala de permisos que `Codex`.", "Dos refactors internos caben en una línea; nadie fuera del repositorio los notó."] },
          { heading: "Secuencia", items: ["Agrupar los 18 PR por la superficie que toca la persona, no por el paquete donde cayeron.", "Escribir qué cambió; el número del PR es procedencia, no noticia.", "Replicar el archivo en `docs/` y leer ambos para asegurar que nunca discrepen."] },
          { heading: "Archivos", items: ["`CHANGELOG.md` — seis entradas, más recientes primero y fechas absolutas.", "`docs/changelog/README.md` — espejo público con las mismas seis entradas."] },
          { heading: "Fuera de esta pasada", items: ["Completar `0.1.x` — decidir hasta dónde volver es otro asunto.", "Etiquetas de Release y página de descarga; leen este archivo, no lo escriben."] },
        ] }, status: "Respondiendo",
      },
      settingsPanel: { title: "Mover el panel de ajustes", ask: "Coloca los ajustes backend bajo Agents y conserva los enlaces profundos.", trace: ["Lectura de 9 archivos en components/settings", "12 llamadas encontradas"], reply: "Hay tres formas; solo cambia lo que ocurre con los enlaces guardados.", bullets: ["Las 12 llamadas son cambios mecánicos en cualquier caso.", "Los dos enlaces profundos y la entrada de command palette no lo son.", "La pregunta real es qué promesa quieres hacer sobre enlaces antiguos."], question: { eyebrow: "Main Agent · Estrategia de rutas", text: "Las rutas antiguas están en favoritos. ¿Cómo las muevo?", options: [{ label: "Conservar redirecciones", description: "Los caminos antiguos llegan a los nuevos; favoritos y palette siguen funcionando." }, { label: "Renombrar directamente", description: "Árbol más limpio, pero cada enlace guardado deja de funcionar." }, { label: "Publicar ambos una versión", description: "Dos rutas ahora y retirar las antiguas en 0.3.0." }] } },
      changelog: { title: "Redactar las novedades", ask: "Resume las fusiones de esta semana para la página de novedades.", trace: ["Lectura de 24 mensajes de commit", "Edición de docs/changelog/README.md"], reply: "Seis entradas. La semana se lee como una historia y no como lista de fusiones.", bullets: ["Seis entradas, más recientes primero, una línea cada una.", "Los dos refactors internos se unen; nadie fuera del repositorio los notó.", "Fechas absolutas, no relativas: estas notas se leen meses después."], status: "Editando docs/changelog/README.md" },
      importTests: { title: "Cubrir la ruta de importación CLI", ask: "Añade pruebas de integración para importar sesiones CLI existentes.", trace: ["Lectura del módulo de importación", "Ejecución de 48 pruebas"], reply: "Todo en verde y una ruta antes sin prueba ya está cubierta.", bullets: ["Pasan 48 pruebas, incluidas cuatro nuevas.", "Un archivo de sesión incorrecto hace fallar la importación, no la App.", "Los fixtures viven junto al módulo para que el próximo lector los encuentre."], status: "Ejecutando 48 pruebas" },
      onboarding: { title: "Recortar el texto de onboarding", ask: "La primera pantalla parece un manual. Déjala en lo necesario antes del primer Chat.", trace: ["Lectura de 4 pantallas de onboarding", "Edición de onboarding.ts en 5 idiomas"], reply: "Todo lo eliminado ya lo decía la propia interfaz.", bullets: ["De 140 palabras a 42.", "La explicación de permisos se movió al lugar donde se eligen.", "Los cinco idiomas se reescribieron, no se tradujeron automáticamente del inglés."], status: "Pensando" },
      updatePath: { title: "Auditar la ruta de actualización", ask: "Recorre la actualización automática y detecta dónde una descarga parcial puede dejar a alguien bloqueado.", trace: ["Seguimiento de 3 estados de actualización", "Ejecución de la suite del updater"], reply: "Hay un fallo real, justo el que aparece con una conexión inestable.", bullets: ["Una instalación interrumpida deja el botón en Instalando para siempre.", "Todo lo demás se recupera al reiniciar; la descarga continúa desde su ledger.", "Solución propuesta: tratar un proceso installer ausente como fase fallida, no pendiente."], status: "Leyendo electron/main/updater.ts" },
      settingsRoutes: { title: "Renombrar las rutas de ajustes", ask: "Cambia /settings/backends a /settings/agents sin romper favoritos.", trace: ["12 llamadas encontradas", "12 archivos editados"], reply: "Todo renombrado y ningún favorito lo nota.", bullets: ["12 llamadas renombradas sin búsqueda y reemplazo.", "La ruta antigua redirige, así que favoritos y palette siguen llegando.", "Pruebas de rutas en verde."], status: "Respondiendo" },
      iconGrid: { title: "Comparar las dos cuadrículas de iconos", ask: "Los iconos laterales parecen un píxel desplazados frente al Composer. ¿Qué cuadrícula está mal?", trace: ["Medición de 14 huecos de icono", "Lectura de sidebar-row.tsx"], reply: "Ninguna. La desalineación aparente es 1px de aire intencionado.", bullets: ["Ninguna está mal: ambos huecos son de 16px.", "La barra coloca una marca de 14px y el icono del Composer llena el hueco.", "Estás viendo el hueco, no el icono."], status: "Pensando" },
      acp: { title: "Explicar el saludo ACP", ask: "Explica qué ocurre entre iniciar una CLI y recibir el primer token.", trace: ["Lectura del módulo de sesión ACP", "Seguimiento de 6 mensajes"], reply: "Tres viajes antes del primer token. Después todo es un solo stream.", bullets: ["initialize — el client declara qué puede mostrar.", "session/new — la CLI abre una sesión en tu directorio.", "session/prompt — lo demás se transmite por el mismo canal."], status: "Respondiendo" },
    },
    agentsVisual: {
      pickerLabel: "Ventana del Hero de Bottega con el selector de Agent abierto en el Composer", matrixLabel: "Matriz de capacidades de Codex, Claude, Kimi y OpenCode", capability: "Capacidad",
      rows: [
        { label: "Respuestas en streaming", values: ["✅", "✅", "✅", "✅"] },
        { label: "Selección de Model / Thinking", values: ["✅", "✅", "✅", "✅"] },
        { label: "Estado de herramientas", values: ["✅", "✅", "✅", "✅"] },
        { label: "Modo Plan", values: ["✅", "✅", "✅", "✅"] },
        { label: "Modo de cola", values: ["✅", "✅", "✅", "✅"] },
        { label: "Aprobaciones del usuario", values: ["✅", "✅", "✅", "✅"] },
        { label: "Función @", values: ["✅", "✅", "✅", "✅"] },
        { label: "Browser Use", values: ["✅", "✅", "✅", "✅"] },
        { label: "Editar el mensaje anterior", values: ["✅", "✅", "✅", "✅"] },
      ],
      collaborationLabel: "Claude redacta el Plan, Codex lo implementa y el resultado vuelve al Chat original para que Claude lo revise",
      chatPlan: "Unificar la barra de nav", chatImpl: "Implementación de nav", planLabel: "Plan", planTitle: "Plan de implementación de navegación",
      relayFrom: "[Desde la Section @{name} (source_section_id={id})]",
      queueItem: "@{name} · verifica también los puntos de ruptura móviles",
      reviewLine: "La intención del Plan y la implementación coinciden; sin problemas bloqueantes.",
      notePlan: "Primero deja que Claude convierta\nel problema en un Plan",
      noteSend: "Deja el trabajo en\nla cola de otro Chat",
      noteBack: "Al terminar, el resultado vuelve solo",
      noteReview: "De vuelta en el Chat original — revísalo,\no pásalo al siguiente Agent",
      handoffCaption: "Tres fotogramas de una misma máquina. Fuera del esqueleto todo es texto del producto — el título del Plan, la cabecera del mensaje entrante, el veredicto de la revisión; las dos entregas llaman a send_to_section y expect_reply.",
    },
  },
} satisfies CatalogShape<typeof en>;
