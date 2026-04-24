# Proceso: OrdenesWW

- **Entry point:** [OrdenesWW](../WebPanels/Embarques/OrdenesWW.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `Embarques`
- **Objetos en el proceso:** 5
- **Módulos tocados:** `DB`, `Embarques`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_embarques_ordenes_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [OrdenesWW](../WebPanels/Embarques/OrdenesWW.md) (`WebPanel`, `Embarques`)
- depth 1: [Order](../Transactions/DB/Order.md) (`Transaction`, `DB`)
- depth 1: [OrdenesWWExport](../Procedures/Embarques/OrdenesWWExport.md) (`Procedure`, `Embarques`)
- depth 1: [OrdenesWWExportReport](../Procedures/Embarques/OrdenesWWExportReport.md) (`Procedure`, `Embarques`)
- depth 1: [OrdenesWWGetFilterData](../Procedures/Embarques/OrdenesWWGetFilterData.md) (`Procedure`, `Embarques`)

## Efectos en datos

- **Tablas leídas:** `Order`
- **Tablas escritas:** `Order`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Order](../_domain_glossary.md#order)
