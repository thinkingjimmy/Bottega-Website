# Registro de cambios

Este archivo registra hitos del producto, no iteraciones internas de implementación.

## 2026-09-08 — v0.1.3

**Antes de actualizar:** 0.1.3 utiliza un nuevo formato de almacenamiento local. Las bases de Chat de 0.1.2 y anteriores no pueden abrirse ni migrarse automáticamente. Cierra Bottega y respalda toda la carpeta de datos de la aplicación. Guarda esa copia para la versión anterior e inicia 0.1.3 con una carpeta nueva; los Chats y ajustes previos no se importan automáticamente.

- **Cambia de Agent dentro de un Chat.** Cuando esté inactivo, elige Codex, Claude Code, Kimi Code u OpenCode para el siguiente turno. Una sola transcripción conserva autores y marcas de cambio. El nuevo Agent recibe contexto limitado y puede recuperar el historial pertinente.
- **Comprueba si un Agent está listo.** El compositor muestra instalación, autenticación y disponibilidad del runtime, con acciones para instalar, iniciar sesión y reintentar. Los Agents no disponibles ya no consumen silenciosamente el trabajo en cola; la recuperación se limita al Chat o Agent afectado.
- **Sigue las tareas fuera de la ventana principal en macOS.** Activa de forma independiente el inicio al entrar en la sesión, la ejecución tras cerrar la ventana y el panel flotante. El panel superior muestra tareas activas y solicitudes que requieren atención, permite navegar con el teclado y abre el Chat correspondiente. Las tres opciones están desactivadas inicialmente.
- **Comprueba la compatibilidad antes de instalar Apps.** Las cuatro Apps first-party requieren Bottega 0.1.3. La instalación, recompilación, autorización y activación comprueban ese requisito; tras actualizar y reiniciar se puede volver al candidato original. Rechazar una actualización conserva la versión operativa y sus permisos.
- **Renombra Apps sin alterar su trabajo.** Cambiar el nombre visible conserva la versión activa, el código fuente, los datos y los permisos.
- **Añade Projects con menos pasos.** Las opciones para importar historial solo aparecen si existe historial CLI local; los Projects sin historial se añaden directamente.

Los instaladores macOS arm64 DMG/ZIP, Windows x64 NSIS y Linux x64 AppImage siguen sin firmar; sigue los pasos de primer inicio. macOS continúa siendo la plataforma principal. El aislamiento nativo de Apps y la paridad completa en Windows/Linux siguen en desarrollo. Desde 0.1.0 o 0.1.1 hay que instalar 0.1.3 manualmente debido al fallo anterior del actualizador. La preparación del almacenamiento indicada arriba se aplica a todas las versiones anteriores.

## 2026-09-05 — v0.1.2

**Desde 0.1.0 o 0.1.1:** descarga e instala 0.1.2 manualmente desde GitHub Releases. Su botón de actualización contiene el fallo corregido aquí y no puede recibir esta solución.

- Corregimos el bloqueo de las descargas de actualización por una clave de compatibilidad no disponible en builds sin firmar. La barra lateral distingue la instalación automática de la descarga manual, muestra el progreso y mantiene una ruta a Releases o About si falla una actualización o una comprobación en segundo plano.
- Reconstruimos Fitness Log con la interfaz React del host. Conserva 72 ejercicios, 17 regiones musculares, cinco idiomas, demostraciones animadas, planes de entrenamiento y diseños adaptables claros/oscuros con las API compartidas de componentes y datos.
- Completamos la carga recuperable de datos de las Apps. Los snapshots Base leen todas las páginas y publican una revisión coherente. Los envíos de planes Fitness mantienen los identificadores originales de las filas durante reintentos o resultados inciertos para evitar duplicados.
- Corregimos los reintentos de búsqueda en el Chat y la navegación. Una página fallida espera un reintento explícito, las respuestas antiguas no sustituyen consultas nuevas y cambiar de Chat ya no deja visible la rama del worktree anterior.
- Reparamos el inicio de catálogos de Apps con esquemas antiguos: se conservan los bytes originales en cuarentena y se crea un catálogo vacío del formato actual. Los catálogos corruptos del formato actual aún requieren reparación explícita. También reforzamos la recuperación de turnos preparados y la cancelación de Memory.
- Publicamos instaladores macOS arm64 DMG/ZIP, Windows x64 NSIS y Linux x64 AppImage, todavía sin firmar y con los mismos pasos de primer inicio.

