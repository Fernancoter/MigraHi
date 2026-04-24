# Proceso: WWP_ExistsUserExtended

- **Entry point:** [WWP_ExistsUserExtended](../Procedures/WWPBaseObjects/WWP_ExistsUserExtended.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.Notifications.Web.WWP_RegisterWebClient`
- **Módulo principal:** `WWPBaseObjects`
- **Objetos en el proceso:** 5
- **Módulos tocados:** `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_wwp_exists_user_extended.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_ExistsUserExtended](../Procedures/WWPBaseObjects/WWP_ExistsUserExtended.md) (`Procedure`, `WWPBaseObjects`)
- depth 1: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `WWP_UserExtended`
- **Tablas escritas:** `WWP_UserExtended`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
