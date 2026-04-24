# Flujo del módulo: Reportes

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/Reportes.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 77 |
| Transactions | 3 (CausaInterrupcion, ExtrusoraObservacion, PrensaObservacion) |
| WebPanels | 21 |
| Procedures | 45 |
| DataProviders | 6 |
| SDTs | 2 |
| Módulos que LLAMA | 5 (616 calls) |
| Módulos que LO LLAMAN | 3 (13 calls) |
| Procesos canónicos | 12 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `MenuReportesHC` | externo | Web.MenuByModule |
| `PrensadoInterrupEnCurso` | externo | DB.LoadAuditPrensado |
| `CarreteEnPallet` | menú | Web > Reportes HC > Descargables > Carrete_Pallet |
| `CausaInterrupcionWW` | menú | Web > Reportes HC > Observaciones > Causas Interrupción |
| `ExtrusoraObservacionWW` | menú | Web > Reportes HC > Observaciones > Extrusoras |
| `InicioReportesHC` | menú | Web > Reportes HC > Inicio |
| `PalletEnEmbarque` | menú | Web > Reportes HC > Descargables > Pallet_Embarque |
| `PrensaObservacionWW` | menú | Web > Reportes HC > Observaciones > Prensas |
| `ReporteDRR` | menú | Web > Reportes HC > Descargables > DRR |
| `vwExtrusionResultado` | menú | Web > Reportes HC > Resúmenes > Extrusión |
| `vwOrdenEtiquetado` | menú | Web > Reportes HC > Etiquetado > Órdenes |
| `vwPrensadoResultado` | menú | Web > Reportes HC > Resúmenes > Prensado |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph MENU["🚪 Entry points (menú)"]
        M1[PrensaObservacionWW]
        M2[vwExtrusionResultado]
        M3[vwPrensadoResultado]
        M4[ExtrusoraObservacionWW]
        M5[InicioReportesHC]
        M6[ReporteDRR]
        M7[CarreteEnPallet]
        M8[CausaInterrupcionWW]
        M9[vwOrdenEtiquetado]
        M10[PalletEnEmbarque]
    end

    subgraph XEN["⚙️ Entry points (externos)"]
        X1[MenuReportesHC]
        X2[PrensadoInterrupEnCurso]
    end

    subgraph MOD["📦 Reportes (77 objetos)"]
        direction TB
    DP_MenuReportesHC[MenuReportesHC DP]
    P_CausaInterrupcionWWExport[CausaInterrupcionWWExport]
    P_PrensadoInterrupEnCurso[PrensadoInterrupEnCurso]
    P_PrensaObservacionWWExport[PrensaObservacionWWExport]
    P_vwOrdenEtiquetadoExport[vwOrdenEtiquetadoExport]
    T_CausaInterrupcion((CausaInterrupcion))
    T_ExtrusoraObservacion((ExtrusoraObservacion))
    T_PrensaObservacion((PrensaObservacion))
    WP_CarreteEnPallet[CarreteEnPallet WP]
    WP_CausaInterrupcionWW[CausaInterrupcionWW WP]
    WP_ExtrusoraObservacionView[ExtrusoraObservacionView WP]
    WP_ExtrusoraObservacionWW[ExtrusoraObservacionWW WP]
    WP_InicioReportesHC[InicioReportesHC WP]
    WP_PalletEnEmbarque[PalletEnEmbarque WP]
    WP_PrensaObservacionView[PrensaObservacionView WP]
    WP_PrensaObservacionWW[PrensaObservacionWW WP]
    WP_ReporteDRR[ReporteDRR WP]
    WP_vwExtrusionResultado[vwExtrusionResultado WP]
    WP_vwOrdenEtiquetado[vwOrdenEtiquetado WP]
    WP_vwPrensadoResultado[vwPrensadoResultado WP]
        OTROS[+57 objetos internos]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>543 calls]
        E_DB[DB<br/>51 calls]
        E_WWPBaseObjects_Subscriptions[WWPBaseObjects.Subscriptions<br/>10 calls]
        E_Produccion[Produccion<br/>9 calls]
        E_WWPBaseObjects_Discussions[WWPBaseObjects.Discussions<br/>3 calls]
    end

    M1 --> WP_PrensaObservacionWW
    M2 --> WP_vwExtrusionResultado
    M3 --> WP_vwPrensadoResultado
    M4 --> WP_ExtrusoraObservacionWW
    M5 --> WP_InicioReportesHC
    M6 --> WP_ReporteDRR
    M7 --> WP_CarreteEnPallet
    M8 --> WP_CausaInterrupcionWW
    M9 --> WP_vwOrdenEtiquetado
    M10 --> WP_PalletEnEmbarque
    X1 --> DP_MenuReportesHC
    X2 --> P_PrensadoInterrupEnCurso
    WP_CausaInterrupcionWW --> P_CausaInterrupcionWWExport
    WP_CausaInterrupcionWW --> T_CausaInterrupcion
    WP_ExtrusoraObservacionWW --> T_ExtrusoraObservacion
    WP_ExtrusoraObservacionWW --> WP_ExtrusoraObservacionView
    WP_PrensaObservacionWW --> P_PrensaObservacionWWExport
    WP_PrensaObservacionWW --> T_PrensaObservacion
    WP_PrensaObservacionWW --> WP_PrensaObservacionView
    WP_vwOrdenEtiquetado --> P_vwOrdenEtiquetadoExport
    DP_MenuReportesHC --> WP_CausaInterrupcionWW
    DP_MenuReportesHC --> WP_ExtrusoraObservacionWW
    DP_MenuReportesHC --> WP_PrensaObservacionWW
    DP_MenuReportesHC --> WP_PalletEnEmbarque
    DP_MenuReportesHC --> WP_CarreteEnPallet
    DP_MenuReportesHC --> WP_InicioReportesHC
    DP_MenuReportesHC --> WP_ReporteDRR
    DP_MenuReportesHC --> WP_vwPrensadoResultado
    DP_MenuReportesHC --> WP_vwExtrusionResultado
    DP_MenuReportesHC --> WP_vwOrdenEtiquetado
    T_PrensaObservacion --> WP_PrensaObservacionView
    T_PrensaObservacion --> WP_PrensaObservacionWW
    T_ExtrusoraObservacion --> WP_ExtrusoraObservacionView
    T_ExtrusoraObservacion --> WP_ExtrusoraObservacionWW
    T_CausaInterrupcion --> WP_CausaInterrupcionWW
    P_PrensaObservacionWWExport --> T_PrensaObservacion
    P_CausaInterrupcionWWExport --> T_CausaInterrupcion
    WP_ExtrusoraObservacionView --> T_ExtrusoraObservacion
    WP_ExtrusoraObservacionView --> WP_ExtrusoraObservacionView
    WP_ExtrusoraObservacionView --> WP_ExtrusoraObservacionWW
    WP_PrensaObservacionView --> T_PrensaObservacion
    WP_PrensaObservacionView --> WP_PrensaObservacionView
    WP_PrensaObservacionView --> WP_PrensaObservacionWW
    OTROS -.-> WP_vwPrensadoResultado
    WP_vwPrensadoResultado ==> E_WWPBaseObjects
    WP_vwPrensadoResultado -.-> E_WWPBaseObjects_Subscriptions
    WP_vwPrensadoResultado ==> E_DB
    WP_CausaInterrupcionWW ==> E_WWPBaseObjects
    WP_CausaInterrupcionWW -.-> E_WWPBaseObjects_Subscriptions
    WP_ExtrusoraObservacionWW ==> E_WWPBaseObjects
    WP_ExtrusoraObservacionWW -.-> E_WWPBaseObjects_Subscriptions
    WP_PrensaObservacionWW ==> E_WWPBaseObjects
    WP_PrensaObservacionWW -.-> E_WWPBaseObjects_Subscriptions
    WP_vwExtrusionResultado ==> E_WWPBaseObjects
    WP_vwExtrusionResultado -.-> E_WWPBaseObjects_Subscriptions
    WP_vwExtrusionResultado ==> E_DB
    WP_vwOrdenEtiquetado ==> E_WWPBaseObjects
    WP_vwOrdenEtiquetado -.-> E_WWPBaseObjects_Subscriptions
    WP_vwOrdenEtiquetado ==> E_DB
    WP_CarreteEnPallet ==> E_WWPBaseObjects
    WP_CarreteEnPallet ==> E_DB
    WP_PalletEnEmbarque ==> E_WWPBaseObjects
    WP_PalletEnEmbarque -.-> E_WWPBaseObjects_Subscriptions
    WP_PalletEnEmbarque ==> E_DB
    DP_MenuReportesHC ==> E_WWPBaseObjects
    P_PrensadoInterrupEnCurso ==> E_DB
    T_PrensaObservacion -.-> E_Produccion
    T_PrensaObservacion ==> E_WWPBaseObjects
    T_ExtrusoraObservacion -.-> E_Produccion
    T_ExtrusoraObservacion ==> E_WWPBaseObjects
    T_CausaInterrupcion ==> E_WWPBaseObjects
    P_vwOrdenEtiquetadoExport ==> E_WWPBaseObjects
    P_vwOrdenEtiquetadoExport ==> E_DB
    P_PrensaObservacionWWExport ==> E_WWPBaseObjects
    P_CausaInterrupcionWWExport ==> E_WWPBaseObjects
    WP_ExtrusoraObservacionView ==> E_WWPBaseObjects
    WP_ExtrusoraObservacionView -.-> E_WWPBaseObjects_Subscriptions
    WP_ExtrusoraObservacionView -.-> E_WWPBaseObjects_Discussions
    WP_PrensaObservacionView ==> E_WWPBaseObjects
    WP_PrensaObservacionView -.-> E_WWPBaseObjects_Subscriptions
    WP_PrensaObservacionView -.-> E_WWPBaseObjects_Discussions

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class T_PrensaObservacion,T_ExtrusoraObservacion,T_CausaInterrupcion trn
    class WP_vwPrensadoResultado,WP_CausaInterrupcionWW,WP_ExtrusoraObservacionWW,WP_PrensaObservacionWW,WP_vwExtrusionResultado,WP_vwOrdenEtiquetado,WP_CarreteEnPallet,WP_PalletEnEmbarque,WP_InicioReportesHC,WP_ReporteDRR,WP_ExtrusoraObservacionView,WP_PrensaObservacionView wp
    class DP_MenuReportesHC,P_PrensadoInterrupEnCurso,P_vwOrdenEtiquetadoExport,P_PrensaObservacionWWExport,P_CausaInterrupcionWWExport proc
    class E_WWPBaseObjects,E_WWPBaseObjects_Subscriptions,E_DB,E_Produccion,E_WWPBaseObjects_Discussions ext
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

