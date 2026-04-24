# DataProvider: SDProductoConEtiquetaDP

- **Module:** Produccion
- **Description:** SDProducto Con Etiqueta DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrefijoProducto | Variable | VARCHAR |  | Prefijo Producto |
| ProductoConEtiqueta | Parameter | VARCHAR | in | Producto Con Etiqueta |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTProducto
{
	SDTProductoItem
	where ProductoTerminadoId > 0
	where TerminadoProductoNombre.Substring(1,5) = &ProductoConEtiqueta.Substring(1,5)
	where TerminadoProductoActivo = true
	where ProductoTerminadoConEtiqueta = true
	{
		ProductoId = TerminadoProductoId
		ProductoNombre = TerminadoProductoNombre
	}
}
```

### Rules (Rules)

```genexus
parm(in:&ProductoConEtiqueta);
```

