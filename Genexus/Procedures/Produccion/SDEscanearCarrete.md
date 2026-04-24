# Procedure: SDEscanearCarrete

- **Module:** Produccion
- **Description:** SDEscanear Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Variable | NUMERIC |  | Carrete Id |
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| CarreteItem | Parameter | GX_SDT | out | Carrete Item |
| CarreteNoSerie | Parameter | VARCHAR | in | Carrete No Serie |
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
	
	for each DB.Carrete
		where CarreteId > 0
		where CarreteNoSerie.Trim() = &CarreteNoSerie.Trim()
		&CarreteId = CarreteId
		&Carrete.Load(&CarreteId)
		
		&CarreteItem = New()
		&CarreteItem.FromJson(&Carrete.ToJson())
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&CarreteNoSerie, out:&CarreteItem);
```

