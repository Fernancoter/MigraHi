# DataProvider: MenuModuleCatalogosSAE

- **Module:** Web
- **Description:** Menu Module Catalogos SAE
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
			
			
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	DB.CustomerWW.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Customer"  
			}
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	SAE.outlookww.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Outlook"  
			}

			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	DB.BudgetWW.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Budget"  
			}
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	priceww.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Price"  
			}
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	ProductsWW.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "Product"  
			}
			
			Item
			{ 
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =	SalesPersonWW.Link()
				linkTarget ="" 
				iconClass = !"menu-icon far fa-dot-circle"
				caption = "SalesPerson"  
			}





		}
	}
}
```

