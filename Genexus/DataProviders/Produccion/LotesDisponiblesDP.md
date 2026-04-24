# DataProvider: LotesDisponiblesDP

- **Module:** Produccion
- **Description:** Lotes Disponibles DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTLotes
{
	SDTLotesItem
	Order LoteFechaRegistro
	Where LoteId > 0
	Where LoteConsumido = False
	
	
	{
		LoteId = LoteId
		LoteEmbarque = LoteEmbarque
		}
}
```

