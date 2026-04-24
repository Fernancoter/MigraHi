# Procedure: SDBobinaEnPrensado

- **Module:** Produccion
- **Description:** SDBobina En Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| BobinaItem | Parameter | GX_SDT | out | Bobina Item |
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
	
	&BobinaId = 0
	
	for each DB.PrensadoBobina
		where PrensadoBobinaId > 0
		where PrensadoId = &PrensadoId
		where BobinaId > 0
		where BobinaEstado = EstadoBobina.EnPrensado
		
		&BobinaId = BobinaId
		&Bobina.Load(&BobinaId)
		
		&BobinaItem = New()
		&BobinaItem.FromJson(&Bobina.ToJson())
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&BobinaItem);
```

