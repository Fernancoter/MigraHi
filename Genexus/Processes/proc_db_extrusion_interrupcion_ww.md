# Proceso: ExtrusionInterrupcionWW

- **Entry point:** [ExtrusionInterrupcionWW](../WebPanels/DB/ExtrusionInterrupcionWW.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`, `Produccion`
- **Mergeado con:** `ObtenerInterrupcionBobina`, `ExtrusionInterrupcion` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_extrusion_interrupcion_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ExtrusionInterrupcion](../Transactions/DB/ExtrusionInterrupcion.md) (`Transaction`, `DB`)
- depth 0: [ExtrusionInterrupcionWW](../WebPanels/DB/ExtrusionInterrupcionWW.md) (`WebPanel`, `DB`)
- depth 0: [ObtenerInterrupcionBobina](../Procedures/Produccion/ObtenerInterrupcionBobina.md) (`Procedure`, `Produccion`)
- depth 1: [ExtrusionInterrupcionView](../WebPanels/DB/ExtrusionInterrupcionView.md) (`WebPanel`, `DB`)
- depth 1: [ExtrusionInterrupcionWWExport](../Procedures/DB/ExtrusionInterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 1: [ExtrusionInterrupcionWWExportReport](../Procedures/DB/ExtrusionInterrupcionWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [LoadAuditExtrusionInterrupcion](../Procedures/DB/LoadAuditExtrusionInterrupcion.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `DB.Order`, `ExtrusionInterrupcion`
- **Tablas escritas:** `ExtrusionInterrupcion`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [ExtrusionInterrupcion](../_domain_glossary.md#extrusioninterrupcion)
