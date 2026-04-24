# Proceso: Realtime Inventory

- **Entry point:** [RealtimeInventory](../WebPanels/SAE/RealtimeInventory.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes > Realtime Inventory`
- **Módulo principal:** `SAE`
- **Objetos en el proceso:** 4
- **Módulos tocados:** `Informes`, `SAE`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_sae_realtime_inventory.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [RealtimeInventory](../WebPanels/SAE/RealtimeInventory.md) (`WebPanel`, `SAE`)
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
