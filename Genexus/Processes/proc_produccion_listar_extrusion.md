# Proceso: listarExtrusion

- **Entry point:** [listarExtrusion](../WebPanels/Produccion/listarExtrusion.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 17
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_extrusion.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarExtrusion](../WebPanels/Produccion/listarExtrusion.md) (`WebPanel`, `Produccion`)
- depth 1: [ExtrusionView](../WebPanels/DB/ExtrusionView.md) (`WebPanel`, `DB`)
- depth 1: [listarExtrusionExport](../Procedures/Produccion/listarExtrusionExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarExtrusionExportReport](../Procedures/Produccion/listarExtrusionExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarExtrusionGetFilterData](../Procedures/Produccion/listarExtrusionGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [ExtrusionWW](../WebPanels/DB/ExtrusionWW.md) (`WebPanel`, `DB`)
- depth 3: [ExtrusionWWExport](../Procedures/DB/ExtrusionWWExport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWExportReport](../Procedures/DB/ExtrusionWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionWWGetFilterData](../Procedures/DB/ExtrusionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)
- depth 4: [DPSDTRptExtrusion](../DataProviders/PrinterSD/DPSDTRptExtrusion.md) (`DataProvider`, `PrinterSD`)
- depth 4: [SDTRptExtrusion](../SDTs/PrinterSD/SDTRptExtrusion.md) (`SDT`, `PrinterSD`)
- depth 4: [BobinaDP](../DataProviders/Produccion/BobinaDP.md) (`DataProvider`, `Produccion`)
- depth 4: [DPExtrusionResultado](../DataProviders/Produccion/DPExtrusionResultado.md) (`DataProvider`, `Produccion`)
- depth 4: [SDTExtrusionResultado](../SDTs/Produccion/SDTExtrusionResultado.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 4: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)

## Efectos en datos

- **Tablas leídas:** `Extrusion`
- **Tablas escritas:** ``
- **SDTs usados:** `GeneXus.Common.GridState`, `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTBobina`, `SDTExtrusionResultado`, `SDTRptExtrusion`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptExtrusion`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
