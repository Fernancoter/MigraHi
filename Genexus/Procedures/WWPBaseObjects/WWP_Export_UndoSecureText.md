# Procedure: WWP_Export_UndoSecureText

- **Module:** WWPBaseObjects
- **Description:** WWP_Export_Undo Secure Text
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| UndoSecureText | Parameter | LONGVARCHAR | out | Undo Secure Text |
| Text | Parameter | LONGVARCHAR | in | Text |
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

&UndoSecureText = &Text
If &UndoSecureText.Length() > 0 AND (&UndoSecureText.StartsWith(!"'=") OR &UndoSecureText.StartsWith(!"'+") OR &UndoSecureText.StartsWith(!"'-") OR &UndoSecureText.StartsWith(!"'@"))
	&UndoSecureText = &UndoSecureText.Substring(2)
EndIf
```

### Rules (Rules)

```genexus

parm(in:&Text, out:&UndoSecureText);
```

