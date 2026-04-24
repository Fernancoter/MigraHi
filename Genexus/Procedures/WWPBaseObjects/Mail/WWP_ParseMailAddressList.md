# Procedure: WWP_ParseMailAddressList

- **Module:** WWPBaseObjects.Mail
- **Description:** Parse Mail Address List
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Address | Variable | LONGVARCHAR |  | Address |
| AddressList | Parameter | LONGVARCHAR | out | Address List |
| AddressString | Parameter | LONGVARCHAR | in | Address String |
| SeparatorRegex | Variable | LONGVARCHAR |  | Separator Regex |
| SplittedAddresses | Variable | LONGVARCHAR |  | Splitted Addresses |
| TrimmedAddresses | Variable | LONGVARCHAR |  | Trimmed Addresses |
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
WWP_Logger.Debug(&Pgmname, !"Begin parsing mail address list")

&AddressList.Clear()

&TrimmedAddresses = &AddressString.Trim()
If &TrimmedAddresses.IsEmpty()
	WWPBaseObjects.WWP_Logger.Error(&Pgmname, !"Address list is empty")
	return
EndIf

&ValidationRegex = !"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"
&SeparatorRegex = !"\s*,\s*"
&SplittedAddresses = &TrimmedAddresses.SplitRegEx(&SeparatorRegex)

For &Address in &SplittedAddresses
	&Address = &Address.Trim()
	If not &Address.IsMatch(&ValidationRegex)
		WWP_Logger.Error(&Pgmname, !"Address is incorrect: " + &Address)
		&AddressList.Clear()
		return
	Else
		&AddressList.Add(&Address)
	EndIf
EndFor

WWP_Logger.Debug(&Pgmname, !"Parsing address completed")
```

### Rules (Rules)

```genexus
parm(in:&AddressString, out:&AddressList);
```

