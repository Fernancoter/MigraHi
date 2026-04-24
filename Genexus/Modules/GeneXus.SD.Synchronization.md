# Módulo: GeneXus.SD.Synchronization

## Propósito

Módulo con 3 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Root.

- **Evidencia:** `inferida`

## Objetos

| Tipo | Cantidad |
|---|---|
| SDTs | 3 |
| **Total** | **3** |

## Entidades clave

_Este módulo no contiene Transactions._

## Dependencias cross-module

### Este módulo LLAMA a

_(sin llamadas salientes a otros módulos)_

### Este módulo ES LLAMADO por

- [Root](Root.md) (8): GxBeforeEventReplicator -> SynchronizationEventList; GxOnPendingEventFailed -> SynchronizationEventList; GxAfterEventReplicator -> SynchronizationEventResultList; GxBeforeEventReplicator -> SynchronizationEventResultList; GxOnPendingEventFailed -> SynchronizationEventResultList _(+3 más)_

## Entry points (desde el menú)

_Módulo no navegable directamente desde el menú de `_menu.json`._
Accedido indirectamente por: **Root**.

