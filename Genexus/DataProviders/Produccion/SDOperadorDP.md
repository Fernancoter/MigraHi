# DataProvider: SDOperadorDP

- **Module:** Produccion
- **Description:** SDOperador DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| OperadorId | Parameter | NUMERIC | in | Operador Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTOperador
{
	SDTOperadorItem
	where OperadorId = &OperadorId when &OperadorId > 0
	Where OperadorActivo = True 
	{
		OperadorId = DB.WWPBaseObjects.Notifications.OperadorId
		OperadorNombre = WWPBaseObjects.OperadorNombre
		OperadorFotografia = OperadorFotografia
	}
}
```

### Rules (Rules)

```genexus
parm(in:&OperadorId);
```

