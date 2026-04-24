# Proceso: InicioReportes

- **Entry point:** [InicioReportes](../WebPanels/SAE/InicioReportes.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Web.Modules`
- **Módulo principal:** `SAE`
- **Objetos en el proceso:** 8
- **Módulos tocados:** `DB`, `SAE`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_sae_inicio_reportes.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [InicioReportes](../WebPanels/SAE/InicioReportes.md) (`WebPanel`, `SAE`)
- depth 1: [SyncSAE](../Procedures/SAE/SyncSAE.md) (`Procedure`, `SAE`)
- depth 2: [Actualizando](../Procedures/SAE/Actualizando.md) (`Procedure`, `SAE`)
- depth 3: [Budget](../Transactions/DB/Budget.md) (`Transaction`, `DB`)
- depth 4: [BudgetView](../WebPanels/DB/BudgetView.md) (`WebPanel`, `DB`)
- depth 4: [BudgetWW](../WebPanels/DB/BudgetWW.md) (`WebPanel`, `DB`)
- depth 4: [LoadAuditBudget](../Procedures/DB/LoadAuditBudget.md) (`Procedure`, `DB`)
- depth 4: [EditBudget](../WebPanels/SAE/EditBudget.md) (`WebPanel`, `SAE`)

## Efectos en datos

- **Tablas leídas:** `Budget`, `DB.Budget`
- **Tablas escritas:** `Budget`, `DB.Budget`
- **SDTs usados:** `GeneXus.Common.GridState`, `SDTBudget`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Budget](../_domain_glossary.md#budget)