### Proceso 1 -- `proc_reportes_menu_reportes_hc` (MenuReportesHC)

**85 objetos · 4 módulos tocados.**

```mermaid
flowchart LR
    T_OrdenEtiquetado((OrdenEtiquetado))
    DP_MenuReportesHC[MenuReportesHC DP]
    T_PrensaObservacion((PrensaObservacion))
    WP_PrensaObservacionWW[PrensaObservacionWW WP]
    WP_PalletEnEmbarque[PalletEnEmbarque WP]
    WP_InicioReportesHC[InicioReportesHC WP]
    WP_ReporteDRR[ReporteDRR WP]
    T_CausaInterrupcion((CausaInterrupcion))
    WP_CarreteEnPallet[CarreteEnPallet WP]
    WP_CausaInterrupcionWW[CausaInterrupcionWW WP]
    WP_ExtrusoraObservacionWW[ExtrusoraObservacionWW WP]
    T_ExtrusionResultado((ExtrusionResultado))
    T_PrensadoResultado((PrensadoResultado))
    T_EmbarquePallet((EmbarquePallet))
    T_ExtrusoraObservacion((ExtrusoraObservacion))
    INFRA[+70 helpers WWP]
    DP_MenuReportesHC --> WP_CausaInterrupcionWW
    DP_MenuReportesHC --> WP_ExtrusoraObservacionWW
    DP_MenuReportesHC --> WP_PrensaObservacionWW
    DP_MenuReportesHC --> WP_PalletEnEmbarque
    DP_MenuReportesHC --> WP_CarreteEnPallet
    DP_MenuReportesHC --> WP_InicioReportesHC
    DP_MenuReportesHC --> WP_ReporteDRR
    WP_CausaInterrupcionWW --> T_CausaInterrupcion
    WP_ExtrusoraObservacionWW --> T_ExtrusoraObservacion
    WP_PrensaObservacionWW --> T_PrensaObservacion
    WP_PalletEnEmbarque --> T_EmbarquePallet
    DP_MenuReportesHC -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_OrdenEtiquetado,T_PrensaObservacion,T_CausaInterrupcion,T_ExtrusionResultado,T_PrensadoResultado,T_EmbarquePallet,T_ExtrusoraObservacion trn
```

