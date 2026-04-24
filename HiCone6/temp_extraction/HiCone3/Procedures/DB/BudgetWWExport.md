# Procedure: BudgetWWExport

- **Module:** DB
- **Description:** Budget WWExport
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| ExcelDocument | Variable | GX_USRDEFTYP |  | Excel Document |
| Filename | Parameter | VARCHAR | out | Filename |
| ErrorMessage | Parameter | VARCHAR | out | Error Message |
| CellRow | Variable | NUMERIC |  | Cell Row |
| FirstColumn | Variable | NUMERIC |  | First Column |
| Random | Variable | NUMERIC |  | Random |
| OrderedBy | Variable | NUMERIC |  | Ordered By |
| OrderedDsc | Variable | Boolean |  | Ordered Dsc |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| ColumnsSelector | Variable | GX_SDT |  | Columns Selector |
| ColumnsSelectorAux | Variable | GX_SDT |  | Columns Selector Aux |
| ColumnsSelector_Column | Variable | GX_SDT |  | Columns Selector_Column |
| ColumnsSelectorXML | Variable | LONGVARCHAR |  | Columns Selector XML |
| UserCustomValue | Variable | LONGVARCHAR |  | User Custom Value |
| ColumnsToRemove | Variable | NUMERIC |  | Columns To Remove |
| ColumnToRemove | Variable | NUMERIC |  | Column To Remove |
| ColumnName | Variable | VARCHAR |  | Column Name |
| VisibleColumnCount | Variable | NUMERIC |  | Visible Column Count |
| NewColumnVisible | Variable | Boolean |  | New Column Visible |
| ColumnsSelectorXML2 | Variable | LONGVARCHAR |  | Columns Selector XML2 |
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
| i | Variable | NUMERIC |  | i |
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

// Exports the contents of a grid (using the selected order and filters) to an Excel file.
LoadWWPContext.Call(&WWPContext)

Do 'OpenDocument'

&CellRow = 1
&FirstColumn = 1

Do 'LoadGridState'

Do 'WriteFilters'

Do 'WriteColumnTitles'

Do 'WriteData'

