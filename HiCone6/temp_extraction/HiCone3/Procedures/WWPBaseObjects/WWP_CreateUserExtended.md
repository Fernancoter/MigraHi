# Procedure: WWP_CreateUserExtended

- **Module:** WWPBaseObjects
- **Description:** WWP_Create User Extended
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPUserExtended | Variable | GX_BUSCOMP |  | WWPUser Extended |
| PhotURL | Parameter | VARCHAR | in | Phot URL |
| WWPUserExtendedId | Parameter | CHARACTER | in | User Id |
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
&WWPUserExtended = New()
&WWPUserExtended.WWPUserExtendedId = &WWPUserExtendedId
If Not &PhotURL.IsEmpty()
	&WWPUserExtended.WWPUserExtendedPhoto.FromURL(&PhotURL)
EndIf
&WWPUserExtended.WWPUserExtendedDesktopNotif = True
&WWPUserExtended.WWPUserExtendedEmaiNotif = True
&WWPUserExtended.WWPUserExtendedSMSNotif = True
&WWPUserExtended.WWPUserExtendedMobileNotif = True
&WWPUserExtended.Save()
If &WWPUserExtended.Success()
	Commit
Else
	WWP_Logger.Error(&pgmname, !"Create Extended User: " + &WWPUserExtended.GetMessages().ToJson())
EndIf
```

### Rules (Rules)

```genexus
parm(in:&WWPUserExtendedId, in:&PhotURL);
```

