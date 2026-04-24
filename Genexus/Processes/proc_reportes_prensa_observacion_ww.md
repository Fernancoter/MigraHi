# Proceso: Prensas

- **Entry point:** [PrensaObservacionWW](../WebPanels/Reportes/PrensaObservacionWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes HC > Observaciones > Prensas`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 13
- **Módulos tocados:** `Produccion`, `Reportes`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_prensa_observacion_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PrensaObservacionWW](../WebPanels/Reportes/PrensaObservacionWW.md) (`WebPanel`, `Reportes`)
- depth 1: [PrensaObservacion](../Transactions/Reportes/PrensaObservacion.md) (`Transaction`, `Reportes`)
- depth 1: [PrensaObservacionView](../WebPanels/Reportes/PrensaObservacionView.md) (`WebPanel`, `Reportes`)
- depth 1: [PrensaObservacionWWExport](../Procedures/Reportes/PrensaObservacionWWExport.md) (`Procedure`, `Reportes`)
- depth 1: [PrensaObservacionWWExportReport](../Procedures/Reportes/PrensaObservacionWWExportReport.md) (`Procedure`, `Reportes`)
- depth 1: [PrensaObservacionWWGetFilterData](../Procedures/Reportes/PrensaObservacionWWGetFilterData.md) (`Procedure`, `Reportes`)
- depth 2: [PrensaDP](../DataProviders/Produccion/PrensaDP.md) (`DataProvider`, `Produccion`)
- depth 2: [TurnoDP](../DataProviders/Produccion/TurnoDP.md) (`DataProvider`, `Produccion`)
- depth 2: [CausaPrensaDP](../DataProviders/Reportes/CausaPrensaDP.md) (`DataProvider`, `Reportes`)
- depth 2: [LoadAuditPrensaObservacion](../Procedures/Reportes/LoadAuditPrensaObservacion.md) (`Procedure`, `Reportes`)
- depth 3: [SDTPrensa](../SDTs/Produccion/SDTPrensa.md) (`SDT`, `Produccion`)
- depth 3: [SDTTurno](../SDTs/Produccion/SDTTurno.md) (`SDT`, `Produccion`)
- depth 3: [SDTCausaInterrupcion](../SDTs/Reportes/SDTCausaInterrupcion.md) (`SDT`, `Reportes`)

## Efectos en datos

- **Tablas leídas:** `PrensaObservacion`
- **Tablas escritas:** `PrensaObservacion`
- **SDTs usados:** `GeneXus.Common.GridState`, `SDTCausaInterrupcion`, `SDTPrensa`, `SDTTurno`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [PrensaObservacion](../_domain_glossary.md#prensaobservacion)
