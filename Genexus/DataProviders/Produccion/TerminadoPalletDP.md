# DataProvider: TerminadoPalletDP

- **Module:** Produccion
- **Description:** Terminado Pallet DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
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
	SDTPaletItem
	where PaletId > 0
	where PaletEstatus in (EstatusPalet.Terminado, EstatusPalet.Incompleto)
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
		PaletHoraInicioEnsamble = WWPBaseObjects.PaletHoraInicioEnsamble
		PaletHoraFinEnsamble = PaletHoraFinEnsamble
		PaletEstatus = PaletEstatus
		PaletPrensadoId = PaletPrensadoId
		PaletPrensadoFinId = PaletPrensadoFinId
	}
}
```

### Rules (Rules)

```genexus
parm(in:&ProductoId);
```

