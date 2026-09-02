# Registro de cambios

Este archivo registra hitos del producto, no iteraciones internas de implementación.

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
