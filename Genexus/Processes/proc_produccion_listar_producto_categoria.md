# Proceso: Categorías

- **Entry point:** [listarProductoCategoria](../WebPanels/Produccion/listarProductoCategoria.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Categorías`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 11
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_producto_categoria.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarProductoCategoria](../WebPanels/Produccion/listarProductoCategoria.md) (`WebPanel`, `Produccion`)
- depth 1: [ProductoCategoria](../Transactions/DB/ProductoCategoria.md) (`Transaction`, `DB`)
- depth 1: [gestionarProductoCategoria](../WebPanels/Produccion/gestionarProductoCategoria.md) (`WebPanel`, `Produccion`)
- depth 1: [listarProductoCategoriaExport](../Procedures/Produccion/listarProductoCategoriaExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarProductoCategoriaExportReport](../Procedures/Produccion/listarProductoCategoriaExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarProductoCategoriaGetFilterData](../Procedures/Produccion/listarProductoCategoriaGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [ViewProductoCategoria](../WebPanels/DB/ViewProductoCategoria.md) (`WebPanel`, `DB`)
- depth 2: [WWProductoCategoria](../WebPanels/DB/WWProductoCategoria.md) (`WebPanel`, `DB`)
- depth 2: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `DB.ProductoCategoria`, `ProductoCategoria`
- **Tablas escritas:** `DB.ProductoCategoria`, `ProductoCategoria`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [ProductoCategoria](../_domain_glossary.md#productocategoria)
