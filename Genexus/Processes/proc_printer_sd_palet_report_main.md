# Proceso: PaletReportMain

- **Entry point:** [PaletReportMain](../Procedures/PrinterSD/PaletReportMain.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.PaletWW`
- **Módulo principal:** `PrinterSD`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `PrinterSD`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_printer_sd_palet_report_main.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PaletReportMain](../Procedures/PrinterSD/PaletReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [EtiquetaPaletSDT](../SDTs/PrinterSD/EtiquetaPaletSDT.md) (`SDT`, `PrinterSD`)
- depth 1: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 1: [ObtenerSDTEtiquetaPalet](../Procedures/PrinterSD/ObtenerSDTEtiquetaPalet.md) (`Procedure`, `PrinterSD`)
- depth 1: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 2: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaPaletSDT`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
