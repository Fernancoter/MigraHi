# DataProvider: TipoBobinasDP

- **Module:** Produccion
- **Description:** Tipo Bobinas DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusoraId | Parameter | NUMERIC | inout | Extrusora Id |
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
	where DB.ExtrusoraProductoId > 0
	Where ExtrusoraId = &ExtrusoraId
	where ProductoId > 0
	where ProductoActivo = true
	where ProductoCategoriaNombre = ObtenerConfiguracion.Udp(!'CategoriaBobina')
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

### Rules (Rules)

```genexus
parm(&ExtrusoraId);
```

