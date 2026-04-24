# DataProvider: PaletDP

- **Module:** Produccion
- **Description:** Palet DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTPalet
{
	
	&ProductoId = ObtenerPrensaProductoPrensado.Udp(&PrensadoId,&PrensaId)

	SDTPaletItem
	where PaletPrensaId = &PrensaId
	Where PaletEstatus = EstatusPalet.EnEnsamble
	where PaletProductoId = &ProductoId
	
	{
		PaletId = PaletId
		PaletNoSerie = PaletNoSerie
		PaletNo = PaletNo
		PaletNoCarretes = PaletNoCarretes
		PaletOperadorId = PaletOperadorId
		PaletProductoId = PaletProductoId
		PaletPrensaId = PaletPrensaId
		PaletProductoNombre = PaletProductoNombre
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
parm(in:&PrensadoId, in:&PrensaId, in:&ProductoId);
```

