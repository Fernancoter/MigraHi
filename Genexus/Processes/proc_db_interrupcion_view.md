# Proceso: InterrupcionView

- **Entry point:** [InterrupcionView](../WebPanels/DB/InterrupcionView.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.vwAnaliticaBobina`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`
- **Mergeado con:** `InterrupcionWW`, `Interrupcion` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_interrupcion_view.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Interrupcion](../Transactions/DB/Interrupcion.md) (`Transaction`, `DB`)
- depth 0: [InterrupcionView](../WebPanels/DB/InterrupcionView.md) (`WebPanel`, `DB`)
- depth 0: [InterrupcionWW](../WebPanels/DB/InterrupcionWW.md) (`WebPanel`, `DB`)
- depth 1: [InterrupcionWWExport](../Procedures/DB/InterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 1: [InterrupcionWWExportReport](../Procedures/DB/InterrupcionWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [InterrupcionWWGetFilterData](../Procedures/DB/InterrupcionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [LoadAuditInterrupcion](../Procedures/DB/LoadAuditInterrupcion.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Interrupcion`
- **Tablas escritas:** `Interrupcion`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Interrupcion](../_domain_glossary.md#interrupcion)
