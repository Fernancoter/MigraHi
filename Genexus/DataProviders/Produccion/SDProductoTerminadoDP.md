# DataProvider: SDProductoTerminadoDP

- **Module:** Produccion
- **Description:** SDProducto Terminado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ConEtiqueta | Parameter | Boolean | in | Con Etiqueta |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
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
	where TerminadoProductoId > 0
	where TerminadoProductoId <> &ProductoId when &ProductoId > 0
	where TerminadoProductoActivo = true
	where ProductoTerminadoConEtiqueta = &ConEtiqueta
	{
		ProductoId = TerminadoProductoId
		ProductoNombre = TerminadoProductoNombre
	}
}
```

### Rules (Rules)

```genexus
parm(in:&ProductoId, in:&ConEtiqueta);
```

