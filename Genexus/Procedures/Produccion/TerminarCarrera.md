# Procedure: TerminarCarrera

- **Module:** Produccion
- **Description:** Terminar Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTCarrera | Parameter | GX_SDT | in | SDTCarrera |
| SDTCarreraItem | Variable | GX_SDT |  | SDTCarrera Item |
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

	for &SDTCarreraItem in &SDTCarrera
		if(&SDTCarreraItem.CarreraEstado = EstadoCarrera.EnProceso)
			Produccion.SetEstadoCarrera.Call(&SDTCarreraItem.CarreraId, EstadoCarrera.Terminada)
		endif
	endfor
```

### Rules (Rules)

```genexus
parm(in:&SDTCarrera);
```

