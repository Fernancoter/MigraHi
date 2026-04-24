# Procedure: InsumoProducto

- **Module:** Produccion
- **Description:** Insumo Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| InsumoProductoId | Parameter | NUMERIC | out | Insumo Producto Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
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

        &InsumoProductoId = 0
	
	for each DB.PrensaProducto
		where PrensaProductoId > 0
		where PrensaId = &PrensaId
		where ComercialProductoId = &ProductoId
		&InsumoProductoId = InsumoProductoId
		Exit	
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensaId, in:&ProductoId, out:&InsumoProductoId);
```

