# Procedure: ExtrusionInterrupEnCurso

- **Module:** Reportes
- **Description:** Extrusion Interrup En Curso
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EnCurso | Parameter | Boolean | out | En Curso |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
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
	
	for each DB.ExtrusionInterrupcion
		where ExtrusionInterrupcionId > 0
		where ExtrusionId = &ExtrusionId
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
parm(in:&ExtrusionId, out:&EnCurso);
```

