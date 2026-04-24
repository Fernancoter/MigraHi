# Proceso: Turnos Por Semana

- **Entry point:** [TurnosPorSemanaPrensas](../WebPanels/Produccion/TurnosPorSemanaPrensas.md) -- tipo menú
- **Ruta en el menú:** `Web > Prensado > Turnos Por Semana`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 14
- **Módulos tocados:** `GeneXusReporting`, `Produccion`, `WWPBaseObjects`
- **Mergeado con:** `TurnosPorSemanaExtrusoras`, `TurnosPorSemana` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_turnos_por_semana_prensas.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [TurnosPorSemana](../WebPanels/Produccion/TurnosPorSemana.md) (`WebPanel`, `Produccion`)
- depth 0: [TurnosPorSemanaExtrusoras](../WebPanels/Produccion/TurnosPorSemanaExtrusoras.md) (`WebPanel`, `Produccion`)
- depth 0: [TurnosPorSemanaPrensas](../WebPanels/Produccion/TurnosPorSemanaPrensas.md) (`WebPanel`, `Produccion`)
- depth 1: [QueryViewerDragAndDropData](../SDTs/GeneXusReporting/QueryViewerDragAndDropData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerElements](../SDTs/GeneXusReporting/QueryViewerElements.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerFilterChangedData](../SDTs/GeneXusReporting/QueryViewerFilterChangedData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemClickData](../SDTs/GeneXusReporting/QueryViewerItemClickData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemCollapseData](../SDTs/GeneXusReporting/QueryViewerItemCollapseData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemDoubleClickData](../SDTs/GeneXusReporting/QueryViewerItemDoubleClickData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerItemExpandData](../SDTs/GeneXusReporting/QueryViewerItemExpandData.md) (`SDT`, `GeneXusReporting`)
- depth 1: [QueryViewerParameters](../SDTs/GeneXusReporting/QueryViewerParameters.md) (`SDT`, `GeneXusReporting`)
- depth 1: [SDTTurnoPorSemana](../SDTs/Produccion/SDTTurnoPorSemana.md) (`SDT`, `Produccion`)
- depth 1: [DVMessageGetBasicNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetBasicNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)
- depth 2: [DVMessageGetAdvancedNotificationMsg](../Procedures/WWPBaseObjects/DVMessageGetAdvancedNotificationMsg.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** ``
- **Tablas escritas:** ``
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

_(este proceso no toca Transactions reflejadas en el glosario)_
