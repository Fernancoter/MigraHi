# Especificación Técnica: GeneXus Knowledge Base Scanner
## "GX KB Scanner" — Dataset de Documentación Técnica para Agentes de IA

> **Versión:** 1.0  
> **Fecha:** Abril 2026  
> **Estado:** Lista para implementación  
> **Destinatario:** Agente de IA o desarrollador encargado de construir el sistema

---

## 1. Resumen Ejecutivo

### ¿Qué es?
Una aplicación de consola en C# que actúa como motor de ingeniería inversa para Knowledge Bases (KB) de GeneXus 18. Lee cada objeto de la KB (Web Panels, Procedures, Transactions, SDTs, etc.) y lo exporta como archivos de texto estructurado (Markdown + JSON), eliminando el ruido visual y preservando la intencionalidad de negocio de cada objeto.

### ¿Para qué?
El output generado es un **RAG Dataset** (Retrieval-Augmented Generation) diseñado para ser consumido por Agentes de IA. Con este dataset, un agente puede:
- Rastrear un proceso completo desde el botón en pantalla hasta la tabla en base de datos.
- Mapear dependencias entre módulos.
- Responder preguntas como: "¿Qué objetos participan en el proceso de Facturación?"
- Facilitar la migración de lógica de negocio a stacks modernos (NestJS, Next.js, etc.).

### ¿Qué NO es?
- No es un compilador ni ejecutor de código GeneXus.
- No es un conversor XPZ.
- No modifica ni escribe en la KB.
- No tiene interfaz gráfica (es consola pura).
- No soporta versiones anteriores a GeneXus 18.

---

## 2. Entorno de Destino — Datos Confirmados

> ⚠️ Esta sección contiene datos reales del entorno donde se ejecutará el sistema. No asumir valores por defecto.

