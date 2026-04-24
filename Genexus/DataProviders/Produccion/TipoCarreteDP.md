# DataProvider: TipoCarreteDP

- **Module:** Produccion
- **Description:** Tipo Carrete DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensaId | Variable | NUMERIC |  | Prensa Id |
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
	{
		ProductoId = ProductoId
		ProductoClave = ProductoClave
		ProductoNombre = ProductoNombre
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

