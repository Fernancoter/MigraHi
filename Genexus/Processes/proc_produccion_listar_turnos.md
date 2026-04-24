# Proceso: Turnos

- **Entry point:** [listarTurnos](../WebPanels/Produccion/listarTurnos.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Turnos`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_turnos.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarTurnos](../WebPanels/Produccion/listarTurnos.md) (`WebPanel`, `Produccion`)
- depth 1: [Turno](../Transactions/DB/Turno.md) (`Transaction`, `DB`)
- depth 1: [gestionarTurno](../WebPanels/Produccion/gestionarTurno.md) (`WebPanel`, `Produccion`)
- depth 1: [listarTurnosExport](../Procedures/Produccion/listarTurnosExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarTurnosExportReport](../Procedures/Produccion/listarTurnosExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarTurnosGetFilterData](../Procedures/Produccion/listarTurnosGetFilterData.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** `DB.Turno`, `Turno`
- **Tablas escritas:** `DB.Turno`, `Turno`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Turno](../_domain_glossary.md#turno)
