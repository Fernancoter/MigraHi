# Procedure: SetDefaultModule

- **Module:** Web
- **Description:** Set Default Module
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GamUser | Variable | GX_EXTERNAL_OBJECT |  | Gam User |
| GAMUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | GAMUser Attribute |
| ModuleId | Variable | NUMERIC |  | Module Id |
| HttpRequest | Variable | GX_USRDEFTYP |  | Http Request |
| ImageModuleUrl | Variable | VARCHAR |  | Image Module Url |
| OptionTitle | Variable | VARCHAR |  | Option Title |
| Att_isOK | Variable | Boolean |  | Att_is OK |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| DVelop_Menu | Variable | GX_SDT |  | DVelop_Menu |
| DVelop_MenuItem | Variable | GX_SDT |  | DVelop_Menu Item |
| OptionLink | Variable | VARCHAR |  | Option Link |
| OptionDescription | Variable | VARCHAR |  | Option Description |
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

&DVelop_Menu = Modules.Udp()
GetMenuAuthorizedOptions.Call(&DVelop_Menu)
&GamUser = GamUser.Get()


For &DVelop_MenuItem in &DVelop_Menu
	
	&OptionLink = &DVelop_MenuItem.link
	&ModuleId = &DVelop_MenuItem.id.ToNumeric()
	&ImageModuleUrl = &DVelop_MenuItem.linkTarget
	&OptionTitle = &DVelop_MenuItem.caption
	&OptionDescription = &DVelop_MenuItem.additionalData
	
	
	&GAMUserAttribute.Id = "ModuleId"
	&GAMUserAttribute.Value = &ModuleId.ToFormattedString()
	&Att_isOK = &GamUser.SetAttribute(&GAMUserAttribute,&Errors)
	
	&GAMUserAttribute.Id = "ImageModuleUrl"
	&GAMUserAttribute.Value = &HttpRequest.BaseUrl +  &ImageModuleUrl.Trim()
	&Att_isOK = &GamUser.SetAttribute(&GAMUserAttribute,&Errors)
	
	&GAMUserAttribute.Id = "ModuleOptionTitle"
	&GAMUserAttribute.Value = &OptionTitle
	&Att_isOK = &GamUser.SetAttribute(&GAMUserAttribute,&Errors)
	
	
	&GAMUserAttribute.Id = "ModuleOptionDescription"
	&GAMUserAttribute.Value = &OptionDescription
	&Att_isOK = &GamUser.SetAttribute(&GAMUserAttribute,&Errors)
	if(&Att_isOK )
		commit
		&WebSession.Set(!"isSessionLoaded",'false')
	endif
	
	exit 
	
		
Endfor
```

