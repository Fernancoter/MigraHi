# Procedure: SDPrensadoAnticipado

- **Module:** Produccion
- **Description:** SDPrensado Anticipado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Anticipado | Parameter | Boolean | out | Anticipado |
| DiffTiempo | Variable | NUMERIC |  | Diff Tiempo |
| DiffTiempoMinutos | Variable | NUMERIC |  | Diff Tiempo Minutos |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| IniciaProceso | Parameter | DATETIME | in | Inicia Proceso |
| Mensajes | Variable | GX_SDT |  | Mensajes |
| MinutosProceso | Variable | NUMERIC |  | Minutos Proceso |
| MinutosSgteTurno | Variable | GX_BUSCOMP |  | Minutos Sgte Turno |
| Msj | Variable | NUMERIC |  | Msj |
| Now | Variable | DATETIME |  | Now |
| Numero | Variable | NUMERIC |  | Numero |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| SgtePrensado | Variable | GX_BUSCOMP |  | Sgte Prensado |
| SgtePrensadoFecha | Variable | DATETIME |  | Prensado Fecha |
| SgtePrensadoId | Variable | NUMERIC |  | Prensado Id |
| Tiempo | Variable | NUMERIC |  | Tiempo |
| TiempoLaboral | Variable | NUMERIC |  | Tiempo Laboral |
| TiempoMin | Variable | NUMERIC |  | Tiempo Min |
| TiempoProceso | Variable | NUMERIC |  | Tiempo Proceso |
| ToleranciaTurno | Variable | NUMERIC |  | Tolerancia Turno |
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
	&Anticipado = true
	
	//Tiempo en Proceso
	&Now = Now()
	&TiempoProceso = &Now.Difference(&IniciaProceso)
	&MinutosProceso = (&TiempoProceso/60)
	
	//Variables de config
	&ToleranciaTurno = Produccion.SDToleranciaTurno.Udp()
	&TiempoLaboral = SDTiempoLaboral.Udp()
	
	//Sgte Turno calendarizado
	&SgtePrensadoId = SgteTurnoPrensado.Udp(&PrensadoId)
	
	if(&SgtePrensadoId > 0)
		&SgtePrensado.Load(&SgtePrensadoId)
		&SgtePrensadoFecha = &SgtePrensado.PrensadoFecha
		
		&DiffTiempo = &SgtePrensadoFecha.Difference(&Now)
		&DiffTiempoMinutos = (&DiffTiempo/60)
	
		if(&ToleranciaTurno >=  &DiffTiempoMinutos)
			&Anticipado = false
		else
			if(&MinutosProceso >= &TiempoLaboral)
			     &Anticipado = false
			endif
		endif 
	else
		if(&MinutosProceso >= &TiempoLaboral)
			&Anticipado = false
		endif
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&IniciaProceso, out:&Anticipado);
```

