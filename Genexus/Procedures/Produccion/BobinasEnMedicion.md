# Procedure: BobinasEnMedicion

- **Module:** Produccion
- **Description:** Bobinas En Medicion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTBobina | Parameter | GX_SDT | in | SDTBobina |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| isOK | Parameter | Boolean | out | is OK |
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
	
	//Cambiar estado de las bobinas En Proceso -: En Medición
	For &SDTBobinaItem in &SDTBobina
		
	      if(&SDTBobinaItem.BobinaEstado = EstadoBobina.EnMedicion)
		      &isOK = false
		      Exit
	      endif
	Endfor

        if(Not &isOK)
		msg('Debe validar las bobinas que estan medición')
        endif
```

### Rules (Rules)

```genexus
parm(in:&SDTBobina, out:&isOK);
```

