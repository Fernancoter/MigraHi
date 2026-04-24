# WebPanel: GAMWWRolePermissions

- **Module:** Root
- **Description:** WWP_GAM_RolePermissions
- **GAM Object:** Yes

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Delete | Variable | CHARACTER |  | Delete |
| AccessType | Variable | CHARACTER |  | Access Type |
| AppId | Variable | NUMERIC |  | App Id |
| Application | Variable | GX_EXTERNAL_OBJECT |  | Application |
| ApplicationFilter | Variable | GX_EXTERNAL_OBJECT |  | Application Filter |
| ApplicationId | Variable | NUMERIC |  | Application Id |
| BtnDlt | Variable | BITMAP |  | Revoke |
| Dsc | Variable | CHARACTER |  | Description |
| Error | Variable | GX_EXTERNAL_OBJECT |  | Error |
| Errors | Variable | GX_EXTERNAL_OBJECT |  | Errors |
| FilName | Variable | CHARACTER |  | Fil Name |
| GAMRole | Variable | GX_EXTERNAL_OBJECT |  | GAMRole |
| GridPageCount | Variable | NUMERIC |  | Grid Page Count |
| Id | Variable | CHARACTER |  | Id |
| Inherited | Variable | Boolean |  | Inherited |
| IsInherited | Variable | CHARACTER |  | Is Inherited |
| isOK | Variable | Boolean |  | is OK |
| Name | Variable | CHARACTER |  | Permission name |
| old_AccessType | Variable | CHARACTER |  | old_Access Type |
| Old_Inherited | Variable | Boolean |  | Old_Inherited |
| PageToGo | Variable | NUMERIC |  | Page To Go |
| pApplicationId | Variable | NUMERIC |  | p Application Id |
| Permission | Variable | GX_EXTERNAL_OBJECT |  | Permission |
| PermissionAccessType | Variable | CHARACTER |  | Permission Access Type |
| PermissionUpd | Variable | GX_EXTERNAL_OBJECT |  | Permission Upd |
| RoleId | Variable | NUMERIC |  | Role Id |
| RolePermissionFilter | Variable | GX_EXTERNAL_OBJECT |  | Role Permission Filter |
| TempBoolean | Variable | Boolean |  | Temp Boolean |
| Permissions | Variable | GX_EXTERNAL_OBJECT |  | Permissions |
| GridPageSize | Variable | NUMERIC |  | Grid Page Size |
| GridRecordCount | Variable | NUMERIC |  | Grid Record Count |
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
| NewColumnVisible | Variable | Boolean |  | New Column Visible |
| ColumnsSelectorXML2 | Variable | LONGVARCHAR |  | Columns Selector XML2 |
| Session | Variable | GX_USRDEFTYP |  | Session |
| ManageFiltersExecutionStep | Variable | NUMERIC |  | Manage Filters Execution Step |
| ManageFiltersXml | Variable | LONGVARCHAR |  | Manage Filters Xml |
| ManageFiltersItems | Variable | GX_SDT |  | Manage Filters Items |
| ManageFiltersItem | Variable | GX_SDT |  | Manage Filters Item |
| ManageFiltersData | Variable | GX_SDT |  | Manage Filters Data |
| ManageFiltersDataItem | Variable | GX_SDT |  | Manage Filters Data Item |
| DDO_TitleSettingsIcons | Variable | GX_SDT |  | DDO_Title Settings Icons |
| GridCurrentPage | Variable | NUMERIC |  | Grid Current Page |
| GridActions | Variable | NUMERIC |  | Grid Actions |
| ColumnsSelectorAux | Variable | GX_SDT |  | Columns Selector Aux |
| GridAppliedFilters | Variable | VARCHAR |  | Grid Applied Filters |
| IsAuthorized_Back | Variable | Boolean |  | Is Authorized_Back |
| IsAuthorized_Insert | Variable | Boolean |  | Is Authorized_Insert |
| Update | Variable | CHARACTER |  | Update |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Start (Event)

