# Proceso: SDPCartProductsList

- **Entry point:** [SDPCartProductsList](../Procedures/Root/SDPCartProductsList.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.SDEliminarNotificacion`, `Produccion.SDLimpiarNotificaciones`
- **Módulo principal:** `Root`
- **Objetos en el proceso:** 3
- **Módulos tocados:** `Root`, `WorkWithPlus.NativeMobile`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_root_sdpcart_products_list.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [SDPCartProductsList](../Procedures/Root/SDPCartProductsList.md) (`Procedure`, `Root`)
- depth 1: [SDPCartProduct](../SDTs/Root/SDPCartProduct.md) (`SDT`, `Root`)
- depth 2: [SDPProductData](../SDTs/WorkWithPlus/NativeMobile/SDPProductData.md) (`SDT`, `WorkWithPlus.NativeMobile`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
