# DataProvider: Modules

- **Module:** Web
- **Description:** Get Home Modules Sample Copy1
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| MaxItemsToGet | Variable | NUMERIC |  | Max Items To Get |
| Count | Variable | NUMERIC |  | Count |
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
	
	Item
			{ 
				id = !"3"
				
				tooltip = ""
				link = inicioinventario.Link()
				linkTarget ="" 
				iconClass = !"menu-icon  far fa-warehouse"
				caption = "Inventario"  
				additionalData = "Inventario" //Uso como descripción
				linkTarget = user_hard_hat_regular.Link() //Uso como URL de Imágen de Módulo	
				
				
			} 
			Item
			{ 
				id = !"4"
				
				tooltip = ""
				link = InicioExtrusion.Link()
				linkTarget ="" 
				iconClass = !"menu-icon  fal fa-draw-circle"
				caption = "Extrusión"  
				additionalData = "Extrusión" //Uso como descripción
				linkTarget = user_hard_hat_regular.Link() //Uso como URL de Imágen de Módulo	
				
				
			} 
		Item
			{ 
				id = !"5"
				
				tooltip = ""
				link = InicioPrensado.Link()
				linkTarget ="" 
				iconClass = !"menu-icon  fas fa-vector-square"
				caption = "Prensado"  
				additionalData = "Prensado" //Uso como descripción
				linkTarget = user_hard_hat_regular.Link() //Uso como URL de Imágen de Módulo
				
				
			}
			Item
			{ 
			id = !"9"
			
			tooltip = ""
			link = InicioEmbarques.Link()
			linkTarget ="" 
			iconClass = !"menu-icon far fa-shipping-fast"
			caption = "Embarques"  
			additionalData = "Embarques" //Uso como descripción
			linkTarget = user_hard_hat_regular.Link() //Uso como URL de Imágen de Módulo
			
			}
	
			Item
			{ 
				id = !"10"
				
				tooltip = ""
				link = InicioCalidad.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-tasks"
				caption = "Calidad"  
				additionalData = "Calidad" //Uso como descripción
				linkTarget = tasks_solid.Link() //Uso como URL de Imágen de Módulo
				
				
			}
		
			Item
			{ 
				id = !"1"
				
				tooltip = ""
				link =	Seguridad.inicioSeguridad.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fal fa-user-unlock"
				caption = "Seguridad"  
				linkTarget = user_unlock_light.Link()
				
				
				
				
			} 
			Item
			{ 
				id = !"2"
				
				tooltip = ""
				link = InicioProduccion.Link()
				linkTarget ="" 
				iconClass = !"menu-icon  far fa-sliders-h"
				caption = "Configurar Producción"  
				additionalData = "Configurar Producción" //Uso como descripción
				linkTarget = user_hard_hat_regular.Link() //Uso como URL de Imágen de Módulo
				
				
				
			} 
		

			Item
			{ 				
				id = !"7"
				
				tooltip = ""
				link =	InicioReportes.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-file-chart-pie"
				caption = "Reportes SAE"  
				linkTarget = file_chart_pie_solid.Link()
								
				
				
			} 
			Item
			{ 				
				id = !"8"
				
				tooltip = ""
				link =	InicioCatalogosSAE.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-th-list"
				caption = "Catálogos SAE"  
				linkTarget = th_list_regular.Link()
				
			} 
		
		        Item
			{ 				
				id = !"11"
				
				tooltip = ""
				link =	InicioReportesHC.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-file-chart-pie"
				caption = "Informes Operativos"  
				linkTarget = file_chart_pie_solid.Link()

			} 
}
```

