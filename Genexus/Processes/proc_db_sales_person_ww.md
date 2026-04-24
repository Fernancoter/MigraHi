# Proceso: SalesPerson

- **Entry point:** [SalesPersonWW](../WebPanels/DB/SalesPersonWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes > SalesPerson`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_sales_person_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [SalesPersonWW](../WebPanels/DB/SalesPersonWW.md) (`WebPanel`, `DB`)
- depth 1: [SalesPerson](../Transactions/DB/SalesPerson.md) (`Transaction`, `DB`)
- depth 1: [SalesPersonWWExport](../Procedures/DB/SalesPersonWWExport.md) (`Procedure`, `DB`)
- depth 1: [SalesPersonWWExportReport](../Procedures/DB/SalesPersonWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [SalesPersonWWGetFilterData](../Procedures/DB/SalesPersonWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [LoadAuditSalesPerson](../Procedures/DB/LoadAuditSalesPerson.md) (`Procedure`, `DB`)
- depth 2: [SalesPersonView](../WebPanels/DB/SalesPersonView.md) (`WebPanel`, `DB`)

## Efectos en datos

- **Tablas leídas:** `SalesPerson`
- **Tablas escritas:** `SalesPerson`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [SalesPerson](../_domain_glossary.md#salesperson)
