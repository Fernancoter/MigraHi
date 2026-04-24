# DataProvider: TurnoDP

- **Module:** Produccion
- **Description:** Turno DP
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
SDTTurno
{
	SDTTurnoItem
	{
		TurnoId = TurnoId
		TurnoNombre = TurnoNombre
	}
}
```

