# Procedure: SetWWPContext

- **Module:** WWPBaseObjects
- **Description:** Set Work With Plus Context
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Context | Parameter | GX_SDT | in | Context |
| Session | Variable | GX_USRDEFTYP |  | Session |
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
&Session.Set(WWPDomains.WWPContext, &Context.ToXml())
```

### Rules (Rules)

```genexus
parm(in:&Context);
```

