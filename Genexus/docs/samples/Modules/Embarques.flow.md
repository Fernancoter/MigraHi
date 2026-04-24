# Flujo del módulo: Embarques

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/Embarques.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 49 |
| Transactions | 0 |
| WebPanels | 11 |
| Procedures | 35 |
| DataProviders | 2 |
| SDTs | 1 |
| Módulos que LLAMA | 9 (433 calls) |
| Módulos que LO LLAMAN | 5 (19 calls) |
| Procesos canónicos | 8 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `EmbarqueWP` | externo | DB.Embarque |
| `NotificarImpresion` | externo | Root.ProcedureNotificarReimpresionEtiquetaPalet |
| `OrdenesWW` | externo | WWPBaseObjects.ListWWPPrograms |
| `InicioEmbarques` | menú | Web > Embarques > Inicio |
| `ListadoEmbarques` | menú | Web > Embarques > Embarques |
| `ListadoOrdenes` | menú | Web > Embarques > Pedidos |
| `ListadoRemisiones` | menú | Web > Embarques > Remisiones |
| `ProductsWW` | menú | Web > Reportes > Product |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph MENU["🚪 Entry points (menú)"]
        M1[ListadoEmbarques]
        M2[ListadoOrdenes]
        M3[ListadoRemisiones]
        M4[InicioEmbarques]
        M5[ProductsWW]
    end

    subgraph XEN["⚙️ Entry points (externos)"]
        X1[EmbarqueWP]
        X2[NotificarImpresion]
        X3[OrdenesWW]
    end

    subgraph MOD["📦 Embarques (49 objetos)"]
        direction TB
    P_CrearEmbarque[CrearEmbarque]
    P_InicializarEmbarque[InicializarEmbarque]
    P_ListadoEmbarquesExport[ListadoEmbarquesExport]
    P_ListadoOrdenesExport[ListadoOrdenesExport]
    P_ListadoOrdenesExportReport[ListadoOrdenesExportReport]
    P_ListadoRemisionesExport[ListadoRemisionesExport]
    P_ListadoRemisionesExportReport[ListadoRemisionesExportReport]
    P_NotificarImpresion[NotificarImpresion]
    P_OrdenesWWExport[OrdenesWWExport]
    P_ProductsWWExport[ProductsWWExport]
    P_RemissionsWWExport[RemissionsWWExport]
    WP_CargarEmbarque[CargarEmbarque WP]
    WP_EmbarqueWP[EmbarqueWP WP]
    WP_InicioEmbarques[InicioEmbarques WP]
    WP_ListadoEmbarques[ListadoEmbarques WP]
    WP_ListadoOrdenes[ListadoOrdenes WP]
    WP_ListadoRemisiones[ListadoRemisiones WP]
    WP_OrdenesWW[OrdenesWW WP]
    WP_ProductsWW[ProductsWW WP]
    WP_RemissionsWW[RemissionsWW WP]
        OTROS[+29 objetos internos]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>340 calls]
        E_DB[DB<br/>53 calls]
        E_Informes[Informes<br/>9 calls]
        E_Produccion[Produccion<br/>8 calls]
        E_GeneXusReporting[GeneXusReporting<br/>8 calls]
        E_WWPBaseObjects_Mail[WWPBaseObjects.Mail<br/>6 calls]
        E_WWPBaseObjects_Subscriptions[WWPBaseObjects.Subscriptions<br/>6 calls]
        E_SAE[SAE<br/>2 calls]
        E_WWPBaseObjects_Notifications_Common[WWPBaseObjects.Notifications.Common<br/>1 calls]
    end

    M1 --> WP_ListadoEmbarques
    M2 --> WP_ListadoOrdenes
    M3 --> WP_ListadoRemisiones
    M4 --> WP_InicioEmbarques
    M5 --> WP_ProductsWW
    X1 --> WP_EmbarqueWP
    X2 --> P_NotificarImpresion
    X3 --> WP_OrdenesWW
    WP_ListadoEmbarques --> P_ListadoEmbarquesExport
    WP_ListadoEmbarques --> WP_CargarEmbarque
    WP_ListadoEmbarques --> WP_EmbarqueWP
    WP_ListadoRemisiones --> P_CrearEmbarque
    WP_ListadoRemisiones --> P_ListadoRemisionesExport
    WP_ListadoRemisiones --> P_ListadoRemisionesExportReport
    WP_ProductsWW --> P_ProductsWWExport
    WP_ListadoOrdenes --> P_ListadoOrdenesExport
    WP_ListadoOrdenes --> P_ListadoOrdenesExportReport
    WP_OrdenesWW --> P_OrdenesWWExport
    WP_EmbarqueWP --> WP_ListadoEmbarques
    WP_RemissionsWW --> P_CrearEmbarque
    WP_RemissionsWW --> P_RemissionsWWExport
    P_InicializarEmbarque --> WP_EmbarqueWP
    P_CrearEmbarque --> WP_EmbarqueWP
    WP_CargarEmbarque --> WP_ListadoEmbarques
    OTROS -.-> WP_ListadoEmbarques
    WP_ListadoEmbarques ==> E_WWPBaseObjects
    WP_ListadoEmbarques -.-> E_WWPBaseObjects_Subscriptions
    WP_ListadoEmbarques ==> E_DB
    WP_ListadoRemisiones ==> E_WWPBaseObjects
    WP_ListadoRemisiones -.-> E_WWPBaseObjects_Subscriptions
    WP_ListadoRemisiones ==> E_DB
    WP_ProductsWW ==> E_WWPBaseObjects
    WP_ProductsWW -.-> E_WWPBaseObjects_Subscriptions
    WP_ProductsWW ==> E_DB
    WP_ListadoOrdenes ==> E_WWPBaseObjects
    WP_ListadoOrdenes -.-> E_WWPBaseObjects_Subscriptions
    WP_ListadoOrdenes ==> E_DB
    WP_OrdenesWW ==> E_WWPBaseObjects
    WP_OrdenesWW -.-> E_WWPBaseObjects_Subscriptions
    WP_OrdenesWW ==> E_DB
    WP_InicioEmbarques -.-> E_SAE
    WP_InicioEmbarques -.-> E_GeneXusReporting
    WP_EmbarqueWP ==> E_WWPBaseObjects
    WP_EmbarqueWP ==> E_DB
    P_NotificarImpresion ==> E_WWPBaseObjects
    P_NotificarImpresion -.-> E_WWPBaseObjects_Mail
    P_NotificarImpresion -.-> E_Produccion
    WP_RemissionsWW ==> E_WWPBaseObjects
    WP_RemissionsWW -.-> E_WWPBaseObjects_Subscriptions
    WP_RemissionsWW ==> E_DB
    P_InicializarEmbarque -.-> E_WWPBaseObjects_Notifications_Common
    P_InicializarEmbarque -.-> E_Informes
    P_InicializarEmbarque ==> E_DB
    P_CrearEmbarque -.-> E_Informes
    P_CrearEmbarque ==> E_DB
    P_ProductsWWExport ==> E_WWPBaseObjects
    P_ProductsWWExport ==> E_DB
    P_ListadoRemisionesExport ==> E_WWPBaseObjects
    P_ListadoRemisionesExport ==> E_DB
    P_ListadoEmbarquesExport ==> E_WWPBaseObjects
    P_ListadoEmbarquesExport ==> E_DB
    P_ListadoOrdenesExport ==> E_WWPBaseObjects
    P_ListadoOrdenesExport ==> E_DB
    P_RemissionsWWExport ==> E_WWPBaseObjects
    P_RemissionsWWExport ==> E_DB
    P_OrdenesWWExport ==> E_WWPBaseObjects
    P_OrdenesWWExport ==> E_DB
    WP_CargarEmbarque ==> E_WWPBaseObjects
    WP_CargarEmbarque ==> E_DB
    P_ListadoOrdenesExportReport ==> E_WWPBaseObjects
    P_ListadoOrdenesExportReport ==> E_DB
    P_ListadoRemisionesExportReport ==> E_WWPBaseObjects
    P_ListadoRemisionesExportReport ==> E_DB

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class WP_ListadoEmbarques,WP_ListadoRemisiones,WP_ProductsWW,WP_ListadoOrdenes,WP_OrdenesWW,WP_InicioEmbarques,WP_EmbarqueWP,WP_RemissionsWW,WP_CargarEmbarque wp
    class P_NotificarImpresion,P_InicializarEmbarque,P_CrearEmbarque,P_ProductsWWExport,P_ListadoRemisionesExport,P_ListadoEmbarquesExport,P_ListadoOrdenesExport,P_RemissionsWWExport,P_OrdenesWWExport,P_ListadoOrdenesExportReport,P_ListadoRemisionesExportReport proc
    class E_WWPBaseObjects_Notifications_Common,E_WWPBaseObjects,E_SAE,E_WWPBaseObjects_Subscriptions,E_DB,E_Informes,E_WWPBaseObjects_Mail,E_Produccion,E_GeneXusReporting ext
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

