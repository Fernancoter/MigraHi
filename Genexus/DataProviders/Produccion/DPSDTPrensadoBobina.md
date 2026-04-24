# DataProvider: DPSDTPrensadoBobina

- **Module:** Produccion
- **Description:** DPSDTPrensado Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | inout | Prensado Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTPrensadoBobina
Where PrensadoId = &PrensadoId
{
	SDTPrensadoBobinaItem
	{
		PrensadoBobinaId = PrensadoBobinaId
		PrensadoId = PrensadoId
		BobinaId = BobinaId
		PrensadoBobinaCantCarrera = PrensadoBobinaCantCarrera
		BobinaNoSerie = BobinaNoSerie
		BobinaEstado = BobinaEstado
		BobinaReposoEnHoras = BobinaReposoEnHoras
		CarrerasEnProceso = count(CarreraId,CarreraEstado = EstadoCarrera.EnProceso)
		CarrerasTerminadas = count(CarreraId,CarreraEstado = EstadoCarrera.Terminada)
		CarrerasValidadas = count(CarreraId,CarreraEstado = EstadoCarrera.Validada)
		CantidadDeCarretes = count(CarreteId)
	}
}
```

### Rules (Rules)

```genexus
parm(&PrensadoId);
```

