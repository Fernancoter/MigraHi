# Procedure: SDTerminarCarreraDB

- **Module:** Produccion
- **Description:** SDTerminar Carrera DB
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDCarreraItem | Variable | GX_SDT |  | SDCarrera Item |
| SDTCarreraItem | Variable | GX_SDT |  | SDTCarrera Item |
| SDTCarreraSD | Variable | GX_SDT |  | SDTCarrera SD |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| CarreteId | Variable | NUMERIC |  | Carrete Id |
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

	for each DB.Carrera
		where CarreraId > 0
		where CarreraEstado = EstadoCarrera.EnProceso
		&CarreraId = CarreraId
		SetEstadoCarrera.Call(&CarreraId, EstadoCarrera.Terminada)
		do 'CarretesEnRevision'
		SDPAddNotification(&CarreraId, NotificacionTipo.Carrera)
	endfor

        Sub 'CarretesEnRevision'
		for each DB.Carrete
			where CarreteId > 0
			where CarreteCarreraId = &CarreraId
			&CarreteId = CarreteId
			SetEstadoCarrete.Call(&CarreteId, EstadoCarrete.EnRevision, false)
		endfor
	EndSub
```

