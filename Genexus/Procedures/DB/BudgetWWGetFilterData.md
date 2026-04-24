# Procedure: BudgetWWGetFilterData

- **Module:** DB
- **Description:** Budget WWGet Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
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
	Case &DDOName.ToUpper() = !'DDO_CUSTOMER'
		Do 'LoadCustomerOptions'
	Case &DDOName.ToUpper() = !'DDO_CUSTOMERNAME'
		Do 'LoadCustomerNameOptions'
	Case &DDOName.ToUpper() = !'DDO_CUSTOMERSHIPPING'
		Do 'LoadCustomerShippingOptions'
	Case &DDOName.ToUpper() = !'DDO_CONSOLIDATEDNAME'
		Do 'LoadConsolidatedNameOptions'
	Case &DDOName.ToUpper() = !'DDO_PRODUCTDESC'
		Do 'LoadProductDescOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.BudgetWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.BudgetWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.BudgetWWGridState"))
	Endif	

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

Sub 'LoadCustomerOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCustomer = &SearchTxt
	&TFCustomer_Sel.SetEmpty()
	For Each Budget
		Order Customer
		using DB.BudgetWWDS(&FilterFullText, &TFCustomer, &TFCustomer_Sel, &TFCustomerName, &TFCustomerName_Sel, &TFCustomerShipping
					, &TFCustomerShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFProductDesc, &TFProductDesc_Sel, &TFBudgetYear
					, &TFBudgetYear_To, &TFBudgetMonth, &TFBudgetMonth_To, &TFBudgetReal, &TFBudgetReal_To, &TFBudgetEstimated
					, &TFBudgetEstimated_To, &TFBudgetOutlook, &TFBudgetOutlook_To, &TFBudgetPrice, &TFBudgetPrice_To, &TFBudgetPriceOutlook
					, &TFBudgetPriceOutlook_To, &TFBudgetDif, &TFBudgetDif_To, &TFOutlookDif, &TFOutlookDif_To, &TFBudgetDifP
					, &TFBudgetDifP_To, &TFOutlookDifP, &TFOutlookDifP_To, &TFBudgetPrevious, &TFBudgetPrevious_To, &TFBudgetDifPrevious
					, &TFBudgetDifPrevious_To, &TFBudgetDifPreviousP, &TFBudgetDifPreviousP_To, &TFBudgetRealAccumulated, &TFBudgetRealAccumulated_To, &TFBudgetEstimatedAccumulated
					, &TFBudgetEstimatedAccumulated_To, &TFBudgetAccumulatedDif, &TFBudgetAccumulatedDif_To, &TFBudgetAccumulatedDifP, &TFBudgetAccumulatedDifP_To, &TFBudgetPreviousAccumulated
					, &TFBudgetPreviousAccumulated_To)

		&count = 0
		For Each DB.Budget
			Order Customer
			&count += 1
		EndFor
		If not Customer.IsEmpty()
			&Option = Customer
			
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
	For Each Budget
		Order Customer
		using BudgetWWDS(&FilterFullText, &TFCustomer, &TFCustomer_Sel, &TFCustomerName, &TFCustomerName_Sel, &TFCustomerShipping
					, &TFCustomerShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFProductDesc, &TFProductDesc_Sel, &TFBudgetYear
					, &TFBudgetYear_To, &TFBudgetMonth, &TFBudgetMonth_To, &TFBudgetReal, &TFBudgetReal_To, &TFBudgetEstimated
					, &TFBudgetEstimated_To, &TFBudgetOutlook, &TFBudgetOutlook_To, &TFBudgetPrice, &TFBudgetPrice_To, &TFBudgetPriceOutlook
					, &TFBudgetPriceOutlook_To, &TFBudgetDif, &TFBudgetDif_To, &TFOutlookDif, &TFOutlookDif_To, &TFBudgetDifP
					, &TFBudgetDifP_To, &TFOutlookDifP, &TFOutlookDifP_To, &TFBudgetPrevious, &TFBudgetPrevious_To, &TFBudgetDifPrevious
					, &TFBudgetDifPrevious_To, &TFBudgetDifPreviousP, &TFBudgetDifPreviousP_To, &TFBudgetRealAccumulated, &TFBudgetRealAccumulated_To, &TFBudgetEstimatedAccumulated
					, &TFBudgetEstimatedAccumulated_To, &TFBudgetAccumulatedDif, &TFBudgetAccumulatedDif_To, &TFBudgetAccumulatedDifP, &TFBudgetAccumulatedDifP_To, &TFBudgetPreviousAccumulated
					, &TFBudgetPreviousAccumulated_To)

		&count = 0
		For Each Budget
			Order Customer
			&count += 1
		EndFor
		If not CustomerName.IsEmpty()
			&Option = CustomerName
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			&Options.Add(&Option, &InsertIndex)
			&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadCustomerShippingOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFCustomerShipping = &SearchTxt
	&TFCustomerShipping_Sel.SetEmpty()
	For Each Budget
		Order CustomerShipping
		using BudgetWWDS(&FilterFullText, &TFCustomer, &TFCustomer_Sel, &TFCustomerName, &TFCustomerName_Sel, &TFCustomerShipping
					, &TFCustomerShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFProductDesc, &TFProductDesc_Sel, &TFBudgetYear
					, &TFBudgetYear_To, &TFBudgetMonth, &TFBudgetMonth_To, &TFBudgetReal, &TFBudgetReal_To, &TFBudgetEstimated
					, &TFBudgetEstimated_To, &TFBudgetOutlook, &TFBudgetOutlook_To, &TFBudgetPrice, &TFBudgetPrice_To, &TFBudgetPriceOutlook
					, &TFBudgetPriceOutlook_To, &TFBudgetDif, &TFBudgetDif_To, &TFOutlookDif, &TFOutlookDif_To, &TFBudgetDifP
					, &TFBudgetDifP_To, &TFOutlookDifP, &TFOutlookDifP_To, &TFBudgetPrevious, &TFBudgetPrevious_To, &TFBudgetDifPrevious
					, &TFBudgetDifPrevious_To, &TFBudgetDifPreviousP, &TFBudgetDifPreviousP_To, &TFBudgetRealAccumulated, &TFBudgetRealAccumulated_To, &TFBudgetEstimatedAccumulated
					, &TFBudgetEstimatedAccumulated_To, &TFBudgetAccumulatedDif, &TFBudgetAccumulatedDif_To, &TFBudgetAccumulatedDifP, &TFBudgetAccumulatedDifP_To, &TFBudgetPreviousAccumulated
					, &TFBudgetPreviousAccumulated_To)

		&count = 0
		For Each Budget
			Order CustomerShipping
			&count += 1
		EndFor
		If not CustomerShipping.IsEmpty()
			&Option = CustomerShipping
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
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
	For Each Budget
		Order WWPBaseObjects.Reportes.ConsolidatedName
		using BudgetWWDS(&FilterFullText, &TFCustomer, &TFCustomer_Sel, &TFCustomerName, &TFCustomerName_Sel, &TFCustomerShipping
					, &TFCustomerShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFProductDesc, &TFProductDesc_Sel, &TFBudgetYear
					, &TFBudgetYear_To, &TFBudgetMonth, &TFBudgetMonth_To, &TFBudgetReal, &TFBudgetReal_To, &TFBudgetEstimated
					, &TFBudgetEstimated_To, &TFBudgetOutlook, &TFBudgetOutlook_To, &TFBudgetPrice, &TFBudgetPrice_To, &TFBudgetPriceOutlook
					, &TFBudgetPriceOutlook_To, &TFBudgetDif, &TFBudgetDif_To, &TFOutlookDif, &TFOutlookDif_To, &TFBudgetDifP
					, &TFBudgetDifP_To, &TFOutlookDifP, &TFOutlookDifP_To, &TFBudgetPrevious, &TFBudgetPrevious_To, &TFBudgetDifPrevious
					, &TFBudgetDifPrevious_To, &TFBudgetDifPreviousP, &TFBudgetDifPreviousP_To, &TFBudgetRealAccumulated, &TFBudgetRealAccumulated_To, &TFBudgetEstimatedAccumulated
					, &TFBudgetEstimatedAccumulated_To, &TFBudgetAccumulatedDif, &TFBudgetAccumulatedDif_To, &TFBudgetAccumulatedDifP, &TFBudgetAccumulatedDifP_To, &TFBudgetPreviousAccumulated
					, &TFBudgetPreviousAccumulated_To)

		&count = 0
		For Each Budget
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

