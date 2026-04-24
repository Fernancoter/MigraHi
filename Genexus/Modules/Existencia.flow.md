# Flujo del módulo: Existencia

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/Existencia.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 11 |
| Transactions | 0 |
| WebPanels | 2 |
| Procedures | 7 |
| DataProviders | 0 |
| SDTs | 2 |
| Módulos que LLAMA | 4 (21 calls) |
| Módulos que LO LLAMAN | 1 (1 calls) |
| Procesos canónicos | 0 |

---

## 🚪 Entry points

_Módulo no navegable directamente desde el menú y sin caller cross-module identificado._

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph MOD["📦 Existencia (11 objetos)"]
        direction TB
    P_ExistenciaBobinasPorTurnoId[ExistenciaBobinasPorTurnoId]
    P_ExistenciaPalletPorTurnoId[ExistenciaPalletPorTurnoId]
    P_FechaExistenciaAnterior[FechaExistenciaAnterior]
    P_GuardarExistenciaProducto[GuardarExistenciaProducto]
    P_GuardarExistenciaSilo[GuardarExistenciaSilo]
    P_ObtenerExistenciaProducto[ObtenerExistenciaProducto]
    P_ObtenerExistenciaSilo[ObtenerExistenciaSilo]
    S_SDTExistenciaProducto[SDTExistenciaProducto SDT]
    S_SDTExistenciaSilo[SDTExistenciaSilo SDT]
    WP_ReporteExistencia[ReporteExistencia WP]
    WP_wpExistenciaMain[wpExistenciaMain WP]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_DB[DB<br/>14 calls]
        E_Web[Web<br/>4 calls]
        E_Produccion[Produccion<br/>2 calls]
        E_WWPBaseObjects[WWPBaseObjects<br/>1 calls]
    end

    P_ObtenerExistenciaProducto --> P_ExistenciaBobinasPorTurnoId
    P_ObtenerExistenciaProducto --> P_ExistenciaPalletPorTurnoId
    P_ObtenerExistenciaProducto --> S_SDTExistenciaProducto
    WP_wpExistenciaMain --> WP_ReporteExistencia
    P_ObtenerExistenciaSilo --> S_SDTExistenciaSilo
    P_GuardarExistenciaSilo --> S_SDTExistenciaSilo
    P_GuardarExistenciaProducto --> S_SDTExistenciaProducto
    P_ObtenerExistenciaProducto -.-> E_DB
    WP_wpExistenciaMain -.-> E_WWPBaseObjects
    WP_wpExistenciaMain -.-> E_Produccion
    WP_wpExistenciaMain -.-> E_DB
    P_ExistenciaPalletPorTurnoId -.-> E_Web
    P_ExistenciaPalletPorTurnoId -.-> E_DB
    P_ObtenerExistenciaSilo -.-> E_DB
    P_ExistenciaBobinasPorTurnoId -.-> E_Web
    P_ExistenciaBobinasPorTurnoId -.-> E_DB
    P_GuardarExistenciaSilo -.-> E_DB
    P_GuardarExistenciaProducto -.-> E_DB
    P_FechaExistenciaAnterior -.-> E_DB

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class WP_wpExistenciaMain,WP_ReporteExistencia wp
    class P_ObtenerExistenciaProducto,P_ExistenciaPalletPorTurnoId,P_ObtenerExistenciaSilo,P_ExistenciaBobinasPorTurnoId,P_GuardarExistenciaSilo,P_GuardarExistenciaProducto,S_SDTExistenciaProducto,S_SDTExistenciaSilo,P_FechaExistenciaAnterior proc
    class E_DB,E_Produccion,E_WWPBaseObjects,E_Web ext
```

**Leyenda:**
- 🟡 círculo = Transaction (entidad de negocio)
- 🔵 caja = WebPanel (pantalla)
- ⬜ caja gris = Procedure / DataProvider / SDT
- ➡️ sólida = navegación/invocación principal
- ➡️ punteada = llamada secundaria (audit, cross-module)
- ➡️ gruesa `==>` = dependencia pesada (>30 calls al mismo peer)

---

## 📦 Procesos del módulo

_Este módulo no tiene procesos canónicos cuyo entry-point le pertenezca. Sus objetos son invocados desde procesos de otros módulos (ver sección cross-module)._

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `DB` | 14 | `Existencia`, `ExistenciaProducto`, `ExistenciaSilo` |
| `Web` | 4 | `Debugger` |
| `Produccion` | 2 | `ObtenerConfiguracion` |
| `WWPBaseObjects` | 1 | `SecGAMIsAuthByFunctionalityKey` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `DB` | 1 | `ExistenciaWW` |

---

## 🗃️ Datos tocados (extraído de la matrix)

_(ningún proceso de este módulo toca entidades en la matrix)_

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 11 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: DB.
- **Patrón dominante:** módulo funcional / dashboard sin entidades propias; consume Trns de `DB`.
- **Valor diferencial:** ninguno — el módulo no ancla procesos propios, se mueve por invocación externa.
- **Acoplamiento externo:** 4 peers, 21 calls totales. Top: `DB` (14), `Web` (4), `Produccion` (2).
- **Riesgo de migración:** medio-alto — fuerte acoplamiento a `DB` (14 calls). DB se migra primero o junto.

