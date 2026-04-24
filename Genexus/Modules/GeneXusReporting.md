# Módulo: GeneXusReporting

## Propósito

Módulo con 13 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Embarques, Produccion, SAE.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| SDTs | 13 |
| **Total** | **13** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

_(sin llamadas salientes a otros módulos)_

### Este módulo ES LLAMADO por

- [Produccion](Produccion.md) (64): TurnosPorSemanaExtrusoras -> QueryViewerFilterChangedData; TurnosPorSemana -> QueryViewerFilterChangedData; InicioPrensado -> QueryViewerFilterChangedData; InicioProduccion -> QueryViewerFilterChangedData; InicioInventario -> QueryViewerFilterChangedData _(+59 más)_
- [Web](Web.md) (16): ModuleA -> QueryViewerFilterChangedData; ModuleB -> QueryViewerFilterChangedData; ModuleA -> QueryViewerDragAndDropData; ModuleB -> QueryViewerDragAndDropData; ModuleA -> QueryViewerElements _(+11 más)_
- [Embarques](Embarques.md) (8): InicioEmbarques -> QueryViewerFilterChangedData; InicioEmbarques -> QueryViewerDragAndDropData; InicioEmbarques -> QueryViewerElements; InicioEmbarques -> QueryViewerItemCollapseData; InicioEmbarques -> QueryViewerItemExpandData _(+3 más)_
- [SAE](SAE.md) (8): ReportITW -> QueryViewerFilterChangedData; ReportITW -> QueryViewerDragAndDropData; ReportITW -> QueryViewerElements; ReportITW -> QueryViewerItemCollapseData; ReportITW -> QueryViewerItemExpandData _(+3 más)_
- [Seguridad](Seguridad.md) (8): inicioSeguridad -> QueryViewerFilterChangedData; inicioSeguridad -> QueryViewerDragAndDropData; inicioSeguridad -> QueryViewerElements; inicioSeguridad -> QueryViewerItemCollapseData; inicioSeguridad -> QueryViewerItemExpandData _(+3 más)_

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Embarques, Produccion, SAE, Seguridad, Web**.