Do 'CloseDocument'

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'OpenDocument'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&Random = Random() * 10000
	&Filename = !"BudgetWWExport-" + &Random.ToString().Trim() + !".xlsx"

	&ExcelDocument.Open(&Filename)
	Do 'CheckStatus'
	&ExcelDocument.Clear()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteFilters'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	If not (&FilterFullText.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "WWP_FullTextFilterDescription")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&FilterFullText)
	EndIf
	If not (&TFCustomer_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Código Cliente")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFCustomer_Sel)
	Else
		If not (&TFCustomer.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Código Cliente")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCustomer)
		EndIf
	EndIf
	If not (&TFCustomerName_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Cliente")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCustomerName_Sel)
	Else
		If not (&TFCustomerName.IsEmpty())
			WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Cliente")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFCustomerName)
		EndIf
	EndIf
	If not (&TFCustomerShipping_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Envió")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFCustomerShipping_Sel)
	Else
		If not (&TFCustomerShipping.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Envió")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCustomerShipping)
		EndIf
	EndIf
	If not (&TFConsolidatedName_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Grupo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFConsolidatedName_Sel)
	Else
		If not (&TFConsolidatedName.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Grupo")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFConsolidatedName)
		EndIf
	EndIf
	If not (&TFProductDesc_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Descripción")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFProductDesc_Sel)
	Else
		If not (&TFProductDesc.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Descripción")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFProductDesc)
		EndIf
	EndIf
	If not (&TFBudgetYear.IsEmpty() AND &TFBudgetYear_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Year")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetYear
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetYear_To
	EndIf
	If not (&TFBudgetMonth.IsEmpty() AND &TFBudgetMonth_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Month")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetMonth
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetMonth_To
	EndIf
	If not (&TFBudgetReal.IsEmpty() AND &TFBudgetReal_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Real")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetReal
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetReal_To
	EndIf
	If not (&TFBudgetEstimated.IsEmpty() AND &TFBudgetEstimated_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Estimated")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetEstimated
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetEstimated_To
	EndIf
	If not (&TFBudgetOutlook.IsEmpty() AND &TFBudgetOutlook_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Outlook")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetOutlook
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetOutlook_To
	EndIf
	If not (&TFBudgetPrice.IsEmpty() AND &TFBudgetPrice_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Price")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetPrice
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetPrice_To
	EndIf
	If not (&TFBudgetPriceOutlook.IsEmpty() AND &TFBudgetPriceOutlook_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Price Outlook")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetPriceOutlook
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetPriceOutlook_To
	EndIf
	If not (&TFBudgetDif.IsEmpty() AND &TFBudgetDif_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Dif")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetDif
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetDif_To
	EndIf
	If not (&TFOutlookDif.IsEmpty() AND &TFOutlookDif_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Dif")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFOutlookDif
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFOutlookDif_To
	EndIf
	If not (&TFBudgetDifP.IsEmpty() AND &TFBudgetDifP_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Dif P")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetDifP
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetDifP_To
	EndIf
	If not (&TFOutlookDifP.IsEmpty() AND &TFOutlookDifP_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Dif P")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFOutlookDifP
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFOutlookDifP_To
	EndIf
	If not (&TFBudgetPrevious.IsEmpty() AND &TFBudgetPrevious_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Previous")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetPrevious
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetPrevious_To
	EndIf
	If not (&TFBudgetDifPrevious.IsEmpty() AND &TFBudgetDifPrevious_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Dif Previous")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetDifPrevious
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetDifPrevious_To
	EndIf
	If not (&TFBudgetDifPreviousP.IsEmpty() AND &TFBudgetDifPreviousP_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Previous P")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetDifPreviousP
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetDifPreviousP_To
	EndIf
	If not (&TFBudgetRealAccumulated.IsEmpty() AND &TFBudgetRealAccumulated_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Real Accumulated")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetRealAccumulated
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetRealAccumulated_To
	EndIf
	If not (&TFBudgetEstimatedAccumulated.IsEmpty() AND &TFBudgetEstimatedAccumulated_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Estimated Accumulated")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetEstimatedAccumulated
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetEstimatedAccumulated_To
	EndIf
	If not (&TFBudgetAccumulatedDif.IsEmpty() AND &TFBudgetAccumulatedDif_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Accumulated Dif")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetAccumulatedDif
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetAccumulatedDif_To
	EndIf
	If not (&TFBudgetAccumulatedDifP.IsEmpty() AND &TFBudgetAccumulatedDifP_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Dif P")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetAccumulatedDifP
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetAccumulatedDifP_To
	EndIf
	If not (&TFBudgetPreviousAccumulated.IsEmpty() AND &TFBudgetPreviousAccumulated_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Previous Accumulated")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBudgetPreviousAccumulated
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBudgetPreviousAccumulated_To
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'DB.BudgetWWColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'DB.BudgetWWColumnsSelector')
		&ColumnsSelector.FromXml(&ColumnsSelectorXML)
	Else
		Do 'InitializeColumnsSelector'
	EndIf

	&ColumnsSelector.Columns.Sort(!'Order')
	For &ColumnsSelector_Column in &ColumnsSelector.Columns
		If &ColumnsSelector_Column.IsVisible = True
			&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = GetMessageText(iif(&ColumnsSelector_Column.DisplayName.IsEmpty(), &ColumnsSelector_Column.ColumnName, &ColumnsSelector_Column.DisplayName))
			&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Bold = True
			&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Color = 11
			&VisibleColumnCount += 1
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteData'

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

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'Customer'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(Customer)
					Case &ColumnsSelector_Column.ColumnName = !'CustomerName'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(CustomerName)
					Case &ColumnsSelector_Column.ColumnName = !'CustomerShipping'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(CustomerShipping)
					Case &ColumnsSelector_Column.ColumnName = !'ConsolidatedName'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ConsolidatedName)
					Case &ColumnsSelector_Column.ColumnName = !'ProductDesc'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ProductDesc)
					Case &ColumnsSelector_Column.ColumnName = !'BudgetYear'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetYear
					Case &ColumnsSelector_Column.ColumnName = !'BudgetMonth'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetMonth
					Case &ColumnsSelector_Column.ColumnName = !'BudgetReal'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetReal
					Case &ColumnsSelector_Column.ColumnName = !'BudgetEstimated'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetEstimated
					Case &ColumnsSelector_Column.ColumnName = !'BudgetOutlook'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetOutlook
					Case &ColumnsSelector_Column.ColumnName = !'BudgetPrice'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetPrice
					Case &ColumnsSelector_Column.ColumnName = !'BudgetPriceOutlook'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetPriceOutlook
					Case &ColumnsSelector_Column.ColumnName = !'BudgetDif'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetDif
					Case &ColumnsSelector_Column.ColumnName = !'OutlookDif'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = OutlookDif
					Case &ColumnsSelector_Column.ColumnName = !'BudgetDifP'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetDifP
					Case &ColumnsSelector_Column.ColumnName = !'OutlookDifP'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = OutlookDifP
					Case &ColumnsSelector_Column.ColumnName = !'BudgetPrevious'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetPrevious
					Case &ColumnsSelector_Column.ColumnName = !'BudgetDifPrevious'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetDifPrevious
					Case &ColumnsSelector_Column.ColumnName = !'BudgetDifPreviousP'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetDifPreviousP
					Case &ColumnsSelector_Column.ColumnName = !'BudgetRealAccumulated'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetRealAccumulated
					Case &ColumnsSelector_Column.ColumnName = !'BudgetEstimatedAccumulated'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetEstimatedAccumulated
					Case &ColumnsSelector_Column.ColumnName = !'BudgetAccumulatedDif'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetAccumulatedDif
					Case &ColumnsSelector_Column.ColumnName = !'BudgetAccumulatedDifP'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetAccumulatedDifP
					Case &ColumnsSelector_Column.ColumnName = !'BudgetPreviousAccumulated'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BudgetPreviousAccumulated
				EndCase
				&VisibleColumnCount += 1
			EndIf
		EndFor		
		
		Do 'AfterWriteLine'

	Endfor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'CloseDocument'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&ExcelDocument.Save()
	Do 'CheckStatus'
	&ExcelDocument.Close()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'CheckStatus'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	If (&ExcelDocument.ErrCode <> 0)
		&Filename = ""
		&ErrorMessage = &ExcelDocument.ErrDescription
		&ExcelDocument.Close()
		Return
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'InitializeColumnsSelector'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&ColumnsSelector = new WWPColumnsSelector()
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"Customer", '', !'Código Cliente', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CustomerName", '', !'Cliente', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CustomerShipping", '', !'Envió', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ConsolidatedName", '', !'Grupo', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ProductDesc", '', !'Descripción', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetYear", '', !'Year', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetMonth", '', !'Month', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetReal", '', !'Real', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetEstimated", '', !'Estimated', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetOutlook", '', !'Outlook', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetPrice", '', !'Price', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetPriceOutlook", '', !'Price Outlook', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetDif", '', !'Dif', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"OutlookDif", '', !'Dif', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetDifP", '', !'Dif P', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"OutlookDifP", '', !'Dif P', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetPrevious", '', !'Previous', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetDifPrevious", '', !'Dif Previous', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetDifPreviousP", '', !'Previous P', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetRealAccumulated", '', !'Real Accumulated', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetEstimatedAccumulated", '', !'Estimated Accumulated', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetAccumulatedDif", '', !'Accumulated Dif', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetAccumulatedDifP", '', !'Dif P', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BudgetPreviousAccumulated", '', !'Previous Accumulated', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'DB.BudgetWWColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.BudgetWWGridState") = !""
		&GridState.FromXml(WWPBaseObjects.LoadGridState.Udp(!"DB.BudgetWWGridState"))
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

Sub 'BeforeWriteLine'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'AfterWriteLine'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(out:&Filename, out:&ErrorMessage);

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

