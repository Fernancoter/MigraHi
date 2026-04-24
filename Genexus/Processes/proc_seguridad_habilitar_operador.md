# Proceso: HabilitarOperador

- **Entry point:** [HabilitarOperador](../Procedures/Seguridad/HabilitarOperador.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `Produccion.listarOperador`
- **Módulo principal:** `Seguridad`
- **Objetos en el proceso:** 9
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Root`, `Seguridad`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_seguridad_habilitar_operador.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [HabilitarOperador](../Procedures/Seguridad/HabilitarOperador.md) (`Procedure`, `Seguridad`)
- depth 1: [Operador](../Transactions/DB/Operador.md) (`Transaction`, `DB`)
- depth 1: [SetNotSuccessMessagesLog](../Procedures/Web/SetNotSuccessMessagesLog.md) (`Procedure`, `Web`)
- depth 2: [ViewOperador](../WebPanels/DB/ViewOperador.md) (`WebPanel`, `DB`)
- depth 2: [WWOperador](../WebPanels/DB/WWOperador.md) (`WebPanel`, `DB`)
- depth 2: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 3: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 3: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `DB.Operador`, `Operador`
- **Tablas escritas:** `DB.Operador`, `Operador`
- **SDTs usados:** `GeneXus.Common.Messages`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Operador](../_domain_glossary.md#operador)
