# Procedure: LlenadoCarreraInterrupcion

- **Module:** DB
- **Description:** Llenado Carrera Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
| InterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
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
	Where CarreraId > 633800
	&InterrupcionId = ObtenerInterrupcionCarrera.Udp(CarreraFechaRegistro,CarreraFechaValidacion, CarreraEstado)
	&Carrera.Load(CarreraId)
	&Carrera.CarreraInterrupcionId= &InterrupcionId
	&Carrera.Save()
	If &Carrera.Success()
		Commit
	EndIf
EndFor
```

