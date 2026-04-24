# Proceso: EmbarquePallet

- **Entry point:** [EmbarquePallet](../Transactions/DB/EmbarquePallet.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Embarques.CargarEmbarque`, `Embarques.EmbarqueDetallePalletWCGetFilterData`, `Embarques.EmbarquePalletWCGetFilterData`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`
- **Mergeado con:** `EmbarquePalletWW` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_embarque_pallet.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [EmbarquePallet](../Transactions/DB/EmbarquePallet.md) (`Transaction`, `DB`)
- depth 0: [EmbarquePalletWW](../WebPanels/DB/EmbarquePalletWW.md) (`WebPanel`, `DB`)
- depth 1: [EmbarquePalletView](../WebPanels/DB/EmbarquePalletView.md) (`WebPanel`, `DB`)
- depth 1: [EmbarquePalletWWExport](../Procedures/DB/EmbarquePalletWWExport.md) (`Procedure`, `DB`)
- depth 1: [EmbarquePalletWWExportReport](../Procedures/DB/EmbarquePalletWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [EmbarquePalletWWGetFilterData](../Procedures/DB/EmbarquePalletWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [LoadAuditEmbarquePallet](../Procedures/DB/LoadAuditEmbarquePallet.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `EmbarquePallet`
- **Tablas escritas:** `EmbarquePallet`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [EmbarquePallet](../_domain_glossary.md#embarquepallet)
