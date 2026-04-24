# Proceso: ExtrusoraMezcladora

- **Entry point:** [ExtrusoraMezcladoraWW](../WebPanels/DB/ExtrusoraMezcladoraWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Referencias > ExtrusoraMezcladora`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`
- **Mergeado con:** `ExtrusoraMezcladoraView`, `ExtrusoraMezcladora` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_extrusora_mezcladora_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ExtrusoraMezcladora](../Transactions/DB/ExtrusoraMezcladora.md) (`Transaction`, `DB`)
- depth 0: [ExtrusoraMezcladoraView](../WebPanels/DB/ExtrusoraMezcladoraView.md) (`WebPanel`, `DB`)
- depth 0: [ExtrusoraMezcladoraWW](../WebPanels/DB/ExtrusoraMezcladoraWW.md) (`WebPanel`, `DB`)
- depth 1: [ExtrusoraMezcladoraWWExport](../Procedures/DB/ExtrusoraMezcladoraWWExport.md) (`Procedure`, `DB`)
- depth 1: [ExtrusoraMezcladoraWWExportReport](../Procedures/DB/ExtrusoraMezcladoraWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [ExtrusoraMezcladoraWWGetFilterData](../Procedures/DB/ExtrusoraMezcladoraWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [LoadAuditExtrusoraMezcladora](../Procedures/DB/LoadAuditExtrusoraMezcladora.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `ExtrusoraMezcladora`
- **Tablas escritas:** `ExtrusoraMezcladora`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [ExtrusoraMezcladora](../_domain_glossary.md#extrusoramezcladora)
