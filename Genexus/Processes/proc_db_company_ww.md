# Proceso: CompanyWW

- **Entry point:** [CompanyWW](../WebPanels/DB/CompanyWW.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`
- **Mergeado con:** `CompanyView` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_company_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CompanyView](../WebPanels/DB/CompanyView.md) (`WebPanel`, `DB`)
- depth 0: [CompanyWW](../WebPanels/DB/CompanyWW.md) (`WebPanel`, `DB`)
- depth 1: [Company](../Transactions/DB/Company.md) (`Transaction`, `DB`)
- depth 1: [CompanyWWExport](../Procedures/DB/CompanyWWExport.md) (`Procedure`, `DB`)
- depth 1: [CompanyWWExportReport](../Procedures/DB/CompanyWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [CompanyWWGetFilterData](../Procedures/DB/CompanyWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [LoadAuditCompany](../Procedures/DB/LoadAuditCompany.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Company`
- **Tablas escritas:** `Company`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Company](../_domain_glossary.md#company)
