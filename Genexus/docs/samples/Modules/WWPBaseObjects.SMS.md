# Módulo: WWPBaseObjects.SMS

## Propósito

Módulo con 11 objetos parseados. Entidades centrales por referencias entrantes: `WWP_SMS`. Sin entry points en `_menu.json` -- accedido indirectamente desde: WWPBaseObjects.Notifications.Common.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 6 |
| SDTs | 4 |
| Transactions | 1 |
| **Total** | **11** |

## Entidades clave

- [WWP_SMS](../_domain_glossary.md#wwp-sms) -- 4 referencias entrantes

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (7): WWP_GetSMSParameters -> WWP_Logger; WWP_GetSMSParameters -> WWP_GetParameter; WWP_ValidateVerificationCode -> WWP_Logger; WWP_UpdateSMSStatus -> WWP_Logger; WWP_SendSMS -> WWP_Logger _(+2 más)_

### Este módulo ES LLAMADO por

- [WWPBaseObjects.Notifications.Common](WWPBaseObjects.Notifications.Common.md) (6): WWP_SendPendingNotifications -> WWP_GetSMSParameters; WWP_SendPendingNotifications -> WWP_SMSParametersSDT; WWP_SendPendingNotifications -> WWP_SendSMSResultSDT; WWP_SendPendingNotifications -> WWP_SendSMS; WWP_CreateNotificationToUser -> WWP_SMS _(+1 más)_

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **WWPBaseObjects.Notifications.Common**.

