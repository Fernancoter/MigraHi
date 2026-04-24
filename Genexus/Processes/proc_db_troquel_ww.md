# Proceso: Troqueles

- **Entry point:** [TroquelWW](../WebPanels/DB/TroquelWW.md) -- tipo menú
- **Ruta en el menú:** `Web > Prensado > Troqueles`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 14
- **Módulos tocados:** `DB`, `Produccion`, `WWPBaseObjects`
- **Mergeado con:** `TroquelView` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_troquel_ww.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [TroquelView](../WebPanels/DB/TroquelView.md) (`WebPanel`, `DB`)
- depth 0: [TroquelWW](../WebPanels/DB/TroquelWW.md) (`WebPanel`, `DB`)
- depth 1: [Troquel](../Transactions/DB/Troquel.md) (`Transaction`, `DB`)
- depth 1: [TroquelWWExport](../Procedures/DB/TroquelWWExport.md) (`Procedure`, `DB`)
- depth 1: [TroquelWWExportReport](../Procedures/DB/TroquelWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [TroquelWWGetFilterData](../Procedures/DB/TroquelWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [LoadAuditTroquel](../Procedures/DB/LoadAuditTroquel.md) (`Procedure`, `DB`)
- depth 2: [gestionarTroquel](../WebPanels/Produccion/gestionarTroquel.md) (`WebPanel`, `Produccion`)
- depth 2: [TipoCarreteDP](../DataProviders/Produccion/TipoCarreteDP.md) (`DataProvider`, `Produccion`)
- depth 3: [DPCBProducto](../DataProviders/Produccion/DPCBProducto.md) (`DataProvider`, `Produccion`)
- depth 3: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 3: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 3: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 4: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.Troquel`, `Troquel`
- **Tablas escritas:** `Configuracion`, `DB.Troquel`, `Troquel`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `SDTProducto`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [Troquel](../_domain_glossary.md#troquel)
