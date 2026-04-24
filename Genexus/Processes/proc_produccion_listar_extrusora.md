# Proceso: Extrusoras

- **Entry point:** [listarExtrusora](../WebPanels/Produccion/listarExtrusora.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Catálogos > Extrusoras`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 14
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`, `WWPBaseObjects`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_extrusora.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarExtrusora](../WebPanels/Produccion/listarExtrusora.md) (`WebPanel`, `Produccion`)
- depth 1: [Extrusora](../Transactions/DB/Extrusora.md) (`Transaction`, `DB`)
- depth 1: [gestionarExtrusora](../WebPanels/Produccion/gestionarExtrusora.md) (`WebPanel`, `Produccion`)
- depth 1: [listarExtrusoraExport](../Procedures/Produccion/listarExtrusoraExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarExtrusoraExportReport](../Procedures/Produccion/listarExtrusoraExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarExtrusoraGetFilterData](../Procedures/Produccion/listarExtrusoraGetFilterData.md) (`Procedure`, `Produccion`)
- depth 2: [ViewExtrusora](../WebPanels/DB/ViewExtrusora.md) (`WebPanel`, `DB`)
- depth 2: [WWExtrusora](../WebPanels/DB/WWExtrusora.md) (`WebPanel`, `DB`)
- depth 2: [DPCBOpeardor](../DataProviders/Produccion/DPCBOpeardor.md) (`DataProvider`, `Produccion`)
- depth 2: [SDTExtrusoraTurno](../SDTs/Produccion/SDTExtrusoraTurno.md) (`SDT`, `Produccion`)
- depth 2: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [DVB_SDTComboData](../SDTs/WWPBaseObjects/DVB_SDTComboData.md) (`SDT`, `WWPBaseObjects`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `DB.Extrusora`, `DB.Turno`, `Extrusora`
- **Tablas escritas:** `DB.Extrusora`, `DB.Turno`, `Extrusora`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `SDTExtrusoraTurno`, `WWPBaseObjects.DVB_SDTComboData`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Extrusora](../_domain_glossary.md#extrusora)
