# Procedure: ValidarCarrera

- **Module:** Produccion
- **Description:** Validar Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| PaletId | Variable | NUMERIC |  | Palet Id |
| SDTCarrera | Parameter | GX_SDT | in | SDTCarrera |
| SDTCarreraItem | Variable | GX_SDT |  | SDTCarrera Item |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
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
	&PaletId = ObtenerPalet.Udp(&PrensadoId)
	
	for &SDTCarreraItem in &SDTCarrera
		if(&SDTCarreraItem.CarreraEstado = EstadoCarrera.Terminada)
			&CarreraId = &SDTCarreraItem.CarreraId
			VincularCarretePalet.Call(&CarreraId, &PaletId)
			SetEstadoCarrera.Call(&CarreraId,EstadoCarrera.Validada)
		endif
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&SDTCarrera);
```

