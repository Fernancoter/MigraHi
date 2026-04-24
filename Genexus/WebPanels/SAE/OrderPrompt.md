# WebPanel: OrderPrompt

- **Module:** SAE
- **Description:** Select Order
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ConsolidatedNameTitleFilterData | Variable | GX_SDT |  | Consolidated Name Title Filter Data |
| CustomerName1 | Variable | VARCHAR |  | Customer Name1 |
| CustomerName2 | Variable | VARCHAR |  | Customer Name2 |
| CustomerName3 | Variable | VARCHAR |  | Customer Name3 |
| CustomerNameTitleFilterData | Variable | GX_SDT |  | Customer Name Title Filter Data |
| CustomerTitleFilterData | Variable | GX_SDT |  | Customer Title Filter Data |
| ddo_ConsolidatedNameTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Consolidated Name Title Control Id To Replace |
| ddo_CustomerNameTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Customer Name Title Control Id To Replace |
| ddo_CustomerTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Customer Title Control Id To Replace |
| ddo_FTBCustomerTitleControlIdToReplace | Variable | VARCHAR |  | ddo_FTBCustomer Title Control Id To Replace |
| ddo_OrderDateTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Date Title Control Id To Replace |
| ddo_OrderDocTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Doc Title Control Id To Replace |
| ddo_OrderKeyTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Key Title Control Id To Replace |
| ddo_OrderNumParTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Num Par Title Control Id To Replace |
| ddo_OrderPriceTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Price Title Control Id To Replace |
| ddo_OrderPXSTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order PXSTitle Control Id To Replace |
| ddo_OrderQuantityTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Quantity Title Control Id To Replace |
| ddo_OrderShippingTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Shipping Title Control Id To Replace |
| ddo_OrderStatusTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Status Title Control Id To Replace |
| ddo_OrderTotalTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Order Total Title Control Id To Replace |
| ddo_ProductDescTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Product Desc Title Control Id To Replace |
| ddo_ProductTypeTitleControlIdToReplace | Variable | VARCHAR |  | ddo_Product Type Title Control Id To Replace |
| DDO_TitleSettingsIcons | Variable | GX_SDT |  | DDO_Title Settings Icons |
| DynamicFiltersEnabled2 | Variable | Boolean |  | Dynamic Filters Enabled2 |
| DynamicFiltersEnabled3 | Variable | Boolean |  | Dynamic Filters Enabled3 |
| DynamicFiltersIgnoreFirst | Variable | Boolean |  | Dynamic Filters Ignore First |
| DynamicFiltersOperator1 | Variable | NUMERIC |  | Dynamic Filters Operator1 |
| DynamicFiltersOperator2 | Variable | NUMERIC |  | Dynamic Filters Operator2 |
| DynamicFiltersOperator3 | Variable | NUMERIC |  | Dynamic Filters Operator3 |
| DynamicFiltersRemoving | Variable | Boolean |  | Dynamic Filters Removing |
| DynamicFiltersSelector1 | Variable | VARCHAR |  | Dynamic Filters Selector1 |
| DynamicFiltersSelector2 | Variable | VARCHAR |  | Dynamic Filters Selector2 |
| DynamicFiltersSelector3 | Variable | VARCHAR |  | Dynamic Filters Selector3 |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| FTBCustomerTitleFilterData | Variable | GX_SDT |  | FTBCustomer Title Filter Data |
| GridAppliedFilters | Variable | VARCHAR |  | Grid Applied Filters |
| GridCurrentPage | Variable | NUMERIC |  | Grid Current Page |
| GridPageCount | Variable | NUMERIC |  | Grid Page Count |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateDynamicFilter | Variable | GX_SDT |  | Grid State Dynamic Filter |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| HTTPRequest | Variable | GX_USRDEFTYP |  | HTTPRequest |
| InOutOrderDoc | Variable | VARCHAR |  | In Out Order Doc |
| InOutOrderKey | Variable | VARCHAR |  | In Out Order Key |
| InOutOrderNumPar | Variable | NUMERIC |  | In Out Order Num Par |
| InOutProductNumber | Variable | VARCHAR |  | In Out Product Number |
| InProductNumber | Variable | VARCHAR |  | In Product Number |
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| OrderDateTitleFilterData | Variable | GX_SDT |  | Order Date Title Filter Data |
| OrderDocTitleFilterData | Variable | GX_SDT |  | Order Doc Title Filter Data |
| OrderedBy | Variable | NUMERIC |  | Ordered By |
| OrderedDsc | Variable | Boolean |  | Ordered Dsc |
| OrderKey1 | Variable | VARCHAR |  | Order Key1 |
| OrderKey2 | Variable | VARCHAR |  | Order Key2 |
| OrderKey3 | Variable | VARCHAR |  | Order Key3 |
| OrderKeyTitleFilterData | Variable | GX_SDT |  | Order Key Title Filter Data |
| OrderNumParTitleFilterData | Variable | GX_SDT |  | Order Num Par Title Filter Data |
| OrderPriceTitleFilterData | Variable | GX_SDT |  | Order Price Title Filter Data |
| OrderPXSTitleFilterData | Variable | GX_SDT |  | Order PXSTitle Filter Data |
| OrderQuantityTitleFilterData | Variable | GX_SDT |  | Order Quantity Title Filter Data |
| OrderShippingTitleFilterData | Variable | GX_SDT |  | Order Shipping Title Filter Data |
| OrderStatusTitleFilterData | Variable | GX_SDT |  | Order Status Title Filter Data |
| OrderTotalTitleFilterData | Variable | GX_SDT |  | Order Total Title Filter Data |
| PageToGo | Variable | NUMERIC |  | Page To Go |
| ProductDesc1 | Variable | VARCHAR |  | Product Desc1 |
| ProductDesc2 | Variable | VARCHAR |  | Product Desc2 |
| ProductDesc3 | Variable | VARCHAR |  | Product Desc3 |
| ProductDescTitleFilterData | Variable | GX_SDT |  | Product Desc Title Filter Data |
| ProductTypeTitleFilterData | Variable | GX_SDT |  | Product Type Title Filter Data |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| Select | Variable | CHARACTER |  | Select |
| Session | Variable | GX_USRDEFTYP |  | Session |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| Today | Variable | DATE |  | Today |
| Time | Variable | CHARACTER |  | Time |
| Pgmname | Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Start (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Grid.Rows = Page.Rows
	Grid_Empowerer.GridInternalName = Grid.InternalName
	DDO_Grid.GridInternalName = Grid.InternalName
	Form.Caption = 'Select Order'
	If &OrderedBy < 1
		&OrderedBy = 1
		Do 'SetDDOSortedStatus'
	EndIf
	&DDO_TitleSettingsIcons = GetWWPTitleSettingsIcons()
	GridPaginationBar.RowsPerPageSelectedValue = Grid.Rows
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Refresh (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	LoadWWPContext.Call(&WWPContext)
	&GridCurrentPage = Grid.CurrentPage
	&GridPageCount = Grid.PageCount
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

### DDO_Grid.OnOptionClicked (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Do Case
		Case DDO_Grid.ActiveEventKey = !'<#OrderASC#>' OR DDO_Grid.ActiveEventKey = !'<#OrderDSC#>'
			&OrderedBy.FromString(DDO_Grid.SelectedValue_get)
			&OrderedDsc = iif(DDO_Grid.ActiveEventKey = !'<#OrderDSC#>', true, false)
			Do 'SetDDOSortedStatus'
			Grid.FirstPage()
	EndCase
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Grid.Load (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&Select = !'<i class="fas fa-check"></i>'
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Enter (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	&InOutOrderDoc = OrderDoc
	&InOutOrderNumPar = OrderNumPar
	&InOutOrderKey = OrderKey
	Return
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### 'DoCleanFilters' (Event)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */
	Do 'CleanFilters'
	Grid.FirstPage()
	Refresh
	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(InOut:&InOutOrderDoc, InOut:&InOutOrderNumPar, In:&InProductNumber, InOut:&InOutOrderKey);

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

