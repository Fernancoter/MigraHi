# Proceso: Budget

- **Entry point:** [BudgetWW](../WebPanels/DB/BudgetWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes > Budget`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 11
- **Módulos tocados:** `DB`, `SAE`
- **Mergeado con:** `outlookww`, `Budget`, `Actualizando`, `EditBudget` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_budget_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Budget](../Transactions/DB/Budget.md) (`Transaction`, `DB`)
- depth 0: [BudgetWW](../WebPanels/DB/BudgetWW.md) (`WebPanel`, `DB`)
- depth 0: [Actualizando](../Procedures/SAE/Actualizando.md) (`Procedure`, `SAE`)
- depth 0: [EditBudget](../WebPanels/SAE/EditBudget.md) (`WebPanel`, `SAE`)
- depth 0: [outlookww](../WebPanels/SAE/outlookww.md) (`WebPanel`, `SAE`)
- depth 1: [BudgetView](../WebPanels/DB/BudgetView.md) (`WebPanel`, `DB`)
- depth 1: [BudgetWWExport](../Procedures/DB/BudgetWWExport.md) (`Procedure`, `DB`)
- depth 1: [BudgetWWExportReport](../Procedures/DB/BudgetWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [BudgetWWGetFilterData](../Procedures/DB/BudgetWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [LoadAuditBudget](../Procedures/DB/LoadAuditBudget.md) (`Procedure`, `DB`)
- depth 1: [SDTBudget](../SDTs/SAE/SDTBudget.md) (`SDT`, `SAE`)

## Efectos en datos

- **Tablas leídas:** `Budget`, `DB.Budget`
- **Tablas escritas:** `Budget`, `DB.Budget`
- **SDTs usados:** `GeneXus.Common.GridState`, `SDTBudget`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Budget](../_domain_glossary.md#budget)
