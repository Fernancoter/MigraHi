# Flujo del módulo: PrinterSD

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/PrinterSD.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 25 |
| Transactions | 0 |
| WebPanels | 0 |
| Procedures | 16 |
| DataProviders | 2 |
| SDTs | 7 |
| Módulos que LLAMA | 3 (44 calls) |
| Módulos que LO LLAMAN | 3 (27 calls) |
| Procesos canónicos | 8 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `BobinaReportMain` | externo | DB.BobinaWW, Produccion.vwAnaliticaBobina |
| `BobinaReportMainMulti` | externo | admin.ImprimirBobinas |
| `CarreteReportMain` | externo | DB.CarreraWW, DB.CarreteWW |
| `CarreteReportMainPCR` | externo | DB.CarreraWW, DB.CarreteWW |
| `PaletReport` | externo | DB.PaletWW |
| `PaletReportMain` | externo | DB.PaletWW |
| `RptExtrusion` | externo | DB.ExtrusionWW |
| `RptPrensado` | externo | DB.PrensadoWW, Produccion.vwAnaliticaPrensado |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[RptPrensado]
        X2[CarreteReportMain]
        X3[PaletReportMain]
        X4[CarreteReportMainPCR]
        X5[BobinaReportMain]
        X6[PaletReport]
        X7[RptExtrusion]
        X8[BobinaReportMainMulti]
    end

    subgraph MOD["📦 PrinterSD (25 objetos)"]
        direction TB
    DP_DPSDTRptExtrusion[DPSDTRptExtrusion DP]
    P_BobinaReportMain[BobinaReportMain]
    P_BobinaReportMainMulti[BobinaReportMainMulti]
    P_CarreteReportMain[CarreteReportMain]
    P_CarreteReportMainPCR[CarreteReportMainPCR]
    P_ObtenerBarCode[ObtenerBarCode]
    P_ObtenerSDTEtiquetaBobina[ObtenerSDTEtiquetaBobina]
    P_ObtenerSDTEtiquetaCarrete[ObtenerSDTEtiquetaCarrete]
    P_ObtenerSDTEtiquetaPalet[ObtenerSDTEtiquetaPalet]
    P_PaletReport[PaletReport]
    P_PaletReportMain[PaletReportMain]
    P_PaletReportSAP[PaletReportSAP]
    P_PalletCarreteReportMain[PalletCarreteReportMain]
    P_PalletCarreteReportMainPCR[PalletCarreteReportMainPCR]
    P_RptExtrusion[RptExtrusion]
    P_RptPrensado[RptPrensado]
    S_EtiquetaBobinaSDT[EtiquetaBobinaSDT SDT]
    S_EtiquetaCarreraSDT[EtiquetaCarreraSDT SDT]
    S_EtiquetaCarreteSDT[EtiquetaCarreteSDT SDT]
    S_EtiquetaPaletSDT[EtiquetaPaletSDT SDT]
        OTROS[+5 objetos internos]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_Produccion[Produccion<br/>23 calls]
        E_Web[Web<br/>11 calls]
        E_DB[DB<br/>10 calls]
    end

    X1 --> P_RptPrensado
    X2 --> P_CarreteReportMain
    X3 --> P_PaletReportMain
    X4 --> P_CarreteReportMainPCR
    X5 --> P_BobinaReportMain
    X6 --> P_PaletReport
    X7 --> P_RptExtrusion
    X8 --> P_BobinaReportMainMulti
    P_RptPrensado --> P_ObtenerSDTEtiquetaBobina
    P_RptPrensado --> S_EtiquetaBobinaSDT
    P_CarreteReportMainPCR --> P_ObtenerSDTEtiquetaCarrete
    P_CarreteReportMainPCR --> P_ObtenerBarCode
    P_CarreteReportMainPCR --> S_EtiquetaCarreteSDT
    P_CarreteReportMainPCR --> S_EtiquetaCarreraSDT
    P_RptExtrusion --> DP_DPSDTRptExtrusion
    P_CarreteReportMain --> P_ObtenerSDTEtiquetaCarrete
    P_CarreteReportMain --> P_ObtenerBarCode
    P_CarreteReportMain --> S_EtiquetaCarreteSDT
    P_CarreteReportMain --> S_EtiquetaCarreraSDT
    P_PaletReportMain --> P_ObtenerSDTEtiquetaPalet
    P_PaletReportMain --> P_ObtenerBarCode
    P_PaletReportMain --> S_EtiquetaPaletSDT
    P_PaletReport --> P_PaletReportMain
    P_PaletReport --> P_PaletReportSAP
    P_BobinaReportMain --> P_ObtenerSDTEtiquetaBobina
    P_BobinaReportMain --> P_ObtenerBarCode
    P_BobinaReportMain --> S_EtiquetaBobinaSDT
    P_BobinaReportMainMulti --> P_ObtenerSDTEtiquetaBobina
    P_BobinaReportMainMulti --> P_ObtenerBarCode
    P_BobinaReportMainMulti --> S_EtiquetaBobinaSDT
    P_ObtenerSDTEtiquetaCarrete --> S_EtiquetaCarreteSDT
    P_PalletCarreteReportMainPCR --> P_ObtenerSDTEtiquetaCarrete
    P_PalletCarreteReportMainPCR --> P_ObtenerBarCode
    P_PalletCarreteReportMainPCR --> S_EtiquetaCarreteSDT
    P_PalletCarreteReportMainPCR --> S_EtiquetaCarreraSDT
    P_PaletReportSAP --> P_ObtenerSDTEtiquetaPalet
    P_PaletReportSAP --> P_ObtenerBarCode
    P_PaletReportSAP --> S_EtiquetaPaletSDT
    P_PalletCarreteReportMain --> P_ObtenerSDTEtiquetaCarrete
    P_PalletCarreteReportMain --> P_ObtenerBarCode
    P_PalletCarreteReportMain --> S_EtiquetaCarreteSDT
    P_PalletCarreteReportMain --> S_EtiquetaCarreraSDT
    P_ObtenerSDTEtiquetaBobina --> S_EtiquetaBobinaSDT
    S_EtiquetaCarreraSDT --> S_EtiquetaCarreteSDT
    P_ObtenerSDTEtiquetaPalet --> S_EtiquetaPaletSDT
    OTROS -.-> P_RptPrensado
    P_RptPrensado -.-> E_Produccion
    P_CarreteReportMainPCR -.-> E_Web
    P_CarreteReportMainPCR -.-> E_DB
    P_RptExtrusion -.-> E_Produccion
    P_RptExtrusion -.-> E_Web
    P_CarreteReportMain -.-> E_DB
    P_PaletReportMain -.-> E_Web
    P_PaletReport -.-> E_DB
    P_ObtenerSDTEtiquetaCarrete -.-> E_Web
    P_ObtenerSDTEtiquetaCarrete -.-> E_DB
    P_PalletCarreteReportMainPCR -.-> E_Web
    P_PalletCarreteReportMainPCR -.-> E_DB
    P_PaletReportSAP -.-> E_Web
    P_PalletCarreteReportMain -.-> E_DB
    P_ObtenerSDTEtiquetaBobina -.-> E_DB
    P_ObtenerSDTEtiquetaPalet -.-> E_DB
    DP_DPSDTRptExtrusion -.-> E_Produccion

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class P_RptPrensado,P_CarreteReportMainPCR,P_RptExtrusion,P_CarreteReportMain,P_PaletReportMain,P_PaletReport,P_BobinaReportMain,P_BobinaReportMainMulti,P_ObtenerBarCode,P_ObtenerSDTEtiquetaCarrete,P_PalletCarreteReportMainPCR,P_PaletReportSAP,P_PalletCarreteReportMain,S_EtiquetaCarreteSDT,S_EtiquetaBobinaSDT,P_ObtenerSDTEtiquetaBobina,S_EtiquetaCarreraSDT,P_ObtenerSDTEtiquetaPalet,S_EtiquetaPaletSDT,DP_DPSDTRptExtrusion proc
    class E_DB,E_Produccion,E_Web ext
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

