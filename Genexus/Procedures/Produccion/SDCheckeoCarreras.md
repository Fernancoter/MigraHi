# Procedure: SDCheckeoCarreras

- **Module:** Produccion
- **Description:** SDCarreras Proceso BD
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EstadoCarrera | Parameter | VARCHAR | in | Estado Carrera |
| isOK | Parameter | Boolean | out | is OK |
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
	&isOK = true
        
	for each DB.Carrera
		where CarreraId > 0
		where InicioPBPrensadoId = &PrensadoId
		where CarreraEstado = &EstadoCarrera
		&isOK = false
		Exit	
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&EstadoCarrera, out:&isOK);
```

