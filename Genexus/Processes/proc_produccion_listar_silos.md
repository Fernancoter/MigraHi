# Proceso: Silos

- **Entry point:** [listarSilos](../WebPanels/Produccion/listarSilos.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Silos`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_silos.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarSilos](../WebPanels/Produccion/listarSilos.md) (`WebPanel`, `Produccion`)
- depth 1: [Silo](../Transactions/DB/Silo.md) (`Transaction`, `DB`)
- depth 1: [ArchivarSilos](../Procedures/Produccion/ArchivarSilos.md) (`Procedure`, `Produccion`)
- depth 1: [gestionarSilo](../WebPanels/Produccion/gestionarSilo.md) (`WebPanel`, `Produccion`)
- depth 1: [listarSilosExport](../Procedures/Produccion/listarSilosExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarSilosExportReport](../Procedures/Produccion/listarSilosExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarSilosGetFilterData](../Procedures/Produccion/listarSilosGetFilterData.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** `DB.Silo`, `Silo`
- **Tablas escritas:** `DB.Silo`, `Silo`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Silo](../_domain_glossary.md#silo)