### Proceso 2 -- `proc_reportes_vw_prensado_resultado` (Prensado)

**27 objetos · 4 módulos tocados.**

```mermaid
flowchart LR
    WP_PrensadoView[PrensadoView WP]
    S_SDTCarreteCalidad[SDTCarreteCalidad SDT]
    WP_PrensadoWW[PrensadoWW WP]
    DP_DPSDTRptPrensado[DPSDTRptPrensado DP]
    WP_vwPrensadoResultado[vwPrensadoResultado WP]
    DP_DPPrensadoResultado[DPPrensadoResultado DP]
    S_SDTRptPrensado[SDTRptPrensado SDT]
    S_EtiquetaBobinaSDT[EtiquetaBobinaSDT SDT]
    DP_CarreteDP[CarreteDP DP]
    P_RptPrensado[RptPrensado]
    DP_DPPrensadoBobinaSDT[DPPrensadoBobinaSDT DP]
    P_ObtenerSDTEtiquetaBobina[ObtenerSDTEtiquetaBobina]
    T_PrensadoResultado((PrensadoResultado))
    WP_ReportePrensado[ReportePrensado WP]
    DP_CarreraDP[CarreraDP DP]
    INFRA[+12 helpers WWP]
    WP_vwPrensadoResultado --> T_PrensadoResultado
    WP_vwPrensadoResultado --> WP_PrensadoView
    WP_vwPrensadoResultado --> WP_ReportePrensado
    WP_PrensadoView --> WP_PrensadoWW
    WP_PrensadoWW --> P_RptPrensado
    P_RptPrensado --> DP_CarreteDP
    P_RptPrensado --> DP_CarreraDP
    P_RptPrensado --> DP_DPSDTRptPrensado
    P_RptPrensado --> DP_DPPrensadoResultado
    P_RptPrensado --> DP_DPPrensadoBobinaSDT
    P_RptPrensado --> P_ObtenerSDTEtiquetaBobina
    P_RptPrensado --> S_EtiquetaBobinaSDT
    P_RptPrensado --> S_SDTRptPrensado
    P_RptPrensado --> S_SDTCarreteCalidad
    WP_vwPrensadoResultado -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_PrensadoResultado trn
```

