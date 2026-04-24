# Módulo: WWPBaseObjects.Mail

## Propósito

Top entidades con descripción sustantiva en el KB: "Mail Template" (`WWP_MailTemplate`); "Mail" (`WWP_Mail`).

- **Evidencia:** `explícita`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 9 |
| SDTs | 1 |
| Transactions | 2 |
| WebPanels | 3 |
| **Total** | **15** |

## Entidades clave

- [WWP_MailTemplate](../_domain_glossary.md#wwp-mailtemplate) -- 11 referencias entrantes
- [WWP_Mail](../_domain_glossary.md#wwp-mail) -- 6 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (64): LoadAuditWWP_MailTemplate -> AuditingObject; LoadAuditWWP_MailTemplate -> WWPContext; WWP_SendMail -> WWP_Logger; WWP_MailTemplate -> AuditTransaction; WWP_MailTemplate -> LoadWWPContext _(+59 más)_
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (2): WWP_MailTemplateView -> WWP_HasSubscriptionsToDisplay; WWP_MailTemplateWW -> WWP_HasSubscriptionsToDisplay
- [WWPBaseObjects.Discussions](WWPBaseObjects.Discussions.md) (1): WWP_MailTemplateView -> WWP_HasDiscussionMessages

### Este módulo ES LLAMADO por

- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (7): WWP_SendPendingNotifications -> WWP_SMTPParametersSDT; WWP_SendPendingNotifications -> WWP_SendMail; WWP_CreateNotificationToUser -> WWP_MailTemplate; WWP_UpdateNotificationDefinitions -> WWP_MailTemplate; WWP_SendPendingNotifications -> WWP_GetSMTPParameters _(+2 más)_
- [Embarques](Embarques.md) (6): NotificarImpresion -> WWP_SendMail; NotificarSupervisor -> WWP_SendMail; NotificarImpresion -> WWP_MailTemplate; NotificarSupervisor -> WWP_MailTemplate; NotificarImpresion -> WWP_Mail _(+1 más)_
- [WWPBaseObjects](WWPBaseObjects.md) (1): ListWWPPrograms -> WWP_MailTemplateWW

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Embarques, WWPBaseObjects, WWPBaseObjects.Notifications.Common**.

