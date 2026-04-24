# Procedure: ProgramarExtrusion

- **Module:** Produccion
- **Description:** Programar Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| OperadorId | Parameter | NUMERIC | in | Operador Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| ExtrusionFecha | Parameter | DATETIME | in | Fecha |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| itemSDTTurnoPorSemana | Variable | GX_SDT |  | item SDTTurno Por Semana |
| SDTExtrusionItem | Variable | GX_SDT |  | SDTExtrusion Item |
| Extrusion | Parameter | GX_BUSCOMP | out | Extrusion |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| Exito | Variable | Boolean |  | Exito |
| newExtrusionId | Variable | NUMERIC |  | Extrusion Id |
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



for each DB.Extrusion
	Where ExtrusionTurnoId = &TurnoId 
	Where ExtrusionExtrusoraId = &ExtrusoraId 
	where ExtrusionFecha = &ExtrusionFecha 
	
	
	
	&ExtrusionId = ExtrusionId
	&Extrusion.Load(&ExtrusionId)
	exit
when none
	&newExtrusionId = CrearExtrusion.Udp(&TurnoId,&ExtrusoraId,&ExtrusionFecha,&ProductoId,&OperadorId)
	
	if(&newExtrusionId>0)		
		&Extrusion.Load(&newExtrusionId)
		
	else
		msg('Error en la configuración 1')
	endif
endfor
```

### Rules (Rules)

```genexus
parm(in:&TurnoId, in:&ExtrusoraId, in:&ExtrusionFecha,in:&ProductoId,in:&OperadorId,out:&Extrusion);
```

