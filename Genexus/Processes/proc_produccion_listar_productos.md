# Proceso: Productos

- **Entry point:** [listarProductos](../WebPanels/Produccion/listarProductos.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Productos`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 19
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`, `SAE`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_productos.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarProductos](../WebPanels/Produccion/listarProductos.md) (`WebPanel`, `Produccion`)
- depth 1: [Producto](../Transactions/DB/Producto.md) (`Transaction`, `DB`)
- depth 1: [gestionarProducto](../WebPanels/Produccion/gestionarProducto.md) (`WebPanel`, `Produccion`)
- depth 1: [listarProductosExport](../Procedures/Produccion/listarProductosExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarProductosExportReport](../Procedures/Produccion/listarProductosExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarProductosGetFilterData](../Procedures/Produccion/listarProductosGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [ViewProducto](../WebPanels/DB/ViewProducto.md) (`WebPanel`, `DB`)
- depth 2: [WWProducto](../WebPanels/DB/WWProducto.md) (`WebPanel`, `DB`)
- depth 2: [DPCBProducto](../DataProviders/Produccion/DPCBProducto.md) (`DataProvider`, `Produccion`)
- depth 2: [ProductoDP](../DataProviders/Produccion/ProductoDP.md) (`DataProvider`, `Produccion`)
- depth 2: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 2: [SDTProductoCategoria](../SDTs/Produccion/SDTProductoCategoria.md) (`SDT`, `Produccion`)
- depth 2: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [ProductDP](../DataProviders/SAE/ProductDP.md) (`DataProvider`, `SAE`)
- depth 2: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 3: [ViewProductoCategoria](../WebPanels/DB/ViewProductoCategoria.md) (`WebPanel`, `DB`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)
- depth 4: [WWProductoCategoria](../WebPanels/DB/WWProductoCategoria.md) (`WebPanel`, `DB`)

## Efectos en datos

- **Tablas leídas:** `DB.Producto`, `Producto`
- **Tablas escritas:** `DB.Producto`, `Producto`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `SDTProducto`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `ProductoDP`
## Entidades relacionadas (del glosario)

- [Producto](../_domain_glossary.md#producto)
