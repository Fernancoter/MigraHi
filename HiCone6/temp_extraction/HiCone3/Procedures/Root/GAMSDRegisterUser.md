# Procedure: GAMSDRegisterUser

- **Module:** 
- **Description:** Register New User
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ConfirmPassword | Parameter | CHARACTER | in | Confirm Password |
| Email | Parameter | VARCHAR | in | Email |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| FirstName | Parameter | CHARACTER | in | First Name |
| LastName | Parameter | CHARACTER | in | Last Name |
| LinkURL | Variable | VARCHAR |  | Link URL |
| Message | Variable | GX_SDT |  | Message |
| Messages | Parameter | GX_SDT | out | Messages |
| Password | Parameter | CHARACTER | in | Password |
| User | Variable | GX_EXTERNAL_OBJECT |  | User |
| UserName | Parameter | VARCHAR | in | User Name |
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
If &UserName.IsEmpty()
	&Message.Type = MessageTypes.Error
	&Message.Description = "User name must be entered."
	&Messages.Add(&Message)
	Return	
Endif

If &Password <> &ConfirmPassword
	&Message.Type = MessageTypes.Error
	&Message.Description = "Passwords don't match."
	&Messages.Add(&Message)
	Return
Endif

&User.Name			= &UserName
&User.EMail			= &EMail
&User.FirstName		= &FirstName
&User.LastName		= &LastName
&User.Password		= &Password
&User.Save()
if &User.Success()
	Commit
	&LinkURL = GAMRepository.ApplicationGetAccountActivationURL("")
	GAMCheckUserActivationMethod(&User.GUID, &LinkURL, &Messages)
else
	&Errors = &User.GetErrors()
	&Messages = GAMConvertErrorsToMessages(&Errors)
endif
```

### Rules (Rules)

```genexus
parm(in:&UserName, in:&Email, in:&FirstName, in:&LastName, in:&Password, in:&ConfirmPassword, out:&Messages);
```

