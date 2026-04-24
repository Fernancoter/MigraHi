# DataProvider: ExtrusorasEnOperacion

- **Module:** Reportes
- **Description:** Extrusoras En Operacion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ColeccionExtrusora | Variable | GX_BUSCOMP |  | Coleccion Extrusora |
| Extrusora | Variable | GX_BUSCOMP |  | Extrusora |
| ColeccionExtrusion | Variable | GX_BUSCOMP |  | Coleccion Extrusion |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTExtrusoraEnOperacion
{
	&ColeccionExtrusion = ExtrusionesEnOperacion()
	SDTExtrusoraEnOperacionItem Input &Extrusion in &ColeccionExtrusion
	{
		ExtrusoraId = &Extrusion.ExtrusionExtrusoraId
		ExtrusoraNombre = &Extrusion.ExtrusionExtrusoraNombre
		OperadorNombre = &Extrusion.ExtrusionOperadorNombre
		ExtrusionFecha =&Extrusion.ExtrusionFecha
		ExtrusionEstado = &Extrusion.ExtrusionEstado
	}
}
```

