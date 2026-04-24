# Procedure: SetEstadoExtrusion

- **Module:** Produccion
- **Description:** Set Estado Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionEstado | Parameter | VARCHAR | in | Extrusion Estado |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
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
	 &Extrusion.ExtrusionEstado = &ExtrusionEstado
	 
	 Do Case
		 Case &ExtrusionEstado = EstadoExtrusion.EnProceso
		         &Extrusion.ExtrusionHoraIniciaProceso = Now()
		 Case &ExtrusionEstado = EstadoExtrusion.Terminada
		         &Extrusion.ExtrusionHoraFinProceso = Now()
	 EndCase
	 
	 &Extrusion.Save()
	 
	 if(&Extrusion.Success())
		 commit
         endif
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&ExtrusionEstado);
```

