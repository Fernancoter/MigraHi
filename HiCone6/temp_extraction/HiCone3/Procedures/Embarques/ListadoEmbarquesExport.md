# Procedure: ListadoEmbarquesExport

- **Module:** Embarques
- **Description:** Listado Embarques Export
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
| FirstDataCellRow | Variable | NUMERIC |  | First Data Cell Row |
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
| TFEmbarqueCodigo | Variable | VARCHAR |  | TFEmbarque Codigo |
| TFEmbarqueCodigo_Sel | Variable | VARCHAR |  | TFEmbarque Codigo_Sel |
| TFEmbarqueFolioCarga | Variable | VARCHAR |  | TFEmbarque Folio Carga |
| TFEmbarqueFolioCarga_Sel | Variable | VARCHAR |  | TFEmbarque Folio Carga_Sel |
| TFEmbarqueHoraEstimadaInicio | Variable | DATETIME |  | TFEmbarque Hora Estimada Inicio |
| TFEmbarqueHoraEstimadaInicio_To | Variable | DATETIME |  | TFEmbarque Hora Estimada Inicio_To |
| TFEmbarqueFecha | Variable | DATE |  | TFEmbarque Fecha |
| TFEmbarqueFecha_To | Variable | DATE |  | TFEmbarque Fecha_To |
| TFEmbarqueHoraFin | Variable | DATETIME |  | TFEmbarque Hora Fin |
| TFEmbarqueHoraFin_To | Variable | DATETIME |  | TFEmbarque Hora Fin_To |
| TFEmbarqueCliente | Variable | VARCHAR |  | TFEmbarque Cliente |
| TFEmbarqueCliente_Sel | Variable | VARCHAR |  | TFEmbarque Cliente_Sel |
| TFEmbarqueProductoNombre | Variable | VARCHAR |  | TFEmbarque Producto Nombre |
| TFEmbarqueProductoNombre_Sel | Variable | VARCHAR |  | TFEmbarque Producto Nombre_Sel |
| TFEmbarqueDetalleCantidadPallets | Variable | NUMERIC |  | TFEmbarque Detalle Cantidad Pallets |
| TFEmbarqueDetalleCantidadPallets_To | Variable | NUMERIC |  | TFEmbarque Detalle Cantidad Pallets_To |
| TFEmbarqueOrderDoc | Variable | VARCHAR |  | TFEmbarque Order Doc |
| TFEmbarqueOrderDoc_Sel | Variable | VARCHAR |  | TFEmbarque Order Doc_Sel |
| TFEmbarqueRemissionDoc | Variable | VARCHAR |  | TFEmbarque Remission Doc |
| TFEmbarqueRemissionDoc_Sel | Variable | VARCHAR |  | TFEmbarque Remission Doc_Sel |
| TFEmbarqueTransporte | Variable | VARCHAR |  | TFEmbarque Transporte |
| TFEmbarqueTransporte_Sel | Variable | VARCHAR |  | TFEmbarque Transporte_Sel |
| TFEmbarquePlacas | Variable | VARCHAR |  | TFEmbarque Placas |
| TFEmbarquePlacas_Sel | Variable | VARCHAR |  | TFEmbarque Placas_Sel |
| TFEmbarqueConductor | Variable | VARCHAR |  | TFEmbarque Conductor |
| TFEmbarqueConductor_Sel | Variable | VARCHAR |  | TFEmbarque Conductor_Sel |
| TFEmbarqueNoProductos | Variable | NUMERIC |  | TFEmbarque No Productos |
| TFEmbarqueNoProductos_To | Variable | NUMERIC |  | TFEmbarque No Productos_To |
| TFEmbarqueEstatus_SelsJson | Variable | LONGVARCHAR |  | TFEmbarque Estatus_Sels Json |
| TFEmbarqueEstatus_Sels | Variable | VARCHAR |  | TFEmbarque Estatus_Sels |
| TFEmbarqueEstatus_Sel | Variable | VARCHAR |  | TFEmbarque Estatus_Sel |
| TFEmbarqueDetalleConfirmadoPorAdministracion_Sel | Variable | NUMERIC |  | TFEmbarque Detalle Confirmado Por Administracion_Sel |
| i | Variable | NUMERIC |  | i |
| TFEmbarqueOrderDate | Variable | DATE |  | TFEmbarque Order Date |
| TFEmbarqueOrderDate_To | Variable | DATE |  | TFEmbarque Order Date_To |
| TFEmbarqueOrderDeliveryDate | Variable | DATE |  | TFEmbarque Order Delivery Date |
| TFEmbarqueOrderDeliveryDate_To | Variable | DATE |  | TFEmbarque Order Delivery Date_To |
| TFEmbarqueDiffDiasPedido | Variable | NUMERIC |  | TFEmbarque Diff Dias Pedido |
| TFEmbarqueDiffDiasPedido_To | Variable | NUMERIC |  | TFEmbarque Diff Dias Pedido_To |
| TFEmbarqueDiffDiasEntrega | Variable | NUMERIC |  | TFEmbarque Diff Dias Entrega |
| TFEmbarqueDiffDiasEntrega_To | Variable | NUMERIC |  | TFEmbarque Diff Dias Entrega_To |
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
	&Filename = !"ListadoEmbarquesExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFEmbarqueCodigo_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Código Embarque")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueCodigo_Sel)
	Else
		If not (&TFEmbarqueCodigo.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Código Embarque")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFEmbarqueCodigo)
		EndIf
	EndIf
	If not (&TFEmbarqueFolioCarga_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Folio de Carga")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueFolioCarga_Sel)
	Else
		If not (&TFEmbarqueFolioCarga.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Folio de Carga")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueFolioCarga)
		EndIf
	EndIf
	If not (&TFEmbarqueHoraEstimadaInicio.IsEmpty() AND &TFEmbarqueHoraEstimadaInicio_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Hora estimada Inicio")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = &TFEmbarqueHoraEstimadaInicio.ToFormattedString()
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Text = &TFEmbarqueHoraEstimadaInicio_To.ToFormattedString()
	EndIf
	If not (&TFEmbarqueOrderDate.IsEmpty() AND &TFEmbarqueOrderDate_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha Elaboración (Pedido)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFEmbarqueOrderDate
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFEmbarqueOrderDate_To
	EndIf
	If not (&TFEmbarqueOrderDeliveryDate.IsEmpty() AND &TFEmbarqueOrderDeliveryDate_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha Estimada (Entrega)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFEmbarqueOrderDeliveryDate
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFEmbarqueOrderDeliveryDate_To
	EndIf
	If not (&TFEmbarqueDiffDiasPedido.IsEmpty() AND &TFEmbarqueDiffDiasPedido_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Diferencia Dias (Pedido)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFEmbarqueDiffDiasPedido
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFEmbarqueDiffDiasPedido_To
	EndIf
	If not (&TFEmbarqueDiffDiasEntrega.IsEmpty() AND &TFEmbarqueDiffDiasEntrega_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Diferencia Dias (Entrega)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFEmbarqueDiffDiasEntrega
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFEmbarqueDiffDiasEntrega_To
	EndIf
	If not (&TFEmbarqueFecha.IsEmpty() AND &TFEmbarqueFecha_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha de Embarque")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFEmbarqueFecha
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFEmbarqueFecha_To
	EndIf
	If not (&TFEmbarqueHoraFin.IsEmpty() AND &TFEmbarqueHoraFin_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Hora Fin")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = &TFEmbarqueHoraFin.ToFormattedString()
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Text = &TFEmbarqueHoraFin_To.ToFormattedString()
	EndIf
	If not (&TFEmbarqueCliente_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Cliente")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueCliente_Sel)
	Else
		If not (&TFEmbarqueCliente.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Cliente")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueCliente)
		EndIf
	EndIf
	If not (&TFEmbarqueProductoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueProductoNombre_Sel)
	Else
		If not (&TFEmbarqueProductoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueProductoNombre)
		EndIf
	EndIf
	If not (&TFEmbarqueDetalleCantidadPallets.IsEmpty() AND &TFEmbarqueDetalleCantidadPallets_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Cantidad Pallets")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFEmbarqueDetalleCantidadPallets
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFEmbarqueDetalleCantidadPallets_To
	EndIf
	If not (&TFEmbarqueOrderDoc_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Pedido SAE")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueOrderDoc_Sel)
	Else
		If not (&TFEmbarqueOrderDoc.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Pedido SAE")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueOrderDoc)
		EndIf
	EndIf
	If not (&TFEmbarqueRemissionDoc_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Remisión SAE")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueRemissionDoc_Sel)
	Else
		If not (&TFEmbarqueRemissionDoc.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Remisión SAE")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueRemissionDoc)
		EndIf
	EndIf
	If not (&TFEmbarqueTransporte_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Transporte")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueTransporte_Sel)
	Else
		If not (&TFEmbarqueTransporte.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Transporte")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueTransporte)
		EndIf
	EndIf
	If not (&TFEmbarquePlacas_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Placas")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarquePlacas_Sel)
	Else
		If not (&TFEmbarquePlacas.IsEmpty())
			WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Placas")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarquePlacas)
		EndIf
	EndIf
	If not (&TFEmbarqueConductor_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Conductor")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueConductor_Sel)
	Else
		If not (&TFEmbarqueConductor.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Conductor")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFEmbarqueConductor)
		EndIf
	EndIf
	If not (&TFEmbarqueNoProductos.IsEmpty() AND &TFEmbarqueNoProductos_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No. Productos")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFEmbarqueNoProductos
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFEmbarqueNoProductos_To
	EndIf
	If not (&TFEmbarqueEstatus_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Estado actual")
		&i = 1
		For &TFEmbarqueEstatus_Sel in &TFEmbarqueEstatus_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFEmbarqueEstatus_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFEmbarqueDetalleConfirmadoPorAdministracion_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Confirmado")
		Do Case
			Case &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSChecked"
			Case &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel = 2
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSUnChecked"
		EndCase
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'Embarques.ListadoEmbarquesColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'Embarques.ListadoEmbarquesColumnsSelector')
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

	&FirstDataCellRow = &CellRow + 1
	For each DB.EmbarqueDetalle
		order EmbarqueFecha  when &OrderedBy = 1 AND &OrderedDsc = False
		order (EmbarqueFecha)  when &OrderedBy = 1 AND &OrderedDsc = True
		order DB.EmbarqueFolioCarga  when &OrderedBy = 2 AND &OrderedDsc = False
		order (EmbarqueFolioCarga)  when &OrderedBy = 2 AND &OrderedDsc = True
		order EmbarqueHoraEstimadaInicio  when &OrderedBy = 3 AND &OrderedDsc = False
		order (EmbarqueHoraEstimadaInicio)  when &OrderedBy = 3 AND &OrderedDsc = True
		order EmbarqueOrderDate  when &OrderedBy = 4 AND &OrderedDsc = False
		order (EmbarqueOrderDate)  when &OrderedBy = 4 AND &OrderedDsc = True
		order EmbarqueOrderDeliveryDate  when &OrderedBy = 5 AND &OrderedDsc = False
		order (EmbarqueOrderDeliveryDate)  when &OrderedBy = 5 AND &OrderedDsc = True
		order EmbarqueHoraFin  when &OrderedBy = 6 AND &OrderedDsc = False
		order (EmbarqueHoraFin)  when &OrderedBy = 6 AND &OrderedDsc = True
		order EmbarqueCliente  when &OrderedBy = 7 AND &OrderedDsc = False
		order (EmbarqueCliente)  when &OrderedBy = 7 AND &OrderedDsc = True
		order EmbarqueProductoNombre  when &OrderedBy = 8 AND &OrderedDsc = False
		order (EmbarqueProductoNombre)  when &OrderedBy = 8 AND &OrderedDsc = True
		order EmbarqueDetalleCantidadPallets  when &OrderedBy = 9 AND &OrderedDsc = False
		order (EmbarqueDetalleCantidadPallets)  when &OrderedBy = 9 AND &OrderedDsc = True
		order EmbarqueOrderDoc  when &OrderedBy = 10 AND &OrderedDsc = False
		order (EmbarqueOrderDoc)  when &OrderedBy = 10 AND &OrderedDsc = True
		order EmbarqueRemissionDoc  when &OrderedBy = 11 AND &OrderedDsc = False
		order (EmbarqueRemissionDoc)  when &OrderedBy = 11 AND &OrderedDsc = True
		order EmbarqueTransporte  when &OrderedBy = 12 AND &OrderedDsc = False
		order (EmbarqueTransporte)  when &OrderedBy = 12 AND &OrderedDsc = True
		order EmbarquePlacas  when &OrderedBy = 13 AND &OrderedDsc = False
		order (EmbarquePlacas)  when &OrderedBy = 13 AND &OrderedDsc = True
		order EmbarqueConductor  when &OrderedBy = 14 AND &OrderedDsc = False
		order (EmbarqueConductor)  when &OrderedBy = 14 AND &OrderedDsc = True
		order EmbarqueNoProductos  when &OrderedBy = 15 AND &OrderedDsc = False
		order (EmbarqueNoProductos)  when &OrderedBy = 15 AND &OrderedDsc = True
		order EmbarqueEstatus  when &OrderedBy = 16 AND &OrderedDsc = False
		order (EmbarqueEstatus)  when &OrderedBy = 16 AND &OrderedDsc = True
		order EmbarqueDetalleConfirmadoPorAdministracion  when &OrderedBy = 17 AND &OrderedDsc = False
		order (EmbarqueDetalleConfirmadoPorAdministracion)  when &OrderedBy = 17 AND &OrderedDsc = True
		
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueCodigo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(EmbarqueCodigo)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueFolioCarga'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(EmbarqueFolioCarga)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueHoraEstimadaInicio'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = EmbarqueHoraEstimadaInicio.ToFormattedString()
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueOrderDate'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = EmbarqueOrderDate
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueOrderDeliveryDate'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = EmbarqueOrderDeliveryDate
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueDiffDiasPedido'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = EmbarqueDiffDiasPedido
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueDiffDiasEntrega'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = EmbarqueDiffDiasEntrega
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueFecha'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = EmbarqueFecha
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueHoraFin'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = EmbarqueHoraFin.ToFormattedString()
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueCliente'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(EmbarqueCliente)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueProductoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(EmbarqueProductoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueDetalleCantidadPallets'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = EmbarqueDetalleCantidadPallets
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueOrderDoc'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(DB.EmbarqueOrderDoc)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueRemissionDoc'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(EmbarqueRemissionDoc)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueTransporte'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(EmbarqueTransporte)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarquePlacas'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(EmbarquePlacas)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueConductor'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(EmbarqueConductor)
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueNoProductos'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = EmbarqueNoProductos
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueEstatus'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = EmbarqueEstatus.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'EmbarqueDetalleConfirmadoPorAdministracion'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = EmbarqueDetalleConfirmadoPorAdministracion.ToString()
				EndCase
				&VisibleColumnCount += 1
			EndIf
		EndFor		
		
		Do 'AfterWriteLine'

	Endfor
	Do 'WriteTotalizers'

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteTotalizers'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	For &ColumnsSelector_Column in &ColumnsSelector.Columns
		If &ColumnsSelector_Column.IsVisible = True
			Do Case
				Case &ColumnsSelector_Column.ColumnName = !'EmbarqueCodigo'
					&ExcelDocument.Cells(&CellRow + 1, &FirstColumn + &VisibleColumnCount).Number = &CellRow + 1 - &FirstDataCellRow
				Case &ColumnsSelector_Column.ColumnName = !'EmbarqueDetalleCantidadPallets'
					&ExcelDocument.Cells(&CellRow + 1, &FirstColumn + &VisibleColumnCount).Text = format(!"=SUM(%1%2:%1%3)", CHR(ASC(!'A') + &VisibleColumnCount), &FirstDataCellRow.ToString().Trim(), &CellRow.ToString().Trim())
			EndCase
			&VisibleColumnCount += 1
		EndIf
	EndFor
	&ExcelDocument.Cells(&CellRow + 1, &FirstColumn, 1, &VisibleColumnCount).Italic = True
	&ExcelDocument.Cells(&CellRow + 1, &FirstColumn, 1, &VisibleColumnCount).Bold = True

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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueCodigo", '', !'Código Embarque', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueFolioCarga", '', !'Folio de Carga', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueHoraEstimadaInicio", '', !'Hora estimada Inicio', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueOrderDate", '', !'Fecha Elaboración (Pedido)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueOrderDeliveryDate", '', !'Fecha Estimada (Entrega)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueDiffDiasPedido", '', !'Diferencia Dias (Pedido)', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueDiffDiasEntrega", '', !'Diferencia Dias (Entrega)', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueFecha", '', !'Fecha de Embarque', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueHoraFin", '', !'Hora Fin', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueCliente", '', !'Cliente', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueProductoNombre", '', !'Producto Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueDetalleCantidadPallets", '', !'Cantidad Pallets', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueOrderDoc", '', !'Pedido SAE', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueRemissionDoc", '', !'Remisión SAE', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueTransporte", '', !'Transporte', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarquePlacas", '', !'Placas', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueConductor", '', !'Conductor', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueNoProductos", '', !'No. Productos', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueEstatus", '', !'Estado actual', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"EmbarqueDetalleConfirmadoPorAdministracion", '', !'Confirmado', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'Embarques.ListadoEmbarquesColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Embarques.ListadoEmbarquesGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Embarques.ListadoEmbarquesGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Embarques.ListadoEmbarquesGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECODIGO"
				&TFEmbarqueCodigo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECODIGO_SEL"
				&TFEmbarqueCodigo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFOLIOCARGA"
				&TFEmbarqueFolioCarga.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFOLIOCARGA_SEL"
				&TFEmbarqueFolioCarga_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEHORAESTIMADAINICIO"
				&TFEmbarqueHoraEstimadaInicio.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueHoraEstimadaInicio_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEORDERDATE"
				&TFEmbarqueOrderDate.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueOrderDate_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEORDERDELIVERYDATE"
				&TFEmbarqueOrderDeliveryDate.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueOrderDeliveryDate_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEDIFFDIASPEDIDO"
				&TFEmbarqueDiffDiasPedido.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueDiffDiasPedido_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEDIFFDIASENTREGA"
				&TFEmbarqueDiffDiasEntrega.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueDiffDiasEntrega_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFECHA"
				&TFEmbarqueFecha.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEHORAFIN"
				&TFEmbarqueHoraFin.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueHoraFin_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECLIENTE"
				&TFEmbarqueCliente.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECLIENTE_SEL"
				&TFEmbarqueCliente_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEPRODUCTONOMBRE"
				&TFEmbarqueProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEPRODUCTONOMBRE_SEL"
				&TFEmbarqueProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEDETALLECANTIDADPALLETS"
				&TFEmbarqueDetalleCantidadPallets.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueDetalleCantidadPallets_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEORDERDOC"
				&TFEmbarqueOrderDoc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEORDERDOC_SEL"
				&TFEmbarqueOrderDoc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEREMISSIONDOC"
				&TFEmbarqueRemissionDoc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEREMISSIONDOC_SEL"
				&TFEmbarqueRemissionDoc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUETRANSPORTE"
				&TFEmbarqueTransporte.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUETRANSPORTE_SEL"
				&TFEmbarqueTransporte_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEPLACAS"
				&TFEmbarquePlacas.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEPLACAS_SEL"
				&TFEmbarquePlacas_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECONDUCTOR"
				&TFEmbarqueConductor.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECONDUCTOR_SEL"
				&TFEmbarqueConductor_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUENOPRODUCTOS"
				&TFEmbarqueNoProductos.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueNoProductos_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEESTATUS_SEL"
				&TFEmbarqueEstatus_SelsJson = &GridStateFilterValue.Value
				&TFEmbarqueEstatus_Sels.FromJson(&TFEmbarqueEstatus_SelsJson)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEDETALLECONFIRMADOPORADMINISTRACION_SEL"
				&TFEmbarqueDetalleConfirmadoPorAdministracion_Sel.FromString(&GridStateFilterValue.Value)
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

