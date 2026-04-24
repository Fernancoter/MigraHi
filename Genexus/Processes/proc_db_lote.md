# Proceso: Lote

- **Entry point:** [Lote](../Transactions/DB/Lote.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Existencia.ObtenerExistenciaSilo`, `Produccion.gestionarLote`, `Produccion.listarLotes`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 2
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_lote.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Lote](../Transactions/DB/Lote.md) (`Transaction`, `DB`)
- depth 1: [LoadAuditLote](../Procedures/DB/LoadAuditLote.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Lote`
- **Tablas escritas:** `Lote`
- **SDTs usados:** `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Lote](../_domain_glossary.md#lote)
