# Procedure: SDTiempoPrensado

- **Module:** Produccion
- **Description:** SDTiempo Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IniciaProceso | Parameter | DATETIME | in | Inicia Proceso |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| SgtePrensado | Variable | GX_BUSCOMP |  | Sgte Prensado |
| SgtePrensadoFecha | Variable | DATETIME |  | Prensado Fecha |
| SgtePrensadoId | Variable | NUMERIC |  | Prensado Id |
| TiempoMin | Parameter | NUMERIC | out | Tiempo Min |
| Tiempo | Variable | NUMERIC |  | Tiempo |
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
&SgtePrensadoId = SgteTurnoPrensado.Udp(&PrensadoId)

if(&SgtePrensadoId > 0)
	&SgtePrensado.Load(&SgtePrensadoId)
	&SgtePrensadoFecha = &SgtePrensado.PrensadoFecha
	&Tiempo = &SgtePrensadoFecha.Difference(&IniciaProceso)
	&TiempoMin = (&Tiempo/60) - 60
else
	&TiempoMin = SDTiempoLaboral.Udp()
endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&IniciaProceso, out:&TiempoMin);
```

