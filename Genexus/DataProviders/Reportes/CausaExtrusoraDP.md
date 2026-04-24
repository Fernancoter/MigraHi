# DataProvider: CausaExtrusoraDP

- **Module:** Reportes
- **Description:** Causa Extrusora DP
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
SDTCausaInterrupcion
{
	SDTCausaInterrupcionItem
	where CausaInterrupcionId > 0
	where CausaInterrupcionExtrusora = true
	{
		CausaInterrupcionId = CausaInterrupcionId
		CausaInterrupcionNombre = CausaInterrupcionNombre
		CausaInterrupcionPrensa = CausaInterrupcionPrensa
		CausaInterrupcionExtrusora = CausaInterrupcionExtrusora
	}
}
```

