# Procedure: SecGAMIsAuthByFunctionalityKey

- **Module:** WWPBaseObjects
- **Description:** Is Authorized By Functionality
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GAMErrors | Variable | GX_EXTERNAL_OBJECT |  | GAMErrors |
| IsAuthorized | Parameter | Boolean | out | Is Authorized |
| SecGAMFunctionalityKey | Parameter | VARCHAR | in | Sec GAMFunctionality Key |
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
If &SecGAMFunctionalityKey = !'<Check_Is_Authenticated>'
	&IsAuthorized = Not (GAMSession.IsAnonymousUser(&GAMErrors))
Else
	&IsAuthorized = GAMRepository.CheckPermission(&SecGAMFunctionalityKey)
Endif
```

### Rules (Rules)

```genexus

parm(in:&SecGAMFunctionalityKey, out:&IsAuthorized);
```

