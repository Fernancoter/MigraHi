# Procedure: CarretesReportado

- **Module:** Calidad
- **Description:** Carretes Reportado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ReclamoId | Parameter | NUMERIC | in | Reclamo Id |
| Carretes | Parameter | NUMERIC | out | Carretes |
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
&Carretes = 0

for each ReclamoDetalle
	where ReclamoDetalleId > 0
	where ReclamoId = &ReclamoId
	&Carretes += 1
endfor
```

### Rules (Rules)

```genexus
parm(in:&ReclamoId, out:&Carretes);
```

