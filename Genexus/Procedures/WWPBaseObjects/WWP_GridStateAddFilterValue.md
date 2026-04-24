# Procedure: WWP_GridStateAddFilterValue

- **Module:** WWPBaseObjects
- **Description:** WWP_Grid State Add Filter Value
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FilterName | Parameter | VARCHAR | in | Filter Name |
| FilterDsc | Parameter | VARCHAR | in | Filter Dsc |
| FilterValueTo | Parameter | VARCHAR | in | Filter Value To |
| FilterValue | Parameter | VARCHAR | in | Filter Value |
| AddFitler | Parameter | Boolean | in | Add Fitler |
| GridState | Parameter | GX_SDT | inout | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| FilterOperator | Parameter | NUMERIC | in | Filter Operator |
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

If &AddFitler
	&GridStateFilterValue = new()
	&GridStateFilterValue.Name = &FilterName
	&GridStateFilterValue.Dsc = &FilterDsc
	&GridStateFilterValue.Operator = &FilterOperator
	&GridStateFilterValue.Value = &FilterValue
	&GridStateFilterValue.ValueTo = &FilterValueTo
	&GridState.FilterValues.Add(&GridStateFilterValue)
EndIf
```

### Rules (Rules)

```genexus

parm(inout:&GridState, in:&FilterName, in:&FilterDsc, in:&AddFitler, in:&FilterOperator, in:&FilterValue, in:&FilterValueTo);
```

