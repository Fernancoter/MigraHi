# DataProvider: ReclamoProductoDP

- **Module:** Calidad
- **Description:** Reclamo Producto DP
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
SDTProducto
{
	SDTProductoItem
	where ProductoTerminadoId > 0
	where TerminadoProductoId > 0
	where ProductoTerminadoConEtiqueta = false
	{
		ProductoId = TerminadoProductoId
		ProductoNombre = TerminadoProductoNombre
	}
}
```

