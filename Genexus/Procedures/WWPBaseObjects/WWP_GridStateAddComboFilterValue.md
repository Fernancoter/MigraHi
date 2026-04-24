# Procedure: WWP_GridStateAddComboFilterValue

- **Module:** WWPBaseObjects
- **Description:** WWP_Grid State Add Combo Filter Value
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AddFitler | Parameter | Boolean | in | Add Fitler |
| ComboItem | Variable | GX_SDT |  | Combo Item |
| ComboItems | Parameter | GX_SDT | inout | Combo Items |
| FilterDsc | Parameter | VARCHAR | in | Filter Dsc |
| FilterName | Parameter | VARCHAR | in | Filter Name |
| FilterValue | Parameter | VARCHAR | in | Filter Value |
| GridState | Parameter | GX_SDT | inout | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| HasMultipleSelection | Parameter | Boolean | in | Has Multiple Selection |
| FilterValueCol | Variable | VARCHAR |  | Filter Value Col |
| FilterValueItem | Variable | VARCHAR |  | Filter Value Item |
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
	&GridStateFilterValue.Value = &FilterValue
	If &HasMultipleSelection
		&FilterValueCol.FromJson(&FilterValue)
		For &FilterValueItem in &FilterValueCol
			For &ComboItem in &ComboItems
				If &ComboItem.ID.Trim() = &FilterValueItem.Trim()
					&GridStateFilterValue.ValueTo += iif(&GridStateFilterValue.ValueTo.IsEmpty(), '', ', ') + &ComboItem.Title
					Exit
				EndIf
			EndFor
		EndFor
	Else
		For &ComboItem in &ComboItems
			If &ComboItem.ID.Trim() = &FilterValue.Trim()
				&GridStateFilterValue.ValueTo = &ComboItem.Title
				Exit
			EndIf
		EndFor
	EndIf
	&GridState.FilterValues.Add(&GridStateFilterValue)
EndIf
```

### Rules (Rules)

```genexus

parm(inout:&GridState, in:&FilterName, in:&FilterDsc, in:&AddFitler, in:&FilterValue, inout:&ComboItems, in:&HasMultipleSelection);
```

