# Procedure: GuardarProducto

- **Module:** Produccion
- **Description:** Guardar Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTProductoItem | Parameter | GX_SDT | in | SDTProducto Item |
| Correcto | Parameter | Boolean | out | Correcto |
| Producto | Variable | GX_BUSCOMP |  | Producto |
| ProductoCategoria | Variable | GX_BUSCOMP |  | Producto Categoria |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus

if(not &SDTProductoItem.ProductoClaveExterna.IsEmpty())
	ObtenerProductoPorClaveExterna.Call(&SDTProductoItem.ProductoClaveExterna,&SDTProductoItem.ProductoId)
endif

&Producto.Load(&SDTProductoItem.ProductoId)
&Producto.ProductoClave = &SDTProductoItem.ProductoClave
&Producto.ProductoNombre = &SDTProductoItem.ProductoNombre
&Producto.ProductoDescripcion = &SDTProductoItem.ProductoDescripcion

if(&SDTProductoItem.ProductoCategoriaId.IsEmpty() and not &SDTProductoItem.ProductoCategoriaNombre.IsEmpty())
	//Se busca llave foranea
	&SDTProductoItem.ProductoCategoriaId = ObtenerProductoCategoriaPorNombre.Udp(&SDTProductoItem.ProductoCategoriaNombre)
endif


&Producto.ProductoCategoriaId = &SDTProductoItem.ProductoCategoriaId
&Producto.ProductoPrecioUnitario = &SDTProductoItem.ProductoPrecioUnitario
&Producto.ProductoInventarioActual = &SDTProductoItem.ProductoInventarioActual
&Producto.ProductoActivo = &SDTProductoItem.ProductoActivo
&Producto.ProductoClaveExterna = &SDTProductoItem.ProductoClaveExterna

&Producto.Save()
&Correcto = &Producto.Success()

if(&Correcto)
	commit
endif
```

### Rules (Rules)

```genexus
PARM(IN:&SDTProductoItem,out:&Correcto);
```

