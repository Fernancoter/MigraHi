# Procedure: ValidarEmbarqueRemission

- **Module:** Embarques
- **Description:** Validar Embarque Remission
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Existe | Variable | Boolean |  | Existe |
| OrderDoc | Parameter | VARCHAR | in | Order Doc |
| RemissionDoc | Parameter | VARCHAR | in | Remission Doc |
| EmbarqueId | Parameter | NUMERIC | out | Embarque Id |
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
for each DB.Embarque
	Where EmbarqueRemissionDoc.Trim() = &RemissionDoc.Trim()
	Where EmbarqueOrderDoc.Trim() = &OrderDoc.Trim()
	Where DB.EmbarqueEstatus <> EstatusEmbarque.PorProgramar
	&EmbarqueId = EmbarqueId
	
	
when none
 &EmbarqueId = 0
endfor
```

### Rules (Rules)

```genexus
parm(in:&OrderDoc,in:&RemissionDoc,out:&EmbarqueId);
```

