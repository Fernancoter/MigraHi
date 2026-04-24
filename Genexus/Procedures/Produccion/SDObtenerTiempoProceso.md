# Procedure: SDObtenerTiempoProceso

- **Module:** Produccion
- **Description:** SDObtener Tiempo Proceso
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| TiempoProceso | Parameter | NUMERIC | out | Tiempo Proceso |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
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
        
	&Extrusion.Load(&ExtrusionId)
	&ExtrusoraId = &Extrusion.ExtrusionExtrusoraId
	&ProductoId = &Extrusion.ExtrusionProductoId
	
	&TiempoProceso = 0
	
	for each
		where ExtrusoraProductoId > 0
		where ExtrusoraId = &ExtrusoraId
		where ProductoId = &ProductoId
		&TiempoProceso = ExtrusoraProductoTiempoProceso
		Exit
	when none
		msg('Debe configurar el tiempo de proceso para el producto ' + &Bobina.BobinaProductoNombre)
	endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out:&TiempoProceso);
```

