# Procedure: WWP_GridStateAddComboDynFilterValue

- **Module:** WWPBaseObjects
- **Description:** WWP_Grid State Add Combo Dyn Filter Value
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ComboItem | Variable | GX_SDT |  | Combo Item |
| ComboItems | Parameter | GX_SDT | inout | Combo Items |
| FilterDsc | Parameter | VARCHAR | in | Filter Dsc |
| FilterValue | Parameter | VARCHAR | in | Filter Value |
| GridStateDynamicFilter | Parameter | GX_SDT | inout | Grid State Dynamic Filter |
| HasMultipleSelection | Parameter | Boolean | in | Has Multiple Selection |
| FilterValueItem | Variable | VARCHAR |  | Filter Value Item |
| FilterValueCol | Variable | VARCHAR |  | Filter Value Col |
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

&GridStateDynamicFilter.Dsc = &FilterDsc
&GridStateDynamicFilter.Value = &FilterValue
If &HasMultipleSelection
	&FilterValueCol.FromJson(&FilterValue)
	For &FilterValueItem in &FilterValueCol
		For &ComboItem in &ComboItems
			If &ComboItem.ID.Trim() = &FilterValueItem.Trim()
				&GridStateDynamicFilter.ValueTo += iif(&GridStateDynamicFilter.ValueTo.IsEmpty(), '', ', ') + &ComboItem.Title
				Exit
			EndIf
		EndFor
	EndFor
Else
	For &ComboItem in &ComboItems
		If &ComboItem.ID.Trim() = &FilterValue.Trim()
			&GridStateDynamicFilter.ValueTo = &ComboItem.Title
			Exit
		EndIf
	EndFor
EndIf
```

### Rules (Rules)

```genexus

parm(inout:&GridStateDynamicFilter, in:&FilterDsc, in:&FilterValue, inout:&ComboItems, in:&HasMultipleSelection);
```

