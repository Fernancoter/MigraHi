# DataProvider: ProductoDP

- **Module:** Produccion
- **Description:** Producto DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoId | Parameter | NUMERIC | inout | Producto Id |
| ProductoCategoriaId | Variable | NUMERIC |  | Producto Categoria Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTProducto
Where ProductoId = &ProductoId when Not &ProductoId.IsEmpty()
{
	SDTProductoItem
	{
		ProductoId  = ProductoId 
		ProductoClave  = ProductoClave 
		ProductoNombre  = ProductoNombre 
		ProductoDescripcion  = ProductoDescripcion 
		ProductoCategoriaId  = ProductoCategoriaId 
		ProductoCategoriaNombre  = WWPBaseObjects.ProductoCategoriaNombre 
		ProductoPrecioUnitario  = Notifications.ProductoPrecioUnitario 
		ProductoInventarioActual  = ProductoInventarioActual 
		ProductoActivo  = ProductoActivo 
		ProductoClaveExterna  = ProductoClaveExterna 
		ProductoImagen  = ProductoImagen 
		ProductoTipoMaterial = Produccion.ProductoTipoMaterial
	}
}
```

### Rules (Rules)

```genexus
parm(&ProductoId);
```

