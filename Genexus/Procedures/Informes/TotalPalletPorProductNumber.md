# Procedure: TotalPalletPorProductNumber

- **Module:** Informes
- **Description:** Total Pallet Por Product Number
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductNumber | Parameter | VARCHAR | in | Product Number |
| Count | Parameter | NUMERIC | out | Count |
| ProductExist | Parameter | NUMERIC | in | Product Exist |
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
&Count = 0

for each
	Where ProductNumber = &ProductNumber
	if(ProductPiecesPlt>0)
		&Count = (&ProductExist * 1000)/ProductPiecesPlt
	else
		&Count = 0
	endif
	exit
	
endfor
```

### Rules (Rules)

```genexus
parm(in:&ProductNumber, in:&ProductExist, out: &Count);
```

