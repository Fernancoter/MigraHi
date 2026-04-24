# DataProvider: LoteDP

- **Module:** Produccion
- **Description:** Lote DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SiloId | Parameter | NUMERIC | in | Silo Id |
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
	Where WWPBaseObjects.Notifications.LoteConsumido = False
	
	
	{
		LoteId = LoteId
		LoteEmbarque = LoteEmbarque
		LotePO = LotePO
		LoteFechaRegistro = LoteFechaRegistro
		LoteSiloId = GeneXus.LoteSiloId
		LoteConsumido = LoteConsumido
	
	}
}
```

### Rules (Rules)

```genexus
parm(in:&SiloId);
```

