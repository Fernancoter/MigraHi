# Procedure: SaveColumnsSelectorState

- **Module:** WWPBaseObjects
- **Description:** Save Columns Selector State
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| UserCustomKey | Parameter | VARCHAR | in | User Custom Key |
| UserCustomValue | Parameter | VARCHAR | in | User Custom Value |
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
//This is a procedure in which user has to define the behaviour of columns selector state.
//You can save the ColumnsSelector state in session, database or whatever you want.
//By default, it calls to SaveUserKeyValue Procedure in order to have the same mechanism in all the end users configurations
WWPBaseObjects.SaveUserKeyValue(&UserCustomKey, &UserCustomValue)
```

### Rules (Rules)

```genexus
parm(in:&UserCustomKey,in:&UserCustomValue);
```

