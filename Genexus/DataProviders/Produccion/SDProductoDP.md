# DataProvider: SDProductoDP

- **Module:** Produccion
- **Description:** SDProducto DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoId | Parameter | NUMERIC | in | Producto Id |
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
	where ProductoId > 0
	where ProductoId <> &ProductoId when &ProductoId > 0
	where ProductoCategoriaNombre = ObtenerConfiguracion.Udp(!'CategoriaBobina')
	where Embarques.ProductoActivo = true
	{
		ProductoId = ProductoId
		ProductoClave = ProductoClave
		ProductoNombre = Produccion.ProductoNombre
		ProductoDescripcion = ProductoDescripcion
		ProductoCategoriaId = ProductoCategoriaId
		ProductoCategoriaNombre = ProductoCategoriaNombre
		ProductoPrecioUnitario = ProductoPrecioUnitario
		ProductoInventarioActual = ProductoInventarioActual
		ProductoActivo = ProductoActivo
		ProductoClaveExterna = ProductoClaveExterna
		ProductoImagen = ProductoImagen
	}
}
```

### Rules (Rules)

```genexus
parm(in:&ProductoId);
```

