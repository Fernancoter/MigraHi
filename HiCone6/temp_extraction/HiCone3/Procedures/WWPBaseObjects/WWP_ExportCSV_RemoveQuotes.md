# Procedure: WWP_ExportCSV_RemoveQuotes

- **Module:** WWPBaseObjects
- **Description:** WWP_Export CSV_Remove Quotes
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Text | Parameter | LONGVARCHAR | in | Text |
| ResText | Parameter | LONGVARCHAR | out | Res Text |
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

&ResText = &Text
If &ResText.Length() > 0 AND &ResText.StartsWith(!'"') AND &ResText.EndsWith(!'"')
	&ResText = &ResText.Substring(2, &ResText.Length() - 2)
EndIf
```

### Rules (Rules)

```genexus

parm(in:&Text, out:&ResText);
```

