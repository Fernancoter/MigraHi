# Flujo del módulo: WorkWithPlus.NativeMobile

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/WorkWithPlus.NativeMobile.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 60 |
| Transactions | 0 |
| WebPanels | 0 |
| Procedures | 34 |
| DataProviders | 11 |
| SDTs | 15 |
| Módulos que LLAMA | 1 (2 calls) |
| Módulos que LO LLAMAN | 1 (14 calls) |
| Procesos canónicos | 4 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `GAMIsAuthByFunctionalityKey` | externo | Root.HICONESDOptionsDP |
| `SDPProductsListDP` | externo | Root.SDPGetProductData |
| `SDPWebServerSessionGet` | externo | Root.SDPCartAddressGetSelected, Root.SDPCartPaymentMethodsGetSelected |
| `SDPWebServerSessionSet` | externo | Root.SDPCartAddressSetSelected, Root.SDPCartPaymentMethodsSetSelected |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[SDPProductsListDP]
        X2[GAMIsAuthByFunctionalityKey]
        X3[SDPWebServerSessionSet]
        X4[SDPWebServerSessionGet]
    end

    subgraph MOD["📦 WorkWithPlus.NativeMobile (60 objetos)"]
        direction TB
    DP_SDPProductsListDP[SDPProductsListDP DP]
    P_GAMIsAuthByFunctionalityKey[GAMIsAuthByFunctionalityKey]
    P_MDFLoadSampleFields[MDFLoadSampleFields]
    P_SDPCalendarGetSampleData[SDPCalendarGetSampleData]
    P_SDPDoubleMenuFromLaunchpad[SDPDoubleMenuFromLaunchpad]
    P_SDPGetRadialGauge[SDPGetRadialGauge]
    P_SDPGetRangedRadialGauge[SDPGetRangedRadialGauge]
    P_SDPGetRangedRadialGaugeFromConfig[SDPGetRangedRadialGaugeFromConfig]
    P_SDPMDFFieldsRequiredChek[SDPMDFFieldsRequiredChek]
    P_SDPProductsListToDoubleOptionsSDT[SDPProductsListToDoubleOptionsSDT]
    P_SDPWebServerSessionGet[SDPWebServerSessionGet]
    P_SDPWebServerSessionSet[SDPWebServerSessionSet]
    S_MDFDynamicField[MDFDynamicField SDT]
    S_SDPLaunchpadOptions[SDPLaunchpadOptions SDT]
    S_SDPlusCalendarEntry[SDPlusCalendarEntry SDT]
    S_SDPlusCalendarInfo[SDPlusCalendarInfo SDT]
    S_SDPMenuInfo[SDPMenuInfo SDT]
    S_SDPMenuOptions[SDPMenuOptions SDT]
    S_SDPMultiColumnOptions[SDPMultiColumnOptions SDT]
    S_SDPProductData[SDPProductData SDT]
        OTROS[+40 objetos internos]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_GeneXus_Common[GeneXus.Common<br/>2 calls]
    end

    X1 --> DP_SDPProductsListDP
    X2 --> P_GAMIsAuthByFunctionalityKey
    X3 --> P_SDPWebServerSessionSet
    X4 --> P_SDPWebServerSessionGet
    DP_SDPProductsListDP --> S_SDPProductData
    P_MDFLoadSampleFields --> S_MDFDynamicField
    S_SDPMultiColumnOptions --> S_SDPMenuInfo
    P_SDPDoubleMenuFromLaunchpad --> S_SDPLaunchpadOptions
    S_SDPlusCalendarInfo --> S_SDPlusCalendarEntry
    P_SDPGetRangedRadialGauge --> P_SDPGetRangedRadialGaugeFromConfig
    P_SDPProductsListToDoubleOptionsSDT --> S_SDPProductData
    P_SDPMDFFieldsRequiredChek --> S_MDFDynamicField
    P_SDPCalendarGetSampleData --> S_SDPlusCalendarEntry
    P_SDPCalendarGetSampleData --> S_SDPlusCalendarInfo
    OTROS -.-> P_SDPWebServerSessionGet
    P_SDPMDFFieldsRequiredChek -.-> E_GeneXus_Common

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class P_SDPWebServerSessionGet,DP_SDPProductsListDP,P_SDPWebServerSessionSet,P_GAMIsAuthByFunctionalityKey,S_SDPMenuOptions,S_MDFDynamicField,S_SDPlusCalendarEntry,S_SDPProductData,P_SDPGetRadialGauge,S_SDPMenuInfo,P_MDFLoadSampleFields,S_SDPMultiColumnOptions,P_SDPDoubleMenuFromLaunchpad,S_SDPlusCalendarInfo,P_SDPGetRangedRadialGauge,S_SDPLaunchpadOptions,P_SDPProductsListToDoubleOptionsSDT,P_SDPMDFFieldsRequiredChek,P_SDPGetRangedRadialGaugeFromConfig,P_SDPCalendarGetSampleData proc
    class E_GeneXus_Common ext
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

### Proceso 1 -- `proc_work_with_plus_native_mobile_sdpproducts_list_dp` (SDPProductsListDP)

**2 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    DP_SDPProductsListDP[SDPProductsListDP DP]
    S_SDPProductData[SDPProductData SDT]
    DP_SDPProductsListDP --> S_SDPProductData

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 2 -- `proc_work_with_plus_native_mobile_gamis_auth_by_functionality_key` (GAMIsAuthByFunctionalityKey)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    P_GAMIsAuthByFunctionalityKey[GAMIsAuthByFunctionalityKey]

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 3 -- `proc_work_with_plus_native_mobile_sdpweb_server_session_get` (SDPWebServerSessionGet)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    P_SDPWebServerSessionGet[SDPWebServerSessionGet]

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 4 -- `proc_work_with_plus_native_mobile_sdpweb_server_session_set` (SDPWebServerSessionSet)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    P_SDPWebServerSessionSet[SDPWebServerSessionSet]

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `GeneXus.Common` | 2 | `GeolocationInfo`, `Messages` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `Root` | 14 | `HICONESDOptionsDP`, `SDPGetProductData`, `HICONEInfoDP` |

---

## 🗃️ Datos tocados (extraído de la matrix)

_(ningún proceso de este módulo toca entidades en la matrix)_

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 60 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Root.
- **Patrón dominante:** módulo de procesos / utilities sin UI directa.
- **Valor diferencial:** cluster más grande es `proc_work_with_plus_native_mobile_sdpproducts_list_dp` (2 objetos).
- **Acoplamiento externo:** 1 peers, 2 calls totales. Top: `GeneXus.Common` (2).
- **Riesgo de migración:** medio — revisar las aristas cross-module individualmente en Phase 3.3.

