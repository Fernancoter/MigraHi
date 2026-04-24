# Procedure: EsCarreteEnPallet

- **Module:** 
- **Description:** Es Carrete En Pallet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PaletId | Parameter | NUMERIC | in | Palet Id |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| IsOk | Parameter | Boolean | out | Is Ok |
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
&IsOk = false

for each DB.PaletCarrete
	Where DB.PaletId = &PaletId
	Where CarreteId = &CarreteId
	&IsOk = true
	Exit
Endfor
```

### Rules (Rules)

```genexus
parm(in:&PaletId,in:&CarreteId,out:&IsOk);
```

