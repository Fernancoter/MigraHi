# Proceso: Extrusora Producto

- **Entry point:** [listarExtrusoraProducto](../WebPanels/Produccion/listarExtrusoraProducto.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Referencias > Extrusora Producto`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 21
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_extrusora_producto.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarExtrusoraProducto](../WebPanels/Produccion/listarExtrusoraProducto.md) (`WebPanel`, `Produccion`)
- depth 1: [ExtrusoraProducto](../Transactions/DB/ExtrusoraProducto.md) (`Transaction`, `DB`)
- depth 1: [gestionarExtrusoraProducto](../WebPanels/Produccion/gestionarExtrusoraProducto.md) (`WebPanel`, `Produccion`)
- depth 1: [listarExtrusoraProductoExport](../Procedures/Produccion/listarExtrusoraProductoExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarExtrusoraProductoExportReport](../Procedures/Produccion/listarExtrusoraProductoExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarExtrusoraProductoGetFilterData](../Procedures/Produccion/listarExtrusoraProductoGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [ViewExtrusoraProducto](../WebPanels/DB/ViewExtrusoraProducto.md) (`WebPanel`, `DB`)
- depth 2: [WWExtrusoraProducto](../WebPanels/DB/WWExtrusoraProducto.md) (`WebPanel`, `DB`)
- depth 2: [DPCBProducto](../DataProviders/Produccion/DPCBProducto.md) (`DataProvider`, `Produccion`)
- depth 2: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 2: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 3: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 3: [ViewExtrusora](../WebPanels/DB/ViewExtrusora.md) (`WebPanel`, `DB`)
- depth 3: [ViewProducto](../WebPanels/DB/ViewProducto.md) (`WebPanel`, `DB`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)
- depth 4: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [WWExtrusora](../WebPanels/DB/WWExtrusora.md) (`WebPanel`, `DB`)
- depth 4: [WWProducto](../WebPanels/DB/WWProducto.md) (`WebPanel`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.ExtrusoraProducto`, `ExtrusoraProducto`
- **Tablas escritas:** `Configuracion`, `DB.ExtrusoraProducto`, `ExtrusoraProducto`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [ExtrusoraProducto](../_domain_glossary.md#extrusoraproducto)
