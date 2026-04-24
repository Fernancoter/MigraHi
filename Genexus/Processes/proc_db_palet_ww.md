# Proceso: Palets

- **Entry point:** [PaletWW](../WebPanels/DB/PaletWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Prensado > Operación > Palets`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 13
- **Módulos tocados:** `DB`, `PrinterSD`, `Web`
- **Mergeado con:** `PaletView` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_palet_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PaletView](../WebPanels/DB/PaletView.md) (`WebPanel`, `DB`)
- depth 0: [PaletWW](../WebPanels/DB/PaletWW.md) (`WebPanel`, `DB`)
- depth 1: [PaletWWExport](../Procedures/DB/PaletWWExport.md) (`Procedure`, `DB`)
- depth 1: [PaletWWExportReport](../Procedures/DB/PaletWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [PaletWWGetFilterData](../Procedures/DB/PaletWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [PaletReport](../Procedures/PrinterSD/PaletReport.md) (`Procedure`, `PrinterSD`)
- depth 1: [PaletReportMain](../Procedures/PrinterSD/PaletReportMain.md) (`Procedure`, `PrinterSD`)
- depth 2: [EtiquetaPaletSDT](../SDTs/PrinterSD/EtiquetaPaletSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaPalet](../Procedures/PrinterSD/ObtenerSDTEtiquetaPalet.md) (`Procedure`, `PrinterSD`)
- depth 2: [PaletReportSAP](../Procedures/PrinterSD/PaletReportSAP.md) (`Procedure`, `PrinterSD`)
- depth 2: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 3: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** `DB.Palet`, `Palet`
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaPaletSDT`, `GeneXus.Common.GridState`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
