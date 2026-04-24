# Proceso: LlenadoBobinaInterrupcion

- **Entry point:** [LlenadoBobinaInterrupcion](../Procedures/DB/LlenadoBobinaInterrupcion.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.vwAnaliticaBobina`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 15
- **Módulos tocados:** `DB`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_llenado_bobina_interrupcion.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [LlenadoBobinaInterrupcion](../Procedures/DB/LlenadoBobinaInterrupcion.md) (`Procedure`, `DB`)
- depth 1: [Interrupcion](../Transactions/DB/Interrupcion.md) (`Transaction`, `DB`)
- depth 1: [ObtenerInterrupcionBobina](../Procedures/Produccion/ObtenerInterrupcionBobina.md) (`Procedure`, `Produccion`)
- depth 2: [ExtrusionInterrupcion](../Transactions/DB/ExtrusionInterrupcion.md) (`Transaction`, `DB`)
- depth 2: [InterrupcionView](../WebPanels/DB/InterrupcionView.md) (`WebPanel`, `DB`)
- depth 2: [InterrupcionWW](../WebPanels/DB/InterrupcionWW.md) (`WebPanel`, `DB`)
- depth 2: [LoadAuditInterrupcion](../Procedures/DB/LoadAuditInterrupcion.md) (`Procedure`, `DB`)
- depth 3: [ExtrusionInterrupcionView](../WebPanels/DB/ExtrusionInterrupcionView.md) (`WebPanel`, `DB`)
- depth 3: [ExtrusionInterrupcionWW](../WebPanels/DB/ExtrusionInterrupcionWW.md) (`WebPanel`, `DB`)
- depth 3: [InterrupcionWWExport](../Procedures/DB/InterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 3: [InterrupcionWWExportReport](../Procedures/DB/InterrupcionWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [InterrupcionWWGetFilterData](../Procedures/DB/InterrupcionWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [LoadAuditExtrusionInterrupcion](../Procedures/DB/LoadAuditExtrusionInterrupcion.md) (`Procedure`, `DB`)
- depth 4: [ExtrusionInterrupcionWWExport](../Procedures/DB/ExtrusionInterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 4: [ExtrusionInterrupcionWWExportReport](../Procedures/DB/ExtrusionInterrupcionWWExportReport.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Bobina`, `DB.Order`, `ExtrusionInterrupcion`, `Interrupcion`
- **Tablas escritas:** `Bobina`, `ExtrusionInterrupcion`, `Interrupcion`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [ExtrusionInterrupcion](../_domain_glossary.md#extrusioninterrupcion)
- [Interrupcion](../_domain_glossary.md#interrupcion)
