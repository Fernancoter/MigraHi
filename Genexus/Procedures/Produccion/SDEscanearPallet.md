# Procedure: SDEscanearPallet

- **Module:** Produccion
- **Description:** SDEscanear Pallet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletId | Variable | NUMERIC |  | Palet Id |
| PaletItem | Parameter | GX_SDT | out | Palet Item |
| PaletNoSerie | Parameter | VARCHAR | in | Palet No Serie |
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
	
	for each DB.Palet
		where PaletId > 0
		where PaletNoSerie.Trim() = &PaletNoSerie.Trim()
		&PaletId = PaletId
		
		&Palet.Load(&PaletId)
		&PaletItem = New()
		&PaletItem.FromJson(&Palet.ToJson())
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PaletNoSerie, out:&PaletItem);
```

