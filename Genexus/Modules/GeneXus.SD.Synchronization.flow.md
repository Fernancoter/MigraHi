# Flujo del módulo: GeneXus.SD.Synchronization

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/GeneXus.SD.Synchronization.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 3 |
| Transactions | 0 |
| WebPanels | 0 |
| Procedures | 0 |
| DataProviders | 0 |
| SDTs | 3 |
| Módulos que LLAMA | 0 (0 calls) |
| Módulos que LO LLAMAN | 1 (8 calls) |
| Procesos canónicos | 0 |

---

## 🚪 Entry points

_Módulo no navegable directamente desde el menú y sin caller cross-module identificado._

---

## 🔀 Diagrama general del módulo

_Módulo de infraestructura sin flujo propio_: sus objetos se invocan como utilidades desde **1 módulos externos** (8 llamadas entrantes). No se emite diagrama de flujo — ver la sección de llamadas cross-module para el uso real.

---

## 📦 Procesos del módulo

_Este módulo no tiene procesos canónicos cuyo entry-point le pertenezca. Sus objetos son invocados desde procesos de otros módulos (ver sección cross-module)._

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

_(sin llamadas salientes)_

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `Root` | 8 | `GxBeforeEventReplicator`, `GxOnPendingEventFailed`, `GxAfterEventReplicator` |

---

## 🗃️ Datos tocados (extraído de la matrix)

_(ningún proceso de este módulo toca entidades en la matrix)_

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 3 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Root.
- **Patrón dominante:** módulo de infraestructura (colección de SDTs / utilidades sin flujo propio).
- **Valor diferencial:** ninguno — el módulo no ancla procesos propios, se mueve por invocación externa.
- **Acoplamiento externo:** ninguno (módulo self-contained).
- **Riesgo de migración:** ninguno si el framework target replica los SDTs. Alto si hay que reescribir código generado contra ellos.

