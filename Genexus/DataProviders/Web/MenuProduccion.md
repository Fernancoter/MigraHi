# DataProvider: MenuProduccion

- **Module:** Web
- **Description:** Menu Produccion
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
				linkTarget ="" 
				caption = !"Extrusión"
				iconClass = !"menu-icon fal fa-draw-circle"
				
				subItems
				{
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	ExclusionDelDia.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Extrusión del Día"  
						
					} 
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
						link =	bobinaww.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Bobinas"  
						
					} 
				}
			}
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-vector-square"
				caption = "Prensado"  
				subItems
				{
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	Produccion.PrensadoDelDia.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Prensado del día"  
						
					}
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	prensadoww.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Prensados"  
						
					} 
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	DB.CarreraWW.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Carreras"  
						
					} 
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	DB.CarreteWW.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Carretes"  
						
					} 
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	paletww.Link()
						linkTarget =""
						iconClass = !"menu-icon far fa-stop-circle"
						caption = "Palets"  
						
					} 

				} 	
			} 
			
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget = "" 
				iconClass = !"menu-icon fas fa-book"
				caption = "Catálogos"  

				subItems
				{
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	WWProductoCategoria.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-asterisk"
						caption = "Categorías"  
					} 
				
				        Item
						
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	WWProducto.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-dolly"
						caption = "Productos"  
					} 
				        
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						//link =	Turnoww.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-clipboard-list"
						caption = "Turnos"  
					} 
					
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	WWOperador.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-user-cog"
						caption = "Operadores"  
					} 
					
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	wwExtrusora.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-align-justify"
						caption = "Extrusoras"  
					} 
					
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						//link =	Prensaww.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-align-center"
						caption = "Prensas"  
					} 
					

					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	wwInventario.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-boxes"
						caption = "Inventarios"  
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
						link =	listarLotes.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-box"
						caption = "Lotes"  
					} 
				        
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	TroquelWW.Link()
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
						link =	wwconfiguracion.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-cogs"
						caption = "Configuración"  
						
					} 
				        Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = wwPrensaProducto.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-link"
						caption = "PrensaProducto"  
					} 
				        
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	wwExtrusoraProducto.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-link"
						caption = "ExtrusoraProducto"  
					} 
				
				        Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	ExtrusoraMezcladoraww.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-link"
						caption = "ExtrusoraMezcladora"  
					} 
				}
			}	
                }
	}
}
```

