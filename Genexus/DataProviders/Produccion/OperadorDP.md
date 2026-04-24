# DataProvider: OperadorDP

- **Module:** Produccion
- **Description:** Operador DP
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
SDTOperador
Where OperadorActivo = True 
{
	SDTOperadorItem
	{
		OperadorId = OperadorId
		OperadorNombre = OperadorNombre
		OperadorFotografia = OperadorFotografia
	}
}
```

