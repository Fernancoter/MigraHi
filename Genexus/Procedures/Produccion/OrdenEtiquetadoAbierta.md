# Procedure: OrdenEtiquetadoAbierta

- **Module:** Produccion
- **Description:** Orden Etiquetado Abierta
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
        
	&OEId = 0
	
	for each DB.OrdenEtiquetado
		where OrdenEtiquetadoId > 0
		where OperadorEtiquetadoId = &OperadorId
		where OrdenEtiquetadoEstado = EstadoOrdenEtiquetado.Abierta
		&OEId = OrdenEtiquetadoId
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&OperadorId, out:&OEId);
```

