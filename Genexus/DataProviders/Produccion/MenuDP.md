# DataProvider: MenuDP

- **Module:** Produccion
- **Description:** Menu DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| id | Variable | NUMERIC |  | id |
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
		caption = !"Menú"
		
		subItems
		{
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				//link = Home.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-home"
				caption = "Inicio"  
			} 
		
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
				link =	PrensadoDelDia.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-vector-square"
				caption = "Prensado del Día"  
				
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
						link =	DB.WWProducto.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-dolly"
						caption = "Productos"  
					} 
				        
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						//link =	wwTurno.Link()
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
						link =	DB.WWExtrusora.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-align-justify"
						caption = "Extrusoras"  
					} 
					
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	wwPrensa.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-align-center"
						caption = "Prensas"  
					} 
					

					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	DB.WWInventario.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-boxes"
						caption = "Inventarios"  
					} 
				
				        Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	SiloWW.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-database"
						caption = "Silos"  
					} 
				
				         Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	LoteWW.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fas fa-box"
						caption = "Lotes"  
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
				}
			}	
                }
	}
}
```