| Parámetro | Valor confirmado |
|---|---|
| Sistema operativo | Windows (x64) |
| GeneXus instalado | GeneXus 18 Update 12 (`genexus18u12`) |
| Ruta de instalación GX | `C:\Program Files (x86)\GeneXus\GeneXus18\` |
| Arquitectura de GX | **32 bits (x86)** — instalado en `Program Files (x86)` |
| GAM instalado | Sí (`gamplatforms18u12`) |
| SQL Server disponible | SQL Server 2022 Express |
| .NET SDK disponible | .NET 8.0.408 (instalado) |
| Runtime target del proyecto | **.NET Framework 4.8** (ver sección de restricciones) |
| Visual Studio | 2022 |

---

## 3. Restricciones Técnicas Críticas

> ⚠️ Estas restricciones NO son negociables. Ignorarlas causará fallos en runtime que son difíciles de diagnosticar.

### 3.1 Arquitectura x86 — OBLIGATORIO
Las DLLs de GeneXus 18 son de **32 bits**. El proyecto de C# DEBE compilarse como x86.

```xml
<!-- En el .csproj, esto es OBLIGATORIO -->
<PlatformTarget>x86</PlatformTarget>
```

Si se compila como x64 o AnyCPU sin prefer-32bit, el runtime lanzará `BadImageFormatException` al cargar las DLLs.

### 3.2 .NET Framework 4.8 — NO usar .NET 8 para este proyecto
Aunque .NET 8 está instalado en la máquina, las DLLs del SDK de GeneXus 18 fueron compiladas para .NET Framework 4.x. Usar .NET 8 puede producir errores de compatibilidad de ensamblados (assembly binding failures) en tiempo de ejecución.

**Target Framework correcto:**
```xml
<TargetFramework>net48</TargetFramework>
```

### 3.3 Las DLLs del SDK NO se copian al output
Las DLLs de GeneXus tienen dependencias transitivas hacia archivos de configuración y recursos ubicados en la carpeta de instalación de GeneXus. Si se copian fuera de esa carpeta, el SDK falla al inicializar.

```xml
<!-- En cada referencia del SDK -->
<Private>false</Private>
```

La aplicación DEBE ejecutarse en la misma máquina donde está instalado GeneXus 18, o el PATH debe incluir la carpeta de instalación.

### 3.4 El archivo .gxw es una base de datos SQL Server CE
El archivo `.gxw` no es un archivo de texto ni un XML. Internamente es una base de datos **SQL Server Compact Edition 4.0**. Accederlo directamente sin el SDK es posible pero requiere el driver de SQLCE. Se recomienda acceder siempre a través del SDK.

### 3.5 GeneXus con GAM activo
La KB objetivo tiene GAM (GeneXus Access Manager) instalado. Esto significa que existen objetos de sistema con prefijo o namespace de GAM. El scanner debe procesarlos como objetos normales (son WebPanels y Procedures estándar), pero debe marcarlos con un flag `"isGAMObject": true` en el JSON de salida para que la IA los identifique como infraestructura de seguridad y no los confunda con lógica de negocio propia.

---

## 4. DLLs del SDK Disponibles

Ruta base: `C:\Program Files (x86)\GeneXus\GeneXus18\`

### 4.1 DLLs de Núcleo — Referenciar siempre

| DLL | Tamaño | Propósito |
|---|---|---|
| `Artech.Architecture.Common.dll` | 1.6 MB | Base del SDK, tipos fundamentales |
| `Artech.Genexus.Common.dll` | 6.8 MB | Modelo de objetos GX (WebPanel, Procedure, Transaction, etc.) |
| `Artech.Common.dll` | 130 KB | Utilidades base |
| `Artech.Common.Helpers.dll` | 994 KB | Helpers generales |
| `Artech.Udm.Framework.dll` | 326 KB | Unified Data Model, acceso a propiedades de objetos |

### 4.2 DLLs de Alto Valor — Incorporar según necesidad

| DLL | Tamaño | Propósito |
|---|---|---|
| `Artech.ReverseEngineering.Core.dll` | 199 KB | Motor de RE interno de GX — explorar antes de implementar parsers propios |
| `Artech.ReverseEngineering.Data.dll` | 164 KB | Acceso a datos del módulo RE |
| `Artech.Common.Language.Parser.v2.dll` | 447 KB | Parser del lenguaje GeneXus v2 (más moderno) |
| `Artech.Common.Language.Parser.dll` | 434 KB | Parser v1 como fallback |
| `Artech.Specifier.dll` | 3.4 MB | Motor de especificación, contiene metadatos de relaciones |
| `Artech.GXplorer.Common.dll` | 675 KB | Navegador de objetos de KB |
| `Artech.Gxpm.Common.dll` | 773 KB | GX Process Manager — útil para flujos de negocio |

### 4.3 DLLs a Ignorar en v1

- `Artech.Generator.*` — Generadores de código (Java, .NET, Android, etc.) — no relevantes
- `Artech.Editors.*` — Componentes de UI del IDE — no relevantes
- `Artech.Wiki.*` — Módulo Wiki interno de GX — no relevante
- `Artech.Debugx.*` — Módulo de debug — no relevante

---

## 5. Arquitectura del Sistema

### 5.1 Diagrama de Capas

```
┌─────────────────────────────────────────────────────────┐
│  CAPA 0 — ORQUESTACIÓN Y CONFIGURACIÓN                  │
│  Program.cs (entry point) + GXScannerConfig.json        │
│  Lee argumentos, valida entorno, coordina el pipeline   │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  CAPA 1 — SDK BRIDGE (Acceso)                           │
│  KnowledgeBaseReader.cs                                 │
│  Abre el .gxw, inicializa servicios GX,                 │
│  provee IEnumerable<KBObject>                           │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  CAPA 2 — PARSER / TRANSFORMER                          │
│  WebPanelParser.cs                                      │
│  ProcedureParser.cs                                     │
│  TransactionParser.cs                                   │
│  SDTParser.cs                                           │
│  Produce GXObjectModel (POCO interno)                   │
│  No conoce nada sobre el formato de salida              │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  CAPA 3 — POST-PROCESSOR (Grafo Inverso)                │
│  DependencyGraphBuilder.cs                              │
│  Segunda pasada sobre todos los GXObjectModel           │
│  Construye el campo "CalledBy" de cada objeto           │
│  (no se puede obtener en la primera pasada)             │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  CAPA 4 — OUTPUT WRITERS (Salida)                       │
│  MarkdownWriter.cs                                      │
│  JsonWriter.cs                                          │
│  IndexWriter.cs (genera _index.json y _llm_context.md)  │
│  No conoce nada del SDK de GeneXus                      │
└─────────────────────────────────────────────────────────┘
```

**Principio de diseño clave:** Cada capa solo conoce a la capa inmediata anterior. El Parser no sabe qué formato se generará. El Writer no sabe nada de GeneXus. Esto permite agregar un `Neo4jWriter` o `XmlWriter` en el futuro sin tocar el resto del sistema.

---

## 6. Modelo de Datos Central — GXObjectModel

Este es el POCO que viaja entre capas. Es la definición más importante del proyecto.

```csharp
public class GXObjectModel
{
    // === IDENTIDAD ===
    public Guid   UniqueId    { get; set; }  // GUID interno de GX
    public string Name        { get; set; }  // Nombre del objeto
    public string Type        { get; set; }  // "WebPanel" | "Procedure" | "Transaction" | "SDT" | "DataProvider" | "WebComponent" | etc.
    public string Module      { get; set; }  // Carpeta/módulo dentro de la KB (ej: "Facturación\Ingreso")
    public string Description { get; set; }  // Documentación interna (si existe)
    public bool   IsGAMObject { get; set; }  // true si pertenece al módulo GAM

