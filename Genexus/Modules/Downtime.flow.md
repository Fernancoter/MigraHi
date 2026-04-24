# Flujo del módulo: Downtime

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/Downtime.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 10 |
| Transactions | 1 (DownTimeCode) |
| WebPanels | 3 |
| Procedures | 4 |
| DataProviders | 1 |
| SDTs | 1 |
| Módulos que LLAMA | 3 (73 calls) |
| Módulos que LO LLAMAN | 1 (1 calls) |
| Procesos canónicos | 1 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `DownTimeCodeWW` | externo | WWPBaseObjects.ListWWPPrograms |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[DownTimeCodeWW]
    end

    subgraph MOD["📦 Downtime (10 objetos)"]
        direction TB
    DP_DPDownTimeCode[DPDownTimeCode DP]
    P_DownTimeCodeWWExport[DownTimeCodeWWExport]
    P_DownTimeCodeWWExportReport[DownTimeCodeWWExportReport]
    P_DownTimeCodeWWGetFilterData[DownTimeCodeWWGetFilterData]
    P_LoadAuditDownTimeCode[LoadAuditDownTimeCode]
    S_SDTDownTimeCode[SDTDownTimeCode SDT]
    T_DownTimeCode((DownTimeCode))
    WP_DownTimeCodePrompt[DownTimeCodePrompt WP]
    WP_DownTimeCodeView[DownTimeCodeView WP]
    WP_DownTimeCodeWW[DownTimeCodeWW WP]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>70 calls]
        E_WWPBaseObjects_Subscriptions[WWPBaseObjects.Subscriptions<br/>2 calls]
        E_WWPBaseObjects_Discussions[WWPBaseObjects.Discussions<br/>1 calls]
    end

    X1 --> WP_DownTimeCodeWW
    WP_DownTimeCodeWW --> P_DownTimeCodeWWGetFilterData
    WP_DownTimeCodeWW --> P_DownTimeCodeWWExport
    WP_DownTimeCodeWW --> P_DownTimeCodeWWExportReport
    WP_DownTimeCodeWW --> T_DownTimeCode
    WP_DownTimeCodeWW --> WP_DownTimeCodeView
    T_DownTimeCode -.audit.-> P_LoadAuditDownTimeCode
    T_DownTimeCode --> WP_DownTimeCodeView
    T_DownTimeCode --> WP_DownTimeCodeWW
    WP_DownTimeCodeView --> T_DownTimeCode
    WP_DownTimeCodeView --> WP_DownTimeCodeView
    WP_DownTimeCodeView --> WP_DownTimeCodeWW
    P_DownTimeCodeWWExport --> T_DownTimeCode
    P_DownTimeCodeWWExportReport --> T_DownTimeCode
    P_DownTimeCodeWWGetFilterData --> T_DownTimeCode
    WP_DownTimeCodePrompt --> T_DownTimeCode
    P_LoadAuditDownTimeCode --> T_DownTimeCode
    DP_DPDownTimeCode --> S_SDTDownTimeCode
    WP_DownTimeCodeWW ==> E_WWPBaseObjects
    WP_DownTimeCodeWW -.-> E_WWPBaseObjects_Subscriptions
    T_DownTimeCode ==> E_WWPBaseObjects
    WP_DownTimeCodeView ==> E_WWPBaseObjects
    WP_DownTimeCodeView -.-> E_WWPBaseObjects_Subscriptions
    WP_DownTimeCodeView -.-> E_WWPBaseObjects_Discussions
    P_DownTimeCodeWWExport ==> E_WWPBaseObjects
    P_DownTimeCodeWWExportReport ==> E_WWPBaseObjects
    P_DownTimeCodeWWGetFilterData ==> E_WWPBaseObjects
    WP_DownTimeCodePrompt ==> E_WWPBaseObjects
    P_LoadAuditDownTimeCode ==> E_WWPBaseObjects

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class T_DownTimeCode trn
    class WP_DownTimeCodeWW,WP_DownTimeCodeView,WP_DownTimeCodePrompt wp
    class P_DownTimeCodeWWExport,P_DownTimeCodeWWExportReport,P_DownTimeCodeWWGetFilterData,P_LoadAuditDownTimeCode,DP_DPDownTimeCode,S_SDTDownTimeCode proc
    class E_WWPBaseObjects_Discussions,E_WWPBaseObjects,E_WWPBaseObjects_Subscriptions ext
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

### Proceso 1 -- `proc_downtime_down_time_code_ww` (DownTimeCodeWW)

**7 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    T_DownTimeCode((DownTimeCode))
    WP_DownTimeCodeView[DownTimeCodeView WP]
    WP_DownTimeCodeWW[DownTimeCodeWW WP]
    INFRA[+4 helpers WWP]
    WP_DownTimeCodeWW --> T_DownTimeCode
    WP_DownTimeCodeWW --> WP_DownTimeCodeView
    WP_DownTimeCodeWW -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_DownTimeCode trn
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 70 | `LoadWWPContext`, `WWPContext`, `LoadGridState` |
| `WWPBaseObjects.Subscriptions` | 2 | `WWP_HasSubscriptionsToDisplay` |
| `WWPBaseObjects.Discussions` | 1 | `WWP_HasDiscussionMessages` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `WWPBaseObjects` | 1 | `ListWWPPrograms` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `DownTimeCode` | **W** | `proc_downtime_down_time_code_ww` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 10 objetos parseados. Entidades centrales por referencias entrantes: `DownTimeCode`. Sin entry points en `_menu.json` -- accedido indirectamente desde: WWPBaseObjects.
- **Patrón dominante:** WWP CRUD standard (Trn + WW/View + audit helpers + export/filter helpers generados por el pattern).
- **Valor diferencial:** cluster más grande es `proc_downtime_down_time_code_ww` (7 objetos).
- **Acoplamiento externo:** 3 peers, 73 calls totales. Top: `WWPBaseObjects` (70), `WWPBaseObjects.Subscriptions` (2), `WWPBaseObjects.Discussions` (1).
- **Riesgo de migración:** alto — dependencia intensa de WWPBaseObjects (70 calls); requiere reimplementar el pattern WWP en el target o tolerar pérdida de audit/filter/export.

