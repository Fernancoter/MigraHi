# Arquitectura — HiCone3 (análisis de grafo)

Observaciones estructurales derivadas de `_index.json` y `_menu.json`. Todo claim aquí es traceable al grafo: conteos de objetos, aristas cross-module, o alcanzabilidad desde el menú. No hay interpretación de negocio.

## Modelo de capas

La KB usa un patrón de separación estricta entre **masters (datos)** y **lógica/UI**: `DB` concentra 53 de las 75 Transactions (71 %); los módulos funcionales (`Produccion`, `Embarques`, `Calidad`, `Reportes`, etc.) contienen Procedures, WebPanels, DataProviders y SDTs que **consumen** esas Transactions pero no definen las suyas propias.

| Módulo | Transactions | Otros objetos | Observación |
|---|---:|---:|---|
| `DB` | 53 | 187 | hub de masters |
| `WWPBaseObjects` | 4 | 124 | módulo con entidades secundarias |
| `Reportes` | 3 | 74 | módulo con entidades secundarias |
| `Calidad` | 3 | 27 | módulo con entidades secundarias |
| `WWPBaseObjects.Discussions` | 2 | 6 | módulo con entidades secundarias |
| `WWPBaseObjects.Notifications.Common` | 2 | 14 | módulo con entidades secundarias |
| `WWPBaseObjects.Mail` | 2 | 13 | módulo con entidades secundarias |
| `WWPBaseObjects.Notifications.Web` | 2 | 8 | módulo con entidades secundarias |
| `Downtime` | 1 | 9 | módulo con entidades secundarias |
| `WWPBaseObjects.Subscriptions` | 1 | 6 | módulo con entidades secundarias |
| `WWPBaseObjects.SMS` | 1 | 10 | módulo con entidades secundarias |
| `Root` | 1 | 73 | módulo con entidades secundarias |
| `GeneXus.OAuth.v2` | 0 | 2 | framework / infraestructura |
| `Embarques` | 0 | 49 | módulo funcional (consume DB) |
| `GeneXus.SD.Notifications` | 0 | 1 | framework / infraestructura |
| `SAE` | 0 | 26 | módulo funcional (consume DB) |
| `GeneXus.Server` | 0 | 1 | framework / infraestructura |
| `admin` | 0 | 4 | framework / infraestructura |
| `GeneXus.SD.Media` | 0 | 8 | módulo funcional (consume DB) |
| `GeneXusReporting` | 0 | 13 | módulo funcional (consume DB) |
| `Seguridad` | 0 | 4 | framework / infraestructura |
| `GeneXusUnanimo` | 0 | 5 | módulo funcional (consume DB) |
| `Existencia` | 0 | 11 | módulo funcional (consume DB) |
| `GeneXus.SD` | 0 | 11 | módulo funcional (consume DB) |
| `GeneXus.SD.Store` | 0 | 6 | módulo funcional (consume DB) |
| `Informes` | 0 | 5 | módulo funcional (consume DB) |
| `GeneXus.Common.Notifications` | 0 | 7 | módulo funcional (consume DB) |
| `Web` | 0 | 23 | módulo funcional (consume DB) |
| `PrinterSD` | 0 | 25 | módulo funcional (consume DB) |
| `GeneXus.SD.Synchronization` | 0 | 3 | framework / infraestructura |
| `GeneXus.Common` | 0 | 15 | módulo funcional (consume DB) |
| `GeneXus.Social` | 0 | 1 | framework / infraestructura |
| `WorkWithPlus.NativeMobile` | 0 | 60 | módulo funcional (consume DB) |
| `Produccion` | 0 | 392 | módulo funcional (consume DB) |

## Hubs de dependencias

Módulos ordenados por cantidad de llamadas entrantes cross-module. Un hub es un módulo del que muchos otros dependen -- su estabilidad afecta a todo lo corriente abajo.

| Rank | Módulo | Llamadas entrantes | Módulos distintos que lo llaman |
|---|---|---:|---:|
| 1 | `WWPBaseObjects` | 4427 | 17 |
| 2 | `DB` | 608 | 12 |
| 3 | `Produccion` | 141 | 11 |
| 4 | `GeneXusReporting` | 104 | 5 |
| 5 | `WWPBaseObjects.Subscriptions` | 76 | 11 |
| 6 | `GeneXus.Common` | 66 | 8 |
| 7 | `Root` | 44 | 4 |
| 8 | `Web` | 34 | 6 |
| 9 | `Informes` | 29 | 2 |
| 10 | `WWPBaseObjects.Discussions` | 28 | 6 |

