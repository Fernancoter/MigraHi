# Procedure: WWP_UpdateUserExtendedPhoto

- **Module:** WWPBaseObjects
- **Description:** WWP_Update User Extended Photo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WWPUserExtended | Variable | GX_BUSCOMP |  | WWPUser Extended |
| WWPUserExtendedId | Parameter | CHARACTER | in | User Id |
| PhotoUrl | Parameter | VARCHAR | in | Photo Url |
| PhotURL | Variable | VARCHAR |  | Phot URL |
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

If Not &PhotoUrl.IsEmpty()
	&WWPUserExtended.Load(&WWPUserExtendedId)
	If &WWPUserExtended.Success()
		&WWPUserExtended.WWPUserExtendedPhoto.FromURL(&PhotoUrl)
		&WWPUserExtended.Save()
		If &WWPUserExtended.Success()
			Commit
		Else
			WWP_Logger.Error(&pgmname, !"Update User Extended: " + &WWPUserExtended.GetMessages().ToJson())
		EndIf
	EndIf
EndIf
```

### Rules (Rules)

```genexus
parm(in:&WWPUserExtendedId, in:&PhotoUrl);
```

