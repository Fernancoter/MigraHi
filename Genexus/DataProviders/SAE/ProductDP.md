# DataProvider: ProductDP

- **Module:** SAE
- **Description:** Product DP
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
DVB_SDTComboData
{
	Item
	{
		ID = WWPBaseObjects.Notifications.ProductNumber
		Title = ProductNumber
		
	}
}
```