### Proceso 1 -- `proc_embarques_embarque_wp` (EmbarqueWP)

**62 objetos · 10 módulos tocados.**

```mermaid
flowchart LR
    WP_EmbarqueWP[EmbarqueWP WP]
    T_WWP_Entity((WWP_Entity))
    T_EmbarquePallet((EmbarquePallet))
    T_WWP_WebClient((WWP_WebClient))
    T_WWP_Subscription((WWP_Subscription))
    T_WWP_Notification((WWP_Notification))
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    T_Configuracion((Configuracion))
    T_WWP_Mail((WWP_Mail))
    T_Embarque((Embarque))
    T_WWP_SMS((WWP_SMS))
    T_WWP_UserExtended((WWP_UserExtended))
    T_WWP_WebNotification((WWP_WebNotification))
    T_WWP_MailTemplate((WWP_MailTemplate))
    T_EmbarqueDetalle((EmbarqueDetalle))
    INFRA[+47 helpers WWP]
    WP_EmbarqueWP --> T_Embarque
    WP_EmbarqueWP -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Entity,T_EmbarquePallet,T_WWP_WebClient,T_WWP_Subscription,T_WWP_Notification,T_WWP_NotificationDefinition,T_Configuracion,T_WWP_Mail,T_Embarque,T_WWP_SMS,T_WWP_UserExtended,T_WWP_WebNotification,T_WWP_MailTemplate,T_EmbarqueDetalle trn
```