## 2026-09-04 — v0.1.1

- Publicamos los instaladores v0.1.1: DMG/ZIP macOS arm64, NSIS Windows x64 y AppImage Linux x64. Siguen sin firmar; se mantienen los pasos de primer inicio de 0.1.0.
- Añadimos Chat Fork. Cualquier respuesta del asistente puede iniciar un Chat que hereda el historial previo como solo lectura. En un Git Project puede usar un worktree propio administrado por el producto para que dos ramas no sobrescriban la misma copia de trabajo.
- Añadimos un panel de historial a App Use y permitimos ejecutar una App en una ventana independiente de la principal.
- Unificamos App GUI Surface con un conjunto de componentes y un canal de mensajes comunes, sin copias del protocolo en cada página de App.
- Corregimos dos pérdidas del historial importado: al actualizar se conserva la pertenencia de cada Chat a su Project y al reimportar se actualiza el documento de búsqueda de su título.
- Adaptamos los tres pasos de incorporación a ventanas estrechas. Las filas de capacidades responden al ancho del contenedor y las descripciones se organizan en inicio de Chat, Agent y extras para mantener una lectura cómoda.
- Reparamos las desviaciones de la proyección de búsqueda del almacén de Chat mediante recálculo y escritura por la misma ruta. Si la autocomprobación falla realmente, la barra lateral muestra un aviso, una salida y un botón para abrir una issue de GitHub ya rellenada.
- Separamos los datos de la aplicación instalada en una carpeta `Bottega` propia, evitando que las versiones publicadas y las de desarrollo reconstruyan el estado local de la otra.
- Hicimos recuperables los ledgers duraderos ilegibles: se conservan en cuarentena con otro nombre, se reconstruyen vacíos y el inicio continúa.
- Actualizamos los presets de las Apps first-party incluidas a sus commits publicados.

## 2026-09-02 — v0.1.0

- Publicamos los primeros instaladores. Bottega ya está disponible en GitHub Releases como DMG y ZIP de macOS arm64, instalador NSIS de Windows x64 y AppImage de Linux x64, todos construidos desde el commit de esta etiqueta. Estas compilaciones no están firmadas; la guía de inicio documenta el paso único que cada plataforma pide en el primer arranque.
- Reconstruimos el almacén de Chat sobre SQLite como su única fuente de verdad. Conversaciones, turns, adjuntos y facts viven ahora en una sola base de datos local duradera en lugar de archivos por Chat, así que un Chat sobrevive a los fallos, se reanuda sin volver a escanear y deja de ralentizarse a medida que crece.
- Hicimos barato abrir conversaciones largas. La línea de tiempo, el esquema del Chat y la búsqueda dentro del Chat están paginados: abrir un Chat con decenas de miles de turns cuesta lo mismo que abrir uno corto, y desplazarse hacia atrás nunca recarga toda la transcripción.
- Añadimos búsqueda de texto completo basada en gramas. La búsqueda ahora coincide con textos en chino, japonés y coreano con la misma fiabilidad que en idiomas separados por espacios, y devuelve resultados del mismo almacén que lee la transcripción.
- Unificamos el historial importado en una sola línea de tiempo. Las sessions adoptadas de las CLI locales de Codex, Claude Code, Kimi Code y OpenCode se muestran en la misma transcripción que los Chats creados en Bottega, con el mismo esquema, búsqueda y navegación, en lugar de una vista separada de solo lectura.
- Estrechamos las escrituras de facts. Un turn ahora actualiza solo los facts que realmente le pertenecen, de modo que turns concurrentes, la entrega de Memory y las escrituras de Base ya no se sobrescriben entre sí.
- Cerramos los hallazgos de la revisión de fusión. App Use solo navega tras un acuse completed, así que una App rechazada o en recuperación nunca mueve la ventana; revocar el acceso a Base de una App es ahora un paso atómico, de modo que acceso y ciclo de vida no pueden discrepar; y el anclaje de Apps y Projects, la apariencia de Project y la navegación de Settings se reorganizaron para que la barra lateral refleje siempre lo que está realmente abierto.

