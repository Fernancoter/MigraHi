# Proceso: Product

- **Entry point:** [ProductsWW](../WebPanels/Embarques/ProductsWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes > Product`
- **Módulo principal:** `Embarques`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`, `Embarques`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_embarques_products_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ProductsWW](../WebPanels/Embarques/ProductsWW.md) (`WebPanel`, `Embarques`)
- depth 1: [Product](../Transactions/DB/Product.md) (`Transaction`, `DB`)
- depth 1: [ProductsWWExport](../Procedures/Embarques/ProductsWWExport.md) (`Procedure`, `Embarques`)
- depth 1: [ProductsWWExportReport](../Procedures/Embarques/ProductsWWExportReport.md) (`Procedure`, `Embarques`)
- depth 1: [ProductsWWGetFilterData](../Procedures/Embarques/ProductsWWGetFilterData.md) (`Procedure`, `Embarques`)
- depth 2: [LoadAuditProduct](../Procedures/DB/LoadAuditProduct.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Product`
- **Tablas escritas:** `Product`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Product](../_domain_glossary.md#product)
