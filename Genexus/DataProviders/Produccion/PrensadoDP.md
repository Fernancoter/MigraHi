# DataProvider: PrensadoDP

- **Module:** Produccion
- **Description:** Prensado DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Asignado | Parameter | Boolean | in | Asignado |
| Fecha | Parameter | DATE | in | Fecha |
| OperadorId | Parameter | NUMERIC | in | Operador Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTPrensado
{       
	

//	SDTPrensadoItem
//	where PrensadoId > 0
//	where PrensadoOperadorId = &OperadorId and PrensadoEstado in (EstadoPrensado.Programado) when &Asignado = true and &OperadorId > 0
//	where (PrensadoOperadorId.IsNull() or PrensadoOperadorId <> &OperadorId) and PrensadoEstado in (EstadoPrensado.Programado, EstadoPrensado.Intermedio) when &Asignado = false and &OperadorId > 0
//	where PrensadoPrensaId = &PrensaId when &PrensaId > 0 and &Asignado = false
//	where PrensadoTurnoId = &TurnoId when &TurnoId > 0 and &Asignado = false
//	where PrensadoFecha.ToDate() = &Fecha.ToDate() when not &Fecha.IsEmpty()
	
	SDTPrensadoItem
	where PrensadoId > 0
	where PrensadoEstado in (EstadoPrensado.Programado, EstadoPrensado.Intermedio)
	where PrensadoPrensaId = &PrensaId when &PrensaId > 0
	where PrensadoTurnoId = &TurnoId when &TurnoId > 0
	where PrensadoFecha.ToDate() = &Fecha
	{

		PrensadoId = PrensadoId
		PrensadoFecha = PrensadoFecha
		PrensadoPrensaId = PrensadoPrensaId
		PrensadoPrensaNombre = PrensadoPrensaNombre
		PrensadoTurnoId = PrensadoTurnoId
		PrensadoTurnoNombre = PrensadoTurnoNombre
		PrensadoProductoId = PrensadoProductoId
		PrensadoProductoNombre = PrensadoProductoNombre
		PrensadoEstado = PrensadoEstado
		
		
//		PrensadoOperadorId = PrensadoOperadorId
//		PrensadoOperadorNombre = PrensadoOperadorNombre
		
//		PrensadoTroquelId = PrensadoTroquelId
//		PrensadoTroquelNombre = PrensadoTroquelNombre
//		PrensadoHoraIniciaProceso = PrensadoHoraIniciaProceso
//		PrensadoHoraFinProceso = PrensadoHoraFinProceso
//		PrensadoMeta = PrensadoMeta
//		PrensadoMotivoAnticipado = PrensadoMotivoAnticipado
		
//		PrensadoLevasUnidadMedida = PrensadoLevasUnidadMedida
//		PrensadoLevasKgEntrada = PrensadoLevasKgEntrada
//		PrensadoLevasKgSalida = PrensadoLevasKgSalida
//		PrensadoLevasGradosEntrada = PrensadoLevasGradosEntrada
//		PrensadoLevasGradosSalida = PrensadoLevasGradosSalida
//		
//		PrensadoRodillosUnidadMedida = PrensadoRodillosUnidadMedida
//		PrensadoRodillosKgEntrada = PrensadoRodillosKgEntrada
//		PrensadoRodillosKgSalida = PrensadoRodillosKgSalida
//		PrensadoRodillosGradosEntrada = PrensadoRodillosGradosEntrada
//		PrensadoRodillosGradosSalida = PrensadoRodillosGradosSalida
	}
}
```

### Rules (Rules)

```genexus
//parm(in:&OperadorId, in:&PrensaId, in:&TurnoId, in:&Fecha, in:&Asignado);
//parm(in:&PrensaId, in:&TurnoId, in:&Fecha);
parm(in:&PrensaId, in:&TurnoId, in:&Fecha);
```

