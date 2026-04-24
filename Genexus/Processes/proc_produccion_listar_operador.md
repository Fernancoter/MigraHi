# Proceso: Operadores

- **Entry point:** [listarOperador](../WebPanels/Produccion/listarOperador.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Operadores`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 15
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`, `Seguridad`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_listar_operador.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [listarOperador](../WebPanels/Produccion/listarOperador.md) (`WebPanel`, `Produccion`)
- depth 1: [Operador](../Transactions/DB/Operador.md) (`Transaction`, `DB`)
- depth 1: [gestionarOperador](../WebPanels/Produccion/gestionarOperador.md) (`WebPanel`, `Produccion`)
- depth 1: [listarOperadorExport](../Procedures/Produccion/listarOperadorExport.md) (`Procedure`, `Produccion`)
- depth 1: [listarOperadorExportReport](../Procedures/Produccion/listarOperadorExportReport.md) (`Procedure`, `Produccion`)
- depth 1: [listarOperadorGetFilterData](../Procedures/Produccion/listarOperadorGetFilterData.md) (`Procedure`, `Produccion`)
- depth 1: [HabilitarOperador](../Procedures/Seguridad/HabilitarOperador.md) (`Procedure`, `Seguridad`)
- depth 2: [ViewOperador](../WebPanels/DB/ViewOperador.md) (`WebPanel`, `DB`)
- depth 2: [WWOperador](../WebPanels/DB/WWOperador.md) (`WebPanel`, `DB`)
- depth 2: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [DeshabilitarOperador](../Procedures/Seguridad/DeshabilitarOperador.md) (`Procedure`, `Seguridad`)
- depth 2: [SetNotSuccessMessagesLog](../Procedures/Web/SetNotSuccessMessagesLog.md) (`Procedure`, `Web`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)
- depth 3: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)

## Efectos en datos

- **Tablas leídas:** `DB.Operador`, `Operador`
- **Tablas escritas:** `DB.Operador`, `Operador`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `WWPBaseObjects.WWPColumnsSelector`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Operador](../_domain_glossary.md#operador)
