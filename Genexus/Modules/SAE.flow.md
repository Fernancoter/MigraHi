# Flujo del módulo: SAE

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/SAE.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 26 |
| Transactions | 0 |
| WebPanels | 17 |
| Procedures | 6 |
| DataProviders | 1 |
| SDTs | 2 |
| Módulos que LLAMA | 6 (52 calls) |
| Módulos que LO LLAMAN | 4 (15 calls) |
| Procesos canónicos | 9 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `InicioCatalogosSAE` | externo | Web.Modules |
| `InicioReportes` | externo | Web.Modules |
| `NotificarFechaEmbarque` | externo | Embarques.InicioEmbarques |
| `ProductDP` | externo | Produccion.gestionarProducto |
| `FTBYTD` | menú | Web > Reportes > FTB YTD |
| `Orders` | menú | Web > Reportes > Report Orders |
| `OrdersMoney` | menú | Web > Reportes > Report Orders Price |
| `outlookww` | menú | Web > Reportes > Outlook |
| `priceww` | menú | Web > Reportes > Price |
| `RealtimeInventory` | menú | Web > Reportes > Realtime Inventory |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph MENU["🚪 Entry points (menú)"]
        M1[Orders]
        M2[FTBYTD]
        M3[RealtimeInventory]
        M4[OrdersMoney]
        M5[outlookww]
        M6[priceww]
    end

    subgraph XEN["⚙️ Entry points (externos)"]
        X1[ProductDP]
        X2[NotificarFechaEmbarque]
        X3[InicioCatalogosSAE]
        X4[InicioReportes]
    end

    subgraph MOD["📦 SAE (26 objetos)"]
        direction TB
    DP_ProductDP[ProductDP DP]
    P_Actualizando[Actualizando]
    P_NotificarFechaEmbarque[NotificarFechaEmbarque]
    P_SyncSAE[SyncSAE]
    S_SDTBudget[SDTBudget SDT]
    WP_EditBudget[EditBudget WP]
    WP_FTBYTD[FTBYTD WP]
    WP_InicioCatalogosSAE[InicioCatalogosSAE WP]
    WP_InicioReportes[InicioReportes WP]
    WP_ITWOutlook[ITWOutlook WP]
    WP_OrderPrompt[OrderPrompt WP]
    WP_Orders[Orders WP]
    WP_OrdersMoney[OrdersMoney WP]
    WP_outlookww[outlookww WP]
    WP_priceww[priceww WP]
    WP_RealtimeInventory[RealtimeInventory WP]
    WP_ReportITW[ReportITW WP]
    WP_UnitPlan[UnitPlan WP]
    WP_UnitPlan2[UnitPlan2 WP]
    WP_UpdateFTB[UpdateFTB WP]
        OTROS[+6 objetos internos]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_Informes[Informes<br/>20 calls]
        E_WWPBaseObjects[WWPBaseObjects<br/>10 calls]
        E_GeneXusReporting[GeneXusReporting<br/>8 calls]
        E_DB[DB<br/>8 calls]
        E_Produccion[Produccion<br/>4 calls]
        E_Embarques[Embarques<br/>2 calls]
    end

    M1 --> WP_Orders
    M2 --> WP_FTBYTD
    M3 --> WP_RealtimeInventory
    M4 --> WP_OrdersMoney
    M5 --> WP_outlookww
    M6 --> WP_priceww
    X1 --> DP_ProductDP
    X2 --> P_NotificarFechaEmbarque
    X3 --> WP_InicioCatalogosSAE
    X4 --> WP_InicioReportes
    WP_priceww --> S_SDTBudget
    WP_outlookww --> S_SDTBudget
    WP_InicioReportes --> P_SyncSAE
    WP_InicioCatalogosSAE --> P_SyncSAE
    P_SyncSAE --> P_Actualizando
    WP_EditBudget --> S_SDTBudget
    OTROS -.-> P_NotificarFechaEmbarque
    P_NotificarFechaEmbarque -.-> E_Embarques
    P_NotificarFechaEmbarque -.-> E_DB
    WP_OrdersMoney -.-> E_Informes
    WP_RealtimeInventory -.-> E_Informes
    WP_Orders -.-> E_Informes
    WP_FTBYTD -.-> E_Informes
    WP_priceww -.-> E_WWPBaseObjects
    WP_priceww -.-> E_DB
    WP_outlookww -.-> E_DB
    DP_ProductDP -.-> E_WWPBaseObjects
    WP_OrderPrompt -.-> E_WWPBaseObjects
    WP_OrderPrompt -.-> E_DB
    WP_ReportITW -.-> E_GeneXusReporting
    WP_UnitPlan2 -.-> E_Informes
    WP_UpdateFTB -.-> E_DB
    WP_EditBudget -.-> E_DB
    WP_UnitPlan -.-> E_Produccion
    P_Actualizando -.-> E_DB
    WP_ITWOutlook -.-> E_Produccion

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class WP_OrdersMoney,WP_RealtimeInventory,WP_Orders,WP_FTBYTD,WP_priceww,WP_outlookww,WP_InicioReportes,WP_InicioCatalogosSAE,WP_OrderPrompt,WP_ReportITW,WP_UnitPlan2,WP_UpdateFTB,WP_EditBudget,WP_UnitPlan,WP_ITWOutlook wp
    class P_NotificarFechaEmbarque,DP_ProductDP,P_SyncSAE,S_SDTBudget,P_Actualizando proc
    class E_WWPBaseObjects,E_DB,E_Informes,E_Produccion,E_Embarques,E_GeneXusReporting ext
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

