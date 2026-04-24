# Procedure: SDValidarCarrera

- **Module:** Produccion
- **Description:** SDValidar Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| CarreraSDItem | Variable | GX_SDT |  | Carrera SDItem |
| PaletId | Variable | NUMERIC |  | Palet Id |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| SDTCarrera | Variable | GX_SDT |  | SDTCarrera |
| SDTCarreraItem | Variable | GX_SDT |  | SDTCarrera Item |
| SDTCarreraSD | Parameter | GX_SDT | in | SDTCarrera SD |
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
	
	for &CarreraSDItem in &SDTCarreraSD
		if(&CarreraSDItem.CarreraEstado = EstadoCarrera.Terminada)
			&CarreraId = &CarreraSDItem.CarreraId
			VincularCarretePalet.Call(&CarreraId, &PaletId, &PrensadoId)
			SetEstadoCarrera.Call(&CarreraId,EstadoCarrera.Validada)
		endif
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&SDTCarreraSD);
```

