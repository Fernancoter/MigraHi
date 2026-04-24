# Procedure: GetMenuAuthorizedOptions

- **Module:** WWPBaseObjects
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Aux_DVelop_Menu_Item | Variable | GX_SDT |  | Aux_DVelop_Menu_Item |
| DVelop_Menu | Parameter | GX_SDT | inout | DVelop_Menu |
| DVelop_Menu_Item | Variable | GX_SDT |  | DVelop_Menu_Item |
| i | Variable | NUMERIC |  | i |
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| j | Variable | NUMERIC |  | j |
| RemoveIds | Variable | CHARACTER |  | Remove Ids |
| ResultJson | Variable | LONGVARCHAR |  | Result Json |
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
/*
This procedure returns only authorized options. 

SDT DVExtUC_SDTSidebarMenuOptionsData's Item has an "authorizationKey" property.
Possible values:
 - If it is empty, the item will be checked automatically based on its url
 - If it has the "public" value, the item will be authorized.
 - If it has aNother value, it will be used as the authorization key.
*/ 

For &DVelop_Menu_Item In &DVelop_Menu
 	//with subitems
	If &DVelop_Menu_Item.subItems.Count > 0
 		GetMenuAuthorizedOptionsRecursive.Call(&DVelop_Menu_Item.ToJson(),&ResultJson) 
		&Aux_DVelop_Menu_Item.FromJson(&ResultJson)
		If &Aux_DVelop_Menu_Item.subItems.Count = 0 
			&RemoveIds.Add(&DVelop_Menu_Item.id)
		else
			&DVelop_Menu_Item.FromJson(&ResultJson) 
		EndIf
	else   
		//main level item
		&IsAuthorized = IsMenuAuthorizedOption(&DVelop_Menu_Item)
		If Not &IsAuthorized 
			&RemoveIds.Add(&DVelop_Menu_Item.id) 
		EndIf
	EndIf
EndFor
 
For &i = 1 To &RemoveIds.Count
	For &j = 1 To &DVelop_Menu.Count
		If &DVelop_Menu.Item(&j).id.Trim() = &RemoveIds.Item(&i).Trim()
			&DVelop_Menu.Remove(&j)
			exit
		EndIf
	EndFor
EndFor
```

### Rules (Rules)

```genexus
parm(inout:&DVelop_Menu);
```

