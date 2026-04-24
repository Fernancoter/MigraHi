# Procedure: BudgetWWExportReport

- **Module:** DB
- **Description:** Budget WWExport Report
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| OrderedBy | Variable | NUMERIC |  | Ordered By |
| OrderedDsc | Variable | Boolean |  | Ordered Dsc |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFCustomer | Variable | VARCHAR |  | TFCustomer |
| TFCustomer_Sel | Variable | VARCHAR |  | TFCustomer_Sel |
| TFCustomerName | Variable | VARCHAR |  | TFCustomer Name |
| TFCustomerName_Sel | Variable | VARCHAR |  | TFCustomer Name_Sel |
| TFCustomerShipping | Variable | VARCHAR |  | TFCustomer Shipping |
| TFCustomerShipping_Sel | Variable | VARCHAR |  | TFCustomer Shipping_Sel |
| TFConsolidatedName | Variable | VARCHAR |  | TFConsolidated Name |
| TFConsolidatedName_Sel | Variable | VARCHAR |  | TFConsolidated Name_Sel |
| TFProductDesc | Variable | VARCHAR |  | TFProduct Desc |
| TFProductDesc_Sel | Variable | VARCHAR |  | TFProduct Desc_Sel |
| TFBudgetYear | Variable | NUMERIC |  | TFBudget Year |
| TFBudgetYear_To | Variable | NUMERIC |  | TFBudget Year_To |
| TFBudgetMonth | Variable | NUMERIC |  | TFBudget Month |
| TFBudgetMonth_To | Variable | NUMERIC |  | TFBudget Month_To |
| TFBudgetReal | Variable | NUMERIC |  | TFBudget Real |
| TFBudgetReal_To | Variable | NUMERIC |  | TFBudget Real_To |
| TFBudgetEstimated | Variable | NUMERIC |  | TFBudget Estimated |
| TFBudgetEstimated_To | Variable | NUMERIC |  | TFBudget Estimated_To |
| TFBudgetOutlook | Variable | NUMERIC |  | TFBudget Outlook |
| TFBudgetOutlook_To | Variable | NUMERIC |  | TFBudget Outlook_To |
| TFBudgetPrice | Variable | NUMERIC |  | TFBudget Price |
| TFBudgetPrice_To | Variable | NUMERIC |  | TFBudget Price_To |
| TFBudgetPriceOutlook | Variable | NUMERIC |  | TFBudget Price Outlook |
| TFBudgetPriceOutlook_To | Variable | NUMERIC |  | TFBudget Price Outlook_To |
| TFBudgetDif | Variable | NUMERIC |  | TFBudget Dif |
| TFBudgetDif_To | Variable | NUMERIC |  | TFBudget Dif_To |
| TFOutlookDif | Variable | NUMERIC |  | TFOutlook Dif |
| TFOutlookDif_To | Variable | NUMERIC |  | TFOutlook Dif_To |
| TFBudgetDifP | Variable | NUMERIC |  | TFBudget Dif P |
| TFBudgetDifP_To | Variable | NUMERIC |  | TFBudget Dif P_To |
| TFOutlookDifP | Variable | NUMERIC |  | TFOutlook Dif P |
| TFOutlookDifP_To | Variable | NUMERIC |  | TFOutlook Dif P_To |
| TFBudgetPrevious | Variable | NUMERIC |  | TFBudget Previous |
| TFBudgetPrevious_To | Variable | NUMERIC |  | TFBudget Previous_To |
| TFBudgetDifPrevious | Variable | NUMERIC |  | TFBudget Dif Previous |
| TFBudgetDifPrevious_To | Variable | NUMERIC |  | TFBudget Dif Previous_To |
| TFBudgetDifPreviousP | Variable | NUMERIC |  | TFBudget Dif Previous P |
| TFBudgetDifPreviousP_To | Variable | NUMERIC |  | TFBudget Dif Previous P_To |
| TFBudgetRealAccumulated | Variable | NUMERIC |  | TFBudget Real Accumulated |
| TFBudgetRealAccumulated_To | Variable | NUMERIC |  | TFBudget Real Accumulated_To |
| TFBudgetEstimatedAccumulated | Variable | NUMERIC |  | TFBudget Estimated Accumulated |
| TFBudgetEstimatedAccumulated_To | Variable | NUMERIC |  | TFBudget Estimated Accumulated_To |
| TFBudgetAccumulatedDif | Variable | NUMERIC |  | TFBudget Accumulated Dif |
| TFBudgetAccumulatedDif_To | Variable | NUMERIC |  | TFBudget Accumulated Dif_To |
| TFBudgetAccumulatedDifP | Variable | NUMERIC |  | TFBudget Accumulated Dif P |
| TFBudgetAccumulatedDifP_To | Variable | NUMERIC |  | TFBudget Accumulated Dif P_To |
| TFBudgetPreviousAccumulated | Variable | NUMERIC |  | TFBudget Previous Accumulated |
| TFBudgetPreviousAccumulated_To | Variable | NUMERIC |  | TFBudget Previous Accumulated_To |
| TFBudgetYear_To_Description | Variable | VARCHAR |  | TFBudget Year_To_Description |
| TFBudgetMonth_To_Description | Variable | VARCHAR |  | TFBudget Month_To_Description |
| TFBudgetReal_To_Description | Variable | VARCHAR |  | TFBudget Real_To_Description |
| TFBudgetEstimated_To_Description | Variable | VARCHAR |  | TFBudget Estimated_To_Description |
| TFBudgetOutlook_To_Description | Variable | VARCHAR |  | TFBudget Outlook_To_Description |
| TFBudgetPrice_To_Description | Variable | VARCHAR |  | TFBudget Price_To_Description |
| TFBudgetPriceOutlook_To_Description | Variable | VARCHAR |  | TFBudget Price Outlook_To_Description |
| TFBudgetDif_To_Description | Variable | VARCHAR |  | TFBudget Dif_To_Description |
| TFOutlookDif_To_Description | Variable | VARCHAR |  | TFOutlook Dif_To_Description |
| TFBudgetDifP_To_Description | Variable | VARCHAR |  | TFBudget Dif P_To_Description |
| TFOutlookDifP_To_Description | Variable | VARCHAR |  | TFOutlook Dif P_To_Description |
| TFBudgetPrevious_To_Description | Variable | VARCHAR |  | TFBudget Previous_To_Description |
| TFBudgetDifPrevious_To_Description | Variable | VARCHAR |  | TFBudget Dif Previous_To_Description |
| TFBudgetDifPreviousP_To_Description | Variable | VARCHAR |  | TFBudget Dif Previous P_To_Description |
| TFBudgetRealAccumulated_To_Description | Variable | VARCHAR |  | TFBudget Real Accumulated_To_Description |
| TFBudgetEstimatedAccumulated_To_Description | Variable | VARCHAR |  | TFBudget Estimated Accumulated_To_Description |
| TFBudgetAccumulatedDif_To_Description | Variable | VARCHAR |  | TFBudget Accumulated Dif_To_Description |
| TFBudgetAccumulatedDifP_To_Description | Variable | VARCHAR |  | TFBudget Accumulated Dif P_To_Description |
| TFBudgetPreviousAccumulated_To_Description | Variable | VARCHAR |  | TFBudget Previous Accumulated_To_Description |
| AddressLine1 | Variable | VARCHAR |  | Address Line1 |
| AddressLine2 | Variable | VARCHAR |  | Address Line2 |
| AddressLine3 | Variable | VARCHAR |  | Address Line3 |
| AppName | Variable | VARCHAR |  | App Name |
| Attribute | Variable | VARCHAR |  | Attribute |
| DateInfo | Variable | VARCHAR |  | Date Info |
| Filter | Variable | VARCHAR |  | Filter |
| Mail | Variable | VARCHAR |  | Mail |
| PageInfo | Variable | VARCHAR |  | Page Info |
| Phone | Variable | VARCHAR |  | Phone |
| Title | Variable | VARCHAR |  | Title |
| Website | Variable | VARCHAR |  | Website |
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

