# Módulo: WorkWithPlus.NativeMobile

## Propósito

Módulo con 60 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Root.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| DataProviders | 11 |
| Procedures | 34 |
| SDTs | 15 |
| **Total** | **60** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [GeneXus.Common](GeneXus.Common.md) (2): SDPMDFFieldsRequiredChek -> Messages; SDPListLocationsSetMap -> GeolocationInfo

### Este módulo ES LLAMADO por

- [Root](Root.md) (14): SDPCartProduct -> SDPProductData; SDPGetProductData -> SDPProductData; SDPCartAddressGetSelected -> SDPWebServerSessionGet; SDPCartPaymentMethodsGetSelected -> SDPWebServerSessionGet; HICONEInfoDP -> SDPMenuInfo _(+9 más)_

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Root**.