### Proceso 3 -- `proc_reportes_vw_extrusion_resultado` (Extrusión)

**19 objetos · 5 módulos tocados.**

```mermaid
flowchart LR
    WP_ExtrusionView[ExtrusionView WP]
    DP_DPExtrusionResultado[DPExtrusionResultado DP]
    S_SDTExtrusionResultado[SDTExtrusionResultado SDT]
    WP_vwExtrusionResultado[vwExtrusionResultado WP]
    S_SDTPrensadoResultado[SDTPrensadoResultado SDT]
    P_Debugger[Debugger]
    WP_ExtrusionWW[ExtrusionWW WP]
    DP_DPSDTRptExtrusion[DPSDTRptExtrusion DP]
    S_SDTRptExtrusion[SDTRptExtrusion SDT]
    WP_ReporteExtrusion[ReporteExtrusion WP]
    T_ExtrusionResultado((ExtrusionResultado))
    DP_BobinaDP[BobinaDP DP]
    P_RptExtrusion[RptExtrusion]
    INFRA[+6 helpers WWP]
    WP_vwExtrusionResultado --> T_ExtrusionResultado
    WP_vwExtrusionResultado --> WP_ExtrusionView
    WP_vwExtrusionResultado --> WP_ReporteExtrusion
    WP_ExtrusionView --> WP_ExtrusionWW
    WP_ExtrusionWW --> P_RptExtrusion
    P_RptExtrusion --> DP_BobinaDP
    P_RptExtrusion --> DP_DPSDTRptExtrusion
    P_RptExtrusion --> DP_DPExtrusionResultado
    P_RptExtrusion --> S_SDTExtrusionResultado
    P_RptExtrusion --> S_SDTPrensadoResultado
    P_RptExtrusion --> S_SDTRptExtrusion
    P_RptExtrusion --> P_Debugger
    WP_vwExtrusionResultado -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_ExtrusionResultado trn
```

