# Proceso: RptExtrusion

- **Entry point:** [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.ExtrusionWW`
- **Módulo principal:** `PrinterSD`
- **Objetos en el proceso:** 9
- **Módulos tocados:** `PrinterSD`, `Produccion`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_printer_sd_rpt_extrusion.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [RptExtrusion](../Procedures/PrinterSD/RptExtrusion.md) (`Procedure`, `PrinterSD`)
- depth 1: [DPSDTRptExtrusion](../DataProviders/PrinterSD/DPSDTRptExtrusion.md) (`DataProvider`, `PrinterSD`)
- depth 1: [SDTRptExtrusion](../SDTs/PrinterSD/SDTRptExtrusion.md) (`SDT`, `PrinterSD`)
- depth 1: [BobinaDP](../DataProviders/Produccion/BobinaDP.md) (`DataProvider`, `Produccion`)
- depth 1: [DPExtrusionResultado](../DataProviders/Produccion/DPExtrusionResultado.md) (`DataProvider`, `Produccion`)
- depth 1: [SDTExtrusionResultado](../SDTs/Produccion/SDTExtrusionResultado.md) (`SDT`, `Produccion`)
- depth 1: [SDTPrensadoResultado](../SDTs/Produccion/SDTPrensadoResultado.md) (`SDT`, `Produccion`)
- depth 1: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 2: [ObtenerCantidadBobinasPorExtrusion](../Procedures/Produccion/ObtenerCantidadBobinasPorExtrusion.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `Produccion.SDTBobina`, `Produccion.SDTExtrusionResultado`, `SDTBobina`, `SDTExtrusionResultado`, `SDTRptExtrusion`
- **DataProviders usados:** `DPSDTRptExtrusion`, `Produccion.BobinaDP`, `Produccion.DPExtrusionResultado`
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
