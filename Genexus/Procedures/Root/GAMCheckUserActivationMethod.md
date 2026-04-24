# Procedure: GAMCheckUserActivationMethod

- **Module:** Root
- **Description:** Check User Activation Method
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| LinkURL | Parameter | VARCHAR | in | Link URL |
| Application | Variable | GX_EXTERNAL_OBJECT |  | Application |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| Message | Variable | GX_SDT |  | Message |
| Messages | Parameter | GX_SDT | out | Messages |
| Repository | Variable | GX_EXTERNAL_OBJECT |  | Repository |
| User | Variable | GX_EXTERNAL_OBJECT |  | User |
| UserGUID | Parameter | CHARACTER | in | User GUID |
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
&Repository = GAMRepository.Get()
Do Case
Case &Repository.UserActivationMethod = GAMUserActivationMethod.User
	&User.Load(&UserGUID)
	&User.SendEmailToActivateAccount(&Application, &LinkURL, &Errors)
	If &Errors.Count = 0
		&Message = new()
		&Message.Type = MessageTypes.Warning
		&Message.Description = "The account was created successfully, an email was sent with instructions to activate your account!"
		&Messages.Add(&Message)
	Else
		GAMConvertErrorsToMessages(&Errors, &Messages)
	Endif

Case &Repository.UserActivationMethod = GAMUserActivationMethod.Administrator
	///////////////////////////////////////////////////////////////
	//Send mail to Administartor (&Repository.EmailSecurityAdministrator) with instructions to activate User
	///////////////////////////////////////////////////////////////
	&Message = new()
	&Message.Type = MessageTypes.Warning
	&Message.Description = "The user was created successfully!!, you must wait for confirmation from the administrator."
	&Messages.Add(&Message)	

EndCase
```

### Rules (Rules)

```genexus
Parm(in:&UserGUID, in:&LinkURL, out:&Messages);
```