## Transactions ocultas del menú

Transactions NO alcanzables vía BFS transitivo (sin cap de profundidad) desde los 75 WebPanels del menú. Estas entidades solo se acceden por caminos internos / inline links / utilidades de otros módulos. **14 de 75 Transactions** caen en este set.

| Trn | Módulo | `calledBy` directo (+otros módulos) |
|---|---|---|
| `BarCode` | `DB` | 0 (_(solo intra-módulo o sin callers resueltos)_) |
| `Company` | `DB` | 7 (_(solo intra-módulo o sin callers resueltos)_) |
| `Consolidated` | `DB` | 6 (_(solo intra-módulo o sin callers resueltos)_) |
| `Documento` | `DB` | 0 (_(solo intra-módulo o sin callers resueltos)_) |
| `EtiquetadoOperador` | `DB` | 10 (Produccion) |
| `ExistenciaProducto` | `DB` | 2 (Existencia) |
| `ExistenciaSilo` | `DB` | 2 (Existencia) |
| `LoteReporte` | `DB` | 0 (_(solo intra-módulo o sin callers resueltos)_) |
| `PrensaCarrera` | `DB` | 2 (Produccion) |
| `PrensaTroquel` | `DB` | 6 (Produccion) |
| `StatementOfIncome` | `DB` | 7 (_(solo intra-módulo o sin callers resueltos)_) |
| `DownTimeCode` | `Downtime` | 7 (_(solo intra-módulo o sin callers resueltos)_) |
| `PaletEtiquetaImpresa` | `Root` | 1 (_(solo intra-módulo o sin callers resueltos)_) |
| `WWP_DiscussionMessageMention` | `WWPBaseObjects.Discussions` | 1 (_(solo intra-módulo o sin callers resueltos)_) |

## Acoplamientos cross-module notables

Aristas con volumen **inusualmente alto** (top-10 pares) y aristas **inusualmente raras** (1 llamada, pares dirigidos) -- ambas son señales estructurales: las primeras indican acoplamiento fuerte; las segundas, posibles violaciones de capas o atajos puntuales.

### Aristas de alto volumen

| De | A | Llamadas |
|---|---|---:|
| `DB` | `WWPBaseObjects` | 1750 |
| `Produccion` | `WWPBaseObjects` | 1155 |
| `Reportes` | `WWPBaseObjects` | 543 |
| `Produccion` | `DB` | 378 |
| `Embarques` | `WWPBaseObjects` | 340 |
| `Root` | `WWPBaseObjects` | 198 |
| `Calidad` | `WWPBaseObjects` | 154 |
| `WWPBaseObjects.Mail` | `WWPBaseObjects` | 74 |
| `Downtime` | `WWPBaseObjects` | 70 |
| `Produccion` | `GeneXusReporting` | 64 |

### Aristas puntuales (1 sola llamada)

Cada fila aquí es un atajo o dependencia rara que vale la pena revisar -- a veces es deuda técnica, a veces un helper puntual válido.

| De | A | Caller | Target |
|---|---|---|---|
| `Calidad` | `Produccion` | ReclamoProductoDP | SDTProducto |
| `DB` | `Existencia` | ExistenciaWW | wpExistenciaMain |
| `Produccion` | `admin` | vwAnaliticaBobina | ImprimirBobinas |
| `Produccion` | `SAE` | gestionarProducto | ProductDP |

## Métricas globales

- Objetos parseados totales: **1298**
- Aristas `callsTo` totales: **7784**
- Aristas cross-module: **5709** (73.3 % del total)
- Módulos distintos: **34**
- Transactions totales: **75**, concentración en DB: **53** (70.7 %)
- Alcanzables desde el menú (BFS transitivo): **633** / 1298 (48.8 %)

---

Generado por [`Scripts/generate-architecture.ps1`](../../Users/GERARDO/Desktop/Genexus%20code/GXKBScanner/Scripts/generate-architecture.ps1). Regenerable.
