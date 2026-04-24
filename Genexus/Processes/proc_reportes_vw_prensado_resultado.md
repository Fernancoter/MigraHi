# Proceso: Prensado

- **Entry point:** [vwPrensadoResultado](../WebPanels/Reportes/vwPrensadoResultado.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes HC > Resúmenes > Prensado`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 27
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Reportes`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_vw_prensado_resultado.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [vwPrensadoResultado](../WebPanels/Reportes/vwPrensadoResultado.md) (`WebPanel`, `Reportes`)
- depth 1: [PrensadoResultado](../Transactions/DB/PrensadoResultado.md) (`Transaction`, `DB`)
- depth 1: [PrensadoView](../WebPanels/DB/PrensadoView.md) (`WebPanel`, `DB`)
- depth 1: [ReportePrensado](../WebPanels/Reportes/ReportePrensado.md) (`WebPanel`, `Reportes`)
- depth 1: [vwPrensadoResultadoExport](../Procedures/Reportes/vwPrensadoResultadoExport.md) (`Procedure`, `Reportes`)
- depth 1: [vwPrensadoResultadoExportReport](../Procedures/Reportes/vwPrensadoResultadoExportReport.md) (`Procedure`, `Reportes`)
- depth 1: [vwPrensadoResultadoGetFilterData](../Procedures/Reportes/vwPrensadoResultadoGetFilterData.md) (`Procedure`, `Reportes`)
- depth 2: [PrensadoWW](../WebPanels/DB/PrensadoWW.md) (`WebPanel`, `DB`)
- depth 3: [PrensadoWWExport](../Procedures/DB/PrensadoWWExport.md) (`Procedure`, `DB`)
- depth 3: [PrensadoWWExportReport](../Procedures/DB/PrensadoWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [PrensadoWWGetFilterData](../Procedures/DB/PrensadoWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [RptPrensado](../Procedures/PrinterSD/RptPrensado.md) (`Procedure`, `PrinterSD`)
- depth 4: [DPSDTRptPrensado](../DataProviders/PrinterSD/DPSDTRptPrensado.md) (`DataProvider`, `PrinterSD`)
- depth 4: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 4: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 4: [SDTCarreteCalidad](../SDTs/PrinterSD/SDTCarreteCalidad.md) (`SDT`, `PrinterSD`)
- depth 4: [SDTRptPrensado](../SDTs/PrinterSD/SDTRptPrensado.md) (`SDT`, `PrinterSD`)
- depth 4: [CarreraDP](../DataProviders/Produccion/CarreraDP.md) (`DataProvider`, `Produccion`)
- depth 4: [CarreteDP](../DataProviders/Produccion/CarreteDP.md) (`DataProvider`, `Produccion`)
- depth 4: [DPPrensadoBobinaSDT](../DataProviders/Produccion/DPPrensadoBobinaSDT.md) (`DataProvider`, `Produccion`)
- depth 4: [DPPrensadoResultado](../DataProviders/Produccion/DPPrensadoResultado.md) (`DataProvider`, `Produccion`)
- depth 4: [DPProductoTerminado](../DataProviders/Produccion/DPProductoTerminado.md) (`DataProvider`, `Produccion`)
- depth 4: [SDTCarrera](../SDTs/Produccion/SDTCarrera.md) (`SDT`, `Produccion`)
- depth 4: [SDTCarrete](../SDTs/Produccion/SDTCarrete.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoBobina](../SDTs/Produccion/SDTPrensadoBobina.md) (`SDT`, `Produccion`)
- depth 4: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 4: [SDTProductoTerminado](../SDTs/Produccion/SDTProductoTerminado.md) (`SDT`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** `Prensado`, `PrensadoResultado`
- **Tablas escritas:** `PrensadoResultado`
- **SDTs usados:** `EtiquetaBobinaSDT`, `GeneXus.Common.GridState`, `Produccion.SDTCarrera`, `Produccion.SDTCarrete`, `Produccion.SDTPrensadoBobina`, `Produccion.SDTPrensadoResultado`, `Produccion.SDTProductoTerminado`, `SDTCarrera`, `SDTCarrete`, `SDTCarreteCalidad`, `SDTPrensadoBobina`, `SDTPrensadoResultado`, `SDTProductoTerminado`, `SDTRptPrensado`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptPrensado`, `Produccion.CarreraDP`, `Produccion.CarreteDP`, `Produccion.DPPrensadoBobinaSDT`, `Produccion.DPPrensadoResultado`, `Produccion.DPProductoTerminado`
## Entidades relacionadas (del glosario)

- [PrensadoResultado](../_domain_glossary.md#prensadoresultado)