```genexus
&ApplicationId.Clear()
	&ApplicationId.AddItem(0,"(Select)")
	For &Application in GAMRepository.GetApplications(&ApplicationFilter, &Errors)
		&ApplicationId.AddItem(&Application.Id, &Application.Name)
	EndFor
	If &ApplicationId.Count = 2
		&ApplicationId = &Application.Id
	Else
		&ApplicationId = &pApplicationId
	EndIf
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Grid.Rows = Page.Rows
	Grid_Empowerer.GridInternalName = Grid.InternalName
	If &HTTPRequest.Method = HttpMethod.Get
		Do 'LoadSavedFilters'
	EndIf
	Form.Caption = 'WWP_GAM_RolePermissions'
	Do 'LoadGridState'
	GridPaginationBar.RowsPerPageSelectedValue = Grid.Rows
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
	&GAMRole.Load(&RoleId)
	Form.Caption = Format("WWP_GAM_PermissionsOfRole" + &GAMRole.Name)
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
	&GridCurrentPage = Grid.CurrentPage
	//&GridPageCount has to be loaded manually
	&GridAppliedFilters = WWP_GetAppliedFiltersDescription(&Pgmname)
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
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
&GridPageSize = Grid.Rows
	&GAMRole.Load(&RoleId)
	&RolePermissionFilter.ApplicationId = &ApplicationId
	&RolePermissionFilter.Name			= !'%' + &FilName
	&RolePermissionFilter.AccessType.FromString(&PermissionAccessType)
	If &IsInherited.IsEmpty()
		&RolePermissionFilter.Inherited.FromString(!'A')
	Else
		&RolePermissionFilter.Inherited.FromString(&IsInherited)
	EndIf
	&GridPageCount = 0
	&GridRecordCount = 0
	If not &ApplicationId.IsEmpty()
		&Permissions = &GAMRole.GetPermissions(&RolePermissionFilter, &Errors)
		If &Permissions.Count > 0
			&GridPageCount = (&Permissions.Count/&GridPageSize) + iif(Mod(&Permissions.Count, &GridPageSize) > 0, 1, 0)
		EndIf
		&GridRecordCount = &Permissions.Count
		For &Permission in &Permissions
			&BtnDlt.FromImage(ActionDelete)
			&Id				= &Permission.GUID
			&Name 			= &Permission.Name
			&Dsc 			= GetMessageText(&Permission.Description)
			&AccessType		= &Permission.Type
			&Inherited		= &Permission.Inherited
			&old_AccessType	= &Permission.Type
			&old_Inherited	= &Permission.Inherited
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	//this code should be inside the For Each used to load the data
	
	//Sample conditions to be added manually:
	//Where <Attribute> = &ApplicationId when not &ApplicationId.IsEmpty()
	//Where <Attribute> like &FilName when not &FilName.IsEmpty()
	//Where <Attribute> = &PermissionAccessType when not &PermissionAccessType.IsEmpty()
	//Where <Attribute> = &IsInherited when not &IsInherited.IsEmpty()
	
	&Update = !'<i class="fa fa-pen"></i>'
	
	&Delete = !'<i class="fa fa-times"></i>'
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
			Grid.Load()
		EndFor
	EndIf
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
			SaveFilterAs.Popup(!'GAMWWRolePermissionsFilters', &PgmName + !"GridState")
			&ManageFiltersExecutionStep = 2
			Refresh
		Case ddo_ManageFilters.ActiveEventKey = !'<#Manage#>'
			ManageFilters.Popup(!'GAMWWRolePermissionsFilters')
			&ManageFiltersExecutionStep = 2
			Refresh
		Otherwise
			&ManageFiltersXml = GetFilterByName(!'GAMWWRolePermissionsFilters', ddo_ManageFilters.ActiveEventKey)
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

### 'DoBack' (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	If (&IsAuthorized_Back)
		GAMWWRoles.Call()
	Else
		msg("WWP_ActionNoLongerAvailable")
		Refresh
	Endif
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### 'DoInsert' (Event)

```genexus
If not &ApplicationId.IsEmpty()
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	If (&IsAuthorized_Insert)
		GAMRolePermissionSelect.Call(&RoleId, &ApplicationId)
	Else
		msg("WWP_ActionNoLongerAvailable")
		Refresh
	Endif
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
  Else
		Msg("WWP_GAM_SelectApplication")
	EndIf
```

### 'DoSave' (Event)

```genexus
&GAMRole.Load(&RoleId)
	For each line
		If &AccessType <> &old_AccessType  or &Inherited <> &old_Inherited
			&PermissionUpd.ApplicationId= &ApplicationId
			&PermissionUpd.GUID		  	= &Id
			&PermissionUpd.Type.FromString(&AccessType)
			&PermissionUpd.Inherited	= &Inherited
			&isOK = &GAMRole.UpdatePermission(&PermissionUpd, &Errors)
			If not &isOK
				For &Error in &Errors
					Msg(Format(!"%1 (GAM%2)", &Error.Message, &Error.Code))
				EndFor
				Exit
			EndIf
		EndIf
	EndFor
	If &isOK
		Commit
		Msg("Changes saved successfully.")
	Else
		For &Error in &Errors
			Msg(Format(!"%1 (GAM%2)", &Error.Message, &Error.Code))
		EndFor
	EndIf
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### 'DocmdExport' (Event)

```genexus
ExportarPermisosPorRol.Call(&RoleId)
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### 'DocmdImport' (Event)

```genexus
wpImportarPermisosPorRol.Call(&RoleId)
	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(in:&RoleId, in:&pApplicationId);

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

