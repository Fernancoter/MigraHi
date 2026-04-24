# DataProvider: CarreteDP

- **Module:** Produccion
- **Description:** Carrete DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Parameter | NUMERIC | in | Carrera Id |
| Orden | Parameter | VARCHAR | in | Orden |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTCarrete
{
	SDTCarreteItem
	Order (CarreteNoLinea) when &Orden = Orden.Descendente
	Order CarreteNoLinea when &Orden = Orden.Ascendente
	where CarreteCarreraId = &CarreraId when &CarreraId > 0
	{
		CarreteId = CarreteId
		CarreteNoLinea = CarreteNoLinea
		CarreteNoSerie = CarreteNoSerie
		CarreteEstado = CarreteEstado
		CarreteObservacion = DB.CarreteObservacion
		CarreteCarreraId = CarreteCarreraId
		CarreteTerminaPalet = CarreteTerminaPalet
		CarretePaletSerie = CarretePaletSerie
		selected = CarreteEnMolino
	}
}
```

### Rules (Rules)

```genexus
parm(in:&CarreraId, in:&Orden);
```

