# Proceso: Producto Terminado

- **Entry point:** [listarProductoTerminado](../WebPanels/Produccion/listarProductoTerminado.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Referencias > Producto Terminado`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 5
- **Módulos tocados:** `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_producto_terminado.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarProductoTerminado](../WebPanels/Produccion/listarProductoTerminado.md) (`WebPanel`, `Produccion`)
- depth 1: [gestionarProductoTerminado](../WebPanels/Produccion/gestionarProductoTerminado.md) (`WebPanel`, `Produccion`)
- depth 1: [listarProductoTerminadoExport](../Procedures/Produccion/listarProductoTerminadoExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarProductoTerminadoExportReport](../Procedures/Produccion/listarProductoTerminadoExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarProductoTerminadoGetFilterData](../Procedures/Produccion/listarProductoTerminadoGetFilterData.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** `DB.ProductoTerminado`
- **Tablas escritas:** `DB.ProductoTerminado`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
