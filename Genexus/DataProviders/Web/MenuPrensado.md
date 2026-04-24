# DataProvider: MenuPrensado

- **Module:** Web
- **Description:** Menu Prensado
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
		caption = !"Prensado"
		
		subItems
		{
		
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	InicioPrensado.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-home"
				caption = "Inicio"  
			} 
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	TurnosPorSemanaPrensas.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-calendar-day"
				caption = "Turnos Por Semana"  
			} 
		
//			Item
//			{ 
//				&id = &id + 1
//				id = &id.ToString()
//				tooltip = ""
//				link =	vwTrazabilidad.Link()
//				linkTarget ="" 
//				iconClass = !"menu-icon fas fa-thumbtack"
//				caption = "Trazabilidad"  
//			} 
			
		Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	DB.TroquelWW.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-border-none"
						caption = "Troqueles"  
					} 
				
		Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	listarPrensas.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-align-center"
						caption = "Prensas"  
					} 
				  Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = listarPrensaProducto.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-link"
						caption = "Prensa Producto"  
					}
				
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = listarProductoTerminado.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-link"
						caption = "Producto Terminado"  
					}
		
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-vector-square"
				caption = "Operación"  
				subItems
				{
					
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	Produccion.vwAnaliticaPrensado.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Prensados"  
						
					} 
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	carreraww.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Carreras"  
						
					} 
					/*Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	carreteww.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Carretes"  
						
					}*/ 
					
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	vwAnaliticaCarrete.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Carretes"  
						
					}
				
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	DB.PaletWW.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Palets"  
						
					} 
					
				} 	
			} 
		}
	}
}
```

