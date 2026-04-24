# Proceso: Customer

- **Entry point:** [CustomerWW](../WebPanels/DB/CustomerWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes > Customer`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_customer_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CustomerWW](../WebPanels/DB/CustomerWW.md) (`WebPanel`, `DB`)
- depth 1: [Customer](../Transactions/DB/Customer.md) (`Transaction`, `DB`)
- depth 1: [CustomerWWExport](../Procedures/DB/CustomerWWExport.md) (`Procedure`, `DB`)
- depth 1: [CustomerWWExportReport](../Procedures/DB/CustomerWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [CustomerWWGetFilterData](../Procedures/DB/CustomerWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [LoadAuditCustomer](../Procedures/DB/LoadAuditCustomer.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Customer`
- **Tablas escritas:** `Customer`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Customer](../_domain_glossary.md#customer)
