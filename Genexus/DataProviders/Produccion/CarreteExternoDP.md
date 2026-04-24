# DataProvider: CarreteExternoDP

- **Module:** Produccion
- **Description:** Carrete Externo DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| ProductoConEtiqueta | Variable | VARCHAR |  | Producto Con Etiqueta |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| ProductoEtiquetaId | Variable | NUMERIC |  | Producto Etiqueta Id |
| ProductoNombre | Variable | VARCHAR |  | Producto Nombre |
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
	where PaletCarreteId > 0
	where Not PaletId = &PaletId
	where WWPBaseObjects.PaletProductoId = &ProductoId
	where PaletEstatus in (EstatusPalet.EnEnsamble, Produccion.EstatusPalet.Incompleto, EstatusPalet.Terminado)
	where CarreteId > 0
	where CarreteEstado = EstadoCarrete.EnPalet
	
	{
		CarreteId = Notifications.CarreteId
		CarreteNoLinea = CarreteNoLinea
		CarreteNoSerie = CarreteNoSerie
		CarreteEstado = CarreteEstado
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
parm(in:&PaletId, in:&ProductoId);
```

