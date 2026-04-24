# Proceso: StatementOfIncomeWW

- **Entry point:** [StatementOfIncomeWW](../WebPanels/DB/StatementOfIncomeWW.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_statement_of_income_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [StatementOfIncomeWW](../WebPanels/DB/StatementOfIncomeWW.md) (`WebPanel`, `DB`)
- depth 1: [StatementOfIncome](../Transactions/DB/StatementOfIncome.md) (`Transaction`, `DB`)
- depth 1: [StatementOfIncomeView](../WebPanels/DB/StatementOfIncomeView.md) (`WebPanel`, `DB`)
- depth 1: [StatementOfIncomeWWExport](../Procedures/DB/StatementOfIncomeWWExport.md) (`Procedure`, `DB`)
- depth 1: [StatementOfIncomeWWExportReport](../Procedures/DB/StatementOfIncomeWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [StatementOfIncomeWWGetFilterData](../Procedures/DB/StatementOfIncomeWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [LoadAuditStatementOfIncome](../Procedures/DB/LoadAuditStatementOfIncome.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `StatementOfIncome`
- **Tablas escritas:** `StatementOfIncome`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [StatementOfIncome](../_domain_glossary.md#statementofincome)