## 2026-08-29 — Herramientas por Project, Extensions y vista previa del código de Design Canvas

- Publicamos el código de producción actual como un commit hijo normal del historial público limpio, mientras las pruebas, la automatización de desarrollo y la evidencia interna permanecen en Bottega-Dev.
- Añadimos overrides por Project exacto para herramientas integradas y servidores MCP manuales. Cada turn congela su plan efectivo de herramientas, scope revisions, compatibilidad runtime y configuración MCP sellada antes de cualquier efecto secundario.
- Unificamos la propiedad de Extensions como `global | exact Project` en administración, Skills, App requirements, sessions, retained data y recuperación tras borrado. Los Registry y ledgers heredados explícitamente vacíos migran; cualquier estado con autoridad live o ambigua sigue en fail closed.
- Añadimos Bottega Design Canvas con artboards HTML autocontenidos, comparación de direcciones e historial, anclas visuales numeradas, preview aislada y render check del Agent.
- Avanzamos los cuatro gitlinks de Apps first-party a commits accesibles públicamente. Es una vista previa del código, no la release oficial del installer `v0.1.0`, que sigue protegida por los gates de publicación.

## 2026-08-25 — Publicación del código fuente

- Publicamos Bottega bajo la licencia MIT con un historial Git nuevo que contiene solo material público.
- Establecimos un límite estricto de repository: el código desktop de producción y la documentación de hitos son públicos; pruebas, datos de prueba, aplicación web, evaluaciones internas, TODO, notas de desarrollo, registros semanales y automatización permanecen en el repository de desarrollo.
- Organizamos la documentación pública en docs/, con secciones de segundo nivel para primeros pasos, funciones y changelog, y dejamos el README raíz como entrada de GitHub.
- Adoptamos **Bottega** como identidad del producto, package, ventana, build, cliente ACP y documentos exportados.

## 2026-08-18 a 2026-08-23 — Colaboración duradera

- Ampliamos las referencias del workspace desde Chats hasta archivos y Sections.
- Añadimos entrega duradera de imágenes entre Sections y promoción de resultados de Subagent a Sections reutilizables e idle.
- Unificamos la gestión local de Skills para Codex, Claude Code, Kimi Code y OpenCode.
- Añadimos federación del historial consultable en modo lectura y adopción de sessions locales de Agent.

## 2026-08-08 a 2026-08-23 — Memory con consentimiento explícito

- Añadimos providers locales administrados OpenViking y EverOS.
- Introdujimos scopes de uso compartido para Chat, grupo de Projects y personal, con consentimiento explícito y estado de entrega observable.
- Añadimos reconstrucción, fuente, progreso de descarga de modelos y cambio de versión fiable.

## 2026-08-04 a 2026-08-21 — Apps, herramientas y navegador

- Añadimos un navegador integrado con múltiples pestañas controlado por CDP in-process.
- Ampliamos la plataforma de herramientas integradas a Sections, búsqueda, Base, archivos, Apps y acciones del navegador.
- Unificamos Apps static, server y Base-backed con permisos vinculados a la generación y un GUI SDK restringido.

## 2026-07-28 a 2026-08-23 — Base

- Introdujimos datos estructurados para Chats y Projects con vistas Table, List, Kanban, Map, Chart y Gallery.
- Añadimos fórmulas, relaciones, adjuntos, historial de filas, imports/exports y mutaciones de App limitadas por capability.

## 2026-07-16 a 2026-08-09 — Base de desktop y multi-agent

- Pasamos de un prototipo web a un workspace desktop de Electron.
- Conectamos Codex, Claude Code, Kimi Code y OpenCode mediante sus CLI locales y ACP, manteniendo la propiedad de las credentials en cada CLI.
- Añadimos turns en streaming, approvals, Plan mode, message steering, Subagents, workspaces de Project, semántica de archive y límites de archivos a nivel del OS.
