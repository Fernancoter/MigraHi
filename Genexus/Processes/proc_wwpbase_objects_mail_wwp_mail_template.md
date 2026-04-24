# Proceso: WWP_MailTemplate

- **Entry point:** [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Embarques.NotificarImpresion`, `Embarques.NotificarSupervisor`, `WWPBaseObjects.Notifications.Common.WWP_CreateNotificationToUser`
- **Módulo principal:** `WWPBaseObjects.Mail`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `WWPBaseObjects.Mail`
- **Mergeado con:** `WWP_MailTemplateWW` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_mail_wwp_mail_template.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 0: [WWP_MailTemplateWW](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateWW.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 1: [LoadAuditWWP_MailTemplate](../Procedures/WWPBaseObjects/Mail/LoadAuditWWP_MailTemplate.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_MailTemplateView](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateView.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_MailTemplateWWExport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_MailTemplateWWExportReport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExportReport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_MailTemplateWWGetFilterData](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWGetFilterData.md) (`Procedure`, `WWPBaseObjects.Mail`)

## Efectos en datos

- **Tablas leídas:** `WWP_MailTemplate`
- **Tablas escritas:** `WWP_MailTemplate`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_MailTemplate](../_domain_glossary.md#wwp-mailtemplate)
