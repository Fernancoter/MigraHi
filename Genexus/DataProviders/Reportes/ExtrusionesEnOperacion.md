# DataProvider: ExtrusionesEnOperacion

- **Module:** Reportes
- **Description:** Extrusiones En Operacion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
Extrusion
	Where ExtrusionEstado in(EstadoExtrusion.EnProceso, EstadoExtrusion.Intermedia)

{
	ExtrusionId = ExtrusionId
	ExtrusionExtrusoraId = DB.ExtrusionExtrusoraId
	ExtrusionTurnoId = ExtrusionTurnoId
	
}
```

