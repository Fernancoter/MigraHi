# Procedure: SDCarreteMolino

- **Module:** Produccion
- **Description:** SDCarrete Molino
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Parameter | NUMERIC | in | Carrera Id |
| CarreteNoLinea | Parameter | NUMERIC | in | Carrete No Linea |
| Checked | Parameter | Boolean | in | Checked |
| CarreteId | Parameter | NUMERIC | out | Carrete Id |
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
	
	for each
		where CarreteId > 0
		where CarreteCarreraId = &CarreraId
		where CarreteNoLinea = &CarreteNoLinea
		&CarreteId = CarreteId
		Exit
	endfor

	if(&Checked)
		SetEstadoCarrete.Call(&CarreteId, EstadoCarrete.Molino, &Checked)
	else
		//SetEstadoCarrete.Call(&CarreteId, EstadoCarrete.Valido, &Checked)
	endif
```

### Rules (Rules)

```genexus
parm(in:&CarreraId, in:&CarreteNoLinea, in:&Checked, out:&CarreteId);
```

