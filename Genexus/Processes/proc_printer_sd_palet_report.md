# Proceso: PaletReport

- **Entry point:** [PaletReport](../Procedures/PrinterSD/PaletReport.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.PaletWW`
- **Módulo principal:** `PrinterSD`
- **Objetos en el proceso:** 8
- **Módulos tocados:** `PrinterSD`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_printer_sd_palet_report.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PaletReport](../Procedures/PrinterSD/PaletReport.md) (`Procedure`, `PrinterSD`)
- depth 1: [PaletReportMain](../Procedures/PrinterSD/PaletReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [PaletReportSAP](../Procedures/PrinterSD/PaletReportSAP.md) (`Procedure`, `PrinterSD`)
- depth 2: [EtiquetaPaletSDT](../SDTs/PrinterSD/EtiquetaPaletSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaPalet](../Procedures/PrinterSD/ObtenerSDTEtiquetaPalet.md) (`Procedure`, `PrinterSD`)
- depth 2: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 3: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** `DB.Palet`
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaPaletSDT`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
