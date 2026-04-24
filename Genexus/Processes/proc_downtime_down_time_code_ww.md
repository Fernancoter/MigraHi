# Proceso: DownTimeCodeWW

- **Entry point:** [DownTimeCodeWW](../WebPanels/Downtime/DownTimeCodeWW.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `WWPBaseObjects.ListWWPPrograms`
- **Módulo principal:** `Downtime`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `Downtime`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_downtime_down_time_code_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [DownTimeCodeWW](../WebPanels/Downtime/DownTimeCodeWW.md) (`WebPanel`, `Downtime`)
- depth 1: [DownTimeCode](../Transactions/Downtime/DownTimeCode.md) (`Transaction`, `Downtime`)
- depth 1: [DownTimeCodeView](../WebPanels/Downtime/DownTimeCodeView.md) (`WebPanel`, `Downtime`)
- depth 1: [DownTimeCodeWWExport](../Procedures/Downtime/DownTimeCodeWWExport.md) (`Procedure`, `Downtime`)
- depth 1: [DownTimeCodeWWExportReport](../Procedures/Downtime/DownTimeCodeWWExportReport.md) (`Procedure`, `Downtime`)
- depth 1: [DownTimeCodeWWGetFilterData](../Procedures/Downtime/DownTimeCodeWWGetFilterData.md) (`Procedure`, `Downtime`)
- depth 2: [LoadAuditDownTimeCode](../Procedures/Downtime/LoadAuditDownTimeCode.md) (`Procedure`, `Downtime`)

## Efectos en datos

- **Tablas leídas:** `DownTimeCode`
- **Tablas escritas:** `DownTimeCode`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [DownTimeCode](../_domain_glossary.md#downtimecode)
