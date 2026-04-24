# Procedure: ExtrusionInterrupMin

- **Module:** Reportes
- **Description:** Extrusion Interrup Min
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| TiempoMin | Parameter | NUMERIC | out | Tiempo Min |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| Tiempo | Variable | NUMERIC |  | Tiempo |
| InterrupcionConcluida | Variable | Boolean |  | Interrupcion Concluida |
| FechaHoraRegistro | Variable | DATETIME |  | Fecha Hora Registro |
| Now | Variable | DATETIME |  | Now |
| DiffProgreso | Variable | NUMERIC |  | Diff Progreso |
| ExtrusionInterrupcionId | Variable | NUMERIC |  | Extrusion Interrupcion Id |
| InterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
| IsOk | Variable | Boolean |  | Is Ok |
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
	&TiempoMin = 0
	&Now = Now()

	for each DB.ExtrusionInterrupcion
		where ExtrusionInterrupcionId > 0
		where ExtrusionId = &ExtrusionId
		where InterrupcionId > 0
		
		&ExtrusionInterrupcionId = ExtrusionInterrupcionId
		&InterrupcionId = InterrupcionId
		&InterrupcionConcluida = InterrupcionConcluida
		&FechaHoraRegistro = InterrupcionHoraInicio

		if &InterrupcionConcluida
			&Tiempo += InterrupcionTiempo
		else
			&DiffProgreso = &Now.Difference(&FechaHoraRegistro)
			&Tiempo += &DiffProgreso
		endif
	endfor

	if &Tiempo > 0
		&TiempoMin = trunc((&Tiempo/60),0)
	endif
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out:&TiempoMin);
```