### Proceso 1 -- `proc_printer_sd_rpt_prensado` (RptPrensado)

**16 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    DP_CarreraDP[CarreraDP DP]
    S_SDTCarrera[SDTCarrera SDT]
    DP_DPPrensadoResultado[DPPrensadoResultado DP]
    DP_DPSDTRptPrensado[DPSDTRptPrensado DP]
    DP_DPProductoTerminado[DPProductoTerminado DP]
    S_SDTRptPrensado[SDTRptPrensado SDT]
    S_EtiquetaBobinaSDT[EtiquetaBobinaSDT SDT]
    DP_CarreteDP[CarreteDP DP]
    P_RptPrensado[RptPrensado]
    DP_DPPrensadoBobinaSDT[DPPrensadoBobinaSDT DP]
    S_SDTPrensadoBobina[SDTPrensadoBobina SDT]
    P_ObtenerSDTEtiquetaBobina[ObtenerSDTEtiquetaBobina]
    S_SDTCarreteCalidad[SDTCarreteCalidad SDT]
    S_SDTPrensadoResultado[SDTPrensadoResultado SDT]
    S_SDTCarrete[SDTCarrete SDT]
    INFRA[+1 helpers WWP]
    P_RptPrensado --> DP_CarreteDP
    P_RptPrensado --> DP_CarreraDP
    P_RptPrensado --> DP_DPSDTRptPrensado
    P_RptPrensado --> DP_DPPrensadoResultado
    P_RptPrensado --> DP_DPPrensadoBobinaSDT
    P_RptPrensado --> DP_DPProductoTerminado
    P_RptPrensado --> P_ObtenerSDTEtiquetaBobina
    P_RptPrensado --> S_SDTCarrete
    P_RptPrensado --> S_SDTCarrera
    P_RptPrensado --> S_SDTPrensadoBobina
    P_RptPrensado --> S_EtiquetaBobinaSDT
    P_RptPrensado --> S_SDTPrensadoResultado
    P_RptPrensado --> S_SDTRptPrensado
    P_RptPrensado --> S_SDTCarreteCalidad
    P_RptPrensado -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 2 -- `proc_printer_sd_rpt_extrusion` (RptExtrusion)

