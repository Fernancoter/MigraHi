# Proceso: NotificarImpresion

- **Entry point:** [NotificarImpresion](../Procedures/Embarques/NotificarImpresion.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Root.ProcedureNotificarReimpresionEtiquetaPalet`
- **Módulo principal:** `Embarques`
- **Objetos en el proceso:** 22
- **Módulos tocados:** `DB`, `Embarques`, `GeneXus.Common`, `Produccion`, `Root`, `WWPBaseObjects`, `WWPBaseObjects.Mail`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_embarques_notificar_impresion.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [NotificarImpresion](../Procedures/Embarques/NotificarImpresion.md) (`Procedure`, `Embarques`)
- depth 1: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 1: [SDTPalet](../SDTs/Produccion/SDTPalet.md) (`SDT`, `Produccion`)
- depth 1: [WWP_Mail](../Transactions/WWPBaseObjects/Mail/WWP_Mail.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_MailTemplate](../Transactions/WWPBaseObjects/Mail/WWP_MailTemplate.md) (`Transaction`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_SendMail](../Procedures/WWPBaseObjects/Mail/WWP_SendMail.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 1: [WWP_GetParameter](../Procedures/WWPBaseObjects/WWP_GetParameter.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 2: [LoadAuditWWP_MailTemplate](../Procedures/WWPBaseObjects/Mail/LoadAuditWWP_MailTemplate.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_GetStatusCodeMessage](../Procedures/WWPBaseObjects/Mail/WWP_GetStatusCodeMessage.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_MailTemplateView](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateView.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_MailTemplateWW](../WebPanels/WWPBaseObjects/Mail/WWP_MailTemplateWW.md) (`WebPanel`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_ParseMailAddressList](../Procedures/WWPBaseObjects/Mail/WWP_ParseMailAddressList.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 2: [WWP_UpdateMailStatus](../Procedures/WWPBaseObjects/Mail/WWP_UpdateMailStatus.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 3: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 3: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 3: [WWP_MailTemplateWWExport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplateWWExportReport](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWExportReport.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 3: [WWP_MailTemplateWWGetFilterData](../Procedures/WWPBaseObjects/Mail/WWP_MailTemplateWWGetFilterData.md) (`Procedure`, `WWPBaseObjects.Mail`)
- depth 4: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 4: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `WWP_Mail`, `WWP_MailTemplate`
- **Tablas escritas:** `Configuracion`, `WWP_Mail`, `WWP_MailTemplate`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [WWP_Mail](../_domain_glossary.md#wwp-mail)
- [WWP_MailTemplate](../_domain_glossary.md#wwp-mailtemplate)
