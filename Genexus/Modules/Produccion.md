# Módulo: Produccion

## Propósito

Módulo con 392 objetos parseados. Entry points desde el menú: `listarLotes`, `listarOperador`, `vwAnaliticaBobina`.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 58 |
| Procedures | 248 |
| SDTs | 32 |
| WebPanels | 54 |
| **Total** | **392** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (935): listarTurnosGetFilterData -> LoadGridState; listarTurnosGetFilterData -> LoadWWPContext; listarTurnosGetFilterData -> WWPGridState; listarTurnosGetFilterData -> WWPContext; gestionarTroquel -> GetWWPTitleSettingsIcons _(+930 más)_
- [DB](DB.md) (378): listarTurnosGetFilterData -> Turno; gestionarTroquel -> Troquel; ValidarBobina -> Bobina; ValidarCarreraCompleta -> Carrete; SDCrearPrensaTroquel -> Troquel _(+373 más)_
- [GeneXusReporting](GeneXusReporting.md) (64): TurnosPorSemanaExtrusoras -> QueryViewerElements; TurnosPorSemanaExtrusoras -> QueryViewerParameters; TurnosPorSemanaExtrusoras -> QueryViewerItemExpandData; TurnosPorSemanaExtrusoras -> QueryViewerItemDoubleClickData; TurnosPorSemanaExtrusoras -> QueryViewerItemCollapseData _(+59 más)_
- [GeneXus.Common](GeneXus.Common.md) (28): gestionarTroquel -> Messages; SDExtrusoraOcupada -> Messages; SDAgregarCarrete -> Messages; gestionarTurno -> Messages; WWPrensa -> GridState _(+23 más)_
- [Root](Root.md) (10): WWPrensa -> TransactionContext; SDTerminarCarreraDB -> SDPAddNotification; MedirBobinas -> SDPAddNotification; SDLimpiarNotificaciones -> SDPCartProductsList; SDLimpiarNotificaciones -> SDPCartProductsRemove _(+5 más)_
- [Web](Web.md) (5): BobinaNoSerie -> Debugger; vwAnaliticaCarrete -> Debugger; CrearExtrusion -> SetNotSuccessMessagesLog; CrearExtrusion -> Debugger; TieneTraslapePrensado -> Debugger
- [PrinterSD](PrinterSD.md) (4): vwAnaliticaBobina -> BobinaReportMain; vwAnaliticaCarrete -> CarreteReportMain; vwAnaliticaCarrete -> CarreteReportMainPCR; vwAnaliticaPrensado -> RptPrensado
- [WWPBaseObjects.Subscriptions](WWPBaseObjects.Subscriptions.md) (3): vwAnaliticaBobina -> WWP_HasSubscriptionsToDisplay; vwAnaliticaCarrete -> WWP_HasSubscriptionsToDisplay; vwAnaliticaPrensado -> WWP_HasSubscriptionsToDisplay
- [Seguridad](Seguridad.md) (2): listarOperador -> HabilitarOperador; gestionarOperador -> DeshabilitarOperador
- [admin](admin.md) (1): vwAnaliticaBobina -> ImprimirBobinas
- [SAE](SAE.md) (1): gestionarProducto -> ProductDP

### Este módulo ES LLAMADO por

- [Web](Web.md) (46): MenuMateriaPrima -> listarLotes; MenuProduccion -> listarLotes; MenuInventario -> listarLotes; MenuConfiguracion -> listarOperador; MenuExtrusion -> vwAnaliticaBobina _(+41 más)_
- [WWPBaseObjects](WWPBaseObjects.md) (22): ListWWPPrograms -> listarLotes; ListWWPPrograms -> vwTrazabilidad; ListWWPPrograms -> TableroDirectivoExtrusion; ListWWPPrograms -> listarOperador; ListWWPPrograms -> vwAnaliticaBobina _(+17 más)_
- [PrinterSD](PrinterSD.md) (16): RptPrensado -> SDTPrensadoBobina; RptPrensado -> DPPrensadoResultado; RptPrensado -> CarreteDP; RptExtrusion -> DPExtrusionResultado; RptExtrusion -> BobinaDP _(+11 más)_
- [DB](DB.md) (11): Troquel -> gestionarTroquel; LoadAuditPrensado -> TotalPaletPrensado; BobinaWW -> ReposoTranscurrido; Existencia -> TurnoDP; CarreraWW -> ObtenerTipoMaterialPorCarrete _(+6 más)_
- [Reportes](Reportes.md) (7): ExtrusoraObservacion -> ExtrusoraDP; PrensadosDelDiaWCGetFilterData -> JornadaLaboral; ExtrusionesDelDiaWCGetFilterData -> JornadaLaboral; ExtrusoraObservacion -> TurnoDP; PrensaObservacion -> TurnoDP _(+2 más)_
- [Embarques](Embarques.md) (5): NotificarImpresion -> ObtenerConfiguracion; EmbarqueFormato -> ObtenerConfiguracion; NotificarSupervisor -> ObtenerConfiguracion; NotificarImpresion -> SDTPalet; NotificarSupervisor -> SDTPalet
- [admin](admin.md) (3): InsertarManualenteBobinas -> SDTBobina; InsertarManualenteBobinas -> GenerarBobinaNo; InsertarManualenteBobinas -> GuardarBobina
- [Root](Root.md) (2): wpImportarPermisosPorRol -> ObtenerConfiguracion; GAMUserRoleSelect -> ObtenerConfiguracion
- [SAE](SAE.md) (2): UnitPlan -> ObtenerConfiguracion; ITWOutlook -> ObtenerConfiguracion
- [Calidad](Calidad.md) (1): ReclamoProductoDP -> SDTProducto
- [Existencia](Existencia.md) (1): wpExistenciaMain -> ObtenerConfiguracion

