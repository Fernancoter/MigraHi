# Procedure: WWP_GetLoggedUserId

- **Module:** WWPBaseObjects
- **Description:** WWP_Get Logged User Id
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPUserExtendedId | Parameter | CHARACTER | out | WWPUser Extended Id |
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
&WWPUserExtendedId = GAMUser.GetId()
```

### Rules (Rules)

```genexus
parm(out:&WWPUserExtendedId);
```

