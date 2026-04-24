# DataProvider: PaletTerminadoDP

- **Module:** Produccion
- **Description:** Palet Terminado DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
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
	&ProductoId = ObtenerPrensaProductoPrensado.Udp(&PrensadoId,&PrensaId)
	
	SDTPaletItem
	where PaletId > 0
	where PaletEstatus in (EstatusPalet.Terminado, EstatusPalet.Embarcado, EstatusPalet.Incompleto, EstatusPalet.Etiquetando)
	where (PaletPrensadoId = &PrensadoId or PaletPrensadoFinId = &PrensadoId) 
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
parm(in:&PrensadoId);
```

