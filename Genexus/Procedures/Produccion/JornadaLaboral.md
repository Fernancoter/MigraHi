# Procedure: JornadaLaboral

- **Module:** Produccion
- **Description:** Jornada Laboral
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FechaLaboral | Parameter | DATE | out | Fecha Laboral |
| HoraFin | Variable | DATETIME |  | Hora Fin |
| HoraInicio | Variable | DATETIME |  | Hora Inicio |
| Now | Variable | DATETIME |  | Now |
| Hora | Variable | NUMERIC |  | Hora |
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
	&Now = Now()
	&Today = Today()
	&Hora = &Now.Hour()
	
	&FechaLaboral = &Today
	if(&Hora < 6)
		&FechaLaboral = &Today - 1
	endif

//	do 'JornadaInicioHora'
//	do 'FechaLaboral'
//	
//	Sub 'FechaLaboral'
//		if(&Now.Hour() >= &HoraInicio.Hour())
//			&FechaLaboral = &Today
//		else
//		        &FechaLaboral = &Today - 1
//		endif
//        EndSub
//	
//	Sub 'JornadaInicioHora'
//		for each DB.Turno
//			where TurnoId > 0
//			where TurnoEnum = EnumTurno.UNO
//			&HoraInicio = TurnoHoraInicio
//			Exit
//		endfor
//	endsub
```

### Rules (Rules)

```genexus
parm(out:&FechaLaboral);
```

