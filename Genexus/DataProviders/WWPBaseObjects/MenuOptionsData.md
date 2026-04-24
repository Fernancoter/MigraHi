# DataProvider: MenuOptionsData

- **Module:** WWPBaseObjects
- **Description:** Menu Options Data
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
		link =	Home.Link()
		linkTarget ="" 
		iconClass = !"menu-icon fa fa-home"
		caption = "WWP_HomeTitle"  
	} 

	Item
	{
		&id = &id + 1
		id = &id.ToString()
		tooltip = ""
		link =""
		linkTarget ="" 
		iconClass = !"menu-icon fa fa-tasks"
		caption = !"Menu Option 1" 
		
		subItems
		{ 
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link = ""
				linkTarget =""  
				caption = !"Menu Option 1.1" 
				authorizationKey = "" 
			}
		
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link = ""
				linkTarget =""  
				caption = !"Menu Option 1.2" 
				authorizationKey = !"" 
			}
		
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link = ""
				linkTarget =""  
				caption = !"Menu Option 1.3" 
				authorizationKey = !""
			}
		}
	}

	Item
	{
		&id = &id + 1
		id = &id.ToString()
		tooltip = ""
		link = ""
		linkTarget ="" 
		iconClass = !"menu-icon fa fa-key"
		caption = !"Menu Option 2" 
		
		subItems
		{ 
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =""
				linkTarget ="" 
				iconClass = !""
				caption = "Menu Option 2.1" 
				
				subItems
				{ 
					Item
					{
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = ""
						linkTarget =""  
						caption = "Menu Option 2.1.1" 
						authorizationKey = !""
					}
					Item
					{
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = ""
						linkTarget =""  
						caption = "Menu Option 2.1.2" 
						authorizationKey = !""
					}
					Item
					{
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = ""
						linkTarget =""  
						caption = "Menu Option 2.1.3" 
						authorizationKey = !""
					}
				}
			}
		
		Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =""
				linkTarget ="" 
				iconClass = !""
				caption = "Menu Option 2.2" 
				
				subItems
				{ 
					Item
					{
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = ""
						linkTarget =""  
						caption = "Menu Option 2.2.1" 
						authorizationKey = !""
					}
				}
			}
		}
	} 

	Item
	{
		&id = &id + 1
		id = &id.ToString()
		tooltip = ""
		link = !""
		linkTarget = !"" 
		iconClass = !"menu-icon fa fa-briefcase"
		caption = !"Menu Option 3" 
		authorizationKey = !"" //allow access to everybody
	}
 
    
	Item
	{
		&id = &id + 1
		id = &id.ToString()
		tooltip = ""
		link =""
		linkTarget ="" 
		iconClass = !"menu-icon fa fa-edit"
		caption = !"Developer Menu"

		
		subItems 
		{ 
			Item [Count=20] Input &ProgramName in ListWWPPrograms()
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link = &ProgramName.Link
				linkTarget ="" 
				iconClass = !""
				caption = &ProgramName.Description				
		 	}
		}
  }

	
	Item
	{
		&id = &id + 1
		id = &id.ToString()
		tooltip = "WWP_GAM_SecurityOfTheApplication"
		link =""
		linkTarget ="" 
		iconClass = !"menu-icon fa fa-key"
		caption = "WWP_GAM_GAMSecurity" 
		subItems
		{ 
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = "WWP_GAM_Users"
				link =GAMWWUsers.Link()
				linkTarget =""
				iconClass = !""
				caption = "WWP_GAM_Users"
				authorizationKey = ""
				
			}
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = "WWP_GAM_Roles"
				link =GAMWWRoles.Link()
				linkTarget ="" 
				iconClass = !""
        caption = "WWP_GAM_Roles"
				iconClass = !""
				authorizationKey = ""
				
			}
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =""
				linkTarget ="" 
				iconClass = !""
				caption = "WWP_GAM_Repository" 
				
				subItems
				{ 
					&IsRepoAdministrator = &Repository.IsGAMAdministrator(&Errors)
					Item
					where &IsRepoAdministrator
					{
						&id = &id + 1
						id = &id.ToString()
						tooltip = ""
						link = Link("GAMWWRepositories")
						linkTarget =""  
						caption = "WWP_GAM_Repositories" 
						authorizationKey = ""
						
					}
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = "Repository Configuration"
						link =  Link("GAMRepositoryConfiguration", 0)
						linkTarget =""  
						caption = "WWP_GAM_Configuration"
						authorizationKey = ""
						
					}
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = "Repository Connections"
						link = Link("GAMWWConnections")
						linkTarget =""  
						caption = "WWP_GAM_Connections" 
						authorizationKey = ""
						
					}
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = "Change Working Repository"
						link = Link("GAMChangeRepository")
						linkTarget =""  
						caption = "WWP_GAM_WorkingRepository" 
						authorizationKey = ""
						
					}
				}
			}
			
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = "WWP_GAM_OtherConfigurations"
				link =""
				linkTarget ="" 
				iconClass = !""
				caption = "WWP_GAM_OtherConfigurations" 
				
				subItems
				{ 
					Item
					{
						&id = &id + 1
						id = &id.ToString()
						tooltip = "WWP_GAM_SecurityPolicies"
						link = Link("GAMWWSecurityPolicy")
						linkTarget =""  
						caption = "WWP_GAM_SecurityPolicies" 
						authorizationKey = ""
						
					}
					Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = "WWP_GAM_AuthenticationTypes"
						link =  Link("GAMWWAuthTypes")
						linkTarget =""  
						caption = "WWP_GAM_AuthenticationTypes"
						authorizationKey = ""
						
					}
          
          Item
					{ 
						&id = &id + 1
						id = &id.ToString()
						tooltip = "WWP_GAM_EventSubscriptions"
						link =  Link("GAMWWEventSubscriptions")
						linkTarget =""  
						caption = "WWP_GAM_EventSubscriptions"
						authorizationKey = ""
						
					}
					
				}
			}
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = ""
				link =GAMChangeYourPassword.Link()
				linkTarget ="" 
				iconClass = !""
				caption = "WWP_GAM_ChangePassword" 
				authorizationKey = ""
				
			}
			Item
			{
				&id = &id + 1
				id = &id.ToString()
				tooltip = "WWP_GAM_Applications"
				link =Link("GAMWWApplications")
				linkTarget ="" 
				iconClass = !""
				caption = "WWP_GAM_Applications" 
				authorizationKey = ""
			}
		}
	}
	
}
```

