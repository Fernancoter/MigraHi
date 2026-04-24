# Procedure: ObtenerInterrupcionCarrera

- **Module:** Produccion
- **Description:** Obtener Interrupcion Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaHoraInicio | Variable | DATETIME |  | Bobina Hora Inicio |
| BobinaHoraSalida | Variable | DATETIME |  | Bobina Hora Salida |
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| InterrupcionId | Parameter | NUMERIC | out | Interrupcion Id |
| CarreraFechaRegistro | Parameter | DATETIME | in | Carrera Fecha Registro |
| CarreraFechaValidacion | Parameter | DATETIME | in | Carrera Fecha Validacion |
| AuxInterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
| CarreraEstado | Parameter | VARCHAR | in | Carrera Estado |
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
/*If &CarreraFechaValidacion.IsEmpty()
	&CarreraFechaValidacion = Today()
EndIf*/

For Each
	Order InterrupcionHoraInicio
	Where InterrupcionHoraInicio >= &CarreraFechaRegistro
    //Where InterrupcionHoraFin <= &CarreraFechaValidacion.AddDays(1)
	Where &CarreraEstado = 'En Proceso' or InterrupcionHoraFin <= &CarreraFechaValidacion

    //Where InterrupcionId = PrensadoInterrupcion.InterrupcionId
    Defined by InterrupcionId

    &AuxInterrupcionId = InterrupcionId
	For Each DB.PrensadoInterrupcion
		Where InterrupcionId = &AuxInterrupcionId
			&InterrupcionId = InterrupcionId
		Exit
	EndFor
EndFor
```

### Rules (Rules)

```genexus
parm(in:&CarreraFechaRegistro, in:&CarreraFechaValidacion,in:&CarreraEstado, out:&InterrupcionId);
```

