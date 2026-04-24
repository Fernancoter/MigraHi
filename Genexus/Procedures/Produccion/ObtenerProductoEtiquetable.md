# Procedure: ObtenerProductoEtiquetable

- **Module:** Produccion
- **Description:** Obtener Producto Etiquetable
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoEtiquetaId | Variable | NUMERIC |  | Producto Etiqueta Id |
| CarreteId | Variable | NUMERIC |  | Carrete Id |
| PaletCarrete | Variable | GX_BUSCOMP |  | Palet Carrete |
| PaletId | Variable | NUMERIC |  | Palet Id |
| PCId | Variable | NUMERIC |  | PCId |
| ProductoEtiqueta | Variable | GX_BUSCOMP |  | Producto Etiqueta |
| ProductoId | Parameter | NUMERIC | out | Producto Id |
| ProductoEtiquetaNombre | Parameter | VARCHAR | in | Producto Etiqueta Nombre |
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
        
	&ProductoId = 0
	
	for each DB.ProductoTerminado
		where ProductoTerminadoId > 0
		where ProductoTerminadoConEtiqueta = false
		where ProductoTerminadoEtiquetable = true
		where TerminadoProductoId > 0
		where TerminadoProductoNombre.Substring(1,5) = &ProductoEtiquetaNombre.Substring(1,5)
		&ProductoId = DB.TerminadoProductoId
		Exit
	Endfor
```

### Rules (Rules)

```genexus
parm(in:&ProductoEtiquetaNombre, out:&ProductoId);
```