// Exports the contents of a grid (using the selected order and filters) to a PDF file.
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'budgetww_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Budget List"

//Report Template Source
	Header
		&AppName = "DVelop Software Solutions"
		&Phone = !"+1 550 8923"
		&Mail = !"info@mail.com"
		&Website = !"http://www.web.com"
		&AddressLine1 = !"French Boulevard 2859"
		&AddressLine2 = !"Downtown"
		&AddressLine3 = !"Paris, France"
		Print printTitle
	End 
	Footer
		&PageInfo = "Page: " + &Page.ToString().Trim()
		&DateInfo = "Date: " + &Today.ToFormattedString()
		Print printFooter
	End

	Do 'PrintFilters'

	Do 'PrintColumnTitles'

	Do 'PrintData'

	Do 'PrintFooter'

EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'PrintFilters'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	If not &FilterFullText.IsEmpty()
		print printBlockFilterFilterFullText
	EndIf
	If not &TFCustomer_Sel.IsEmpty()
		print printBlockTFCustomer_Sel
	Else
		If not &TFCustomer.IsEmpty()
			print printBlockTFCustomer
		EndIf
	EndIf
	If not &TFCustomerName_Sel.IsEmpty()
		print printBlockTFCustomerName_Sel
	Else
		If not &TFCustomerName.IsEmpty()
			print printBlockTFCustomerName
		EndIf
	EndIf
	If not &TFCustomerShipping_Sel.IsEmpty()
		print printBlockTFCustomerShipping_Sel
	Else
		If not &TFCustomerShipping.IsEmpty()
			print printBlockTFCustomerShipping
		EndIf
	EndIf
	If not &TFConsolidatedName_Sel.IsEmpty()
		print printBlockTFConsolidatedName_Sel
	Else
		If not &TFConsolidatedName.IsEmpty()
			print printBlockTFConsolidatedName
		EndIf
	EndIf
	If not &TFProductDesc_Sel.IsEmpty()
		print printBlockTFProductDesc_Sel
	Else
		If not &TFProductDesc.IsEmpty()
			print printBlockTFProductDesc
		EndIf
	EndIf
	If not (&TFBudgetYear.IsEmpty() AND &TFBudgetYear_To.IsEmpty())
		print printBlockTFBudgetYear
		&TFBudgetYear_To_Description = format('%1 (%2)', "Year", "WWP_TSTo")
		print printBlockTFBudgetYear_To
	EndIf
	If not (&TFBudgetMonth.IsEmpty() AND &TFBudgetMonth_To.IsEmpty())
		print printBlockTFBudgetMonth
		&TFBudgetMonth_To_Description = format('%1 (%2)', "Month", "WWP_TSTo")
		print printBlockTFBudgetMonth_To
	EndIf
	If not (&TFBudgetReal.IsEmpty() AND &TFBudgetReal_To.IsEmpty())
		print printBlockTFBudgetReal
		&TFBudgetReal_To_Description = format('%1 (%2)', "Real", "WWP_TSTo")
		print printBlockTFBudgetReal_To
	EndIf
	If not (&TFBudgetEstimated.IsEmpty() AND &TFBudgetEstimated_To.IsEmpty())
		print printBlockTFBudgetEstimated
		&TFBudgetEstimated_To_Description = format('%1 (%2)', "Estimated", "WWP_TSTo")
		print printBlockTFBudgetEstimated_To
	EndIf
	If not (&TFBudgetOutlook.IsEmpty() AND &TFBudgetOutlook_To.IsEmpty())
		print printBlockTFBudgetOutlook
		&TFBudgetOutlook_To_Description = format('%1 (%2)', "Outlook", "WWP_TSTo")
		print printBlockTFBudgetOutlook_To
	EndIf
	If not (&TFBudgetPrice.IsEmpty() AND &TFBudgetPrice_To.IsEmpty())
		print printBlockTFBudgetPrice
		&TFBudgetPrice_To_Description = format('%1 (%2)', "Price", "WWP_TSTo")
		print printBlockTFBudgetPrice_To
	EndIf
	If not (&TFBudgetPriceOutlook.IsEmpty() AND &TFBudgetPriceOutlook_To.IsEmpty())
		print printBlockTFBudgetPriceOutlook
		&TFBudgetPriceOutlook_To_Description = format('%1 (%2)', "Price Outlook", "WWP_TSTo")
		print printBlockTFBudgetPriceOutlook_To
	EndIf
	If not (&TFBudgetDif.IsEmpty() AND &TFBudgetDif_To.IsEmpty())
		print printBlockTFBudgetDif
		&TFBudgetDif_To_Description = format('%1 (%2)', "Dif", "WWP_TSTo")
		print printBlockTFBudgetDif_To
	EndIf
	If not (&TFOutlookDif.IsEmpty() AND &TFOutlookDif_To.IsEmpty())
		print printBlockTFOutlookDif
		&TFOutlookDif_To_Description = format('%1 (%2)', "Dif", "WWP_TSTo")
		print printBlockTFOutlookDif_To
	EndIf
	If not (&TFBudgetDifP.IsEmpty() AND &TFBudgetDifP_To.IsEmpty())
		print printBlockTFBudgetDifP
		&TFBudgetDifP_To_Description = format('%1 (%2)', "Dif P", "WWP_TSTo")
		print printBlockTFBudgetDifP_To
	EndIf
	If not (&TFOutlookDifP.IsEmpty() AND &TFOutlookDifP_To.IsEmpty())
		print printBlockTFOutlookDifP
		&TFOutlookDifP_To_Description = format('%1 (%2)', "Dif P", "WWP_TSTo")
		print printBlockTFOutlookDifP_To
	EndIf
	If not (&TFBudgetPrevious.IsEmpty() AND &TFBudgetPrevious_To.IsEmpty())
		print printBlockTFBudgetPrevious
		&TFBudgetPrevious_To_Description = format('%1 (%2)', "Previous", "WWP_TSTo")
		print printBlockTFBudgetPrevious_To
	EndIf
	If not (&TFBudgetDifPrevious.IsEmpty() AND &TFBudgetDifPrevious_To.IsEmpty())
		print printBlockTFBudgetDifPrevious
		&TFBudgetDifPrevious_To_Description = format('%1 (%2)', "Dif Previous", "WWP_TSTo")
		print printBlockTFBudgetDifPrevious_To
	EndIf
	If not (&TFBudgetDifPreviousP.IsEmpty() AND &TFBudgetDifPreviousP_To.IsEmpty())
		print printBlockTFBudgetDifPreviousP
		&TFBudgetDifPreviousP_To_Description = format('%1 (%2)', "Previous P", "WWP_TSTo")
		print printBlockTFBudgetDifPreviousP_To
	EndIf
	If not (&TFBudgetRealAccumulated.IsEmpty() AND &TFBudgetRealAccumulated_To.IsEmpty())
		print printBlockTFBudgetRealAccumulated
		&TFBudgetRealAccumulated_To_Description = format('%1 (%2)', "Real Accumulated", "WWP_TSTo")
		print printBlockTFBudgetRealAccumulated_To
	EndIf
	If not (&TFBudgetEstimatedAccumulated.IsEmpty() AND &TFBudgetEstimatedAccumulated_To.IsEmpty())
		print printBlockTFBudgetEstimatedAccumulated
		&TFBudgetEstimatedAccumulated_To_Description = format('%1 (%2)', "Estimated Accumulated", "WWP_TSTo")
		print printBlockTFBudgetEstimatedAccumulated_To
	EndIf
	If not (&TFBudgetAccumulatedDif.IsEmpty() AND &TFBudgetAccumulatedDif_To.IsEmpty())
		print printBlockTFBudgetAccumulatedDif
		&TFBudgetAccumulatedDif_To_Description = format('%1 (%2)', "Accumulated Dif", "WWP_TSTo")
		print printBlockTFBudgetAccumulatedDif_To
	EndIf
	If not (&TFBudgetAccumulatedDifP.IsEmpty() AND &TFBudgetAccumulatedDifP_To.IsEmpty())
		print printBlockTFBudgetAccumulatedDifP
		&TFBudgetAccumulatedDifP_To_Description = format('%1 (%2)', "Dif P", "WWP_TSTo")
		print printBlockTFBudgetAccumulatedDifP_To
	EndIf
	If not (&TFBudgetPreviousAccumulated.IsEmpty() AND &TFBudgetPreviousAccumulated_To.IsEmpty())
		print printBlockTFBudgetPreviousAccumulated
		&TFBudgetPreviousAccumulated_To_Description = format('%1 (%2)', "Previous Accumulated", "WWP_TSTo")
		print printBlockTFBudgetPreviousAccumulated_To
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	print printBlockBeforeGrid
	print printBlockLines_titles

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintData'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	For each Budget
		order Customer  when &OrderedBy = 1 AND &OrderedDsc = False
		order (Customer)  when &OrderedBy = 1 AND &OrderedDsc = True
		order CustomerName  when &OrderedBy = 2 AND &OrderedDsc = False
		order (CustomerName)  when &OrderedBy = 2 AND &OrderedDsc = True
		order CustomerShipping  when &OrderedBy = 3 AND &OrderedDsc = False
		order (CustomerShipping)  when &OrderedBy = 3 AND &OrderedDsc = True
		order ConsolidatedName  when &OrderedBy = 4 AND &OrderedDsc = False
		order (ConsolidatedName)  when &OrderedBy = 4 AND &OrderedDsc = True
		order ProductDesc  when &OrderedBy = 5 AND &OrderedDsc = False
		order (ProductDesc)  when &OrderedBy = 5 AND &OrderedDsc = True
		order BudgetYear  when &OrderedBy = 6 AND &OrderedDsc = False
		order (BudgetYear)  when &OrderedBy = 6 AND &OrderedDsc = True
		order BudgetMonth  when &OrderedBy = 7 AND &OrderedDsc = False
		order (BudgetMonth)  when &OrderedBy = 7 AND &OrderedDsc = True
		order BudgetReal  when &OrderedBy = 8 AND &OrderedDsc = False
		order (BudgetReal)  when &OrderedBy = 8 AND &OrderedDsc = True
		order BudgetEstimated  when &OrderedBy = 9 AND &OrderedDsc = False
		order (BudgetEstimated)  when &OrderedBy = 9 AND &OrderedDsc = True
		order BudgetOutlook  when &OrderedBy = 10 AND &OrderedDsc = False
		order (BudgetOutlook)  when &OrderedBy = 10 AND &OrderedDsc = True
		order BudgetPrice  when &OrderedBy = 11 AND &OrderedDsc = False
		order (BudgetPrice)  when &OrderedBy = 11 AND &OrderedDsc = True
		order BudgetPriceOutlook  when &OrderedBy = 12 AND &OrderedDsc = False
		order (BudgetPriceOutlook)  when &OrderedBy = 12 AND &OrderedDsc = True
		order BudgetDif  when &OrderedBy = 13 AND &OrderedDsc = False
		order (BudgetDif)  when &OrderedBy = 13 AND &OrderedDsc = True
		order OutlookDif  when &OrderedBy = 14 AND &OrderedDsc = False
		order (OutlookDif)  when &OrderedBy = 14 AND &OrderedDsc = True
		order BudgetDifP  when &OrderedBy = 15 AND &OrderedDsc = False
		order (BudgetDifP)  when &OrderedBy = 15 AND &OrderedDsc = True
		order OutlookDifP  when &OrderedBy = 16 AND &OrderedDsc = False
		order (OutlookDifP)  when &OrderedBy = 16 AND &OrderedDsc = True
		order BudgetPrevious  when &OrderedBy = 17 AND &OrderedDsc = False
		order (BudgetPrevious)  when &OrderedBy = 17 AND &OrderedDsc = True
		order BudgetDifPrevious  when &OrderedBy = 18 AND &OrderedDsc = False
		order (BudgetDifPrevious)  when &OrderedBy = 18 AND &OrderedDsc = True
		order BudgetDifPreviousP  when &OrderedBy = 19 AND &OrderedDsc = False
		order (BudgetDifPreviousP)  when &OrderedBy = 19 AND &OrderedDsc = True
		order BudgetRealAccumulated  when &OrderedBy = 20 AND &OrderedDsc = False
		order (BudgetRealAccumulated)  when &OrderedBy = 20 AND &OrderedDsc = True
		order BudgetEstimatedAccumulated  when &OrderedBy = 21 AND &OrderedDsc = False
		order (BudgetEstimatedAccumulated)  when &OrderedBy = 21 AND &OrderedDsc = True
		order BudgetAccumulatedDif  when &OrderedBy = 22 AND &OrderedDsc = False
		order (BudgetAccumulatedDif)  when &OrderedBy = 22 AND &OrderedDsc = True
		order BudgetAccumulatedDifP  when &OrderedBy = 23 AND &OrderedDsc = False
		order (BudgetAccumulatedDifP)  when &OrderedBy = 23 AND &OrderedDsc = True
		order BudgetPreviousAccumulated  when &OrderedBy = 24 AND &OrderedDsc = False
		order (BudgetPreviousAccumulated)  when &OrderedBy = 24 AND &OrderedDsc = True
		
		using BudgetWWDS(&FilterFullText, &TFCustomer, &TFCustomer_Sel, &TFCustomerName, &TFCustomerName_Sel, &TFCustomerShipping
					, &TFCustomerShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFProductDesc, &TFProductDesc_Sel, &TFBudgetYear
					, &TFBudgetYear_To, &TFBudgetMonth, &TFBudgetMonth_To, &TFBudgetReal, &TFBudgetReal_To, &TFBudgetEstimated
					, &TFBudgetEstimated_To, &TFBudgetOutlook, &TFBudgetOutlook_To, &TFBudgetPrice, &TFBudgetPrice_To, &TFBudgetPriceOutlook
					, &TFBudgetPriceOutlook_To, &TFBudgetDif, &TFBudgetDif_To, &TFOutlookDif, &TFOutlookDif_To, &TFBudgetDifP
					, &TFBudgetDifP_To, &TFOutlookDifP, &TFOutlookDifP_To, &TFBudgetPrevious, &TFBudgetPrevious_To, &TFBudgetDifPrevious
					, &TFBudgetDifPrevious_To, &TFBudgetDifPreviousP, &TFBudgetDifPreviousP_To, &TFBudgetRealAccumulated, &TFBudgetRealAccumulated_To, &TFBudgetEstimatedAccumulated
					, &TFBudgetEstimatedAccumulated_To, &TFBudgetAccumulatedDif, &TFBudgetAccumulatedDif_To, &TFBudgetAccumulatedDifP, &TFBudgetAccumulatedDifP_To, &TFBudgetPreviousAccumulated
					, &TFBudgetPreviousAccumulated_To)

		Do 'BeforePrintLine'
		print printBlockLines_data
		Do 'AfterPrintLine'
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.BudgetWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.BudgetWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.BudgetWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMER"
				&TFCustomer.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMER_SEL"
				&TFCustomer_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMERNAME"
				&TFCustomerName.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMERNAME_SEL"
				&TFCustomerName_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMERSHIPPING"
				&TFCustomerShipping.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMERSHIPPING_SEL"
				&TFCustomerShipping_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCONSOLIDATEDNAME"
				&TFConsolidatedName.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCONSOLIDATEDNAME_SEL"
				&TFConsolidatedName_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTDESC"
				&TFProductDesc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTDESC_SEL"
				&TFProductDesc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBUDGETYEAR"
				&TFBudgetYear.FromString(&GridStateFilterValue.Value)
				&TFBudgetYear_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETMONTH"
				&TFBudgetMonth.FromString(&GridStateFilterValue.Value)
				&TFBudgetMonth_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETREAL"
				&TFBudgetReal.FromString(&GridStateFilterValue.Value)
				&TFBudgetReal_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETESTIMATED"
				&TFBudgetEstimated.FromString(&GridStateFilterValue.Value)
				&TFBudgetEstimated_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETOUTLOOK"
				&TFBudgetOutlook.FromString(&GridStateFilterValue.Value)
				&TFBudgetOutlook_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETPRICE"
				&TFBudgetPrice.FromString(&GridStateFilterValue.Value)
				&TFBudgetPrice_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETPRICEOUTLOOK"
				&TFBudgetPriceOutlook.FromString(&GridStateFilterValue.Value)
				&TFBudgetPriceOutlook_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETDIF"
				&TFBudgetDif.FromString(&GridStateFilterValue.Value)
				&TFBudgetDif_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFOUTLOOKDIF"
				&TFOutlookDif.FromString(&GridStateFilterValue.Value)
				&TFOutlookDif_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETDIFP"
				&TFBudgetDifP.FromString(&GridStateFilterValue.Value)
				&TFBudgetDifP_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFOUTLOOKDIFP"
				&TFOutlookDifP.FromString(&GridStateFilterValue.Value)
				&TFOutlookDifP_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETPREVIOUS"
				&TFBudgetPrevious.FromString(&GridStateFilterValue.Value)
				&TFBudgetPrevious_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETDIFPREVIOUS"
				&TFBudgetDifPrevious.FromString(&GridStateFilterValue.Value)
				&TFBudgetDifPrevious_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETDIFPREVIOUSP"
				&TFBudgetDifPreviousP.FromString(&GridStateFilterValue.Value)
				&TFBudgetDifPreviousP_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETREALACCUMULATED"
				&TFBudgetRealAccumulated.FromString(&GridStateFilterValue.Value)
				&TFBudgetRealAccumulated_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETESTIMATEDACCUMULATED"
				&TFBudgetEstimatedAccumulated.FromString(&GridStateFilterValue.Value)
				&TFBudgetEstimatedAccumulated_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETACCUMULATEDDIF"
				&TFBudgetAccumulatedDif.FromString(&GridStateFilterValue.Value)
				&TFBudgetAccumulatedDif_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETACCUMULATEDDIFP"
				&TFBudgetAccumulatedDifP.FromString(&GridStateFilterValue.Value)
				&TFBudgetAccumulatedDifP_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBUDGETPREVIOUSACCUMULATED"
				&TFBudgetPreviousAccumulated.FromString(&GridStateFilterValue.Value)
				&TFBudgetPreviousAccumulated_To.FromString(&GridStateFilterValue.ValueTo)
		EndCase
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'BeforePrintLine'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'AfterPrintLine'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintFooter'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

Output_file("BudgetWWExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

