# Procedure: LlenadoBobinaInterrupcion

- **Module:** DB
- **Description:** Llenado Bobina Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| InterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
| Interrupcion | Variable | GX_BUSCOMP |  | Interrupcion |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
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
	Where BobinaId > 410600
	&InterrupcionId = ObtenerInterrupcionBobina.Udp(BobinaHoraInicio, BobinaHoraSalida, BobinaEstado)
	&Bobina.Load(BobinaId)
	&Bobina.BobinaInterrupcionesId = &InterrupcionId
	&Bobina.Save()
	If &Bobina.Success()
		Commit
	EndIf
EndFor
```

