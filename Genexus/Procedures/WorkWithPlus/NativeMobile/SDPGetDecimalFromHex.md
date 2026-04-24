# Procedure: SDPGetDecimalFromHex

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Decimal From Hex
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| c | Variable | CHARACTER |  | c |
| DecimalValue | Parameter | NUMERIC | out | Decimal Value |
| Dictionary | Variable | CHARACTER |  | Dictionary |
| HexadecimalValue | Variable | CHARACTER |  | Hexadecimal Value |
| HexadecimalValueIn | Parameter | CHARACTER | in | Hexadecimal Value In |
| i | Variable | NUMERIC |  | i |
| CharValue | Variable | NUMERIC |  | Char Value |
| len | Variable | NUMERIC |  | len |
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
&HexadecimalValue = &HexadecimalValueIn.ToUpper().Trim()

java try { [!&DecimalValue!] = Integer.parseInt([!&HexadecimalValue!],16); } catch(Exception e) {}
csharp try {[!&DecimalValue!] = System.Convert.ToInt32([!&HexadecimalValue!],16); } catch {}

// In case of SmartDevices Offline
If &DecimalValue = 0 AND Not &HexadecimalValue.IsEmpty()	
	&Dictionary = "0123456789ABCDEF"
	&i = 0
	&len = &HexadecimalValue.Length()	
	Do While &i < &len
		&c = &HexadecimalValue.CharAt(&len - &i)
		&CharValue = &Dictionary.IndexOf(&c) - 1		
		&DecimalValue += (&CharValue * (16 ^ &i))		
		&i += 1
	EndDo
EndIf
```

### Rules (Rules)

```genexus
Parm(in:&HexadecimalValueIn, out:&DecimalValue);
```

