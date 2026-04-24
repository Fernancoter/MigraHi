# Procedure: SDTiempoExtrusion

- **Module:** Produccion
- **Description:** SDTiempo Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| IniciaProceso | Parameter | DATETIME | in | Inicia Proceso |
| SgteExtrusion | Variable | GX_BUSCOMP |  | Sgte Extrusion |
| SgteExtrusionFecha | Variable | DATETIME |  | Fecha |
| SgteExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| Tiempo | Variable | NUMERIC |  | Tiempo |
| TiempoMin | Parameter | NUMERIC | out | Tiempo Min |
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
&SgteExtrusionId = SgteTurnoExtrusora.Udp(&ExtrusionId)

if(&SgteExtrusionId > 0)
	&SgteExtrusion.Load(&SgteExtrusionId)
	&SgteExtrusionFecha = &SgteExtrusion.ExtrusionFecha
	&Tiempo = &SgteExtrusionFecha.Difference(&IniciaProceso)
	&TiempoMin = (&Tiempo/60) - 60
else
	&TiempoMin = SDTiempoLaboral.Udp()
endif
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&IniciaProceso, out:&TiempoMin);
```