### Proceso 1 -- `proc_sae_notificar_fecha_embarque` (NotificarFechaEmbarque)

**68 objetos · 10 módulos tocados.**

```mermaid
flowchart LR
    T_WWP_Entity((WWP_Entity))
    T_WWP_WebClient((WWP_WebClient))
    P_NotificarFechaEmbarque[NotificarFechaEmbarque]
    T_WWP_Subscription((WWP_Subscription))
    T_WWP_Notification((WWP_Notification))
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    T_WWP_Mail((WWP_Mail))
    T_Embarque((Embarque))
    T_Budget((Budget))
    T_WWP_SMS((WWP_SMS))
    T_WWP_UserExtended((WWP_UserExtended))
    T_WWP_WebNotification((WWP_WebNotification))
    T_Order((Order))
    T_WWP_MailTemplate((WWP_MailTemplate))
    T_EmbarqueDetalle((EmbarqueDetalle))
    T_Remission((Remission))
    INFRA[+52 helpers WWP]
    P_NotificarFechaEmbarque --> T_Budget
    P_NotificarFechaEmbarque --> T_Remission
    P_NotificarFechaEmbarque -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Entity,T_WWP_WebClient,T_WWP_Subscription,T_WWP_Notification,T_WWP_NotificationDefinition,T_WWP_Mail,T_Embarque,T_Budget,T_WWP_SMS,T_WWP_UserExtended,T_WWP_WebNotification,T_Order,T_WWP_MailTemplate,T_EmbarqueDetalle,T_Remission trn
```

### Proceso 2 -- `proc_sae_priceww` (Price)

**12 objetos · 3 módulos tocados.**

```mermaid
flowchart LR
    P_DVMessageGetAdvancedNotificationMsg[DVMessageGetAdvancedNotificationMsg]
    WP_EditBudget[EditBudget WP]
    WP_BudgetView[BudgetView WP]
    WP_priceww[priceww WP]
    T_Budget((Budget))
    WP_BudgetWW[BudgetWW WP]
    S_SDTBudget[SDTBudget SDT]
    P_DVMessageGetBasicNotificationMsg[DVMessageGetBasicNotificationMsg]
    INFRA[+4 helpers WWP]
    WP_priceww --> P_DVMessageGetBasicNotificationMsg
    WP_priceww --> S_SDTBudget
    WP_priceww --> T_Budget
    P_DVMessageGetBasicNotificationMsg --> P_DVMessageGetAdvancedNotificationMsg
    T_Budget --> WP_BudgetView
    T_Budget --> WP_EditBudget
    T_Budget --> WP_BudgetWW
    WP_priceww -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Budget trn
```

### Proceso 3 -- `proc_sae_inicio_catalogos_sae` (InicioCatalogosSAE)

**8 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_BudgetView[BudgetView WP]
    P_SyncSAE[SyncSAE]
    P_Actualizando[Actualizando]
    WP_BudgetWW[BudgetWW WP]
    T_Budget((Budget))
    WP_InicioCatalogosSAE[InicioCatalogosSAE WP]
    WP_EditBudget[EditBudget WP]
    INFRA[+1 helpers WWP]
    WP_InicioCatalogosSAE --> P_SyncSAE
    P_SyncSAE --> P_Actualizando
    P_Actualizando --> T_Budget
    T_Budget --> WP_BudgetView
    T_Budget --> WP_EditBudget
    T_Budget --> WP_BudgetWW
    WP_InicioCatalogosSAE -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Budget trn
```

### Proceso 4 -- `proc_sae_inicio_reportes` (InicioReportes)

**8 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_BudgetView[BudgetView WP]
    WP_InicioReportes[InicioReportes WP]
    P_SyncSAE[SyncSAE]
    P_Actualizando[Actualizando]
    WP_BudgetWW[BudgetWW WP]
    T_Budget((Budget))
    WP_EditBudget[EditBudget WP]
    INFRA[+1 helpers WWP]
    WP_InicioReportes --> P_SyncSAE
    P_SyncSAE --> P_Actualizando
    P_Actualizando --> T_Budget
    T_Budget --> WP_BudgetView
    T_Budget --> WP_EditBudget
    T_Budget --> WP_BudgetWW
    WP_InicioReportes -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Budget trn
```

