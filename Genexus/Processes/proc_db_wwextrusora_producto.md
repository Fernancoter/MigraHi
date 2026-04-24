# Proceso: ExtrusoraProducto

- **Entry point:** [WWExtrusoraProducto](../WebPanels/DB/WWExtrusoraProducto.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Referencias > ExtrusoraProducto`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 14
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Root`
- **Mergeado con:** `ExtrusoraProducto` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_wwextrusora_producto.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ExtrusoraProducto](../Transactions/DB/ExtrusoraProducto.md) (`Transaction`, `DB`)
- depth 0: [WWExtrusoraProducto](../WebPanels/DB/WWExtrusoraProducto.md) (`WebPanel`, `DB`)
- depth 1: [ViewExtrusora](../WebPanels/DB/ViewExtrusora.md) (`WebPanel`, `DB`)
- depth 1: [ViewExtrusoraProducto](../WebPanels/DB/ViewExtrusoraProducto.md) (`WebPanel`, `DB`)
- depth 1: [ViewProducto](../WebPanels/DB/ViewProducto.md) (`WebPanel`, `DB`)
- depth 1: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 1: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [WWExtrusora](../WebPanels/DB/WWExtrusora.md) (`WebPanel`, `DB`)
- depth 2: [WWProducto](../WebPanels/DB/WWProducto.md) (`WebPanel`, `DB`)
- depth 2: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)
- depth 3: [Extrusora](../Transactions/DB/Extrusora.md) (`Transaction`, `DB`)
- depth 3: [Producto](../Transactions/DB/Producto.md) (`Transaction`, `DB`)
- depth 3: [ViewProductoCategoria](../WebPanels/DB/ViewProductoCategoria.md) (`WebPanel`, `DB`)
- depth 4: [WWProductoCategoria](../WebPanels/DB/WWProductoCategoria.md) (`WebPanel`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Extrusora`, `ExtrusoraProducto`, `Producto`
- **Tablas escritas:** `Extrusora`, `ExtrusoraProducto`, `Producto`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Extrusora](../_domain_glossary.md#extrusora)
- [ExtrusoraProducto](../_domain_glossary.md#extrusoraproducto)
- [Producto](../_domain_glossary.md#producto)
