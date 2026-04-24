# DataProvider: CarreteRevisionDP

- **Module:** Produccion
- **Description:** Carrete Revision DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTCarrete
{
	&ProductoId = Produccion.ObtenerPrensaProductoPrensado.Udp(&PrensadoId,&PrensaId)
	SDTCarreteItem
	where CarreteId > 0
	where CarreteEstado = EstadoCarrete.EnRevision
	where DB.PrensadoProductoId = &ProductoId
	where InicioPBPrensadoId <> &PrensadoId
	{
		CarreteId = CarreteId
		CarreteNoLinea = CarreteNoLinea
		CarreteNoSerie = CarreteNoSerie
		CarreteEstado = DB.CarreteEstado
		CarreteObservacion = CarreteObservacion
		CarreteCarreraId = CarreteCarreraId
		CarreteTerminaPalet = CarreteTerminaPalet
		CarretePaletSerie = CarretePaletSerie
		selected = CarreteEnMolino
	}
}
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId);
```

