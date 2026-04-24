# Procedure: SDTurnoActual

- **Module:** Produccion
- **Description:** SDTurno Actual
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Now | Variable | DATETIME |  | Now |
| TurnoId | Parameter | NUMERIC | out | Turno Id |
| TurnoHoraFin | Variable | DATETIME |  | Turno Hora Fin |
| Diff | Variable | NUMERIC |  | Diff |
| HoraInicio | Variable | NUMERIC |  | Hora Inicio |
| Hora | Variable | NUMERIC |  | Hora |
| HoraFin | Variable | NUMERIC |  | Hora Fin |
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
&TurnoId = 0
&Now = Now()
&Hora = &Now.Hour()

for each DB.Turno
	Order TurnoHoraInicio
	where TurnoId > 0
	&TurnoId = TurnoId
	&HoraInicio = TurnoHoraInicio.Hour()
	&HoraFin = TurnoHoraFin.Hour()
	&Diff = &HoraFin - &HoraInicio
	
	Do Case
		Case &Diff > 0 and &Hora >= &HoraInicio and &Hora < &HoraFin
		     Exit
		
		Case &Diff < 0 and (&Hora >= &HoraInicio or &Hora < &HoraFin)
		     Exit
	EndCase
endfor
```

### Rules (Rules)

```genexus
parm(out:&TurnoId);
```

