# DataProvider: OperadorOrdenEtiquetadoDP

- **Module:** Produccion
- **Description:** Operador Orden Etiquetado DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| OrdenEtiquetadoId | Parameter | NUMERIC | in | Orden Etiquetado Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTOperador
Where OrdenEtiquetadoId = &OrdenEtiquetadoId 
{
	SDTOperadorItem
	{
		OperadorId = OrdenEtiquetadoId
		OperadorNombre = OperadorEtiquetadoNombre
		
	}
}
```

### Rules (Rules)

```genexus
parm(in:&OrdenEtiquetadoId);
```

