# Proceso: Productos

- **Entry point:** [WWProducto](../WebPanels/DB/WWProducto.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Productos`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 9
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Root`
- **Mergeado con:** `Producto` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_wwproducto.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Producto](../Transactions/DB/Producto.md) (`Transaction`, `DB`)
- depth 0: [WWProducto](../WebPanels/DB/WWProducto.md) (`WebPanel`, `DB`)
- depth 1: [ViewProducto](../WebPanels/DB/ViewProducto.md) (`WebPanel`, `DB`)
- depth 1: [ViewProductoCategoria](../WebPanels/DB/ViewProductoCategoria.md) (`WebPanel`, `DB`)
- depth 1: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 1: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [WWProductoCategoria](../WebPanels/DB/WWProductoCategoria.md) (`WebPanel`, `DB`)
- depth 2: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)
- depth 3: [ProductoCategoria](../Transactions/DB/ProductoCategoria.md) (`Transaction`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Producto`, `ProductoCategoria`
- **Tablas escritas:** `Producto`, `ProductoCategoria`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Producto](../_domain_glossary.md#producto)
- [ProductoCategoria](../_domain_glossary.md#productocategoria)