### Proceso 4 -- `proc_reportes_carrete_en_pallet` (Carrete_Pallet)

**16 objetos · 4 módulos tocados.**

```mermaid
flowchart LR
    WP_CarreteEnPallet[CarreteEnPallet WP]
    WP_PaletWW[PaletWW WP]
    WP_PaletView[PaletView WP]
    P_PaletReportMain[PaletReportMain]
    P_ObtenerBarCode[ObtenerBarCode]
    S_EtiquetaPaletSDT[EtiquetaPaletSDT SDT]
    P_PaletReport[PaletReport]
    P_Debugger[Debugger]
    P_PaletReportSAP[PaletReportSAP]
    P_ObtenerSDTEtiquetaPalet[ObtenerSDTEtiquetaPalet]
    INFRA[+6 helpers WWP]
    WP_CarreteEnPallet --> WP_PaletView
    WP_PaletView --> WP_PaletWW
    WP_PaletWW --> P_PaletReportMain
    WP_PaletWW --> P_PaletReport
    P_PaletReportMain --> P_ObtenerSDTEtiquetaPalet
    P_PaletReportMain --> P_Debugger
    P_PaletReportMain --> P_ObtenerBarCode
    P_PaletReportMain --> S_EtiquetaPaletSDT
    P_PaletReport --> P_PaletReportSAP
    WP_CarreteEnPallet -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 5 -- `proc_reportes_extrusora_observacion_ww` (Extrusoras)

**13 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_ExtrusoraObservacionWW[ExtrusoraObservacionWW WP]
    DP_ExtrusoraDP[ExtrusoraDP DP]
    T_ExtrusoraObservacion((ExtrusoraObservacion))
    DP_CausaExtrusoraDP[CausaExtrusoraDP DP]
    S_SDTCausaInterrupcion[SDTCausaInterrupcion SDT]
    WP_ExtrusoraObservacionView[ExtrusoraObservacionView WP]
    S_SDTTurno[SDTTurno SDT]
    S_SDTExtrusora[SDTExtrusora SDT]
    DP_TurnoDP[TurnoDP DP]
    INFRA[+4 helpers WWP]
    WP_ExtrusoraObservacionWW --> T_ExtrusoraObservacion
    WP_ExtrusoraObservacionWW --> WP_ExtrusoraObservacionView
    T_ExtrusoraObservacion --> DP_TurnoDP
    T_ExtrusoraObservacion --> DP_ExtrusoraDP
    T_ExtrusoraObservacion --> DP_CausaExtrusoraDP
    DP_TurnoDP --> S_SDTTurno
    DP_ExtrusoraDP --> S_SDTExtrusora
    DP_CausaExtrusoraDP --> S_SDTCausaInterrupcion
    WP_ExtrusoraObservacionWW -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_ExtrusoraObservacion trn
```

