# Procedure: ObtenerTurnoPorSemanaPrensado

- **Module:** Produccion
- **Description:** Obtener Turno Por Semana Prensado
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
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| i | Variable | NUMERIC |  | i |
| InicioSemana | Variable | DATETIME |  | Inicio Semana |
| inInicioSemana | Parameter | DATE | in | in Inicio Semana |
| itemSDTTurnoPorSemana | Variable | GX_SDT |  | item SDTTurno Por Semana |
| SDTExtrusion | Variable | GX_SDT |  | SDTExtrusion |
| SDTTurnoPorSemana | Parameter | GX_SDT | out | SDTTurno Por Semana |
| Turno | Variable | GX_BUSCOMP |  | Turno |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| infinSemana | Parameter | DATE | in | infin Semana |
| fin | Variable | NUMERIC |  | fin |
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
		&itemSDTTurnoPorSemana.PrensaId = &PrensaId
		&itemSDTTurnoPorSemana.Hora = &InicioSemana
		
		ObtenerPrensaValoresPredeterminados.Call(&PrensaId,&TurnoId, &DefaultProductoId,&DefaultOperadorId)

		WWPBaseObjects.WWP_Logger.Debug(&Pgmname, &PrensaId.ToString())

		if(&DefaultProductoId >0)	
			
			 
			&Prensado = ProgramarPrensado.Udp(&TurnoId,&PrensaId,&itemSDTTurnoPorSemana.Fecha,&DefaultProductoId,&DefaultOperadorId)
			if(&Prensado.PrensadoId>0)	
				&itemSDTTurnoPorSemana.PrensadoId1 =  &Prensado.PrensadoId
				&itemSDTTurnoPorSemana.ProductoId1 =  &Prensado.PrensadoProductoId
				&itemSDTTurnoPorSemana.OperadorId1 = &Prensado.PrensadoOperadorId
				&itemSDTTurnoPorSemana.Meta1 = &Prensado.PrensadoMeta
				&itemSDTTurnoPorSemana.PrensadoEstado1 = &Prensado.PrensadoEstado
				&itemSDTTurnoPorSemana.Fecha = &Prensado.PrensadoFecha
				&itemSDTTurnoPorSemana.Hora = &Prensado.PrensadoFecha
				&itemSDTTurnoPorSemana.Producido1 = &Prensado.PrensadoTotalPalets
				
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
parm(in:&PrensaId,in:&inInicioSemana,In:&infinSemana, in:&TurnoId, out:&SDTTurnoPorSemana);
```

