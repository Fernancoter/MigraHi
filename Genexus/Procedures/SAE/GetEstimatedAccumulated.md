# Procedure: GetEstimatedAccumulated

- **Module:** SAE
- **Description:** Get Estimated Accumulated
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Customer | Parameter | VARCHAR | inout | Customer |
| CustomerShipping | Variable | VARCHAR |  | Customer Shipping |
| Month | Parameter | NUMERIC | inout | Month |
| ProductNumber | Parameter | VARCHAR | inout | Product Number |
| Quantity | Variable | NUMERIC |  | Quantity |
| Year | Parameter | NUMERIC | inout | Year |
| BudgetEstimated | Parameter | NUMERIC | out | Budget Estimated |
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

&BudgetEstimated = 0

For each
Where ProductNumber = &ProductNumber
Where Customer = &Customer
Where WWPBaseObjects.Produccion.BudgetYear = &Year
Where BudgetMonth <= &Month

&BudgetEstimated = &BudgetEstimated+ BudgetEstimated

endfor
```

### Rules (Rules)

```genexus
parm(&ProductNumber,&Customer,&Year,&Month, out:&BudgetEstimated);
```

