# Procedure: WWP_ColumnSelector_UpdateColumns

- **Module:** WWPBaseObjects
- **Description:** Column Selector - Update Columns
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Column | Variable | GX_SDT |  | Column |
| Fixed | Variable | VARCHAR |  | Fixed |
| ColumnAux | Variable | GX_SDT |  | Column Aux |
| ColumnsSelector | Parameter | GX_SDT | inout | Columns Selector |
| ColumnsSelectorAux | Variable | GX_SDT |  | Columns Selector Aux |
| Found | Variable | Boolean |  | Found |
| IsColumnVisible | Variable | Boolean |  | Is Column Visible |
| OldColumnsSelector | Parameter | GX_SDT | inout | Old Columns Selector |
| ColumnOrder | Variable | NUMERIC |  | Column Order |
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

For &Column in &ColumnsSelector.Columns
	Do 'IsColumnVisible'
	If &Found
		&Column.IsVisible = &IsColumnVisible
		&Column.Fixed = &Fixed
		&Column.Order = &ColumnOrder
	EndIf
EndFor

&ColumnsSelectorAux = new()
&ColumnsSelectorAux.FromJson(&ColumnsSelector.ToJson())
&ColumnsSelectorAux.Columns.Sort(!'Order')
&ColumnOrder = 0
For &ColumnAux in &ColumnsSelectorAux.Columns
	For &Column in &ColumnsSelector.Columns
		If &Column.ColumnName = &ColumnAux.ColumnName
			&Column.Order = &ColumnOrder
			Exit
		EndIf
	EndFor
	&ColumnOrder += 1
EndFor

Sub 'IsColumnVisible'
	&Found = False
	For &ColumnAux in &OldColumnsSelector.Columns
		If &Column.ColumnName = &ColumnAux.ColumnName
			&IsColumnVisible = &ColumnAux.IsVisible
			&Fixed = &ColumnAux.Fixed
			&ColumnOrder = &ColumnAux.Order
			&Found = True
			Exit
		EndIf
	EndFor
//	If not &Found AND &OldColumnsSelector.Columns.Count > 0 AND &OldColumnsSelector.Columns.Item(1).Order.IsEmpty()
//		For &ColumnAux in &OldColumnsSelector.Columns
//			If &Column.DisplayName = &ColumnAux.ColumnName
//				&IsColumnVisible = &ColumnAux.IsVisible
//				&ColumnOrder = &ColumnAux.Order
//				&Found = True
//				Exit
//			EndIf
//		EndFor
//	EndIf
EndSub
```

### Rules (Rules)

```genexus

parm(inout:&OldColumnsSelector, inout:&ColumnsSelector);
```

