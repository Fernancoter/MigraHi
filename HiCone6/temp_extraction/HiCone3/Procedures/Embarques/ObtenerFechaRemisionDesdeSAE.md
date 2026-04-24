# Procedure: ObtenerFechaRemisionDesdeSAE

- **Module:** Embarques
- **Description:** Obtener Fecha Remision Desde SAE
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| RemissionDoc | Parameter | VARCHAR | in | Remisión SAE |
| EmbarqueFecha | Parameter | DATE | out | Fecha de Embarque |
| CustomerName | Variable | VARCHAR |  | Cliente |
| OrderShipping | Variable | VARCHAR |  | Envío |
| OrderDoc | Variable | VARCHAR |  | Pedido SAE |
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
	&EmbarqueFecha =  RemissionDate
	exit
when none
	&EmbarqueFecha = now()
endfor
```

### Rules (Rules)

```genexus

parm(in:&RemissionDoc, out:&EmbarqueFecha);
```

