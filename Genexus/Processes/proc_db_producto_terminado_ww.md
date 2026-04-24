# Proceso: ProductoTerminadoWW

- **Entry point:** [ProductoTerminadoWW](../WebPanels/DB/ProductoTerminadoWW.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 5
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_producto_terminado_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ProductoTerminadoWW](../WebPanels/DB/ProductoTerminadoWW.md) (`WebPanel`, `DB`)
- depth 1: [ProductoTerminadoView](../WebPanels/DB/ProductoTerminadoView.md) (`WebPanel`, `DB`)
- depth 1: [ProductoTerminadoWWExport](../Procedures/DB/ProductoTerminadoWWExport.md) (`Procedure`, `DB`)
- depth 1: [ProductoTerminadoWWExportReport](../Procedures/DB/ProductoTerminadoWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [ProductoTerminadoWWGetFilterData](../Procedures/DB/ProductoTerminadoWWGetFilterData.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `ProductoTerminado`
- **Tablas escritas:** ``
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
