# Procedure: ObtenerInterrupcionBobina

- **Module:** Produccion
- **Description:** Obtener Interrupcion Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaHoraInicio | Parameter | DATETIME | in | Bobina Hora Inicio |
| BobinaHoraSalida | Parameter | DATETIME | in | Bobina Hora Salida |
| BobinaEstado | Parameter | VARCHAR | in | Bobina Estado |
| InterrupcionId | Parameter | NUMERIC | out | Interrupcion Id |
| AuxInterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
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
For Each
	Order InterrupcionHoraInicio
    Where InterrupcionHoraInicio >= &BobinaHoraInicio
    Where &BobinaEstado = 'En Proceso' or InterrupcionHoraFin <= &BobinaHoraSalida
    Defined by InterrupcionId
    &AuxInterrupcionId = InterrupcionId
	For Each DB.ExtrusionInterrupcion
		Where InterrupcionId = &AuxInterrupcionId
			&InterrupcionId = InterrupcionId
		Exit
	EndFor
EndFor
```

### Rules (Rules)

```genexus
parm(in:&BobinaHoraInicio, in:&BobinaHoraSalida, in:&BobinaEstado, out:&InterrupcionId);
```

