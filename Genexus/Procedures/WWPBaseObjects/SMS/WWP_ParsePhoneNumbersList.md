# Procedure: WWP_ParsePhoneNumbersList

- **Module:** WWPBaseObjects.SMS
- **Description:** Parse Phone Numbers List
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Phone | Variable | LONGVARCHAR |  | Phone |
| PhonesList | Parameter | LONGVARCHAR | out | Phones List |
| PhonesString | Parameter | LONGVARCHAR | in | Phones String |
| SeparatorRegex | Variable | LONGVARCHAR |  | Separator Regex |
| SplittedPhones | Variable | LONGVARCHAR |  | Splitted Phones |
| TrimmedPhones | Variable | LONGVARCHAR |  | Trimmed Phones |
| ValidationRegex | Variable | LONGVARCHAR |  | Validation Regex |
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
WWP_Logger.Debug(&Pgmname, !"Begin parsing phone numbers list")

&PhonesList.Clear()

&TrimmedPhones = &PhonesString.Trim()
If &TrimmedPhones.IsEmpty()
	WWP_Logger.Error(&Pgmname, !"Phones list is empty")
	return
EndIf

&ValidationRegex = !"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
&SeparatorRegex = !"\s*,\s*"
&SplittedPhones = &TrimmedPhones.SplitRegEx(&SeparatorRegex)

For &Phone in &SplittedPhones
	&Phone = &Phone.Trim()
	If not &Phone.IsMatch(&ValidationRegex)
		WWPBaseObjects.WWP_Logger.Error(&Pgmname, !"&Phone is incorrect: " + &Phone)
		&PhonesList.Clear()
		return
	Else
		&PhonesList.Add(&Phone)
	EndIf
EndFor

WWP_Logger.Debug(&Pgmname, !"Parsing phones completed")
```

### Rules (Rules)

```genexus
parm(in:&PhonesString, out:&PhonesList);
```

