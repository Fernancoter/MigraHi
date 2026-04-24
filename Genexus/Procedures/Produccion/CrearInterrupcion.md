# Procedure: CrearInterrupcion

- **Module:** Produccion
- **Description:** Crear Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Interrupcion | Variable | GX_BUSCOMP |  | Interrupcion |
| InterrupcionId | Parameter | NUMERIC | out | Interrupcion Id |
| Motivo | Parameter | VARCHAR | in | Motivo |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| FechaRegistro | Parameter | DATE | out | Fecha Registro |
| Now | Variable | DATETIME |  | Now |
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
	&FechaRegistro = &Now.ToDate()

	//Guardar Interrupcion
    &Interrupcion = New()
	&Interrupcion.InterrupcionHoraInicio = &Now
	&Interrupcion.InterrupcionHoraFin = &Now
	&Interrupcion.InterrupcionMotivo = &Motivo
	&Interrupcion.DownTimeCodeId.SetNull()
	&Interrupcion.Save()

	if(&Interrupcion.Success())
		&InterrupcionId = &Interrupcion.InterrupcionId
		commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&Motivo, out:&InterrupcionId, out:&FechaRegistro);
```

