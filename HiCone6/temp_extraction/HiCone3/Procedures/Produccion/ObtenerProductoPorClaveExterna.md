# Procedure: ObtenerProductoPorClaveExterna

- **Module:** Produccion
- **Description:** Obtener Producto Por Clave Externa
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoClaveExterna | Parameter | NUMERIC | in | Producto Clave Externa |
| ProductoId | Parameter | NUMERIC | out | Producto Id |
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
for each DB.Producto
	Where ProductoClaveExterna = &ProductoClaveExterna
	&ProductoId = ProductoId
	exit
	
Endfor
```

### Rules (Rules)

```genexus
parm(in:&ProductoClaveExterna,out:&ProductoId);
```

