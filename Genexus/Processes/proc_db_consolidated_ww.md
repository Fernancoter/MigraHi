# Proceso: ConsolidatedWW

- **Entry point:** [ConsolidatedWW](../WebPanels/DB/ConsolidatedWW.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_consolidated_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ConsolidatedWW](../WebPanels/DB/ConsolidatedWW.md) (`WebPanel`, `DB`)
- depth 1: [Consolidated](../Transactions/DB/Consolidated.md) (`Transaction`, `DB`)
- depth 1: [ConsolidatedWWExport](../Procedures/DB/ConsolidatedWWExport.md) (`Procedure`, `DB`)
- depth 1: [ConsolidatedWWExportReport](../Procedures/DB/ConsolidatedWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [ConsolidatedWWGetFilterData](../Procedures/DB/ConsolidatedWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [LoadAuditConsolidated](../Procedures/DB/LoadAuditConsolidated.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Consolidated`
- **Tablas escritas:** `Consolidated`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Consolidated](../_domain_glossary.md#consolidated)
