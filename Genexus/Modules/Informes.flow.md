# Flujo del módulo: Informes

> Generado por `Scripts/generate-module-flows.ps1` a partir de `_index.json` + `_menu.json` + `_processes.json` + `Modules/Informes.md`.
> Renderización: Mermaid (VS Code Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 5 |
| Transactions | 0 |
| WebPanels | 0 |
| Procedures | 3 |
| DataProviders | 0 |
| SDTs | 2 |
| Módulos que LLAMA | 0 (0 calls) |
| Módulos que LO LLAMAN | 2 (29 calls) |
| Procesos canónicos | 2 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `InformesTelerik` | externo | Embarques.EmbarqueFormato, SAE.FTBYTD |
| `TotalPalletPorProductNumber` | externo | Embarques.CrearEmbarque, Embarques.InicializarEmbarque |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph XEN["⚙️ Entry points (externos)"]
        X1[InformesTelerik]
        X2[TotalPalletPorProductNumber]
    end

    subgraph MOD["📦 Informes (5 objetos)"]
        direction TB
    P_InformesTelerik[InformesTelerik]
    P_TotalPalletPorProductNumber[TotalPalletPorProductNumber]
    P_TotalTroqueles[TotalTroqueles]
    S_SDTInformeFilter[SDTInformeFilter SDT]
    S_SDTTelerik[SDTTelerik SDT]
    end

    X1 --> P_InformesTelerik
    X2 --> P_TotalPalletPorProductNumber
    P_InformesTelerik --> S_SDTTelerik
    P_InformesTelerik --> S_SDTInformeFilter

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class P_InformesTelerik,P_TotalPalletPorProductNumber,S_SDTTelerik,S_SDTInformeFilter,P_TotalTroqueles proc
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

### Proceso 1 -- `proc_informes_informes_telerik` (InformesTelerik)

**3 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    P_InformesTelerik[InformesTelerik]
    S_SDTInformeFilter[SDTInformeFilter SDT]
    S_SDTTelerik[SDTTelerik SDT]
    P_InformesTelerik --> S_SDTTelerik
    P_InformesTelerik --> S_SDTInformeFilter

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

### Proceso 2 -- `proc_informes_total_pallet_por_product_number` (TotalPalletPorProductNumber)

**1 objetos · 1 módulos tocados.**

```mermaid
flowchart LR
    P_TotalPalletPorProductNumber[TotalPalletPorProductNumber]

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
```

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

_(sin llamadas salientes)_

### ← Lo llaman desde

| Módulo origen | Llamadas | Top 3 callers |
|---|---:|---|
| `SAE` | 20 | `RealtimeInventory`, `OrdersMoney`, `Orders` |
| `Embarques` | 9 | `EmbarqueFormato`, `InicializarEmbarque`, `CrearEmbarque` |

---

## 🗃️ Datos tocados (extraído de la matrix)

_(ningún proceso de este módulo toca entidades en la matrix)_

---

## 🧭 Lectura rápida del módulo

- **Propósito:** Módulo con 5 objetos parseados. Sin entry points en `_menu.json` -- accedido indirectamente desde: Embarques, SAE.
- **Patrón dominante:** módulo de procesos / utilities sin UI directa.
- **Valor diferencial:** cluster más grande es `proc_informes_informes_telerik` (3 objetos).
- **Acoplamiento externo:** ninguno (módulo self-contained).
- **Riesgo de migración:** bajo — módulo aislado, se migra sin arrastrar otros módulos.

