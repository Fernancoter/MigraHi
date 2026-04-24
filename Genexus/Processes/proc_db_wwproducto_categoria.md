# Proceso: Categorías

- **Entry point:** [WWProductoCategoria](../WebPanels/DB/WWProductoCategoria.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Categorías`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Root`
- **Mergeado con:** `ProductoCategoria` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_wwproducto_categoria.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ProductoCategoria](../Transactions/DB/ProductoCategoria.md) (`Transaction`, `DB`)
- depth 0: [WWProductoCategoria](../WebPanels/DB/WWProductoCategoria.md) (`WebPanel`, `DB`)
- depth 1: [ViewProductoCategoria](../WebPanels/DB/ViewProductoCategoria.md) (`WebPanel`, `DB`)
- depth 1: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 1: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `ProductoCategoria`
- **Tablas escritas:** `ProductoCategoria`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [ProductoCategoria](../_domain_glossary.md#productocategoria)
