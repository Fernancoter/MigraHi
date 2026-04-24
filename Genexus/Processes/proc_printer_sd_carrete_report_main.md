# Proceso: CarreteReportMain

- **Entry point:** [CarreteReportMain](../Procedures/PrinterSD/CarreteReportMain.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.CarreraWW`, `DB.CarreteWW`, `Produccion.vwAnaliticaCarrete`
- **Módulo principal:** `PrinterSD`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `PrinterSD`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_printer_sd_carrete_report_main.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CarreteReportMain](../Procedures/PrinterSD/CarreteReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [EtiquetaCarreraSDT](../SDTs/PrinterSD/EtiquetaCarreraSDT.md) (`SDT`, `PrinterSD`)
- depth 1: [EtiquetaCarreteSDT](../SDTs/PrinterSD/EtiquetaCarreteSDT.md) (`SDT`, `PrinterSD`)
- depth 1: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 1: [ObtenerSDTEtiquetaCarrete](../Procedures/PrinterSD/ObtenerSDTEtiquetaCarrete.md) (`Procedure`, `PrinterSD`)
- depth 2: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaCarreraSDT`, `EtiquetaCarreteSDT`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
