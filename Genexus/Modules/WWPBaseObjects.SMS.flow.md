# Flujo del módulo: WWPBaseObjects.SMS

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/WWPBaseObjects.SMS.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 11 |
| Transactions | 1 (WWP_SMS) |
| WebPanels | 0 |
| Procedures | 6 |
| DataProviders | 0 |
| SDTs | 4 |
| Módulos que LLAMA | 1 (7 calls) |
| Módulos que LO LLAMAN | 1 (6 calls) |
| Procesos canónicos | 3 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `WWP_GetSMSParameters` | externo | WWPBaseObjects.Notifications.Common.WWP_SendPendingNotifications |
| `WWP_SendSMS` | externo | WWPBaseObjects.Notifications.Common.WWP_SendPendingNotifications |
| `WWP_SMS` | externo | WWPBaseObjects.Notifications.Common.WWP_CreateNotificationToUser, WWPBaseObjects.Notifications.Common.WWP_SendPendingNotifications |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[WWP_SMS]
        X2[WWP_SendSMS]
        X3[WWP_GetSMSParameters]
    end

    subgraph MOD["📦 WWPBaseObjects.SMS (11 objetos)"]
        direction TB
    P_WWP_GetSMSParameters[WWP_GetSMSParameters]
    P_WWP_ParsePhoneNumbersList[WWP_ParsePhoneNumbersList]
    P_WWP_SendSMS[WWP_SendSMS]
    P_WWP_SendVerificationCode[WWP_SendVerificationCode]
    P_WWP_UpdateSMSStatus[WWP_UpdateSMSStatus]
    P_WWP_ValidateVerificationCode[WWP_ValidateVerificationCode]
    S_WWP_SendSMSResultSDT[WWP_SendSMSResultSDT SDT]
    S_WWP_SendVerificationCodeResultSDT[WWP_SendVerificationCodeResultSDT SDT]
    S_WWP_SMSParametersSDT[WWP_SMSParametersSDT SDT]
    S_WWP_ValidateVerificationCodeResultSDT[WWP_ValidateVerificationCodeResultSDT SDT]
    T_WWP_SMS((WWP_SMS))
    end

    subgraph EXT["🌐 Módulos externos"]
        E_WWPBaseObjects[WWPBaseObjects<br/>7 calls]
    end

    X1 --> T_WWP_SMS
    X2 --> P_WWP_SendSMS
    X3 --> P_WWP_GetSMSParameters
    P_WWP_SendSMS --> P_WWP_UpdateSMSStatus
    P_WWP_SendSMS --> P_WWP_ParsePhoneNumbersList
    P_WWP_SendSMS --> S_WWP_SMSParametersSDT
    P_WWP_SendSMS --> S_WWP_SendSMSResultSDT
    P_WWP_SendSMS --> T_WWP_SMS
    P_WWP_GetSMSParameters --> S_WWP_SMSParametersSDT
    P_WWP_ValidateVerificationCode --> P_WWP_GetSMSParameters
    P_WWP_ValidateVerificationCode --> S_WWP_SMSParametersSDT
    P_WWP_ValidateVerificationCode --> S_WWP_ValidateVerificationCodeResultSDT
    P_WWP_SendVerificationCode --> P_WWP_GetSMSParameters
    P_WWP_SendVerificationCode --> S_WWP_SMSParametersSDT
    P_WWP_SendVerificationCode --> S_WWP_SendVerificationCodeResultSDT
    P_WWP_UpdateSMSStatus --> T_WWP_SMS
    P_WWP_SendSMS -.-> E_WWPBaseObjects
    P_WWP_GetSMSParameters -.-> E_WWPBaseObjects
    P_WWP_ValidateVerificationCode -.-> E_WWPBaseObjects
    P_WWP_SendVerificationCode -.-> E_WWPBaseObjects
    P_WWP_UpdateSMSStatus -.-> E_WWPBaseObjects
    P_WWP_ParsePhoneNumbersList -.-> E_WWPBaseObjects

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class T_WWP_SMS trn
    class P_WWP_SendSMS,P_WWP_GetSMSParameters,S_WWP_SMSParametersSDT,P_WWP_ValidateVerificationCode,P_WWP_SendVerificationCode,P_WWP_UpdateSMSStatus,S_WWP_SendSMSResultSDT,P_WWP_ParsePhoneNumbersList,S_WWP_ValidateVerificationCodeResultSDT,S_WWP_SendVerificationCodeResultSDT proc
    class E_WWPBaseObjects ext
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

### Proceso 1 -- `proc_wwpbase_objects_sms_wwp_send_sms` (WWP_SendSMS)

**6 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    S_WWP_SendSMSResultSDT[WWP_SendSMSResultSDT SDT]
    S_WWP_SMSParametersSDT[WWP_SMSParametersSDT SDT]
    P_WWP_ParsePhoneNumbersList[WWP_ParsePhoneNumbersList]
    T_WWP_SMS((WWP_SMS))
    P_WWP_UpdateSMSStatus[WWP_UpdateSMSStatus]
    P_WWP_SendSMS[WWP_SendSMS]
    P_WWP_SendSMS --> P_WWP_UpdateSMSStatus
    P_WWP_SendSMS --> P_WWP_ParsePhoneNumbersList
    P_WWP_SendSMS --> S_WWP_SMSParametersSDT
    P_WWP_SendSMS --> S_WWP_SendSMSResultSDT
    P_WWP_SendSMS --> T_WWP_SMS

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_SMS trn
```

### Proceso 2 -- `proc_wwpbase_objects_sms_wwp_get_smsparameters` (WWP_GetSMSParameters)

**3 objetos · 2 módulos tocados.**

```mermaid
flowchart LR
    P_WWP_GetSMSParameters[WWP_GetSMSParameters]
    P_WWP_GetParameter[WWP_GetParameter]
    S_WWP_SMSParametersSDT[WWP_SMSParametersSDT SDT]
    P_WWP_GetSMSParameters --> P_WWP_GetParameter
    P_WWP_GetSMSParameters --> S_WWP_SMSParametersSDT

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 3 -- `proc_wwpbase_objects_sms_wwp_sms` (WWP_SMS)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    T_WWP_SMS((WWP_SMS))

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    class T_WWP_SMS trn
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---:|---|
| `WWPBaseObjects` | 7 | `WWP_Logger`, `WWP_GetParameter` |

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `WWPBaseObjects.Notifications.Common` | 6 | `WWP_SendPendingNotifications`, `WWP_CreateNotificationToUser` |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación | Procesos del módulo que la tocan |
|---|---|---|
| `WWP_SMS` | **CW** | `proc_wwpbase_objects_sms_wwp_sms`, `proc_wwpbase_objects_sms_wwp_send_sms` |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 11 objetos parseados. Entidades centrales por referencias entrantes: `WWP_SMS`. Sin entry points en `_menu.json` -- accedido indirectamente desde: WWPBaseObjects.Notifications.Common.
- **Patrón dominante:** módulo mixto.
- **Valor diferencial:** cluster más grande es `proc_wwpbase_objects_sms_wwp_send_sms` (6 objetos).
- **Acoplamiento externo:** 1 peers, 7 calls totales. Top: `WWPBaseObjects` (7).
- **Riesgo de migración:** medio — revisar las aristas cross-module individualmente en Phase 3.3.

