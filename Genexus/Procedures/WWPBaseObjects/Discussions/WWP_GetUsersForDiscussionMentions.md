# Procedure: WWP_GetUsersForDiscussionMentions

- **Module:** WWPBaseObjects.Discussions
- **Description:** WWP_Get Users For Discussion Mentions
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Option | Variable | GX_SDT |  | Option |
| Options | Variable | GX_SDT |  | Options |
| OptionsJson | Parameter | LONGVARCHAR | out | Options Json |
| SearchTxt | Parameter | VARCHAR | in | Search Txt |
| GAMUserFilter | Variable | GX_EXTERNAL_OBJECT |  | GAMUser Filter |
| GAMErrorCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMError Collection |
| GAMUserCollection | Variable | GX_EXTERNAL_OBJECT |  | GAMUser Collection |
| GAMUser | Variable | GX_EXTERNAL_OBJECT |  | GAMUser |
| WWPUserExtended | Variable | GX_BUSCOMP |  | WWPUser Extended |
| WWPUserExtendedFullName | Variable | VARCHAR |  | User Full Name |
| MaxOptions | Variable | NUMERIC |  | Max Options |
| CheckDuplicated | Variable | Boolean |  | Check Duplicated |
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
&Options = new()

&MaxOptions = 5

&GAMUserFilter.Names = '%' + &SearchTxt
&GAMUserCollection = GAMRepository.GetUsers(&GAMUserFilter, &GAMErrorCollection)
&CheckDuplicated = False
Do 'Search Users'

If &Options.Count < &MaxOptions
	&GAMUserFilter = new()
	&GAMUserFilter.EMail = '%' + &SearchTxt
	&CheckDuplicated = True
	Do 'Search Users'
EndIf

&OptionsJson = &Options.ToJson()

Sub 'Search Users'
	&GAMUserCollection = GAMRepository.GetUsers(&GAMUserFilter, &GAMErrorCollection)

	For &GAMUser In &GAMUserCollection
		&WWPUserExtended.Load(&GAMUser.GUID)
		&WWPUserExtendedFullName = iif(&GAMUser.FirstName.Trim().IsEmpty(), &GAMUser.Name, &GAMUser.FirstName.Trim() + " " + &GAMUser.LastName.Trim())
	
		&Option = new()
		&Option.Id = &WWPUserExtended.WWPBaseObjects.Produccion.Notifications.WWPUserExtendedId
		&Option.DisplayName = &WWPUserExtendedFullName
		
		&Option.Text.Add(&WWPUserExtendedFullName)
		&Option.Text.Add(&GAMUser.EMail)
		&Option.Text.Add(&WWPUserExtended.WWPUserExtendedPhoto.ImageURI)
		
		If not &CheckDuplicated OR not &Options.ToJson().Contains(&Option.ToJson())
			&Options.Add(&Option)
		EndIf
		
		If &Options.Count > &MaxOptions
			Exit
		EndIf
	EndFor
EndSub
```

### Rules (Rules)

```genexus

parm(in:&SearchTxt, out:&OptionsJson);
```

