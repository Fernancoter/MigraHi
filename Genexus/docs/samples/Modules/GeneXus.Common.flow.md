# Flujo del módulo: GeneXus.Common

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/GeneXus.Common.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 15 |
| Transactions | 0 |
| WebPanels | 0 |
| Procedures | 0 |
| DataProviders | 0 |
| SDTs | 15 |
| Módulos que LLAMA | 1 (1 calls) |
| Módulos que LO LLAMAN | 8 (66 calls) |
| Procesos canónicos | 0 |

---

## 🚪 Entry points

_Módulo no navegable directamente desde el menú y sin caller cross-module identificado._

---

## 🔀 Diagrama general del módulo

_Módulo de infraestructura sin flujo propio_: sus objetos se invocan como utilidades desde **8 módulos externos** (66 llamadas entrantes). No se emite diagrama de flujo — ver la sección de llamadas cross-module para el uso real.

---

## 📦 Procesos del módulo

_Este módulo no tiene procesos canónicos cuyo entry-point le pertenezca. Sus objetos son invocados desde procesos de otros módulos (ver sección cross-module)._

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `GeneXus.Common.Notifications` | 1 | `ConfigurationProperty` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `Produccion` | 28 | `gestionarTurno`, `gestionarInventario`, `SDPalletEtiquetado` |
| `Root` | 16 | `DirectionsServiceRequest`, `GAMRegisterUser`, `GAMSDDisplayLastGAMErrors` |
| `DB` | 8 | `WWPrensaProducto`, `WWProductoCategoria`, `WWExtrusoraProducto` |
| `WWPBaseObjects` | 7 | `WWP_AddMessage`, `WWP_AddImportErrorMessage`, `WWP_ImportData` |
| `Web` | 2 | `MostrarMensajes`, `SetNotSuccessMessagesLog` |
| `WorkWithPlus.NativeMobile` | 2 | `SDPListLocationsSetMap`, `SDPMDFFieldsRequiredChek` |
| `Seguridad` | 2 | `HabilitarOperador`, `DeshabilitarOperador` |
| `Calidad` | 1 | `EditarReclamoDetalle` |

---

## 🗃️ Datos tocados (extraído de la matrix)

_(ningún proceso de este módulo toca entidades en la matrix)_

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 15 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Calidad, DB, Produccion.
- **Patrón dominante:** módulo de infraestructura (colección de SDTs / utilidades sin flujo propio).
- **Valor diferencial:** ninguno — el módulo no ancla procesos propios, se mueve por invocación externa.
- **Acoplamiento externo:** 1 peers, 1 calls totales. Top: `GeneXus.Common.Notifications` (1).
- **Riesgo de migración:** ninguno si el framework target replica los SDTs. Alto si hay que reescribir código generado contra ellos.

