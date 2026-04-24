# DataProvider: DPProductoTerminado

- **Module:** Produccion
- **Description:** DPProducto Terminado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| TerminadoProductoId | Parameter | NUMERIC | inout | Terminado Producto Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTProductoTerminado
Where TerminadoProductoId = &TerminadoProductoId
{
	ProductoTerminadoId  = ProductoTerminadoId 
	ProductoTerminadoPalets  = ProductoTerminadoPalets 
	ProductoTerminadoCarreteMillar  = ProductoTerminadoCarreteMillar 
	ProductoTerminadoPaletMillar  = ProductoTerminadoPaletMillar 
	ProductoTerminadoPeso  = ProductoTerminadoPeso 
	ProductoTerminadoPesoCarrete  = ProductoTerminadoPesoCarrete 
	ProductoTerminadoPesoPalet  = ProductoTerminadoPesoPalet 
	TerminadoProductoId  = TerminadoProductoId 
	TerminadoProductoNombre  = TerminadoProductoNombre 

}
```

### Rules (Rules)

```genexus
parm(&TerminadoProductoId);
```