    // === PILAR 1: FLUJO DE INTERFAZ ===
    // Solo aplica a WebPanel y WebComponent
    public List<UIControl> InterfaceElements { get; set; }

    // === PILAR 2: LÓGICA DE NEGOCIO ===
    public List<CodeBlock> BusinessLogic { get; set; }

    // === PILAR 3: GRAFO DE DEPENDENCIAS ===
    public DependencyInfo Dependencies { get; set; }

    // === PILAR 4: DICCIONARIO DE DATOS ===
    public List<DataElement> DataDictionary { get; set; }
}

public class UIControl
{
    public string ControlName  { get; set; }  // "BtnConfirmar"
    public string ControlType  { get; set; }  // "Button" | "Grid" | "TextBlock" | etc.
    public string EventName    { get; set; }  // "Click" | "Enter" | "Load"
    public string AssociatedCodeBlockName { get; set; }  // Referencia al CodeBlock que ejecuta
}

public class CodeBlock
{
    public string BlockName { get; set; }  // "Event BtnConfirmar.Click" | "Source" | "Rules"
    public string BlockType { get; set; }  // "Event" | "Source" | "Rules" | "Conditions"
    public string SourceCode { get; set; } // Código en texto plano (sin RTF, sin XML)
}

public class DependencyInfo
{
    public List<string> CallsTo        { get; set; }  // Objetos que este objeto invoca
    public List<string> CalledBy       { get; set; }  // Objetos que invocan a este (segunda pasada)
    public List<string> TablesRead     { get; set; }  // Tablas que lee
    public List<string> TablesWritten  { get; set; }  // Tablas que escribe/modifica
    public List<string> UsesSDTs       { get; set; }  // SDTs que utiliza
    public List<string> UsesDataProviders { get; set; }
}

public class DataElement
{
    public string Name        { get; set; }  // Nombre de variable o atributo
    public string ElementType { get; set; }  // "Variable" | "Attribute" | "Parameter"
    public string DataType    { get; set; }  // "Numeric(8,2)" | "VarChar(100)" | "Date" | etc.
    public string Domain      { get; set; }  // Dominio GX si aplica
    public string Description { get; set; }
}
```

---

## 7. Tipos de Objetos GeneXus — Prioridad de Soporte

### Fase 1 — MVP (implementar primero)
| Tipo | Descripción | Frecuencia en KB típica |
|---|---|---|
| `Procedure` | Lógica de negocio pura, sin interfaz | Muy alta |
| `WebPanel` | Interfaz web + eventos | Muy alta |
| `Transaction` | Definición de entidad + reglas de negocio | Alta |
| `DataProvider` | Consultas estructuradas de datos | Alta |

### Fase 2
| Tipo | Descripción |
|---|---|
| `WebComponent` | Componentes de UI reutilizables |
| `BusinessComponent` | Abstracción de Transaction para lógica |
| `SDT` | Structured Data Type — tipos de datos complejos |

### Fase 3 / Futuro
- `ExternalObject`, `Menu`, `MasterPage`, `Image`, `StyleSheet`
- No aportan lógica de negocio procesable por IA

---

## 8. Estructura de Archivos de Salida

```
/output/
  /KB_{NombreDeLaKB}/
    _llm_context.md              ← LEER PRIMERO: resumen de la KB para el agente IA
    _index.json                  ← Índice global: lista todos los objetos con metadata
    _dependency_graph.json       ← Grafo completo de relaciones entre objetos
    /Procedures/
      CalcularIVA.md
      CalcularIVA.json
      ProcesarFactura.md
      ProcesarFactura.json
    /WebPanels/
      FacturaIngreso.md
      FacturaIngreso.json
    /Transactions/
      Factura.md
      Factura.json
    /DataProviders/
      ...
    /SDTs/
      ...
