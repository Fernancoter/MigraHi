# Proceso: WWP_GetSMTPParameters

- **Entry point:** [WWP_GetSMTPParameters](../Procedures/WWPBaseObjects/Mail/WWP_GetSMTPParameters.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.Notifications.Common.WWP_SendPendingNotifications`
- **Módulo principal:** `WWPBaseObjects.Mail`
- **Objetos en el proceso:** 3
- **Módulos tocados:** `WWPBaseObjects`, `WWPBaseObjects.Mail`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_mail_wwp_get_smtpparameters.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_GetSMTPParameters](../Procedures/WWPBaseObjects/Mail/WWP_GetSMTPParameters.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_SMTPParametersSDT](../SDTs/WWPBaseObjects/Mail/WWP_SMTPParametersSDT.md) (`SDT`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_GetParameter](../Procedures/WWPBaseObjects/WWP_GetParameter.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