### Proceso 2 -- `proc_embarques_listado_embarques` (Embarques)

**57 objetos · 9 módulos tocados.**

```mermaid
flowchart LR
    P_ComenzarCargaDeEmbarque[ComenzarCargaDeEmbarque]
    WP_EmbarqueWP[EmbarqueWP WP]
    WP_ListadoEmbarques[ListadoEmbarques WP]
    T_EmbarquePallet((EmbarquePallet))
    WP_EmbarqueReporte[EmbarqueReporte WP]
    T_WWP_Subscription((WWP_Subscription))
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    T_Configuracion((Configuracion))
    T_WWP_Mail((WWP_Mail))
    T_Embarque((Embarque))
    WP_EmbarqueFormato[EmbarqueFormato WP]
    WP_EmbarqueView[EmbarqueView WP]
    T_WWP_MailTemplate((WWP_MailTemplate))
    WP_CargarEmbarque[CargarEmbarque WP]
    T_EmbarqueDetalle((EmbarqueDetalle))
    INFRA[+42 helpers WWP]
    WP_ListadoEmbarques --> P_ComenzarCargaDeEmbarque
    WP_ListadoEmbarques --> T_EmbarqueDetalle
    WP_ListadoEmbarques --> WP_CargarEmbarque
    WP_ListadoEmbarques --> WP_EmbarqueFormato
    WP_ListadoEmbarques --> WP_EmbarqueWP
    WP_ListadoEmbarques --> WP_EmbarqueReporte
    WP_ListadoEmbarques --> WP_EmbarqueView
    P_ComenzarCargaDeEmbarque --> T_Embarque
    WP_CargarEmbarque --> T_EmbarquePallet
    WP_ListadoEmbarques -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_EmbarquePallet,T_WWP_Subscription,T_WWP_NotificationDefinition,T_Configuracion,T_WWP_Mail,T_Embarque,T_WWP_MailTemplate,T_EmbarqueDetalle trn
```

### Proceso 3 -- `proc_embarques_inicio_embarques` (Inicio)

**49 objetos · 8 módulos tocados.**

```mermaid
flowchart LR
    S_QueryViewerDragAndDropData[QueryViewerDragAndDropData SDT]
    S_QueryViewerItemClickData[QueryViewerItemClickData SDT]
    S_QueryViewerFilterChangedData[QueryViewerFilterChangedData SDT]
    T_WWP_Subscription((WWP_Subscription))
    T_Order((Order))
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    S_QueryViewerItemDoubleClickData[QueryViewerItemDoubleClickData SDT]
    T_Embarque((Embarque))
    WP_InicioEmbarques[InicioEmbarques WP]
    T_Budget((Budget))
    S_QueryViewerItemCollapseData[QueryViewerItemCollapseData SDT]
    P_SyncSAE[SyncSAE]
    S_QueryViewerElements[QueryViewerElements SDT]
    T_EmbarqueDetalle((EmbarqueDetalle))
    T_Remission((Remission))
    INFRA[+34 helpers WWP]
    WP_InicioEmbarques --> P_SyncSAE
    WP_InicioEmbarques --> S_QueryViewerElements
    WP_InicioEmbarques --> S_QueryViewerItemDoubleClickData
    WP_InicioEmbarques --> S_QueryViewerItemCollapseData
    WP_InicioEmbarques --> S_QueryViewerItemClickData
    WP_InicioEmbarques --> S_QueryViewerFilterChangedData
    WP_InicioEmbarques --> S_QueryViewerDragAndDropData
    WP_InicioEmbarques -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Subscription,T_Order,T_WWP_NotificationDefinition,T_Embarque,T_Budget,T_EmbarqueDetalle,T_Remission trn
```

