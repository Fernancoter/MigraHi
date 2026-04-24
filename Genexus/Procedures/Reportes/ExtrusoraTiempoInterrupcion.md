# Procedure: ExtrusoraTiempoInterrupcion

- **Module:** Reportes
- **Description:** Extrusora Tiempo Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| Fecha | Parameter | DATE | in | Fecha |
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
	
	for each DB.Extrusion
		where ExtrusionId > 0
		where ExtrusionExtrusoraId = &ExtrusoraId
		where ExtrusionTurnoId = &TurnoId
		where ExtrusionFecha.ToDate() = &Fecha
		&ExtrusionId = ExtrusionId
		
		do 'TiempoInterrupcion'
	endfor
	
	if(&Tiempo > 0)
		&TiempoHr = (&Tiempo/3600)
	endif
	
	Sub 'TiempoInterrupcion'
		for each DB.ExtrusionInterrupcion
			where ExtrusionInterrupcionId > 0
			where ExtrusionId = &ExtrusionId
			where InterrupcionId > 0
			where InterrupcionConcluida = true
			
			&Tiempo += DB.DB.InterrupcionTiempo
		endfor
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&Fecha, in:&ExtrusoraId, in:&TurnoId, out:&TiempoHr);
```

