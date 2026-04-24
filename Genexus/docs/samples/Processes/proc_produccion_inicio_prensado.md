# Proceso: Inicio

- **Entry point:** [InicioPrensado](../WebPanels/Produccion/InicioPrensado.md) -- tipo menú
- **Ruta en el menú:** `Web > Prensado > Inicio`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 18
- **Módulos tocados:** `DB`, `GeneXusReporting`, `PrinterSD`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_inicio_prensado.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [InicioPrensado](../WebPanels/Produccion/InicioPrensado.md) (`WebPanel`, `Produccion`)
- depth 1: [QueryViewerDragAndDropData](../SDTs/GeneXusReporting/QueryViewerDragAndDropData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerElements](../SDTs/GeneXusReporting/QueryViewerElements.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerFilterChangedData](../SDTs/GeneXusReporting/QueryViewerFilterChangedData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemClickData](../SDTs/GeneXusReporting/QueryViewerItemClickData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemCollapseData](../SDTs/GeneXusReporting/QueryViewerItemCollapseData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemDoubleClickData](../SDTs/GeneXusReporting/QueryViewerItemDoubleClickData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemExpandData](../SDTs/GeneXusReporting/QueryViewerItemExpandData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerParameters](../SDTs/GeneXusReporting/QueryViewerParameters.md) (`SDT`, `GeneXusReporting`)
- depth 1: [TableroDirectivoPrensado](../WebPanels/Produccion/TableroDirectivoPrensado.md) (`WebPanel`, `Produccion`)
- depth 2: [PrensadoView](../WebPanels/DB/PrensadoView.md) (`WebPanel`, `DB`)
- depth 2: [TableroDirectivoPrensadoGetFilterData](../Procedures/Produccion/TableroDirectivoPrensadoGetFilterData.md) (`Procedure`, `Produccion`)
- depth 3: [PrensadoWW](../WebPanels/DB/PrensadoWW.md) (`WebPanel`, `DB`)
- depth 3: [TotalPaletPrensado](../Procedures/Produccion/TotalPaletPrensado.md) (`Procedure`, `Produccion`)
- depth 4: [PrensadoWWExport](../Procedures/DB/PrensadoWWExport.md) (`Procedure`, `DB`)
- depth 4: [PrensadoWWExportReport](../Procedures/DB/PrensadoWWExportReport.md) (`Procedure`, `DB`)
- depth 4: [PrensadoWWGetFilterData](../Procedures/DB/PrensadoWWGetFilterData.md) (`Procedure`, `DB`)
- depth 4: [RptPrensado](../Procedures/PrinterSD/RptPrensado.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** `Prensado`
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaBobinaSDT`, `GeneXus.Common.GridState`, `Produccion.SDTCarrera`, `Produccion.SDTCarrete`, `Produccion.SDTPrensadoBobina`, `Produccion.SDTPrensadoResultado`, `Produccion.SDTProductoTerminado`, `SDTCarreteCalidad`, `SDTRptPrensado`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptPrensado`, `Produccion.CarreraDP`, `Produccion.CarreteDP`, `Produccion.DPPrensadoBobinaSDT`, `Produccion.DPPrensadoResultado`, `Produccion.DPProductoTerminado`
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
