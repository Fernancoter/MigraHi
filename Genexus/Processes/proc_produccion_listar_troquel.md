# Proceso: Troqueles

- **Entry point:** [listarTroquel](../WebPanels/Produccion/listarTroquel.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Troqueles`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 28
- **Módulos tocados:** `DB`, `Produccion`, `Root`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_troquel.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarTroquel](../WebPanels/Produccion/listarTroquel.md) (`WebPanel`, `Produccion`)
- depth 1: [Troquel](../Transactions/DB/Troquel.md) (`Transaction`, `DB`)
- depth 1: [TroquelView](../WebPanels/DB/TroquelView.md) (`WebPanel`, `DB`)
- depth 1: [gestionarTroquel](../WebPanels/Produccion/gestionarTroquel.md) (`WebPanel`, `Produccion`)
- depth 1: [listarTroquelExport](../Procedures/Produccion/listarTroquelExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarTroquelExportReport](../Procedures/Produccion/listarTroquelExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarTroquelGetFilterData](../Procedures/Produccion/listarTroquelGetFilterData.md) (`Procedure`, `Produccion`)
- depth 1: [AuditDeleted](../WebPanels/WWPBaseObjects/AuditDeleted.md) (`WebPanel`, `WWPBaseObjects`)
- depth 2: [LoadAuditTroquel](../Procedures/DB/LoadAuditTroquel.md) (`Procedure`, `DB`)
- depth 2: [TroquelWW](../WebPanels/DB/TroquelWW.md) (`WebPanel`, `DB`)
- depth 2: [DPCBProducto](../DataProviders/Produccion/DPCBProducto.md) (`DataProvider`, `Produccion`)
- depth 2: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 2: [TipoCarreteDP](../DataProviders/Produccion/TipoCarreteDP.md) (`DataProvider`, `Produccion`)
- depth 2: [AuditView](../WebPanels/WWPBaseObjects/AuditView.md) (`WebPanel`, `WWPBaseObjects`)
- depth 2: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 3: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 3: [TroquelWWExport](../Procedures/DB/TroquelWWExport.md) (`Procedure`, `DB`)
- depth 3: [TroquelWWExportReport](../Procedures/DB/TroquelWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [TroquelWWGetFilterData](../Procedures/DB/TroquelWWGetFilterData.md) (`Procedure`, `DB`)
- depth 3: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 3: [Audit](../Transactions/WWPBaseObjects/Audit.md) (`Transaction`, `WWPBaseObjects`)
- depth 3: [AuditWW](../WebPanels/WWPBaseObjects/AuditWW.md) (`WebPanel`, `WWPBaseObjects`)
- depth 4: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 4: [AuditWWExport](../Procedures/WWPBaseObjects/AuditWWExport.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [AuditWWExportReport](../Procedures/WWPBaseObjects/AuditWWExportReport.md) (`Procedure`, `WWPBaseObjects`)
- depth 4: [AuditWWGetFilterData](../Procedures/WWPBaseObjects/AuditWWGetFilterData.md) (`Procedure`, `WWPBaseObjects`)

## Efectos en datos

- **Tablas leídas:** `Audit`, `Configuracion`, `DB.Troquel`, `Troquel`
- **Tablas escritas:** `Audit`, `Configuracion`, `DB.Troquel`, `Troquel`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `SDTProducto`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`, `WWPColumnsSelector`, `WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Audit](../_domain_glossary.md#audit)
- [Configuracion](../_domain_glossary.md#configuracion)
- [Troquel](../_domain_glossary.md#troquel)
