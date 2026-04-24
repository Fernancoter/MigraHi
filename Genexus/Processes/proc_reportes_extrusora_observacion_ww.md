# Proceso: Extrusoras

- **Entry point:** [ExtrusoraObservacionWW](../WebPanels/Reportes/ExtrusoraObservacionWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes HC > Observaciones > Extrusoras`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 13
- **Módulos tocados:** `Produccion`, `Reportes`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_extrusora_observacion_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ExtrusoraObservacionWW](../WebPanels/Reportes/ExtrusoraObservacionWW.md) (`WebPanel`, `Reportes`)
- depth 1: [ExtrusoraObservacion](../Transactions/Reportes/ExtrusoraObservacion.md) (`Transaction`, `Reportes`)
- depth 1: [ExtrusoraObservacionView](../WebPanels/Reportes/ExtrusoraObservacionView.md) (`WebPanel`, `Reportes`)
- depth 1: [ExtrusoraObservacionWWExport](../Procedures/Reportes/ExtrusoraObservacionWWExport.md) (`Procedure`, `Reportes`)
- depth 1: [ExtrusoraObservacionWWExportReport](../Procedures/Reportes/ExtrusoraObservacionWWExportReport.md) (`Procedure`, `Reportes`)
- depth 1: [ExtrusoraObservacionWWGetFilterData](../Procedures/Reportes/ExtrusoraObservacionWWGetFilterData.md) (`Procedure`, `Reportes`)
- depth 2: [ExtrusoraDP](../DataProviders/Produccion/ExtrusoraDP.md) (`DataProvider`, `Produccion`)
- depth 2: [TurnoDP](../DataProviders/Produccion/TurnoDP.md) (`DataProvider`, `Produccion`)
- depth 2: [CausaExtrusoraDP](../DataProviders/Reportes/CausaExtrusoraDP.md) (`DataProvider`, `Reportes`)
- depth 2: [LoadAuditExtrusoraObservacion](../Procedures/Reportes/LoadAuditExtrusoraObservacion.md) (`Procedure`, `Reportes`)
- depth 3: [SDTExtrusora](../SDTs/Produccion/SDTExtrusora.md) (`SDT`, `Produccion`)
- depth 3: [SDTTurno](../SDTs/Produccion/SDTTurno.md) (`SDT`, `Produccion`)
- depth 3: [SDTCausaInterrupcion](../SDTs/Reportes/SDTCausaInterrupcion.md) (`SDT`, `Reportes`)

## Efectos en datos

- **Tablas leídas:** `ExtrusoraObservacion`
- **Tablas escritas:** `ExtrusoraObservacion`
- **SDTs usados:** `GeneXus.Common.GridState`, `SDTCausaInterrupcion`, `SDTExtrusora`, `SDTTurno`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [ExtrusoraObservacion](../_domain_glossary.md#extrusoraobservacion)
