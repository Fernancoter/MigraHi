# Procedure: IsMenuAuthorizedOption

- **Module:** WWPBaseObjects
- **Description:** Is Sidebar Authorized Option
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| AuthorizationKey | Variable | VARCHAR |  | Authorization Key |
| DVelop_Menu_Item | Parameter | GX_SDT | in | DVelop_Menu_Item |
| i | Variable | NUMERIC |  | i |
| IsAuthorized | Parameter | Boolean | out | Is Authorized |
| j | Variable | NUMERIC |  | j |
| Url | Variable | VARCHAR |  | Url |
| UrlObjectName | Variable | VARCHAR |  | Url Object Name |
| UrlResourceName | Variable | CHARACTER |  | Url Resource Name |
| UrlResourceNameWithExtension | Variable | CHARACTER |  | Url Resource Name With Extension |
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

SDT DVExtUC_SDTSidebarMenuOptionsData's Item has an "authorizationKey" property.
Possible values:
 - If it is empty, the item will be checked automatically based on its url
 - If it has the "public" value, the item will be authorized.
 - If it has aNother value, it will be used as the authorization key.
*/
 
//resolve access for this item
Do Case
		//Public
	Case &DVelop_Menu_Item.authorizationKey.ToLower() = !"public"
		&IsAuthorized = true
	Case Not &DVelop_Menu_Item.authorizationKey.IsEmpty()
		//Check with this key 
		&IsAuthorized = WWPBaseObjects.SecGAMIsAuthByFunctionalityKey(&DVelop_Menu_Item.AuthorizationKey)
	Otherwise
		//Check by url 
		&Url = &DVelop_Menu_Item.link
		If Not &Url.IsEmpty()		
			do 'Get Authorization Key From Url'
		&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(&AuthorizationKey)
		Else
			&IsAuthorized = True
		EndIf
EndCase


Sub 'Get Authorization Key From Url'
	&AuthorizationKey.SetEmpty()
	&UrlResourceName.setEmpty() 
	
	&Url = &Url.Replace(".aspx", "")
	
	//remove base url string
	&i = &Url.LastIndexOf(!"/")
	If &i > 0
		&Url = &Url.Substring(&i+1, &Url.Trim().Length() - &i ) 
	else
		&Url = &Url.Trim()
	endIf
	
	If &Url.LastIndexOf("?") > 0 //Remove Parameters
		&Url = &Url.Substring(1, &Url.LastIndexOf("?") - 1) 
	EndIf
	
	&i = &Url.LastIndexOf(!".") //last .
	&UrlResourceName = &Url.Substring(&i + 1, &Url.Length() - &i)
	&AuthorizationKey = &UrlResourceName.Trim().ToLower() + !"_Execute"		
EndSub
```

### Rules (Rules)

```genexus
parm(in:&DVelop_Menu_Item, out:&IsAuthorized);
```

