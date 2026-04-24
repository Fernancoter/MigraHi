# Procedure: TotalPaletPrensado

- **Module:** Produccion
- **Description:** Total Palet Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| TotalPalets | Parameter | NUMERIC | out | Total Palets |
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
        
        &TotalPalets = 0
	
	for each DB.Palet
		where PaletId > 0
		where PaletPrensadoFinId = &PrensadoId
		where PaletEstatus in (EstatusPalet.Terminado, EstatusPalet.Embarcado)
		&TotalPalets += 1	
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&TotalPalets);
```