**9 objetos · 3 módulos tocados.**

```mermaid
flowchart LR
    DP_BobinaDP[BobinaDP DP]
    P_RptExtrusion[RptExtrusion]
    DP_DPSDTRptExtrusion[DPSDTRptExtrusion DP]
    S_SDTExtrusionResultado[SDTExtrusionResultado SDT]
    DP_DPExtrusionResultado[DPExtrusionResultado DP]
    S_SDTPrensadoResultado[SDTPrensadoResultado SDT]
    P_Debugger[Debugger]
    P_ObtenerCantidadBobinasPorExtrusion[ObtenerCantidadBobinasPorExtrusion]
    S_SDTRptExtrusion[SDTRptExtrusion SDT]
    P_RptExtrusion --> DP_BobinaDP
    P_RptExtrusion --> DP_DPSDTRptExtrusion
    P_RptExtrusion --> DP_DPExtrusionResultado
    P_RptExtrusion --> S_SDTExtrusionResultado
    P_RptExtrusion --> S_SDTPrensadoResultado
    P_RptExtrusion --> S_SDTRptExtrusion
    P_RptExtrusion --> P_Debugger
    DP_DPSDTRptExtrusion --> P_ObtenerCantidadBobinasPorExtrusion

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 3 -- `proc_printer_sd_palet_report` (PaletReport)

**8 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_PaletReportMain[PaletReportMain]
    P_PaletReportSAP[PaletReportSAP]
    P_ObtenerBarCode[ObtenerBarCode]
    S_EtiquetaPaletSDT[EtiquetaPaletSDT SDT]
    P_GuardarBarCode[GuardarBarCode]
    P_PaletReport[PaletReport]
    P_Debugger[Debugger]
    P_ObtenerSDTEtiquetaPalet[ObtenerSDTEtiquetaPalet]
    P_PaletReport --> P_PaletReportMain
    P_PaletReport --> P_PaletReportSAP
    P_PaletReportMain --> P_ObtenerSDTEtiquetaPalet
    P_PaletReportMain --> P_Debugger
    P_PaletReportMain --> P_ObtenerBarCode
    P_PaletReportMain --> S_EtiquetaPaletSDT
    P_ObtenerBarCode --> P_GuardarBarCode

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 4 -- `proc_printer_sd_carrete_report_main` (CarreteReportMain)

**7 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    S_EtiquetaCarreraSDT[EtiquetaCarreraSDT SDT]
    P_CarreteReportMain[CarreteReportMain]
    S_EtiquetaCarreteSDT[EtiquetaCarreteSDT SDT]
    P_ObtenerBarCode[ObtenerBarCode]
    P_ObtenerSDTEtiquetaCarrete[ObtenerSDTEtiquetaCarrete]
    P_GuardarBarCode[GuardarBarCode]
    P_Debugger[Debugger]
    P_CarreteReportMain --> P_ObtenerSDTEtiquetaCarrete
    P_CarreteReportMain --> P_ObtenerBarCode
    P_CarreteReportMain --> S_EtiquetaCarreteSDT
    P_CarreteReportMain --> S_EtiquetaCarreraSDT
    P_ObtenerSDTEtiquetaCarrete --> P_Debugger
    P_ObtenerBarCode --> P_GuardarBarCode

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 5 -- `proc_printer_sd_carrete_report_main_pcr` (CarreteReportMainPCR)

**7 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    S_EtiquetaCarreraSDT[EtiquetaCarreraSDT SDT]
    P_CarreteReportMainPCR[CarreteReportMainPCR]
    S_EtiquetaCarreteSDT[EtiquetaCarreteSDT SDT]
    P_ObtenerBarCode[ObtenerBarCode]
    P_ObtenerSDTEtiquetaCarrete[ObtenerSDTEtiquetaCarrete]
    P_GuardarBarCode[GuardarBarCode]
    P_Debugger[Debugger]
    P_CarreteReportMainPCR --> P_ObtenerSDTEtiquetaCarrete
    P_CarreteReportMainPCR --> P_Debugger
    P_CarreteReportMainPCR --> P_ObtenerBarCode
    P_CarreteReportMainPCR --> S_EtiquetaCarreteSDT
    P_CarreteReportMainPCR --> S_EtiquetaCarreraSDT
    P_ObtenerBarCode --> P_GuardarBarCode

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 6 -- `proc_printer_sd_palet_report_main` (PaletReportMain)

**6 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_PaletReportMain[PaletReportMain]
    P_ObtenerBarCode[ObtenerBarCode]
    S_EtiquetaPaletSDT[EtiquetaPaletSDT SDT]
    P_GuardarBarCode[GuardarBarCode]
    P_Debugger[Debugger]
    P_ObtenerSDTEtiquetaPalet[ObtenerSDTEtiquetaPalet]
    P_PaletReportMain --> P_ObtenerSDTEtiquetaPalet
    P_PaletReportMain --> P_Debugger
    P_PaletReportMain --> P_ObtenerBarCode
    P_PaletReportMain --> S_EtiquetaPaletSDT
    P_ObtenerBarCode --> P_GuardarBarCode

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 7 -- `proc_printer_sd_bobina_report_main` (BobinaReportMain)

**5 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    P_BobinaReportMain[BobinaReportMain]
    P_ObtenerSDTEtiquetaBobina[ObtenerSDTEtiquetaBobina]
    S_EtiquetaBobinaSDT[EtiquetaBobinaSDT SDT]
    P_GuardarBarCode[GuardarBarCode]
    P_ObtenerBarCode[ObtenerBarCode]
    P_BobinaReportMain --> P_ObtenerSDTEtiquetaBobina
    P_BobinaReportMain --> P_ObtenerBarCode
    P_BobinaReportMain --> S_EtiquetaBobinaSDT
    P_ObtenerBarCode --> P_GuardarBarCode

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 8 -- `proc_printer_sd_bobina_report_main_multi` (BobinaReportMainMulti)

**5 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    P_GuardarBarCode[GuardarBarCode]
    P_ObtenerSDTEtiquetaBobina[ObtenerSDTEtiquetaBobina]
    S_EtiquetaBobinaSDT[EtiquetaBobinaSDT SDT]
    P_BobinaReportMainMulti[BobinaReportMainMulti]
    P_ObtenerBarCode[ObtenerBarCode]
    P_BobinaReportMainMulti --> P_ObtenerSDTEtiquetaBobina
    P_BobinaReportMainMulti --> P_ObtenerBarCode
    P_BobinaReportMainMulti --> S_EtiquetaBobinaSDT
    P_ObtenerBarCode --> P_GuardarBarCode

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `Produccion` | 23 | `BobinaDP`, `CarreteDP`, `DPPrensadoBobinaSDT` |
| `Web` | 11 | `Debugger` |
| `DB` | 10 | `Carrete`, `PaletCarrete`, `Palet` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `DB` | 18 | `CarreraWW`, `CarreteWW`, `PaletWW` |
| `Produccion` | 7 | `vwAnaliticaCarrete`, `vwAnaliticaPrensado`, `vwAnaliticaBobina` |
| `admin` | 2 | `ImprimirBobinas` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `Palet` | **R** | `proc_printer_sd_palet_report` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 25 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: admin, DB, Produccion.
- **Patrón dominante:** módulo de procesos / utilities sin UI directa.
- **Valor diferencial:** cluster más grande es `proc_printer_sd_rpt_prensado` (16 objetos).
- **Acoplamiento externo:** 3 peers, 44 calls totales. Top: `Produccion` (23), `Web` (11), `DB` (10).
- **Riesgo de migración:** medio — revisar las aristas cross-module individualmente en Phase 3.3.

