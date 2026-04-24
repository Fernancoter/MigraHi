# Proceso: Report Orders Price

- **Entry point:** [OrdersMoney](../WebPanels/SAE/OrdersMoney.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes > Report Orders Price`
- **Módulo principal:** `SAE`
- **Objetos en el proceso:** 4
- **Módulos tocados:** `Informes`, `SAE`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_sae_orders_money.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [OrdersMoney](../WebPanels/SAE/OrdersMoney.md) (`WebPanel`, `SAE`)
- depth 1: [InformesTelerik](../Procedures/Informes/InformesTelerik.md) (`Procedure`, `Informes`)
- depth 1: [SDTInformeFilter](../SDTs/Informes/SDTInformeFilter.md) (`SDT`, `Informes`)
- depth 1: [SDTTelerik](../SDTs/Informes/SDTTelerik.md) (`SDT`, `Informes`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `Informes.SDTInformeFilter`, `Informes.SDTTelerik`, `SDTInformeFilter`, `SDTTelerik`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
