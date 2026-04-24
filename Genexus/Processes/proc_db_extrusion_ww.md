# Proceso: Extrusiones

- **Entry point:** [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Extrusión > Operación > Extrusiones`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 16
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Web`
- **Mergeado con:** `TableroDirectivoExtrusion`, `ExtrusionView` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_extrusion_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 0: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 0: [TableroDirectivoExtrusion](../WebPanels/Produccion/TableroDirectivoExtrusion.md) (`WebPanel`, `Produccion`)
- depth 1: [ExtrusionWWExport](../Procedures/DB/ExtrusionWWExport.md) (`Procedure`, `DB`)
- depth 1: [ExtrusionWWExportReport](../Procedures/DB/ExtrusionWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [ExtrusionWWGetFilterData](../Procedures/DB/ExtrusionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)
- depth 1: [TableroDirectivoExtrusionGetFilterData](../Procedures/Produccion/TableroDirectivoExtrusionGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [DPSDTRptExtrusion](../DataProviders/PrinterSD/DPSDTRptExtrusion.md) (`DataProvider`, `PrinterSD`)
- depth 2: [SDTRptExtrusion](../SDTs/PrinterSD/SDTRptExtrusion.md) (`SDT`, `PrinterSD`)
- depth 2: [BobinaDP](../DataProviders/Produccion/BobinaDP.md) (`DataProvider`, `Produccion`)
- depth 2: [DPExtrusionResultado](../DataProviders/Produccion/DPExtrusionResultado.md) (`DataProvider`, `Produccion`)
- depth 2: [ObtenerCantidadBobinasPorExtrusion](../Procedures/Produccion/ObtenerCantidadBobinasPorExtrusion.md) (`Procedure`, `Produccion`)
- depth 2: [SDTExtrusionResultado](../SDTs/Produccion/SDTExtrusionResultado.md) (`SDT`, `Produccion`)
- depth 2: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 2: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)

## Efectos en datos

- **Tablas leídas:** `Extrusion`
- **Tablas escritas:** ``
- **SDTs usados:** `GeneXus.Common.GridState`, `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTBobina`, `SDTExtrusionResultado`, `SDTRptExtrusion`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptExtrusion`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
