# Proceso: WWP_UserExtended

- **Entry point:** [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Root.GAMUserEntry`, `WWPBaseObjects.Discussions.WWP_GetUsersForDiscussionMentions`, `WWPBaseObjects.Notifications.Common.WWP_CreateNotificationToUser`
- **Módulo principal:** `WWPBaseObjects`
- **Objetos en el proceso:** 4
- **Módulos tocados:** `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_wwp_user_extended.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 1: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 1: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 1: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `WWP_UserExtended`
- **Tablas escritas:** `WWP_UserExtended`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
