# Procedure: GAMSDChangePasswordUser

- **Module:** 
- **Description:** GAMSDChange Password User
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| isOK | Variable | Boolean |  | is OK |
| isPasswordExpires | Parameter | Boolean | in | is Password Expires |
| Message | Variable | GX_SDT |  | Message |
| Messages | Parameter | GX_SDT | out | Messages |
| UserName | Parameter | VARCHAR | in | User Name |
| UserPassword | Parameter | CHARACTER | in | User Password |
| UserPasswordNew | Parameter | CHARACTER | in | User Password New |
| UserPasswordNewConf | Parameter | CHARACTER | in | User Password New Conf |
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
If &UserPasswordNew = &UserPasswordNewConf
	If &isPasswordExpires
		&isOK = GAMRepository.UpdateUserToChangePassword(&UserPassword, &UserPasswordNew, &Errors)		
	Else
		&isOK = GAMUser.ChangeYourPassword(&UserPassword, &UserPasswordNew, &Errors)
	Endif
	If &isOK
		Commit
		//OK, User password updated
	Else
		&Messages = GAMConvertErrorsToMessages(&Errors)
	Endif
Else
	&Message.Type = MessageTypes.Error
	&Message.Description = "The new password and confirmation do not match."
	&Messages.Add(&Message)
Endif
```

### Rules (Rules)

```genexus
Parm(in:&isPasswordExpires, in:&UserName, in:&UserPassword, in:&UserPasswordNew, in:&UserPasswordNewConf, out:&Messages);
```

