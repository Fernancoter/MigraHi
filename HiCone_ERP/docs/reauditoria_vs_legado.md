# Re-auditoría contra el sistema legado (GeneXus)

## Objetivo
Verificar, contra el código fuente real del sistema legado (extraído en `MigraHi/HiCone6/temp_extraction/HiCone3/`), que los enums y etiquetas usados/corregidos durante esta sesión no fueron inventados.

## Metodología
Búsqueda de referencias literales `Dominio.Valor` (ej. `EstadoBobina.Molino`) en el código GeneXus exportado a JSON/Markdown — estas solo existen en el texto si el compilador GeneXus las aceptó, así que son evidencia directa y confiable de los nombres reales del dominio. **No se modificó ningún archivo del sistema durante esta investigación**, solo lectura.

## Aclaración importante
La mayoría de los enums C# comparados aquí **ya existían en el código antes de esta sesión** — yo no los inventé, los encontré y los usé/corregí para que el frontend los reflejara correctamente. Lo que esta auditoría revela es si esos enums *preexistentes* coinciden con el legado real, no si yo inventé algo nuevo esta sesión (con la única excepción de `MotivoMolino`, documentado aparte en `hallazgo_motivomolino_bobina.md`).

---

## ✅ Coincidencias confirmadas (el trabajo de esta sesión está bien fundamentado)

| Enum | Legado real | C# actual | Veredicto |
|---|---|---|---|
| `ColorEstacion` | `SinAsignar` confirmado | `SinAsignar=0, Rojo=1, Azul=2...` | Sin evidencia de "Negro"; mi corrección de "Estación Negra"→"Estación Roja" es consistente con el nombre del enum, aunque no encontré confirmación literal de "Rojo" en el legado |
| `EstatusEmbarque` | `PorProgramar, Programado, Cancelado` confirmados | `PorProgramar=1, Programado=2, Cancelado=5` | 3 de 5 coinciden exactamente |
| `EstadoBobina` | `EnProceso, EnPrensado, Rechazada, Pausada, Desmontada, Transferida, Consumida, EnMedicion, Disponible, **Molino**` confirmados | Mismos 9 + `Molido` (yo no toqué esto) | **9 de 12 coinciden exactamente.** Confirma que mi decisión de NO cambiar "Molino"→"Molido" en `bobinas-list.ts` fue correcta — el legado usa literalmente "Molino" |
| `TipoPalet` (parcial) | `Externo` confirmado | `Externo=2` | Coincide |
| `EstadoCarrete` (parcial) | `EnProceso, Molino` confirmados | `EnProceso=1, Molino=4` | Coinciden esos 2 valores |
| `EstatusPalet` (parcial) | `EnEnsamble, Embarcado, Terminado` confirmados | `EnEnsamble=1, Embarcado=3, Terminado=2` | Coinciden esos 3 valores |
| `MotivoAnticipado`, `SiloVirgen`, `SiloMolido` (Bloque A de Extrusión) | Referenciados en `BobinaWWExport`, `InsertarManualenteBobinas`, etc. | Campos agregados en Bloque A | Los conceptos existen realmente en el legado |

---

## ⚠️ Divergencias encontradas (ya existían antes de esta sesión, no las introduje, pero quedan documentadas)

