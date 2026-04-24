# DataProvider: DPSDTProductoPorTroquel

- **Module:** Produccion
- **Description:** DPSDTProducto Por Troquel
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| TroquelId | Parameter | NUMERIC | inout | Troquel Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTProducto
Where TroquelId = &TroquelId
{
	SDTProductoItem
	{
		ProductoId  = ProductoId 
ProductoClave  = ProductoClave 
ProductoNombre  = ProductoNombre 
ProductoDescripcion  = ProductoDescripcion 
//ProductoCategoriaId  = ProductoCategoriaId 
ProductoCategoriaNombre  = ProductoCategoriaNombre 
//ProductoPrecioUnitario  = ProductoPrecioUnitario 
//ProductoInventarioActual  = ProductoInventarioActual 
//ProductoActivo  = ProductoActivo 
//ProductoClaveExterna  = ProductoClaveExterna 
//ProductoImagen  = ProductoImagen 
//ProductoTipoMaterial  = ProductoTipoMaterial 

	}
}
```

### Rules (Rules)

```genexus
parm(&TroquelId);
```

