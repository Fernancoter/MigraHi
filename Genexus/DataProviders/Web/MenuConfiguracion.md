# DataProvider: MenuConfiguracion

- **Module:** Web
- **Description:** Menu Configuracion
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
		caption = !"Producción"
		
		subItems
		{
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	InicioProduccion.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-home"
				caption = "Inicio"  
			} 
		Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	listarOperador.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-user-cog"
						caption = "Operadores"  
					} 
				
		 	Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	listarProductos.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-dolly"
						caption = "Productos"  
					} 
				
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	TurnosPorSemana.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-calendar-day"
				caption = "Turnos Por Semana"  
			} 
					
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget = "" 
				iconClass = !"menu-icon fas fa-th-list"
				caption = "Catálogos"  

				subItems
				{
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = listarProductoCategoria.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-asterisk"
						caption = "Categorías"  
					} 
				
				   
				        
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	listarTurnos.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-clipboard-list"
						caption = "Turnos"  
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
						link =	listarSilos.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-database"
						caption = "Silos"  
					} 
				        
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	listarTroquel.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-border-none"
						caption = "Troqueles"  
					} 
						
				}
				
			} 
		
		        Item
			{
			        &id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-paperclip"
				caption = !"Referencias"
				
				subItems
				{
				       Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	DB.WWConfiguracion.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-cogs"
						caption = "Configuración"  
						
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
						link = listarExtrusoraMezcladora.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-link"
						caption = "Extrusora Mezcladora"  
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
					 
				}
			}	
                }
	}
}
```

