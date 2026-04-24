# Proceso: Troquel

- **Entry point:** [Troquel](../Transactions/DB/Troquel.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.gestionarTroquel`, `Produccion.listarTroquel`, `Produccion.listarTroquelExport`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 19
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`, `WWPBaseObjects`
- **Mergeado con:** `gestionarTroquel` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_troquel.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Troquel](../Transactions/DB/Troquel.md) (`Transaction`, `DB`)
- depth 0: [gestionarTroquel](../WebPanels/Produccion/gestionarTroquel.md) (`WebPanel`, `Produccion`)
- depth 1: [LoadAuditTroquel](../Procedures/DB/LoadAuditTroquel.md) (`Procedure`, `DB`)
- depth 1: [TroquelView](../WebPanels/DB/TroquelView.md) (`WebPanel`, `DB`)
- depth 1: [TroquelWW](../WebPanels/DB/TroquelWW.md) (`WebPanel`, `DB`)
- depth 1: [DPCBProducto](../DataProviders/Produccion/DPCBProducto.md) (`DataProvider`, `Produccion`)
- depth 1: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 1: [TipoCarreteDP](../DataProviders/Produccion/TipoCarreteDP.md) (`DataProvider`, `Produccion`)
- depth 1: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 2: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 2: [TroquelWWExport](../Procedures/DB/TroquelWWExport.md) (`Procedure`, `DB`)
- depth 2: [TroquelWWExportReport](../Procedures/DB/TroquelWWExportReport.md) (`Procedure`, `DB`)
- depth 2: [TroquelWWGetFilterData](../Procedures/DB/TroquelWWGetFilterData.md) (`Procedure`, `DB`)
- depth 2: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 3: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 3: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 3: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 4: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 4: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.Troquel`, `Troquel`
- **Tablas escritas:** `Configuracion`, `DB.Troquel`, `Troquel`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `SDTProducto`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [Troquel](../_domain_glossary.md#troquel)
