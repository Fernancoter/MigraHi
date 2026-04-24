# Módulo: Informes

## Propósito

Módulo con 5 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Embarques, SAE.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 3 |
| SDTs | 2 |
| **Total** | **5** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

_(sin llamadas salientes a otros módulos)_

### Este módulo ES LLAMADO por

- [SAE](SAE.md) (15): Orders -> SDTInformeFilter; FTBYTD -> SDTInformeFilter; RealtimeInventory -> SDTInformeFilter; OrdersMoney -> SDTInformeFilter; UnitPlan2 -> SDTInformeFilter _(+10 más)_
- [Embarques](Embarques.md) (6): CrearEmbarque -> TotalPalletPorProductNumber; InicializarEmbarque -> TotalPalletPorProductNumber; ListadoRemisionesGetFilterData -> TotalPalletPorProductNumber; EmbarqueFormato -> SDTInformeFilter; EmbarqueFormato -> InformesTelerik _(+1 más)_

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Embarques, SAE**.

