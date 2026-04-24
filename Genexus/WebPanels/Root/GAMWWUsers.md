# WebPanel: GAMWWUsers

- **Module:** Root
- **Description:** WWP_GAM_Users
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Delete | Variable | CHARACTER |  | Delete |
| GridPageSize | Variable | NUMERIC |  | Grid Page Size |
| GridRecordCount | Variable | NUMERIC |  | Grid Record Count |
| AuthenticationType | Variable | GX_EXTERNAL_OBJECT |  | Authentication Type |
| AuthenticationTypeName | Variable | CHARACTER |  | Authentication |
| AuthenticationTypes | Variable | GX_EXTERNAL_OBJECT |  | Authentication Types |
| BtnDlt | Variable | BITMAP |  | Delete |
| BtnRole | Variable | CHARACTER |  | Roles |
| BtnSetPwd | Variable | CHARACTER |  | Set password |
| BtnPermissions | Variable | CHARACTER |  | Btn Permissions |
| BtnUpd | Variable | BITMAP |  | Update |
| CountUsers | Variable | NUMERIC |  | Count Users |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| FilAutType | Variable | CHARACTER |  | Fil Aut Type |
| Filter | Variable | GX_EXTERNAL_OBJECT |  | Filter |
| FilterAutType | Variable | GX_EXTERNAL_OBJECT |  | Filter Aut Type |
| FilUserGender | Variable | CHARACTER |  | Filter User Gender |
| FirstName | Variable | CHARACTER |  | First Name |
| GAMUserIsAutoRegisteredUser | Variable | Boolean |  | GAMUser Is Auto Registered User |
| GAMUserIsDeleted | Variable | Boolean |  | GAMUser Is Deleted |
| GAMUsers | Variable | GX_EXTERNAL_OBJECT |  | GAMUsers |
| GridCurrentPage | Variable | NUMERIC |  | Grid Current Page |
| GridPageCount | Variable | NUMERIC |  | Grid Page Count |
| GUID | Variable | CHARACTER |  | GUID |
| IsAuthorized_BtnDlt | Variable | Boolean |  | Is Authorized_Btn Dlt |
| IsAuthorized_BtnRole | Variable | Boolean |  | Is Authorized_Btn Role |
| IsAuthorized_BtnSetPwd | Variable | Boolean |  | Is Authorized_Btn Set Pwd |
| IsAuthorized_BtnUpd | Variable | Boolean |  | Is Authorized_Btn Upd |
| LastName | Variable | CHARACTER |  | Last Name |
| Name | Variable | VARCHAR |  | Name |
| PageToGo | Variable | NUMERIC |  | Page To Go |
| Repository | Variable | GX_EXTERNAL_OBJECT |  | Repository |
| TempBoolean | Variable | Boolean |  | Temp Boolean |
| User | Variable | GX_EXTERNAL_OBJECT |  | User |
| GAMUsersCount | Variable | NUMERIC |  | GAMUsers Count |
| Search | Variable | VARCHAR |  | Search |
| FilRol | Variable | NUMERIC |  | Fil Rol |
| Role | Variable | GX_EXTERNAL_OBJECT |  | Role |
| FilterRoles | Variable | GX_EXTERNAL_OBJECT |  | Filter Roles |
| IsAuthorized_Name | Variable | Boolean |  | Is Authorized_Name |
| Roles | Variable | GX_EXTERNAL_OBJECT |  | Roles |
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| Context | Variable | GX_SDT |  | Context |
| HTTPRequest | Variable | GX_USRDEFTYP |  | HTTPRequest |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| TrnContext | Variable | GX_SDT |  | Trn Context |
| TrnContextAtt | Variable | GX_SDT |  | Trn Context Att |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| ColumnsSelectorXML | Variable | LONGVARCHAR |  | Columns Selector XML |
| CurrentPage | Variable | NUMERIC |  | Current Page |
| RecordIndex | Variable | NUMERIC |  | Record Index |
| LineEven | Variable | NUMERIC |  | Line Even |
| RecordPage | Variable | NUMERIC |  | Record Page |
| TotalRecords | Variable | NUMERIC |  | Total Records |
| ColumnValue | Variable | VARCHAR |  | Column Value |
| UserCustomValue | Variable | LONGVARCHAR |  | User Custom Value |
| ColumnName | Variable | VARCHAR |  | Column Name |
| i | Variable | NUMERIC |  | i |
| ColumnsToRemove | Variable | NUMERIC |  | Columns To Remove |
| ColumnToRemove | Variable | NUMERIC |  | Column To Remove |
| ColumnsSelector | Variable | GX_SDT |  | Columns Selector |
| Window | Variable | GX_USRDEFTYP |  | Window |
| GridImageAction | Variable | BITMAP |  | Grid Image Action |
| NewColumnVisible | Variable | Boolean |  | New Column Visible |
| ColumnsSelectorXML2 | Variable | LONGVARCHAR |  | Columns Selector XML2 |
| Session | Variable | GX_USRDEFTYP |  | Session |
| DDO_TitleSettingsIcons | Variable | GX_SDT |  | DDO_Title Settings Icons |
| ExcelFilename | Variable | VARCHAR |  | Excel Filename |
| ErrorMessage | Variable | VARCHAR |  | Error Message |
| ManageFiltersExecutionStep | Variable | NUMERIC |  | Manage Filters Execution Step |
| ManageFiltersXml | Variable | LONGVARCHAR |  | Manage Filters Xml |
| ManageFiltersItems | Variable | GX_SDT |  | Manage Filters Items |
| ManageFiltersItem | Variable | GX_SDT |  | Manage Filters Item |
| ManageFiltersData | Variable | GX_SDT |  | Manage Filters Data |
| ManageFiltersDataItem | Variable | GX_SDT |  | Manage Filters Data Item |
| GridActions | Variable | NUMERIC |  | Grid Actions |
| FirstIndex | Variable | NUMERIC |  | First Index |
| ColumnsSelectorAux | Variable | GX_SDT |  | Columns Selector Aux |
| GridAppliedFilters | Variable | VARCHAR |  | Grid Applied Filters |
| Display | Variable | CHARACTER |  | Display |
| Update | Variable | CHARACTER |  | Update |
| IsAuthorized_Display | Variable | Boolean |  | Is Authorized_Display |
| IsAuthorized_Update | Variable | Boolean |  | Is Authorized_Update |
| IsAuthorized_Delete | Variable | Boolean |  | Is Authorized_Delete |
| IsAuthorized_BtnPermissions | Variable | Boolean |  | Is Authorized_Btn Permissions |
| IsAuthorized_Insert | Variable | Boolean |  | Is Authorized_Insert |
| GAMRepository | Variable | GX_EXTERNAL_OBJECT |  | GAMRepository |
| BtnUnblockOTPCodes | Variable | CHARACTER |  | Btn Unblock OTPCodes |
| Error | Variable | GX_EXTERNAL_OBJECT |  | Error |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Start (Event)

