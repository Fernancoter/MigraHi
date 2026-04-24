# Proceso: Prensado del día

- **Entry point:** [PrensadoDelDia](../WebPanels/Produccion/PrensadoDelDia.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Prensado > Prensado del día`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 29
- **Módulos tocados:** `DB`, `Produccion`, `Root`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_prensado_del_dia.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [PrensadoDelDia](../WebPanels/Produccion/PrensadoDelDia.md) (`WebPanel`, `Produccion`)
- depth 1: [CrearPrensado](../Procedures/Produccion/CrearPrensado.md) (`Procedure`, `Produccion`)
- depth 1: [GuardarPrensado](../Procedures/Produccion/GuardarPrensado.md) (`Procedure`, `Produccion`)
- depth 1: [OperadorDP](../DataProviders/Produccion/OperadorDP.md) (`DataProvider`, `Produccion`)
- depth 1: [PrensadoDelDiaCarrera](../WebPanels/Produccion/PrensadoDelDiaCarrera.md) (`WebPanel`, `Produccion`)
- depth 1: [PrensadoDelDiaDP](../DataProviders/Produccion/PrensadoDelDiaDP.md) (`DataProvider`, `Produccion`)
- depth 1: [PrensaDP](../DataProviders/Produccion/PrensaDP.md) (`DataProvider`, `Produccion`)
- depth 1: [SDTExtrusion](../SDTs/Produccion/SDTExtrusion.md) (`SDT`, `Produccion`)
- depth 1: [SDTPrensado](../SDTs/Produccion/SDTPrensado.md) (`SDT`, `Produccion`)
- depth 1: [TipoCarreteDP](../DataProviders/Produccion/TipoCarreteDP.md) (`DataProvider`, `Produccion`)
- depth 1: [TurnoDP](../DataProviders/Produccion/TurnoDP.md) (`DataProvider`, `Produccion`)
- depth 2: [InsumoProducto](../Procedures/Produccion/InsumoProducto.md) (`Procedure`, `Produccion`)
- depth 2: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 2: [ReposoTranscurrido](../Procedures/Produccion/ReposoTranscurrido.md) (`Procedure`, `Produccion`)
- depth 2: [SDTCarrete](../SDTs/Produccion/SDTCarrete.md) (`SDT`, `Produccion`)
- depth 2: [SDTOperador](../SDTs/Produccion/SDTOperador.md) (`SDT`, `Produccion`)
- depth 2: [SDTPrensa](../SDTs/Produccion/SDTPrensa.md) (`SDT`, `Produccion`)
- depth 2: [SDTPrensadoBobina](../SDTs/Produccion/SDTPrensadoBobina.md) (`SDT`, `Produccion`)
- depth 2: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 2: [SDTTurno](../SDTs/Produccion/SDTTurno.md) (`SDT`, `Produccion`)
- depth 3: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 3: [PrensaProducto](../Transactions/DB/PrensaProducto.md) (`Transaction`, `DB`)
- depth 3: [BobinaTiempoReposo](../Procedures/Produccion/BobinaTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 3: [ObtenerTiempoReposo](../Procedures/Produccion/ObtenerTiempoReposo.md) (`Procedure`, `Produccion`)
- depth 4: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [ViewPrensaProducto](../WebPanels/DB/ViewPrensaProducto.md) (`WebPanel`, `DB`)
- depth 4: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [WWPrensaProducto](../WebPanels/DB/WWPrensaProducto.md) (`WebPanel`, `DB`)
- depth 4: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.Bobina`, `DB.Extrusion`, `DB.Prensado`, `PrensaProducto`
- **Tablas escritas:** `Configuracion`, `DB.Bobina`, `DB.Prensado`, `PrensaProducto`
- **SDTs usados:** `SDTOperador`, `SDTPrensa`, `SDTPrensado`, `SDTProducto`, `SDTTurno`
- **DataProviders usados:** `PrensadoDelDiaDP`
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [PrensaProducto](../_domain_glossary.md#prensaproducto)
