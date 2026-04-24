# Proceso: Reclamos

- **Entry point:** [reclamosww](../WebPanels/Calidad/reclamosww.md) -- tipo menú
- **Ruta en el menú:** `Web > Calidad > Reclamos`
- **Módulo principal:** `Calidad`
- **Objetos en el proceso:** 14
- **Módulos tocados:** `Calidad`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_calidad_reclamosww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [reclamosww](../WebPanels/Calidad/reclamosww.md) (`WebPanel`, `Calidad`)
- depth 1: [EditarReclamoDetalle](../WebPanels/Calidad/EditarReclamoDetalle.md) (`WebPanel`, `Calidad`)
- depth 1: [Reclamo](../Transactions/Calidad/Reclamo.md) (`Transaction`, `Calidad`)
- depth 1: [ReclamoFormato](../WebPanels/Calidad/ReclamoFormato.md) (`WebPanel`, `Calidad`)
- depth 1: [reclamoswwExport](../Procedures/Calidad/reclamoswwExport.md) (`Procedure`, `Calidad`)
- depth 1: [reclamoswwExportReport](../Procedures/Calidad/reclamoswwExportReport.md) (`Procedure`, `Calidad`)
- depth 1: [reclamoswwGetFilterData](../Procedures/Calidad/reclamoswwGetFilterData.md) (`Procedure`, `Calidad`)
- depth 2: [LoadAuditReclamo](../Procedures/Calidad/LoadAuditReclamo.md) (`Procedure`, `Calidad`)
- depth 2: [ReclamoDetalle](../Transactions/Calidad/ReclamoDetalle.md) (`Transaction`, `Calidad`)
- depth 2: [ReclamoProductoDP](../DataProviders/Calidad/ReclamoProductoDP.md) (`DataProvider`, `Calidad`)
- depth 3: [CarreteDefectoPrompt](../WebPanels/Calidad/CarreteDefectoPrompt.md) (`WebPanel`, `Calidad`)
- depth 3: [LoadAuditReclamoDetalle](../Procedures/Calidad/LoadAuditReclamoDetalle.md) (`Procedure`, `Calidad`)
- depth 3: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 4: [CarreteDefecto](../Transactions/Calidad/CarreteDefecto.md) (`Transaction`, `Calidad`)

## Efectos en datos

*(pending Phase 3.2 -- tablesRead, tablesWritten, sdtsUsed, dpsUsed se resolverán y se agregarán aquí)*

## Entidades relacionadas (del glosario)

- [CarreteDefecto](../_domain_glossary.md#carretedefecto)
- [Reclamo](../_domain_glossary.md#reclamo)
- [ReclamoDetalle](../_domain_glossary.md#reclamodetalle)
