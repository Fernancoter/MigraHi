# Proceso: Prensa Producto

- **Entry point:** [listarPrensaProducto](../WebPanels/Produccion/listarPrensaProducto.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Referencias > Prensa Producto`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 21
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_prensa_producto.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarPrensaProducto](../WebPanels/Produccion/listarPrensaProducto.md) (`WebPanel`, `Produccion`)
- depth 1: [PrensaProducto](../Transactions/DB/PrensaProducto.md) (`Transaction`, `DB`)
- depth 1: [gestionarPrensaProducto](../WebPanels/Produccion/gestionarPrensaProducto.md) (`WebPanel`, `Produccion`)
- depth 1: [listarPrensaProductoExport](../Procedures/Produccion/listarPrensaProductoExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarPrensaProductoExportReport](../Procedures/Produccion/listarPrensaProductoExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarPrensaProductoGetFilterData](../Procedures/Produccion/listarPrensaProductoGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [ViewPrensaProducto](../WebPanels/DB/ViewPrensaProducto.md) (`WebPanel`, `DB`)
- depth 2: [WWPrensaProducto](../WebPanels/DB/WWPrensaProducto.md) (`WebPanel`, `DB`)
- depth 2: [DPCBProducto](../DataProviders/Produccion/DPCBProducto.md) (`DataProvider`, `Produccion`)
- depth 2: [DPCBProductoBase](../DataProviders/Produccion/DPCBProductoBase.md) (`DataProvider`, `Produccion`)
- depth 2: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 2: [PrensaDP](../DataProviders/Produccion/PrensaDP.md) (`DataProvider`, `Produccion`)
- depth 2: [SDTProductoCategoria](../SDTs/Produccion/SDTProductoCategoria.md) (`SDT`, `Produccion`)
- depth 2: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 3: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [SDTPrensa](../SDTs/Produccion/SDTPrensa.md) (`SDT`, `Produccion`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)
- depth 4: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.PrensaProducto`, `PrensaProducto`
- **Tablas escritas:** `Configuracion`, `DB.PrensaProducto`, `PrensaProducto`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `SDTPrensa`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [PrensaProducto](../_domain_glossary.md#prensaproducto)
