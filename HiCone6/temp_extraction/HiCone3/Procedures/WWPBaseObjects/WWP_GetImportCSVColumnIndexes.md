# Procedure: WWP_GetImportCSVColumnIndexes

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Import CSVColumn Indexes
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ColumIndexes | Parameter | NUMERIC | out | Colum Indexes |
| ColumnsCount | Parameter | NUMERIC | out | Columns Count |
| ColumnsFound | Parameter | NUMERIC | out | Columns Found |
| ColumnsLineSplitted | Variable | VARCHAR |  | Columns Line Splitted |
| ColumnsLineText | Parameter | VARCHAR | in | Columns Line Text |
| DiscardedColumns | Parameter | VARCHAR | out | Discarded Columns |
| i | Variable | NUMERIC |  | i |
| Index | Variable | NUMERIC |  | Index |
| TitleName | Variable | VARCHAR |  | Title Name |
| TitleNames | Parameter | VARCHAR | in | Title Names |
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

&ColumIndexes = new()

&ColumnsLineSplitted = &ColumnsLineText.SplitRegEx(!';')
&ColumnsCount = &ColumnsLineSplitted.Count

For &TitleName in &TitleNames
	&Index = &ColumnsLineSplitted.IndexOf(&TitleName)
	&ColumIndexes.Add(&Index)
EndFor

&ColumnsFound = 0
&DiscardedColumns = ''
For &i = 1 To &ColumnsLineSplitted.Count
	If &ColumIndexes.IndexOf(&i) = 0
		If not &DiscardedColumns.IsEmpty()
			&DiscardedColumns += ', '
		EndIf
		&DiscardedColumns += &ColumnsLineSplitted.Item(&i)
	Else
		&ColumnsFound += 1
	EndIf
EndFor

If &DiscardedColumns.Length() > 50
	&DiscardedColumns = &DiscardedColumns.Substring(1, 50)
	&DiscardedColumns = &DiscardedColumns.Trim() + '...'
EndIf
```

### Rules (Rules)

```genexus

parm(in:&TitleNames, in:&ColumnsLineText, out:&DiscardedColumns, out:&ColumIndexes, out:&ColumnsCount, out:&ColumnsFound);
```

