# Procedure: LoadGridState

- **Module:** WWPBaseObjects
- **Description:** Load Filters State
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| UserCustomKey | Parameter | VARCHAR | in | User Custom Key |
| UserCustomValue | Parameter | VARCHAR | out | User Custom Value |
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

//This is a procedure in which user has to define how to save the filters created with 'ManageFilters' StandardAction.
//You can save the filters's configuration in session, in database or whatever you want
//By default, it calls to SaveUserKeyValue Procedure in order to have the same mechanism in all the end users configurations
LoadUserKeyValue(&UserCustomKey, &UserCustomValue)
```

### Rules (Rules)

```genexus
parm(in:&UserCustomKey, out:&UserCustomValue);
```

