# Procedure: ContarEmbarqueLineasValidadas

- **Module:** Embarques
- **Description:** Contar Embarque Lineas Validadas
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EmbarqueId | Parameter | NUMERIC | in | Embarque Id |
| TotalCard | Parameter | NUMERIC | out | Total Card |
| EmbarqueDetalleConfirmadoPorAdministracion | Variable | Boolean |  | Confirmado |
| ValueCard | Parameter | NUMERIC | out | Value Card |
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
for each DB.EmbarqueDetalle
		where EmbarqueId = &EmbarqueId
		
		&TotalCard = &TotalCard + 1

		
		
		&EmbarqueDetalleConfirmadoPorAdministracion = EmbarqueDetalleConfirmadoPorAdministracion
		if(&EmbarqueDetalleConfirmadoPorAdministracion)
			&ValueCard = &ValueCard +1
		endif
	
		
	endfor
```

### Rules (Rules)

```genexus
parm(in:&EmbarqueId, out:&TotalCard, out:&ValueCard);
```

