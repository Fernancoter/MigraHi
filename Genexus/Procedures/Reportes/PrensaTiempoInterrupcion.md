# Procedure: PrensaTiempoInterrupcion

- **Module:** Reportes
- **Description:** Prensa Tiempo Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| Fecha | Parameter | DATE | in | Fecha |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| Tiempo | Variable | NUMERIC |  | Tiempo |
| TiempoHr | Parameter | NUMERIC | out | Tiempo Hr |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
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
	
	&TiempoHr = 0
	
	for each DB.Prensado
		where PrensadoId > 0
		where PrensadoPrensaId = &PrensaId
		where PrensadoTurnoId = &TurnoId
		where PrensadoFecha.ToDate() = &Fecha
		&PrensadoId = PrensadoId
		
		do 'TiempoInterrupcion'
	endfor
	
	if(&Tiempo > 0)
		&TiempoHr = (&Tiempo/3600)
	endif
	
	Sub 'TiempoInterrupcion'
		for each DB.PrensadoInterrupcion
			where Reportes.PrensadoInterrupcionId > 0
			where PrensadoId = &PrensadoId
			where InterrupcionId > 0
			where InterrupcionConcluida = true
			
			&Tiempo += InterrupcionTiempo
		endfor
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&Fecha, in:&PrensaId, in:&TurnoId, out:&TiempoHr);
```

