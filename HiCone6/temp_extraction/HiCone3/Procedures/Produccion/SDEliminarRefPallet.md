# Procedure: SDEliminarRefPallet

- **Module:** Produccion
- **Description:** SDEliminar Ref Pallet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| PaletCarrete | Variable | GX_BUSCOMP |  | Palet Carrete |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PCId | Variable | NUMERIC |  | PCId |
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
        
	for each DB.PaletCarrete
		where PaletCarreteId > 0
		where PaletId = &PaletId
		where CarreteId = &CarreteId
	        &PCId = PaletCarreteId
		
	        &PaletCarrete.Load(&PCId)
			&PaletCarrete.Delete()
		Commit
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&CarreteId, in:&PaletId);
```

