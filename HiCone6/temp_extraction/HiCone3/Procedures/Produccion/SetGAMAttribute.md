# Procedure: SetGAMAttribute

- **Module:** Produccion
- **Description:** Set GAM Attribute
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Id | Variable | NUMERIC |  | Id |
| Error | Variable | GX_EXTERNAL_OBJECT |  | Error |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| GamUser | Variable | GX_EXTERNAL_OBJECT |  | Gam User |
| GamUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | Gam User Attribute |
| GUID | Variable | VARCHAR |  | GUID |
| isOK | Variable | Boolean |  | is OK |
| Key | Variable | CHARACTER |  | Key |
| Value | Variable | CHARACTER |  | Value |
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
	
	&GUID = GamUser.GetId()
	&GAMUser.Load(&GUID)
	&GAMUserAttribute.Id = &Key.Trim()
	&GAMUserAttribute.Value = &Value
	
	&isOK = &GAMUser.SetAttribute(&GAMUserAttribute,&Errors)
	if &isOK
		commit
	else
		 For &Error in &Errors
                     Msg(Format(!"%1 (GAM%2)", &Error.Message, &Error.Code))
                 EndFor
	endif
```

### Rules (Rules)

```genexus
//parm(in:&ExtrusionId);
parm(in:&Key,in:&Value);
```

