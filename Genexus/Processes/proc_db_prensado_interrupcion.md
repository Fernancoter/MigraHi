# Proceso: PrensadoInterrupcion

- **Entry point:** [PrensadoInterrupcion](../Transactions/DB/PrensadoInterrupcion.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.ObtenerInterrupcionCarrera`, `Produccion.PrensaDetenida`, `Produccion.SDInterrupcionEnCurso`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`, `Reportes`
- **Mergeado con:** `PrensadoInterrupMin`, `PrensadoInterrupcionWW` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_prensado_interrupcion.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PrensadoInterrupcion](../Transactions/DB/PrensadoInterrupcion.md) (`Transaction`, `DB`)
- depth 0: [PrensadoInterrupcionWW](../WebPanels/DB/PrensadoInterrupcionWW.md) (`WebPanel`, `DB`)
- depth 0: [PrensadoInterrupMin](../Procedures/Reportes/PrensadoInterrupMin.md) (`Procedure`, `Reportes`)
- depth 1: [LoadAuditPrensadoInterrupcion](../Procedures/DB/LoadAuditPrensadoInterrupcion.md) (`Procedure`, `DB`)
- depth 1: [PrensadoInterrupcionView](../WebPanels/DB/PrensadoInterrupcionView.md) (`WebPanel`, `DB`)
- depth 1: [PrensadoInterrupcionWWExport](../Procedures/DB/PrensadoInterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 1: [PrensadoInterrupcionWWExportReport](../Procedures/DB/PrensadoInterrupcionWWExportReport.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `PrensadoInterrupcion`
- **Tablas escritas:** `PrensadoInterrupcion`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [PrensadoInterrupcion](../_domain_glossary.md#prensadointerrupcion)
