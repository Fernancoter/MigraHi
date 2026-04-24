# Proceso: Operadores

- **Entry point:** [WWOperador](../WebPanels/DB/WWOperador.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Operadores`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Root`
- **Mergeado con:** `Operador` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_wwoperador.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Operador](../Transactions/DB/Operador.md) (`Transaction`, `DB`)
- depth 0: [WWOperador](../WebPanels/DB/WWOperador.md) (`WebPanel`, `DB`)
- depth 1: [ViewOperador](../WebPanels/DB/ViewOperador.md) (`WebPanel`, `DB`)
- depth 1: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 1: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Operador`
- **Tablas escritas:** `Operador`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Operador](../_domain_glossary.md#operador)
