# Procedure: ObtenerTiempoReposo

- **Module:** Produccion
- **Description:** Obtener Tiempo Reposo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| TiempoReposo | Parameter | NUMERIC | out | Tiempo Reposo |
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
	
	&TiempoReposo = 0
	
	for each
		where ExtrusoraProductoId > 0
		where ExtrusoraId = &ExtrusoraId
		where ProductoId = &ProductoId
		&TiempoReposo = ExtrusoraProductoTiempoReposo
		Exit
	when none
		msg('Debe configurar el tiempo en reposo para el producto id:' + &ProductoId.ToString())
	endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out:&TiempoReposo);
```