Sub 'LoadProductDescOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFProductDesc = &SearchTxt
	&TFProductDesc_Sel.SetEmpty()
	For Each Budget
		Order ProductNumber
		using BudgetWWDS(&FilterFullText, &TFCustomer, &TFCustomer_Sel, &TFCustomerName, &TFCustomerName_Sel, &TFCustomerShipping
					, &TFCustomerShipping_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFProductDesc, &TFProductDesc_Sel, &TFBudgetYear
					, &TFBudgetYear_To, &TFBudgetMonth, &TFBudgetMonth_To, &TFBudgetReal, &TFBudgetReal_To, &TFBudgetEstimated
					, &TFBudgetEstimated_To, &TFBudgetOutlook, &TFBudgetOutlook_To, &TFBudgetPrice, &TFBudgetPrice_To, &TFBudgetPriceOutlook
					, &TFBudgetPriceOutlook_To, &TFBudgetDif, &TFBudgetDif_To, &TFOutlookDif, &TFOutlookDif_To, &TFBudgetDifP
					, &TFBudgetDifP_To, &TFOutlookDifP, &TFOutlookDifP_To, &TFBudgetPrevious, &TFBudgetPrevious_To, &TFBudgetDifPrevious
					, &TFBudgetDifPrevious_To, &TFBudgetDifPreviousP, &TFBudgetDifPreviousP_To, &TFBudgetRealAccumulated, &TFBudgetRealAccumulated_To, &TFBudgetEstimatedAccumulated
					, &TFBudgetEstimatedAccumulated_To, &TFBudgetAccumulatedDif, &TFBudgetAccumulatedDif_To, &TFBudgetAccumulatedDifP, &TFBudgetAccumulatedDifP_To, &TFBudgetPreviousAccumulated
					, &TFBudgetPreviousAccumulated_To)

		&count = 0
		For Each Budget
			Order ProductNumber
			&count += 1
		EndFor
		If not ProductDesc.IsEmpty()
			&Option = ProductDesc
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			&Options.Add(&Option, &InsertIndex)
			&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
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

