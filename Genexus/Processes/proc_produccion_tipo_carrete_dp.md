# Proceso: TipoCarreteDP

- **Entry point:** [TipoCarreteDP](../DataProviders/Produccion/TipoCarreteDP.md) -- tipo externo (no navegable desde el menú)
- **Invocado cross-module desde:** `DB.ProductoTerminado`, `DB.Troquel`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 9
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_tipo_carrete_dp.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [TipoCarreteDP](../DataProviders/Produccion/TipoCarreteDP.md) (`DataProvider`, `Produccion`)
- depth 1: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 1: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 2: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 3: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 3: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 3: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 4: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 4: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`
- **Tablas escritas:** `Configuracion`
- **SDTs usados:** `SDTProducto`
- **DataProviders usados:** ``
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
