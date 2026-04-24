# Proceso: Extrusión del Día

- **Entry point:** [ExclusionDelDia](../WebPanels/Produccion/ExclusionDelDia.md) -- tipo menú
- **Ruta en el menú:** `Web > Producción > Extrusión > Extrusión del Día`
- **Módulo principal:** `Produccion`
- **Objetos en el proceso:** 53
- **Módulos tocados:** `DB`, `GeneXus.Common`, `Produccion`, `Root`, `Web`

## Narrativa

*(pendiente -- se completa en la pasada de narrativa posterior sobre `proc_produccion_exclusion_del_dia.prompt.txt`)*

## Objetos (call trace ordenado por depth)

- depth 0: [ExclusionDelDia](../WebPanels/Produccion/ExclusionDelDia.md) (`WebPanel`, `Produccion`)
- depth 1: [Turno](../Transactions/DB/Turno.md) (`Transaction`, `DB`)
- depth 1: [CrearExtrusion](../Procedures/Produccion/CrearExtrusion.md) (`Procedure`, `Produccion`)
- depth 1: [ExtrusionDelDiaBobinas](../WebPanels/Produccion/ExtrusionDelDiaBobinas.md) (`WebPanel`, `Produccion`)
- depth 1: [ExtrusoraDP](../DataProviders/Produccion/ExtrusoraDP.md) (`DataProvider`, `Produccion`)
- depth 1: [GuardarExtrusion](../Procedures/Produccion/GuardarExtrusion.md) (`Procedure`, `Produccion`)
- depth 1: [OperadorDP](../DataProviders/Produccion/OperadorDP.md) (`DataProvider`, `Produccion`)
- depth 1: [SDTExtrusion](../SDTs/Produccion/SDTExtrusion.md) (`SDT`, `Produccion`)
- depth 1: [TipoBobinasDP](../DataProviders/Produccion/TipoBobinasDP.md) (`DataProvider`, `Produccion`)
- depth 1: [TurnoDP](../DataProviders/Produccion/TurnoDP.md) (`DataProvider`, `Produccion`)
- depth 2: [ExtrusoraProducto](../Transactions/DB/ExtrusoraProducto.md) (`Transaction`, `DB`)
- depth 2: [BobinaDP](../DataProviders/Produccion/BobinaDP.md) (`DataProvider`, `Produccion`)
- depth 2: [BobinasEnMedicion](../Procedures/Produccion/BobinasEnMedicion.md) (`Procedure`, `Produccion`)
- depth 2: [ExtrusoraDetenida](../WebPanels/Produccion/ExtrusoraDetenida.md) (`WebPanel`, `Produccion`)
- depth 2: [FinalizarExtrusion](../Procedures/Produccion/FinalizarExtrusion.md) (`Procedure`, `Produccion`)
- depth 2: [IniciarBobinas](../Procedures/Produccion/IniciarBobinas.md) (`Procedure`, `Produccion`)
- depth 2: [MedirBobinasEnProceso](../Procedures/Produccion/MedirBobinasEnProceso.md) (`Procedure`, `Produccion`)
- depth 2: [ObtenerConfiguracion](../Procedures/Produccion/ObtenerConfiguracion.md) (`Procedure`, `Produccion`)
- depth 2: [SDTExtrusora](../SDTs/Produccion/SDTExtrusora.md) (`SDT`, `Produccion`)
- depth 2: [SDTOperador](../SDTs/Produccion/SDTOperador.md) (`SDT`, `Produccion`)
- depth 2: [SDTProducto](../SDTs/Produccion/SDTProducto.md) (`SDT`, `Produccion`)
- depth 2: [SDTTurno](../SDTs/Produccion/SDTTurno.md) (`SDT`, `Produccion`)
- depth 2: [SetEstadoExtrusion](../Procedures/Produccion/SetEstadoExtrusion.md) (`Procedure`, `Produccion`)
- depth 2: [ValidarMedicion](../Procedures/Produccion/ValidarMedicion.md) (`Procedure`, `Produccion`)
- depth 2: [Debugger](../Procedures/Web/Debugger.md) (`Procedure`, `Web`)
- depth 2: [SetNotSuccessMessagesLog](../Procedures/Web/SetNotSuccessMessagesLog.md) (`Procedure`, `Web`)
- depth 3: [Configuracion](../Transactions/DB/Configuracion.md) (`Transaction`, `DB`)
- depth 3: [ExtrusionInterrupcion](../Transactions/DB/ExtrusionInterrupcion.md) (`Transaction`, `DB`)
- depth 3: [Interrupcion](../Transactions/DB/Interrupcion.md) (`Transaction`, `DB`)
- depth 3: [ViewExtrusoraProducto](../WebPanels/DB/ViewExtrusoraProducto.md) (`WebPanel`, `DB`)
- depth 3: [WWExtrusoraProducto](../WebPanels/DB/WWExtrusoraProducto.md) (`WebPanel`, `DB`)
- depth 3: [CrearInterrupcion](../Procedures/Produccion/CrearInterrupcion.md) (`Procedure`, `Produccion`)
- depth 3: [GenerarBobinaNo](../Procedures/Produccion/GenerarBobinaNo.md) (`Procedure`, `Produccion`)
- depth 3: [GuardarBobina](../Procedures/Produccion/GuardarBobina.md) (`Procedure`, `Produccion`)
- depth 3: [ReasignarBobinaTurno](../Procedures/Produccion/ReasignarBobinaTurno.md) (`Procedure`, `Produccion`)
- depth 3: [SgteTurnoExtrusora](../Procedures/Produccion/SgteTurnoExtrusora.md) (`Procedure`, `Produccion`)
- depth 3: [TransactionContext](../SDTs/Root/TransactionContext.md) (`SDT`, `Root`)
- depth 4: [ExtrusionInterrupcionView](../WebPanels/DB/ExtrusionInterrupcionView.md) (`WebPanel`, `DB`)
- depth 4: [ExtrusionInterrupcionWW](../WebPanels/DB/ExtrusionInterrupcionWW.md) (`WebPanel`, `DB`)
- depth 4: [InterrupcionView](../WebPanels/DB/InterrupcionView.md) (`WebPanel`, `DB`)
- depth 4: [InterrupcionWW](../WebPanels/DB/InterrupcionWW.md) (`WebPanel`, `DB`)
- depth 4: [Inventario](../Transactions/DB/Inventario.md) (`Transaction`, `DB`)
- depth 4: [LoadAuditExtrusionInterrupcion](../Procedures/DB/LoadAuditExtrusionInterrupcion.md) (`Procedure`, `DB`)
- depth 4: [LoadAuditInterrupcion](../Procedures/DB/LoadAuditInterrupcion.md) (`Procedure`, `DB`)
- depth 4: [ViewConfiguracion](../WebPanels/DB/ViewConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [ViewExtrusora](../WebPanels/DB/ViewExtrusora.md) (`WebPanel`, `DB`)
- depth 4: [ViewProducto](../WebPanels/DB/ViewProducto.md) (`WebPanel`, `DB`)
- depth 4: [WWConfiguracion](../WebPanels/DB/WWConfiguracion.md) (`WebPanel`, `DB`)
- depth 4: [GridState](../SDTs/GeneXus/Common/GridState.md) (`SDT`, `GeneXus.Common`)
- depth 4: [BobinaNoSerie](../Procedures/Produccion/BobinaNoSerie.md) (`Procedure`, `Produccion`)
- depth 4: [SDInventarioItem](../Procedures/Produccion/SDInventarioItem.md) (`Procedure`, `Produccion`)
- depth 4: [SDTInventario](../SDTs/Produccion/SDTInventario.md) (`SDT`, `Produccion`)
- depth 4: [TabOptions](../SDTs/Root/TabOptions.md) (`SDT`, `Root`)

## Efectos en datos

- **Tablas leídas:** `Configuracion`, `DB.Bobina`, `DB.Extrusion`, `DB.Interrupcion`, `DB.Inventario`, `DB.Order`, `DB.Turno`, `ExtrusionInterrupcion`, `ExtrusoraProducto`, `Interrupcion`, `Inventario`, `Turno`
- **Tablas escritas:** `Configuracion`, `DB.Bobina`, `DB.Extrusion`, `DB.Interrupcion`, `DB.Inventario`, `ExtrusionInterrupcion`, `ExtrusoraProducto`, `Interrupcion`, `Inventario`, `Turno`
- **SDTs usados:** `GeneXus.Common.GridState`, `GeneXus.Common.Messages`, `SDTBobina`, `SDTExtrusion`, `SDTExtrusora`, `SDTOperador`, `SDTProducto`, `SDTTurno`, `WWPBaseObjects.AuditingObject`, `WWPBaseObjects.WWPContext`
- **DataProviders usados:** `BobinaDP`
## Entidades relacionadas (del glosario)

- [Configuracion](../_domain_glossary.md#configuracion)
- [ExtrusionInterrupcion](../_domain_glossary.md#extrusioninterrupcion)
- [ExtrusoraProducto](../_domain_glossary.md#extrusoraproducto)
- [Interrupcion](../_domain_glossary.md#interrupcion)
- [Inventario](../_domain_glossary.md#inventario)
- [Turno](../_domain_glossary.md#turno)
