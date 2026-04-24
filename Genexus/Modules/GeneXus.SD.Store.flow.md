# Flujo del módulo: GeneXus.SD.Store

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/GeneXus.SD.Store.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 6 |
| Transactions | 0 |
| WebPanels | 0 |
| Procedures | 0 |
| DataProviders | 0 |
| SDTs | 6 |
| Módulos que LLAMA | 0 (0 calls) |
| Módulos que LO LLAMAN | 0 (0 calls) |
| Procesos canónicos | 0 |

---

## 🚪 Entry points

_Módulo no navegable directamente desde el menú y sin caller cross-module identificado._

---

## 🔀 Diagrama general del módulo

_Módulo de infraestructura sin flujo propio_: sus objetos se invocan como utilidades desde **0 módulos externos** (0 llamadas entrantes). No se emite diagrama de flujo — ver la sección de llamadas cross-module para el uso real.

---

## 📦 Procesos del módulo

_Este módulo no tiene procesos canónicos cuyo entry-point le pertenezca. Sus objetos son invocados desde procesos de otros módulos (ver sección cross-module)._

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

_(sin llamadas salientes)_

### ← Lo llaman desde

_(ningún módulo externo lo invoca)_

---

## 🗃️ Datos tocados (extraído de la matrix)

_(ningún proceso de este módulo toca entidades en la matrix)_

---

## 🧭 Lectura rápida del módulo

- **Propósito:** TODO: definir -- módulo sin Transactions, sin entry points en el menú, y sin aristas cross-module. Revisar los 6 objetos manualmente: `StoreProduct`, `PurchaseReceiptInformation`, `PurchaseResult`, `PurchasesInformation`, `StoreValidationConfig`.
- **Patrón dominante:** módulo de infraestructura (colección de SDTs / utilidades sin flujo propio).
- **Valor diferencial:** ninguno — el módulo no ancla procesos propios, se mueve por invocación externa.
- **Acoplamiento externo:** ninguno (módulo self-contained).
- **Riesgo de migración:** ninguno si el framework target replica los SDTs. Alto si hay que reescribir código generado contra ellos.

