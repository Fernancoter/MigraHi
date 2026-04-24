# Procedure: SessionLoad

- **Module:** Web
- **Description:** Session Load
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| RefreshNeeded | Parameter | Boolean | out | Refresh Needed |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| GamUser | Variable | GX_EXTERNAL_OBJECT |  | Gam User |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| GamUserAttribute | Variable | GX_EXTERNAL_OBJECT |  | Gam User Attribute |
| NowDate | Variable | DATE |  | Now Date |
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
&RefreshNeeded = false

If &WebSession.Get(!"isSessionLoaded") <> !"true"
		
		
		
		&GamUser = GamUser.Get()
		LoadWWPContext(&WWPContext)
		
		//Fecha De Consulta
		&NowDate = now()
		&NowDate = &NowDate.AddMonths(-3)
		&WebSession.Set(!"FechaInicialConsulta",&NowDate.ToString())
		
		//ModuleId
		&GamUserAttribute = &GamUser.GetAttribute("ModuleId", &Errors)
		&WWPContext.ModuleId = &GamUserAttribute.Value.ToNumeric()
		
		if(&WWPContext.ModuleId = 0)
			//Busca el primer módulo disponible para usuarios nuevos
			SetDefaultModule()
			&GamUserAttribute = &GamUser.GetAttribute("ModuleId", &Errors)
			&WWPContext.ModuleId = &GamUserAttribute.Value.ToNumeric()
		endif
	
		//Security User
		&WWPContext.UserName = &GamUser.Name
		&WWPContext.UserEmail = &GamUser.EMail
		&WWPContext.UserGUID = &GamUser.GUID
		
		//CompanyId
		&GamUserAttribute = &GamUser.GetAttribute("CompanyId", &Errors)
		&WWPContext.CompanyId = &GamUserAttribute.Value.ToNumeric()
		
		//ImageModuleUrl
		&GamUserAttribute = &GamUser.GetAttribute("ImageModuleUrl", &Errors)
		&WWPContext.ModuleImageUrl = &GamUserAttribute.Value.Trim()
		//OptionTitle
		&GamUserAttribute = &GamUser.GetAttribute("ModuleOptionTitle", &Errors)
  		&WWPContext.ModuleOptionTitle = &GamUserAttribute.Value.Trim()
  		//ModuleOptionDescription
		&GamUserAttribute = &GamUser.GetAttribute("ModuleOptionDescription", &Errors)
  		&WWPContext.ModuleOptionDescription = &GamUserAttribute.Value.Trim()
  		
	
	
		
		SetWWPContext(&WWPContext)
		&WebSession.Set(!"isSessionLoaded","true")
endif
```

### Rules (Rules)

```genexus
parm(out:&RefreshNeeded);
```

