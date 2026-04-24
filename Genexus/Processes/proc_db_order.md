# Proceso: Order

- **Entry point:** [Order](../Transactions/DB/Order.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Embarques.CrearEmbarque`, `Embarques.InicializarEmbarque`, `Embarques.ListadoOrdenes`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 1
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_order.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Order](../Transactions/DB/Order.md) (`Transaction`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Order`
- **Tablas escritas:** `Order`
- **SDTs usados:** `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Order](../_domain_glossary.md#order)