### Proceso 4 -- `proc_embarques_listado_remisiones` (Remisiones)

**46 objetos · 6 módulos tocados.**

```mermaid
flowchart LR
    WP_EmbarqueWP[EmbarqueWP WP]
    WP_RemissionsWW[RemissionsWW WP]
    WP_ListadoRemisiones[ListadoRemisiones WP]
    P_TotalPalletPorProductNumber[TotalPalletPorProductNumber]
    T_WWP_Subscription((WWP_Subscription))
    T_Order((Order))
    P_ValidarEmbarqueRemission[ValidarEmbarqueRemission]
    T_WWP_NotificationDefinition((WWP_NotificationDefinition))
    T_Embarque((Embarque))
    P_BuscarEmbarqueRemission[BuscarEmbarqueRemission]
    P_CrearEmbarque[CrearEmbarque]
    P_ObtenerDatosRemisionDesdeSAE[ObtenerDatosRemisionDesdeSAE]
    P_ObtenerFechaRemisionDesdeSAE[ObtenerFechaRemisionDesdeSAE]
    T_EmbarqueDetalle((EmbarqueDetalle))
    T_Remission((Remission))
    INFRA[+31 helpers WWP]
    WP_ListadoRemisiones --> P_CrearEmbarque
    WP_ListadoRemisiones --> T_Remission
    P_CrearEmbarque --> P_TotalPalletPorProductNumber
    P_CrearEmbarque --> P_ObtenerFechaRemisionDesdeSAE
    P_CrearEmbarque --> P_BuscarEmbarqueRemission
    P_CrearEmbarque --> P_ObtenerDatosRemisionDesdeSAE
    P_CrearEmbarque --> T_Order
    P_CrearEmbarque --> T_Embarque
    P_CrearEmbarque --> T_EmbarqueDetalle
    P_CrearEmbarque --> WP_EmbarqueWP
    WP_RemissionsWW --> P_CrearEmbarque
    WP_RemissionsWW --> T_Remission
    WP_ListadoRemisiones -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Subscription,T_Order,T_WWP_NotificationDefinition,T_Embarque,T_EmbarqueDetalle,T_Remission trn
```

### Proceso 5 -- `proc_embarques_notificar_impresion` (NotificarImpresion)

**22 objetos · 7 módulos tocados.**

```mermaid
flowchart LR
    P_WWP_GetParameter[WWP_GetParameter]
    WP_WWP_MailTemplateWW[WWP_MailTemplateWW WP]
    P_WWP_ParseMailAddressList[WWP_ParseMailAddressList]
    P_ObtenerConfiguracion[ObtenerConfiguracion]
    S_SDTPalet[SDTPalet SDT]
    WP_WWP_MailTemplateView[WWP_MailTemplateView WP]
    P_WWP_GetStatusCodeMessage[WWP_GetStatusCodeMessage]
    T_Configuracion((Configuracion))
    T_WWP_Mail((WWP_Mail))
    WP_WWConfiguracion[WWConfiguracion WP]
    P_NotificarImpresion[NotificarImpresion]
    WP_ViewConfiguracion[ViewConfiguracion WP]
    T_WWP_MailTemplate((WWP_MailTemplate))
    P_WWP_UpdateMailStatus[WWP_UpdateMailStatus]
    P_WWP_SendMail[WWP_SendMail]
    INFRA[+7 helpers WWP]
    P_NotificarImpresion --> P_WWP_GetParameter
    P_NotificarImpresion --> P_WWP_SendMail
    P_NotificarImpresion --> P_ObtenerConfiguracion
    P_NotificarImpresion --> S_SDTPalet
    P_NotificarImpresion --> T_WWP_MailTemplate
    P_NotificarImpresion --> T_WWP_Mail
    P_WWP_SendMail --> P_WWP_UpdateMailStatus
    P_WWP_SendMail --> P_WWP_ParseMailAddressList
    P_WWP_SendMail --> P_WWP_GetStatusCodeMessage
    P_ObtenerConfiguracion --> T_Configuracion
    T_WWP_MailTemplate --> WP_WWP_MailTemplateView
    T_WWP_MailTemplate --> WP_WWP_MailTemplateWW
    T_Configuracion --> WP_WWConfiguracion
    T_Configuracion --> WP_ViewConfiguracion
    P_NotificarImpresion -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Configuracion,T_WWP_Mail,T_WWP_MailTemplate trn
```

