# DataProvider: TroquelDP

- **Module:** Produccion
- **Description:** Troquel DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTTroquel
{
	SDTTroquelItem
	where TroquelId > 0
	where TroquelEstado = EstadoTroquel.Registrado
	where ProductoId = &ProductoId
	where TroquelActivo = True
        {
		TroquelId = TroquelId
		TroquelNombre = TroquelNombre
		
	}
}
```

### Rules (Rules)

```genexus
parm(in:&ProductoId);
```

