# Proceso: WWP_SendSMS

- **Entry point:** [WWP_SendSMS](../Procedures/WWPBaseObjects/SMS/WWP_SendSMS.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.Notifications.Common.WWP_SendPendingNotifications`
- **Módulo principal:** `WWPBaseObjects.SMS`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `WWPBaseObjects.SMS`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_sms_wwp_send_sms.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_SendSMS](../Procedures/WWPBaseObjects/SMS/WWP_SendSMS.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 1: [WWP_ParsePhoneNumbersList](../Procedures/WWPBaseObjects/SMS/WWP_ParsePhoneNumbersList.md) (`Procedure`, `WWPBaseObjects.SMS`)
- depth 1: [WWP_SendSMSResultSDT](../SDTs/WWPBaseObjects/SMS/WWP_SendSMSResultSDT.md) (`SDT`, `WWPBaseObjects.SMS`)
- depth 1: [WWP_SMS](../Transactions/WWPBaseObjects/SMS/WWP_SMS.md) (`Transaction`, `WWPBaseObjects.SMS`)
- depth 1: [WWP_SMSParametersSDT](../SDTs/WWPBaseObjects/SMS/WWP_SMSParametersSDT.md) (`SDT`, `WWPBaseObjects.SMS`)
- depth 1: [WWP_UpdateSMSStatus](../Procedures/WWPBaseObjects/SMS/WWP_UpdateSMSStatus.md) (`Procedure`, `WWPBaseObjects.SMS`)

## Efectos en datos

- **Tablas leídas:** `WWP_SMS`
- **Tablas escritas:** `WWP_SMS`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_SMS](../_domain_glossary.md#wwp-sms)
