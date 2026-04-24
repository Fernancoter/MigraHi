# Flujo del módulo: WWPBaseObjects.Mail

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/WWPBaseObjects.Mail.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 15 |
| Transactions | 2 (WWP_MailTemplate, WWP_Mail) |
| WebPanels | 3 |
| Procedures | 9 |
| DataProviders | 0 |
| SDTs | 1 |
| Módulos que LLAMA | 3 (77 calls) |
| Módulos que LO LLAMAN | 3 (14 calls) |
| Procesos canónicos | 4 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `WWP_GetSMTPParameters` | externo | WWPBaseObjects.Notifications.Common.WWP_SendPendingNotifications |
| `WWP_Mail` | externo | Embarques.NotificarImpresion, Embarques.NotificarSupervisor |
| `WWP_MailTemplate` | externo | Embarques.NotificarImpresion, Embarques.NotificarSupervisor |
| `WWP_SendMail` | externo | Embarques.NotificarImpresion, Embarques.NotificarSupervisor |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[WWP_Mail]
        X2[WWP_GetSMTPParameters]
        X3[WWP_MailTemplate]
        X4[WWP_SendMail]
    end

    subgraph MOD["📦 WWPBaseObjects.Mail (15 objetos)"]
        direction TB
    P_LoadAuditWWP_MailTemplate[LoadAuditWWP_MailTemplate]
    P_WWP_GetSMTPParameters[WWP_GetSMTPParameters]
    P_WWP_GetStatusCodeMessage[WWP_GetStatusCodeMessage]
    P_WWP_MailTemplateWWExport[WWP_MailTemplateWWExport]
    P_WWP_MailTemplateWWExportReport[WWP_MailTemplateWWExportReport]
    P_WWP_MailTemplateWWGetFilterData[WWP_MailTemplateWWGetFilterData]
    P_WWP_ParseMailAddressList[WWP_ParseMailAddressList]
    P_WWP_SendMail[WWP_SendMail]
    P_WWP_UpdateMailStatus[WWP_UpdateMailStatus]
    S_WWP_SMTPParametersSDT[WWP_SMTPParametersSDT SDT]
    T_WWP_Mail((WWP_Mail))
    T_WWP_MailTemplate((WWP_MailTemplate))
    WP_WWP_MailTemplatePrompt[WWP_MailTemplatePrompt WP]
    WP_WWP_MailTemplateView[WWP_MailTemplateView WP]
    WP_WWP_MailTemplateWW[WWP_MailTemplateWW WP]
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>74 calls]
        E_WWPBaseObjects_Subscriptions[WWPBaseObjects.Subscriptions<br/>2 calls]
        E_WWPBaseObjects_Discussions[WWPBaseObjects.Discussions<br/>1 calls]
    end

    X1 --> T_WWP_Mail
    X2 --> P_WWP_GetSMTPParameters
    X3 --> T_WWP_MailTemplate
    X4 --> P_WWP_SendMail
    T_WWP_MailTemplate -.audit.-> P_LoadAuditWWP_MailTemplate
    T_WWP_MailTemplate --> WP_WWP_MailTemplateView
    T_WWP_MailTemplate --> WP_WWP_MailTemplateWW
    P_WWP_SendMail --> P_WWP_UpdateMailStatus
    P_WWP_SendMail --> P_WWP_ParseMailAddressList
    P_WWP_SendMail --> P_WWP_GetStatusCodeMessage
    P_WWP_SendMail --> T_WWP_Mail
    P_WWP_GetSMTPParameters --> S_WWP_SMTPParametersSDT
    WP_WWP_MailTemplateWW --> P_WWP_MailTemplateWWGetFilterData
    WP_WWP_MailTemplateWW --> P_WWP_MailTemplateWWExport
    WP_WWP_MailTemplateWW --> P_WWP_MailTemplateWWExportReport
    WP_WWP_MailTemplateWW --> T_WWP_MailTemplate
    WP_WWP_MailTemplateWW --> WP_WWP_MailTemplateView
    P_WWP_MailTemplateWWExport --> T_WWP_MailTemplate
    WP_WWP_MailTemplateView --> T_WWP_MailTemplate
    WP_WWP_MailTemplateView --> WP_WWP_MailTemplateView
    WP_WWP_MailTemplateView --> WP_WWP_MailTemplateWW
    P_WWP_MailTemplateWWExportReport --> T_WWP_MailTemplate
    P_WWP_MailTemplateWWGetFilterData --> T_WWP_MailTemplate
    WP_WWP_MailTemplatePrompt --> T_WWP_MailTemplate
    P_LoadAuditWWP_MailTemplate --> T_WWP_MailTemplate
    P_WWP_UpdateMailStatus --> T_WWP_Mail
    T_WWP_MailTemplate ==> E_WWPBaseObjects
    T_WWP_Mail ==> E_WWPBaseObjects
    P_WWP_SendMail ==> E_WWPBaseObjects
    P_WWP_GetSMTPParameters ==> E_WWPBaseObjects
    WP_WWP_MailTemplateWW ==> E_WWPBaseObjects
    WP_WWP_MailTemplateWW -.-> E_WWPBaseObjects_Subscriptions
    P_WWP_MailTemplateWWExport ==> E_WWPBaseObjects
    WP_WWP_MailTemplateView ==> E_WWPBaseObjects
    WP_WWP_MailTemplateView -.-> E_WWPBaseObjects_Subscriptions
    WP_WWP_MailTemplateView -.-> E_WWPBaseObjects_Discussions
    P_WWP_MailTemplateWWExportReport ==> E_WWPBaseObjects
    P_WWP_MailTemplateWWGetFilterData ==> E_WWPBaseObjects
    WP_WWP_MailTemplatePrompt ==> E_WWPBaseObjects
    P_LoadAuditWWP_MailTemplate ==> E_WWPBaseObjects
    P_WWP_UpdateMailStatus ==> E_WWPBaseObjects
    P_WWP_ParseMailAddressList ==> E_WWPBaseObjects

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class T_WWP_MailTemplate,T_WWP_Mail trn
    class WP_WWP_MailTemplateWW,WP_WWP_MailTemplateView,WP_WWP_MailTemplatePrompt wp
    class P_WWP_SendMail,P_WWP_GetSMTPParameters,P_WWP_MailTemplateWWExport,P_WWP_MailTemplateWWExportReport,P_WWP_MailTemplateWWGetFilterData,P_LoadAuditWWP_MailTemplate,P_WWP_UpdateMailStatus,S_WWP_SMTPParametersSDT,P_WWP_ParseMailAddressList,P_WWP_GetStatusCodeMessage proc
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

