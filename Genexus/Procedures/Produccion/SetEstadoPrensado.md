# Procedure: SetEstadoPrensado

- **Module:** Produccion
- **Description:** Set Estado Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EstadoPrensado | Parameter | VARCHAR | in | Estado Prensado |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| ExtrusionEstado | Variable | VARCHAR |  | Extrusion Estado |
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
         
	 &Prensado.Load(&PrensadoId)
	 &Prensado.PrensadoEstado = &EstadoPrensado
	 
 	 Do Case
		 Case &EstadoPrensado = EstadoPrensado.EnProceso
		         &Prensado.PrensadoHoraIniciaProceso = Now()
		 Case &EstadoPrensado = EstadoPrensado.Terminado
		         &Prensado.PrensadoHoraFinProceso = Now()
	 EndCase
	 
	 &Prensado.Save()
	 
	 if(&Prensado.Success())
		 commit
         endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&EstadoPrensado);
```

