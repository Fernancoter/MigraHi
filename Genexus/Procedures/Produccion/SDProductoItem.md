# Procedure: SDProductoItem

- **Module:** Produccion
- **Description:** SDProducto Item
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Producto | Variable | GX_BUSCOMP |  | Producto |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| SDTProductoItem | Parameter | GX_SDT | out | SDTProducto Item |
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
 
 if(&ProductoId > 0)
	 &Producto.Load(&ProductoId)
	 &SDTProductoItem.FromJson(&Producto.ToJson())
 endif
```

### Rules (Rules)

```genexus
parm(in:&ProductoId, out:&SDTProductoItem);
```

