# DataProvider: PrensadoBobinaDP

- **Module:** Produccion
- **Description:** Prensado Bobina DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTPrensadoBobina
{
	SDTPrensadoBobinaItem
	where PrensadoBobinaId > 0
	where PrensadoId = &PrensadoId
	{
		PrensadoBobinaId = PrensadoBobinaId
		PrensadoId = PrensadoId
		BobinaId = BobinaId
		BobinaNoSerie = BobinaNoSerie
		BobinaEstado = BobinaEstado
		PrensadoBobinaCantCarrera = PrensadoBobinaCantCarrera	
		BobinaKg = BobinaKg
		BobinaCarreras = BobinaCarreras
	}
}
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId);
```

