# Procedure: FTBWWGetFilterData

- **Module:** DB
- **Description:** FTBWWGet Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFInvoice | Variable | VARCHAR |  | TFInvoice |
| TFInvoice_Sel | Variable | VARCHAR |  | TFInvoice_Sel |
| TFProductNumber | Variable | VARCHAR |  | TFProduct Number |
| TFProductNumber_Sel | Variable | VARCHAR |  | TFProduct Number_Sel |
| TFNumPar | Variable | NUMERIC |  | TFNum Par |
| TFNumPar_To | Variable | NUMERIC |  | TFNum Par_To |
| TFUnit | Variable | VARCHAR |  | TFUnit |
| TFUnit_Sel | Variable | VARCHAR |  | TFUnit_Sel |
| TFSalesPerson | Variable | VARCHAR |  | TFSales Person |
| TFSalesPerson_Sel | Variable | VARCHAR |  | TFSales Person_Sel |
| TFMarketCode | Variable | VARCHAR |  | TFMarket Code |
| TFMarketCode_Sel | Variable | VARCHAR |  | TFMarket Code_Sel |
| TFSubMarketCode | Variable | VARCHAR |  | TFSub Market Code |
| TFSubMarketCode_Sel | Variable | VARCHAR |  | TFSub Market Code_Sel |
| TFFTBCustomer | Variable | VARCHAR |  | TFFTBCustomer |
| TFFTBCustomer_Sel | Variable | VARCHAR |  | TFFTBCustomer_Sel |
| TFCustomerName | Variable | VARCHAR |  | TFCustomer Name |
| TFCustomerName_Sel | Variable | VARCHAR |  | TFCustomer Name_Sel |
| TFConsolidatedName | Variable | VARCHAR |  | TFConsolidated Name |
| TFConsolidatedName_Sel | Variable | VARCHAR |  | TFConsolidated Name_Sel |
| TFFTBCustomerNameShipping | Variable | VARCHAR |  | TFFTBCustomer Name Shipping |
| TFFTBCustomerNameShipping_Sel | Variable | VARCHAR |  | TFFTBCustomer Name Shipping_Sel |
| TFInvoiceDate | Variable | DATE |  | TFInvoice Date |
| TFInvoiceDate_To | Variable | DATE |  | TFInvoice Date_To |
| TFProductType | Variable | VARCHAR |  | TFProduct Type |
| TFProductType_Sel | Variable | VARCHAR |  | TFProduct Type_Sel |
| TFPackaging | Variable | VARCHAR |  | TFPackaging |
| TFPackaging_Sel | Variable | VARCHAR |  | TFPackaging_Sel |
| TFSubProductType | Variable | VARCHAR |  | TFSub Product Type |
| TFSubProductType_Sel | Variable | VARCHAR |  | TFSub Product Type_Sel |
| TFProductCost | Variable | NUMERIC |  | TFProduct Cost |
| TFProductCost_To | Variable | NUMERIC |  | TFProduct Cost_To |
| TFQuantity | Variable | NUMERIC |  | TFQuantity |
| TFQuantity_To | Variable | NUMERIC |  | TFQuantity_To |
| TFLCExtendedPrice | Variable | NUMERIC |  | TFLCExtended Price |
| TFLCExtendedPrice_To | Variable | NUMERIC |  | TFLCExtended Price_To |
| TFLCExtendedCost | Variable | NUMERIC |  | TFLCExtended Cost |
| TFLCExtendedCost_To | Variable | NUMERIC |  | TFLCExtended Cost_To |
| TFCurrency | Variable | VARCHAR |  | TFCurrency |
| TFCurrency_Sel | Variable | VARCHAR |  | TFCurrency_Sel |
| TFFTBShipping | Variable | VARCHAR |  | TFFTBShipping |
| TFFTBShipping_Sel | Variable | VARCHAR |  | TFFTBShipping_Sel |
| TFBudgetCustomer | Variable | VARCHAR |  | TFBudget Customer |
| TFBudgetCustomer_Sel | Variable | VARCHAR |  | TFBudget Customer_Sel |
| TFBudgetConsolidatedName | Variable | VARCHAR |  | TFBudget Consolidated Name |
| TFBudgetConsolidatedName_Sel | Variable | VARCHAR |  | TFBudget Consolidated Name_Sel |
| TFBudgetCustomerName | Variable | VARCHAR |  | TFBudget Customer Name |
| TFBudgetCustomerName_Sel | Variable | VARCHAR |  | TFBudget Customer Name_Sel |
| TFFTBYear | Variable | NUMERIC |  | TFFTBYear |
| TFFTBYear_To | Variable | NUMERIC |  | TFFTBYear_To |
| SearchTxt | Parameter | VARCHAR | in | Search Txt |
| SearchTxtTo | Parameter | VARCHAR | in | Search Txt To |
| DDOName | Parameter | VARCHAR | in | DDOName |
| InsertIndex | Variable | NUMERIC |  | Insert Index |
| Option | Variable | VARCHAR |  | Option |
| Options | Variable | VARCHAR |  | Options |
| OptionsJson | Parameter | LONGVARCHAR | out | Options Json |
| OptionDesc | Variable | VARCHAR |  | Option Desc |
| OptionsDesc | Variable | VARCHAR |  | Options Desc |
| OptionsDescJson | Parameter | LONGVARCHAR | out | Options Desc Json |
| OptionIndexes | Variable | VARCHAR |  | Option Indexes |
| OptionIndexesJson | Parameter | LONGVARCHAR | out | Option Indexes Json |
| count | Variable | NUMERIC |  | count |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| GridStateDynamicFilter | Variable | GX_SDT |  | Grid State Dynamic Filter |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| TFProductDesc | Variable | VARCHAR |  | TFProduct Desc |
| TFProductDesc_Sel | Variable | VARCHAR |  | TFProduct Desc_Sel |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

