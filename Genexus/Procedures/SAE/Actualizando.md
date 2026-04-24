# Procedure: Actualizando

- **Module:** SAE
- **Description:** Actualizando
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Budget | Variable | GX_BUSCOMP |  | Budget |
| BudgetMonth | Variable | NUMERIC |  | Budget Month |
| BudgetYear | Variable | NUMERIC |  | Budget Year |
| Customer | Variable | VARCHAR |  | Customer |
| i | Variable | NUMERIC |  | i |
| ProductNumber | Variable | VARCHAR |  | Product Number |
| ProgressIndicator | Variable | GX_EXTERNAL_OBJECT |  | Progress Indicator |
| total | Variable | NUMERIC |  | total |
| porcentaje | Variable | NUMERIC |  | porcentaje |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| Updating | Variable | VARCHAR |  | Updating |
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

	

	&ProgressIndicator.Value = 0
	&ProgressIndicator.MaxValue = 99
	&ProgressIndicator.Type = ProgressIndicatorType.Determinate
	&ProgressIndicator.ShowWithTitle("Updating...")
	&total = 0
	&i = 0
	For each
		&Customer = Customer
		&ProductNumber = ProductNumber
		&BudgetYear =  BudgetYear
		&BudgetMonth = BudgetMonth
		&i = &i + 1
	endfor
	&total = &i
	
	
	&i = 0
	For each
		&porcentaje = (&i/&total) * 100
		&Budget.Load(Customer,ProductNumber,BudgetYear,	BudgetMonth)
		&Budget.Check()
		&Budget.Update()
		&i = &i + 1
		&porcentaje = &porcentaje +1
		&ProgressIndicator.Value = &porcentaje
		commit
	endfor
	
	&ProgressIndicator.ShowWithTitle("Updated")
```

