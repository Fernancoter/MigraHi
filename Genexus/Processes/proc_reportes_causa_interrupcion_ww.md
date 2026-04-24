# Proceso: Causas Interrupción

- **Entry point:** [CausaInterrupcionWW](../WebPanels/Reportes/CausaInterrupcionWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes HC > Observaciones > Causas Interrupción`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `Reportes`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_causa_interrupcion_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CausaInterrupcionWW](../WebPanels/Reportes/CausaInterrupcionWW.md) (`WebPanel`, `Reportes`)
- depth 1: [CausaInterrupcion](../Transactions/Reportes/CausaInterrupcion.md) (`Transaction`, `Reportes`)
- depth 1: [CausaInterrupcionView](../WebPanels/Reportes/CausaInterrupcionView.md) (`WebPanel`, `Reportes`)
- depth 1: [CausaInterrupcionWWExport](../Procedures/Reportes/CausaInterrupcionWWExport.md) (`Procedure`, `Reportes`)
- depth 1: [CausaInterrupcionWWExportReport](../Procedures/Reportes/CausaInterrupcionWWExportReport.md) (`Procedure`, `Reportes`)
- depth 1: [CausaInterrupcionWWGetFilterData](../Procedures/Reportes/CausaInterrupcionWWGetFilterData.md) (`Procedure`, `Reportes`)
- depth 2: [LoadAuditCausaInterrupcion](../Procedures/Reportes/LoadAuditCausaInterrupcion.md) (`Procedure`, `Reportes`)

## Efectos en datos

- **Tablas leídas:** `CausaInterrupcion`
- **Tablas escritas:** `CausaInterrupcion`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [CausaInterrupcion](../_domain_glossary.md#causainterrupcion)
