# Procedure: ObtenerProductoCategoriaPorNombre

- **Module:** Produccion
- **Description:** Obtener Producto Categoria Por Nombre
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoCategoriaNombre | Parameter | VARCHAR | in | Producto Categoria Nombre |
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
For each DB.ProductoCategoria
	Where ProductoCategoriaNombre = &ProductoCategoriaNombre
	&ProductoCategoriaId = ProductoCategoriaId
	exit

endfor
```

### Rules (Rules)

```genexus
parm(in:&ProductoCategoriaNombre, Out:&ProductoCategoriaId);
```

