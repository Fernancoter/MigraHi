# Procedure: ObtenerProductoCategoriaPorClaveExterna

- **Module:** Produccion
- **Description:** Obtener Producto Categoria Por Clave Externa
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoCategoriaClaveExterna | Parameter | NUMERIC | in | Producto Categoria Clave Externa |
| ProductoCategoriaId | Parameter | NUMERIC | out | Producto Categoria Id |
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
for each DB.ProductoCategoria
	Where ProductoCategoriaClaveExterna = &ProductoCategoriaClaveExterna
	&ProductoCategoriaId = ProductoCategoriaId
	exit
	
endfor
```

### Rules (Rules)

```genexus
parm(in:&ProductoCategoriaClaveExterna,out:&ProductoCategoriaId);
```

