# Procedure: GuardarOrdenEtiquetado

- **Module:** Produccion
- **Description:** Guardar Orden Etiquetado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoResultado | Variable | GX_BUSCOMP |  | Prensado Resultado |
| isOK | Parameter | Boolean | out | is OK |
| SDTPrensadoResultado | Variable | GX_SDT |  | SDTPrensado Resultado |
| SDTOrdenEtiquetado | Parameter | GX_SDT | in | SDTOrden Etiquetado |
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
	
	&isOK = false
	
	&OrdenEtiquetado.Load(&SDTOrdenEtiquetado.OrdenEtiquetadoId)
	&OrdenEtiquetado.FromJson(&SDTOrdenEtiquetado.ToJson())
	&OrdenEtiquetado.Save()
	
	if(&OrdenEtiquetado.Success())
		commit
		&isOK = true
	endif
```

### Rules (Rules)

```genexus
parm(in:&SDTOrdenEtiquetado, out:&isOK);
```

