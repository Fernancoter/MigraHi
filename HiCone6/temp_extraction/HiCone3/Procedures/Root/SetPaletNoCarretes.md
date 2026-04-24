# Procedure: SetPaletNoCarretes

- **Module:** 
- **Description:** Set Palet No Carretes
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PaletNoCarretes | Variable | NUMERIC |  | Palet No Carretes |
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
&PaletNoCarretes = count(PaletCarreteId, PaletId = &PaletId)
for each DB.Palet
	Where PaletId = &PaletId
	PaletNoCarretes = &PaletNoCarretes
	
	Exit
Endfor

commit
```

### Rules (Rules)

```genexus
parm(in:&PaletId);
```

