# Procedure: WWP_TextListToString

- **Module:** WWPBaseObjects
- **Description:** WWP_Text List To String
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HasMultipleDscs | Parameter | Boolean | in | Has Multiple Dscs |
| ListString | Parameter | VARCHAR | out | List String |
| SelectedTextCol | Parameter | VARCHAR | inout | Selected Text Col |
| MultipleStr | Variable | VARCHAR |  | Multiple Str |
| SelectedText | Variable | VARCHAR |  | Selected Text |
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

For &SelectedText in &SelectedTextCol
	&ListString += iif(&ListString.IsEmpty(), '', ', ')
	If &HasMultipleDscs
		&MultipleStr.FromJson(&SelectedText)
		If &MultipleStr.Count > 0
			&ListString += &MultipleStr.Item(1).Trim()
		EndIf
	Else
		&ListString += &SelectedText.Trim()
	EndIf
EndFor
```

### Rules (Rules)

```genexus

parm(inout:&SelectedTextCol, in:&HasMultipleDscs, out:&ListString);
```

