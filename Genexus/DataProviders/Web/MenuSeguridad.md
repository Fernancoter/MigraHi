# DataProvider: MenuSeguridad

- **Module:** Web
- **Description:** Menu Seguridad
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| id | Variable | NUMERIC |  | id |
| ProgramName | Variable | GX_SDT |  | Program Name |
| Repository | Variable | GX_EXTERNAL_OBJECT |  | Repository |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| IsRepoAdministrator | Variable | Boolean |  | Is Repo Administrator |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
DVelop_Menu
{
	
	&id = 0
	Item
	{
		&id = &id + 1
		id = &id.ToString()
		tooltip = ""
		linkTarget ="" 
		caption = !"Seguridad"
		
		subItems
		{
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	inicioseguridad.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-home"
				caption = "Inicio"  
			} 
		
		    Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link = GAMWWUsers.Link()
				linkTarget =""
				iconClass = !"menu-icon far fa-stop-circle"
				caption = "Usuarios"  
				
			} 
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link = GAMWWRoles.Link()
				linkTarget =""
				iconClass = !"menu-icon far fa-stop-circle"
				caption = "Roles"  
				
			} 
		
		}
	}
}
```

