# Procedure: WWP_ColumnsSelector_Add

- **Module:** WWPBaseObjects
- **Description:** Columns Selector - Add Columns
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ColumnsSelector | Parameter | GX_SDT | inout | Columns Selector |
| ColumnName | Parameter | VARCHAR | in | Column Name |
| Category | Parameter | VARCHAR | in | Category |
| DisplayName | Parameter | VARCHAR | in | Display Name |
| Fixed | Parameter | VARCHAR | in | Fixed |
| IsVisible | Parameter | Boolean | in | Is Visible |
| Column | Variable | GX_SDT |  | Column |
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

&Column = new ()
&Column.ColumnName = &ColumnName
&Column.DisplayName = &DisplayName
&Column.IsVisible = &IsVisible
&Column.Order = &ColumnsSelector.Columns.Count + 1
&Column.Category = &Category
&ColumnsSelector.Columns.Add(&Column)
```

### Rules (Rules)

```genexus

parm(inout:&ColumnsSelector, in:&ColumnName, in:&Category, in:&DisplayName, in:&IsVisible, in:&Fixed);
```

