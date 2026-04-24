# Proceso: Prensas

- **Entry point:** [listarPrensas](../WebPanels/Produccion/listarPrensas.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Prensas`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 6
- **Módulos tocados:** `DB`, `Produccion`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_prensas.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarPrensas](../WebPanels/Produccion/listarPrensas.md) (`WebPanel`, `Produccion`)
- depth 1: [Prensa](../Transactions/DB/Prensa.md) (`Transaction`, `DB`)
- depth 1: [gestionarPrensa](../WebPanels/Produccion/gestionarPrensa.md) (`WebPanel`, `Produccion`)
- depth 1: [listarPrensasExport](../Procedures/Produccion/listarPrensasExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarPrensasExportReport](../Procedures/Produccion/listarPrensasExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarPrensasGetFilterData](../Procedures/Produccion/listarPrensasGetFilterData.md) (`Procedure`, `Produccion`)

## Efectos en datos

- **Tablas leídas:** `DB.Prensa`, `Prensa`
- **Tablas escritas:** `DB.Prensa`, `Prensa`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Prensa](../_domain_glossary.md#prensa)
