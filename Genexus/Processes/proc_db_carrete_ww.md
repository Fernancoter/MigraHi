# Proceso: Carretes

- **Entry point:** [CarreteWW](../WebPanels/DB/CarreteWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Prensado > Carretes`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 14
- **Módulos tocados:** `DB`, `PrinterSD`, `Produccion`, `Web`
- **Mergeado con:** `CarreteView` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_carrete_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CarreteView](../WebPanels/DB/CarreteView.md) (`WebPanel`, `DB`)
- depth 0: [CarreteWW](../WebPanels/DB/CarreteWW.md) (`WebPanel`, `DB`)
- depth 1: [CarreteWWExport](../Procedures/DB/CarreteWWExport.md) (`Procedure`, `DB`)
- depth 1: [CarreteWWExportReport](../Procedures/DB/CarreteWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [CarreteWWGetFilterData](../Procedures/DB/CarreteWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [CarreteReportMain](../Procedures/PrinterSD/CarreteReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [CarreteReportMainPCR](../Procedures/PrinterSD/CarreteReportMainPCR.md) (`Procedure`, `PrinterSD`)
- depth 1: [ObtenerTipoMaterialPorCarrete](../Procedures/Produccion/ObtenerTipoMaterialPorCarrete.md) (`Procedure`, `Produccion`)
- depth 1: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 2: [EtiquetaCarreraSDT](../SDTs/PrinterSD/EtiquetaCarreraSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [EtiquetaCarreteSDT](../SDTs/PrinterSD/EtiquetaCarreteSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaCarrete](../Procedures/PrinterSD/ObtenerSDTEtiquetaCarrete.md) (`Procedure`, `PrinterSD`)
- depth 3: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** `Carrete`
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaCarreraSDT`, `EtiquetaCarreteSDT`, `GeneXus.Common.GridState`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
