# Procedure: SDPWebServerSessionNumGet

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPWeb Server Session Num Get
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ParameterKey | Parameter | CHARACTER | in | Parameter Key |
| ParameterValue | Variable | VARCHAR |  | Parameter Value |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| ParameterNumValue | Parameter | NUMERIC | out | Parameter Num Value |
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
&ParameterValue = &WebSession.Get(&ParameterKey)
&ParameterNumValue.FromString(&ParameterValue.Trim())
```

### Rules (Rules)

```genexus
Parm(in:&ParameterKey, out:&ParameterNumValue);
```

