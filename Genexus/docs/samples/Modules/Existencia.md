# Módulo: Existencia

## Propósito

Módulo con 11 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: DB.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| Procedures | 7 |
| SDTs | 2 |
| WebPanels | 2 |
| **Total** | **11** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

- [DB](DB.md) (14): GuardarExistenciaProducto -> ExistenciaProducto; GuardarExistenciaSilo -> ExistenciaSilo; ExistenciaBobinasPorTurnoId -> ExtrusionResultado; ExistenciaPalletPorTurnoId -> PrensadoResultado; FechaExistenciaAnterior -> Existencia _(+9 más)_
- [Web](Web.md) (2): ExistenciaBobinasPorTurnoId -> Debugger; ExistenciaPalletPorTurnoId -> Debugger
- [Produccion](Produccion.md) (1): wpExistenciaMain -> ObtenerConfiguracion
- [WWPBaseObjects](WWPBaseObjects.md) (1): wpExistenciaMain -> SecGAMIsAuthByFunctionalityKey

### Este módulo ES LLAMADO por

- [DB](DB.md) (1): ExistenciaWW -> wpExistenciaMain

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **DB**.