```genexus
GridPaginationBar.Caption = "WWP_GAM_WWUsers_PagingCaption"
	GridPaginationBar.PagesToShow = 0
	GridPaginationBar.ShowLast = False
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&GAMUsersCount.Visible = False
	Grid.Rows = Page.Rows
	Grid_Empowerer.GridInternalName = Grid.InternalName
	DDO_GridColumnsSelector.GridInternalName = Grid.InternalName
	If &HTTPRequest.Method = HttpMethod.Get
		Do 'LoadSavedFilters'
	EndIf
	&IsAuthorized_Name = SecGAMIsAuthByFunctionalityKey.Udp(!'gamuserentry_Execute')
	
	DDO_Grid.GridInternalName = Grid.InternalName
	Form.Caption = 'WWP_GAM_Users'
	Do 'LoadGridState'
	&DDO_TitleSettingsIcons = GetWWPTitleSettingsIcons()
	DDO_GridColumnsSelector.TitleControlIdToReplace = BtnEditColumns.InternalName
	GridPaginationBar.RowsPerPageSelectedValue = Grid.Rows
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
	&FilAutType.Clear()
	&FilAutType.AddItem('','WWP_GAM_All')
	&AuthenticationTypes = GAMRepository.GetAuthenticationTypes(&FilterAutType, &Errors)
	For &AuthenticationType in &AuthenticationTypes
		&FilAutType.AddItem(&AuthenticationType.Name,&AuthenticationType.Description)
	EndFor
	&FilRol.Clear()
	&FilRol.AddItem(0,'WWP_GAM_All')
	&FilRol.AddItem(-1,'WWP_GAM_NoRole')
	&Roles = &Repository.GetRoles(&FilterRoles, &Errors)
	For &Role in &Roles
		&FilRol.AddItem(&Role.Id,&Role.Name)
	EndFor
	&BtnRole.Title = "WWP_GAM_Roles"
	&BtnSetPwd.Title = "WWP_GAM_Password"
 	&BtnPermissions.Title = "WWP_GAM_Permissions"
	
	&Repository = GAMRepository.Get()
```