### Proceso 5 -- `proc_sae_ftbytd` (FTB YTD)

**4 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_InformesTelerik[InformesTelerik]
    S_SDTInformeFilter[SDTInformeFilter SDT]
    WP_FTBYTD[FTBYTD WP]
    S_SDTTelerik[SDTTelerik SDT]
    WP_FTBYTD --> P_InformesTelerik
    WP_FTBYTD --> S_SDTTelerik
    WP_FTBYTD --> S_SDTInformeFilter

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 6 -- `proc_sae_orders` (Report Orders)

**4 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_InformesTelerik[InformesTelerik]
    S_SDTInformeFilter[SDTInformeFilter SDT]
    WP_Orders[Orders WP]
    S_SDTTelerik[SDTTelerik SDT]
    WP_Orders --> P_InformesTelerik
    WP_Orders --> S_SDTTelerik
    WP_Orders --> S_SDTInformeFilter

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 7 -- `proc_sae_orders_money` (Report Orders Price)

**4 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_InformesTelerik[InformesTelerik]
    S_SDTInformeFilter[SDTInformeFilter SDT]
    WP_OrdersMoney[OrdersMoney WP]
    S_SDTTelerik[SDTTelerik SDT]
    WP_OrdersMoney --> P_InformesTelerik
    WP_OrdersMoney --> S_SDTTelerik
    WP_OrdersMoney --> S_SDTInformeFilter

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 8 -- `proc_sae_realtime_inventory` (Realtime Inventory)

**4 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_InformesTelerik[InformesTelerik]
    S_SDTInformeFilter[SDTInformeFilter SDT]
    WP_RealtimeInventory[RealtimeInventory WP]
    S_SDTTelerik[SDTTelerik SDT]
    WP_RealtimeInventory --> P_InformesTelerik
    WP_RealtimeInventory --> S_SDTTelerik
    WP_RealtimeInventory --> S_SDTInformeFilter

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 9 -- `proc_sae_product_dp` (ProductDP)

**2 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    DP_ProductDP[ProductDP DP]
    S_DVB_SDTComboData[DVB_SDTComboData SDT]
    DP_ProductDP --> S_DVB_SDTComboData

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `Informes` | 20 | `InformesTelerik`, `SDTTelerik`, `SDTInformeFilter` |
| `WWPBaseObjects` | 10 | `LoadWWPContext`, `DVB_SDTDropDownOptionsTitleSettingsIcons`, `DVB_SDTDropDownOptionsData` |
| `GeneXusReporting` | 8 | `QueryViewerParameters`, `QueryViewerDragAndDropData`, `QueryViewerElements` |
| `DB` | 8 | `Budget`, `Order`, `Remission` |
| `Produccion` | 4 | `ObtenerConfiguracion` |
| `Embarques` | 2 | `InicializarEmbarque` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `Web` | 8 | `MenuModuleInformesSAE`, `MenuModuleCatalogosSAE`, `Modules` |
| `DB` | 4 | `Budget`, `FTB` |
| `Embarques` | 2 | `InicioEmbarques` |
| `Produccion` | 1 | `gestionarProducto` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `Budget` | **W** | `proc_sae_notificar_fecha_embarque`, `proc_sae_inicio_catalogos_sae`, `proc_sae_inicio_reportes` _(+1)_ |
| `Embarque` | **W** | `proc_sae_notificar_fecha_embarque` |
| `EmbarqueDetalle` | **W** | `proc_sae_notificar_fecha_embarque` |
| `Order` | **W** | `proc_sae_notificar_fecha_embarque` |
| `Remission` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_Entity` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_Mail` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_MailTemplate` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_Notification` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_NotificationDefinition` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_SMS` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_Subscription` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_UserExtended` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_WebClient` | **W** | `proc_sae_notificar_fecha_embarque` |
| `WWP_WebNotification` | **W** | `proc_sae_notificar_fecha_embarque` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 26 objetos parseados. Entry points desde el menú: `Orders`, `FTBYTD`, `RealtimeInventory`.
- **Patrón dominante:** módulo funcional / dashboard sin entidades propias; consume Trns de `DB`.
- **Valor diferencial:** cluster más grande es `proc_sae_notificar_fecha_embarque` (68 objetos).
- **Acoplamiento externo:** 6 peers, 52 calls totales. Top: `Informes` (20), `WWPBaseObjects` (10), `GeneXusReporting` (8).
- **Riesgo de migración:** medio — revisar las aristas cross-module individualmente en Phase 3.3.

