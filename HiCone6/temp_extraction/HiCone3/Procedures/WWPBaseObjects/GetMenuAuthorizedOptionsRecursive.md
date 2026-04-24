# Procedure: GetMenuAuthorizedOptionsRecursive

- **Module:** WWPBaseObjects
- **Description:** Get Menu Authorized Options Recursive
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| AuxDVelop_Menu_Item | Variable | GX_SDT |  | Aux DVelop_Menu_Item |
| DVelop_Menu_Item | Variable | GX_SDT |  | DVelop_Menu_Item |
| i | Variable | NUMERIC |  | i |
| j | Variable | NUMERIC |  | j |
| ParentItemJson | Parameter | LONGVARCHAR | in | Parent Item Json |
| RemoveIds | Variable | CHARACTER |  | Remove Ids |
| Result2Json | Variable | LONGVARCHAR |  | Result2 Json |
| ResultJson | Parameter | LONGVARCHAR | out | Result Json |
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
&RemoveIds.Clear()
&DVelop_Menu_Item.FromJson(&ParentItemJson)

For &AuxDVelop_Menu_Item in &DVelop_Menu_Item.subItems
	
	//Has subitems?
	If &AuxDVelop_Menu_Item.subItems.Count > 0
 		GetMenuAuthorizedOptionsRecursive.Call(&AuxDVelop_Menu_Item.ToJson(),&Result2Json)  
		&AuxDVelop_Menu_Item.FromJson(&Result2Json)
		If &AuxDVelop_Menu_Item.SubItems.Count = 0
			&RemoveIds.Add(&AuxDVelop_Menu_Item.id)
		EndIf
	else   
		&IsAuthorized = IsMenuAuthorizedOption(&AuxDVelop_Menu_Item)
		If Not &IsAuthorized  
			&RemoveIds.Add(&AuxDVelop_Menu_Item.id)
		EndIf
		
	EndIf
	
EndFor

For &i = 1 to &RemoveIds.Count
	//Workaround For gx
	&j = 0
	For &AuxDVelop_Menu_Item in &DVelop_Menu_Item.subItems
		&j += 1
		If &AuxDVelop_Menu_Item.id.Trim() = &RemoveIds.Item(&i).Trim()
			&DVelop_Menu_Item.subItems.Remove(&j)
			Exit
		EndIf
	EndFor
EndFor

&ResultJson = &DVelop_Menu_Item.ToJson()
```

### Rules (Rules)

```genexus
parm(in:&ParentItemJson, out:&ResultJson);
```

