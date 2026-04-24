# Procedure: SecGAMIsAuthByFunctionalityKeys

- **Module:** WWPBaseObjects
- **Description:** Is Authorized By Functionalities
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Parameter | Boolean | out | Is Authorized |
| SecGAMFunctionalityKeys | Parameter | VARCHAR | in | Sec GAMFunctionality Keys |
| SecGAMFunctionalityKey | Variable | VARCHAR |  | Sec GAMFunctionality Key |
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

&IsAuthorized = False
For &SecGAMFunctionalityKey in &SecGAMFunctionalityKeys
	&IsAuthorized = WWPBaseObjects.SecGAMIsAuthByFunctionalityKey.Udp(&SecGAMFunctionalityKey)
	If &IsAuthorized
		Exit
	EndIf
EndFor
```

### Rules (Rules)

```genexus

parm(in:&SecGAMFunctionalityKeys, out:&IsAuthorized);
```

