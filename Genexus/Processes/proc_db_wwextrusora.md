# Proceso: Extrusoras

- **Entry point:** [WWExtrusora](../WebPanels/DB/WWExtrusora.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Extrusoras`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Root`
- **Mergeado con:** `Extrusora` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_wwextrusora.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Extrusora](../Transactions/DB/Extrusora.md) (`Transaction`, `DB`)
- depth 0: [WWExtrusora](../WebPanels/DB/WWExtrusora.md) (`WebPanel`, `DB`)
- depth 1: [ViewExtrusora](../WebPanels/DB/ViewExtrusora.md) (`WebPanel`, `DB`)
- depth 1: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 1: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Extrusora`
- **Tablas escritas:** `Extrusora`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Extrusora](../_domain_glossary.md#extrusora)
