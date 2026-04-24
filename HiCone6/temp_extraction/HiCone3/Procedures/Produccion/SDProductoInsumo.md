# Procedure: SDProductoInsumo

- **Module:** Produccion
- **Description:** SDProducto Insumo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| InsumoProducto | Variable | GX_BUSCOMP |  | Insumo Producto |
| IPId | Variable | NUMERIC |  | IPId |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
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
 
 &Prensado.Load(&PrensadoId)
 &PrensaId = &Prensado.PrensadoPrensaId
 &ProductoId = &Prensado.PrensadoProductoId
 
 &IPId = 0
	
 for each DB.PrensaProducto
	where PrensaProductoId > 0
	where PrensaId = &PrensaId
	where ComercialProductoId = &ProductoId
	&IPId = InsumoProductoId
	Exit	
 endfor

 if(&IPId > 0)
	&InsumoProducto.Load(&IPId)
        &SDTProductoItem.FromJson(&InsumoProducto.ToJson())
 endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&SDTProductoItem);
```

