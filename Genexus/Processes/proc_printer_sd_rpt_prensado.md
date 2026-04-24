# Proceso: RptPrensado

- **Entry point:** [RptPrensado](../Procedures/PrinterSD/RptPrensado.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.PrensadoWW`, `Produccion.vwAnaliticaPrensado`
- **Módulo principal:** `PrinterSD`
- **Objetos en el proceso:** 16
- **Módulos tocados:** `PrinterSD`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_printer_sd_rpt_prensado.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [RptPrensado](../Procedures/PrinterSD/RptPrensado.md) (`Procedure`, `PrinterSD`)
- depth 1: [DPSDTRptPrensado](../DataProviders/PrinterSD/DPSDTRptPrensado.md) (`DataProvider`, `PrinterSD`)
- depth 1: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 1: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 1: [SDTCarreteCalidad](../SDTs/PrinterSD/SDTCarreteCalidad.md) (`SDT`, `PrinterSD`)
- depth 1: [SDTRptPrensado](../SDTs/PrinterSD/SDTRptPrensado.md) (`SDT`, `PrinterSD`)
- depth 1: [CarreraDP](../DataProviders/Produccion/CarreraDP.md) (`DataProvider`, `Produccion`)
- depth 1: [CarreteDP](../DataProviders/Produccion/CarreteDP.md) (`DataProvider`, `Produccion`)
- depth 1: [DPPrensadoBobinaSDT](../DataProviders/Produccion/DPPrensadoBobinaSDT.md) (`DataProvider`, `Produccion`)
- depth 1: [DPPrensadoResultado](../DataProviders/Produccion/DPPrensadoResultado.md) (`DataProvider`, `Produccion`)
- depth 1: [DPProductoTerminado](../DataProviders/Produccion/DPProductoTerminado.md) (`DataProvider`, `Produccion`)
- depth 1: [SDTCarrera](../SDTs/Produccion/SDTCarrera.md) (`SDT`, `Produccion`)
- depth 1: [SDTCarrete](../SDTs/Produccion/SDTCarrete.md) (`SDT`, `Produccion`)
- depth 1: [SDTPrensadoBobina](../SDTs/Produccion/SDTPrensadoBobina.md) (`SDT`, `Produccion`)
- depth 1: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 1: [SDTProductoTerminado](../SDTs/Produccion/SDTProductoTerminado.md) (`SDT`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaBobinaSDT`, `Produccion.SDTCarrera`, `Produccion.SDTCarrete`, `Produccion.SDTPrensadoBobina`, `Produccion.SDTPrensadoResultado`, `Produccion.SDTProductoTerminado`, `SDTCarrera`, `SDTCarrete`, `SDTCarreteCalidad`, `SDTPrensadoBobina`, `SDTPrensadoResultado`, `SDTProductoTerminado`, `SDTRptPrensado`
- **DataProviders usados:** `DPSDTRptPrensado`, `Produccion.CarreraDP`, `Produccion.CarreteDP`, `Produccion.DPPrensadoBobinaSDT`, `Produccion.DPPrensadoResultado`, `Produccion.DPProductoTerminado`
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
