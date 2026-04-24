# Procedure: CarrerasValidas

- **Module:** Produccion
- **Description:** Carreras Validas
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Carreras | Variable | NUMERIC |  | Carreras |
| isOK | Parameter | Boolean | out | is OK |
| SDTCarrera | Parameter | GX_SDT | in | SDTCarrera |
| SDTCarreraItem | Variable | GX_SDT |  | SDTCarrera Item |
| Validas | Variable | NUMERIC |  | Validas |
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
	&Carreras = 0
	&Validas = 0
	
	for &SDTCarreraItem in &SDTCarrera
		if(&SDTCarreraItem.CarreraEstado = EstadoCarrera.Validada)
			&Validas += 1
		endif
	
	        &Carreras += 1
	endfor
 
        if(Not &Carreras = &Validas)
	      &isOK = false
              msg('Debe validar todas las carreras antes de finalizar el Prensado')
	endif
```

### Rules (Rules)

```genexus
parm(in:&SDTCarrera, out:&isOK);
```

