# Procedure: SDPWebServerSessionNumSet

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPWeb Server Session Num Set
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ParameterKey | Parameter | CHARACTER | in | Parameter Key |
| ParameterValue | Parameter | NUMERIC | in | Parameter Value |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
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
&WebSession.Set(&ParameterKey, trim(&ParameterValue.ToString()))
```

### Rules (Rules)

```genexus
Parm(in:&ParameterKey, in:&ParameterValue);
```

