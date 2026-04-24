# Procedure: ObtenerDatosRemisionDesdeSAE

- **Module:** Embarques
- **Description:** Obtener Datos Remision Desde SAE
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CustomerName | Parameter | VARCHAR | out | Cliente |
| OrderDoc | Variable | VARCHAR |  | Pedido SAE |
| OrderShipping | Parameter | VARCHAR | out | Envío |
| ConsolidatedName | Parameter | VARCHAR | out | Grupo |
| CustomerShipping | Parameter | VARCHAR | out | Envió |
| EmbarqueFecha | Variable | DATE |  | Fecha de Embarque |
| RemissionDoc | Parameter | VARCHAR | in | Remisión SAE |
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
for each DB.Remission
	Where RemissionDoc = &RemissionDoc
	
	&OrderDoc = OrderDoc
	&CustomerName = WWPBaseObjects.CustomerName
	&ConsolidatedName = ConsolidatedName
	&CustomerShipping = CustomerShipping
	
	exit
when none
	&EmbarqueFecha = now()
endfor

For each DB.Order
	where OrderDoc = &OrderDoc
	&OrderShipping = OrderShipping
	exit
	
endfor
```

### Rules (Rules)

```genexus
parm(in:&RemissionDoc, out:&CustomerName, out:&OrderShipping, out:&ConsolidatedName, out:&CustomerShipping);
```

