# DataProvider: DPCarreteCarrera

- **Module:** Produccion
- **Description:** DPCarrete Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTCarreteCarrera
{
	SDTCarreteCarreraItem
	{
		Level1
		{
			CarreteId  = CarreteId 
			CarreteNoLinea  = CarreteNoLinea 
			CarreteNoSerie  = CarreteNoSerie 
			CarreteEstado  = CarreteEstado 
			CarreteEnMolino  = CarreteEnMolino 
			CarreteMolino  = CarreteMolino 
			CarreteMermaMolino  = CarreteMermaMolino 
			CarreteMermaKg  = CarreteMermaKg 
			CarreteObservacion  = CarreteObservacion 
			CarreteTerminaPalet  = CarreteTerminaPalet 
			CarreteCarreraId  = CarreteCarreraId 
			PaletNoSerie = PaletNoSerie
			&CarreraId = CarreteCarreraId 
		}
		Level2
		Where CarreraId = &CarreraId
		{
			CarreraId = WWPBaseObjects.Notifications.CarreraId
			CarreraNo  = CarreraNo 
			CarreraEstado  = CarreraEstado 
			CarreraPaletTerminado  = CarreraPaletTerminado 
			InicioPrensadoBobinaId  = InicioPrensadoBobinaId 
			InicioPBPrensadoId  = InicioPBPrensadoId 
			InicioPrensadoBobinaBoninaId  = InicioPrensadoBobinaBoninaId 
			InicioPrensadoBobinaNoSerie  = InicioPrensadoBobinaNoSerie 
			InicioPrensadoBobinaEspesor  = InicioPrensadoBobinaEspesor 
			InicioPrensadoBobinaEstado  = InicioPrensadoBobinaEstado 
	
		}
	}
}
```

