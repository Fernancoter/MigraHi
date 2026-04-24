# Procedure: SDPrensadoInterrupcion

- **Module:** Produccion
- **Description:** SDPrensado Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Id | Parameter | NUMERIC | in | Id |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensadoInterrupcion | Variable | GX_BUSCOMP |  | Prensado Interrupcion |
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
	
	&PrensadoInterrupcion = New()
	&PrensadoInterrupcion.InterrupcionId = &Id
	&PrensadoInterrupcion.PrensadoId = &PrensadoId
	&PrensadoInterrupcion.Save()
	
	if(&PrensadoInterrupcion.Success())
		commit
	else
		msg(&PrensadoInterrupcion.GetMessages().ToJson())
	endif
```

### Rules (Rules)

```genexus
parm(in:&Id, in:&PrensadoId);
```

