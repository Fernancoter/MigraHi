# Procedure: ProgramarPrensado

- **Module:** Produccion
- **Description:** Programar Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| OperadorId | Parameter | NUMERIC | in | Operador Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| ExtrusionFecha | Variable | DATETIME |  | Fecha |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| itemSDTTurnoPorSemana | Variable | GX_SDT |  | item SDTTurno Por Semana |
| SDTExtrusionItem | Variable | GX_SDT |  | SDTExtrusion Item |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| Exito | Variable | Boolean |  | Exito |
| newExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| PrensadoFecha | Parameter | DATETIME | in | Prensado Fecha |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| Prensado | Parameter | GX_BUSCOMP | out | Prensado |
| newPrensadoId | Variable | NUMERIC |  | Prensado Id |
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

for each DB.Prensado
	Where PrensadoTurnoId = &TurnoId 
	Where PrensadoPrensaId = &PrensaId 
	where PrensadoFecha.Year() = &PrensadoFecha.Year()
		And PrensadoFecha.Month() = &PrensadoFecha.Month()
		And WWPBaseObjects.PrensadoFecha.Day() = &PrensadoFecha.Day()
	
	&PrensadoId = PrensadoId
	&Prensado.Load(&PrensadoId)
	exit
when none
	&newPrensadoId = CrearPrensado.Udp(&TurnoId,&PrensaId,&PrensadoFecha,&ProductoId,&OperadorId)
	
	if(&newPrensadoId>0)		
		&Prensado.Load(&newPrensadoId)
		
	else
		msg('Error en la configuración 1')
	endif
endfor
```

### Rules (Rules)

```genexus
parm(in:&TurnoId, in:&PrensaId, in:&PrensadoFecha,in:&ProductoId,in:&OperadorId,out:&Prensado);
```

