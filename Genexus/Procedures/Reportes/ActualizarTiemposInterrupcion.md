# Procedure: ActualizarTiemposInterrupcion

- **Module:** Reportes
- **Description:** Actualizar Tiempos Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ExtrusionInterrupcionId | Variable | NUMERIC |  | Extrusion Interrupcion Id |
| SiguienteInterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
| InterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
| IsOk | Parameter | Boolean | out | Is Ok |
| Interrupcion | Variable | GX_BUSCOMP |  | Interrupcion |
| SiguienteInterrupcion | Variable | GX_BUSCOMP |  | Siguiente Interrupcion |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| SiguienteExtrusionInterrupcionId | Variable | NUMERIC |  | Extrusion Interrupcion Id |
| HoraInicio | Variable | DATETIME |  | Hora Inicio |
| BobinaHoraInicio | Variable | DATETIME |  | Bobina Hora Inicio |
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
&SiguienteInterrupcionId = 0
&IsOk = False

for each DB.ExtrusionInterrupcion
	order ExtrusionInterrupcionId // Ordenamos por ID
    where ExtrusionId = &ExtrusionId
    where InterrupcionId > 0
    where InterrupcionConcluida = False

	&InterrupcionId = InterrupcionId
	&HoraInicio = InterrupcionHoraInicio
    &ExtrusionInterrupcionId = ExtrusionInterrupcionId

    // Buscar la siguiente interrupción concluida
    SiguienteInterrupcion.Call(&ExtrusionId,&ExtrusionInterrupcionId, &SiguienteExtrusionInterrupcionId, &SiguienteInterrupcionId)

	if &SiguienteInterrupcionId > 0
		
		&SiguienteInterrupcion.Load(&SiguienteInterrupcionId)
		
		&Interrupcion.Load(&InterrupcionId)
		&Interrupcion.InterrupcionHoraFin = &SiguienteInterrupcion.InterrupcionHoraInicio
		&Interrupcion.InterrupcionConcluida = True
		&Interrupcion.InterrupcionTiempo = &SiguienteInterrupcion.InterrupcionHoraInicio.Difference(&Interrupcion.InterrupcionHoraInicio)
		&Interrupcion.DownTimeCodeId = &SiguienteInterrupcion.DownTimeCodeId
		&Interrupcion.Save()
		
		if(&Interrupcion.Success())
			msg('Se actualizó la información de una interrupción que no fue cerrada')
			&IsOk = True
			commit
		endif
		
	else
		BusquedaBobinas.Call(&ExtrusionId,&HoraInicio,&BobinaHoraInicio)
		
		If &BobinaHoraInicio > &HoraInicio
			
			&Interrupcion.Load(&InterrupcionId)
			&Interrupcion.InterrupcionHoraFin = &BobinaHoraInicio
			&Interrupcion.InterrupcionConcluida = True
			&Interrupcion.InterrupcionTiempo = &BobinaHoraInicio.Difference(&Interrupcion.InterrupcionHoraInicio)
			&Interrupcion.DownTimeCodeId.SetNull()
			&Interrupcion.Save()
	
			if(&Interrupcion.Success())
				msg('Se actualizó la información de una interrupción que no fue cerrada en base a la hora de inicio de la siguiente bobina perteneciente a esta extrusión')
				&IsOk = True
				commit
			endif
			
		Else
			
			&Extrusion.Load(&ExtrusionId)

			If &Extrusion.ExtrusionEstado = Produccion.EstadoExtrusion.Terminada
	
				&Interrupcion.Load(&InterrupcionId)
				&Interrupcion.InterrupcionHoraFin = &Extrusion.ExtrusionHoraFinProceso
				&Interrupcion.InterrupcionConcluida = True
				&Interrupcion.InterrupcionTiempo = &Extrusion.ExtrusionHoraFinProceso.Difference(&Interrupcion.InterrupcionHoraInicio)
				&Interrupcion.DownTimeCodeId.SetNull()
				&Interrupcion.Save()
	
				if(&Interrupcion.Success())
					msg('Se actualizó la información de una interrupción que no fue cerrada en base a la hora de fin de la extrusión')
					&IsOk = True
					commit
				endif
			EndIf
			
		EndIf
		

	endif

endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out: &IsOk);
```

