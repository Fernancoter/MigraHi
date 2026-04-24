# DataProvider: ExtrusoraDP

- **Module:** Produccion
- **Description:** Extrusora DP
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
SDTExtrusora
{
	SDTExtrusoraItem
	{
		ExtrusoraId = ExtrusoraId
		ExtrusoraNombre = ExtrusoraNombre
		ExtrusoraImagen = ExtrusoraImagen
	}
}
```

