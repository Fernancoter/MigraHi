# Procedure: LoadUserKeyValue

- **Module:** WWPBaseObjects
- **Description:** Load User Key Value
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Session | Variable | GX_USRDEFTYP |  | Session |
| UserCustomizationsKey | Parameter | VARCHAR | in | User Custom Key |
| UserCustomizationsValue | Parameter | LONGVARCHAR | out | User Custom Value |
| Context | Variable | NUMERIC |  | Context |
| UserCustomizations | Variable | GX_BUSCOMP |  | User Customizations |
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
//This is a procedure in which user has to define how to save information related to each end user
//By default it saves the ColumnsSelector State, the Grid State (filters, orders, etc) and Filters within 'ManageFilters' Action

&UserCustomizationsValue = &Session.Get(&UserCustomizationsKey)

If (&UserCustomizationsValue.IsEmpty())
  &UserCustomizations.Load(GAMUser.GetId(),&UserCustomizationsKey)
  If &UserCustomizations.Success()
	  &UserCustomizationsValue = &UserCustomizations.UserCustomizationsValue
  Else
	  &UserCustomizationsValue.SetEmpty()
  Endif
Endif
```

### Rules (Rules)

```genexus
parm(in:&UserCustomizationsKey, out:&UserCustomizationsValue);
```

