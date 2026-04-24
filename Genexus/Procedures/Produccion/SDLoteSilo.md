# Procedure: SDLoteSilo

- **Module:** Produccion
- **Description:** SDLote Silo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SiloId | Variable | NUMERIC |  | Silo Id |
| LoteEmbarque | Parameter | VARCHAR | out | Lote Embarque |
| LoteId | Parameter | NUMERIC | in | Lote Id |
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
for each
	
	where LoteId = &LoteId
	
	&LoteEmbarque = LoteEmbarque
	Exit
endfor
```

### Rules (Rules)

```genexus
parm(in:&LoteId, out:&LoteEmbarque);
```

