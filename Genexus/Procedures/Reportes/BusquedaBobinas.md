# Procedure: BusquedaBobinas

- **Module:** Reportes
- **Description:** Busqueda Bobinas
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| HoraInicio | Parameter | DATETIME | in | Hora Inicio |
| BobinaHoraInicio | Parameter | DATETIME | out | Bobina Hora Inicio |
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
&BobinaHoraInicio.SetEmpty()

for each DB.Bobina
	order BobinaId
	where ExtrusionId = &ExtrusionId
	where BobinaHoraInicio > &HoraInicio
	//where BobinaEstado = Produccion.EstadoBobina.EnPrensado

	&BobinaHoraInicio = BobinaHoraInicio
	Exit
EndFor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&HoraInicio, out:&BobinaHoraInicio);
```

