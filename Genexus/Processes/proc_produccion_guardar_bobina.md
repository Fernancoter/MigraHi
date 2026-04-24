# Proceso: GuardarBobina

- **Entry point:** [GuardarBobina](../Procedures/Produccion/GuardarBobina.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `admin.InsertarManualenteBobinas`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 3
- **Módulos tocados:** `Produccion`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_guardar_bobina.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [GuardarBobina](../Procedures/Produccion/GuardarBobina.md) (`Procedure`, `Produccion`)
- depth 1: [BobinaNoSerie](../Procedures/Produccion/BobinaNoSerie.md) (`Procedure`, `Produccion`)
- depth 2: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)

## Efectos en datos

- **Tablas leídas:** `DB.Bobina`, `DB.Extrusion`
- **Tablas escritas:** `DB.Bobina`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
