# Proceso: WWP_Subscription

- **Entry point:** [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.Discussions.WWP_SubscribeLoggedUserToDiscussion`, `WWPBaseObjects.Discussions.WWP_SubscribeMentionedUsersToDiscussion`, `WWPBaseObjects.Notifications.Common.WWP_SendNotification`
- **Módulo principal:** `WWPBaseObjects.Subscriptions`
- **Objetos en el proceso:** 2
- **Módulos tocados:** `WWPBaseObjects`, `WWPBaseObjects.Subscriptions`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_subscriptions_wwp_subscription.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_Subscription](../Transactions/WWPBaseObjects/Subscriptions/WWP_Subscription.md) (`Transaction`, `WWPBaseObjects.Subscriptions`)
- depth 1: [WWP_GetUserFullName](../Procedures/WWPBaseObjects/WWP_GetUserFullName.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `WWP_Subscription`
- **Tablas escritas:** `WWP_Subscription`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Subscription](../_domain_glossary.md#wwp-subscription)
