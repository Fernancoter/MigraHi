# DataProvider: DPSDTTrazabilidad

- **Module:** Produccion
- **Description:** DPSDTTrazabilidad
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
SDTTrazabilidad
{
	SDTTrazabilidadItem
	{
		PrensaNombre = InicioPBPrensaNombre
		ProdcutoNombre = PrensadoProductoNombre
		CarreraNo = CarreraNo
		CarreteNoLinea = CarreteNoLinea
		CarreteId = CarreteId
//		PaletNoSerie = PaletNoSerie
//		PaletNo = /*No Pallet value*/
//		PaletHoraInicioEnsamble = /*Hr de Ini. de Ensamble del Pallet value*/
//		PaletHoraFinEnsamble = /*Hr de Fin. de Ensamble del Pallet value*/
		OperadorPrensado = PrensadoOperadorNombre
//		PaletEstatus = /*Estatus del Pallet value*/
		CarreteNoSerie = CarreteNoSerie
		BobinaNoSerie = InicioPrensadoBobinaNoSerie
		BobinaNo = WWPBaseObjects.InicioPrensadoBobinaNo
		ExtrusoraNombre = DB.ExtrusionExtrusoraNombre
		OperadorExtrusion = ExtrusionOperadorNombre
		BobinaHoraInicio = ExtrusionHoraIniciaProceso
		BobinaHoraSalida = DB.Notifications.ExtrusionHoraFinProceso
	}
}
```

