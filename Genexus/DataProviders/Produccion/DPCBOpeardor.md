# DataProvider: DPCBOpeardor

- **Module:** Produccion
- **Description:** DP Dynamic Combo Box Opeardor
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
Where OperadorActivo = True
{
	
	Item
	{
		ID = OperadorId.ToString()
		Title = OperadorNombre
	}
}
```

