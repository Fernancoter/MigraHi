# Procedure: WWP_GetImportExcelColumnIndexes

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Import Excel Column Indexes
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ColIndex | Variable | NUMERIC |  | Col Index |
| ColumIndexes | Parameter | NUMERIC | out | Colum Indexes |
| ColumnsFound | Parameter | NUMERIC | out | Columns Found |
| ColumnsLineSplitted | Variable | VARCHAR |  | Columns Line Splitted |
| ContinueReading | Variable | Boolean |  | Continue Reading |
| DiscardedColumns | Parameter | VARCHAR | out | Discarded Columns |
| ExcelDocument | Parameter | GX_USRDEFTYP | in | Excel Document |
| i | Variable | NUMERIC |  | i |
| Index | Variable | NUMERIC |  | Index |
| LineNumber | Parameter | NUMERIC | in | Line Number |
| TitleName | Variable | VARCHAR |  | Title Name |
| TitleNames | Parameter | VARCHAR | in | Title Names |
| ColumnsCount | Parameter | NUMERIC | out | Columns Count |
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

&ColumnsLineSplitted = new()
&ContinueReading = True
&ColIndex = 1
Do while &ContinueReading
	If &ExcelDocument.Cells(&LineNumber, &ColIndex).Text <> ''
		&ColumnsLineSplitted.Add(&ExcelDocument.Cells(&LineNumber, &ColIndex).Text)
		&ColIndex += 1
	Else
		&ContinueReading = False
	EndIf
EndDo

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

parm(in:&TitleNames, in:&ExcelDocument, in:&LineNumber, out:&DiscardedColumns, out:&ColumIndexes, out:&ColumnsCount, out:&ColumnsFound);
```

