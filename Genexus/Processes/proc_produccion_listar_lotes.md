# Proceso: Lotes

- **Entry point:** [listarLotes](../WebPanels/Produccion/listarLotes.md) -- tipo menú
- **Ruta en el menú:** `Web > Inventarios > Lotes`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 11
- **Módulos tocados:** `DB`, `Produccion`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_lotes.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarLotes](../WebPanels/Produccion/listarLotes.md) (`WebPanel`, `Produccion`)
- depth 1: [Lote](../Transactions/DB/Lote.md) (`Transaction`, `DB`)
- depth 1: [gestionarLote](../WebPanels/Produccion/gestionarLote.md) (`WebPanel`, `Produccion`)
- depth 1: [listarLotesExport](../Procedures/Produccion/listarLotesExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarLotesExportReport](../Procedures/Produccion/listarLotesExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarLotesGetFilterData](../Procedures/Produccion/listarLotesGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [LoadAuditLote](../Procedures/DB/LoadAuditLote.md) (`Procedure`, `DB`)
- depth 2: [Silo](../Transactions/DB/Silo.md) (`Transaction`, `DB`)
- depth 2: [SDTSilo](../SDTs/Produccion/SDTSilo.md) (`SDT`, `Produccion`)
- depth 2: [DVMessageGetBasicNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetBasicNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [DVMessageGetAdvancedNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetAdvancedNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `DB.Lote`, `Lote`, `Silo`
- **Tablas escritas:** `DB.Lote`, `Lote`, `Silo`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Lote](../_domain_glossary.md#lote)
- [Silo](../_domain_glossary.md#silo)
