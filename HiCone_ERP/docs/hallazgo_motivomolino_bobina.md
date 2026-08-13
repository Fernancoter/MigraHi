# Hallazgo: `MotivoMolino` (Bobina) no coincide con el sistema legado

## Estado
Documentado, **no implementado**. Pendiente de confirmar las etiquetas exactas en español antes de tocar código.

## Qué es
Campo de `Bobina` que registra por qué una bobina se envió al molino (reciclaje) en vez de contarse como producto terminado — explica por qué esa bobina se convirtió en merma.

## Problema encontrado
Tanto el enum C# actual (`HiCone.Domain.Enums.MotivoMolino`) como las opciones del `<select>` en el frontend (`bobinas-list.ts` / `extrusion-operador.html`) **no coinciden con el sistema legado real**, y tampoco coinciden entre sí:

| Fuente | Valores |
|---|---|
| Enum C# actual (`ProduccionEnums.cs`) | `NoAplica=0, DefectoCalibre=1, DefectoBobina=2, DefectoCarrete=3, FueraDePeso=4, DanioFisico=5` |
| `<select>` en Angular (`extrusion-operador.html`) | 11 opciones de texto libre: "Carbón", "Contaminación Carbonización (piojo limpieza)", "Contaminación Carbonización Suelta (piojo)", "Calibre Alto (mancha con textura)", "Calibre Bajo (mancha falta de material)", "Raya Por Obstrucción En Labio", "Marca De Rodillo Por Suciedad De Cera/Polvo", "Hoyos Bobina Y Falta De Material", "Mezcla De Resina (Contaminación)", "Hoyo Por Carbón O Grumo", "Pruebas" |
| **Legado real (GeneXus)** | `NoAplica`, `FallaMecanica`, `LimpiezaContaminacion` — **solo 3 valores** |

Ninguna de las dos versiones nuevas fue reconstruida a partir del legado; ambas parecen haber sido inventadas en algún punto de la migración.

## Evidencia (código legado real, compilable)
Extraído de `MigraHi/HiCone6/temp_extraction/HiCone3/WebPanels/Produccion/ExtrusionDelDiaBobinas.md` (el panel real "Extrusión del Día", equivalente legado de la pantalla de operador actual). El código GeneXus solo compila si `MotivoMolino.FallaMecanica` y `MotivoMolino.LimpiezaContaminacion` son nombres reales del dominio:

```genexus
### SDTBobina__BobinaKg.ControlValueChanged() (Event)
if(&SDTBobina.CurrentItem.BobinaKg > 0)
    &SDTBobina.CurrentItem.BobinaMermaKg = 0
    &SDTBobina.CurrentItem.BobinaMotivoMolino = MotivoMolino.NoAplica
    SDTBobina__BobinaMotivoMolino.Enabled = false
endif

### SDTBobina__BobinaMermaKg.ControlValueChanged() (Event)
if(&SDTBobina.CurrentItem.BobinaMermaKg > 0)
    &SDTBobina.CurrentItem.BobinaKg = 0
    &SDTBobina.CurrentItem.BobinaMotivoMolino = MotivoMolino.NoAplica
    SDTBobina__BobinaMotivoMolino.Enabled = true
endif

### SDTBobina__BobinaMotivoMolino.ControlValueChanged (Event)
&MotivoMolino = &SDTBobina.CurrentItem.BobinaMotivoMolino
Do Case
       /*Case &MotivoMolino = MotivoMolino.LimpiezaContaminacion
            SDTBobina__BobinaObservaciones.SetFocus()
       Case &MotivoMolino = MotivoMolino.FallaMecanica
            SDTBobina__BobinaObservaciones.SetFocus()*/
       Case &MotivoMolino = MotivoMolino.NoAplica
            &SDTBobina.CurrentItem.BobinaMermaKg = 0
            SDTBobina__BobinaKg.SetFocus()
EndCase
```

## Regla de negocio real del legado
- Si el operador captura **Kg** (bobina buena) → se fuerza `MotivoMolino = NoAplica` y el campo se **deshabilita**.
- Si el operador captura **MermaKg** (bobina rechazada) → el campo se **habilita** para que el operador elija entre `FallaMecanica` / `LimpiezaContaminacion`.
- Curiosidad: en el propio legado los casos de `FallaMecanica`/`LimpiezaContaminacion` están comentados (`/* ... */`) — nunca disparaban ninguna acción adicional más allá de guardarse el valor. El único caso realmente activo es `NoAplica`.

## Lo que NO se pudo confirmar
Se adjuntó una copia aislada de `GX_KB_HiCone6.mdf` (Knowledge Base de GeneXus) para consultar la definición exacta del dominio, pero esa base solo guarda **referencias estructurales** (`ATTRIBUTE.value_list` vacío para `BobinaMotivoMolino`), no el texto literal en español ni los códigos numéricos internos que GeneXus asignaba. No se encontró ninguna otra fuente en el repositorio con las etiquetas exactas.

- **Etiquetas en español exactas**: no confirmadas. Traducción literal razonable de los identificadores: "Falla Mecánica" y "Limpieza / Contaminación" — pero esto es una interpretación, no un hecho verificado.
- **Códigos numéricos internos de GeneXus**: no relevantes para el nuevo sistema (el enum C# define su propia numeración).

## Cómo se investigó
1. Búsqueda de texto en `MigraHi/HiCone6/temp_extraction/HiCone3/` (extracción ya existente en JSON/Markdown de los objetos GeneXus).
2. Copia temporal de `GX_KB_HiCone6.mdf`/`.ldf` adjuntada como base SQL Server aislada (`GX_KB_Investigacion`, separada de `HiCone_ERP_V3`) para consultar metadatos — sin modificar la base original ni la de producción. Base desconectada y eliminada al terminar.
3. Nota: quedó una copia de ~220 MB de esos archivos en `C:\SQLTemp` que el entorno de trabajo no permitió borrar automáticamente; es inerte (base ya desconectada), se puede eliminar manualmente si se desea liberar espacio.

## Próximo paso (cuando se autorice)
1. Confirmar con el usuario/negocio las etiquetas exactas en español (o aceptar la traducción literal propuesta).
2. Redefinir el enum `MotivoMolino` en C# a `NoAplica / FallaMecanica / LimpiezaContaminacion` (migración de BD aditiva — la tabla `bobinas` no tiene datos reales de producción todavía, riesgo bajo).
3. Reemplazar el `<select>` de 11 opciones inventadas en el frontend por las 3 reales.
4. Conectar el envío real en `guardarCambiosModal()` de `bobinas-list.ts` (actualmente fijo en `0`/`NoAplica` porque no había forma correcta de mapear el `<select>` inventado al enum).
