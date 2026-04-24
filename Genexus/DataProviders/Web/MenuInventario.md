# DataProvider: MenuInventario

- **Module:** Web
- **Description:** Menu Inventario
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
		caption = !"Inventarios"
		
		subItems
		{
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	InicioInventario.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fa fa-home"
				caption = "Inicio"  
			} 
		
		  Item
				{ 
					&id = &id + 1
					id = &id.ToString()
					tooltip = ""
					link =	Produccion.listarSilos.Link()
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
				link =	listarInventario.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-calendar"
				caption = "Cierre de Mes"  
			} 
		
		        Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ExistenciaWW.Link()
				linkTarget ="" 
				iconClass = !"menu-icon fas fa-boxes"
				caption = "Inventario"  
			} 
			
        }
	}
}
```

