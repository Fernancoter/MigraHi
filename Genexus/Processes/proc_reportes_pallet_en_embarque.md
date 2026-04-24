# Proceso: Pallet_Embarque

- **Entry point:** [PalletEnEmbarque](../WebPanels/Reportes/PalletEnEmbarque.md) -- tipo menú
- **Ruta en el menú:** `Web > Reportes HC > Descargables > Pallet_Embarque`
- **Módulo principal:** `Reportes`
- **Objetos en el proceso:** 11
- **Módulos tocados:** `DB`, `Reportes`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_reportes_pallet_en_embarque.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PalletEnEmbarque](../WebPanels/Reportes/PalletEnEmbarque.md) (`WebPanel`, `Reportes`)
- depth 1: [EmbarquePallet](../Transactions/DB/EmbarquePallet.md) (`Transaction`, `DB`)
- depth 1: [PalletEnEmbarqueExport](../Procedures/Reportes/PalletEnEmbarqueExport.md) (`Procedure`, `Reportes`)
- depth 1: [PalletEnEmbarqueExportReport](../Procedures/Reportes/PalletEnEmbarqueExportReport.md) (`Procedure`, `Reportes`)
- depth 1: [PalletEnEmbarqueGetFilterData](../Procedures/Reportes/PalletEnEmbarqueGetFilterData.md) (`Procedure`, `Reportes`)
- depth 2: [EmbarquePalletView](../WebPanels/DB/EmbarquePalletView.md) (`WebPanel`, `DB`)
- depth 2: [EmbarquePalletWW](../WebPanels/DB/EmbarquePalletWW.md) (`WebPanel`, `DB`)
- depth 2: [LoadAuditEmbarquePallet](../Procedures/DB/LoadAuditEmbarquePallet.md) (`Procedure`, `DB`)
- depth 3: [EmbarquePalletWWExport](../Procedures/DB/EmbarquePalletWWExport.md) (`Procedure`, `DB`)
- depth 3: [EmbarquePalletWWExportReport](../Procedures/DB/EmbarquePalletWWExportReport.md) (`Procedure`, `DB`)
- depth 3: [EmbarquePalletWWGetFilterData](../Procedures/DB/EmbarquePalletWWGetFilterData.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `EmbarquePallet`
- **Tablas escritas:** `EmbarquePallet`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [EmbarquePallet](../_domain_glossary.md#embarquepallet)
