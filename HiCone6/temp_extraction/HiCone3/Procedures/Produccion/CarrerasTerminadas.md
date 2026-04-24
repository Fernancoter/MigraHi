# Procedure: CarrerasTerminadas

- **Module:** Produccion
- **Description:** Carreras Terminadas
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraNo | Variable | NUMERIC |  | Carrera No |
| isOK | Parameter | Boolean | out | is OK |
| SDTCarrera | Parameter | GX_SDT | in | SDTCarrera |
| SDTCarreraItem | Variable | GX_SDT |  | SDTCarrera Item |
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
	&CarreraNo = 0
	
	for &SDTCarreraItem in &SDTCarrera
		if(&SDTCarreraItem.CarreraEstado = EstadoCarrera.Terminada)
			&CarreraNo = &SDTCarreraItem.CarreraNo
			&isOK = false
			Exit
		endif
	endfor
 
        if(Not &isOK)
              msg('Debe validar la carrera #' + &CarreraNo.ToString())
	endif
```

### Rules (Rules)

```genexus
parm(in:&SDTCarrera, out:&isOK);
```

