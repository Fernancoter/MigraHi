# DataProvider: PrensadoTerminadoDP

- **Module:** Produccion
- **Description:** Prensado Terminado DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Fecha | Parameter | DATE | in | Fecha |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
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
	where PrensadoFecha.ToDate() = &Fecha when Not &Fecha.IsEmpty()
	where PrensadoPrensaId = &PrensaId when &PrensaId > 0
	where PrensadoEstado = EstadoPrensado.Terminado
	{
		PrensadoId = PrensadoId
		PrensadoPrensaId = Reportes.PrensadoPrensaId
		PrensadoPrensaNombre = PrensadoPrensaNombre
		PrensadoTurnoId = PrensadoTurnoId
		PrensadoTurnoNombre = PrensadoTurnoNombre
		PrensadoProductoId = PrensadoProductoId
		PrensadoProductoNombre = WWPBaseObjects.PrensadoProductoNombre
		PrensadoOperadorId = PrensadoOperadorId
		PrensadoOperadorNombre = DB.PrensadoOperadorNombre
		PrensadoHoraIniciaProceso = PrensadoHoraIniciaProceso
		PrensadoHoraFinProceso = PrensadoHoraFinProceso
		BobinaDesmontadaId = SDBobinaDesmontada.Udp(WWPBaseObjects.Notifications.PrensadoId)
	}
}
```

### Rules (Rules)

```genexus
parm(in:&Fecha, in:&PrensaId);
```

