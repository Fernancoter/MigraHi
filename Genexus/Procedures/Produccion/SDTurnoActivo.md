# Procedure: SDTurnoActivo

- **Module:** Produccion
- **Description:** SDTurno Activo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HoraFin | Variable | DATETIME |  | Hora Fin |
| HoraInicio | Variable | DATETIME |  | Hora Inicio |
| Tiempo | Variable | DATETIME |  | Tiempo |
| TurnoId | Parameter | NUMERIC | out | Turno Id |
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
&Tiempo = Now()

for each DB.Turno
	where TurnoId > 0
	&HoraInicio = TurnoHoraInicio
	&HoraFin = TurnoHoraFin
	
        if(&Tiempo >= &HoraInicio and &Tiempo < &HoraFin)
		&TurnoId = TurnoId
		Exit
	endif

when none
	&TurnoId = 0
endfor
```

### Rules (Rules)

```genexus
parm(out:&TurnoId);
```

