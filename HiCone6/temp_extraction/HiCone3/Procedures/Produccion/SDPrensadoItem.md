# Procedure: SDPrensadoItem

- **Module:** Produccion
- **Description:** SDPrensado Item
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| SDTPrensadoItem | Parameter | GX_SDT | out | SDTPrensado Item |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus
	
	&Prensado.Load(&PrensadoId)	
	&SDTPrensadoItem = New()
	
	//Generales
	&SDTPrensadoItem.PrensadoId = &Prensado.PrensadoId
	&SDTPrensadoItem.PrensadoFecha = &Prensado.PrensadoFecha
	&SDTPrensadoItem.PrensadoPrensaId = &Prensado.PrensadoPrensaId
	&SDTPrensadoItem.PrensadoPrensaNombre = &Prensado.PrensadoPrensaNombre
	&SDTPrensadoItem.PrensadoTurnoId = &Prensado.PrensadoTurnoId
	&SDTPrensadoItem.PrensadoTurnoNombre = &Prensado.PrensadoTurnoNombre
	&SDTPrensadoItem.PrensadoProductoId = &Prensado.PrensadoProductoId
	&SDTPrensadoItem.PrensadoProductoNombre = &Prensado.PrensadoProductoNombre
	&SDTPrensadoItem.PrensadoOperadorId = &Prensado.PrensadoOperadorId
	&SDTPrensadoItem.PrensadoOperadorNombre = &Prensado.PrensadoOperadorNombre
	&SDTPrensadoItem.PrensadoTroquelId = &Prensado.PrensadoTroquelId
	&SDTPrensadoItem.PrensadoTroquelNombre = &Prensado.PrensadoTroquelNombre
	
	//Estado y Progreso
	&SDTPrensadoItem.PrensadoEstado = &Prensado.PrensadoEstado
	&SDTPrensadoItem.PrensadoHoraIniciaProceso = &Prensado.PrensadoHoraIniciaProceso
	&SDTPrensadoItem.PrensadoHoraFinProceso = &Prensado.PrensadoHoraFinProceso
	&SDTPrensadoItem.PrensadoMeta = &Prensado.Produccion.PrensadoMeta
	&SDTPrensadoItem.PrensadoMotivoAnticipado = &Prensado.PrensadoMotivoAnticipado
	
	//Levas
	&SDTPrensadoItem.PrensadoLevasUnidadMedida = &Prensado.PrensadoLevasUnidadMedida
	&SDTPrensadoItem.PrensadoLevasKgEntrada = &Prensado.PrensadoLevasKgEntrada
	&SDTPrensadoItem.PrensadoLevasKgSalida = &Prensado.PrensadoLevasKgSalida
	&SDTPrensadoItem.PrensadoLevasGradosEntrada = &Prensado.PrensadoLevasGradosEntrada
	&SDTPrensadoItem.PrensadoLevasGradosSalida = &Prensado.PrensadoLevasGradosSalida
	
	//Rodillos
	&SDTPrensadoItem.PrensadoRodillosUnidadMedida = &Prensado.PrensadoRodillosUnidadMedida
	&SDTPrensadoItem.PrensadoRodillosKgEntrada = &Prensado.PrensadoRodillosKgEntrada
	&SDTPrensadoItem.PrensadoRodillosKgSalida = &Prensado.PrensadoRodillosKgSalida
	&SDTPrensadoItem.PrensadoRodillosGradosEntrada = &Prensado.PrensadoRodillosGradosEntrada
	&SDTPrensadoItem.PrensadoRodillosGradosSalida = &Prensado.PrensadoRodillosGradosSalida
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&SDTPrensadoItem);
```

