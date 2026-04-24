# Proceso: GenerarBobinaNo

- **Entry point:** [GenerarBobinaNo](../Procedures/Produccion/GenerarBobinaNo.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `admin.InsertarManualenteBobinas`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 10
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_generar_bobina_no.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [GenerarBobinaNo](../Procedures/Produccion/GenerarBobinaNo.md) (`Procedure`, `Produccion`)
- depth 1: [Inventario](../Transactions/DB/Inventario.md) (`Transaction`, `DB`)
- depth 1: [SDInventarioItem](../Procedures/Produccion/SDInventarioItem.md) (`Procedure`, `Produccion`)
- depth 1: [SDTInventario](../SDTs/Produccion/SDTInventario.md) (`SDT`, `Produccion`)
- depth 2: [LoadAuditInventario](../Procedures/DB/LoadAuditInventario.md) (`Procedure`, `DB`)
- depth 2: [ViewInventario](../WebPanels/DB/ViewInventario.md) (`WebPanel`, `DB`)
- depth 2: [WWInventario](../WebPanels/DB/WWInventario.md) (`WebPanel`, `DB`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)
- depth 3: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `DB.Inventario`, `DB.Order`, `Inventario`
- **Tablas escritas:** `DB.Inventario`, `Inventario`
- **SDTs usados:** `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Inventario](../_domain_glossary.md#inventario)
