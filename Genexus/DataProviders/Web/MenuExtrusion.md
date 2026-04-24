# DataProvider: MenuExtrusion

- **Module:** Web
- **Description:** Menu Extrusion
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
		caption = !"Extrusión"
		
		subItems
		{
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	InicioExtrusion.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-home"
				caption = "Inicio"  
			} 
		
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	TurnosPorSemanaExtrusoras.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-calendar-day"
				caption = "Turnos Por Semana"  
			} 
			Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	listarExtrusora.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-align-justify"
						caption = "Extrusoras"  
					} 
				Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	listarExtrusoraProducto.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-link"
						caption = "Extrusora Producto"  
					}
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget ="" 
				caption = !"Operación"
				iconClass = !"menu-icon fal fa-draw-circle"
				
				subItems
				{
					
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	Extrusionww.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Extrusiones"  
						
					} 
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	vwAnaliticaBobina.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Bobinas"  
						
					} 
				}
			}
			
       	}
	}
}
```

