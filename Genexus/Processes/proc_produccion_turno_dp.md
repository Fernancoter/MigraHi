# Proceso: TurnoDP

- **Entry point:** [TurnoDP](../DataProviders/Produccion/TurnoDP.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.Existencia`, `Reportes.ExtrusoraObservacion`, `Reportes.PrensaObservacion`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 2
- **Módulos tocados:** `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_turno_dp.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [TurnoDP](../DataProviders/Produccion/TurnoDP.md) (`DataProvider`, `Produccion`)
- depth 1: [SDTTurno](../SDTs/Produccion/SDTTurno.md) (`SDT`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `SDTTurno`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
