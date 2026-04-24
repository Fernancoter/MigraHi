# Vista completa del flujo de HiCone3

Basada en el output de las 4 fases de extracción (`_menu.json`, `_domain_glossary.md`, `Modules/`, `Processes/`, `_entity_process_matrix.csv`, `_index.json`, `_architecture.md`). Lo que no está evidenciado en el grafo/glosario se marca con *(inferido)*.

---

## 🗺️ Mapa general — el ciclo completo

```
                            ┌─────────────────────────┐
                            │  Seguridad / GAM (auth) │
                            └────────────┬────────────┘
                                         │ (transversal)
  ┌──────────────────────────────────────┼──────────────────────────────────────┐
  │                                      ▼                                      │
  │                        ┌────────────────────────────┐                       │
  │                        │   MATERIA PRIMA   (Silo)   │                       │
  │                        │   Lote · Producto          │                       │
  │                        └──────────────┬─────────────┘                       │
  │                                       │                                     │
  │                                       ▼                                     │
  │                        ┌─────────────────────────────┐                      │
  │                        │    EXTRUSIÓN (evento raíz)  │                      │
  │                        │  Extrusora + Turno + Oper.  │                      │
  │                        │  → crea Bobinas             │                      │
  │                        └──────────────┬──────────────┘                      │
  │                    [ExtrusionInterrupcion si falla]                         │
  │                                       │                                     │
  │                                       ▼                                     │
  │                        ┌─────────────────────────────┐                      │
  │                        │        PRENSADO             │                      │
  │                        │  Prensa + Troquel + Carrera │                      │
  │                        │  consume Bobinas → Carretes │                      │
  │                        └──────────────┬──────────────┘                      │
  │                    [PrensadoInterrupcion si falla]                          │
  │                                       │                                     │
  │                                       ▼                                     │
  │                        ┌─────────────────────────────┐                      │
  │                        │     PALETIZACIÓN            │                      │
  │                        │  Palet + PaletCarrete       │                      │
  │                        │  OrdenEtiquetado (impresión)│                      │
  │                        └───────┬──────────────┬──────┘                      │
  │                                │              │                             │
  │                                ▼              ▼                             │
  │               ┌────────────────────┐   ┌───────────────────┐                │
  │               │  CALIDAD           │   │  INVENTARIO FIN.  │                │
  │               │  CarreteDefecto    │   │  ExistenciaProd.  │                │
  │               │  Reclamo + Detalle │   │                   │                │
  │               │  → Trazabilidad    │   └─────────┬─────────┘                │
  │               └────────────────────┘             │                          │
  │                                                  ▼                          │
  │                                  ┌───────────────────────────┐              │
  │                                  │   EMBARQUE                │              │
  │                                  │ Embarque+Detalle+Pallet   │              │
  │                                  │ Order + Remission         │              │
  │                                  └──────────┬────────────────┘              │
  │                                             │                               │
  │                                             ▼                               │
  │                              ┌─────────────────────────┐                    │
  │                              │  SAE (comercial/finan.) │                    │
  │                              │  Customer · Budget      │                    │
  │                              │  Consolidated · Document│                    │
  │                              └─────────────────────────┘                    │
  │                                                                             │
  │    Transversales: Audit (WWP_Entity) · Notificaciones · Reportes · Config   │
  └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎬 El flujo en 7 etapas

### Etapa 1 — Materia Prima

**Qué pasa:** entran pellets plásticos a los silos. Se registran lotes con su producto.

| Elemento | Detalle |
|---|---|
| **Entidades** | `Silo`, `Lote`, `Producto`, `ProductoCategoria`, `ExistenciaSilo` |
| **Módulo(s)** | `Produccion`, `Existencia` |
| **Menú** | `Web → Inventario`, `Web → Materia Prima` |
| **Procesos clave** | `proc_produccion_listar_lotes`, procesos de `Existencia` |
| **Observación** | `ExistenciaSilo` tiene su propia transaction (`DB.ExistenciaSilo`), escrita desde `Existencia.GuardarExistenciaSilo` + `ObtenerExistenciaSilo` |

---

### Etapa 2 — Extrusión (el evento raíz del sistema)

**Qué pasa:** una `Extrusora` corre durante un `Turno`, operada por un `Operador`, procesando material del silo. Produce `Bobina`s (rollos de material extruido).

| Elemento | Detalle |
|---|---|
| **Entidades** | `Extrusion`, `ExtrusionResultado`, `Bobina`, `Extrusora`, `ExtrusoraBobina`, `ExtrusoraMezcladora`, `ExtrusoraProducto`, `Turno`, `Operador` |
| **Módulo(s)** | `Produccion` |
| **Menú** | `Web → Extrusión` |
| **Procesos clave** | `proc_produccion_inicio_extrusion`, `proc_produccion_vw_analitica_bobina`, `proc_produccion_tablero_directivo_extrusion` |
| **Importancia** | **`Extrusion` = R:28 / W:1 en la matrix.** Es el evento raíz del dominio: se crea UNA vez, TODO downstream lo consulta. |
| **Excepción** | `ExtrusionInterrupcion` registra paros, con motivo en `CausaInterrupcion` / `DownTimeCode` |

---

### Etapa 3 — Prensado

**Qué pasa:** las `Bobina`s producidas entran a una `Prensa`. Una `Carrera` de prensa usa un `Troquel` y consume bobinas para producir `Carrete`s (producto terminado).

| Elemento | Detalle |
|---|---|
| **Entidades** | `Prensado`, `PrensadoResultado`, `PrensadoBobina`, `Prensa`, `PrensaTroquel`, `PrensaProducto`, `PrensaCarrera`, `Troquel`, `Carrera`, `Carrete` |
| **Módulo(s)** | `Produccion` |
| **Menú** | `Web → Prensado` (con submenú Inicio, Catálogos, etc.) |
| **Procesos clave** | `proc_produccion_inicio_prensado` (dashboard, 18 objetos), `proc_db_prensado`, `proc_produccion_iniciar_prensado` |
| **Anomalía detectada** | `Carrete` aparece R:3 / W:0 en la matrix — nadie escribe Carretes en los procesos clusterizados. Probable: se crean por `SDPanel` mobile (no parseado) o por helper runtime-bound. **A investigar.** |
| **Excepción** | `PrensadoInterrupcion` |

---

### Etapa 4 — Paletización

**Qué pasa:** los carretes se agrupan en `Palet`s, se etiquetan (impresión de códigos) y quedan listos para embarque.

| Elemento | Detalle |
|---|---|
| **Entidades** | `Palet`, `PaletCarrete`, `OrdenEtiquetado`, `EtiquetadoOperador`, `PaletEtiquetaImpresa` |
| **Módulo(s)** | `Produccion`, `PrinterSD` |
| **Menú** | Accesible desde paneles de `Produccion` |
| **Procesos clave** | `proc_produccion_sd_etiquetado_operador` (mobile), `proc_admin_imprimir_bobinas` (helper de impresión) |
| **Observación** | `admin.ImprimirBobinas` y `PrinterSD.BobinaReportMain` son helpers de impresión invocados desde `Produccion.vwAnaliticaBobina` por link inline (no desde el menú) |

---

### Etapa 5 — Calidad

**Qué pasa:** se inspeccionan los carretes. Si hay defectos se registran; los reclamos del cliente se vinculan a detalles específicos.

| Elemento | Detalle |
|---|---|
| **Entidades** | `CarreteDefecto`, `Reclamo`, `ReclamoDetalle` |
| **Módulo(s)** | `Calidad` |
| **Menú** | `Web → Calidad → {Defectos, Reclamos, Trazabilidad}` |
| **Procesos clave** | `proc_calidad_carrete_defecto_ww` (CRUD simple), `proc_calidad_reclamos_ww` (142 objetos — el cluster más grande), `proc_calidad_trazabilidad_view` |
| **Trazabilidad** | `TrazabilidadView` cruza `Bobina ↔ Carrete ↔ Extrusion` para rastrear un defecto hasta su origen físico. Usa `BobinaView` como vista detalle. |

---

### Etapa 6 — Embarque

**Qué pasa:** los pallets terminados se cargan a un `Embarque` contra un `Order` del cliente. Se emite `Remission` (remisión). Cierre logístico.

| Elemento | Detalle |
|---|---|
| **Entidades** | `Embarque`, `EmbarqueDetalle`, `EmbarquePallet`, `Order`, `Remission`, `Document`, `FTB` |
| **Módulo(s)** | `Embarques`, `Informes`, `Reportes` |
| **Menú** | `Web → Embarques → {Pedidos, Cargar Embarque, Listado de Remisiones, ...}` |
| **Procesos clave** | `proc_db_embarque` (77 objetos, end-to-end), `proc_embarques_cargar_embarque`, `proc_embarques_buscar_embarque_remission`, `proc_embarques_comenzar_carga_de_embarque` |
| **Cross-module** | Única conexión con SAE: `Embarques → SAE.ObtenerFechaRemisionDesdeSAE` (un solo punto). Los dos lados están desacoplados a propósito. |

---

### Etapa 7 — SAE (comercial / financiero)

**Qué pasa:** gestión de clientes, presupuestos, facturación, ventas. Corre paralelo al flujo físico pero se toca solo en el embarque.

| Elemento | Detalle |
|---|---|
| **Entidades** | `Customer`, `SalesPerson`, `Budget`, `Consolidated`, `Document`, `StatementOfIncome` |
| **Módulo(s)** | `SAE`, `Informes`, `Reportes` |
| **Menú** | `Web → Informes SAE`, `Web → Catálogos SAE` |
| **Procesos clave** | `proc_sae_budget_ww` (absorbió `outlookww` — mismo modelo financiero), `proc_db_customer_ww`, `proc_sae_edit_budget` |
| **Acoplamiento** | **Mínimo con el resto.** Solo 1 arista entrante desde Embarques. Podría migrar como módulo independiente casi sin tocar lo demás. |

---

## 🔄 Los 4 loops que se repiten

El sistema no es lineal — son 4 ciclos que corren en paralelo:

### Loop 1 — Producción (el physical pipeline)
```
Silo → Extrusión → Bobina → Prensado → Carrete → Palet → Stock
```
Módulos: `Produccion` + `DB` + `Existencia`.
Disparado por: turno operativo.

### Loop 2 — Comercial
```
Customer → Order → (producción existente) → Remission → Embarque → Document
```
Módulos: `SAE` + `Embarques`.
Disparado por: pedido de cliente.

### Loop 3 — Calidad (feedback)
```
Producto físico → Inspección → CarreteDefecto/Reclamo → Trazabilidad hacia Bobina/Extrusion
```
Módulo: `Calidad`.
Disparado por: inspección o reclamo de cliente.

### Loop 4 — Operativo (métricas)
```
Turno + Operador → Interrupciones → DownTimeCode → Reportes de productividad
```
Módulos: `Downtime`, `Reportes`, `Produccion`.
Disparado por: eventos de paro.

---

## 🧩 Capas transversales (atraviesan todo)

### 🔐 Seguridad / GAM
- 74 WebPanels viven en módulo `Root` (los GAM nativos).
- `SecurityFunctionalityKeys` aparece en todas las Trns.
- `SecGAMIsAuthByFunctionalityKey` es una de las infra-procedures más llamadas (157×).
- Cada acción se valida contra el GAM antes de ejecutarse.

### 📜 Audit trail (OBLIGATORIO)
- Tabla `WWP_Entity` **escrita por 20 procesos**.
- Patrón universal: toda `Transaction` dispara `LoadAudit<Nombre>.Call(...)` + `AuditTransaction.Call(...)`.
- **Riesgo de migración:** si el stack target no replica este audit trail transparente, se pierde observabilidad. No es opcional.

### ⚙️ Configuración (ANTI-PATTERN)
- Tabla `Configuracion` **escrita por 16 procesos distintos**.
- Atípico. Probablemente se usa como estado compartido / flags / contadores disfrazado de config.
- **Recomendación de migración:** NO portarla 1:1. Desacoplar en features flags / settings / runtime counters según uso.

### 📧 Notificaciones
- Módulos: `WWPBaseObjects.Mail`, `WWPBaseObjects.SMS`, `WWPBaseObjects.Notifications.Common/Web`.
- Patrón `WWP_SendNotification` aparece en varios procesos (especialmente `Embarque`).
- 3 canales: mail, SMS, web push.

### 📊 Reportes
- Módulos: `Reportes` (71 objetos), `Informes`, `GeneXusReporting` (para los viewers).
- `RptPrensado`, `RptExtrusion`, etc. — reportes PDF.
- `TableroDirectivo*` — dashboards ejecutivos.
- Muchos usan `QueryViewer*` SDTs del framework GeneXus.

---

## 👥 Quién usa qué (roles inferidos)

| Rol *(inferido del menú + procesos)* | Módulos principales | Menús |
|---|---|---|
| **Operador de extrusión** | Produccion/Extrusión | Extrusión |
| **Operador de prensa** | Produccion/Prensado | Prensado |
| **Supervisor de producción** | Produccion (dashboards) | Producción, Reportes |
| **Inspector de calidad** | Calidad | Calidad, Trazabilidad |
| **Almacén / logística** | Existencia, Embarques | Inventario, Embarques |
| **Staff comercial** | SAE | Catálogos SAE, Informes SAE |
| **Administrador** | Seguridad, admin | Seguridad, Configuración |
| **Impresión de etiquetas** | PrinterSD, admin | (accesos inline) |

---

## 🚧 Qué NO está en esta vista (gaps documentados)

| Gap | Qué significa | Cómo se resuelve |
|---|---|---|
| **Mobile** | 219 SDPanels + 46 WW.NativeMobile NO parseados | Falta `SDPanelParser` — la planta probablemente usa tablets en piso |
| **WebComponents** | 171 WebComponents NO parseados | Los dashboards son shells que usan WCs; el I/O real está ahí |
| **92 helpers runtime-bound** | `*WCGetFilterData` invocados por metadata, no por `.Call()` | Falta `WebComponentBindingParser` |
| **Carrete sin writers visibles** | R:3 / W:0 — nadie lo crea en clusters clusterizados | Probablemente mobile (gap 1) |
| **8 Trns untouched** | `BarCode`, `Documento`, `LoteReporte`, `PaletCarrete`, `PaletEtiquetaImpresa`, `UserCustomizations`, `WWP_Discussion*` | Dead code, o mobile-only |
| **Form layouts** | Los campos visibles exactos de cada pantalla | Phase 3.4 (no hecho) |

---

## 📖 Guía de lectura — qué archivo abrir para cada cosa

| Para entender... | Abrí... |
|---|---|
| El sistema en alto nivel | `_architecture.md` + `_llm_context.md` |
| Un concepto del negocio | `_domain_glossary.md` (75 entidades) |
| Un módulo funcional | `Modules/<Module>.md` |
| Un flujo específico end-to-end | `Processes/<proc_id>.md` + `.prompt.txt` |
| Cómo navega el usuario | `_menu.json` |
| Impacto de tocar una tabla | `_entity_process_matrix.csv` (fila = tabla) |
| Código real de un objeto | `{Procedures,Transactions,WebPanels,SDTs,DataProviders}/<Module>/<Name>.md` |
| Quién llama a X / X llama a quién | `_index.json` → el objeto → `callsTo`/`calledBy` |

---

## ✅ Con este mapa podés

- Ubicarte en cualquier parte del sistema en menos de 5 min.
- Saber a qué procesos afecta un cambio en cualquier entidad.
- Identificar qué partes son migración directa vs. necesitan rediseño (`Configuracion`, audit trail).
- Pedir a una IA migración de UN loop completo (ej. Loop 1 — producción) con los bundles ya preparados.
