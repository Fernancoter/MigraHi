# Módulo: WWPBaseObjects.Discussions

## Propósito

Top entidades con descripción sustantiva en el KB: "Discussion Message" (`WWP_DiscussionMessage`); "Discussion Message Mention" (`WWP_DiscussionMessageMention`).

- **Evidencia:** `explícita`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 6 |
| Transactions | 2 |
| **Total** | **8** |

## Entidades clave

- [WWP_DiscussionMessage](../_domain_glossary.md#wwp-discussionmessage) -- 2 referencias entrantes
- [WWP_DiscussionMessageMention](../_domain_glossary.md#wwp-discussionmessagemention) -- 1 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (11): WWP_DiscussionMessageMention -> WWP_GetUserFullName; WWP_GetUsersForDiscussionMentions -> WWPSuggestDataItem; WWP_GetUsersForDiscussionMentions -> WWP_UserExtended; WWP_SubscribeLoggedUserToDiscussion -> WWP_Logger; WWP_SubscribeLoggedUserToDiscussion -> WWP_GetLoggedUserId _(+6 más)_
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (5): WWP_SubscribeLoggedUserToDiscussion -> WWP_NotificationDefinition; WWP_NotifyDiscussionMessage -> WWP_SendNotification; WWP_NotifyDiscussionMessage -> WWP_SendMentionNotification; WWP_NotifyDiscussionMessage -> WWP_SDTNotificationMetadata; WWP_SubscribeMentionedUsersToDiscussion -> WWP_NotificationDefinition
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (2): WWP_SubscribeLoggedUserToDiscussion -> WWP_Subscription; WWP_SubscribeMentionedUsersToDiscussion -> WWP_Subscription

### Este módulo ES LLAMADO por

- [DB](DB.md) (20): TroquelView -> WWP_HasDiscussionMessages; SalesPersonView -> WWP_HasDiscussionMessages; InterrupcionView -> WWP_HasDiscussionMessages; EtiquetadoOperadorView -> WWP_HasDiscussionMessages; CarreraView -> WWP_HasDiscussionMessages _(+15 más)_
- [Reportes](Reportes.md) (3): PrensaObservacionView -> WWP_HasDiscussionMessages; ExtrusoraObservacionView -> WWP_HasDiscussionMessages; CausaInterrupcionView -> WWP_HasDiscussionMessages
- [Calidad](Calidad.md) (2): reclamoview -> WWP_HasDiscussionMessages; CarreteDefectoView -> WWP_HasDiscussionMessages
- [Downtime](Downtime.md) (1): DownTimeCodeView -> WWP_HasDiscussionMessages
- [WWPBaseObjects](WWPBaseObjects.md) (1): AuditView -> WWP_HasDiscussionMessages
- [WWPBaseObjects.Mail](WWPBaseObjects.Mail.md) (1): WWP_MailTemplateView -> WWP_HasDiscussionMessages

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Calidad, DB, Downtime, Reportes, WWPBaseObjects, WWPBaseObjects.Mail**.

