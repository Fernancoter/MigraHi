# Procedure: GetRealAccumulated

- **Module:** SAE
- **Description:** Get Real Accumulated
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Customer | Parameter | VARCHAR | inout | Customer |
| CustomerShipping | Parameter | VARCHAR | inout | Customer Shipping |
| Month | Parameter | NUMERIC | inout | Month |
| ProductNumber | Parameter | VARCHAR | inout | Product Number |
| Quantity | Parameter | NUMERIC | out | Quantity |
| Year | Parameter | NUMERIC | inout | Year |
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

&Quantity = 0

For each
Where ProductNumber = &ProductNumber
Where BudgetCustomer = &Customer
Where InvoiceDate.Year() = &Year
Where Produccion.InvoiceDate.Month() <= &Month

&Quantity = &Quantity+ Quantity

endfor
```

### Rules (Rules)

```genexus
parm(&ProductNumber,&Customer,&CustomerShipping,&Year,&Month, out:&Quantity);
```

