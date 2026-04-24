# Proceso: SDPausarBobinas

- **Entry point:** [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.BobinaWW`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 3
- **Módulos tocados:** `DB`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_sdpausar_bobinas.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [SDPausarBobinas](../Procedures/Produccion/SDPausarBobinas.md) (`Procedure`, `Produccion`)
- depth 1: [ExtrusoraBobina](../Transactions/DB/ExtrusoraBobina.md) (`Transaction`, `DB`)
- depth 1: [SetEstadoBobina](../Procedures/Produccion/SetEstadoBobina.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** `DB.Bobina`, `DB.Extrusion`, `ExtrusoraBobina`
- **Tablas escritas:** `DB.Bobina`, `DB.ExtrusoraBobina`, `ExtrusoraBobina`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [ExtrusoraBobina](../_domain_glossary.md#extrusorabobina)
