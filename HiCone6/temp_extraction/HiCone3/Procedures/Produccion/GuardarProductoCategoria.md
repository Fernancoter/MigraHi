# Procedure: GuardarProductoCategoria

- **Module:** Produccion
- **Description:** Guardar Producto Categoria
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTProductoCategoriaItem | Parameter | GX_SDT | in | SDTProducto Categoria Item |
| Correcto | Parameter | Boolean | out | Correcto |
| CategoriaProducto | Variable | GX_BUSCOMP |  | Categoria Producto |
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
if(not &SDTProductoCategoriaItem.ProductoCategoriaClaveExterna.IsEmpty())
	ObtenerProductoCategoriaPorClaveExterna.Call(&SDTProductoCategoriaItem.ProductoCategoriaClaveExterna, &SDTProductoCategoriaItem.ProductoCategoriaId)
endif


&ProductoCategoria.Load(&SDTProductoCategoriaItem.ProductoCategoriaId)
&ProductoCategoria.ProductoCategoriaNombre = &SDTProductoCategoriaItem.ProductoCategoriaNombre
&ProductoCategoria.ProductoCategoriaClaveExterna = &SDTProductoCategoriaItem.ProductoCategoriaClaveExterna
&ProductoCategoria.Save()

&Correcto = &ProductoCategoria.Success()
if(&Correcto )
	commit
endif
```

### Rules (Rules)

```genexus
parm(in:&SDTProductoCategoriaItem, out:&Correcto);
```

