# Procedure: NotificarFechaEmbarque

- **Module:** SAE
- **Description:** Notificar Fecha Embarque
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Budget | Variable | GX_BUSCOMP |  | Budget |
| BudgetMonth | Variable | NUMERIC |  | Budget Month |
| BudgetYear | Variable | NUMERIC |  | Budget Year |
| Customer | Variable | VARCHAR |  | Customer |
| FechaFin | Parameter | DATE | in | Fecha Fin |
| FechaInicio | Parameter | DATE | in | Fecha Inicio |
| i | Variable | NUMERIC |  | i |
| porcentaje | Variable | NUMERIC |  | porcentaje |
| ProductNumber | Variable | VARCHAR |  | Product Number |
| ProgressIndicator | Variable | GX_EXTERNAL_OBJECT |  | Progress Indicator |
| total | Variable | NUMERIC |  | total |
| Updating | Variable | VARCHAR |  | Updating |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| OrderDoc | Variable | VARCHAR |  | Pedido SAE |
| RemissionDoc | Variable | VARCHAR |  | Remisión SAE |
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
	      Order RemissionDate
	      where RemissionDate >= &FechaInicio and RemissionDate <= &FechaFin
	      &OrderDoc = OrderDoc
	      &RemissionDoc = RemissionDoc
	      
	      //Revisar cambios de fecha
	      InicializarEmbarque.Call(&OrderDoc, &RemissionDoc)
      endfor
```

### Rules (Rules)

```genexus
parm(in:&FechaInicio, in:&FechaFin);
```

