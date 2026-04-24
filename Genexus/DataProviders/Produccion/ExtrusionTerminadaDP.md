# DataProvider: ExtrusionTerminadaDP

- **Module:** Produccion
- **Description:** Extrusion Terminada DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| Fecha | Parameter | DATE | in | Fecha |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTExtrusion
{        
	SDTExtrusionItem
        Where ExtrusionId > 0
	where ExtrusionFecha.ToDate() = &Fecha when Not &Fecha.IsEmpty()
	where ExtrusionExtrusoraId = &ExtrusoraId when &ExtrusoraId > 0
        where ExtrusionEstado = EstadoExtrusion.Terminada
	{
		ExtrusionId = ExtrusionId
		ExtrusionExtrusoraId = ExtrusionExtrusoraId
		ExtrusionExtrusoraNombre = ExtrusionExtrusoraNombre
		ExtrusionTurnoId = ExtrusionTurnoId
		ExtrusionTurnoNombre = ExtrusionTurnoNombre
		ExtrusionProductoId = ExtrusionProductoId
		ExtrusionProductoNombre = ExtrusionProductoNombre
		ExtrusionOperadorId = ExtrusionOperadorId
		ExtrusionOperadorNombre = ExtrusionOperadorNombre
		ExtrusionHoraIniciaProceso = ExtrusionHoraIniciaProceso
		ExtrusionHoraFinProceso = ExtrusionHoraFinProceso
	}
}
```

### Rules (Rules)

```genexus
parm(in:&Fecha, in:&ExtrusoraId);
```

