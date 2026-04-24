# Procedure: ObtenerCarreraNo

- **Module:** Produccion
- **Description:** Obtener Carrera No
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AuxPrensadoId | Variable | NUMERIC |  | Prensado Id |
| FechaIniciaProceso | Variable | DATETIME |  | Fecha Inicia Proceso |
| No | Parameter | NUMERIC | out | No |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoFecha | Variable | DATETIME |  | Prensado Fecha |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
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
&PrensaId = &Prensado.PrensadoPrensaId
&FechaIniciaProceso = &Prensado.PrensadoHoraIniciaProceso

&No = 0
for each DB.Prensado
	where PrensadoId > 0
	where PrensadoFecha.ToDate() = &FechaIniciaProceso.ToDate()
	where PrensadoPrensaId = &PrensaId
	&AuxPrensadoId = DB.PrensadoId
	
	for each DB.Carrera
		where CarreraId > 0
		where InicioPBPrensadoId = &AuxPrensadoId
		&No += 1
	endfor
endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&No);
```

