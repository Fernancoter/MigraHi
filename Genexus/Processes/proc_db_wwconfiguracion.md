# Proceso: Configuración

- **Entry point:** [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Referencias > Configuración`
- **Módulo principal:** `DB`
- **Objetos en el proceso:** 7
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`
- **Mergeado con:** `ObtenerConfiguracion`, `Configuracion` _(≥80 % overlap)_

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_db_wwconfiguracion.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 0: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 0: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 1: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 1: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 1: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 2: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`
- **Tablas escritas:** `Configuracion`
- **SDTs usados:** 
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
