# Proceso: InformesTelerik

- **Entry point:** [InformesTelerik](../Procedures/Informes/InformesTelerik.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Embarques.EmbarqueFormato`, `SAE.FTBYTD`, `SAE.Orders`
- **Módulo principal:** `Informes`
- **Objetos en el proceso:** 3
- **Módulos tocados:** `Informes`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_informes_informes_telerik.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [InformesTelerik](../Procedures/Informes/InformesTelerik.md) (`Procedure`, `Informes`)
- depth 1: [SDTInformeFilter](../SDTs/Informes/SDTInformeFilter.md) (`SDT`, `Informes`)
- depth 1: [SDTTelerik](../SDTs/Informes/SDTTelerik.md) (`SDT`, `Informes`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** `SDTInformeFilter`, `SDTTelerik`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