### Proceso 1 -- `proc_wwpbase_objects_mail_wwp_mail_template` (WWP_MailTemplate)

**7 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    T_WWP_MailTemplate((WWP_MailTemplate))
    WP_WWP_MailTemplateView[WWP_MailTemplateView WP]
    WP_WWP_MailTemplateWW[WWP_MailTemplateWW WP]
    INFRA[+4 helpers WWP]
    WP_WWP_MailTemplateWW --> T_WWP_MailTemplate
    WP_WWP_MailTemplateWW --> WP_WWP_MailTemplateView
    T_WWP_MailTemplate --> WP_WWP_MailTemplateView
    T_WWP_MailTemplate --> WP_WWP_MailTemplateWW
    T_WWP_MailTemplate -.-> INFRA

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_MailTemplate trn
```

### Proceso 2 -- `proc_wwpbase_objects_mail_wwp_send_mail` (WWP_SendMail)

**5 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    P_WWP_GetStatusCodeMessage[WWP_GetStatusCodeMessage]
    P_WWP_SendMail[WWP_SendMail]
    T_WWP_Mail((WWP_Mail))
    P_WWP_UpdateMailStatus[WWP_UpdateMailStatus]
    P_WWP_ParseMailAddressList[WWP_ParseMailAddressList]
    P_WWP_SendMail --> P_WWP_UpdateMailStatus
    P_WWP_SendMail --> P_WWP_ParseMailAddressList
    P_WWP_SendMail --> P_WWP_GetStatusCodeMessage
    P_WWP_SendMail --> T_WWP_Mail

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Mail trn
```

### Proceso 3 -- `proc_wwpbase_objects_mail_wwp_get_smtpparameters` (WWP_GetSMTPParameters)

**3 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_WWP_GetSMTPParameters[WWP_GetSMTPParameters]
    P_WWP_GetParameter[WWP_GetParameter]
    S_WWP_SMTPParametersSDT[WWP_SMTPParametersSDT SDT]
    P_WWP_GetSMTPParameters --> P_WWP_GetParameter
    P_WWP_GetSMTPParameters --> S_WWP_SMTPParametersSDT

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 4 -- `proc_wwpbase_objects_mail_wwp_mail` (WWP_Mail)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    T_WWP_Mail((WWP_Mail))

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_Mail trn
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 74 | `LoadWWPContext`, `WWPContext`, `LoadGridState` |
| `WWPBaseObjects.Subscriptions` | 2 | `WWP_HasSubscriptionsToDisplay` |
| `WWPBaseObjects.Discussions` | 1 | `WWP_HasDiscussionMessages` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `WWPBaseObjects.Notifications.Common` | 7 | `WWP_SendPendingNotifications`, `WWP_CreateNotificationToUser`, `WWP_UpdateNotificationDefinitions` |
| `Embarques` | 6 | `NotificarSupervisor`, `NotificarImpresion` |
| `WWPBaseObjects` | 1 | `ListWWPPrograms` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `WWP_Mail` | **CW** | `proc_wwpbase_objects_mail_wwp_mail`, `proc_wwpbase_objects_mail_wwp_send_mail` |
| `WWP_MailTemplate` | **C** | `proc_wwpbase_objects_mail_wwp_mail_template` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Top entidades con descripción sustantiva en el KB: "Mail Template" (`WWP_MailTemplate`); "Mail" (`WWP_Mail`).
- **Patrón dominante:** WWP CRUD standard (Trn + WW/View + audit helpers + export/filter helpers generados por el pattern).
- **Valor diferencial:** cluster más grande es `proc_wwpbase_objects_mail_wwp_mail_template` (7 objetos).
- **Acoplamiento externo:** 3 peers, 77 calls totales. Top: `WWPBaseObjects` (74), `WWPBaseObjects.Subscriptions` (2), `WWPBaseObjects.Discussions` (1).
- **Riesgo de migración:** alto — dependencia intensa de WWPBaseObjects (74 calls); requiere reimplementar el pattern WWP en el target o tolerar pérdida de audit/filter/export.