```

---

## 9. Formato de Archivos de Salida

### 9.1 Archivo `.md` por Objeto

```markdown
# [Tipo]: [Nombre]
**Módulo:** [Ruta del módulo dentro de la KB]
**Propósito:** [Descripción interna del objeto, si existe]
**Es objeto GAM:** [Sí / No]

## Interfaz de Usuario
[Solo para WebPanel/WebComponent. Omitir sección completa en otros tipos]

| Control | Tipo | Evento | Bloque de Código Asociado |
|---|---|---|---|
| BtnConfirmar | Button | Click | Event_BtnConfirmar_Click |

## Lógica de Negocio

### [Nombre del bloque — ej: "Source" o "Event BtnConfirmar.Click"]
```genexus
[Código fuente en texto plano]
```

## Dependencias
- **Llama a:** `ObjetoA` (Procedure), `ObjetoB` (WebPanel)
- **Es llamado por:** `ObjetoC` (WebPanel), `ObjetoD` (Procedure)
- **Lee de tablas:** `Factura`, `Cliente`
- **Escribe en tablas:** `FacturaDetalle`
- **Usa SDTs:** `SDTLineasFactura`

## Diccionario de Datos
| Nombre | Tipo | Categoría | Descripción |
|---|---|---|---|
| FacturaId | Numeric(8) | Variable | Identificador de factura |
| ClienteId | Numeric(6) | Parámetro | FK hacia tabla Cliente |
```

### 9.2 Archivo `_llm_context.md` (raíz del output)

```markdown
# Contexto para Agente de IA — KB: [Nombre]
**Generado por:** GX KB Scanner v1.0
**Fecha de generación:** [timestamp]
**Versión GeneXus:** 18 Update 12

## Estadísticas
- Total de objetos: [N]
- Procedures: [N] | WebPanels: [N] | Transactions: [N] | SDTs: [N] | DataProviders: [N]

## Módulos Principales
[Lista de módulos con cantidad de objetos]

## Punto de Entrada Principal
[Objeto raíz de la aplicación, si se puede determinar]

