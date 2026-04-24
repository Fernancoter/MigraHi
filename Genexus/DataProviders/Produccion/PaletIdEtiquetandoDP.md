# DataProvider: PaletIdEtiquetandoDP

- **Module:** Produccion
- **Description:** Palet Id Etiquetando DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| PaletId | Parameter | NUMERIC | in | Palet Id |
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
	where PaletId > 0
	Where PaletId = &PaletId
	
	
	{
		PaletId = PaletId
		PaletNoSerie = PaletNoSerie
		PaletNo = PaletNo
		PaletNoCarretes = PaletNoCarretes
		PaletCapacidad = PaletCapacidad
		PaletOperadorId = PaletOperadorId
		PaletProductoId = WWPBaseObjects.Notifications.PaletProductoId
		PaletPrensaId = PaletPrensaId
		PaletProductoNombre = PaletProductoNombre
		PaletProductoMaterial = PaletProductoMaterial
		PaletHoraInicioEnsamble = PaletHoraInicioEnsamble
		PaletHoraFinEnsamble = PaletHoraFinEnsamble
		PaletEstatus = PaletEstatus
		PaletPrensadoId = PaletPrensadoId
		PaletPrensadoFinId = PaletPrensadoFinId
	}
}
```

### Rules (Rules)

```genexus
parm(in:&PaletId);
```

