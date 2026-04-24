# Proceso: Carrete_Pallet

- **Entry point:** [CarreteEnPallet](../WebPanels/Reportes/CarreteEnPallet.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes HC > Descargables > Carrete_Pallet`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 16
- **Módulos tocados:** `DB`, `PrinterSD`, `Reportes`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_carrete_en_pallet.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CarreteEnPallet](../WebPanels/Reportes/CarreteEnPallet.md) (`WebPanel`, `Reportes`)
- depth 1: [PaletView](../WebPanels/DB/PaletView.md) (`WebPanel`, `DB`)
- depth 1: [CarreteEnPalletExport](../Procedures/Reportes/CarreteEnPalletExport.md) (`Procedure`, `Reportes`)
- depth 1: [CarreteEnPalletExportReport](../Procedures/Reportes/CarreteEnPalletExportReport.md) (`Procedure`, `Reportes`)
- depth 1: [CarreteEnPalletGetFilterData](../Procedures/Reportes/CarreteEnPalletGetFilterData.md) (`Procedure`, `Reportes`)
- depth 2: [PaletWW](../WebPanels/DB/PaletWW.md) (`WebPanel`, `DB`)
- depth 3: [PaletWWExport](../Procedures/DB/PaletWWExport.md) (`Procedure`, `DB`)
- depth 3: [PaletWWExportReport](../Procedures/DB/PaletWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [PaletWWGetFilterData](../Procedures/DB/PaletWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [PaletReport](../Procedures/PrinterSD/PaletReport.md) (`Procedure`, `PrinterSD`)
- depth 3: [PaletReportMain](../Procedures/PrinterSD/PaletReportMain.md) (`Procedure`, `PrinterSD`)
- depth 4: [EtiquetaPaletSDT](../SDTs/PrinterSD/EtiquetaPaletSDT.md) (`SDT`, `PrinterSD`)
- depth 4: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 4: [ObtenerSDTEtiquetaPalet](../Procedures/PrinterSD/ObtenerSDTEtiquetaPalet.md) (`Procedure`, `PrinterSD`)
- depth 4: [PaletReportSAP](../Procedures/PrinterSD/PaletReportSAP.md) (`Procedure`, `PrinterSD`)
- depth 4: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)

## Efectos en datos

- **Tablas leídas:** `DB.Palet`, `Palet`
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaPaletSDT`, `GeneXus.Common.GridState`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
