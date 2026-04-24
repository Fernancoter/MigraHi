# Procedure: GAMSDUpdateRegisterUser

- **Module:** Root
- **Description:** Update Register User
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Messages | Parameter | GX_SDT | out | Messages |
| ConfirmPassword | Variable | CHARACTER |  | Confirm Password |
| Email | Parameter | VARCHAR | in | Email |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| FirstName | Parameter | CHARACTER | in | First Name |
| isOK | Variable | Boolean |  | is OK |
| LastName | Parameter | CHARACTER | in | Last Name |
| Message | Variable | GX_SDT |  | Message |
| Password | Variable | CHARACTER |  | Password |
| User | Variable | GX_EXTERNAL_OBJECT |  | User |
| UserName | Parameter | VARCHAR | in | User Name |
| UserGUID | Parameter | CHARACTER | in | GUID User  |
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
&User = GAMUser.Get()
//Gets last error in the GAM 
&Errors = GAMRepository.GetLastErrors()
If &Errors.Count = 0
	&User.Name			= &UserName
	&User.EMail			= &EMail
	&User.FirstName		= &FirstName
	&User.LastName		= &LastName
	&isOK = GAMRepository.UpdateUserByKeyToCompleteUserData(&User, &Errors)
	If not &isOK
		&Messages = GAMConvertErrorsToMessages(&Errors)
	endif
else
	&Messages = GAMConvertErrorsToMessages(&Errors)
endif
```

### Rules (Rules)

```genexus
Parm(in:&UserGUID, in:&UserName, in:&Email, in:&FirstName, in:&LastName, out:&Messages);
```

