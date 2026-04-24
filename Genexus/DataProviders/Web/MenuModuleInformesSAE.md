# DataProvider: MenuModuleInformesSAE

- **Module:** Web
- **Description:** Menu Module Informes SAE
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
		
		caption = "Reportes" 
		
		subItems
		{
			
		
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	unitplan.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Units Plan"  
			} 
			*/
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	FormActual_SI.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Statement of Income"  
			} */
			
			/*Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	FormSD.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Selected Data"  
			} */
			
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ordersmoney.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Report Orders Price"  
			} 

			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	SAE.Orders.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Report Orders"  
			} 

			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ftbww.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Report FTB"  
			} 
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	listadoremisiones.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Remission"  
			} 
	
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	listadoordenes.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Orders"  
			} 
			*/
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	itw.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "ITW Report"  
			} */
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	itwoutlook.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "ITW Outlook Report"  
			} 
			*/
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	InventarioWP.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Inventario"  
			} */
			
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	FTBYTD.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "FTB YTD"  
			} 
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	FTB2.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "FTB 2"  
			} */
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	FormBS.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Balance Sheet"  
			} */
			
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	RealtimeInventory.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Realtime Inventory"  
			}
			/*
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	unitplan2.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Units Plan by Price"  
			} 
			*/

		}
	}
}
```

