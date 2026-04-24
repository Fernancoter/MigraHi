# Procedure: WWP_ExistsUserExtended

- **Module:** WWPBaseObjects
- **Description:** WWP_Exists User Extended
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Exists | Parameter | Boolean | out | Exists |
| WWPUserExtendedId | Parameter | CHARACTER | in | User Id |
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
&Exists = False
For Each WWP_UserExtended
	Where WWPUserExtendedId = &WWPUserExtendedId
	&Exists = True
EndFor
```

### Rules (Rules)

```genexus
parm(in:&WWPUserExtendedId, out:&Exists);
```

