# Proceso: PrensaTroquel

- **Entry point:** [PrensaTroquel](../Transactions/DB/PrensaTroquel.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.ObtenerPrensaPorTroquelId`, `Produccion.SDCrearPrensaTroquel`, `Produccion.SDPrensaTroquel`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 16
- **Módulos tocados:** `DB`, `Produccion`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_prensa_troquel.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PrensaTroquel](../Transactions/DB/PrensaTroquel.md) (`Transaction`, `DB`)
- depth 1: [LoadAuditPrensaTroquel](../Procedures/DB/LoadAuditPrensaTroquel.md) (`Procedure`, `DB`)
- depth 1: [TroquelPrompt](../WebPanels/DB/TroquelPrompt.md) (`WebPanel`, `DB`)
- depth 2: [Troquel](../Transactions/DB/Troquel.md) (`Transaction`, `DB`)
- depth 3: [LoadAuditTroquel](../Procedures/DB/LoadAuditTroquel.md) (`Procedure`, `DB`)
- depth 3: [TroquelView](../WebPanels/DB/TroquelView.md) (`WebPanel`, `DB`)
- depth 3: [TroquelWW](../WebPanels/DB/TroquelWW.md) (`WebPanel`, `DB`)
- depth 3: [gestionarTroquel](../WebPanels/Produccion/gestionarTroquel.md) (`WebPanel`, `Produccion`)
- depth 3: [TipoCarreteDP](../DataProviders/Produccion/TipoCarreteDP.md) (`DataProvider`, `Produccion`)
- depth 4: [TroquelWWExport](../Procedures/DB/TroquelWWExport.md) (`Procedure`, `DB`)
- depth 4: [TroquelWWExportReport](../Procedures/DB/TroquelWWExportReport.md) (`Procedure`, `DB`)
- depth 4: [TroquelWWGetFilterData](../Procedures/DB/TroquelWWGetFilterData.md) (`Procedure`, `DB`)
- depth 4: [DPCBProducto](../DataProviders/Produccion/DPCBProducto.md) (`DataProvider`, `Produccion`)
- depth 4: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 4: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 4: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `DB.Troquel`, `PrensaTroquel`, `Troquel`
- **Tablas escritas:** `DB.Troquel`, `PrensaTroquel`, `Troquel`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `SDTProducto`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [PrensaTroquel](../_domain_glossary.md#prensatroquel)
- [Troquel](../_domain_glossary.md#troquel)
