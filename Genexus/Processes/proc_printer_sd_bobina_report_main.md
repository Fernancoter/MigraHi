# Proceso: BobinaReportMain

- **Entry point:** [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.BobinaWW`, `Produccion.vwAnaliticaBobina`
- **Módulo principal:** `PrinterSD`
- **Objetos en el proceso:** 5
- **Módulos tocados:** `PrinterSD`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_printer_sd_bobina_report_main.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [BobinaReportMain](../Procedures/PrinterSD/BobinaReportMain.md) (`Procedure`, `PrinterSD`)
- depth 1: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 1: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 1: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 2: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaBobinaSDT`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
