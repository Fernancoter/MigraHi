# Módulo: Web

## Propósito

Módulo con 23 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: admin, DB, Existencia.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 12 |
| Procedures | 6 |
| SDTs | 2 |
| WebPanels | 3 |
| **Total** | **23** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [Produccion](Produccion.md) (46): MenuPrensado -> listarPrensas; MenuPrensado -> listarPrensaProducto; MenuPrensado -> listarProductoTerminado; MenuPrensado -> TurnosPorSemanaPrensas; MenuPrensado -> InicioPrensado _(+41 más)_
- [DB](DB.md) (43): MenuPrensado -> PaletWW; MenuPrensado -> CarreraWW; MenuPrensado -> TroquelWW; MenuConfiguracion -> WWConfiguracion; MenuModuleCatalogosSAE -> BudgetWW _(+38 más)_
- [WWPBaseObjects](WWPBaseObjects.md) (30): MenuPrensado -> ProgramNames; MenuPrensado -> DVelop_Menu; MenuConfiguracion -> ProgramNames; MenuConfiguracion -> DVelop_Menu; MenuModuleCatalogosSAE -> ProgramNames _(+25 más)_
- [GeneXusReporting](GeneXusReporting.md) (16): ModuleA -> QueryViewerElements; ModuleA -> QueryViewerParameters; ModuleA -> QueryViewerItemExpandData; ModuleA -> QueryViewerItemDoubleClickData; ModuleA -> QueryViewerItemCollapseData _(+11 más)_
- [SAE](SAE.md) (8): MenuModuleCatalogosSAE -> outlookww; MenuModuleCatalogosSAE -> priceww; Modules -> InicioReportes; Modules -> InicioCatalogosSAE; MenuModuleInformesSAE -> OrdersMoney _(+3 más)_
- [Embarques](Embarques.md) (7): MenuModuleCatalogosSAE -> ProductsWW; Modules -> InicioEmbarques; MenuEmbarques -> InicioEmbarques; MenuEmbarques -> ProductsWW; MenuEmbarques -> ListadoEmbarques _(+2 más)_
- [Calidad](Calidad.md) (5): Modules -> InicioCalidad; MenuCalidad -> reclamosww; MenuCalidad -> InicioCalidad; MenuCalidad -> CarreteDefectoWW; MenuCalidad -> ConsultarCarrete
- [GeneXus.Common](GeneXus.Common.md) (2): SetNotSuccessMessagesLog -> Messages; MostrarMensajes -> Messages
- [Reportes](Reportes.md) (2): MenuByModule -> MenuReportesHC; Modules -> InicioReportesHC
- [Root](Root.md) (2): MenuSeguridad -> GAMWWUsers; MenuSeguridad -> GAMWWRoles
- [Seguridad](Seguridad.md) (2): MenuSeguridad -> inicioSeguridad; Modules -> inicioSeguridad

### Este módulo ES LLAMADO por

- [PrinterSD](PrinterSD.md) (5): CarreteReportMainPCR -> Debugger; PaletReportMain -> Debugger; PaletReportSAP -> Debugger; PalletCarreteReportMainPCR -> Debugger; ObtenerSDTEtiquetaCarrete -> Debugger
- [Produccion](Produccion.md) (4): CrearExtrusion -> SetNotSuccessMessagesLog; vwAnaliticaCarrete -> Debugger; CrearExtrusion -> Debugger; TieneTraslapePrensado -> Debugger
- [admin](admin.md) (2): InsertarManualenteBobinas -> Debugger; AgregarBobinas -> Debugger
- [Existencia](Existencia.md) (2): ExistenciaBobinasPorTurnoId -> Debugger; ExistenciaPalletPorTurnoId -> Debugger
- [Seguridad](Seguridad.md) (2): HabilitarOperador -> SetNotSuccessMessagesLog; DeshabilitarOperador -> SetNotSuccessMessagesLog
- [DB](DB.md) (1): CarreteWW -> Debugger

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **admin, DB, Existencia, PrinterSD, Produccion, Seguridad**.

