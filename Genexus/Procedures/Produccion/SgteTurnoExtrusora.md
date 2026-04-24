# Procedure: SgteTurnoExtrusora

- **Module:** Produccion
- **Description:** Sgte Turno Extrusora
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| NextExtId | Parameter | NUMERIC | out | Next Ext Id |
| ExtrusionFecha | Variable | DATETIME |  | Fecha |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
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
   &ExtrusionFecha = &Extrusion.ExtrusionFecha
   &ExtrusoraId = &Extrusion.ExtrusionExtrusoraId
   
   //Obtener el sgte turno para la Extrusora
   for each Order ExtrusionFecha
	   where ExtrusionId > 0
	   where ExtrusionFecha >= &ExtrusionFecha
	   where ExtrusionExtrusoraId = &ExtrusoraId
	   where ExtrusionEstado = EstadoExtrusion.Programada
	   &NextExtId = ExtrusionId
	   Exit
   when none
	   &NextExtId = 0	
   endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out:&NextExtId);
```

