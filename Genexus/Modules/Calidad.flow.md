# Flujo del módulo: Calidad

> Diagramas de flujo generados a partir de `_index.json` + `Modules/Calidad.md` + `Processes/proc_calidad_*`.
> Renderización: Mermaid (VS Code con extensión Mermaid Preview, GitHub, GitLab).

---

## 📊 Resumen

| Métrica | Valor |
|---|---|
| Objetos totales | 30 |
| Transactions | 3 (Reclamo, CarreteDefecto, ReclamoDetalle) |
| WebPanels | 12 |
| Procedures | 14 |
| DataProviders | 1 |
| Módulos que LLAMA | 6 (WWP, DB, Subscriptions, Discussions, Common, Produccion) |
| Módulos que LO LLAMAN | 2 (Web vía menú, WWPBaseObjects vía ListWWPPrograms) |
| Procesos canónicos | 3 |

---

## 🚪 Entry points

| Entry | Tipo | Ruta / quién invoca |
|---|---|---|
| `InicioCalidad` | menú | Web > Calidad > Inicio |
| `CarreteDefectoWW` | menú | Web > Calidad > Defectos |
| `reclamosww` | menú | Web > Calidad > Reclamos |
| `ConsultarCarrete` | menú | Web > Calidad > Consultar |

---

## 🔀 Diagrama general del módulo

```mermaid
flowchart LR
    subgraph MENU["🚪 Entry points (desde menú Web > Calidad)"]
        M1[InicioCalidad]
        M2[CarreteDefectoWW]
        M3[reclamosww]
        M4[ConsultarCarrete]
    end

    subgraph CAL["📦 Calidad (30 objetos)"]
        direction TB
        WP_Cons[ConsultarCarrete WP]
        WP_Traz[TrazabilidadView WP]
        WP_CDW[CarreteDefectoWW WP]
        WP_CDV[CarreteDefectoView WP]
        WP_RWW[reclamosww WP]
        WP_RV[reclamoview WP]
        WP_ERD[EditarReclamoDetalle WP]

        T_CD((CarreteDefecto Trn))
        T_R((Reclamo Trn))
        T_RD((ReclamoDetalle Trn))

        P_LA_CD[LoadAuditCarreteDefecto]
        P_LA_R[LoadAuditReclamo]
        P_ERD[EliminarReclamoDetalle]

        DP_RP[ReclamoProductoDP]
    end

    subgraph EXT["🌐 Módulos externos"]
        DB[(DB<br/>14 calls)]
        WWP[WWPBaseObjects<br/>122 calls]
        SUBS[Subscriptions<br/>4 calls]
        DISC[Discussions<br/>2 calls]
        PROD[Produccion<br/>1 call]
    end

    M1 --> WP_Cons
    M2 --> WP_CDW
    M3 --> WP_RWW
    M4 --> WP_Cons

    WP_Cons --> WP_Traz
    WP_CDW -- "Nuevo/Editar" --> T_CD
    WP_CDW --> WP_CDV
    WP_RWW -- "Nuevo/Editar" --> T_R
    WP_RWW --> WP_RV
    WP_RV -- "editar detalle" --> WP_ERD
    WP_ERD -- "eliminar" --> P_ERD

    T_CD -.audit.-> P_LA_CD
    T_R -.audit.-> P_LA_R

    WP_Traz ==> DB
    DP_RP ==> PROD

    T_CD -.-> WWP
    T_R -.-> WWP
    WP_CDV -.discusiones.-> DISC
    WP_RV -.subscriptions.-> SUBS

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef wp fill:#d1e7ff,stroke:#0066cc
    classDef proc fill:#e0e0e0,stroke:#666
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2

    class T_CD,T_R,T_RD trn
    class WP_Cons,WP_Traz,WP_CDW,WP_CDV,WP_RWW,WP_RV,WP_ERD wp
    class P_LA_CD,P_LA_R,P_ERD,DP_RP proc
    class DB,WWP,SUBS,DISC,PROD ext
```

**Leyenda:**
- 🟡 círculo = Transaction (entidad de negocio)
- 🔵 caja = WebPanel (pantalla)
- ⬜ caja gris = Procedure / DataProvider
- ➡️ sólida = navegación/invocación de negocio
- ➡️ punteada = llamada secundaria (audit, discussions, subscriptions)
- ➡️ gruesa `==>` = dependencia de datos pesada

---

## 📦 Procesos del módulo

### Proceso 1 — `proc_calidad_carrete_defecto_ww` (CRUD de defectos)

```mermaid
flowchart LR
    U([Usuario]) -->|Menú: Web > Calidad > Defectos| WW[CarreteDefectoWW]
    WW -->|listar| VIEW[CarreteDefectoView]
    WW -->|Nuevo| TRN((CarreteDefecto))
    WW -->|Filtrar| FD[CarreteDefectoWWGetFilterData]
    WW -->|Export Excel| EXP[CarreteDefectoWWExport]
    WW -->|Export PDF| RPT[CarreteDefectoWWExportReport]
    TRN -->|beforeCommit| AUDIT[LoadAuditCarreteDefecto]
    AUDIT -->|escribe| WWPE[(WWP_Entity)]

    classDef trn fill:#fff4c2,stroke:#b38600
    class TRN trn
```

