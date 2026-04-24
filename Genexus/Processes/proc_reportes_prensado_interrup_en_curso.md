# Proceso: PrensadoInterrupEnCurso

- **Entry point:** [PrensadoInterrupEnCurso](../Procedures/Reportes/PrensadoInterrupEnCurso.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.LoadAuditPrensado`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`, `Reportes`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_prensado_interrup_en_curso.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PrensadoInterrupEnCurso](../Procedures/Reportes/PrensadoInterrupEnCurso.md) (`Procedure`, `Reportes`)
- depth 1: [PrensadoInterrupcion](../Transactions/DB/PrensadoInterrupcion.md) (`Transaction`, `DB`)
- depth 2: [LoadAuditPrensadoInterrupcion](../Procedures/DB/LoadAuditPrensadoInterrupcion.md) (`Procedure`, `DB`)
- depth 2: [PrensadoInterrupcionView](../WebPanels/DB/PrensadoInterrupcionView.md) (`WebPanel`, `DB`)
- depth 2: [PrensadoInterrupcionWW](../WebPanels/DB/PrensadoInterrupcionWW.md) (`WebPanel`, `DB`)
- depth 3: [PrensadoInterrupcionWWExport](../Procedures/DB/PrensadoInterrupcionWWExport.md) (`Procedure`, `DB`)
- depth 3: [PrensadoInterrupcionWWExportReport](../Procedures/DB/PrensadoInterrupcionWWExportReport.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `PrensadoInterrupcion`
- **Tablas escritas:** `PrensadoInterrupcion`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [PrensadoInterrupcion](../_domain_glossary.md#prensadointerrupcion)
