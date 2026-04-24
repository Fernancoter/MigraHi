# Procedure: WWP_GetFilterVal

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Filter Val
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FilterResult | Parameter | VARCHAR | out | Filter Result |
| FilterValue | Parameter | VARCHAR | in | Filter Value |
| IsEmpty | Parameter | Boolean | in | Is Empty |
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

If not &IsEmpty
	&FilterResult = &FilterValue.Replace(!'\', !'\\').Replace(!'|', !'\|')
EndIf
```

### Rules (Rules)

```genexus

parm(in:&IsEmpty, in:&FilterValue, out:&FilterResult);
```

