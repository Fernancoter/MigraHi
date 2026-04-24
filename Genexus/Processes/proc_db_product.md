# Proceso: Product

- **Entry point:** [Product](../Transactions/DB/Product.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Embarques.ProductsWW`, `Embarques.ProductsWWExport`, `Embarques.ProductsWWExportReport`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 2
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_product.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Product](../Transactions/DB/Product.md) (`Transaction`, `DB`)
- depth 1: [LoadAuditProduct](../Procedures/DB/LoadAuditProduct.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Product`
- **Tablas escritas:** `Product`
- **SDTs usados:** `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Product](../_domain_glossary.md#product)
