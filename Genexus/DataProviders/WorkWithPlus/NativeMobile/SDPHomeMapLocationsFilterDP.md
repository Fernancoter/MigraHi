# DataProvider: SDPHomeMapLocationsFilterDP

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPHome Map Locations Filter DP
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
SDPMenuOptions
{
	SDPMenuOptionsItem
	{
		Title = !"Carrasco"
		IdNum = 1
	}
	SDPMenuOptionsItem
	{
		Title = !"Malvin"
		IdNum = 2
	}
	SDPMenuOptionsItem
	{
		Title = !"Portones"
		IdNum = 3
	}
	SDPMenuOptionsItem
	{
		Title = !"Pocitos"
		IdNum = 4
	}
}
```

