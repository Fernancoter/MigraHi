# Procedure: GAMIsAuthByFunctionalityKey

- **Module:** WorkWithPlus.NativeMobile
- **Description:** GAMIs Auth By Functionality Key
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| FunctionalityKey | Parameter | VARCHAR | in | Functionality Key |
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
If &FunctionalityKey = !'<Check_Is_Authenticated>'
	&IsAuthorized = Not (GAMSession.IsAnonymousUser(&GAMErrors))
Else
	&IsAuthorized = GAMRepository.CheckPermission(&FunctionalityKey)
Endif
```

### Rules (Rules)

```genexus
parm(in:&FunctionalityKey, out:&IsAuthorized);
```

