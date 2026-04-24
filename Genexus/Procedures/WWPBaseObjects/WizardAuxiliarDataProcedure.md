# Procedure: WizardAuxiliarDataProcedure

- **Module:** WWPBaseObjects
- **Description:** Wizard Auxiliar Data Procedure
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WizardDataXML | Variable | LONGVARCHAR |  | Wizard Data XML |
| Key | Parameter | VARCHAR | in | Key |
| Value | Parameter | LONGVARCHAR | inout | Value |
| WizardMode | Parameter | CHARACTER | in | Wizard Mode |
| WizardAuxiliarData | Parameter | GX_SDT | inout | Wizard Auxiliar Data |
| WizardAuxiliarDataItem | Variable | GX_SDT |  | Wizard Auxiliar Data Item |
| ExistKey | Variable | Boolean |  | Exist Key |
| Index | Variable | NUMERIC |  | Index |
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

Do Case
	Case &WizardMode.ToUpper() = !'GET'
	
		For &WizardAuxiliarDataItem in &WizardAuxiliarData
			If &WizardAuxiliarDataItem.Key = &Key
				&Value = &WizardAuxiliarDataItem.Value
			EndIf
		EndFor
		
	Case &WizardMode.ToUpper() = !'SET'
		
		&ExistKey = False
		For &WizardAuxiliarDataItem in &WizardAuxiliarData
			If &WizardAuxiliarDataItem.Key = &Key
				&ExistKey = True
				&WizardAuxiliarDataItem.Value = &Value
			EndIf
		EndFor
		If not &ExistKey
			&WizardAuxiliarDataItem = new()
			&WizardAuxiliarDataItem.Key = &Key
			&WizardAuxiliarDataItem.Value = &Value
			&WizardAuxiliarData.Add(&WizardAuxiliarDataItem)
		EndIf
		
	Case &WizardMode.ToUpper() = !'DLT'
		
		&Index = 1
		For &WizardAuxiliarDataItem in &WizardAuxiliarData
			If &WizardAuxiliarDataItem.Key = &Key
				Exit
			Else
				&Index += 1
			EndIf
		EndFor
		If &Index <= &WizardAuxiliarData.Count
			&WizardAuxiliarData.Remove(&Index)
		EndIf
EndCase
```

### Rules (Rules)

```genexus
parm(inout:&WizardAuxiliarData, in:&Key, inout:&Value, in:&WizardMode);
```

