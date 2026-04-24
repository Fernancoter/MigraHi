# DataProvider: PaletEtiquetandoDP

- **Module:** Produccion
- **Description:** Palet Etiquetando DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTPalet
{

	SDTPaletItem
	ORDER (PaletHoraFinEnsamble)
	where PaletId > 0
	Where PaletEstatus = EstatusPalet.Etiquetando	
	{
		PaletId = PaletId
		PaletNoSerie = WWPBaseObjects.PaletNoSerie
		PaletNo = PaletNo
		PaletNoCarretes = Notifications.PaletNoCarretes
		PaletCapacidad = PaletCapacidad
		PaletOperadorId = PaletOperadorId
		PaletProductoId = PaletProductoId
		PaletPrensaId = PaletPrensaId
		PaletProductoNombre = PaletProductoNombre
		PaletProductoMaterial = PaletProductoMaterial
		PaletHoraInicioEnsamble = PaletHoraInicioEnsamble
		PaletHoraFinEnsamble = PaletHoraFinEnsamble
		PaletEstatus = PaletEstatus
		PaletPrensadoId = PaletPrensadoId
		PaletPrensadoFinId = WWPBaseObjects.PaletPrensadoFinId
	}
}
```

