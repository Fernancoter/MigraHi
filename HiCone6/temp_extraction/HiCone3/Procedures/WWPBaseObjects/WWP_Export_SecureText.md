# Procedure: WWP_Export_SecureText

- **Module:** WWPBaseObjects
- **Description:** WWP_Export_Secure Text
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Text | Parameter | LONGVARCHAR | in | Text |
| SecureText | Parameter | LONGVARCHAR | out | Secure Text |
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

&SecureText = &Text
If &SecureText.Length() > 0 AND (&SecureText.StartsWith(!'=') OR &SecureText.StartsWith(!'+') OR &SecureText.StartsWith(!'-') OR &SecureText.StartsWith(!'@'))
	&SecureText = !"'" + &SecureText
EndIf
```

### Rules (Rules)

```genexus

parm(in:&Text, out:&SecureText);
```

