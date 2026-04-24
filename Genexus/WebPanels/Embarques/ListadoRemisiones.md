# WebPanel: ListadoRemisiones

- **Module:** Embarques
- **Description:** Remisiones
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| HTTPRequest | Variable | GX_USRDEFTYP |  | HTTPRequest |
| TrnContext | Variable | GX_SDT |  | Trn Context |
| TrnContextAtt | Variable | GX_SDT |  | Trn Context Att |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| OrderedBy | Variable | NUMERIC |  | Ordered By |
| OrderedDsc | Variable | Boolean |  | Ordered Dsc |
| OrderedByAux | Variable | NUMERIC |  | Ordered By Aux |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| ColumnsSelectorXML | Variable | LONGVARCHAR |  | Columns Selector XML |
| UserCustomValue | Variable | LONGVARCHAR |  | User Custom Value |
| ColumnsSelector | Variable | GX_SDT |  | Columns Selector |
| ColumnsSelectorAux | Variable | GX_SDT |  | Columns Selector Aux |
| Session | Variable | GX_USRDEFTYP |  | Session |
| ManageFiltersData | Variable | GX_SDT |  | Manage Filters Data |
| ManageFiltersXml | Variable | LONGVARCHAR |  | Manage Filters Xml |
| ManageFiltersExecutionStep | Variable | NUMERIC |  | Manage Filters Execution Step |
| TFRemissionEmbarqueGenerado_Sel | Variable | NUMERIC |  | TFRemission Embarque Generado_Sel |
| TFRemissionDoc | Variable | VARCHAR |  | TFRemission Doc |
| TFRemissionDoc_Sel | Variable | VARCHAR |  | TFRemission Doc_Sel |
| TFOrderDoc | Variable | VARCHAR |  | TFOrder Doc |
| TFOrderDoc_Sel | Variable | VARCHAR |  | TFOrder Doc_Sel |
| TFOrderNumPar | Variable | NUMERIC |  | TFOrder Num Par |
| TFOrderNumPar_To | Variable | NUMERIC |  | TFOrder Num Par_To |
| TFOrderKey | Variable | VARCHAR |  | TFOrder Key |
| TFOrderKey_Sel | Variable | VARCHAR |  | TFOrder Key_Sel |
| TFProductType | Variable | VARCHAR |  | TFProduct Type |
| TFProductType_Sel | Variable | VARCHAR |  | TFProduct Type_Sel |
| TFProductDesc | Variable | VARCHAR |  | TFProduct Desc |
| TFProductDesc_Sel | Variable | VARCHAR |  | TFProduct Desc_Sel |
| TFCustomer | Variable | VARCHAR |  | TFCustomer |
| TFCustomer_Sel | Variable | VARCHAR |  | TFCustomer_Sel |
| TFCustomerName | Variable | VARCHAR |  | TFCustomer Name |
| TFCustomerName_Sel | Variable | VARCHAR |  | TFCustomer Name_Sel |
| TFConsolidatedName | Variable | VARCHAR |  | TFConsolidated Name |
| TFConsolidatedName_Sel | Variable | VARCHAR |  | TFConsolidated Name_Sel |
| TFRemissionDate | Variable | DATE |  | TFRemission Date |
| TFRemissionDate_To | Variable | DATE |  | TFRemission Date_To |
| DDO_RemissionDateAuxDate | Variable | DATE |  | DDO_Remission Date Aux Date |
| DDO_RemissionDateAuxDateTo | Variable | DATE |  | DDO_Remission Date Aux Date To |
| DDO_RemissionDateAuxDateText | Variable | VARCHAR |  | DDO_Remission Date Aux Date Text |
| TFRemissionQuantity | Variable | NUMERIC |  | TFRemission Quantity |
| TFRemissionQuantity_To | Variable | NUMERIC |  | TFRemission Quantity_To |
| TFRemissionPXS | Variable | NUMERIC |  | TFRemission PXS |
| TFRemissionPXS_To | Variable | NUMERIC |  | TFRemission PXS_To |
| TFRemissionPrice | Variable | NUMERIC |  | TFRemission Price |
| TFRemissionPrice_To | Variable | NUMERIC |  | TFRemission Price_To |
| TFRemissionTotal | Variable | NUMERIC |  | TFRemission Total |
| TFRemissionTotal_To | Variable | NUMERIC |  | TFRemission Total_To |
| TFRemissionStatus | Variable | CHARACTER |  | TFRemission Status |
| TFRemissionStatus_Sel | Variable | CHARACTER |  | TFRemission Status_Sel |
| TFRemissionTotalPallets | Variable | NUMERIC |  | TFRemission Total Pallets |
| TFRemissionTotalPallets_To | Variable | NUMERIC |  | TFRemission Total Pallets_To |
| TFFTBCustomer | Variable | VARCHAR |  | TFFTBCustomer |
| TFFTBCustomer_Sel | Variable | VARCHAR |  | TFFTBCustomer_Sel |
| DDO_TitleSettingsIcons | Variable | GX_SDT |  | DDO_Title Settings Icons |
| GAMSession | Variable | GX_EXTERNAL_OBJECT |  | GAMSession |
| GAMErrors | Variable | GX_EXTERNAL_OBJECT |  | GAMErrors |
| PageToGo | Variable | NUMERIC |  | Page To Go |
| GridCurrentPage | Variable | NUMERIC |  | Grid Current Page |
| GridPageCount | Variable | NUMERIC |  | Grid Page Count |
| GridAppliedFilters | Variable | VARCHAR |  | Grid Applied Filters |
| GridActions | Variable | NUMERIC |  | Grid Actions |
| IsAuthorized_Display | Variable | Boolean |  | Is Authorized_Display |
| IsAuthorized_Update | Variable | Boolean |  | Is Authorized_Update |
| IsAuthorized_Delete | Variable | Boolean |  | Is Authorized_Delete |
| GenerarEmbarque | Variable | CHARACTER |  | Generar Embarque |
| IsAuthorized_Insert | Variable | Boolean |  | Is Authorized_Insert |
| TFProductNumber | Variable | VARCHAR |  | TFProduct Number |
| TFProductNumber_Sel | Variable | VARCHAR |  | TFProduct Number_Sel |
| TotRemissionDate | Variable | NUMERIC |  | Tot Remission Date |
| TotValueRemissionDate | Variable | VARCHAR |  | Tot Value Remission Date |
| TotRemissionQuantity | Variable | NUMERIC |  | Tot Remission Quantity |
| TotValueRemissionQuantity | Variable | VARCHAR |  | Tot Value Remission Quantity |
| TotRemissionTotal | Variable | NUMERIC |  | Tot Remission Total |
| TotValueRemissionTotal | Variable | VARCHAR |  | Tot Value Remission Total |
| ExcelFilename | Variable | VARCHAR |  | Excel Filename |
| ErrorMessage | Variable | VARCHAR |  | Error Message |
| Update | Variable | CHARACTER |  | Update |
| Delete | Variable | CHARACTER |  | Delete |
| AGExportData | Variable | GX_SDT |  | AGExport Data |
| AGExportDataItem | Variable | GX_SDT |  | AGExport Data Item |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Start (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	TFRemissionDate_RangePicker.Attach(&DDO_RemissionDateAuxDateText.InternalName)
	
	Grid.Rows = Page.Rows
	Grid_Empowerer.GridInternalName = Grid.InternalName
	DDO_GridColumnsSelector.GridInternalName = Grid.InternalName
	If &HTTPRequest.Method = HttpMethod.Get
		Do 'LoadSavedFilters'
	EndIf
	ddo_AGExport.TitleControlIdToReplace = BtnAGExport.InternalName
	&AGExportData = new()
	
	&AGExportDataItem = new()
	&AGExportDataItem.Title = ''
	&AGExportDataItem.Icon = ActionExport.Link()
	&AGExportDataItem.EventKey = !'Export'
	&AGExportDataItem.IsDivider = False
	&AGExportData.Add(&AGExportDataItem)
	
	&AGExportDataItem = new()
	&AGExportDataItem.Title = ''
	&AGExportDataItem.Icon = ActionExportReport.Link()
	&AGExportDataItem.EventKey = !'ExportReport'
	&AGExportDataItem.IsDivider = False
	&AGExportData.Add(&AGExportDataItem)
	
	DDC_Subscriptions.TitleControlIdToReplace = BtnSubscriptions.InternalName
	
	&GAMSession = GAMSession.Get(&GAMErrors)
	DDO_Grid.GridInternalName = Grid.InternalName
	DDO_Grid.GAMOAuthToken = &GAMSession.Token
	Form.Caption = 'Remisiones'
	Do 'PrepareTransaction'
	Do 'LoadGridState'
	If &OrderedBy < 1
		&OrderedBy = 1
		Do 'SetDDOSortedStatus'
	EndIf
	&DDO_TitleSettingsIcons = GetWWPTitleSettingsIcons()
	DDO_GridColumnsSelector.TitleControlIdToReplace = BtnEditColumns.InternalName
	GridPaginationBar.RowsPerPageSelectedValue = Grid.Rows
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
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
	
	If &Session.Get(!'Embarques.ListadoRemisionesColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'Embarques.ListadoRemisionesColumnsSelector')
		&ColumnsSelector.FromXml(&ColumnsSelectorXML)
	Else
		Do 'InitializeColumnsSelector'
	EndIf
	RemissionDate.Visible = &ColumnsSelector.Columns.Item(1).IsVisible
	RemissionEmbarqueGenerado.Visible = &ColumnsSelector.Columns.Item(2).IsVisible
	RemissionDoc.Visible = &ColumnsSelector.Columns.Item(3).IsVisible
	OrderDoc.Visible = &ColumnsSelector.Columns.Item(4).IsVisible
	OrderNumPar.Visible = &ColumnsSelector.Columns.Item(5).IsVisible
	ProductNumber.Visible = &ColumnsSelector.Columns.Item(6).IsVisible
	RemissionQuantity.Visible = &ColumnsSelector.Columns.Item(7).IsVisible
	RemissionTotalPallets.Visible = &ColumnsSelector.Columns.Item(8).IsVisible
	ProductType.Visible = &ColumnsSelector.Columns.Item(9).IsVisible
	ProductDesc.Visible = &ColumnsSelector.Columns.Item(10).IsVisible
	Customer.Visible = &ColumnsSelector.Columns.Item(11).IsVisible
	CustomerName.Visible = &ColumnsSelector.Columns.Item(12).IsVisible
	ConsolidatedName.Visible = &ColumnsSelector.Columns.Item(13).IsVisible
	RemissionPXS.Visible = &ColumnsSelector.Columns.Item(14).IsVisible
	RemissionPrice.Visible = &ColumnsSelector.Columns.Item(15).IsVisible
	RemissionTotal.Visible = &ColumnsSelector.Columns.Item(16).IsVisible
	RemissionStatus.Visible = &ColumnsSelector.Columns.Item(17).IsVisible
	FTBCustomer.Visible = &ColumnsSelector.Columns.Item(18).IsVisible
	Do 'InitializeTotalizers'
	&GridCurrentPage = Grid.CurrentPage
	&GridPageCount = Grid.PageCount
	&GridAppliedFilters = WWPBaseObjects.WWP_GetAppliedFiltersDescription(&Pgmname)
	Do 'CalculateTotalizers'
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

### DDO_Grid.OnOptionClicked (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Do Case
		Case DDO_Grid.ActiveEventKey = !'<#OrderASC#>' OR DDO_Grid.ActiveEventKey = !'<#OrderDSC#>'
			&OrderedBy.FromString(DDO_Grid.SelectedValue_get)
			&OrderedDsc = iif(DDO_Grid.ActiveEventKey = !'<#OrderDSC#>', true, false)
			Do 'SetDDOSortedStatus'
			Grid.FirstPage()
		Case DDO_Grid.ActiveEventKey = !'<#Filter#>'
			Do Case
				Case DDO_Grid.SelectedColumn = !'RemissionDate'
					&TFRemissionDate.FromString(DDO_Grid.FilteredText_get)
					&TFRemissionDate_To.FromString(DDO_Grid.FilteredTextTo_get)
				Case DDO_Grid.SelectedColumn = !'RemissionEmbarqueGenerado'
					&TFRemissionEmbarqueGenerado_Sel.FromString(DDO_Grid.SelectedValue_get)
				Case DDO_Grid.SelectedColumn = !'RemissionDoc'
					&TFRemissionDoc = DDO_Grid.FilteredText_get
					&TFRemissionDoc_Sel = DDO_Grid.SelectedValue_get
				Case DDO_Grid.SelectedColumn = !'OrderDoc'
					&TFOrderDoc = DDO_Grid.FilteredText_get
					&TFOrderDoc_Sel = DDO_Grid.SelectedValue_get
				Case DDO_Grid.SelectedColumn = !'OrderNumPar'
					&TFOrderNumPar.FromString(DDO_Grid.FilteredText_get)
					&TFOrderNumPar_To.FromString(DDO_Grid.FilteredTextTo_get)
				Case DDO_Grid.SelectedColumn = !'ProductNumber'
					&TFProductNumber = DDO_Grid.FilteredText_get
					&TFProductNumber_Sel = DDO_Grid.SelectedValue_get
				Case DDO_Grid.SelectedColumn = !'RemissionQuantity'
					&TFRemissionQuantity.FromString(DDO_Grid.FilteredText_get)
					&TFRemissionQuantity_To.FromString(DDO_Grid.FilteredTextTo_get)
				Case DDO_Grid.SelectedColumn = !'RemissionTotalPallets'
					&TFRemissionTotalPallets.FromString(DDO_Grid.FilteredText_get)
					&TFRemissionTotalPallets_To.FromString(DDO_Grid.FilteredTextTo_get)
				Case DDO_Grid.SelectedColumn = !'ProductType'
					&TFProductType = DDO_Grid.FilteredText_get
					&TFProductType_Sel = DDO_Grid.SelectedValue_get
				Case DDO_Grid.SelectedColumn = !'ProductDesc'
					&TFProductDesc = DDO_Grid.FilteredText_get
					&TFProductDesc_Sel = DDO_Grid.SelectedValue_get
				Case DDO_Grid.SelectedColumn = !'Customer'
					&TFCustomer = DDO_Grid.FilteredText_get
					&TFCustomer_Sel = DDO_Grid.SelectedValue_get
				Case DDO_Grid.SelectedColumn = !'CustomerName'
					&TFCustomerName = DDO_Grid.FilteredText_get
					&TFCustomerName_Sel = DDO_Grid.SelectedValue_get
				Case DDO_Grid.SelectedColumn = !'ConsolidatedName'
					&TFConsolidatedName = DDO_Grid.FilteredText_get
					&TFConsolidatedName_Sel = DDO_Grid.SelectedValue_get
				Case DDO_Grid.SelectedColumn = !'RemissionPXS'
					&TFRemissionPXS.FromString(DDO_Grid.FilteredText_get)
					&TFRemissionPXS_To.FromString(DDO_Grid.FilteredTextTo_get)
				Case DDO_Grid.SelectedColumn = !'RemissionPrice'
					&TFRemissionPrice.FromString(DDO_Grid.FilteredText_get)
					&TFRemissionPrice_To.FromString(DDO_Grid.FilteredTextTo_get)
				Case DDO_Grid.SelectedColumn = !'RemissionTotal'
					&TFRemissionTotal.FromString(DDO_Grid.FilteredText_get)
					&TFRemissionTotal_To.FromString(DDO_Grid.FilteredTextTo_get)
				Case DDO_Grid.SelectedColumn = !'FTBCustomer'
					&TFFTBCustomer = DDO_Grid.FilteredText_get
					&TFFTBCustomer_Sel = DDO_Grid.SelectedValue_get
			EndCase
			Grid.FirstPage()
	EndCase
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Grid.Load (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&Update = !'<i class="fa fa-pen"></i>'
	If (&IsAuthorized_Update)
		&Update.Link = DB.Remission.Link(TrnMode.Update, RemissionDoc, OrderDoc, OrderNumPar, ProductNumber)
	Endif
	&Delete = !'<i class="fa fa-times"></i>'
	If (&IsAuthorized_Delete)
		&Delete.Link = DB.Remission.Link(TrnMode.Delete, RemissionDoc, OrderDoc, OrderNumPar, ProductNumber)
	Endif
	&GenerarEmbarque = "Crear"
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### DDO_GridColumnsSelector.OnColumnsChanged (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&ColumnsSelectorXML = DDO_GridColumnsSelector.ColumnsSelectorValues
	&ColumnsSelector.FromJson(&ColumnsSelectorXML)
	SaveColumnsSelectorState(!'Embarques.ListadoRemisionesColumnsSelector', iif(&ColumnsSelectorXML.IsEmpty(), '', &ColumnsSelector.ToXml()))
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
			SaveFilterAs.Popup(!'Embarques.ListadoRemisionesFilters', &PgmName + !"GridState")
			&ManageFiltersExecutionStep = 2
			Refresh
		Case ddo_ManageFilters.ActiveEventKey = !'<#Manage#>'
			ManageFilters.Popup(!'Embarques.ListadoRemisionesFilters')
			&ManageFiltersExecutionStep = 2
			Refresh
		Otherwise
			&ManageFiltersXml = GetFilterByName(!'Embarques.ListadoRemisionesFilters', ddo_ManageFilters.ActiveEventKey)
			If &ManageFiltersXml.IsEmpty()
				msg('WWP_FilterNotExist')
			Else
				Do 'CleanFilters'
				SaveGridState.Call(&PgmName + !"GridState",  &ManageFiltersXml)
				&GridState.FromXml(&ManageFiltersXml)
				&OrderedBy = &GridState.OrderedBy
				&OrderedDsc = &GridState.OrderedDsc
				Do 'SetDDOSortedStatus' 
				Do 'LoadRegFiltersState'
				Grid.FirstPage()
				Refresh
			EndIf
	EndCase
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### &GenerarEmbarque.Click (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	CrearEmbarque.Call(OrderDoc, RemissionDoc)
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### 'DoInsert' (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	If (&IsAuthorized_Insert)
		DB.Remission.Call(TrnMode.Insert, nullvalue(DB.RemissionDoc), nullvalue(OrderDoc), nullvalue(OrderNumPar), nullvalue(ProductNumber))
	Else
		msg("WWP_ActionNoLongerAvailable")
		Refresh
	Endif
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### ddo_AGExport.OnOptionClicked (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Do Case
		Case ddo_AGExport.ActiveEventKey = !'Export'
			Do 'DoExport'
		Case ddo_AGExport.ActiveEventKey = !'ExportReport'
			Do 'DoExportReport'
	EndCase
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### DDC_Subscriptions.OnLoadComponent (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	WWPAux_WC.Object = WWP_SubscriptionsPanel.Create(!'Remission', WWPBaseObjects.Notifications.WWP_NotificationAppliesTo.AnyRecord, '', '')
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

