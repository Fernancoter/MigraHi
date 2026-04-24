# Procedure: SDPGetUnicodeFromHex

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Unicode From Hex
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HexaUnicode | Parameter | CHARACTER | in | Hexa Unicode |
| UnicodeCharacter | Parameter | CHARACTER | out | Unicode Character |
| DecimalValue | Variable | NUMERIC |  | Decimal Value |
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
//List of unicode characters:
//https://en.wikipedia.org/wiki/List_of_Unicode_characters
//In case of fontwesome
//https://fontawesome.com/cheatsheet
//In case of MaterialIcons
//https://github.com/google/material-design-icons/blob/master/iconfont/codepoints
//https://material.io/resources/icons/?style=baseline
&DecimalValue = WorkWithPlus.NativeMobile.SDPGetDecimalFromHex(&HexaUnicode)
&UnicodeCharacter = chr(&DecimalValue)
```

### Rules (Rules)

```genexus
Parm(in:&HexaUnicode, out:&UnicodeCharacter);
```

