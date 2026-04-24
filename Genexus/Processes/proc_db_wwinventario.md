# Proceso: Inventarios

- **Entry point:** [WWInventario](../WebPanels/DB/WWInventario.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Inventarios`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Root`
- **Mergeado con:** `Inventario` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_wwinventario.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Inventario](../Transactions/DB/Inventario.md) (`Transaction`, `DB`)
- depth 0: [WWInventario](../WebPanels/DB/WWInventario.md) (`WebPanel`, `DB`)
- depth 1: [LoadAuditInventario](../Procedures/DB/LoadAuditInventario.md) (`Procedure`, `DB`)
- depth 1: [ViewInventario](../WebPanels/DB/ViewInventario.md) (`WebPanel`, `DB`)
- depth 1: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 1: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Inventario`
- **Tablas escritas:** `Inventario`
- **SDTs usados:** `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Inventario](../_domain_glossary.md#inventario)
