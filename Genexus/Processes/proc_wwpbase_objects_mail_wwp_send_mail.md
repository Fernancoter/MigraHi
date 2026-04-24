# Proceso: WWP_SendMail

- **Entry point:** [WWP_SendMail](../Procedures/WWPBaseObjects/Mail/WWP_SendMail.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Embarques.NotificarImpresion`, `Embarques.NotificarSupervisor`, `WWPBaseObjects.Notifications.Common.WWP_SendPendingNotifications`
- **Módulo principal:** `WWPBaseObjects.Mail`
- **Objetos en el proceso:** 5
- **Módulos tocados:** `WWPBaseObjects.Mail`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_mail_wwp_send_mail.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_SendMail](../Procedures/WWPBaseObjects/Mail/WWP_SendMail.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_GetStatusCodeMessage](../Procedures/WWPBaseObjects/Mail/WWP_GetStatusCodeMessage.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_Mail](../Transactions/WWPBaseObjects/Mail/WWP_Mail.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_ParseMailAddressList](../Procedures/WWPBaseObjects/Mail/WWP_ParseMailAddressList.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_UpdateMailStatus](../Procedures/WWPBaseObjects/Mail/WWP_UpdateMailStatus.md) (`Procedure`, `WWPBaseObjects.Mail`)

## Efectos en datos

- **Tablas leídas:** `WWP_Mail`
- **Tablas escritas:** `WWP_Mail`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Mail](../_domain_glossary.md#wwp-mail)
