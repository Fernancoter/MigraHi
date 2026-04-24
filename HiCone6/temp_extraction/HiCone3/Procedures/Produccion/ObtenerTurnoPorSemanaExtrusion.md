# Procedure: ObtenerTurnoPorSemanaExtrusion

- **Module:** Produccion
- **Description:** Obtener Turno Por Semana Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CollectionExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| DefaultOperadorId | Variable | NUMERIC |  | Operador Id |
| DefaultProductoId | Variable | NUMERIC |  | Producto Id |
| e | Variable | NUMERIC |  | e |
| Exito | Variable | Boolean |  | Exito |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| i | Variable | NUMERIC |  | i |
| infinSemana | Parameter | DATE | in | infin Semana |
| InicioSemana | Variable | DATETIME |  | Inicio Semana |
| inInicioSemana | Parameter | DATE | in | in Inicio Semana |
| itemSDTTurnoPorSemana | Variable | GX_SDT |  | item SDTTurno Por Semana |
| SDTExtrusion | Variable | GX_SDT |  | SDTExtrusion |
| SDTTurnoPorSemana | Parameter | GX_SDT | out | SDTTurno Por Semana |
| Turno | Variable | GX_BUSCOMP |  | Turno |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
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

&fin = &infinSemana.DayOfWeek()

&Turno.Load(&TurnoId)


IF(NOT &inInicioSemana.IsEmpty())
	
	&InicioSemana = &inInicioSemana
	&InicioSemana = &InicioSemana.AddHours(&Turno.TurnoHoraInicio.Hour())
	
	For &i = 1 to 7
		
		
		
		&itemSDTTurnoPorSemana = new()
		
		&itemSDTTurnoPorSemana.Dia = &InicioSemana.DayOfWeekName('ES')
		&itemSDTTurnoPorSemana.Fecha = &InicioSemana 
		&itemSDTTurnoPorSemana.ExtrusoraId = &ExtrusoraId
		&itemSDTTurnoPorSemana.Hora = &InicioSemana
			
				
		ObtenerExtrusoraValoresPredeterminados.Call(&ExtrusoraId,&TurnoId, &DefaultProductoId,&DefaultOperadorId)
		if(&DefaultProductoId >0)	
			
			
			&Extrusion = ProgramarExtrusion.Udp(&TurnoId,&ExtrusoraId,&itemSDTTurnoPorSemana.Fecha,&DefaultProductoId,&DefaultOperadorId)
			if(&Extrusion.ExtrusionId>0)	
				&itemSDTTurnoPorSemana.ExtrusionId1 =  &Extrusion.ExtrusionId
				&itemSDTTurnoPorSemana.ProductoId1 =  &Extrusion.ExtrusionProductoId
				&itemSDTTurnoPorSemana.OperadorId1 = &Extrusion.ExtrusionOperadorId
				&itemSDTTurnoPorSemana.Meta1 = &Extrusion.ExtrusionMeta
				&itemSDTTurnoPorSemana.ExtrusionEstado1 = &Extrusion.ExtrusionEstado
				&itemSDTTurnoPorSemana.Producido1 = &Extrusion.ExtrusionResultadoBobinasReposoTotales
				
			else
				msg('Error en Configuración')
			endif
			&SDTTurnoPorSemana.Add(&itemSDTTurnoPorSemana)	
		endif
	
			
		if(&InicioSemana.DayOfWeek() = 1) Or (&InicioSemana.DayOfWeek() = &fin)
			exit 
		endif
		
		&InicioSemana = &InicioSemana.AddDays(1)
	
	
		
	Endfor
ENDIF
```

### Rules (Rules)

```genexus
parm(in:&ExtrusoraId,in:&inInicioSemana,In:&infinSemana,in:&TurnoId, out:&SDTTurnoPorSemana);
```

