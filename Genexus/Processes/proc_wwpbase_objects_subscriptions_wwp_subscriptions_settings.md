# Proceso: WWP_SubscriptionsSettings

- **Entry point:** [WWP_SubscriptionsSettings](../WebPanels/WWPBaseObjects/Subscriptions/WWP_SubscriptionsSettings.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`, `WWPBaseObjects.Notifications.Common.WWP_VisualizeAllNotifications`
- **Módulo principal:** `WWPBaseObjects.Subscriptions`
- **Objetos en el proceso:** 10
- **Módulos tocados:** `WWPBaseObjects`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_subscriptions_wwp_subscriptions_settings.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_SubscriptionsSettings](../WebPanels/WWPBaseObjects/Subscriptions/WWP_SubscriptionsSettings.md) (`WebPanel`, `WWPBaseObjects.Subscriptions`)
- depth 1: [WWP_CheckUserIsNotUnsubscribed](../Procedures/WWPBaseObjects/Subscriptions/WWP_CheckUserIsNotUnsubscribed.md) (`Procedure`, `WWPBaseObjects.Subscriptions`)
- depth 1: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 1: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)
- depth 1: [WWP_GetLoggedUserId](../Procedures/WWPBaseObjects/WWP_GetLoggedUserId.md) (`Procedure`, `WWPBaseObjects`)
- depth 1: [WWP_GetLoggedUserRoles](../Procedures/WWPBaseObjects/WWP_GetLoggedUserRoles.md) (`Procedure`, `WWPBaseObjects`)
- depth 1: [WWP_UserExtended](../Transactions/WWPBaseObjects/WWP_UserExtended.md) (`Transaction`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserEmail](../Procedures/WWPBaseObjects/WWP_GetUserEmail.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [WWP_GetUserPhone](../Procedures/WWPBaseObjects/WWP_GetUserPhone.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `WWP_Entity`, `WWP_Subscription`, `WWP_UserExtended`, `WWPBaseObjects.WWP_Entity`, `WWPBaseObjects.WWP_UserExtended`
- **Tablas escritas:** `WWP_Entity`, `WWP_Subscription`, `WWP_UserExtended`
- **SDTs usados:** `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Entity](../_domain_glossary.md#wwp-entity)
- [WWP_Subscription](../_domain_glossary.md#wwp-subscription)
- [WWP_UserExtended](../_domain_glossary.md#wwp-userextended)
