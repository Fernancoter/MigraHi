# DataProvider: SDProductoEtiquetableDP

- **Module:** Produccion
- **Description:** SDProducto Etiquetable DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ConEtiqueta | Variable | Boolean |  | Con Etiqueta |
| ProductoId | Variable | NUMERIC |  | Producto Id |
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
	where ProductoTerminadoEtiquetable = true
	where TerminadoProductoId > 0
	where TerminadoProductoActivo = true
	{
		ProductoId = TerminadoProductoId
		ProductoNombre = TerminadoProductoNombre
	}
}
```

