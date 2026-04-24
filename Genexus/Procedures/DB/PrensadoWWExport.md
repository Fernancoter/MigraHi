# Procedure: PrensadoWWExport

- **Module:** DB
- **Description:** Prensado WWExport
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
| TFPrensadoTotalPalets | Variable | NUMERIC |  | TFPrensado Total Palets |
| TFPrensadoTotalPalets_To | Variable | NUMERIC |  | TFPrensado Total Palets_To |
| TFPrensadoFecha | Variable | DATETIME |  | TFPrensado Fecha |
| TFPrensadoFecha_To | Variable | DATETIME |  | TFPrensado Fecha_To |
| TFPrensadoPrensaNombre | Variable | VARCHAR |  | TFPrensado Prensa Nombre |
| TFPrensadoPrensaNombre_Sel | Variable | VARCHAR |  | TFPrensado Prensa Nombre_Sel |
| TFPrensadoTurnoNombre | Variable | VARCHAR |  | TFPrensado Turno Nombre |
| TFPrensadoTurnoNombre_Sel | Variable | VARCHAR |  | TFPrensado Turno Nombre_Sel |
| TFPrensadoProductoNombre | Variable | VARCHAR |  | TFPrensado Producto Nombre |
| TFPrensadoProductoNombre_Sel | Variable | VARCHAR |  | TFPrensado Producto Nombre_Sel |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFPrensadoEstado_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Estado_Sels Json |
| TFPrensadoEstado_Sel | Variable | VARCHAR |  | TFPrensado Estado_Sel |
| TFPrensadoEstado_Sels | Variable | VARCHAR |  | TFPrensado Estado_Sels |
| TFPrensadoLevasUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Levas Unidad Medida_Sels Json |
| TFPrensadoLevasUnidadMedida_Sel | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sel |
| TFPrensadoLevasUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sels |
| TFPrensadoRodillosUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels Json |
| TFPrensadoRodillosUnidadMedida_Sel | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sel |
| TFPrensadoRodillosUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels |
| TFPrensadoLevasKgEntrada | Variable | NUMERIC |  | TFPrensado Levas Kg Entrada |
| TFPrensadoLevasKgEntrada_To | Variable | NUMERIC |  | TFPrensado Levas Kg Entrada_To |
| TFPrensadoLevasKgSalida | Variable | NUMERIC |  | TFPrensado Levas Kg Salida |
| TFPrensadoLevasKgSalida_To | Variable | NUMERIC |  | TFPrensado Levas Kg Salida_To |
| TFPrensadoLevasGradosEntrada | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada |
| TFPrensadoLevasGradosEntrada_To | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada_To |
| TFPrensadoLevasGradosSalida | Variable | NUMERIC |  | TFPrensado Levas Grados Salida |
| TFPrensadoLevasGradosSalida_To | Variable | NUMERIC |  | TFPrensado Levas Grados Salida_To |
| TFPrensadoRodillosKgEntrada | Variable | NUMERIC |  | TFPrensado Rodillos Kg Entrada |
| TFPrensadoRodillosKgEntrada_To | Variable | NUMERIC |  | TFPrensado Rodillos Kg Entrada_To |
| TFPrensadoRodillosKgSalida | Variable | NUMERIC |  | TFPrensado Rodillos Kg Salida |
| TFPrensadoRodillosKgSalida_To | Variable | NUMERIC |  | TFPrensado Rodillos Kg Salida_To |
| TFPrensadoRodillosGradosEntrada | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada |
| TFPrensadoRodillosGradosEntrada_To | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada_To |
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
	&Filename = !"PrensadoWWExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFPrensadoTotalPalets.IsEmpty() AND &TFPrensadoTotalPalets_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Pallets")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoTotalPalets
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoTotalPalets_To
	EndIf
	If not (&TFPrensadoFecha.IsEmpty() AND &TFPrensadoFecha_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPrensadoFecha
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPrensadoFecha_To
	EndIf
	If not (&TFPrensadoPrensaNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoPrensaNombre_Sel)
	Else
		If not (&TFPrensadoPrensaNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoPrensaNombre)
		EndIf
	EndIf
	If not (&TFPrensadoTurnoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoTurnoNombre_Sel)
	Else
		If not (&TFPrensadoTurnoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoTurnoNombre)
		EndIf
	EndIf
	If not (&TFPrensadoProductoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoProductoNombre_Sel)
	Else
		If not (&TFPrensadoProductoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoProductoNombre)
		EndIf
	EndIf
	If not (&TFPrensadoOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoOperadorNombre_Sel)
	Else
		If not (&TFPrensadoOperadorNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoOperadorNombre)
		EndIf
	EndIf
	If not (&TFPrensadoEstado_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Estado")
		&i = 1
		For &TFPrensadoEstado_Sel in &TFPrensadoEstado_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFPrensadoEstado_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFPrensadoLevasUnidadMedida_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "U.M. Levas")
		&i = 1
		For &TFPrensadoLevasUnidadMedida_Sel in &TFPrensadoLevasUnidadMedida_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFPrensadoLevasUnidadMedida_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFPrensadoRodillosUnidadMedida_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "U.M. Rodillos")
		&i = 1
		For &TFPrensadoRodillosUnidadMedida_Sel in &TFPrensadoRodillosUnidadMedida_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFPrensadoRodillosUnidadMedida_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFPrensadoLevasKgEntrada.IsEmpty() AND &TFPrensadoLevasKgEntrada_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas Kg Entrada")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoLevasKgEntrada
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoLevasKgEntrada_To
	EndIf
	If not (&TFPrensadoLevasKgSalida.IsEmpty() AND &TFPrensadoLevasKgSalida_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas Kg Salida")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoLevasKgSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoLevasKgSalida_To
	EndIf
	If not (&TFPrensadoLevasGradosEntrada.IsEmpty() AND &TFPrensadoLevasGradosEntrada_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas Grados Entrada")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoLevasGradosEntrada
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoLevasGradosEntrada_To
	EndIf
	If not (&TFPrensadoLevasGradosSalida.IsEmpty() AND &TFPrensadoLevasGradosSalida_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas Grados Salida")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoLevasGradosSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoLevasGradosSalida_To
	EndIf
	If not (&TFPrensadoRodillosKgEntrada.IsEmpty() AND &TFPrensadoRodillosKgEntrada_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Kg Entrada")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoRodillosKgEntrada
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosKgEntrada_To
	EndIf
	If not (&TFPrensadoRodillosKgSalida.IsEmpty() AND &TFPrensadoRodillosKgSalida_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Kg Salida")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoRodillosKgSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosKgSalida_To
	EndIf
	If not (&TFPrensadoRodillosGradosEntrada.IsEmpty() AND &TFPrensadoRodillosGradosEntrada_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Grados Entrada")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoRodillosGradosEntrada
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosGradosEntrada_To
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'DB.PrensadoWWColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'DB.PrensadoWWColumnsSelector')
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

	For each Prensado
		order PrensadoFecha  when &OrderedBy = 1 AND &OrderedDsc = False
		order (PrensadoFecha)  when &OrderedBy = 1 AND &OrderedDsc = True
		order PrensadoPrensaNombre  when &OrderedBy = 2 AND &OrderedDsc = False
		order (PrensadoPrensaNombre)  when &OrderedBy = 2 AND &OrderedDsc = True
		order PrensadoTurnoNombre  when &OrderedBy = 3 AND &OrderedDsc = False
		order (PrensadoTurnoNombre)  when &OrderedBy = 3 AND &OrderedDsc = True
		order PrensadoProductoNombre  when &OrderedBy = 4 AND &OrderedDsc = False
		order (PrensadoProductoNombre)  when &OrderedBy = 4 AND &OrderedDsc = True
		order PrensadoOperadorNombre  when &OrderedBy = 5 AND &OrderedDsc = False
		order (PrensadoOperadorNombre)  when &OrderedBy = 5 AND &OrderedDsc = True
		order PrensadoEstado  when &OrderedBy = 6 AND &OrderedDsc = False
		order (PrensadoEstado)  when &OrderedBy = 6 AND &OrderedDsc = True
		order PrensadoLevasUnidadMedida  when &OrderedBy = 7 AND &OrderedDsc = False
		order (PrensadoLevasUnidadMedida)  when &OrderedBy = 7 AND &OrderedDsc = True
		order PrensadoRodillosUnidadMedida  when &OrderedBy = 8 AND &OrderedDsc = False
		order (PrensadoRodillosUnidadMedida)  when &OrderedBy = 8 AND &OrderedDsc = True
		order PrensadoLevasKgEntrada  when &OrderedBy = 9 AND &OrderedDsc = False
		order (PrensadoLevasKgEntrada)  when &OrderedBy = 9 AND &OrderedDsc = True
		order PrensadoLevasKgSalida  when &OrderedBy = 10 AND &OrderedDsc = False
		order (PrensadoLevasKgSalida)  when &OrderedBy = 10 AND &OrderedDsc = True
		order PrensadoLevasGradosEntrada  when &OrderedBy = 11 AND &OrderedDsc = False
		order (PrensadoLevasGradosEntrada)  when &OrderedBy = 11 AND &OrderedDsc = True
		order PrensadoLevasGradosSalida  when &OrderedBy = 12 AND &OrderedDsc = False
		order (PrensadoLevasGradosSalida)  when &OrderedBy = 12 AND &OrderedDsc = True
		order PrensadoRodillosKgEntrada  when &OrderedBy = 13 AND &OrderedDsc = False
		order (PrensadoRodillosKgEntrada)  when &OrderedBy = 13 AND &OrderedDsc = True
		order PrensadoRodillosKgSalida  when &OrderedBy = 14 AND &OrderedDsc = False
		order (PrensadoRodillosKgSalida)  when &OrderedBy = 14 AND &OrderedDsc = True
		order PrensadoRodillosGradosEntrada  when &OrderedBy = 15 AND &OrderedDsc = False
		order (PrensadoRodillosGradosEntrada)  when &OrderedBy = 15 AND &OrderedDsc = True
		
		using PrensadoWWDS(&FilterFullText, &TFPrensadoTotalPalets, &TFPrensadoTotalPalets_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoPrensaNombre
					, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoNombre, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPrensadoEstado_Sels, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada, &TFPrensadoRodillosGradosEntrada_To)

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoTotalPalets'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoTotalPalets
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoFecha'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PrensadoFecha
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoPrensaNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoPrensaNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoTurnoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoTurnoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoProductoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoProductoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoEstado'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PrensadoEstado.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasUnidadMedida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PrensadoLevasUnidadMedida.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosUnidadMedida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PrensadoRodillosUnidadMedida.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasKgEntrada'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoLevasKgEntrada
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasKgSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoLevasKgSalida
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasGradosEntrada'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoLevasGradosEntrada
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasGradosSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoLevasGradosSalida
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosKgEntrada'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoRodillosKgEntrada
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosKgSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoRodillosKgSalida
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosGradosEntrada'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoRodillosGradosEntrada
				EndCase
				&VisibleColumnCount += 1
			EndIf
		EndFor		
		Do Case
			Case PrensadoEstado = EstadoPrensado.EnProceso
				&ExcelDocument.Cells(&CellRow, &FirstColumn, 1, &VisibleColumnCount).Color = RGB(251,110,82)
			Case PrensadoEstado = EstadoPrensado.Programado
				&ExcelDocument.Cells(&CellRow, &FirstColumn, 1, &VisibleColumnCount).Color = RGB(60,141,188)
			Case PrensadoEstado = EstadoPrensado.Terminado
				&ExcelDocument.Cells(&CellRow, &FirstColumn, 1, &VisibleColumnCount).Color = RGB(0,166,90)
			Case PrensadoEstado = EstadoPrensado.Intermedio
				&ExcelDocument.Cells(&CellRow, &FirstColumn, 1, &VisibleColumnCount).Color = RGB(221,75,57)
		EndCase
		
		
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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoTotalPalets", '', !'Pallets', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoFecha", '', !'Fecha', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoPrensaNombre", '', !'Prensa', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoTurnoNombre", '', !'Turno', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoProductoNombre", '', !'Producto', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoOperadorNombre", '', !'Operador', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoEstado", '', !'Estado', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasUnidadMedida", '', !'U.M. Levas', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosUnidadMedida", '', !'U.M. Rodillos', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasKgEntrada", '', !'Levas Kg Entrada', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasKgSalida", '', !'Levas Kg Salida', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasGradosEntrada", '', !'Levas Grados Entrada', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasGradosSalida", '', !'Levas Grados Salida', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosKgEntrada", '', !'Rodillos Kg Entrada', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosKgSalida", '', !'Rodillos Kg Salida', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosGradosEntrada", '', !'Rodillos Grados Entrada', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'DB.PrensadoWWColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.PrensadoWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.PrensadoWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.PrensadoWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTOTALPALETS"
				&TFPrensadoTotalPalets.FromString(&GridStateFilterValue.Value)
				&TFPrensadoTotalPalets_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOFECHA"
				&TFPrensadoFecha.FromString(&GridStateFilterValue.Value)
				&TFPrensadoFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE"
				&TFPrensadoPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE_SEL"
				&TFPrensadoPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE"
				&TFPrensadoTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE_SEL"
				&TFPrensadoTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE"
				&TFPrensadoProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE_SEL"
				&TFPrensadoProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE"
				&TFPrensadoOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE_SEL"
				&TFPrensadoOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOESTADO_SEL"
				&TFPrensadoEstado_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoEstado_Sels.FromJson(&TFPrensadoEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASUNIDADMEDIDA_SEL"
				&TFPrensadoLevasUnidadMedida_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoLevasUnidadMedida_Sels.FromJson(&TFPrensadoLevasUnidadMedida_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSUNIDADMEDIDA_SEL"
				&TFPrensadoRodillosUnidadMedida_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoRodillosUnidadMedida_Sels.FromJson(&TFPrensadoRodillosUnidadMedida_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASKGENTRADA"
				&TFPrensadoLevasKgEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoLevasKgEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASKGSALIDA"
				&TFPrensadoLevasKgSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoLevasKgSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASGRADOSENTRADA"
				&TFPrensadoLevasGradosEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoLevasGradosEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASGRADOSSALIDA"
				&TFPrensadoLevasGradosSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoLevasGradosSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSKGENTRADA"
				&TFPrensadoRodillosKgEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosKgEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSKGSALIDA"
				&TFPrensadoRodillosKgSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosKgSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSGRADOSENTRADA"
				&TFPrensadoRodillosGradosEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosGradosEntrada_To.FromString(&GridStateFilterValue.ValueTo)
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

