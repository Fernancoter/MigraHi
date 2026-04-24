# Proceso: EtiquetadoOperador

- **Entry point:** [EtiquetadoOperador](../Transactions/DB/EtiquetadoOperador.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.SDEtiquetadoOperador`, `Produccion.SDOrdenEtiquetado`, `Produccion.SDRevertirCarrete`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`
- **Mergeado con:** `EtiquetadoOperadorWW` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_etiquetado_operador.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [EtiquetadoOperador](../Transactions/DB/EtiquetadoOperador.md) (`Transaction`, `DB`)
- depth 0: [EtiquetadoOperadorWW](../WebPanels/DB/EtiquetadoOperadorWW.md) (`WebPanel`, `DB`)
- depth 1: [EtiquetadoOperadorView](../WebPanels/DB/EtiquetadoOperadorView.md) (`WebPanel`, `DB`)
- depth 1: [EtiquetadoOperadorWWExport](../Procedures/DB/EtiquetadoOperadorWWExport.md) (`Procedure`, `DB`)
- depth 1: [EtiquetadoOperadorWWExportReport](../Procedures/DB/EtiquetadoOperadorWWExportReport.md) (`Procedure`, `DB`)
- depth 1: [EtiquetadoOperadorWWGetFilterData](../Procedures/DB/EtiquetadoOperadorWWGetFilterData.md) (`Procedure`, `DB`)
- depth 1: [LoadAuditEtiquetadoOperador](../Procedures/DB/LoadAuditEtiquetadoOperador.md) (`Procedure`, `DB`)

## Efectos en datos

- **Tablas leídas:** `EtiquetadoOperador`
- **Tablas escritas:** `EtiquetadoOperador`
- **SDTs usados:** `GeneXus.Common.GridState`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [EtiquetadoOperador](../_domain_glossary.md#etiquetadooperador)
