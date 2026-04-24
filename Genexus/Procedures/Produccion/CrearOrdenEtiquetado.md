# Procedure: CrearOrdenEtiquetado

- **Module:** Produccion
- **Description:** Crear Orden Etiquetado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| OEId | Parameter | NUMERIC | out | OEId |
| OperadorId | Parameter | NUMERIC | in | Operador Id |
| OrdenEtiquetado | Variable | GX_BUSCOMP |  | Orden Etiquetado |
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

	&OrdenEtiquetado = New()
	&OrdenEtiquetado.OrdenEtiquetadoFechaInicio = Now()
	&OrdenEtiquetado.OrdenEtiquetadoFechaTermina = Now()
	&OrdenEtiquetado.OrdenEtiquetadoEstado = EstadoOrdenEtiquetado.Abierta
	&OrdenEtiquetado.OperadorEtiquetadoId = &OperadorId
	&OrdenEtiquetado.TurnoEtiquetadoId = SDTurnoActual.Udp()
	&OrdenEtiquetado.Save()
	
	if(&OrdenEtiquetado.Success())
		&OEId = &OrdenEtiquetado.OrdenEtiquetadoId
		commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&OperadorId, out:&OEId);
```

