# Procedure: WWP_ResetCollapsedRecords

- **Module:** WWPBaseObjects
- **Description:** WWP_Reset Collapsed Records
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Reset | Parameter | Boolean | out | Reset |
| OldGridState | Parameter | GX_SDT | in | Old Grid State |
| NewGridState | Parameter | GX_SDT | in | New Grid State |
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

&OldGridState.OrderedBy = &NewGridState.OrderedBy
&OldGridState.OrderedDsc = &NewGridState.OrderedDsc
&OldGridState.CurrentPage = &NewGridState.CurrentPage
&OldGridState.PageSize = &NewGridState.PageSize
&OldGridState.CollapsedRecords = &NewGridState.CollapsedRecords
If &OldGridState.ToJson() <> &NewGridState.ToJson()
	&Reset = True
Else
	&Reset = False
EndIf
```

### Rules (Rules)

```genexus

parm(in:&OldGridState, in:&NewGridState, out:&Reset);
```