### Refresh (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	LoadWWPContext.Call(&WWPContext)
	Do 'CheckSecurityForActions'
	Do Case
		Case &ManageFiltersExecutionStep = 1
			&ManageFiltersExecutionStep = 2
		Case &ManageFiltersExecutionStep = 2
			&ManageFiltersExecutionStep = 0
			Do 'LoadSavedFilters'
	EndCase
	Do 'SaveGridState'
	
	If &Session.Get(!'GAMWWUsersColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'GAMWWUsersColumnsSelector')
		&ColumnsSelector.FromXml(&ColumnsSelectorXML)
	Else
		Do 'InitializeColumnsSelector'
	EndIf
	&Name.Visible = &ColumnsSelector.Columns.Item(1).IsVisible
	&FirstName.Visible = &ColumnsSelector.Columns.Item(2).IsVisible
	&LastName.Visible = &ColumnsSelector.Columns.Item(3).IsVisible
	&AuthenticationTypeName.Visible = &ColumnsSelector.Columns.Item(4).IsVisible
	&GridCurrentPage = Grid.CurrentPage
	//&GridPageCount has to be loaded manually
	&GridAppliedFilters = WWP_GetAppliedFiltersDescription(&Pgmname)
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
	&GridCurrentPage = Grid.CurrentPage
	&GridPageSize = Grid.Rows
  
  	&Filter.Gender.FromString(&FilUserGender)
	&Filter.AuthenticationTypeName	= &FilAutType
	&Filter.LoadCustomAttributes	= False
	&Filter.ReturnAnonymousUser 	= False
	&Filter.Limit = &GridPageSize + 1
	&FirstIndex = (&GridCurrentPage - 1) * &GridPageSize + 1
	&Filter.Start = &FirstIndex - 1
	if not &Search.IsEmpty()
		&Filter.Searchable	= !"%" + &Search	
	endif
	If &FilRol = -1
		&Filter.WithoutRoles = true
	Else
		&Filter.RoleId = &FilRol
	EndIf	
	&GAMUsers = GAMRepository.GetUsersOrderBy(&Filter, GAMUserListOrder.None, &Errors)
  	If &FilAutType.Count = 2
		&AuthenticationTypeName.Visible = False
	Endif
	If &GAMUsers.Count = &Filter.Limit
		&GridRecordCount = &GridCurrentPage * &GridPageSize + 1
		&GridPageCount = &GridCurrentPage + 1
	Else
		&GridRecordCount = (&GridCurrentPage - 1) * &GridPageSize + &GAMUsers.Count
		&GridPageCount = &GridCurrentPage
	EndIf
```

### GridPaginationBar.ChangePage (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Do Case
		Case GridPaginationBar.SelectedPage = !'Previous'
			Grid.PreviousPage()
		Case GridPaginationBar.SelectedPage = !'Next'
			Grid.NextPage()
		Otherwise
			&PageToGo.FromString(GridPaginationBar.SelectedPage)
			Grid.GotoPage(&PageToGo)
	EndCase
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### GridPaginationBar.ChangeRowsPerPage (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Grid.Rows = GridPaginationBar.RowsPerPageSelectedValue
	Grid.FirstPage()
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Grid.Load (Event)

```genexus
For &i = 1 to &FirstIndex - 1
		Load
	EndFor
	For &User in &GAMUsers
		&AuthenticationTypeName = &User.AuthenticationTypeName		
		&GUID = &User.GUID
		&Name = &User.Name
		&FirstName = &User.FirstName
		&LastName = &User.LastName
		
		If &User.IsEnabledInRepository			
			&Name.Class 					= ThemeClass:ReadonlyAttribute 
			&FirstName.Class 				= ThemeClass:ReadonlyAttribute
			&LastName.Class 				= ThemeClass:ReadonlyAttribute
			&AuthenticationTypeName.Class 	= ThemeClass:ReadonlyAttribute
		Else			
			&Name.Class 					= ThemeClass:AttributeInactive
			&FirstName.Class 				= ThemeClass:AttributeInactive
			&LastName.Class 				= ThemeClass:AttributeInactive
			&AuthenticationTypeName.Class 	= ThemeClass:AttributeInactive
		EndIf
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	//this code should be inside the For Each used to load the data
	
	//Sample conditions to be added manually:
	//Where <Attribute> like &Search when not &Search.IsEmpty()
	//Where <Attribute> = &FilUserGender when not &FilUserGender.IsEmpty()
	//Where <Attribute> = &FilAutType when not &FilAutType.IsEmpty()
	//Where <Attribute> = &FilRol when not &FilRol.IsEmpty()
	
	&Display = !'<i class="fa fa-search"></i>'
	If (&IsAuthorized_Display)
		&Display.Link = GAMUserEntry.Link(GAMAPiMode.Display, &GUID.Trim())
	Endif
	&Update = !'<i class="fa fa-pen"></i>'
	If &IsAuthorized_Update
		If (not (&GUID.trim() = &Repository.AnonymousUserGUID.Trim() or &User.IsAutoRegisteredUser))
			&Update.Link = GAMUserEntry.Link(GAMAPiMode.Update, &GUID.Trim())
			&Update.Class = !'Attribute'
		Else
			&Update.Link = ""
			&Update.Class = !'Invisible'
		Endif
	EndIf
	&Delete = !'<i class="fa fa-times"></i>'
	If &IsAuthorized_Delete
		If (not (&GUID.Trim() = &Repository.AnonymousUserGUID.Trim() OR &GAMUserIsDeleted))
			&Delete.Link = GAMUserEntry.Link(GAMAPiMode.Delete, &GUID.Trim())
			&Delete.Class = !'Attribute'
		Else
			&Delete.Link = ""
			&Delete.Class = !'Invisible'
		Endif
	EndIf
	&BtnRole = !'<i class="fa fa-cog"></i>'
	If (&IsAuthorized_BtnRole)
		&BtnRole.Link = GAMWWUserRoles.Link(&GUID.Trim())
	Endif
	&BtnPermissions = !'<i class="fa fa-lock"></i>'
	If (&IsAuthorized_BtnPermissions)
		&BtnPermissions.Link = GAMWWUserPermissions.Link(&GUID.Trim(), 0)
	Endif
	&BtnSetPwd = !'<i class="fa fa-key"></i>'
	If &IsAuthorized_BtnSetPwd
		If (not (&GUID.Trim() = &Repository.AnonymousUserGUID.Trim() OR &GAMUserIsAutoRegisteredUser))
			&BtnSetPwd.Link = GAMSetPassword.Link(&GUID.Trim())
			&BtnSetPwd.Class = !'Attribute'
		Else
			&BtnSetPwd.Link = ""
			&BtnSetPwd.Class = !'Invisible'
		Endif
	EndIf
	&BtnUnblockOTPCodes = !'<i class="fas fa-unlock"></i>'
	If (&Repository.IsOneTimePasswordEnabled())
		&BtnUnblockOTPCodes.Class = !'Attribute'
	Else
		&BtnUnblockOTPCodes.Class = !'Invisible'
	Endif
	If (&IsAuthorized_Name)
		&Name.Link = GAMUserEntry.Link(GAMAPiMode.Display, &GUID.Trim())
	Endif
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
		Load
	EndFor
```

### DDO_GridColumnsSelector.OnColumnsChanged (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&ColumnsSelectorXML = DDO_GridColumnsSelector.ColumnsSelectorValues
	&ColumnsSelector.FromJson(&ColumnsSelectorXML)
	SaveColumnsSelectorState(!'GAMWWUsersColumnsSelector', iif(&ColumnsSelectorXML.IsEmpty(), '', &ColumnsSelector.ToXml()))
	Refresh
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### ddo_ManageFilters.OnOptionClicked (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Do Case
		Case ddo_ManageFilters.ActiveEventKey = !'<#Clean#>'
			Do 'CleanFilters'
			Grid.FirstPage()
			Refresh
		Case ddo_ManageFilters.ActiveEventKey = !'<#Save#>'
			Do 'SaveGridState'
			SaveFilterAs.Popup(!'GAMWWUsersFilters', &PgmName + !"GridState")
			&ManageFiltersExecutionStep = 2
			Refresh
		Case ddo_ManageFilters.ActiveEventKey = !'<#Manage#>'
			ManageFilters.Popup(!'GAMWWUsersFilters')
			&ManageFiltersExecutionStep = 2
			Refresh
		Otherwise
			&ManageFiltersXml = GetFilterByName(!'GAMWWUsersFilters', ddo_ManageFilters.ActiveEventKey)
			If &ManageFiltersXml.IsEmpty()
				msg('WWP_FilterNotExist')
			Else
				Do 'CleanFilters'
				SaveGridState.Call(&PgmName + !"GridState",  &ManageFiltersXml)
				&GridState.FromXml(&ManageFiltersXml)
				Do 'LoadRegFiltersState'
				Grid.FirstPage()
				Refresh
			EndIf
	EndCase
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### 'DoInsert' (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	If (&IsAuthorized_Insert)
		GAMUserEntry.Call(GAMAPiMode.Insert, '')
	Else
		msg("WWP_ActionNoLongerAvailable")
		Refresh
	Endif
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### &BtnUnblockOTPCodes.Click (Event)

```genexus
&User.Load(&GUID)	
	If &User.UnblockOTPCodes(&Errors)
		Commit
		Msg("WWP_GAM_UserSuccessfullyUnlockOTPCodes")
	Else
		For &Error in &Errors
			Msg(Format(!"%1 (GAM%2)", &Error.Message, &Error.Code))
		EndFor		
	Endif
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

