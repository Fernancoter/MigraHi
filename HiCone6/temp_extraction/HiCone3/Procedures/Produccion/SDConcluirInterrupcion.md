# Procedure: SDConcluirInterrupcion

- **Module:** Produccion
- **Description:** SDConcluir Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Interrupcion | Variable | GX_BUSCOMP |  | Interrupcion |
| Temporizador | Variable | NUMERIC |  | Temporizador |
| Id | Parameter | NUMERIC | in | Id |
| Now | Variable | DATETIME |  | Now |
| HoraInicio | Variable | DATETIME |  | Hora Inicio |
| DownTimeCodeId | Parameter | VARCHAR | inout | Down Time Code Id |
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
	
	//Concluir Interrupcion
	&Interrupcion.Load(&Id)
	&HoraInicio = &Interrupcion.InterrupcionHoraInicio
	&Temporizador = &Now.Difference(&HoraInicio)
	&Interrupcion.InterrupcionHoraFin = &Now
	&Interrupcion.InterrupcionTiempo = &Temporizador
	&Interrupcion.DB.InterrupcionConcluida = true
	&Interrupcion.DownTimeCodeId = &DownTimeCodeId
	&Interrupcion.Save()
	
	if(&Interrupcion.Success())
		commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&Id,&DownTimeCodeId);
```

