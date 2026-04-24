# DataProvider: SDProductoCarreteDP

- **Module:** Produccion
- **Description:** SDProducto Carrete DP
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
	where ProductoCategoriaNombre = ObtenerConfiguracion.Udp(!'CategoriaCarrete')
	where ProductoActivo = true
	where ProductoId <> &ProductoId when &ProductoId > 0
	{
		ProductoId = ProductoId
		ProductoClave = ProductoClave
		ProductoNombre = ProductoNombre
		ProductoDescripcion = ProductoDescripcion
		ProductoCategoriaId = ProductoCategoriaId
		ProductoCategoriaNombre = ProductoCategoriaNombre
		ProductoPrecioUnitario = WWPBaseObjects.ProductoPrecioUnitario
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

