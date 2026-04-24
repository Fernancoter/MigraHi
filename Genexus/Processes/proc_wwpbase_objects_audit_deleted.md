# Proceso: AuditDeleted

- **Entry point:** [AuditDeleted](../WebPanels/WWPBaseObjects/AuditDeleted.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.CarreraWW`, `Produccion.listarTroquel`, `Produccion.vwAnaliticaBobina`
- **Módulo principal:** `WWPBaseObjects`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_wwpbase_objects_audit_deleted.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [AuditDeleted](../WebPanels/WWPBaseObjects/AuditDeleted.md) (`WebPanel`, `WWPBaseObjects`)
- depth 1: [AuditView](../WebPanels/WWPBaseObjects/AuditView.md) (`WebPanel`, `WWPBaseObjects`)
- depth 2: [Audit](../Transactions/WWPBaseObjects/Audit.md) (`Transaction`, `WWPBaseObjects`)
- depth 2: [AuditWW](../WebPanels/WWPBaseObjects/AuditWW.md) (`WebPanel`, `WWPBaseObjects`)
- depth 3: [AuditWWExport](../Procedures/WWPBaseObjects/AuditWWExport.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [AuditWWExportReport](../Procedures/WWPBaseObjects/AuditWWExportReport.md) (`Procedure`, `WWPBaseObjects`)
- depth 3: [AuditWWGetFilterData](../Procedures/WWPBaseObjects/AuditWWGetFilterData.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Audit`
- **Tablas escritas:** `Audit`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPColumnsSelector`, `WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Audit](../_domain_glossary.md#audit)
