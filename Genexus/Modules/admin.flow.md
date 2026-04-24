# Flujo del módulo: admin

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/admin.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 4 |
| Transactions | 0 |
| WebPanels | 2 |
| Procedures | 2 |
| DataProviders | 0 |
| SDTs | 0 |
| Módulos que LLAMA | 5 (34 calls) |
| Módulos que LO LLAMAN | 1 (1 calls) |
| Procesos canónicos | 1 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `ImprimirBobinas` | externo | Produccion.vwAnaliticaBobina |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[ImprimirBobinas]
    end

    subgraph MOD["📦 admin (4 objetos)"]
        direction TB
    P_ImprimirBobinasGetFilterData[ImprimirBobinasGetFilterData]
    P_InsertarManualenteBobinas[InsertarManualenteBobinas]
    WP_AgregarBobinas[AgregarBobinas WP]
    WP_ImprimirBobinas[ImprimirBobinas WP]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>19 calls]
        E_Produccion[Produccion<br/>5 calls]
        E_Web[Web<br/>4 calls]
        E_DB[DB<br/>4 calls]
        E_PrinterSD[PrinterSD<br/>2 calls]
    end

    X1 --> WP_ImprimirBobinas
    WP_ImprimirBobinas --> P_ImprimirBobinasGetFilterData
    WP_AgregarBobinas --> P_InsertarManualenteBobinas
    WP_ImprimirBobinas -.-> E_WWPBaseObjects
    WP_ImprimirBobinas -.-> E_PrinterSD
    WP_ImprimirBobinas -.-> E_DB
    P_InsertarManualenteBobinas -.-> E_WWPBaseObjects
    P_InsertarManualenteBobinas -.-> E_Produccion
    P_InsertarManualenteBobinas -.-> E_Web
    P_InsertarManualenteBobinas -.-> E_DB
    P_ImprimirBobinasGetFilterData -.-> E_WWPBaseObjects
    WP_AgregarBobinas -.-> E_WWPBaseObjects
    WP_AgregarBobinas -.-> E_Web
    WP_AgregarBobinas -.-> E_DB

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class WP_ImprimirBobinas,WP_AgregarBobinas wp
    class P_InsertarManualenteBobinas,P_ImprimirBobinasGetFilterData proc
    class E_WWPBaseObjects,E_PrinterSD,E_Web,E_DB,E_Produccion ext
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

### Proceso 1 -- `proc_admin_imprimir_bobinas` (ImprimirBobinas)

**7 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_ImprimirBobinas[ImprimirBobinas WP]
    P_ObtenerBarCode[ObtenerBarCode]
    P_BobinaReportMainMulti[BobinaReportMainMulti]
    P_ObtenerSDTEtiquetaBobina[ObtenerSDTEtiquetaBobina]
    P_GuardarBarCode[GuardarBarCode]
    S_EtiquetaBobinaSDT[EtiquetaBobinaSDT SDT]
    INFRA[+1 helpers WWP]
    WP_ImprimirBobinas --> P_BobinaReportMainMulti
    P_BobinaReportMainMulti --> P_ObtenerSDTEtiquetaBobina
    P_BobinaReportMainMulti --> P_ObtenerBarCode
    P_BobinaReportMainMulti --> S_EtiquetaBobinaSDT
    P_ObtenerBarCode --> P_GuardarBarCode
    WP_ImprimirBobinas -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 19 | `LoadWWPContext`, `WWPContext`, `LoadGridState` |
| `Produccion` | 5 | `GuardarBobina`, `GenerarBobinaNo`, `SDTBobina` |
| `Web` | 4 | `Debugger` |
| `DB` | 4 | `Bobina`, `Extrusion` |
| `PrinterSD` | 2 | `BobinaReportMainMulti` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `Produccion` | 1 | `vwAnaliticaBobina` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `Order` | **R** | `proc_admin_imprimir_bobinas` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 4 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Produccion.
- **Patrón dominante:** módulo funcional / dashboard sin entidades propias; consume Trns de `DB`.
- **Valor diferencial:** cluster más grande es `proc_admin_imprimir_bobinas` (7 objetos).
- **Acoplamiento externo:** 5 peers, 34 calls totales. Top: `WWPBaseObjects` (19), `Produccion` (5), `Web` (4).
- **Riesgo de migración:** medio — revisar las aristas cross-module individualmente en Phase 3.3.