**7 objetos. Textbook WWP CRUD.**

---

### Proceso 2 — `proc_calidad_reclamos_ww` (gestión de reclamos)

```mermaid
flowchart TD
    U([Usuario]) -->|Menú: Calidad > Reclamos| WW[reclamosww]
    WW --> VIEW[reclamoview]
    WW -->|Nuevo reclamo| TRN_R((Reclamo))
    VIEW -->|Editar detalle| ERD[EditarReclamoDetalle]
    ERD -->|Guardar| TRN_RD((ReclamoDetalle))
    ERD -->|Eliminar línea| DEL[EliminarReclamoDetalle]
    TRN_R -.audit.-> LA_R[LoadAuditReclamo]
    TRN_RD -.audit.-> LA_RD[LoadAuditReclamoDetalle]

    ERD -- "lookup producto" --> DP[ReclamoProductoDP]
    DP -.-> PROD[Produccion.SDTProducto]

    WW --> EXP[reclamoswwExport]
    WW --> RPT[reclamoswwExportReport]

    classDef trn fill:#fff4c2,stroke:#b38600
    classDef ext fill:#fff,stroke:#999,stroke-dasharray: 4 2
    class TRN_R,TRN_RD trn
    class PROD ext
```

**~142 objetos en el bundle (incluye infra WWP).** Cluster más grande del módulo.

---

### Proceso 3 — `proc_calidad_trazabilidad_view` (trazabilidad cruzada)

```mermaid
flowchart LR
    U([Inspector]) -->|desde dashboard| TV[TrazabilidadView]

    TV -->|"1) carrete"| CV[DB.CarreteView]
    TV -->|"2) pallet origen"| PV[DB.PaletView]
    TV -->|"3) bobina"| BV[DB.BobinaView]
    TV -->|"4) extrusión"| EV[DB.ExtrusionView]
    TV -->|"5) carrera prensa"| CaV[DB.CarreraView]

    CV -.detalle.-> CR[(DB.Carrete)]
    PV -.detalle.-> PA[(DB.Palet)]
    BV -.detalle.-> BO[(DB.Bobina)]
    EV -.detalle.-> EX[(DB.Extrusion)]
    CaV -.detalle.-> CAR[(DB.Carrera)]

    classDef ext fill:#fff,stroke:#0066cc,stroke-dasharray: 4 2
    class CV,PV,BV,EV,CaV ext
```

**El corazón de la trazabilidad.** Un carrete defectuoso se puede rastrear hacia atrás: carrete → pallet → bobina → extrusión → lote de materia prima. Cruza 5 entidades del módulo DB en una sola vista.

---

## 🔗 Llamadas cross-module detalladas

### → Llama a otros módulos

| Módulo destino | Llamadas | Top 3 objetos invocados |
|---|---|---|
| WWPBaseObjects | 122 | `SecGAMIsAuthByFunctionalityKey`, `LoadWWPContext`, `WWP_GetAppliedFiltersDescription` |
| DB | 14 | `ExtrusionView`, `BobinaView`, `PaletView` (los 5 View de trazabilidad) |
| WWPBaseObjects.Subscriptions | 4 | `WWP_HasSubscriptionsToDisplay` (en cada view) |
| WWPBaseObjects.Discussions | 2 | `WWP_HasDiscussionMessages` (reclamoview, CarreteDefectoView) |
| GeneXus.Common | 1 | `Messages` (en EditarReclamoDetalle) |
| Produccion | 1 | `SDTProducto` (desde ReclamoProductoDP) |

### ← Lo llaman desde

| Módulo origen | Llamadas | Cómo |
|---|---|---|
| Web | 5 | `MenuCalidad` (DP) dispatcheando a 3 WP + `InicioCalidad` |
| WWPBaseObjects | 2 | `ListWWPPrograms` listando CarreteDefectoWW y reclamosww |

---

## 🗃️ Datos tocados (extraído de la matrix)

| Entidad | Operación por Calidad | Procesos que lo hacen |
|---|---|---|
| `CarreteDefecto` | **C** (ciclo de vida completo) | proc_calidad_carrete_defecto_ww |
| `Reclamo` | **C** | proc_calidad_reclamos_ww |
| `ReclamoDetalle` | **C** | proc_calidad_reclamos_ww (sub-proceso) |
| `Bobina`, `Carrete`, `Palet`, `Extrusion`, `Carrera` | **R** | proc_calidad_trazabilidad_view |
| `WWP_Entity` (audit) | **W** (indirecto) | todos los CRUD |

---

## 🧭 Lectura rápida del módulo

- **Propósito:** control de calidad + trazabilidad del producto.
- **Patrón dominante:** WWP standard (CRUD con audit automático).
- **Valor diferencial:** `TrazabilidadView` es la funcionalidad que justifica el módulo — cruza 5 entidades de DB para rastrear defectos hasta el origen físico.
- **Acoplamiento externo:** mínimo (1 llamada a Produccion para lookup, resto es infra WWP). Módulo candidato a migración aislada.
- **Riesgo de migración:** la trazabilidad depende de que los 5 `*View` de DB existan en el target. Si se migra Calidad antes que DB, `TrazabilidadView` queda sin funcionar.
