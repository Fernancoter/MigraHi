# Proceso: SecGAMUpdatePermissions

- **Entry point:** [SecGAMUpdatePermissions](../Procedures/Root/SecGAMUpdatePermissions.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.WWP_ImpactMetadata`
- **Módulo principal:** `Root`
- **Objetos en el proceso:** 3
- **Módulos tocados:** `Root`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_root_sec_gamupdate_permissions.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [SecGAMUpdatePermissions](../Procedures/Root/SecGAMUpdatePermissions.md) (`Procedure`, `Root`)
- depth 1: [SecGAMFunctionalitiesToLoad](../SDTs/WWPBaseObjects/SecGAMFunctionalitiesToLoad.md) (`SDT`, `WWPBaseObjects`)
- depth 1: [SecGAMGetAdvancedSecurityWWPFunctionalities](../DataProviders/WWPBaseObjects/SecGAMGetAdvancedSecurityWWPFunctionalities.md) (`DataProvider`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `WWPBaseObjects.SecGAMFunctionalitiesToLoad`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