| Enum | Legado real | C# actual | Diferencia |
|---|---|---|---|
| `TipoPalet` | `Interno, Externo` | `Normal=1, Externo=2` | El legado llama "Interno" a lo que el C# actual llama "Normal" (mismo significado: producido internamente vs. escaneado de cliente externo — el propio comentario en el enum C# lo confirma) |
| `EstadoCarrete` | `Call, EnPalet, EnPaletDesconocido, EnProceso, EnRevision, Etiquetado, Etiquetar, Molino, Valido` (9 estados reales) | `EnProceso, Terminado, Rechazado, Molino` (4 estados) | El legado tiene un ciclo de vida **mucho más granular** (EnPalet/EnRevision/Etiquetado/Valido) que no existe en el C# actual. "Terminado" y "Rechazado" no aparecen en el legado con esos nombres |
| `EstatusPalet` | `Call, Embarcado, EnEnsamble, Etiquetando, Incompleto, Terminado` | `EnEnsamble, Terminado, Embarcado, Rechazado, Aprobado` | El legado tiene "Etiquetando"/"Incompleto" que no existen en el C# actual; el C# actual tiene "Rechazado"/"Aprobado" (probablemente agregados para el flujo de Calidad) que no aparecen en el legado |
| `EstatusReclamo` | Dominio real se llama **`EstadoReclamo`** (no "Estatus"), con solo `Abierto, Cerrado` confirmados | `EstatusReclamo`: `Abierto, EnProceso, Resuelto, Cerrado` | Nombre del dominio distinto + el legado parece tener solo 2 estados confirmados (aunque puede haber más no referenciados literalmente en el código muestreado) |
| `CarreteDefecto` (Calidad) | En el legado es una **tabla catálogo simple** (`CarreteDefectoId`, `CarreteDefectoNombre` — nada más) | En el C# actual es una **tabla de eventos** (`NoSerieCarrete`, `TipoDefecto`, `Descripcion`, `EvidenciaUrl`, `FechaReporte`, `ReportadoPor`) | Son conceptos distintos con el mismo nombre: el legado usa "CarreteDefecto" como catálogo de *tipos* de defecto; el C# actual lo usa para *registrar cada ocurrencia* de un defecto. El catálogo de tipos legado probablemente sea la fuente real de los valores de `TipoDefecto` (`Calibre/Peso/Espesor/DanioFisico/ContaminacionColor/Otro`), pero al ser datos de tabla (no código), no se pudieron verificar por este método |
| `EstadoExtrusion` / `EstadoPrensado` | `PorProgramar, Programada/Programado, EnProceso, Intermedia/Intermedio, Terminada/Terminado` | `Programada, EnProceso, Finalizada/Finalizado, Anticipada/Anticipado, Cancelada/Cancelado` | El legado usa "Terminada/Terminado" donde el C# actual usa "Finalizada/Finalizado"; el legado tiene "Intermedia/Intermedio" sin equivalente claro en C# actual |
| `EstatusEmbarque` | `EnProceso, Finalizado` (para las 2 fases finales) | `EnCarga, Cargado` | Mismo concepto (en proceso de carga → carga terminada), nombres distintos. Esto explica un bug que encontré y corregí: el código viejo de `embarques.component.ts` comparaba contra `'Finalizado'` (¡el nombre real del legado!) pero el C# actual nunca genera ese valor, solo `'Cargado'` — la comparación nunca podía ser verdadera |
| `EstadoExtrusora` / `EstadoPrensa` | Sin ninguna coincidencia encontrada | `Disponible, EnProceso, Detenida, Mantenimiento` | No encontré rastro de estos dominios en el legado extraído — es posible que el legado no tuviera un concepto de "estado de la máquina" tan explícito, o lo manejara con un simple booleano de actividad. Los campos que expuse en Bloque C/P-A (catálogos de Extrusora/Prensa) ya existían en las entidades C# antes de esta sesión; solo los conecté al API/frontend |

---

## Qué significa esto para el trabajo ya hecho

- **Ningún bug que corregí esta sesión se basó en un enum inventado por mí.** Los enums fueron encontrados tal cual estaban en el código (`ProduccionEnums.cs`, `CalidadEnums.cs`, `LogisticaEnums.cs`), definidos antes de que yo empezara a trabajar.
- Donde corregí etiquetas del frontend (Carrete, Palet, ColorEstacion), lo hice para que **coincidieran con el enum C# ya existente** — eso sigue siendo correcto en sí mismo (el frontend ya no muestra texto que no corresponde a ningún valor real).
- Lo que esta auditoría revela es una capa más profunda: **algunos de esos enums C# preexistentes divergen del legado real**, con distinta granularidad o nombres distintos. Esto no es un bug de esta sesión — es deuda de la migración original, anterior a mi trabajo.
- El caso más claro y accionable es `MotivoMolino`, ya documentado aparte, porque ahí sí encontré evidencia clara y suficiente para saber exactamente qué debería ser.
- Los demás casos (`EstadoCarrete`, `EstatusPalet`, `TipoPalet`, `EstatusReclamo`, `EstadoExtrusion`/`EstadoPrensado`) tocan lógica de negocio mucho más extendida (creación de carreras, flujo de calidad, ciclo de vida de reclamos) — cambiarlos ahora sería un rediseño estructural, no una corrección puntual. Quedan documentados aquí para que se decida si vale la pena alinear el ciclo de vida completo al legado en una fase futura.

## Estado
Solo documentación. **No se modificó ningún enum ni comportamiento como resultado de esta auditoría.**
