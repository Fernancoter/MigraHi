# Proceso: EmbarqueDetalle

- **Entry point:** [EmbarqueDetalle](../Transactions/DB/EmbarqueDetalle.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Embarques.CargarEmbarque`, `Embarques.ContarEmbarqueLineasValidadas`, `Embarques.CrearEmbarque`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 3
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_embarque_detalle.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [EmbarqueDetalle](../Transactions/DB/EmbarqueDetalle.md) (`Transaction`, `DB`)
- depth 1: [EmbarqueDetalleView](../WebPanels/DB/EmbarqueDetalleView.md) (`WebPanel`, `DB`)
- depth 1: [LoadAuditEmbarqueDetalle](../Procedures/DB/LoadAuditEmbarqueDetalle.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `EmbarqueDetalle`
- **Tablas escritas:** `EmbarqueDetalle`
- **SDTs usados:** `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [EmbarqueDetalle](../_domain_glossary.md#embarquedetalle)
