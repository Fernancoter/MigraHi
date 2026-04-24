# DataProvider: MenuEmbarques

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
		caption = !"Embarques"
		
		subItems
		{
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	InicioEmbarques.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-home"
				caption = "Inicio"  
			} 
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	customerww.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-building"
				caption = "Clientes"  
			} 
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ProductsWW.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dice-six"
				caption = "Productos"  
			} 
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ListadoOrdenes.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-comments-dollar"
				caption = "Pedidos"  
			} 
				Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ListadoRemisiones.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa-solid fad fa-truck-ramp"
				caption = "Remisiones"  
			} 
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	Embarques.ListadoEmbarques.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa-solid fad fa-truck-ramp"
				caption = "Embarques"  
			} 
		
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ftbww.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-file-invoice"
				caption = "Facturas"  
			} 
		
		}	
	}
}
```