## Entry points (desde el menú)

- [ExclusionDelDia](../WebPanels/Produccion/ExclusionDelDia.md) -- ruta: `Web > Producción > Extrusión > Extrusión del Día`
- [InicioExtrusion](../WebPanels/Produccion/InicioExtrusion.md) -- ruta: `Web > Extrusión > Inicio`
- [InicioInventario](../WebPanels/Produccion/InicioInventario.md) -- ruta: `Web > Inventarios > Inicio`
- [InicioPrensado](../WebPanels/Produccion/InicioPrensado.md) -- ruta: `Web > Prensado > Inicio`
- [InicioProduccion](../WebPanels/Produccion/InicioProduccion.md) -- ruta: `Web > Producción > Inicio`
- [listarExtrusora](../WebPanels/Produccion/listarExtrusora.md) -- ruta: `Web > Producción > Catálogos > Extrusoras` | `Web > Extrusión > Extrusoras`
- [ListarExtrusoraMezcladora](../WebPanels/Produccion/ListarExtrusoraMezcladora.md) -- ruta: `Web > Producción > Referencias > Extrusora Mezcladora`
- [listarExtrusoraProducto](../WebPanels/Produccion/listarExtrusoraProducto.md) -- ruta: `Web > Producción > Referencias > Extrusora Producto` | `Web > Extrusión > Extrusora Producto`
- [listarInventario](../WebPanels/Produccion/listarInventario.md) -- ruta: `Web > Inventarios > Cierre de Mes`
- [listarLotes](../WebPanels/Produccion/listarLotes.md) -- ruta: `Web > Inventarios > Lotes` | `Web > Producción > Catálogos > Lotes`
- [listarOperador](../WebPanels/Produccion/listarOperador.md) -- ruta: `Web > Producción > Operadores`
- [listarPrensaProducto](../WebPanels/Produccion/listarPrensaProducto.md) -- ruta: `Web > Producción > Referencias > Prensa Producto` | `Web > Prensado > Prensa Producto`
- [listarPrensas](../WebPanels/Produccion/listarPrensas.md) -- ruta: `Web > Producción > Catálogos > Prensas` | `Web > Prensado > Prensas`
- [listarProductoCategoria](../WebPanels/Produccion/listarProductoCategoria.md) -- ruta: `Web > Producción > Catálogos > Categorías`
- [listarProductos](../WebPanels/Produccion/listarProductos.md) -- ruta: `Web > Producción > Productos`
- [listarProductoTerminado](../WebPanels/Produccion/listarProductoTerminado.md) -- ruta: `Web > Producción > Referencias > Producto Terminado` | `Web > Prensado > Producto Terminado`
- [listarSilos](../WebPanels/Produccion/listarSilos.md) -- ruta: `Web > Producción > Catálogos > Silos` | `Web > Inventarios > Silos`
- [listarTroquel](../WebPanels/Produccion/listarTroquel.md) -- ruta: `Web > Producción > Catálogos > Troqueles`
- [listarTurnos](../WebPanels/Produccion/listarTurnos.md) -- ruta: `Web > Producción > Catálogos > Turnos`
- [PrensadoDelDia](../WebPanels/Produccion/PrensadoDelDia.md) -- ruta: `Web > Producción > Prensado > Prensado del día`
- [TurnosPorSemana](../WebPanels/Produccion/TurnosPorSemana.md) -- ruta: `Web > Producción > Turnos Por Semana`
- [TurnosPorSemanaExtrusoras](../WebPanels/Produccion/TurnosPorSemanaExtrusoras.md) -- ruta: `Web > Extrusión > Turnos Por Semana`
- [TurnosPorSemanaPrensas](../WebPanels/Produccion/TurnosPorSemanaPrensas.md) -- ruta: `Web > Prensado > Turnos Por Semana`
- [vwAnaliticaBobina](../WebPanels/Produccion/vwAnaliticaBobina.md) -- ruta: `Web > Extrusión > Operación > Bobinas`
- [vwAnaliticaCarrete](../WebPanels/Produccion/vwAnaliticaCarrete.md) -- ruta: `Web > Prensado > Operación > Carretes`
- [vwAnaliticaPrensado](../WebPanels/Produccion/vwAnaliticaPrensado.md) -- ruta: `Web > Prensado > Operación > Prensados`

