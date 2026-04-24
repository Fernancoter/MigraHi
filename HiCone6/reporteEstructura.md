# Reporte de Estructura y Lógica del Repositorio (Excluyendo HiCone_ERP)

Tras un análisis exhaustivo de todos los directorios y archivos alojados sobre la estructura del proyecto (`MigraHi/HiCone6`), habiendo excluido el directorio moderno de `HiCone_ERP`, he identificado el propósito y la naturaleza de toda la arquitectura restante.

## 🧬 Naturaleza del Entorno Heredado (Legacy)

A diferencia de un proyecto tradicional de software donde la lógica de negocio y las vistas viven en archivos de texto plano físicos (como `.ts`, `.cs`, `.html`, etc.), los archivos que se encuentran aquí pertenecen exclusivamente a la infraestructura que conforma una **Knowledge Base (Base de Conocimiento) de GeneXus**.

En GeneXus, las transacciones, lógica de interfaz, eventos y reglas de negocio **no se expresan en carpetas como código fuente habitual**. Toda esa lógica es abstraída, comprimida y guardada dentro de una base de datos propietaria manejada por el entorno IDE de GeneXus. 

Por lo tanto, la "lógica del programa" en el sentido estricto, no se encuentra dispersa en archivos legibles individualmente.

A continuación, el detalle de cada archivo y módulo físico expuesto en el repositorio.

---

## 📂 1. Bases de Datos y Metadatos Relevantes (Raíz)

- **`HiCone6.gxw`**: Este es el archivo "Solución/Proyecto" primario de GeneXus. Es el índice que abre el IDE de GeneXus para levantar la Base de Conocimiento (Knowledge Base).
- **`GX_KB_HiCone6.mdf` y `GX_KB_HiCone6_log.ldf`**: Son los archivos de motor de base de datos **LocalDB de SQL Server**. **Es aquí donde reside literalmente el 100% de la lógica del sistema ERP antiguo.** Las tablas de metadatos dentro de esta KB guardan en su interior cómo funcionan los Web Panels, Work With, Reglas y Procedimientos del antiguo Hi-Cone.
- **`HiCone6.xpz`**: Este es un archivo de exportación ("Export") de GeneXus. Suele contener empaquetados los objetos con sus reglas lógicas, rutinas, pantallas e imágenes en bruto; listo para ser importado en otra PC.
- **`kb.data` y `knowledgebase.connection`**: Archivos binarios que sirven como caché activo de la estructura de base de datos de GeneXus para cargar el programa eficientemente.

---

## 🧱 2. Módulos Internos de la Configuración y Funciones UI

### `UserControls\` (Lógica Front-end de GeneXus Inyectada)
Este directorio contiene los componentes de controles de usuario que inyecta GeneXus cuando compila el proyecto web antiguo.
- **Módulo `genexusunanimo.*`**: Todos los archivos ubicados aquí (como `.js` y `.json`) forman parte de la biblioteca estándar de **GeneXus Unanimo**, que es el framework de diseño oficial de la herramienta. Acá encontramos los scripts de renderizado (`render.js`) en JavaScript para los artefactos web (Dropdowns, Menús Laterales, Botones, Treeviews, etc). También contiene recursos compilados en Angular puro solo para la inyección nativa del IDE (`*angularrender.js`).
- **`wwp_iconbutton`**: Un componente asociado típicamente al set de utilidades de WorkWithPlus (un software de terceros para GeneXus), con su propio mecanismo de renderización `.js`.

### `FCO\` (Filtros y Configuraciones Personalizadas)
Contiene la configuración de la ventana gráfica actual de los desarrolladores originales.
- Archivos **`.Filters` y `.workspace`**: Archivos de texto en formato XML donde GeneXus almacena qué columnas u opciones tienen habilitadas los programadores cuando buscan sobre los objetos en la ventana IDE.

### `FTIndex\` (Búsqueda de Texto)
- Todo lo que reside en este bloque son archivos de indexación basados en `Lucene` (`.cfs`, `.del`, `.lock`), empleados exclusivamente para que la opción de "Global Search" dentro de GeneXus pueda encontrar entidades y palabras clave súper rápido.

### `GXSPC025\` y `OutputLogs\`
- La carpeta de especificación (`GXSPC025`) almacena metadatos y objetos pre-armados (`userControls.v2.ari`) utilizados por los generadores de código final de GeneXus antes de producir el proyecto .NET o Java en su formato final local.
- `OutputLogs`: Archivos de reporte indicando qué generó satisfactoriamente y donde ha fallado el build del sistema.

### `Locks\` e `IndexLocks\`
- Carpetas con artefactos transaccionales generados para garantizar la integridad multiusuario. Previenen que el IDE se corrompa si varios desarrolladores abren el entorno GeneXus bajo la misma ruta a la vez.

---

## 🎯 Conclusión e Implicaciones para la Migración

**No existe código fuente directo auditable libremente bajo las carpetas expuestas.** El repositorio heredado de `HiCone6` es más bien la plataforma estructural pre-compilación que necesita el IDE de GeneXus.

Si en el proceso actual de construir el nuevo sistema **`HiCone_ERP`** (Angular/.NET) se necesita migrar o auditar la lógica original, transacciones, tablas y reglas de validación antiguas, la única manera confiable de extraer dicha lógica es:
1. **Abrir el archivo `HiCone6.gxw` usando el IDE oficial instalado de GeneXus** (Versión V17, V18, etc).
2. **Generar un volcado / inspeccionar el .mdf** u observar el diccionario de datos generado de vuelta.
3. Importar los objetos que contiene el backup comprimido en **`HiCone6.xpz`** para revisar el funcionamiento de la lógica de negocio y verla reflejada en código legible por Genexus.
