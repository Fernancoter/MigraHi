# Procedure: SDObtenerProductoTipoMaterial

- **Module:** Produccion
- **Description:** SDObtener Producto Tipo Material
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| TiempoProceso | Variable | NUMERIC |  | Tiempo Proceso |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| ProductoId | Parameter | NUMERIC | out | Producto Id |
| TipoMaterial | Parameter | VARCHAR | out | Tipo Material |
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
	&ProductoId = &Extrusion.ExtrusionProductoId
	&TipoMaterial = &Extrusion.ExtrusionProductoTipoMaterial
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out:&ProductoId, out:&TipoMaterial);
```

