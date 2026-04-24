# Procedure: WWP_ColumnsSelector_Remove

- **Module:** WWPBaseObjects
- **Description:** Columns Selector - Remove Columns
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ColumnsSelector | Parameter | GX_SDT | inout | Columns Selector |
| ColumnName | Parameter | VARCHAR | in | Column Name |
| IsVisible | Parameter | Boolean | in | Is Visible |
| Column | Variable | GX_SDT |  | Column |
| i | Variable | NUMERIC |  | i |
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

&i = 1
For &Column in &ColumnsSelector.Columns
	If &Column.ColumnName = &ColumnName
		Exit
	EndIf
	&i += 1
EndFor

If &i <= &ColumnsSelector.Columns.Count
	&ColumnsSelector.Columns.Remove(&i)
EndIf
```

### Rules (Rules)

```genexus

parm(inout:&ColumnsSelector, in:&ColumnName, in:&IsVisible);
```