### Proceso 6 -- `proc_reportes_prensa_observacion_ww` (Prensas)

**13 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_PrensaObservacionWW[PrensaObservacionWW WP]
    WP_PrensaObservacionView[PrensaObservacionView WP]
    S_SDTPrensa[SDTPrensa SDT]
    DP_CausaPrensaDP[CausaPrensaDP DP]
    S_SDTTurno[SDTTurno SDT]
    S_SDTCausaInterrupcion[SDTCausaInterrupcion SDT]
    DP_PrensaDP[PrensaDP DP]
    T_PrensaObservacion((PrensaObservacion))
    DP_TurnoDP[TurnoDP DP]
    INFRA[+4 helpers WWP]
    WP_PrensaObservacionWW --> T_PrensaObservacion
    WP_PrensaObservacionWW --> WP_PrensaObservacionView
    T_PrensaObservacion --> DP_TurnoDP
    T_PrensaObservacion --> DP_PrensaDP
    T_PrensaObservacion --> DP_CausaPrensaDP
    DP_TurnoDP --> S_SDTTurno
    DP_PrensaDP --> S_SDTPrensa
    DP_CausaPrensaDP --> S_SDTCausaInterrupcion
    WP_PrensaObservacionWW -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_PrensaObservacion trn
```

### Proceso 7 -- `proc_reportes_pallet_en_embarque` (Pallet_Embarque)

**11 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_EmbarquePalletView[EmbarquePalletView WP]
    WP_PalletEnEmbarque[PalletEnEmbarque WP]
    T_EmbarquePallet((EmbarquePallet))
    WP_EmbarquePalletWW[EmbarquePalletWW WP]
    INFRA[+7 helpers WWP]
    WP_PalletEnEmbarque --> T_EmbarquePallet
    T_EmbarquePallet --> WP_EmbarquePalletView
    T_EmbarquePallet --> WP_EmbarquePalletWW
    WP_PalletEnEmbarque -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_EmbarquePallet trn
```

### Proceso 8 -- `proc_reportes_causa_interrupcion_ww` (Causas Interrupción)

**7 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    WP_CausaInterrupcionWW[CausaInterrupcionWW WP]
    T_CausaInterrupcion((CausaInterrupcion))
    WP_CausaInterrupcionView[CausaInterrupcionView WP]
    INFRA[+4 helpers WWP]
    WP_CausaInterrupcionWW --> T_CausaInterrupcion
    WP_CausaInterrupcionWW --> WP_CausaInterrupcionView
    WP_CausaInterrupcionWW -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_CausaInterrupcion trn
```

### Proceso 9 -- `proc_reportes_prensado_interrup_en_curso` (PrensadoInterrupEnCurso)

**7 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    T_PrensadoInterrupcion((PrensadoInterrupcion))
    P_PrensadoInterrupEnCurso[PrensadoInterrupEnCurso]
    WP_PrensadoInterrupcionWW[PrensadoInterrupcionWW WP]
    WP_PrensadoInterrupcionView[PrensadoInterrupcionView WP]
    INFRA[+3 helpers WWP]
    P_PrensadoInterrupEnCurso --> T_PrensadoInterrupcion
    T_PrensadoInterrupcion --> WP_PrensadoInterrupcionView
    T_PrensadoInterrupcion --> WP_PrensadoInterrupcionWW
    P_PrensadoInterrupEnCurso -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_PrensadoInterrupcion trn
```

### Proceso 10 -- `proc_reportes_vw_orden_etiquetado` (Órdenes)