## Nota sobre Objetos GAM
Esta KB tiene GAM instalado. Los objetos marcados con `isGAMObject: true`
son infraestructura de seguridad y autenticación. No forman parte de la
lógica de negocio principal.
```

### 9.3 Archivo `_index.json`

```json
{
  "kbName": "NombreDeLaKB",
  "generatedAt": "2026-04-21T10:00:00Z",
  "geneXusVersion": "18u12",
  "objects": [
    {
      "name": "CalcularIVA",
      "type": "Procedure",
      "module": "Facturación\\Cálculos",
      "isGAMObject": false,
      "filePath": "Procedures/CalcularIVA.md",
      "callsTo": ["ObtenerTasaIVA"],
      "calledBy": ["ProcesarFactura", "FacturaIngreso"],
      "tablesAccessed": ["TasaImpuesto"]
    }
  ]
}
```

---

## 10. Configuración de la Aplicación

El scanner debe leer su configuración de un archivo `GXScannerConfig.json` ubicado junto al ejecutable:

```json
{
  "kbPath": "C:\\Proyectos\\MiKB\\MiKB.gxw",
  "outputPath": "C:\\Output\\KBScanner",
  "geneXusInstallPath": "C:\\Program Files (x86)\\GeneXus\\GeneXus18",
  "options": {
    "includeGAMObjects": true,
    "parallelProcessing": false,
    "objectTypesToProcess": ["Procedure", "WebPanel", "Transaction", "DataProvider"],
    "excludeModules": [],
    "logLevel": "Information"
  }
}
```

---

## 11. Riesgos Técnicos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El código fuente GX viene en formato RTF interno | Alta | Alto | Implementar `RtfStripper` utilitario. Las cadenas RTF comienzan con `{\rtf`. Detectar y limpiar antes de escribir al modelo. |
| Relaciones de dependencia no siempre son explícitas en el SDK | Alta | Alto | Fallback: hacer parsing del `SourceCode` con regex para detectar patrones `NombreObjeto.Call(` y `UDPs`. |
| KBs con 5000+ objetos tardan demasiado | Media | Medio | Implementar `Parallel.ForEach` en la Capa 2. El flag `parallelProcessing` en config lo controla. |
| Objetos con mismo nombre en módulos distintos | Baja | Alto | Usar `{Módulo}/{Nombre}` como clave compuesta en el `_index.json`. El nombre del archivo puede ser `{Módulo}_{Nombre}.md`. |
| Inicialización del SDK falla si GX no está en PATH | Media | Alto | Verificar en el startup que `geneXusInstallPath` existe y tiene las DLLs esperadas. Lanzar error descriptivo antes de intentar cargar. |
| Objetos corrompidos o incompletos en KB | Baja | Bajo | Wrap de cada objeto en try/catch individual. Registrar en log y continuar. Nunca abortar el proceso completo por un objeto. |
| Nombres de propiedades del SDK no documentados | Alta | Medio | Usar reflexión para inspeccionar las DLLs si la documentación no existe. Comunidad GX en foros de GeneXus.com tiene ejemplos. |

---

## 12. Casos de Prueba

### 12.1 Pruebas de Entorno (antes de cualquier otra prueba)

| ID | Prueba | Criterio de éxito |
|---|---|---|
| ENV-01 | Verificar que el ejecutable corre como x86 | `IntPtr.Size == 4` en runtime |
| ENV-02 | Verificar que las DLLs del SDK están accesibles | `File.Exists` en las 5 DLLs de núcleo |
| ENV-03 | Verificar que el archivo .gxw existe y es accesible | `File.Exists(config.kbPath)` |
| ENV-04 | Verificar que el directorio de salida es escribible | Crear y eliminar un archivo de prueba |

### 12.2 Pruebas de Apertura de KB

| ID | Prueba | Criterio de éxito |
|---|---|---|
| KB-01 | Abrir una KB válida | No lanza excepción, retorna objeto KB no nulo |
| KB-02 | Abrir una ruta inválida | Lanza excepción descriptiva (no NullReferenceException genérico) |
| KB-03 | Listar todos los objetos | Retorna colección con al menos 1 elemento |
| KB-04 | Obtener objeto por nombre conocido | Retorna el objeto correcto |
| KB-05 | Clasificar objetos por tipo | Los conteos por tipo suman el total |

### 12.3 Pruebas de Parser — Procedure

| ID | Prueba | Criterio de éxito |
|---|---|---|
| PROC-01 | Parsear un Procedure simple con Source | `BusinessLogic` contiene 1 bloque con código no vacío |
| PROC-02 | Extraer parámetros de entrada/salida | `DataDictionary` contiene elementos con `ElementType == "Parameter"` |
| PROC-03 | Detectar llamadas a otros objetos (.Call) | `Dependencies.CallsTo` contiene los objetos llamados |
| PROC-04 | Detectar tablas accedidas | `Dependencies.TablesRead` no está vacío para procedures con For Each |
| PROC-05 | El SourceCode no contiene marcas RTF | `SourceCode` no contiene la cadena `{\rtf` |
| PROC-06 | Procedure vacío (sin código) | No lanza excepción, `BusinessLogic` es lista vacía |

### 12.4 Pruebas de Parser — WebPanel

| ID | Prueba | Criterio de éxito |
|---|---|---|
| WP-01 | Detectar controles del form | `InterfaceElements` contiene los controles definidos |
| WP-02 | Asociar evento Click a su bloque de código | `UIControl.AssociatedCodeBlockName` apunta a un `CodeBlock` existente |
| WP-03 | Extraer evento Load/Start | `BusinessLogic` contiene bloque de tipo "Event" con nombre "Start" o "Load" |
| WP-04 | Detectar Grid con evento Enter | `InterfaceElements` contiene control tipo "Grid" con evento "Enter" |
| WP-05 | WebPanel sin controles (solo lógica) | `InterfaceElements` es lista vacía, no lanza excepción |

### 12.5 Pruebas de Grafo de Dependencias

| ID | Prueba | Criterio de éxito |
|---|---|---|
| DEP-01 | Construir "CalledBy" en segunda pasada | Si A llama a B, entonces B.CalledBy contiene A |
| DEP-02 | Consistencia bidireccional | Para todo X en A.CallsTo, A debe estar en X.CalledBy |
| DEP-03 | Sin referencias circulares infinitas | El grafo se construye sin stackoverflow (ciclos permitidos, bucles infinitos no) |
| DEP-04 | Objeto no llamado por nadie | `CalledBy` es lista vacía (no null) |

### 12.6 Pruebas de Output

| ID | Prueba | Criterio de éxito |
|---|---|---|
| OUT-01 | Archivo .md generado por objeto | Un archivo existe en la ruta esperada para cada objeto procesado |
| OUT-02 | Archivo .json generado por objeto | JSON parseable sin errores (`JsonDocument.Parse` sin excepción) |
| OUT-03 | `_index.json` contiene todos los objetos | Count en JSON == count de objetos procesados |
| OUT-04 | `_llm_context.md` existe y tiene estadísticas | Archivo existe, contiene totales por tipo que coinciden con el índice |
| OUT-05 | Caracteres especiales en nombres de objetos | No falla con nombres que contienen espacios o caracteres no-ASCII |
| OUT-06 | Carpetas de módulos creadas correctamente | La estructura de carpetas refleja la organización de módulos de la KB |

### 12.7 Pruebas de Resiliencia

| ID | Prueba | Criterio de éxito |
|---|---|---|
| RES-01 | Un objeto corrompido no aborta el proceso | El scanner continúa procesando los demás objetos, el objeto fallido aparece en el log |
| RES-02 | KB con 0 objetos | El scanner termina normalmente, genera un `_index.json` con array vacío |
| RES-03 | Objeto con nombre duplicado en módulos distintos | Ambos archivos se generan con nombres únicos (usando el módulo como prefijo) |
| RES-04 | Cancelación con Ctrl+C | El proceso termina limpiamente sin dejar archivos corruptos a medias |

---

## 13. Estructura de Proyecto Recomendada

```
GXKBScanner/
  GXKBScanner.sln
  GXKBScanner/
    GXKBScanner.csproj          ← net48, x86, referencias al SDK
    Program.cs                  ← Entry point, lectura de config, orquestación
    GXScannerConfig.json        ← Configuración (no compilar, CopyAlways)
    Models/
      GXObjectModel.cs
      UIControl.cs
      CodeBlock.cs
      DependencyInfo.cs
      DataElement.cs
    Bridge/
      KnowledgeBaseReader.cs    ← Capa 1: único archivo que toca el SDK de GX
    Parsers/
      IObjectParser.cs          ← Interfaz común
      ProcedureParser.cs
      WebPanelParser.cs
      TransactionParser.cs
      DataProviderParser.cs
      RtfStripper.cs            ← Utilitario: limpia RTF de strings del SDK
    Processing/
      DependencyGraphBuilder.cs ← Capa 3: segunda pasada
    Writers/
      MarkdownWriter.cs
      JsonWriter.cs
      IndexWriter.cs
    GXKBScanner.Tests/
      GXKBScanner.Tests.csproj  ← xUnit, net48, x86
      EnvTests.cs
      ParserTests.cs
      DependencyTests.cs
      OutputTests.cs
```

---

## 14. Configuración del .csproj Principal

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net48</TargetFramework>
    <LangVersion>10.0</LangVersion>
    <PlatformTarget>x86</PlatformTarget>
    <Nullable>enable</Nullable>
    <RootNamespace>GXKBScanner</RootNamespace>
    <AssemblyName>GXKBScanner</AssemblyName>
  </PropertyGroup>

  <ItemGroup>
    <Reference Include="Artech.Architecture.Common">
      <HintPath>C:\Program Files (x86)\GeneXus\GeneXus18\Artech.Architecture.Common.dll</HintPath>
      <Private>false</Private>
    </Reference>
    <Reference Include="Artech.Genexus.Common">
      <HintPath>C:\Program Files (x86)\GeneXus\GeneXus18\Artech.Genexus.Common.dll</HintPath>
      <Private>false</Private>
    </Reference>
    <Reference Include="Artech.Common">
      <HintPath>C:\Program Files (x86)\GeneXus\GeneXus18\Artech.Common.dll</HintPath>
      <Private>false</Private>
    </Reference>
    <Reference Include="Artech.Common.Helpers">
      <HintPath>C:\Program Files (x86)\GeneXus\GeneXus18\Artech.Common.Helpers.dll</HintPath>
      <Private>false</Private>
    </Reference>
    <Reference Include="Artech.Udm.Framework">
      <HintPath>C:\Program Files (x86)\GeneXus\GeneXus18\Artech.Udm.Framework.dll</HintPath>
      <Private>false</Private>
    </Reference>
  </ItemGroup>

  <ItemGroup>
    <None Update="GXScannerConfig.json">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </None>
  </ItemGroup>
</Project>
```

---

## 15. Roadmap de Fases

### Fase 1 — Proof of Concept (objetivo: validar que el SDK funciona)
1. Crear la solución con la configuración de .csproj descrita arriba
2. Implementar solo `KnowledgeBaseReader.cs`
3. Abrir una KB y listar todos los objetos por tipo en consola
4. **Criterio de éxito:** La consola muestra una lista de objetos sin errores de runtime

### Fase 2 — MVP (objetivo: generar archivos útiles)
1. Implementar parsers para `Procedure` y `WebPanel`
2. Implementar `MarkdownWriter` y `JsonWriter`
3. Implementar `RtfStripper`
4. Generar archivos `.md` y `.json` para todos los Procedures y WebPanels de la KB
5. **Criterio de éxito:** Los archivos generados son legibles y contienen código fuente limpio

### Fase 3 — Grafo Completo (objetivo: conectar los módulos)
1. Implementar `DependencyGraphBuilder` (segunda pasada)
2. Agregar parsers para `Transaction` y `DataProvider`
3. Generar `_index.json` y `_dependency_graph.json`
4. Generar `_llm_context.md`
5. **Criterio de éxito:** Un agente de IA puede responder "¿qué objetos participan en el proceso X?"

### Fase 4 — Robustez (objetivo: uso en producción)
1. Activar `Parallel.ForEach` con control de concurrencia
2. Modo incremental: solo exportar objetos modificados desde la última ejecución
3. Soporte para SDTs y Business Components
4. Suite de pruebas completa pasando al 100%

---

## 16. Lo que Explícitamente NO debe hacerse

- **No usar .NET 6, .NET 7 ni .NET 8** para este proyecto. Solo .NET Framework 4.8.
- **No compilar como x64 ni AnyCPU**. Solo x86.
- **No copiar las DLLs de GeneXus** al directorio de output del proyecto.
- **No intentar abrir el .gxw directamente con SQLite** ni con SqlConnection. Usar siempre el SDK.
- **No abortar el proceso completo** si un objeto individual falla. Loggear y continuar.
- **No asumir que el SourceCode es texto plano**. Siempre pasar por `RtfStripper` antes de escribir.
- **No intentar soportar GeneXus 17 o anterior** en v1. El SDK de GX18 no es compatible hacia atrás.
- **No crear una interfaz gráfica** en v1. Consola pura.
- **No modificar ni escribir en la KB** bajo ninguna circunstancia.
- **No generar código ejecutable** a partir del contenido extraído. Solo documentación.
