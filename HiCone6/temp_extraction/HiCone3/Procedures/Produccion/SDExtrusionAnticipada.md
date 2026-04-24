# Procedure: SDExtrusionAnticipada

- **Module:** Produccion
- **Description:** SDExtrusion Anticipada
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Anticipada | Parameter | Boolean | out | Anticipada |
| DiffTiempoMinutos | Variable | NUMERIC |  | Diff Tiempo Minutos |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| IniciaProceso | Parameter | DATETIME | in | Inicia Proceso |
| MinutosProceso | Variable | NUMERIC |  | Minutos Proceso |
| Now | Variable | DATETIME |  | Now |
| SgteExtrusion | Variable | GX_BUSCOMP |  | Sgte Extrusion |
| SgteExtrusionFecha | Variable | DATETIME |  | Fecha |
| SgteExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| Tiempo | Variable | NUMERIC |  | Tiempo |
| TiempoLaboral | Variable | NUMERIC |  | Tiempo Laboral |
| TiempoMin | Variable | NUMERIC |  | Tiempo Min |
| TiempoProceso | Variable | NUMERIC |  | Tiempo Proceso |
| ToleranciaTurno | Variable | NUMERIC |  | Tolerancia Turno |
| DiffTiempo | Variable | NUMERIC |  | Diff Tiempo |
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
	&Anticipada = true
	
	//Tiempo en Proceso
	&Now = Now()
	&TiempoProceso = &Now.Difference(&IniciaProceso)
	&MinutosProceso = (&TiempoProceso/60)
	
	//Variables de config
	&ToleranciaTurno = SDToleranciaTurno.Udp()
	&TiempoLaboral = SDTiempoLaboral.Udp()
	
	//Sgte Turno calendarizado
	&SgteExtrusionId = SgteTurnoExtrusora.Udp(&ExtrusionId)
	
	if(&SgteExtrusionId > 0)
		&SgteExtrusion.Load(&SgteExtrusionId)
		&SgteExtrusionFecha = &SgteExtrusion.ExtrusionFecha
		
		&DiffTiempo = &SgteExtrusionFecha.Difference(&Now)
		&DiffTiempoMinutos = (&DiffTiempo/60)
	
		if(&ToleranciaTurno >=  &DiffTiempoMinutos)
			&Anticipada = false
		else
			if(&MinutosProceso >= &TiempoLaboral)
			     &Anticipada = false
			endif
		endif 
	else
		if(&MinutosProceso >= &TiempoLaboral)
			&Anticipada = false
		endif
	endif
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&IniciaProceso, out:&Anticipada);
```

