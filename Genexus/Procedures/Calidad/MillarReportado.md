# Procedure: MillarReportado

- **Module:** Calidad
- **Description:** Millar Reportado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteMillar | Variable | NUMERIC |  | Carrete Millar |
| MillarReportado | Parameter | NUMERIC | out | Millar Reportado |
| ReclamoId | Parameter | NUMERIC | in | Reclamo Id |
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
        
	&MillarReportado = 0
	
	for each ReclamoDetalle
		where ReclamoDetalleId > 0
		where ReclamoId = &ReclamoId
                &CarreteMillar = ReclamoDetalleMillar
		&MillarReportado += &CarreteMillar
	endfor
```

### Rules (Rules)

```genexus
parm(in:&ReclamoId, out:&MillarReportado);
```

