# Handoff — per-module flow diagrams (para continuar mañana)

> Snapshot del reporte de la sesión que generó `Modules/<Module>.flow.md` para los 34 módulos. Guardado para no perder contexto.
> Commits: `52d4921` (add) + `24f84e9` (fix: hard-cap).

---

## TL;DR del estado

- **34 archivos `*.flow.md`** en `c:\KBs\HiCone3\output\HiCone3\Modules\` — uno por módulo.
- Generador: [`GXKBScanner/Scripts/generate-module-flows.ps1`](../GXKBScanner/Scripts/generate-module-flows.ps1), idempotente, corre en ~3 s.
- Template canónico: `Calidad.flow.md` (hand-crafted, preservado como referencia).
- 5 samples representativos committeados en [`docs/samples/Modules/`](samples/Modules/): `admin`, `Embarques`, `DB`, `Produccion`, `GeneXus.Common`.

---

## 🔴 Pendiente para mañana — ÁREA GROUPING en mega-módulos

**El spec explícito de 1.4 pedía:**
> Módulos muy grandes (≥100 objetos) — Produccion, WWPBaseObjects:
> Diagrama general agrupa por ÁREA funcional. Usar subgraphs adicionales.
> Ej. en Produccion: Extrusión, Prensado, Inventario, Dashboards.

**No implementado en esta pasada.** Los 3 afectados:
- `Produccion` (392 obj, 47 procesos) — prioridad alta, es el más denso
- `DB` (240 obj, 53 Trns) — el hub de masters
- `WWPBaseObjects` (128 obj) — probablemente quede como infra con nota

### Propuesta de reglas de agrupación (a discutir)

**Para Produccion** — agrupar por prefijo de nombre + menú path:

| Área sugerida | Regla (nombre empieza con / contiene) |
|---|---|
| Extrusión | `Extrusion*`, `Extrusora*`, `InicioExtrusion`, `vwAnaliticaBobina` |
| Prensado | `Prensado*`, `Prensa*`, `Carrera*`, `InicioPrensado`, `vwAnaliticaPrensado`, `vwAnaliticaCarrete` |
| Inventario | `listarInventario*`, `Silo*`, `Lote*`, `InicioInventario` |
| Catálogos | `listarTurnos`, `listarOperador`, `listarProductos`, `listarTroquel`, `listarProductoCategoria`, `listarExtrusora*`, `listarPrensas`, `listarPrensaProducto`, `listarProductoTerminado` |
| Dashboards | `Inicio*`, `TableroDirectivo*`, `TurnosPorSemana*` |
| Mobile handlers | `SD[A-Z].*` (prefijo SD + PascalCase) |
| Helpers | Everything else (colapsado como nodo agregado) |

**Para WWPBaseObjects** — es infra pero no pura; el script actual lo trata como "módulo normal" y emite un diagrama denso. Opciones:
1. Tratar como pure-infra (solo nota como los GeneXus.*)
2. Agrupar por función: Audit, GridState, ColumnSelector, Export helpers, Import helpers, Notifications (bridges)

Yo voto opción 1 — WWPBaseObjects es framework DVelop, no dominio.

**Para DB** — no es realmente mega-módulo desde el punto de vista de flujo (las 53 Trns son entidades data-only). Opciones:
1. Agrupar por familia semántica: Bobina-family, Carrete-family, Extrusion-family, Prensado-family, Embarque-family, SAE-family, Seguridad-family
2. Dejar el flat-20 actual y agregar una tabla "familia → Trns" arriba del diagrama

Yo voto opción 2 — más honesto; DB no tiene flujo real, solo CRUD distribuido.

### Tareas concretas si querés implementarlo

1. Agregar función `Assign-Area($name, $module)` en [`generate-module-flows.ps1`](../GXKBScanner/Scripts/generate-module-flows.ps1), después de línea ~180 (`Make-NodeLine`), que retorna string de área basado en las reglas.
2. Modificar el bloque del `subgraph MOD` para iterar por área:
   ```powershell
   $byArea = Group by Assign-Area
   foreach ($area in $areasOrderedList) {
       subgraph MOD_$area["$area"]
       ...nodos de esa área...
       end
   }
   ```
3. Para `WWPBaseObjects` agregar a la lista de pure-infra modules en `Is-PureInfraModule`.
4. Regenerar los 3 archivos afectados. Verificar que los nodos de cada área no excedan 8-10 (subcap adicional para legibilidad).

**Commit esperado:** `flow: functional-area grouping for mega-modules (Produccion, DB)`.

---

## Estado actual del output (para context tomorrow)

### Conteo de nodos en diagramas generales

| Métrica | Valor |
|---|---|
| Módulos con diagrama de flujo | 21 |
| Módulos pure-infra (solo nota) | 12 |
| Nodos promedio en `MOD` subgraph | 18.9 |
| Min / Max | 4 / 20 (hard cap) |
| Módulos que violan el cap de 20 | **0 / 33** ✅ |

### Pure-infra (12 módulos con solo nota explicativa)

```
GeneXus.Common             GeneXus.SD.Media        GeneXus.Server
GeneXus.Common.Notifications GeneXus.SD.Notifications GeneXus.Social
GeneXus.OAuth.v2           GeneXus.SD.Store        GeneXusReporting
GeneXus.SD                 GeneXus.SD.Synchronization GeneXusUnanimo
```

Criterio: 100 % SDTs, O módulo `GeneXus.*` sin Trns ni WebPanels.

### 3 samples post-fix (rendering check pendiente)

| Archivo | Tamaño | Nodos MOD | Procesos | Estado |
|---|---|---|---|---|
| `admin.flow.md` | 4.9 KB | 4 | 1 | ✅ Legible |
| `Embarques.flow.md` | 20 KB | 20 | 8 | ✅ Legible (denso) |
| `DB.flow.md` | 67 KB | 20 | 57 | ⚠️ Top-diagram denso — candidato área grouping |
| `Produccion.flow.md` | 61 KB | 20 | 47 | ⚠️ Top-diagram denso — candidato área grouping |
| `GeneXus.Common.flow.md` | 2.8 KB | 0 | 0 | ✅ Nota pure-infra |

---

## Bugs corregidos durante la sesión

1. **`$pid` PS automatic var** — renamed local `$pid` a `$peerId` (segunda vez, ya es patrón).
2. **`Group-Object` sobre hashtables en PS 5.1** devolvía grupos vacíos — reemplazado por conteo manual.
3. **O(n²) intra-module connectivity** colgaba el script en DB (240 obj). Reemplazado por single-pass sort por degree.
4. **Trim-logic no quitaba Trns** cuando había >20 Trns (módulos como DB con 53 Trns) — reemplazado por priority-based fill con truncation dura al cap de 20.

---

## Verificaciones que ya pasaron

| Check | Resultado |
|---|---|
| 34 archivos `*.flow.md` existen | ✅ |
| Mermaid fence balance | 0 desbalanceados |
| Nodos en `MOD` subgraph ≤ 20 | **0 violaciones** |
| Pure-infra modules emiten nota (no diagrama) | 12 / 12 |
| Cross-module tables tienen top-3 reales | ✅ |
| Template del sample Calidad preservado | ✅ |

---

## Siguientes pasos posibles (priorizar mañana)

1. **Área grouping** (arriba). El único TODO declarado del spec.
2. **Narrative pass** — la sección 4 del spec original mencionaba "pasada de narrativa posterior" sobre los bundles `Processes/<id>.prompt.txt`. No se arrancó; los bundles ya están listos.
3. **Phase 3.1 / 3.3 / 3.4** — la resolución de tipos de atributos ("Resolved via KB"), recuperación de RTF truncado, formLayout mínimo para WebPanels/Transactions, y narrativa one-liner por objeto.
4. **Fix el gap de `WebComponent` tracking** — el scanner actual no parsea WebComponents; muchos panels delegan I/O a WCs que quedan invisibles. Agregar `WebComponentParser` desbloquearía dashboards como `InicioProduccion` que hoy aparecen con `tablesRead/Written` vacíos.
5. **Mobile (SDPanel)** — diferido desde Phase 1.1; los 219 SDPanels + sus handlers `SD*` son el gap mayor de cobertura.

---

## Comandos útiles para continuar

```powershell
# Regenerar flow.md si cambia la lógica:
pwsh -File "C:\Users\GERARDO\Desktop\Genexus code\GXKBScanner\Scripts\generate-module-flows.ps1"

# Ver diff de un archivo regenerado contra samples committeados:
diff (cat "c:\KBs\HiCone3\output\HiCone3\Modules\Produccion.flow.md") (cat "C:\Users\GERARDO\Desktop\Genexus code\docs\samples\Modules\Produccion.flow.md")
```

```bash
# Contar nodos por módulo (sanity):
for f in /c/KBs/HiCone3/output/HiCone3/Modules/*.flow.md; do
  name=$(basename "$f" .flow.md)
  count=$(sed -n '/^    subgraph MOD/,/^    end$/p' "$f" | grep -cE '^    (T|WP|P|DP|S)_')
  printf "%-45s %s\n" "$name" "$count"
done | sort -k2 -n
```
