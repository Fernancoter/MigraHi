# Procedure: SiguienteInterrupcion

- **Module:** Reportes
- **Description:** Siguiente Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ExtrusionInterrupcionId | Parameter | NUMERIC | in | Extrusion Interrupcion Id |
| SiguienteInterrupcionId | Parameter | NUMERIC | out | Interrupcion Id |
| InterrupcionId | Variable | NUMERIC |  | Interrupcion Id |
| IsOk | Variable | Boolean |  | Is Ok |
| Interrupcion | Variable | GX_BUSCOMP |  | Interrupcion |
| SiguienteInterrupcion | Variable | GX_BUSCOMP |  | Siguiente Interrupcion |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| SiguienteExtrusionInterrupcionId | Parameter | NUMERIC | out | Extrusion Interrupcion Id |
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
&SiguienteInterrupcionId = 0
&IsOk = False

for each DB.ExtrusionInterrupcion
	order ExtrusionInterrupcionId // Aseguramos el orden
	where ExtrusionInterrupcionId > &ExtrusionInterrupcionId
	where ExtrusionId = &ExtrusionId
	where InterrupcionId > 0
	where InterrupcionConcluida = True

	&SiguienteExtrusionInterrupcionId = ExtrusionInterrupcionId
	&SiguienteInterrupcionId = InterrupcionId

	exit // Salimos tras encontrar la primera interrupción válida
endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in: &ExtrusionInterrupcionId, out: &SiguienteExtrusionInterrupcionId, out: &SiguienteInterrupcionId);
```

