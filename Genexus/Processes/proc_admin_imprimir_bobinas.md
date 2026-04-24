# Proceso: ImprimirBobinas

- **Entry point:** [ImprimirBobinas](../WebPanels/admin/ImprimirBobinas.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.vwAnaliticaBobina`
- **Módulo principal:** `admin`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `admin`, `PrinterSD`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_admin_imprimir_bobinas.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ImprimirBobinas](../WebPanels/admin/ImprimirBobinas.md) (`WebPanel`, `admin`)
- depth 1: [ImprimirBobinasGetFilterData](../Procedures/admin/ImprimirBobinasGetFilterData.md) (`Procedure`, `admin`)
- depth 1: [BobinaReportMainMulti](../Procedures/PrinterSD/BobinaReportMainMulti.md) (`Procedure`, `PrinterSD`)
- depth 2: [EtiquetaBobinaSDT](../SDTs/PrinterSD/EtiquetaBobinaSDT.md) (`SDT`, `PrinterSD`)
- depth 2: [ObtenerBarCode](../Procedures/PrinterSD/ObtenerBarCode.md) (`Procedure`, `PrinterSD`)
- depth 2: [ObtenerSDTEtiquetaBobina](../Procedures/PrinterSD/ObtenerSDTEtiquetaBobina.md) (`Procedure`, `PrinterSD`)
- depth 3: [GuardarBarCode](../Procedures/PrinterSD/GuardarBarCode.md) (`Procedure`, `PrinterSD`)

## Efectos en datos

- **Tablas leídas:** `DB.Order`
- **Tablas escritas:** ``
- **SDTs usados:** `EtiquetaBobinaSDT`, `GeneXus.Common.GridState`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
