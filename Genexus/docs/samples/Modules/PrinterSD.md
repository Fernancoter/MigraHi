# Módulo: PrinterSD

## Propósito

Módulo con 25 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: admin, DB, Produccion.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 2 |
| Procedures | 16 |
| SDTs | 7 |
| **Total** | **25** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [Produccion](Produccion.md) (16): RptExtrusion -> BobinaDP; RptExtrusion -> DPExtrusionResultado; RptExtrusion -> SDTBobina; RptExtrusion -> SDTExtrusionResultado; RptExtrusion -> SDTPrensadoResultado _(+11 más)_
- [DB](DB.md) (10): PaletReport -> Palet; PaletReport -> ProductoTerminado; ObtenerSDTEtiquetaPalet -> Palet; CarreteReportMainPCR -> Carrete; CarreteReportMain -> Carrete _(+5 más)_
- [Web](Web.md) (6): RptExtrusion -> Debugger; CarreteReportMainPCR -> Debugger; PaletReportMain -> Debugger; PaletReportSAP -> Debugger; PalletCarreteReportMainPCR -> Debugger _(+1 más)_

### Este módulo ES LLAMADO por

- [DB](DB.md) (10): ExtrusionWW -> RptExtrusion; PaletWW -> PaletReport; BobinaWW -> BobinaReportMain; CarreraWW -> CarreteReportMainPCR; CarreteWW -> CarreteReportMainPCR _(+5 más)_
- [Produccion](Produccion.md) (4): vwAnaliticaBobina -> BobinaReportMain; vwAnaliticaCarrete -> CarreteReportMainPCR; vwAnaliticaCarrete -> CarreteReportMain; vwAnaliticaPrensado -> RptPrensado
- [admin](admin.md) (1): ImprimirBobinas -> BobinaReportMainMulti

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **admin, DB, Produccion**.

