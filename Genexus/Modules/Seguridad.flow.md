# Flujo del módulo: Seguridad

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/Seguridad.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 4 |
| Transactions | 0 |
| WebPanels | 1 |
| Procedures | 2 |
| DataProviders | 0 |
| SDTs | 1 |
| Módulos que LLAMA | 4 (16 calls) |
| Módulos que LO LLAMAN | 2 (5 calls) |
| Procesos canónicos | 3 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `DeshabilitarOperador` | externo | Produccion.gestionarOperador |
| `HabilitarOperador` | externo | Produccion.listarOperador |
| `inicioSeguridad` | menú | Web > Seguridad > Inicio |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph MENU["🚪 Entry points (menú)"]
        M1[inicioSeguridad]
    end

    subgraph XEN["⚙️ Entry points (externos)"]
        X1[DeshabilitarOperador]
        X2[HabilitarOperador]
    end

    subgraph MOD["📦 Seguridad (4 objetos)"]
        direction TB
    P_DeshabilitarOperador[DeshabilitarOperador]
    P_HabilitarOperador[HabilitarOperador]
    S_inicioSeguridadGridTodoListSDT[inicioSeguridadGridTodoListSDT SDT]
    WP_inicioSeguridad[inicioSeguridad WP]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_GeneXusReporting[GeneXusReporting<br/>8 calls]
        E_Web[Web<br/>4 calls]
        E_DB[DB<br/>2 calls]
        E_GeneXus_Common[GeneXus.Common<br/>2 calls]
    end

    M1 --> WP_inicioSeguridad
    X1 --> P_DeshabilitarOperador
    X2 --> P_HabilitarOperador
    WP_inicioSeguridad --> S_inicioSeguridadGridTodoListSDT
    WP_inicioSeguridad -.-> E_GeneXusReporting
    P_DeshabilitarOperador -.-> E_Web
    P_DeshabilitarOperador -.-> E_GeneXus_Common
    P_DeshabilitarOperador -.-> E_DB
    P_HabilitarOperador -.-> E_Web
    P_HabilitarOperador -.-> E_GeneXus_Common
    P_HabilitarOperador -.-> E_DB

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class WP_inicioSeguridad wp
    class P_DeshabilitarOperador,P_HabilitarOperador,S_inicioSeguridadGridTodoListSDT proc
    class E_DB,E_GeneXus_Common,E_Web,E_GeneXusReporting ext
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

### Proceso 1 -- `proc_seguridad_inicio_seguridad` (Inicio)

**10 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    S_QueryViewerItemExpandData[QueryViewerItemExpandData SDT]
    S_QueryViewerFilterChangedData[QueryViewerFilterChangedData SDT]
    S_QueryViewerItemDoubleClickData[QueryViewerItemDoubleClickData SDT]
    S_QueryViewerItemClickData[QueryViewerItemClickData SDT]
    S_QueryViewerDragAndDropData[QueryViewerDragAndDropData SDT]
    S_QueryViewerParameters[QueryViewerParameters SDT]
    WP_inicioSeguridad[inicioSeguridad WP]
    S_QueryViewerElements[QueryViewerElements SDT]
    S_QueryViewerItemCollapseData[QueryViewerItemCollapseData SDT]
    S_inicioSeguridadGridTodoListSDT[inicioSeguridadGridTodoListSDT SDT]
    WP_inicioSeguridad --> S_QueryViewerElements
    WP_inicioSeguridad --> S_QueryViewerParameters
    WP_inicioSeguridad --> S_QueryViewerItemExpandData
    WP_inicioSeguridad --> S_QueryViewerItemDoubleClickData
    WP_inicioSeguridad --> S_QueryViewerItemCollapseData
    WP_inicioSeguridad --> S_QueryViewerItemClickData
    WP_inicioSeguridad --> S_QueryViewerFilterChangedData
    WP_inicioSeguridad --> S_QueryViewerDragAndDropData
    WP_inicioSeguridad --> S_inicioSeguridadGridTodoListSDT

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 2 -- `proc_seguridad_deshabilitar_operador` (DeshabilitarOperador)

**9 objetos · 5 módulos tocados.**

```mermaid
flowchart LR
    WP_WWOperador[WWOperador WP]
    S_GridState[GridState SDT]
    S_TransactionContext[TransactionContext SDT]
    WP_ViewOperador[ViewOperador WP]
    T_Operador((Operador))
    S_TabOptions[TabOptions SDT]
    P_DeshabilitarOperador[DeshabilitarOperador]
    P_Debugger[Debugger]
    P_SetNotSuccessMessagesLog[SetNotSuccessMessagesLog]
    P_DeshabilitarOperador --> P_SetNotSuccessMessagesLog
    P_DeshabilitarOperador --> T_Operador
    P_SetNotSuccessMessagesLog --> P_Debugger
    T_Operador --> S_TransactionContext
    T_Operador --> WP_WWOperador
    T_Operador --> WP_ViewOperador
    WP_WWOperador --> S_GridState
    WP_ViewOperador --> S_TabOptions

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Operador trn
```

### Proceso 3 -- `proc_seguridad_habilitar_operador` (HabilitarOperador)

**9 objetos · 5 módulos tocados.**

```mermaid
flowchart LR
    WP_WWOperador[WWOperador WP]
    S_GridState[GridState SDT]
    S_TransactionContext[TransactionContext SDT]
    P_HabilitarOperador[HabilitarOperador]
    T_Operador((Operador))
    S_TabOptions[TabOptions SDT]
    P_Debugger[Debugger]
    P_SetNotSuccessMessagesLog[SetNotSuccessMessagesLog]
    WP_ViewOperador[ViewOperador WP]
    P_HabilitarOperador --> P_SetNotSuccessMessagesLog
    P_HabilitarOperador --> T_Operador
    P_SetNotSuccessMessagesLog --> P_Debugger
    T_Operador --> S_TransactionContext
    T_Operador --> WP_WWOperador
    T_Operador --> WP_ViewOperador
    WP_WWOperador --> S_GridState
    WP_ViewOperador --> S_TabOptions

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Operador trn
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `GeneXusReporting` | 8 | `QueryViewerParameters`, `QueryViewerDragAndDropData`, `QueryViewerElements` |
| `Web` | 4 | `SetNotSuccessMessagesLog` |
| `DB` | 2 | `Operador` |
| `GeneXus.Common` | 2 | `Messages` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `Produccion` | 3 | `gestionarOperador`, `listarOperador` |
| `Web` | 2 | `MenuSeguridad`, `Modules` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `Operador` | **W** | `proc_seguridad_deshabilitar_operador`, `proc_seguridad_habilitar_operador` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 4 objetos parseados. Entry points desde el menú: `inicioSeguridad`.
- **Patrón dominante:** módulo funcional / dashboard sin entidades propias; consume Trns de `DB`.
- **Valor diferencial:** cluster más grande es `proc_seguridad_inicio_seguridad` (10 objetos) — ruta `Web > Seguridad > Inicio`.
- **Acoplamiento externo:** 4 peers, 16 calls totales. Top: `GeneXusReporting` (8), `Web` (4), `DB` (2).
- **Riesgo de migración:** medio — revisar las aristas cross-module individualmente en Phase 3.3.

