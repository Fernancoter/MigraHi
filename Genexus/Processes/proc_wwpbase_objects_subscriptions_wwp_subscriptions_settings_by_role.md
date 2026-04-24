# Proceso: WWP_SubscriptionsSettingsByRole

- **Entry point:** [WWP_SubscriptionsSettingsByRole](../WebPanels/WWPBaseObjects/Subscriptions/WWP_SubscriptionsSettingsByRole.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Root.GAMWWRoles`
- **Módulo principal:** `WWPBaseObjects.Subscriptions`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `WWPBaseObjects`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings_by_role.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_SubscriptionsSettingsByRole](../WebPanels/WWPBaseObjects/Subscriptions/WWP_SubscriptionsSettingsByRole.md) (`WebPanel`, `WWPBaseObjects.Subscriptions`)
- depth 1: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)
- depth 1: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 1: [WWPGetRoleName](../Procedures/WWPBaseObjects/WWPGetRoleName.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `WWP_Entity`, `WWP_UserExtended`, `WWPBaseObjects.WWP_Entity`
- **Tablas escritas:** `WWP_Entity`, `WWP_UserExtended`
- **SDTs usados:** `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Entity](../_domain_glossary.md#wwp-entity)
- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
