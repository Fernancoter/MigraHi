# Procedure: SaveUserKeyValue

- **Module:** WWPBaseObjects
- **Description:** Save User Key Value
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Session | Variable | GX_USRDEFTYP |  | Session |
| UserCustomizationsKey | Parameter | VARCHAR | in | User Custom Key |
| UserCustomizationsValue | Parameter | LONGVARCHAR | in | User Custom Value |
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
//This is a procedure in which user has to define how to load information related to each end user
//By default it loads the ColumnsSelector State, the Grid State (filters, orders, etc) and Filters within 'ManageFilters' Action

If &UserCustomizationsValue.IsEmpty()
	&Session.Remove(&UserCustomizationsKey)
Else
	&Session.Set(&UserCustomizationsKey, &UserCustomizationsValue)
EndIf

&UserCustomizations.Load(GAMUser.GetId(), &UserCustomizationsKey)
If &UserCustomizationsValue.IsEmpty()
	If &UserCustomizations.Success()
		&UserCustomizations.Delete()
		Commit
	EndIf
Else
	If not &UserCustomizations.Success()
		&UserCustomizations = new()
		&UserCustomizations.UserCustomizationsId = GAMUser.GetId()
		&UserCustomizations.UserCustomizationsKey = &UserCustomizationsKey
	EndIf
	&UserCustomizations.UserCustomizationsValue = &UserCustomizationsValue
	&UserCustomizations.Save()
	Commit
EndIf
```

### Rules (Rules)

```genexus
parm(in:&UserCustomizationsKey,in:&UserCustomizationsValue);
```

