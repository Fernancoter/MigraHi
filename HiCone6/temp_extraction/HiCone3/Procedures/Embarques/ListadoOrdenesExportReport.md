# Procedure: ListadoOrdenesExportReport

- **Module:** Embarques
- **Description:** Listado Ordenes Export Report
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
| TotOrderDeliveryDate | Variable | NUMERIC |  | Tot Order Delivery Date |
| TotValueOrderDeliveryDate | Variable | VARCHAR |  | Tot Value Order Delivery Date |
| TotOrderQuantity | Variable | NUMERIC |  | Tot Order Quantity |
| TotValueOrderQuantity | Variable | VARCHAR |  | Tot Value Order Quantity |
| TotOrderTotal | Variable | NUMERIC |  | Tot Order Total |
| TotValueOrderTotal | Variable | VARCHAR |  | Tot Value Order Total |
| GridCount | Variable | NUMERIC |  | Grid Count |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFOrderDate | Variable | DATE |  | TFOrder Date |
| TFOrderDate_To | Variable | DATE |  | TFOrder Date_To |
| TFOrderDeliveryDate | Variable | DATE |  | TFOrder Delivery Date |
| TFOrderDeliveryDate_To | Variable | DATE |  | TFOrder Delivery Date_To |
| TFOrderDoc | Variable | VARCHAR |  | TFOrder Doc |
| TFOrderDoc_Sel | Variable | VARCHAR |  | TFOrder Doc_Sel |
| TFOrderNumPar | Variable | NUMERIC |  | TFOrder Num Par |
| TFOrderNumPar_To | Variable | NUMERIC |  | TFOrder Num Par_To |
| TFProductNumber | Variable | VARCHAR |  | TFProduct Number |
| TFProductNumber_Sel | Variable | VARCHAR |  | TFProduct Number_Sel |
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
| TFOrderKey | Variable | VARCHAR |  | TFOrder Key |
| TFOrderKey_Sel | Variable | VARCHAR |  | TFOrder Key_Sel |
| TFOrderQuantity | Variable | NUMERIC |  | TFOrder Quantity |
| TFOrderQuantity_To | Variable | NUMERIC |  | TFOrder Quantity_To |
| TFOrderPXS | Variable | NUMERIC |  | TFOrder PXS |
| TFOrderPXS_To | Variable | NUMERIC |  | TFOrder PXS_To |
| TFOrderPrice | Variable | NUMERIC |  | TFOrder Price |
| TFOrderPrice_To | Variable | NUMERIC |  | TFOrder Price_To |
| TFOrderTotal | Variable | NUMERIC |  | TFOrder Total |
| TFOrderTotal_To | Variable | NUMERIC |  | TFOrder Total_To |
| TFOrderShipping | Variable | VARCHAR |  | TFOrder Shipping |
| TFOrderShipping_Sel | Variable | VARCHAR |  | TFOrder Shipping_Sel |
| TFFTBCustomer | Variable | VARCHAR |  | TFFTBCustomer |
| TFFTBCustomer_Sel | Variable | VARCHAR |  | TFFTBCustomer_Sel |
| TFOrderDate_To_Description | Variable | VARCHAR |  | TFOrder Date_To_Description |
| TFOrderDeliveryDate_To_Description | Variable | VARCHAR |  | TFOrder Delivery Date_To_Description |
| TFOrderNumPar_To_Description | Variable | VARCHAR |  | TFOrder Num Par_To_Description |
| TFOrderQuantity_To_Description | Variable | VARCHAR |  | TFOrder Quantity_To_Description |
| TFOrderPXS_To_Description | Variable | VARCHAR |  | TFOrder PXS_To_Description |
| TFOrderPrice_To_Description | Variable | VARCHAR |  | TFOrder Price_To_Description |
| TFOrderTotal_To_Description | Variable | VARCHAR |  | TFOrder Total_To_Description |
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
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'listadoordenes_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Order List"

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
	If not (&TFOrderDate.IsEmpty() AND &TFOrderDate_To.IsEmpty())
		print printBlockTFOrderDate
		&TFOrderDate_To_Description = format('%1 (%2)', "Fecha de Elaboración", "WWP_TSTo")
		print printBlockTFOrderDate_To
	EndIf
	If not (&TFOrderDeliveryDate.IsEmpty() AND &TFOrderDeliveryDate_To.IsEmpty())
		print printBlockTFOrderDeliveryDate
		&TFOrderDeliveryDate_To_Description = format('%1 (%2)', "Fecha de Entrega", "WWP_TSTo")
		print printBlockTFOrderDeliveryDate_To
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
	If not &TFOrderKey_Sel.IsEmpty()
		print printBlockTFOrderKey_Sel
	Else
		If not &TFOrderKey.IsEmpty()
			print printBlockTFOrderKey
		EndIf
	EndIf
	If not (&TFOrderQuantity.IsEmpty() AND &TFOrderQuantity_To.IsEmpty())
		print printBlockTFOrderQuantity
		&TFOrderQuantity_To_Description = format('%1 (%2)', "Cantidad", "WWP_TSTo")
		print printBlockTFOrderQuantity_To
	EndIf
	If not (&TFOrderPXS.IsEmpty() AND &TFOrderPXS_To.IsEmpty())
		print printBlockTFOrderPXS
		&TFOrderPXS_To_Description = format('%1 (%2)', "Millares por Entregar", "WWP_TSTo")
		print printBlockTFOrderPXS_To
	EndIf
	If not (&TFOrderPrice.IsEmpty() AND &TFOrderPrice_To.IsEmpty())
		print printBlockTFOrderPrice
		&TFOrderPrice_To_Description = format('%1 (%2)', "Precio", "WWP_TSTo")
		print printBlockTFOrderPrice_To
	EndIf
	If not (&TFOrderTotal.IsEmpty() AND &TFOrderTotal_To.IsEmpty())
		print printBlockTFOrderTotal
		&TFOrderTotal_To_Description = format('%1 (%2)', "Total", "WWP_TSTo")
		print printBlockTFOrderTotal_To
	EndIf
	If not &TFOrderShipping_Sel.IsEmpty()
		print printBlockTFOrderShipping_Sel
	Else
		If not &TFOrderShipping.IsEmpty()
			print printBlockTFOrderShipping
		EndIf
	EndIf
	If not &TFFTBCustomer_Sel.IsEmpty()
		print printBlockTFFTBCustomer_Sel
	Else
		If not &TFFTBCustomer.IsEmpty()
			print printBlockTFFTBCustomer
		EndIf
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

	For each DB.Order
		order OrderKey  when &OrderedBy = 1 AND &OrderedDsc = False
		order (OrderKey)  when &OrderedBy = 1 AND &OrderedDsc = True
		order OrderDate  when &OrderedBy = 2 AND &OrderedDsc = False
		order (OrderDate)  when &OrderedBy = 2 AND &OrderedDsc = True
		order OrderDeliveryDate  when &OrderedBy = 3 AND &OrderedDsc = False
		order (OrderDeliveryDate)  when &OrderedBy = 3 AND &OrderedDsc = True
		order OrderDoc  when &OrderedBy = 4 AND &OrderedDsc = False
		order (OrderDoc)  when &OrderedBy = 4 AND &OrderedDsc = True
		order OrderNumPar  when &OrderedBy = 5 AND &OrderedDsc = False
		order (OrderNumPar)  when &OrderedBy = 5 AND &OrderedDsc = True
		order ProductNumber  when &OrderedBy = 6 AND &OrderedDsc = False
		order (ProductNumber)  when &OrderedBy = 6 AND &OrderedDsc = True
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
		order OrderQuantity  when &OrderedBy = 12 AND &OrderedDsc = False
		order (OrderQuantity)  when &OrderedBy = 12 AND &OrderedDsc = True
		order OrderPXS  when &OrderedBy = 13 AND &OrderedDsc = False
		order (OrderPXS)  when &OrderedBy = 13 AND &OrderedDsc = True
		order OrderPrice  when &OrderedBy = 14 AND &OrderedDsc = False
		order (OrderPrice)  when &OrderedBy = 14 AND &OrderedDsc = True
		order OrderTotal  when &OrderedBy = 15 AND &OrderedDsc = False
		order (OrderTotal)  when &OrderedBy = 15 AND &OrderedDsc = True
		order OrderStatus  when &OrderedBy = 16 AND &OrderedDsc = False
		order (OrderStatus)  when &OrderedBy = 16 AND &OrderedDsc = True
		order OrderShipping  when &OrderedBy = 17 AND &OrderedDsc = False
		order (OrderShipping)  when &OrderedBy = 17 AND &OrderedDsc = True
		order FTBCustomer  when &OrderedBy = 18 AND &OrderedDsc = False
		order (FTBCustomer)  when &OrderedBy = 18 AND &OrderedDsc = True
		
		using ListadoOrdenesDS(&FilterFullText, &TFOrderDate, &TFOrderDate_To, &TFOrderDeliveryDate, &TFOrderDeliveryDate_To, &TFOrderDoc
					, &TFOrderDoc_Sel, &TFOrderNumPar, &TFOrderNumPar_To, &TFProductNumber, &TFProductNumber_Sel, &TFProductType
					, &TFProductType_Sel, &TFProductDesc, &TFProductDesc_Sel, &TFCustomer, &TFCustomer_Sel, &TFCustomerName
					, &TFCustomerName_Sel, &TFConsolidatedName, &TFConsolidatedName_Sel, &TFOrderKey, &TFOrderKey_Sel, &TFOrderQuantity
					, &TFOrderQuantity_To, &TFOrderPXS, &TFOrderPXS_To, &TFOrderPrice, &TFOrderPrice_To, &TFOrderTotal
					, &TFOrderTotal_To, &TFOrderShipping, &TFOrderShipping_Sel, &TFFTBCustomer, &TFFTBCustomer_Sel)

		Do 'BeforePrintLine'
		print printBlockLines_data
		&GridCount += 1
		&TotOrderQuantity = OrderQuantity + &TotOrderQuantity
		&TotOrderTotal = OrderTotal + &TotOrderTotal
		
		Do 'AfterPrintLine'
	EndFor

	Do 'PrintTotalizers'

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintTotalizers'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TotValueOrderDeliveryDate = "WWP_TotalizerCount" + trim(&GridCount.ToFormattedString())
	&TotValueOrderQuantity = trim(&TotOrderQuantity.ToFormattedString())
	&TotValueOrderTotal = trim(&TotOrderTotal.ToFormattedString())
	print printBlockLines_Totalizers

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Embarques.ListadoOrdenesGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Embarques.ListadoOrdenesGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Embarques.ListadoOrdenesGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERDATE"
				&TFOrderDate.FromString(&GridStateFilterValue.Value)
				&TFOrderDate_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDERDELIVERYDATE"
				&TFOrderDeliveryDate.FromString(&GridStateFilterValue.Value)
				&TFOrderDeliveryDate_To.FromString(&GridStateFilterValue.ValueTo)
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
			Case &GridStateFilterValue.Name = !"TFORDERKEY"
				&TFOrderKey.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERKEY_SEL"
				&TFOrderKey_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERQUANTITY"
				&TFOrderQuantity.FromString(&GridStateFilterValue.Value)
				&TFOrderQuantity_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDERPXS"
				&TFOrderPXS.FromString(&GridStateFilterValue.Value)
				&TFOrderPXS_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDERPRICE"
				&TFOrderPrice.FromString(&GridStateFilterValue.Value)
				&TFOrderPrice_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDERTOTAL"
				&TFOrderTotal.FromString(&GridStateFilterValue.Value)
				&TFOrderTotal_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDERSHIPPING"
				&TFOrderShipping.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDERSHIPPING_SEL"
				&TFOrderShipping_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFFTBCUSTOMER"
				&TFFTBCustomer.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFFTBCUSTOMER_SEL"
				&TFFTBCustomer_Sel.FromString(&GridStateFilterValue.Value)
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

Output_file("ListadoOrdenesExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

