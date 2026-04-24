# Módulo: admin

## Propósito

Módulo con 4 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Produccion.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 2 |
| WebPanels | 2 |
| **Total** | **4** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [WWPBaseObjects](WWPBaseObjects.md) (16): InsertarManualenteBobinas -> LoadWWPContext; InsertarManualenteBobinas -> WWPContext; AgregarBobinas -> DVMessageGetBasicNotificationMsg; ImprimirBobinasGetFilterData -> LoadGridState; ImprimirBobinasGetFilterData -> LoadWWPContext _(+11 más)_
- [DB](DB.md) (4): InsertarManualenteBobinas -> Extrusion; InsertarManualenteBobinas -> Bobina; AgregarBobinas -> Extrusion; ImprimirBobinas -> Bobina
- [Produccion](Produccion.md) (3): InsertarManualenteBobinas -> GuardarBobina; InsertarManualenteBobinas -> GenerarBobinaNo; InsertarManualenteBobinas -> SDTBobina
- [Web](Web.md) (2): InsertarManualenteBobinas -> Debugger; AgregarBobinas -> Debugger
- [PrinterSD](PrinterSD.md) (1): ImprimirBobinas -> BobinaReportMainMulti

### Este módulo ES LLAMADO por

- [Produccion](Produccion.md) (1): vwAnaliticaBobina -> ImprimirBobinas

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Produccion**.

