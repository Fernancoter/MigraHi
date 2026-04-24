# Proceso: Cierre de Mes

- **Entry point:** [listarInventario](../WebPanels/Produccion/listarInventario.md) -- tipo menú
- **Ruta en el menú:** `Web > Inventarios > Cierre de Mes`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 13
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_inventario.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarInventario](../WebPanels/Produccion/listarInventario.md) (`WebPanel`, `Produccion`)
- depth 1: [Inventario](../Transactions/DB/Inventario.md) (`Transaction`, `DB`)
- depth 1: [gestionarInventario](../WebPanels/Produccion/gestionarInventario.md) (`WebPanel`, `Produccion`)
- depth 1: [listarInventarioExport](../Procedures/Produccion/listarInventarioExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarInventarioExportReport](../Procedures/Produccion/listarInventarioExportReport.md) (`Procedure`, `Produccion`)
- depth 2: [LoadAuditInventario](../Procedures/DB/LoadAuditInventario.md) (`Procedure`, `DB`)
- depth 2: [ViewInventario](../WebPanels/DB/ViewInventario.md) (`WebPanel`, `DB`)
- depth 2: [WWInventario](../WebPanels/DB/WWInventario.md) (`WebPanel`, `DB`)
- depth 2: [SDTProductoCategoria](../SDTs/Produccion/SDTProductoCategoria.md) (`SDT`, `Produccion`)
- depth 2: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)
- depth 3: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `DB.Inventario`, `Inventario`
- **Tablas escritas:** `DB.Inventario`, `Inventario`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Inventario](../_domain_glossary.md#inventario)