**6 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_EtiquetadoFormato[EtiquetadoFormato WP]
    T_OrdenEtiquetado((OrdenEtiquetado))
    WP_vwOrdenEtiquetado[vwOrdenEtiquetado WP]
    INFRA[+3 helpers WWP]
    WP_vwOrdenEtiquetado --> T_OrdenEtiquetado
    WP_vwOrdenEtiquetado --> WP_EtiquetadoFormato
    WP_vwOrdenEtiquetado -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_OrdenEtiquetado trn
```

### Proceso 11 -- `proc_reportes_inicio_reportes_hc` (Inicio)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    WP_InicioReportesHC[InicioReportesHC WP]

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 12 -- `proc_reportes_reporte_drr` (DRR)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    WP_ReporteDRR[ReporteDRR WP]

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 543 | `LoadWWPContext`, `LoadGridState`, `WWPContext` |
| `DB` | 51 | `Extrusion`, `ExtrusionInterrupcion`, `OrdenEtiquetado` |
| `WWPBaseObjects.Subscriptions` | 10 | `WWP_HasSubscriptionsToDisplay` |
| `Produccion` | 9 | `JornadaLaboral`, `TurnoDP`, `ExtrusoraDP` |
| `WWPBaseObjects.Discussions` | 3 | `WWP_HasDiscussionMessages` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `WWPBaseObjects` | 8 | `ListWWPPrograms` |
| `Web` | 3 | `MenuByModule`, `Modules` |
| `DB` | 2 | `LoadAuditPrensado` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `CausaInterrupcion` | **W** | `proc_reportes_menu_reportes_hc`, `proc_reportes_causa_interrupcion_ww` |
| `EmbarquePallet` | **W** | `proc_reportes_menu_reportes_hc`, `proc_reportes_pallet_en_embarque` |
| `Extrusion` | **R** | `proc_reportes_menu_reportes_hc`, `proc_reportes_vw_extrusion_resultado` |
| `ExtrusionResultado` | **W** | `proc_reportes_menu_reportes_hc`, `proc_reportes_vw_extrusion_resultado` |
| `ExtrusoraObservacion` | **W** | `proc_reportes_menu_reportes_hc`, `proc_reportes_extrusora_observacion_ww` |
| `OrdenEtiquetado` | **W** | `proc_reportes_menu_reportes_hc`, `proc_reportes_vw_orden_etiquetado` |
| `Palet` | **R** | `proc_reportes_menu_reportes_hc`, `proc_reportes_carrete_en_pallet` |
| `Prensado` | **R** | `proc_reportes_menu_reportes_hc`, `proc_reportes_vw_prensado_resultado` |
| `PrensadoInterrupcion` | **W** | `proc_reportes_prensado_interrup_en_curso` |
| `PrensadoResultado` | **W** | `proc_reportes_menu_reportes_hc`, `proc_reportes_vw_prensado_resultado` |
| `PrensaObservacion` | **W** | `proc_reportes_menu_reportes_hc`, `proc_reportes_prensa_observacion_ww` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 77 objetos parseados. Entidades centrales por referencias entrantes: `PrensaObservacion`, `ExtrusoraObservacion`, `CausaInterrupcion`. Entry points desde el menú: `PrensaObservacionWW`, `vwExtrusionResultado`, `vwPrensadoResultado`.
- **Patrón dominante:** WWP CRUD standard (Trn + WW/View + audit helpers + export/filter helpers generados por el pattern).
- **Valor diferencial:** cluster más grande es `proc_reportes_menu_reportes_hc` (85 objetos).
- **Acoplamiento externo:** 5 peers, 616 calls totales. Top: `WWPBaseObjects` (543), `DB` (51), `WWPBaseObjects.Subscriptions` (10).
- **Riesgo de migración:** alto — dependencia intensa de WWPBaseObjects (543 calls); requiere reimplementar el pattern WWP en el target o tolerar pérdida de audit/filter/export.

