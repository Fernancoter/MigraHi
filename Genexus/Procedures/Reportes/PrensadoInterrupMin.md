# Procedure: PrensadoInterrupMin

- **Module:** Reportes
- **Description:** Prensado Interrup Min
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| TiempoMin | Parameter | NUMERIC | out | Tiempo Min |
| Tiempo | Variable | NUMERIC |  | Tiempo |
| InterrupcionConcluida | Variable | Boolean |  | Interrupcion Concluida |
| FechaHoraRegistro | Variable | DATETIME |  | Fecha Hora Registro |
| Now | Variable | DATETIME |  | Now |
| DiffProgreso | Variable | NUMERIC |  | Diff Progreso |
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
	
	for each DB.PrensadoInterrupcion
		where PrensadoInterrupcionId > 0
		where PrensadoId = &PrensadoId
		where InterrupcionId > 0
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
parm(in:&PrensadoId, out:&TiempoMin);
```

