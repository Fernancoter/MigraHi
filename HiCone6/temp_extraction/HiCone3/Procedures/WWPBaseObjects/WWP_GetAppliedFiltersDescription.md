# Procedure: WWP_GetAppliedFiltersDescription

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Applied Filters Description
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AppliedFiltersDescription | Parameter | VARCHAR | out | Applied Filters Description |
| index | Variable | NUMERIC |  | index |
| DynamicFiltersItem | Variable | GX_SDT |  | Dynamic Filters Item |
| FilterDescription | Variable | VARCHAR |  | Filter Description |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| ListObjectName | Parameter | VARCHAR | in | List Object Name |
| Session | Variable | GX_USRDEFTYP |  | Session |
| TotalFilters | Variable | NUMERIC |  | Total Filters |
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

&GridState.FromXml(&Session.Get(&ListObjectName + !"GridState"))
&index = 1
Do while &GridState.FilterValues.Count >= &index
	If &GridState.FilterValues.Item(&index).Dsc.Trim().IsEmpty()
		&GridState.FilterValues.Remove(&index)
	Else
		&index += 1
	EndIf
Enddo
&TotalFilters = &GridState.FilterValues.Count + &GridState.DynamicFilters.Count
&AppliedFiltersDescription = ''
If &TotalFilters > 0
	&index = 1
	For &GridStateFilterValue in &GridState.FilterValues
		&FilterDescription = &GridStateFilterValue.Dsc
		Do 'Add Filter To Description'
	EndFor
	
	For &DynamicFiltersItem in &GridState.DynamicFilters
		&FilterDescription = &DynamicFiltersItem.Dsc
		Do 'Add Filter To Description'
	EndFor
	&AppliedFiltersDescription = format('WWP_FilteringByCaption', &AppliedFiltersDescription)
EndIf

Sub 'Add Filter To Description'
	If &index >= 6
		If &index = 6
			&AppliedFiltersDescription += '...'
		EndIf
	Else
	  If &index > 1
			&AppliedFiltersDescription += iif(&index = &TotalFilters, !' ' + 'WWP_WordsListLastSeparator', 'WWP_WordsListSeparator') + !' '
		EndIf
	  &AppliedFiltersDescription += &FilterDescription
	EndIf
	&index += 1
EndSub
```

### Rules (Rules)

```genexus

parm(in:&ListObjectName, out:&AppliedFiltersDescription);
```

