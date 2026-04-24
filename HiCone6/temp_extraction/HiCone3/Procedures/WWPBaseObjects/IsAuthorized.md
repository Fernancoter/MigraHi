# Procedure: IsAuthorized

- **Module:** WWPBaseObjects
- **Description:** Is Authorized
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GxObject | Parameter | VARCHAR | in | Gx Object |
| Authorized | Parameter | Boolean | out | Authorized |
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
&Authorized = True

/*
LoadContext(&Context)
If (&GxObject = 'ViewInvoices' and &Context.UserLevel = 0)
        &Authorized = False
Endif
*/
```

### Rules (Rules)

```genexus
parm(in:&GxObject, out:&Authorized);
```

