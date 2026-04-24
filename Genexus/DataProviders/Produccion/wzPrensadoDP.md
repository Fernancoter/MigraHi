# DataProvider: wzPrensadoDP

- **Module:** Produccion
- **Description:** wz Prensado DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Asignado | Variable | Boolean |  | Asignado |
| Fecha | Parameter | DATE | in | Fecha |
| OperadorId | Variable | NUMERIC |  | Operador Id |
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
	SDTPrensadoItem
	where PrensadoId > 0
	where PrensadoPrensaId = &PrensaId
	where PrensadoTurnoId = &TurnoId
	where PrensadoFecha.ToDate() = &Fecha
	where PrensadoEstado = EstadoPrensado.Programado
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
parm(in:&PrensaId, in:&TurnoId, in:&Fecha);
```

