# Procedure: WWP_DeleteFilter

- **Module:** WWPBaseObjects
- **Description:** WWP_Delete Filter
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| DynamicFilter | Variable | GX_SDT |  | Dynamic Filter |
| FilterDeleted | Parameter | Boolean | out | Filter Deleted |
| FilterName | Parameter | VARCHAR | in | Filter Name |
| GridState | Parameter | GX_SDT | inout | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| Index | Variable | NUMERIC |  | Index |
| IsDynamic | Parameter | Boolean | in | Is Dynamic |
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

&FilterDeleted = False
&Index = 1
If &IsDynamic
	For &DynamicFilter in &GridState.DynamicFilters
		If &DynamicFilter.Selected = &FilterName
			&FilterDeleted = True
			Exit
		EndIf
		&Index += 1
	EndFor

	If &FilterDeleted
		&GridState.DynamicFilters.Remove(&Index)
	EndIf
Else
	For &GridStateFilterValue in &GridState.FilterValues
		If &GridStateFilterValue.Name = &FilterName
			&FilterDeleted = True
			Exit
		EndIf
		&Index += 1
	EndFor

	If &FilterDeleted
		&GridState.FilterValues.Remove(&Index)
	EndIf
	If &FilterName.StartsWith(!'TF') AND Not &FilterName.EndsWith(!'_SEL')
		If WWP_DeleteFilter(&GridState, &FilterName + !'_SEL', False)
			&FilterDeleted = True
		EndIf
	EndIf
EndIf
```

### Rules (Rules)

```genexus

parm(inout:&GridState, in:&FilterName, in:&IsDynamic, out:&FilterDeleted);
```

