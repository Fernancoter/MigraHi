# Proceso: vwCarreteCarrera

- **Entry point:** [vwCarreteCarrera](../WebPanels/Produccion/vwCarreteCarrera.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_vw_carrete_carrera.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [vwCarreteCarrera](../WebPanels/Produccion/vwCarreteCarrera.md) (`WebPanel`, `Produccion`)
- depth 1: [CarreteCarrera](../SDTs/Produccion/CarreteCarrera.md) (`SDT`, `Produccion`)
- depth 1: [DPCarreteCarrera](../DataProviders/Produccion/DPCarreteCarrera.md) (`DataProvider`, `Produccion`)
- depth 1: [SDTCarreteCarrera](../SDTs/Produccion/SDTCarreteCarrera.md) (`SDT`, `Produccion`)
- depth 1: [vwCarreteCarreraExport](../Procedures/Produccion/vwCarreteCarreraExport.md) (`Procedure`, `Produccion`)
- depth 1: [vwCarreteCarreraExportReport](../Procedures/Produccion/vwCarreteCarreraExportReport.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `GeneXus.Common.GridState`, `SDTCarreteCarrera`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `DPCarreteCarrera`
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
