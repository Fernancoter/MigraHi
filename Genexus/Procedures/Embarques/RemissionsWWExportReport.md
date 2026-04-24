# Procedure: RemissionsWWExportReport

- **Module:** Embarques
- **Description:** Remissions WWExport Report
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
| TotRemissionDoc | Variable | NUMERIC |  | Tot Remission Doc |
| TotValueRemissionDoc | Variable | VARCHAR |  | Tot Value Remission Doc |
| TotRemissionTotal | Variable | NUMERIC |  | Tot Remission Total |
| TotValueRemissionTotal | Variable | VARCHAR |  | Tot Value Remission Total |
| GridCount | Variable | NUMERIC |  | Grid Count |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFRemissionDoc | Variable | VARCHAR |  | TFRemission Doc |
| TFRemissionDoc_Sel | Variable | VARCHAR |  | TFRemission Doc_Sel |
| TFOrderDoc | Variable | VARCHAR |  | TFOrder Doc |
| TFOrderDoc_Sel | Variable | VARCHAR |  | TFOrder Doc_Sel |
| TFOrderNumPar | Variable | NUMERIC |  | TFOrder Num Par |
| TFOrderNumPar_To | Variable | NUMERIC |  | TFOrder Num Par_To |
| TFProductNumber | Variable | VARCHAR |  | TFProduct Number |
| TFProductNumber_Sel | Variable | VARCHAR |  | TFProduct Number_Sel |
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
| TFRemissionEmbarqueGenerado_Sel | Variable | NUMERIC |  | TFRemission Embarque Generado_Sel |
| TFOrderNumPar_To_Description | Variable | VARCHAR |  | TFOrder Num Par_To_Description |
| TFRemissionDate_To_Description | Variable | VARCHAR |  | TFRemission Date_To_Description |
| TFRemissionQuantity_To_Description | Variable | VARCHAR |  | TFRemission Quantity_To_Description |
| TFRemissionPXS_To_Description | Variable | VARCHAR |  | TFRemission PXS_To_Description |
| TFRemissionPrice_To_Description | Variable | VARCHAR |  | TFRemission Price_To_Description |
| TFRemissionTotal_To_Description | Variable | VARCHAR |  | TFRemission Total_To_Description |
| TFRemissionTotalPallets_To_Description | Variable | VARCHAR |  | TFRemission Total Pallets_To_Description |
| FilterTFRemissionEmbarqueGenerado_SelValueDescription | Variable | VARCHAR |  | Filter TFRemission Embarque Generado_Sel Value Description |
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
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'remissionsww_Execute') 
If &IsAuthorized

	WWPBaseObjects.LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Remission List"

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
	If not &TFRemissionDoc_Sel.IsEmpty()
		print printBlockTFRemissionDoc_Sel
	Else
		If not &TFRemissionDoc.IsEmpty()
			print printBlockTFRemissionDoc
		EndIf
	EndIf
	If not &TFOrderDoc_Sel.IsEmpty()
		print printBlockTFOrderDoc_Sel
	Else
		If not &TFOrderDoc.IsEmpty()
			print printBlockTFOrderDoc
		EndIf
	EndIf
	If not (&TFOrderNumPar.IsEmpty() AND &TFOrderNumPar_To.IsEmpty())
		print printBlockTFOrderNumPar
		&TFOrderNumPar_To_Description = format('%1 (%2)', "Consecutivo", "WWP_TSTo")
		print printBlockTFOrderNumPar_To
	EndIf
	If not &TFProductNumber_Sel.IsEmpty()
		print printBlockTFProductNumber_Sel
	Else
		If not &TFProductNumber.IsEmpty()
			print printBlockTFProductNumber
		EndIf
	EndIf
	If not &TFOrderKey_Sel.IsEmpty()
		print printBlockTFOrderKey_Sel
	Else
		If not &TFOrderKey.IsEmpty()
			print printBlockTFOrderKey
		EndIf
	EndIf
	If not &TFProductType_Sel.IsEmpty()
		print printBlockTFProductType_Sel
	Else
		If not &TFProductType.IsEmpty()
			print printBlockTFProductType
		EndIf
	EndIf
	If not &TFProductDesc_Sel.IsEmpty()
		print printBlockTFProductDesc_Sel
	Else
		If not &TFProductDesc.IsEmpty()
			print printBlockTFProductDesc
		EndIf
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
	If not &TFConsolidatedName_Sel.IsEmpty()
		print printBlockTFConsolidatedName_Sel
	Else
		If not &TFConsolidatedName.IsEmpty()
			print printBlockTFConsolidatedName
		EndIf
	EndIf
	If not (&TFRemissionDate.IsEmpty() AND &TFRemissionDate_To.IsEmpty())
		print printBlockTFRemissionDate
		&TFRemissionDate_To_Description = format('%1 (%2)', "Fecha", "WWP_TSTo")
		print printBlockTFRemissionDate_To
	EndIf
	If not (&TFRemissionQuantity.IsEmpty() AND &TFRemissionQuantity_To.IsEmpty())
		print printBlockTFRemissionQuantity
		&TFRemissionQuantity_To_Description = format('%1 (%2)', "Cantidad", "WWP_TSTo")
		print printBlockTFRemissionQuantity_To
	EndIf
	If not (&TFRemissionPXS.IsEmpty() AND &TFRemissionPXS_To.IsEmpty())
		print printBlockTFRemissionPXS
		&TFRemissionPXS_To_Description = format('%1 (%2)', "Millares por Entregar", "WWP_TSTo")
		print printBlockTFRemissionPXS_To
	EndIf
	If not (&TFRemissionPrice.IsEmpty() AND &TFRemissionPrice_To.IsEmpty())
		print printBlockTFRemissionPrice
		&TFRemissionPrice_To_Description = format('%1 (%2)', "Precio", "WWP_TSTo")
		print printBlockTFRemissionPrice_To
	EndIf
	If not (&TFRemissionTotal.IsEmpty() AND &TFRemissionTotal_To.IsEmpty())
		print printBlockTFRemissionTotal
		&TFRemissionTotal_To_Description = format('%1 (%2)', "Total", "WWP_TSTo")
		print printBlockTFRemissionTotal_To
	EndIf
	If not &TFRemissionStatus_Sel.IsEmpty()
		print printBlockTFRemissionStatus_Sel
	Else
		If not &TFRemissionStatus.IsEmpty()
			print printBlockTFRemissionStatus
		EndIf
	EndIf
	If not (&TFRemissionTotalPallets.IsEmpty() AND &TFRemissionTotalPallets_To.IsEmpty())
		print printBlockTFRemissionTotalPallets
		&TFRemissionTotalPallets_To_Description = format('%1 (%2)', "Total Pallets", "WWP_TSTo")
		print printBlockTFRemissionTotalPallets_To
	EndIf
	If not &TFFTBCustomer_Sel.IsEmpty()
		print printBlockTFFTBCustomer_Sel
	Else
		If not &TFFTBCustomer.IsEmpty()
			print printBlockTFFTBCustomer
		EndIf
	EndIf
	If not &TFRemissionEmbarqueGenerado_Sel.IsEmpty()
		Do Case
			Case &TFRemissionEmbarqueGenerado_Sel = 1
				&FilterTFRemissionEmbarqueGenerado_SelValueDescription = "WWP_TSChecked" 
			Case &TFRemissionEmbarqueGenerado_Sel = 2
				&FilterTFRemissionEmbarqueGenerado_SelValueDescription = "WWP_TSUnChecked" 
		EndCase

		print printBlockTFRemissionEmbarqueGenerado_Sel
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

	For each DB.Remission
		order RemissionDate  when &OrderedBy = 1 AND &OrderedDsc = False
		order (RemissionDate)  when &OrderedBy = 1 AND &OrderedDsc = True
		order RemissionDoc  when &OrderedBy = 2 AND &OrderedDsc = False
		order (RemissionDoc)  when &OrderedBy = 2 AND &OrderedDsc = True
		order OrderDoc  when &OrderedBy = 3 AND &OrderedDsc = False
		order (OrderDoc)  when &OrderedBy = 3 AND &OrderedDsc = True
		order OrderNumPar  when &OrderedBy = 4 AND &OrderedDsc = False
		order (OrderNumPar)  when &OrderedBy = 4 AND &OrderedDsc = True
		order ProductNumber  when &OrderedBy = 5 AND &OrderedDsc = False
		order (ProductNumber)  when &OrderedBy = 5 AND &OrderedDsc = True
		order OrderKey  when &OrderedBy = 6 AND &OrderedDsc = False
		order (OrderKey)  when &OrderedBy = 6 AND &OrderedDsc = True
		order ProductType  when &OrderedBy = 7 AND &OrderedDsc = False
		order (ProductType)  when &OrderedBy = 7 AND &OrderedDsc = True
		order ProductDesc  when &OrderedBy = 8 AND &OrderedDsc = False
		order (ProductDesc)  when &OrderedBy = 8 AND &OrderedDsc = True
		order Customer  when &OrderedBy = 9 AND &OrderedDsc = False
		order (Customer)  when &OrderedBy = 9 AND &OrderedDsc = True
		order CustomerName  when &OrderedBy = 10 AND &OrderedDsc = False
		order (CustomerName)  when &OrderedBy = 10 AND &OrderedDsc = True
		order ConsolidatedName  when &OrderedBy = 11 AND &OrderedDsc = False
		order (ConsolidatedName)  when &OrderedBy = 11 AND &OrderedDsc = True
		order RemissionQuantity  when &OrderedBy = 12 AND &OrderedDsc = False
		order (RemissionQuantity)  when &OrderedBy = 12 AND &OrderedDsc = True
		order RemissionPXS  when &OrderedBy = 13 AND &OrderedDsc = False
		order (RemissionPXS)  when &OrderedBy = 13 AND &OrderedDsc = True
		order RemissionPrice  when &OrderedBy = 14 AND &OrderedDsc = False
		order (RemissionPrice)  when &OrderedBy = 14 AND &OrderedDsc = True
		order RemissionTotal  when &OrderedBy = 15 AND &OrderedDsc = False
		order (RemissionTotal)  when &OrderedBy = 15 AND &OrderedDsc = True
		order RemissionStatus  when &OrderedBy = 16 AND &OrderedDsc = False
		order (RemissionStatus)  when &OrderedBy = 16 AND &OrderedDsc = True
		order FTBCustomer  when &OrderedBy = 17 AND &OrderedDsc = False
		order (FTBCustomer)  when &OrderedBy = 17 AND &OrderedDsc = True
		
		using RemissionsWWDS(&FilterFullText, &TFRemissionDoc, &TFRemissionDoc_Sel, &TFOrderDoc, &TFOrderDoc_Sel, &TFOrderNumPar
					, &TFOrderNumPar_To, &TFProductNumber, &TFProductNumber_Sel, &TFOrderKey, &TFOrderKey_Sel, &TFProductType
					, &TFProductType_Sel, &TFProductDesc, &TFProductDesc_Sel, &TFCustomer, &TFCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFRemissionDate, &TFRemissionDate_To, &TFRemissionQuantity
					, &TFRemissionQuantity_To, &TFRemissionPXS, &TFRemissionPXS_To, &TFRemissionPrice, &TFRemissionPrice_To, &TFRemissionTotal
					, &TFRemissionTotal_To, &TFRemissionStatus, &TFRemissionStatus_Sel, &TFRemissionTotalPallets, &TFRemissionTotalPallets_To, &TFFTBCustomer
					, &TFFTBCustomer_Sel, &TFRemissionEmbarqueGenerado_Sel)

		Do 'BeforePrintLine'
		print printBlockLines_data
		&GridCount += 1
		&TotRemissionTotal = RemissionTotal + &TotRemissionTotal
		
		Do 'AfterPrintLine'
	EndFor

	Do 'PrintTotalizers'

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintTotalizers'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TotValueRemissionDoc = "WWP_TotalizerCount" + trim(&GridCount.ToFormattedString())
	&TotValueRemissionTotal = trim(&TotRemissionTotal.ToFormattedString())
	print printBlockLines_Totalizers

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Embarques.RemissionsWWGridState") = !""
		&GridState.FromXml(WWPBaseObjects.LoadGridState.Udp(!"Embarques.RemissionsWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Embarques.RemissionsWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFREMISSIONDOC"
				&TFRemissionDoc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFREMISSIONDOC_SEL"
				&TFRemissionDoc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERDOC"
				&TFOrderDoc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERDOC_SEL"
				&TFOrderDoc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERNUMPAR"
				&TFOrderNumPar.FromString(&GridStateFilterValue.Value)
				&TFOrderNumPar_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRODUCTNUMBER"
				&TFProductNumber.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTNUMBER_SEL"
				&TFProductNumber_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERKEY"
				&TFOrderKey.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERKEY_SEL"
				&TFOrderKey_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTTYPE"
				&TFProductType.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTTYPE_SEL"
				&TFProductType_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTDESC"
				&TFProductDesc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRODUCTDESC_SEL"
				&TFProductDesc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMER"
				&TFCustomer.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMER_SEL"
				&TFCustomer_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMERNAME"
				&TFCustomerName.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCUSTOMERNAME_SEL"
				&TFCustomerName_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCONSOLIDATEDNAME"
				&TFConsolidatedName.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCONSOLIDATEDNAME_SEL"
				&TFConsolidatedName_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFREMISSIONDATE"
				&TFRemissionDate.FromString(&GridStateFilterValue.Value)
				&TFRemissionDate_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFREMISSIONQUANTITY"
				&TFRemissionQuantity.FromString(&GridStateFilterValue.Value)
				&TFRemissionQuantity_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFREMISSIONPXS"
				&TFRemissionPXS.FromString(&GridStateFilterValue.Value)
				&TFRemissionPXS_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFREMISSIONPRICE"
				&TFRemissionPrice.FromString(&GridStateFilterValue.Value)
				&TFRemissionPrice_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFREMISSIONTOTAL"
				&TFRemissionTotal.FromString(&GridStateFilterValue.Value)
				&TFRemissionTotal_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFREMISSIONSTATUS"
				&TFRemissionStatus.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFREMISSIONSTATUS_SEL"
				&TFRemissionStatus_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFREMISSIONTOTALPALLETS"
				&TFRemissionTotalPallets.FromString(&GridStateFilterValue.Value)
				&TFRemissionTotalPallets_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFFTBCUSTOMER"
				&TFFTBCustomer.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFFTBCUSTOMER_SEL"
				&TFFTBCustomer_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFREMISSIONEMBARQUEGENERADO_SEL"
				&TFRemissionEmbarqueGenerado_Sel.FromString(&GridStateFilterValue.Value)
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

Output_file("RemissionsWWExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

