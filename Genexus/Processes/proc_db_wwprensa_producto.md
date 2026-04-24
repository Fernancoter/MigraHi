# Proceso: PrensaProducto

- **Entry point:** [WWPrensaProducto](../WebPanels/DB/WWPrensaProducto.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Referencias > PrensaProducto`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Root`
- **Mergeado con:** `PrensaProducto` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_wwprensa_producto.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PrensaProducto](../Transactions/DB/PrensaProducto.md) (`Transaction`, `DB`)
- depth 0: [WWPrensaProducto](../WebPanels/DB/WWPrensaProducto.md) (`WebPanel`, `DB`)
- depth 1: [ViewPrensaProducto](../WebPanels/DB/ViewPrensaProducto.md) (`WebPanel`, `DB`)
- depth 1: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 1: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `PrensaProducto`
- **Tablas escritas:** `PrensaProducto`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [PrensaProducto](../_domain_glossary.md#prensaproducto)
