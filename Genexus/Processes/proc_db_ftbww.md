# Proceso: Report FTB

- **Entry point:** [FTBWW](../WebPanels/DB/FTBWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes > Report FTB`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 8
- **Módulos tocados:** `DB`, `SAE`
- **Mergeado con:** `UpdateFTB`, `FTB` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_ftbww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [FTB](../Transactions/DB/FTB.md) (`Transaction`, `DB`)
- depth 0: [FTBWW](../WebPanels/DB/FTBWW.md) (`WebPanel`, `DB`)
- depth 0: [UpdateFTB](../WebPanels/SAE/UpdateFTB.md) (`WebPanel`, `SAE`)
- depth 1: [FTBWWExport](../Procedures/DB/FTBWWExport.md) (`Procedure`, `DB`)
- depth 1: [FTBWWExportReport](../Procedures/DB/FTBWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [FTBWWGetFilterData](../Procedures/DB/FTBWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [LoadAuditFTB](../Procedures/DB/LoadAuditFTB.md) (`Procedure`, `DB`)
- depth 1: [SDTFTB](../SDTs/SAE/SDTFTB.md) (`SDT`, `SAE`)

## Efectos en datos

- **Tablas leídas:** `DB.FTB`, `FTB`
- **Tablas escritas:** `DB.FTB`, `FTB`
- **SDTs usados:** `GeneXus.Common.GridState`, `SDTFTB`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [FTB](../_domain_glossary.md#ftb)
