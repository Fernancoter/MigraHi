# Proceso: ReposoTranscurrido

- **Entry point:** [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.BobinaWW`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 3
- **Módulos tocados:** `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_reposo_transcurrido.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 1: [BobinaTiempoReposo](../Procedures/Produccion/BobinaTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 1: [ObtenerTiempoReposo](../Procedures/Produccion/ObtenerTiempoReposo.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** `DB.Bobina`, `DB.Extrusion`
- **Tablas escritas:** `DB.Bobina`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
