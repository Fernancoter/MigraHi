# Proceso: Pedidos

- **Entry point:** [ListadoOrdenes](../WebPanels/Embarques/ListadoOrdenes.md) -- tipo menú
- **Ruta en el menú:** `Web > Embarques > Pedidos`
- **Módulo principal:** `Embarques`
- **Objetos en el proceso:** 5
- **Módulos tocados:** `DB`, `Embarques`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_embarques_listado_ordenes.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ListadoOrdenes](../WebPanels/Embarques/ListadoOrdenes.md) (`WebPanel`, `Embarques`)
- depth 1: [Order](../Transactions/DB/Order.md) (`Transaction`, `DB`)
- depth 1: [ListadoOrdenesExport](../Procedures/Embarques/ListadoOrdenesExport.md) (`Procedure`, `Embarques`)
- depth 1: [ListadoOrdenesExportReport](../Procedures/Embarques/ListadoOrdenesExportReport.md) (`Procedure`, `Embarques`)
- depth 1: [ListadoOrdenesGetFilterData](../Procedures/Embarques/ListadoOrdenesGetFilterData.md) (`Procedure`, `Embarques`)

## Efectos en datos

- **Tablas leídas:** `Order`
- **Tablas escritas:** `Order`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Order](../_domain_glossary.md#order)
