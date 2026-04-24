# Procedure: WWP_ExportWriteFilter

- **Module:** WWPBaseObjects
- **Description:** WWP_Export Write Filter
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AddRow | Parameter | Boolean | in | Add Row |
| CellRow | Parameter | NUMERIC | inout | Cell Row |
| ExcelDocument | Parameter | GX_USRDEFTYP | inout | Excel Document |
| FilterDsc | Parameter | VARCHAR | in | Filter Dsc |
| FirstColumn | Parameter | NUMERIC | in | First Column |
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

If &AddRow
	&CellRow += 1
EndIf
&ExcelDocument.Cells(&CellRow, &FirstColumn).Bold = True
&ExcelDocument.Cells(&CellRow, &FirstColumn).Color = 3
&ExcelDocument.Cells(&CellRow, &FirstColumn).Text = &FilterDsc
&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Italic = True
```

### Rules (Rules)

```genexus

parm(inout:&ExcelDocument, in:&AddRow, inout:&CellRow, in:&FirstColumn, in:&FilterDsc);
```

