# Proceso: Remission

- **Entry point:** [Remission](../Transactions/DB/Remission.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Embarques.CrearEmbarque`, `Embarques.InicializarEmbarque`, `Embarques.ListadoRemisiones`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 2
- **Módulos tocados:** `DB`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_remission.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Remission](../Transactions/DB/Remission.md) (`Transaction`, `DB`)
- depth 1: [LoadAuditRemission](../Procedures/DB/LoadAuditRemission.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Remission`
- **Tablas escritas:** `Remission`
- **SDTs usados:** `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Remission](../_domain_glossary.md#remission)
