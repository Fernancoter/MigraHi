# Procedure: GAMIsAuthenticated

- **Module:** WorkWithPlus.NativeMobile
- **Description:** GAMIs Authenticated
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
| AllowAutoRegisteredUser | Parameter | Boolean | in | Allow Auto Registered User |
| GAMErrors | Variable | GX_EXTERNAL_OBJECT |  | GAMErrors |
| IsAuthorized | Parameter | Boolean | out | Is Authorized |
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
&IsAuthorized = Not (GAMSession.IsAnonymousUser(&GAMErrors))
IF Not &IsAuthorized AND &AllowAutoRegisteredUser
	&GAMUser = GeneXusSecurity.GAMUser.Get()
	&IsAuthorized = &GAMUser.IsAutoRegisteredUser
EndIf
```

### Rules (Rules)

```genexus
parm(in:&AllowAutoRegisteredUser, out:&IsAuthorized);
```

