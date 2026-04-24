# Procedure: SDExtrusoraOcupada

- **Module:** Produccion
- **Description:** SDExtrusoraOcupada
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DiaExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| Disponible | Variable | Boolean |  | Disponible |
| ExtrusionEstado | Variable | VARCHAR |  | Extrusion Estado |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| isOK | Variable | Boolean |  | is OK |
| Mensajes | Variable | GX_SDT |  | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| ExtActivaId | Parameter | NUMERIC | out | Ext Activa Id |
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
 
 &ExtActivaId = 0
 &Disponible = false
 
 for each DB.Extrusion
	 where ExtrusionId > 0
	 where ExtrusionId <> &ExtrusionId
	 where ExtrusionExtrusoraId = &ExtrusoraId
	 &ExtrusionEstado = ExtrusionEstado
	 
	 Do Case
		 Case &ExtrusionEstado = EstadoExtrusion.EnProceso
		      &ExtActivaId = ExtrusionId
		      Exit
			 
		 Case &ExtrusionEstado = EstadoExtrusion.Intermedia
		      &ExtActivaId = ExtrusionId
		      Exit	 
	 EndCase
 Endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&ExtrusoraId, out:&ExtActivaId);
```

