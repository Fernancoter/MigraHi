# Proceso: Price

- **Entry point:** [priceww](../WebPanels/SAE/priceww.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes > Price`
- **Módulo principal:** `SAE`
- **Objetos en el proceso:** 12
- **Módulos tocados:** `DB`, `SAE`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_sae_priceww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [priceww](../WebPanels/SAE/priceww.md) (`WebPanel`, `SAE`)
- depth 1: [Budget](../Transactions/DB/Budget.md) (`Transaction`, `DB`)
- depth 1: [SDTBudget](../SDTs/SAE/SDTBudget.md) (`SDT`, `SAE`)
- depth 1: [DVMessageGetBasicNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetBasicNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [BudgetView](../WebPanels/DB/BudgetView.md) (`WebPanel`, `DB`)
- depth 2: [BudgetWW](../WebPanels/DB/BudgetWW.md) (`WebPanel`, `DB`)
- depth 2: [LoadAuditBudget](../Procedures/DB/LoadAuditBudget.md) (`Procedure`, `DB`)
- depth 2: [EditBudget](../WebPanels/SAE/EditBudget.md) (`WebPanel`, `SAE`)
- depth 2: [DVMessageGetAdvancedNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetAdvancedNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [BudgetWWExport](../Procedures/DB/BudgetWWExport.md) (`Procedure`, `DB`)
- depth 3: [BudgetWWExportReport](../Procedures/DB/BudgetWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [BudgetWWGetFilterData](../Procedures/DB/BudgetWWGetFilterData.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Budget`, `DB.Budget`
- **Tablas escritas:** `Budget`, `DB.Budget`
- **SDTs usados:** `GeneXus.Common.GridState`, `SDTBudget`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Budget](../_domain_glossary.md#budget)
