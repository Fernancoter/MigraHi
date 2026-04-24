# Procedure: PrensadoInterrupEnCurso

- **Module:** Reportes
- **Description:** Prensado Interrup En Curso
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EnCurso | Parameter | Boolean | out | En Curso |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
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
	
	for each DB.PrensadoInterrupcion
		where PrensadoInterrupcionId > 0
		where PrensadoId = &PrensadoId
		where InterrupcionId > 0
		where InterrupcionConcluida = false
		&EnCurso = true
		Exit
	when none
		&EnCurso = false
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&EnCurso);
```

