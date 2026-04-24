# DataProvider: MenuCalidad

- **Module:** Web
- **Description:** Menu Embarques
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
		caption = !"Calidad"
		
		subItems
		{
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	Calidad.InicioCalidad.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-home"
				caption = "Inicio"  
			} 
		        
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	CarreteDefectoWW.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-cog"
				caption = "Defectos"  
			} 
		
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	Calidad.reclamosww.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-building"
				caption = "Reclamos"  
			} 
		
		        Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ConsultarCarrete.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-search"
				caption = "Consultar"  
			} 
			
		}	
	}
}
```

