# Procedure: SDBobinasEnMedicion

- **Module:** Produccion
- **Description:** SDBobinas En Medicion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTBobina | Variable | GX_SDT |  | SDTBobina |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| isOK | Parameter | Boolean | out | is OK |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
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
	For each DB.Bobina
		where BobinaId > 0
		where ExtrusionId = &ExtrusionId
		&BobinaEstado = BobinaEstado
	        
		if(&BobinaEstado = EstadoBobina.EnMedicion)
		      &isOK = false
		      Exit
	        endif
	Endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out:&isOK);
```