### Proceso 6 -- `proc_embarques_products_ww` (Product)

**6 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_ProductsWW[ProductsWW WP]
    T_Product((Product))
    INFRA[+4 helpers WWP]
    WP_ProductsWW --> T_Product
    WP_ProductsWW -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Product trn
```

### Proceso 7 -- `proc_embarques_listado_ordenes` (Pedidos)

**5 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_ListadoOrdenes[ListadoOrdenes WP]
    T_Order((Order))
    INFRA[+3 helpers WWP]
    WP_ListadoOrdenes --> T_Order
    WP_ListadoOrdenes -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Order trn
```

### Proceso 8 -- `proc_embarques_ordenes_ww` (OrdenesWW)

**5 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    WP_OrdenesWW[OrdenesWW WP]
    T_Order((Order))
    INFRA[+3 helpers WWP]
    WP_OrdenesWW --> T_Order
    WP_OrdenesWW -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_Order trn
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 340 | `LoadWWPContext`, `LoadGridState`, `WWPContext` |
| `DB` | 53 | `Remission`, `Order`, `Embarque` |
| `Informes` | 9 | `TotalPalletPorProductNumber`, `InformesTelerik`, `SDTTelerik` |
| `Produccion` | 8 | `ObtenerConfiguracion`, `SDTPalet` |
| `GeneXusReporting` | 8 | `QueryViewerParameters`, `QueryViewerDragAndDropData`, `QueryViewerElements` |
| `WWPBaseObjects.Mail` | 6 | `WWP_Mail`, `WWP_SendMail`, `WWP_MailTemplate` |
| `WWPBaseObjects.Subscriptions` | 6 | `WWP_HasSubscriptionsToDisplay` |
| `SAE` | 2 | `NotificarFechaEmbarque` |
| `WWPBaseObjects.Notifications.Common` | 1 | `WWP_SendNotification` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `Web` | 7 | `MenuEmbarques`, `MenuModuleCatalogosSAE`, `Modules` |
| `WWPBaseObjects` | 6 | `ListWWPPrograms` |
| `SAE` | 2 | `NotificarFechaEmbarque` |
| `Root` | 2 | `ProcedureNotificarReimpresionEtiquetaPalet` |
| `DB` | 2 | `Embarque` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `Budget` | **W** | `proc_embarques_inicio_embarques` |
| `Configuracion` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_notificar_impresion`, `proc_embarques_listado_embarques` |
| `Embarque` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |
| `EmbarqueDetalle` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |
| `EmbarquePallet` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_listado_embarques` |
| `Order` | **W** | `proc_embarques_ordenes_ww`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_ordenes` _(+1)_ |
| `Product` | **W** | `proc_embarques_products_ww` |
| `Remission` | **W** | `proc_embarques_listado_remisiones`, `proc_embarques_inicio_embarques` |
| `WWP_Entity` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |
| `WWP_Mail` | **RW** | `proc_embarques_embarque_wp`, `proc_embarques_notificar_impresion`, `proc_embarques_listado_remisiones` _(+2)_ |
| `WWP_MailTemplate` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_notificar_impresion`, `proc_embarques_listado_embarques` |
| `WWP_Notification` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |
| `WWP_NotificationDefinition` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |
| `WWP_SMS` | **RW** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |
| `WWP_Subscription` | **W** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |
| `WWP_UserExtended` | **RW** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |
| `WWP_WebClient` | **W** | `proc_embarques_embarque_wp` |
| `WWP_WebNotification` | **RW** | `proc_embarques_embarque_wp`, `proc_embarques_listado_remisiones`, `proc_embarques_listado_embarques` _(+1)_ |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 49 objetos parseados. Entry points desde el menú: `ListadoEmbarques`, `ListadoOrdenes`, `ListadoRemisiones`.
- **Patrón dominante:** módulo funcional / dashboard sin entidades propias; consume Trns de `DB`.
- **Valor diferencial:** cluster más grande es `proc_embarques_embarque_wp` (62 objetos).
- **Acoplamiento externo:** 9 peers, 433 calls totales. Top: `WWPBaseObjects` (340), `DB` (53), `Informes` (9).
- **Riesgo de migración:** alto — dependencia intensa de WWPBaseObjects (340 calls); requiere reimplementar el pattern WWP en el target o tolerar pérdida de audit/filter/export.

