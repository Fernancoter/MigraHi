# DataProvider: MenuReportesHC

- **Module:** Reportes
- **Description:** Menu Reportes HC
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
		caption = !"Reportes HC"
		
		subItems
		{
		
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	InicioReportesHC.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-cogs"
				caption = "Inicio"  
			} 
		
		        
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-cogs"
				caption = "Observaciones"
				
				subItems
				{
				   	Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	CausaInterrupcionWW.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "Causas Interrupción"  
					} 
					
		                        Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	Reportes.ExtrusoraObservacionWW.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "Extrusoras"  
					} 
				        
					 Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	PrensaObservacionWW.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "Prensas"  
					} 
				}
			} 
		
		        Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-cogs"
				caption = "Descargables"
				
				subItems
				{
				   	Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	ReporteDRR.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "DRR"  
					} 
				        
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	PalletEnEmbarque.Link()
						linkTarget = "" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "Pallet_Embarque"  
					} 
					
				        Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	CarreteEnPallet.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "Carrete_Pallet"  
					} 
				}
			} 
		
		         Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-cogs"
				caption = "Resúmenes"
				
				subItems
				{
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	vwExtrusionResultado.Link()
						linkTarget = "" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "Extrusión"  
					} 
					
				        Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	vwPrensadoResultado.Link()
						linkTarget ="" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "Prensado"  
					} 
				}
			}
		        
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-cogs"
				caption = "Etiquetado"
				
				subItems
				{
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link =	vwOrdenEtiquetado.Link()
						linkTarget = "" 
						iconClass = !"menu-icon fa fa-cogs"
						caption = "Órdenes"  
					} 
				}
			}
		}	
        }
}
```

