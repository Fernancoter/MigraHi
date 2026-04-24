# DataProvider: PrensadoDelDiaDP

- **Module:** Produccion
- **Description:** Prensado Del Dia DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoFecha | Parameter | DATETIME | in | Prensado Fecha |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
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
	Where PrensadoFecha = &PrensadoFecha
	Where PrensadoPrensaId = &PrensaId
	Where PrensadoTurnoId = &TurnoId
	Where PrensadoProductoId = &ProductoId
	{
		PrensadoId = PrensadoId
		PrensadoPrensaId = PrensadoPrensaId
		PrensadoPrensaNombre = PrensadoPrensaNombre
		PrensadoTurnoId = PrensadoTurnoId
		PrensadoTurnoNombre = PrensadoTurnoNombre
		PrensadoFecha = PrensadoFecha
		PrensadoProductoId = PrensadoProductoId
		PrensadoProductoNombre = PrensadoProductoNombre
		PrensadoOperadorId = PrensadoOperadorId
		PrensadoOperadorNombre = PrensadoOperadorNombre
		PrensadoEstado = PrensadoEstado
		
		PrensadoTroquelId = PrensadoTroquelId
		PrensadoTroquelNombre = PrensadoTroquelNombre
		PrensadoHoraIniciaProceso = PrensadoHoraIniciaProceso
		PrensadoHoraFinProceso = PrensadoHoraFinProceso
		
		PrensadoLevasUnidadMedida = PrensadoLevasUnidadMedida
		PrensadoLevasKgEntrada = PrensadoLevasKgEntrada
		PrensadoLevasKgSalida = PrensadoLevasKgSalida
		PrensadoLevasGradosEntrada = PrensadoLevasGradosEntrada
		PrensadoLevasGradosSalida = PrensadoLevasGradosSalida
		
		PrensadoRodillosUnidadMedida = PrensadoRodillosUnidadMedida
		PrensadoRodillosKgEntrada = PrensadoRodillosKgEntrada
		PrensadoRodillosKgSalida = PrensadoRodillosKgSalida
		PrensadoRodillosGradosEntrada = PrensadoRodillosGradosEntrada
		PrensadoRodillosGradosSalida = PrensadoRodillosGradosSalida

	}
}
```

### Rules (Rules)

```genexus
parm(in:&PrensadoFecha, in:&PrensaId, in:&TurnoId, in: &ProductoId);
```

