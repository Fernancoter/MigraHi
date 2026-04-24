# Proceso: Extrusora Mezcladora

- **Entry point:** [ListarExtrusoraMezcladora](../WebPanels/Produccion/ListarExtrusoraMezcladora.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Referencias > Extrusora Mezcladora`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 12
- **Módulos tocados:** `DB`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_extrusora_mezcladora.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ListarExtrusoraMezcladora](../WebPanels/Produccion/ListarExtrusoraMezcladora.md) (`WebPanel`, `Produccion`)
- depth 1: [ExtrusoraMezcladora](../Transactions/DB/ExtrusoraMezcladora.md) (`Transaction`, `DB`)
- depth 1: [ExtrusoraMezcladoraView](../WebPanels/DB/ExtrusoraMezcladoraView.md) (`WebPanel`, `DB`)
- depth 1: [gestionarExtrusoraMezcladora](../WebPanels/Produccion/gestionarExtrusoraMezcladora.md) (`WebPanel`, `Produccion`)
- depth 1: [ListarExtrusoraMezcladoraExport](../Procedures/Produccion/ListarExtrusoraMezcladoraExport.md) (`Procedure`, `Produccion`)
- depth 1: [ListarExtrusoraMezcladoraExportReport](../Procedures/Produccion/ListarExtrusoraMezcladoraExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [ListarExtrusoraMezcladoraGetFilterData](../Procedures/Produccion/ListarExtrusoraMezcladoraGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [ExtrusoraMezcladoraWW](../WebPanels/DB/ExtrusoraMezcladoraWW.md) (`WebPanel`, `DB`)
- depth 2: [LoadAuditExtrusoraMezcladora](../Procedures/DB/LoadAuditExtrusoraMezcladora.md) (`Procedure`, `DB`)
- depth 3: [ExtrusoraMezcladoraWWExport](../Procedures/DB/ExtrusoraMezcladoraWWExport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusoraMezcladoraWWExportReport](../Procedures/DB/ExtrusoraMezcladoraWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusoraMezcladoraWWGetFilterData](../Procedures/DB/ExtrusoraMezcladoraWWGetFilterData.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `DB.ExtrusoraMezcladora`, `ExtrusoraMezcladora`
- **Tablas escritas:** `DB.ExtrusoraMezcladora`, `ExtrusoraMezcladora`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [ExtrusoraMezcladora](../_domain_glossary.md#extrusoramezcladora)
