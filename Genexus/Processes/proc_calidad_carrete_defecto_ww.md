# Proceso: Defectos

- **Entry point:** [CarreteDefectoWW](../WebPanels/Calidad/CarreteDefectoWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Calidad > Defectos`
- **Módulo principal:** `Calidad`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `Calidad`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_calidad_carrete_defecto_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [CarreteDefectoWW](../WebPanels/Calidad/CarreteDefectoWW.md) (`WebPanel`, `Calidad`)
- depth 1: [CarreteDefecto](../Transactions/Calidad/CarreteDefecto.md) (`Transaction`, `Calidad`)
- depth 1: [CarreteDefectoView](../WebPanels/Calidad/CarreteDefectoView.md) (`WebPanel`, `Calidad`)
- depth 1: [CarreteDefectoWWExport](../Procedures/Calidad/CarreteDefectoWWExport.md) (`Procedure`, `Calidad`)
- depth 1: [CarreteDefectoWWExportReport](../Procedures/Calidad/CarreteDefectoWWExportReport.md) (`Procedure`, `Calidad`)
- depth 1: [CarreteDefectoWWGetFilterData](../Procedures/Calidad/CarreteDefectoWWGetFilterData.md) (`Procedure`, `Calidad`)
- depth 2: [LoadAuditCarreteDefecto](../Procedures/Calidad/LoadAuditCarreteDefecto.md) (`Procedure`, `Calidad`)

## Efectos en datos

- **Tablas leídas:** `CarreteDefecto`
- **Tablas escritas:** `CarreteDefecto`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [CarreteDefecto](../_domain_glossary.md#carretedefecto)
