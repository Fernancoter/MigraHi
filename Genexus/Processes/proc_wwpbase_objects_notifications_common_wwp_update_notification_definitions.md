# Proceso: WWP_UpdateNotificationDefinitions

- **Entry point:** [WWP_UpdateNotificationDefinitions](../Procedures/WWPBaseObjects/Notifications/Common/WWP_UpdateNotificationDefinitions.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.WWP_ImpactMetadata`
- **Módulo principal:** `WWPBaseObjects.Notifications.Common`
- **Objetos en el proceso:** 14
- **Módulos tocados:** `WWPBaseObjects`, `WWPBaseObjects.Mail`, `WWPBaseObjects.Notifications.Common`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_notifications_common_wwp_update_notification_definitions.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [WWP_UpdateNotificationDefinitions](../Procedures/WWPBaseObjects/Notifications/Common/WWP_UpdateNotificationDefinitions.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_AutomaticNotificationDefinitionsToLoad](../DataProviders/WWPBaseObjects/Notifications/Common/WWP_AutomaticNotificationDefinitionsToLoad.md) (`DataProvider`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_GetNotificationDefinitionByName](../Procedures/WWPBaseObjects/Notifications/Common/WWP_GetNotificationDefinitionByName.md) (`Procedure`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_NotificationDefinition](../Transactions/WWPBaseObjects/Notifications/Common/WWP_NotificationDefinition.md) (`Transaction`, `WWPBaseObjects.Notifications.Common`)
- depth 1: [WWP_GetParameter](../Procedures/WWPBaseObjects/WWP_GetParameter.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [LoadAuditWWP_MailTemplate](../Procedures/WWPBaseObjects/Mail/LoadAuditWWP_MailTemplate.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_MailTemplateView](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateView.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_MailTemplateWW](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateWW.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_GetEntityByName](../Procedures/WWPBaseObjects/WWP_GetEntityByName.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [WWP_MailTemplateWWExport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplateWWExportReport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExportReport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplateWWGetFilterData](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWGetFilterData.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_Entity](../Transactions/WWPBaseObjects/WWP_Entity.md) (`Transaction`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `WWP_Entity`, `WWP_MailTemplate`, `WWP_NotificationDefinition`
- **Tablas escritas:** `WWP_Entity`, `WWP_MailTemplate`, `WWP_NotificationDefinition`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [WWP_Entity](../_domain_glossary.md#wwp-entity)
- [WWP_MailTemplate](../_domain_glossary.md#wwp-mailtemplate)
- [WWP_NotificationDefinition](../_domain_glossary.md#wwp-notificationdefinition)
