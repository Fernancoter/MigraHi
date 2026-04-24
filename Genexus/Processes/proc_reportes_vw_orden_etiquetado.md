# Proceso: Órdenes

- **Entry point:** [vwOrdenEtiquetado](../WebPanels/Reportes/vwOrdenEtiquetado.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes HC > Etiquetado > Órdenes`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`, `Reportes`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_vw_orden_etiquetado.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [vwOrdenEtiquetado](../WebPanels/Reportes/vwOrdenEtiquetado.md) (`WebPanel`, `Reportes`)
- depth 1: [OrdenEtiquetado](../Transactions/DB/OrdenEtiquetado.md) (`Transaction`, `DB`)
- depth 1: [EtiquetadoFormato](../WebPanels/Reportes/EtiquetadoFormato.md) (`WebPanel`, `Reportes`)
- depth 1: [vwOrdenEtiquetadoExport](../Procedures/Reportes/vwOrdenEtiquetadoExport.md) (`Procedure`, `Reportes`)
- depth 1: [vwOrdenEtiquetadoExportReport](../Procedures/Reportes/vwOrdenEtiquetadoExportReport.md) (`Procedure`, `Reportes`)
- depth 1: [vwOrdenEtiquetadoGetFilterData](../Procedures/Reportes/vwOrdenEtiquetadoGetFilterData.md) (`Procedure`, `Reportes`)

## Efectos en datos

- **Tablas leídas:** `OrdenEtiquetado`
- **Tablas escritas:** `OrdenEtiquetado`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [OrdenEtiquetado](../_domain_glossary.md#ordenetiquetado)