&Options = new()
&OptionsDesc = new()
&OptionIndexes = new()
LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'
Do Case
	Case &DDOName.ToUpper() = !'DDO_UNIT'
		Do 'LoadUnitOptions'
	Case &DDOName.ToUpper() = !'DDO_SALESPERSON'
		Do 'LoadSalesPersonOptions'
	Case &DDOName.ToUpper() = !'DDO_MARKETCODE'
		Do 'LoadMarketCodeOptions'
	Case &DDOName.ToUpper() = !'DDO_SUBMARKETCODE'
		Do 'LoadSubMarketCodeOptions'
	Case &DDOName.ToUpper() = !'DDO_FTBCUSTOMER'
		Do 'LoadFTBCustomerOptions'
	Case &DDOName.ToUpper() = !'DDO_CUSTOMERNAME'
		Do 'LoadCustomerNameOptions'
	Case &DDOName.ToUpper() = !'DDO_FTBCUSTOMERNAMESHIPPING'
		Do 'LoadFTBCustomerNameShippingOptions'
	Case &DDOName.ToUpper() = !'DDO_CONSOLIDATEDNAME'
		Do 'LoadConsolidatedNameOptions'
	Case &DDOName.ToUpper() = !'DDO_INVOICE'
		Do 'LoadInvoiceOptions'
	Case &DDOName.ToUpper() = !'DDO_PRODUCTNUMBER'
		Do 'LoadProductNumberOptions'
	Case &DDOName.ToUpper() = !'DDO_PRODUCTDESC'
		Do 'LoadProductDescOptions'
	Case &DDOName.ToUpper() = !'DDO_PRODUCTTYPE'
		Do 'LoadProductTypeOptions'
	Case &DDOName.ToUpper() = !'DDO_PACKAGING'
		Do 'LoadPackagingOptions'
	Case &DDOName.ToUpper() = !'DDO_SUBPRODUCTTYPE'
		Do 'LoadSubProductTypeOptions'
	Case &DDOName.ToUpper() = !'DDO_CURRENCY'
		Do 'LoadCurrencyOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.FTBWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.FTBWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.FTBWWGridState"))
	Endif	

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFUNIT"
				&TFUnit.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFUNIT_SEL"
				&TFUnit_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFSALESPERSON"
				&TFSalesPerson.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFSALESPERSON_SEL"
				&TFSalesPerson_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFMARKETCODE"
				&TFMarketCode.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFMARKETCODE_SEL"
				&TFMarketCode_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFSUBMARKETCODE"
				&TFSubMarketCode.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFSUBMARKETCODE_SEL"
				&TFSubMarketCode_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFFTBCUSTOMER"
				&TFFTBCustomer.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFFTBCUSTOMER_SEL"
				&TFFTBCustomer_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMERNAME"
				&TFCustomerName.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMERNAME_SEL"
				&TFCustomerName_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFFTBCUSTOMERNAMESHIPPING"
				&TFFTBCustomerNameShipping.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFFTBCUSTOMERNAMESHIPPING_SEL"
				&TFFTBCustomerNameShipping_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCONSOLIDATEDNAME"
				&TFConsolidatedName.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCONSOLIDATEDNAME_SEL"
				&TFConsolidatedName_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINVOICEDATE"
				&TFInvoiceDate.FromString(&GridStateFilterValue.Value)
				&TFInvoiceDate_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINVOICE"
				&TFInvoice.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINVOICE_SEL"
				&TFInvoice_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTNUMBER"
				&TFProductNumber.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTNUMBER_SEL"
				&TFProductNumber_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTDESC"
				&TFProductDesc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTDESC_SEL"
				&TFProductDesc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTTYPE"
				&TFProductType.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTTYPE_SEL"
				&TFProductType_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPACKAGING"
				&TFPackaging.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPACKAGING_SEL"
				&TFPackaging_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFSUBPRODUCTTYPE"
				&TFSubProductType.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFSUBPRODUCTTYPE_SEL"
				&TFSubProductType_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFQUANTITY"
				&TFQuantity.FromString(&GridStateFilterValue.Value)
				&TFQuantity_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFLCEXTENDEDPRICE"
				&TFLCExtendedPrice.FromString(&GridStateFilterValue.Value)
				&TFLCExtendedPrice_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFLCEXTENDEDCOST"
				&TFLCExtendedCost.FromString(&GridStateFilterValue.Value)
				&TFLCExtendedCost_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCURRENCY"
				&TFCurrency.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCURRENCY_SEL"
				&TFCurrency_Sel.FromString(&GridStateFilterValue.Value)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadUnitOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFUnit = &SearchTxt
	&TFUnit_Sel.SetEmpty()
	For Each FTB
		Order Unit
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order Unit
			&count += 1
		EndFor
		If not Unit.IsEmpty()
			&Option = Unit
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadSalesPersonOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFSalesPerson = &SearchTxt
	&TFSalesPerson_Sel.SetEmpty()
	For Each FTB
		Order SalesPerson
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order SalesPerson
			&count += 1
		EndFor
		If not SalesPerson.IsEmpty()
			&Option = SalesPerson
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadMarketCodeOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFMarketCode = &SearchTxt
	&TFMarketCode_Sel.SetEmpty()
	For Each FTB
		Order MarketCode
		using DB.FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each DB.FTB
			Order MarketCode
			&count += 1
		EndFor
		If not MarketCode.IsEmpty()
			&Option = MarketCode
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadSubMarketCodeOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFSubMarketCode = &SearchTxt
	&TFSubMarketCode_Sel.SetEmpty()
	For Each FTB
		Order SubMarketCode
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order SubMarketCode
			&count += 1
		EndFor
		If not SubMarketCode.IsEmpty()
			&Option = SubMarketCode
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadFTBCustomerOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFFTBCustomer = &SearchTxt
	&TFFTBCustomer_Sel.SetEmpty()
	For Each FTB
		Order FTBCustomer
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each DB.FTB
			Order FTBCustomer
			&count += 1
		EndFor
		If not FTBCustomer.IsEmpty()
			&Option = FTBCustomer
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadCustomerNameOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCustomerName = &SearchTxt
	&TFCustomerName_Sel.SetEmpty()
	For Each FTB
		Order CustomerName
		using DB.FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order CustomerName
			&count += 1
		EndFor
		If not CustomerName.IsEmpty()
			&Option = CustomerName
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadFTBCustomerNameShippingOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFFTBCustomerNameShipping = &SearchTxt
	&TFFTBCustomerNameShipping_Sel.SetEmpty()
	For Each DB.FTB
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		If not FTBCustomerNameShipping.IsEmpty()
			&Option = FTBCustomerNameShipping
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			If &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) = &Option
				&count.FromString(&OptionIndexes.Item(&InsertIndex))
				&count += 1
				&OptionIndexes.Remove(&InsertIndex)
				&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
			Else
				&Options.Add(&Option, &InsertIndex)
				&OptionIndexes.Add(!'1', &InsertIndex)
			EndIf
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadConsolidatedNameOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFConsolidatedName = &SearchTxt
	&TFConsolidatedName_Sel.SetEmpty()
	For Each FTB
		Order ConsolidatedName
		using DB.FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order ConsolidatedName
			&count += 1
		EndFor
		If not ConsolidatedName.IsEmpty()
			&Option = ConsolidatedName
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadInvoiceOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFInvoice = &SearchTxt
	&TFInvoice_Sel.SetEmpty()
	For Each FTB
		Order Invoice
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order Invoice
			&count += 1
		EndFor
		If not Invoice.IsEmpty()
			&Option = Invoice
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadProductNumberOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFProductNumber = &SearchTxt
	&TFProductNumber_Sel.SetEmpty()
	For Each FTB
		Order ProductNumber
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order ProductNumber
			&count += 1
		EndFor
		If not ProductNumber.IsEmpty()
			&Option = WWPBaseObjects.ProductNumber
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadProductDescOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFProductDesc = &SearchTxt
	&TFProductDesc_Sel.SetEmpty()
	For Each FTB
		Order ProductDesc
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order ProductDesc
			&count += 1
		EndFor
		If not ProductDesc.IsEmpty()
			&Option = ProductDesc
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadProductTypeOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFProductType = &SearchTxt
	&TFProductType_Sel.SetEmpty()
	For Each FTB
		Order ProductType
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order WWPBaseObjects.ProductType
			&count += 1
		EndFor
		If not ProductType.IsEmpty()
			&Option = ProductType
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadPackagingOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFPackaging = &SearchTxt
	&TFPackaging_Sel.SetEmpty()
	For Each FTB
		Order Packaging
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order Packaging
			&count += 1
		EndFor
		If not Packaging.IsEmpty()
			&Option = Packaging
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadSubProductTypeOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFSubProductType = &SearchTxt
	&TFSubProductType_Sel.SetEmpty()
	For Each FTB
		Order SubProductType
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each FTB
			Order SubProductType
			&count += 1
		EndFor
		If not SubProductType.IsEmpty()
			&Option = SubProductType
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadCurrencyOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCurrency = &SearchTxt
	&TFCurrency_Sel.SetEmpty()
	For Each FTB
		Order Currency
		using FTBWWDS(&FilterFullText, &TFUnit, &TFUnit_Sel, &TFSalesPerson, &TFSalesPerson_Sel, &TFMarketCode
					, &TFMarketCode_Sel, &TFSubMarketCode, &TFSubMarketCode_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFFTBCustomerNameShipping, &TFFTBCustomerNameShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFInvoiceDate
					, &TFInvoiceDate_To, &TFInvoice, &TFInvoice_Sel, &TFProductNumber, &TFProductNumber_Sel, &TFProductDesc
					, &TFProductDesc_Sel, &TFProductType, &TFProductType_Sel, &TFPackaging, &TFPackaging_Sel, &TFSubProductType
					, &TFSubProductType_Sel, &TFQuantity, &TFQuantity_To, &TFLCExtendedPrice, &TFLCExtendedPrice_To, &TFLCExtendedCost
					, &TFLCExtendedCost_To, &TFCurrency, &TFCurrency_Sel)

		&count = 0
		For Each DB.FTB
			Order Currency
			&count += 1
		EndFor
		If not Currency.IsEmpty()
			&Option = Currency
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(in:&DDOName, in:&SearchTxt, in:&SearchTxtTo, out:&OptionsJson, out:&OptionsDescJson, out:&OptionIndexesJson);

/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

