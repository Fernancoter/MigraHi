# Proceso: Prensados

- **Entry point:** [PrensadoWW](../WebPanels/DB/PrensadoWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Prensado > Prensados`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 24
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`
- **Mergeado con:** `TableroDirectivoPrensado`, `PrensadoView` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_prensado_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PrensadoView](../WebPanels/DB/PrensadoView.md) (`WebPanel`, `DB`)
- depth 0: [PrensadoWW](../WebPanels/DB/PrensadoWW.md) (`WebPanel`, `DB`)
- depth 0: [TableroDirectivoPrensado](../WebPanels/Produccion/TableroDirectivoPrensado.md) (`WebPanel`, `Produccion`)
- depth 1: [PrensadoWWExport](../Procedures/DB/PrensadoWWExport.md) (`Procedure`, `DB`)
- depth 1: [PrensadoWWExportReport](../Procedures/DB/PrensadoWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [PrensadoWWGetFilterData](../Procedures/DB/PrensadoWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [RptPrensado](../Procedures/PrinterSD/RptPrensado.md) (`Procedure`, `PrinterSD`)
- depth 1: [TableroDirectivoPrensadoGetFilterData](../Procedures/Produccion/TableroDirectivoPrensadoGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [DPSDTRptPrensado](../DataProviders/PrinterSD/DPSDTRptPrensado.md) (`DataProvider`, `PrinterSD`)
- depth 2: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 2: [SDTCarreteCalidad](../SDTs/PrinterSD/SDTCarreteCalidad.md) (`SDT`, `PrinterSD`)
- depth 2: [SDTRptPrensado](../SDTs/PrinterSD/SDTRptPrensado.md) (`SDT`, `PrinterSD`)
- depth 2: [CarreraDP](../DataProviders/Produccion/CarreraDP.md) (`DataProvider`, `Produccion`)
- depth 2: [CarreteDP](../DataProviders/Produccion/CarreteDP.md) (`DataProvider`, `Produccion`)
- depth 2: [DPPrensadoBobinaSDT](../DataProviders/Produccion/DPPrensadoBobinaSDT.md) (`DataProvider`, `Produccion`)
- depth 2: [DPPrensadoResultado](../DataProviders/Produccion/DPPrensadoResultado.md) (`DataProvider`, `Produccion`)
- depth 2: [DPProductoTerminado](../DataProviders/Produccion/DPProductoTerminado.md) (`DataProvider`, `Produccion`)
- depth 2: [SDTCarrera](../SDTs/Produccion/SDTCarrera.md) (`SDT`, `Produccion`)
- depth 2: [SDTCarrete](../SDTs/Produccion/SDTCarrete.md) (`SDT`, `Produccion`)
- depth 2: [SDTPrensadoBobina](../SDTs/Produccion/SDTPrensadoBobina.md) (`SDT`, `Produccion`)
- depth 2: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 2: [SDTProductoTerminado](../SDTs/Produccion/SDTProductoTerminado.md) (`SDT`, `Produccion`)
- depth 2: [TotalPaletPrensado](../Procedures/Produccion/TotalPaletPrensado.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** `Prensado`
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaBobinaSDT`, `GeneXus.Common.GridState`, `Produccion.SDTCarrera`, `Produccion.SDTCarrete`, `Produccion.SDTPrensadoBobina`, `Produccion.SDTPrensadoResultado`, `Produccion.SDTProductoTerminado`, `SDTCarrera`, `SDTCarrete`, `SDTCarreteCalidad`, `SDTPrensadoBobina`, `SDTPrensadoResultado`, `SDTProductoTerminado`, `SDTRptPrensado`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPSDTRptPrensado`, `Produccion.CarreraDP`, `Produccion.CarreteDP`, `Produccion.DPPrensadoBobinaSDT`, `Produccion.DPPrensadoResultado`, `Produccion.DPProductoTerminado`
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
