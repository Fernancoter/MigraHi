# Módulo: WWPBaseObjects.Subscriptions

## Propósito

Módulo con 7 objetos parseados. Entidades centrales por referencias entrantes: `WWP_Subscription`. Sin entry points en `_menu.json` -- accedido indirectamente desde: Calidad, DB, Downtime.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 4 |
| Transactions | 1 |
| WebPanels | 2 |
| **Total** | **7** |

## Entidades clave

- [WWP_Subscription](../_domain_glossary.md#wwp-subscription) -- 7 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (29): WWP_Subscription -> WWP_GetUserFullName; WWP_RoleUpdateSubscription -> WWP_GetUsersFromRole; WWP_CheckUserIsNotUnsubscribed -> WWP_GetLoggedUserId; WWP_HasSubscriptionsToDisplay -> SecGAMIsAuthByFunctionalityKey; WWP_HasSubscriptionsToDisplay -> WWP_GetEntityByName _(+24 más)_
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (1): WWP_HasSubscriptionsToDisplay -> WWP_NotificationDefinition

### Este módulo ES LLAMADO por

- [DB](DB.md) (40): EtiquetadoOperadorWW -> WWP_HasSubscriptionsToDisplay; TroquelView -> WWP_HasSubscriptionsToDisplay; SalesPersonView -> WWP_HasSubscriptionsToDisplay; InterrupcionView -> WWP_HasSubscriptionsToDisplay; EtiquetadoOperadorView -> WWP_HasSubscriptionsToDisplay _(+35 más)_
- [Reportes](Reportes.md) (10): PrensaObservacionWW -> WWP_HasSubscriptionsToDisplay; PrensaObservacionView -> WWP_HasSubscriptionsToDisplay; ExtrusoraObservacionView -> WWP_HasSubscriptionsToDisplay; CausaInterrupcionView -> WWP_HasSubscriptionsToDisplay; vwExtrusionResultado -> WWP_HasSubscriptionsToDisplay _(+5 más)_
- [Embarques](Embarques.md) (6): ListadoEmbarques -> WWP_HasSubscriptionsToDisplay; ListadoOrdenes -> WWP_HasSubscriptionsToDisplay; ListadoRemisiones -> WWP_HasSubscriptionsToDisplay; OrdenesWW -> WWP_HasSubscriptionsToDisplay; RemissionsWW -> WWP_HasSubscriptionsToDisplay _(+1 más)_
- [Calidad](Calidad.md) (4): reclamoview -> WWP_HasSubscriptionsToDisplay; CarreteDefectoView -> WWP_HasSubscriptionsToDisplay; CarreteDefectoWW -> WWP_HasSubscriptionsToDisplay; reclamosww -> WWP_HasSubscriptionsToDisplay
- [Produccion](Produccion.md) (3): vwAnaliticaBobina -> WWP_HasSubscriptionsToDisplay; vwAnaliticaCarrete -> WWP_HasSubscriptionsToDisplay; vwAnaliticaPrensado -> WWP_HasSubscriptionsToDisplay
- [WWPBaseObjects](WWPBaseObjects.md) (3): AuditView -> WWP_HasSubscriptionsToDisplay; AuditWW -> WWP_HasSubscriptionsToDisplay; ListWWPPrograms -> WWP_SubscriptionsSettings
- [Downtime](Downtime.md) (2): DownTimeCodeView -> WWP_HasSubscriptionsToDisplay; DownTimeCodeWW -> WWP_HasSubscriptionsToDisplay
- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (2): WWP_SubscribeLoggedUserToDiscussion -> WWP_Subscription; WWP_SubscribeMentionedUsersToDiscussion -> WWP_Subscription
- [WWPBaseObjects.Mail](WWPBaseObjects.Mail.md) (2): WWP_MailTemplateView -> WWP_HasSubscriptionsToDisplay; WWP_MailTemplateWW -> WWP_HasSubscriptionsToDisplay
- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (2): WWP_SendNotification -> WWP_Subscription; WWP_VisualizeAllNotifications -> WWP_SubscriptionsSettings
- [Root](Root.md) (1): GAMWWRoles -> WWP_SubscriptionsSettingsByRole

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Calidad, DB, Downtime, Embarques, Produccion, Reportes, Root, WWPBaseObjects, WWPBaseObjects.Discussions, WWPBaseObjects.Mail, WWPBaseObjects.Notifications.Common**.

