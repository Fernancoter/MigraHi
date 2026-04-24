# Módulo: GeneXus.Common

## Propósito

Módulo con 15 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Calidad, DB, Produccion.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| SDTs | 15 |
| **Total** | **15** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [GeneXus.Common.Notifications](GeneXus.Common.Notifications.md) (1): DirectionsRequestParameters -> ConfigurationProperty

### Este módulo ES LLAMADO por

- [Produccion](Produccion.md) (28): WWPrensa -> GridState; gestionarTroquel -> Messages; SDExtrusoraOcupada -> Messages; SDAgregarCarrete -> Messages; gestionarTurno -> Messages _(+23 más)_
- [Root](Root.md) (16): DirectionsServiceRequest -> Route; GAMUpdateRegisterUser -> Messages; GAMSDChangePasswordUser -> Messages; GAMSetPassword -> Messages; GAMCheckUserActivationMethod -> Messages _(+11 más)_
- [DB](DB.md) (8): WWOperador -> GridState; WWConfiguracion -> GridState; WWProductoCategoria -> GridState; WWPrensaProducto -> GridState; WWExtrusora -> GridState _(+3 más)_
- [WWPBaseObjects](WWPBaseObjects.md) (7): SaveFilterAs -> Messages; WWP_AddImportErrorMessage -> Messages; ExportOptions -> Messages; WWP_AddMessage -> Messages; WWP_StorageProvider_GetFilePath -> Messages _(+2 más)_
- [Seguridad](Seguridad.md) (2): HabilitarOperador -> Messages; DeshabilitarOperador -> Messages
- [Web](Web.md) (2): SetNotSuccessMessagesLog -> Messages; MostrarMensajes -> Messages
- [WorkWithPlus.NativeMobile](WorkWithPlus.NativeMobile.md) (2): SDPMDFFieldsRequiredChek -> Messages; SDPListLocationsSetMap -> GeolocationInfo
- [Calidad](Calidad.md) (1): EditarReclamoDetalle -> Messages

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Calidad, DB, Produccion, Root, Seguridad, Web, WorkWithPlus.NativeMobile, WWPBaseObjects**.

