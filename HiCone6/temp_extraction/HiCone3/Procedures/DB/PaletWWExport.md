# Procedure: PaletWWExport

- **Module:** DB
- **Description:** Palet WWExport
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
| TFPaletNoSerie | Variable | VARCHAR |  | TFPalet No Serie |
| TFPaletNoSerie_Sel | Variable | VARCHAR |  | TFPalet No Serie_Sel |
| TFPaletNo | Variable | NUMERIC |  | TFPalet No |
| TFPaletNo_To | Variable | NUMERIC |  | TFPalet No_To |
| TFPaletTipo_SelsJson | Variable | LONGVARCHAR |  | TFPalet Tipo_Sels Json |
| TFPaletTipo_Sels | Variable | VARCHAR |  | TFPalet Tipo_Sels |
| TFPaletTipo_Sel | Variable | VARCHAR |  | TFPalet Tipo_Sel |
| TFPaletOperadorId | Variable | NUMERIC |  | TFPalet Operador Id |
| TFPaletOperadorId_To | Variable | NUMERIC |  | TFPalet Operador Id_To |
| TFPaletProductoId | Variable | NUMERIC |  | TFPalet Producto Id |
| TFPaletProductoId_To | Variable | NUMERIC |  | TFPalet Producto Id_To |
| TFPaletPrensaNombre | Variable | VARCHAR |  | TFPalet Prensa Nombre |
| TFPaletPrensaNombre_Sel | Variable | VARCHAR |  | TFPalet Prensa Nombre_Sel |
| TFPaletProductoNombre | Variable | VARCHAR |  | TFPalet Producto Nombre |
| TFPaletProductoNombre_Sel | Variable | VARCHAR |  | TFPalet Producto Nombre_Sel |
| TFPaletProductoDescripcion | Variable | VARCHAR |  | TFPalet Producto Descripcion |
| TFPaletProductoDescripcion_Sel | Variable | VARCHAR |  | TFPalet Producto Descripcion_Sel |
| TFPaletHoraInicioEnsamble | Variable | DATETIME |  | TFPalet Hora Inicio Ensamble |
| TFPaletHoraInicioEnsamble_To | Variable | DATETIME |  | TFPalet Hora Inicio Ensamble_To |
| TFPaletHoraFinEnsamble | Variable | DATETIME |  | TFPalet Hora Fin Ensamble |
| TFPaletHoraFinEnsamble_To | Variable | DATETIME |  | TFPalet Hora Fin Ensamble_To |
| TFPaletEstatus_SelsJson | Variable | LONGVARCHAR |  | TFPalet Estatus_Sels Json |
| TFPaletEstatus_Sels | Variable | VARCHAR |  | TFPalet Estatus_Sels |
| TFPaletEstatus_Sel | Variable | VARCHAR |  | TFPalet Estatus_Sel |
| TFPaletPrensaId | Variable | NUMERIC |  | TFPalet Prensa Id |
| TFPaletPrensaId_To | Variable | NUMERIC |  | TFPalet Prensa Id_To |
| TFPaletPrensadoId | Variable | NUMERIC |  | TFPalet Prensado Id |
| TFPaletPrensadoId_To | Variable | NUMERIC |  | TFPalet Prensado Id_To |
| TFPaletPrensadoFinId | Variable | NUMERIC |  | TFPalet Prensado Fin Id |
| TFPaletPrensadoFinId_To | Variable | NUMERIC |  | TFPalet Prensado Fin Id_To |
| TFPaletCapacidad | Variable | NUMERIC |  | TFPalet Capacidad |
| TFPaletCapacidad_To | Variable | NUMERIC |  | TFPalet Capacidad_To |
| TFPaletNoCarretes | Variable | NUMERIC |  | TFPalet No Carretes |
| TFPaletNoCarretes_To | Variable | NUMERIC |  | TFPalet No Carretes_To |
| i | Variable | NUMERIC |  | i |
| NowDate | Variable | DATE |  | Now Date |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
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

&NowDate.FromString(&WebSession.Get(!"FechaInicialConsulta"))

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
	&Filename = !"PaletWWExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFPaletNoSerie_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No Serie")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletNoSerie_Sel)
	Else
		If not (&TFPaletNoSerie.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No Serie")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletNoSerie)
		EndIf
	EndIf
	If not (&TFPaletNo.IsEmpty() AND &TFPaletNo_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPaletNo
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPaletNo_To
	EndIf
	If not (&TFPaletTipo_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Tipo")
		&i = 1
		For &TFPaletTipo_Sel in &TFPaletTipo_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFPaletTipo_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFPaletProductoId.IsEmpty() AND &TFPaletProductoId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPaletProductoId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPaletProductoId_To
	EndIf
	If not (&TFPaletPrensaNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletPrensaNombre_Sel)
	Else
		If not (&TFPaletPrensaNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFPaletPrensaNombre)
		EndIf
	EndIf
	If not (&TFPaletProductoNombre_Sel.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletProductoNombre_Sel)
	Else
		If not (&TFPaletProductoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletProductoNombre)
		EndIf
	EndIf
	If not (&TFPaletProductoDescripcion_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Descripcion")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletProductoDescripcion_Sel)
	Else
		If not (&TFPaletProductoDescripcion.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Descripcion")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletProductoDescripcion)
		EndIf
	EndIf
	If not (&TFPaletHoraInicioEnsamble.IsEmpty() AND &TFPaletHoraInicioEnsamble_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Inicio Ensamble")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPaletHoraInicioEnsamble
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPaletHoraInicioEnsamble_To
	EndIf
	If not (&TFPaletHoraFinEnsamble.IsEmpty() AND &TFPaletHoraFinEnsamble_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fin Ensamble")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPaletHoraFinEnsamble
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPaletHoraFinEnsamble_To
	EndIf
	If not (&TFPaletEstatus_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Estatus")
		&i = 1
		For &TFPaletEstatus_Sel in &TFPaletEstatus_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFPaletEstatus_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFPaletPrensaId.IsEmpty() AND &TFPaletPrensaId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPaletPrensaId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPaletPrensaId_To
	EndIf
	If not (&TFPaletPrensadoId.IsEmpty() AND &TFPaletPrensadoId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPaletPrensadoId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPaletPrensadoId_To
	EndIf
	If not (&TFPaletPrensadoFinId.IsEmpty() AND &TFPaletPrensadoFinId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fin Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPaletPrensadoFinId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPaletPrensadoFinId_To
	EndIf
	If not (&TFPaletCapacidad.IsEmpty() AND &TFPaletCapacidad_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Capacidad")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPaletCapacidad
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPaletCapacidad_To
	EndIf
	If not (&TFPaletNoCarretes.IsEmpty() AND &TFPaletNoCarretes_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No Carretes")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPaletNoCarretes
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPaletNoCarretes_To
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'DB.PaletWWColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'DB.PaletWWColumnsSelector')
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
	For each Palet
		order PaletNoSerie  when &OrderedBy = 1 AND &OrderedDsc = False
		order (PaletNoSerie)  when &OrderedBy = 1 AND &OrderedDsc = True
		order PaletNo  when &OrderedBy = 2 AND &OrderedDsc = False
		order (PaletNo)  when &OrderedBy = 2 AND &OrderedDsc = True
		order PaletTipo  when &OrderedBy = 3 AND &OrderedDsc = False
		order (PaletTipo)  when &OrderedBy = 3 AND &OrderedDsc = True
		order PaletProductoId  when &OrderedBy = 4 AND &OrderedDsc = False
		order (PaletProductoId)  when &OrderedBy = 4 AND &OrderedDsc = True
		order PaletPrensaNombre  when &OrderedBy = 5 AND &OrderedDsc = False
		order (PaletPrensaNombre)  when &OrderedBy = 5 AND &OrderedDsc = True
		order PaletProductoNombre  when &OrderedBy = 6 AND &OrderedDsc = False
		order (PaletProductoNombre)  when &OrderedBy = 6 AND &OrderedDsc = True
		order PaletProductoDescripcion  when &OrderedBy = 7 AND &OrderedDsc = False
		order (PaletProductoDescripcion)  when &OrderedBy = 7 AND &OrderedDsc = True
		order PaletHoraInicioEnsamble  when &OrderedBy = 8 AND &OrderedDsc = False
		order (PaletHoraInicioEnsamble)  when &OrderedBy = 8 AND &OrderedDsc = True
		order PaletHoraFinEnsamble  when &OrderedBy = 9 AND &OrderedDsc = False
		order (PaletHoraFinEnsamble)  when &OrderedBy = 9 AND &OrderedDsc = True
		order PaletEstatus  when &OrderedBy = 10 AND &OrderedDsc = False
		order (PaletEstatus)  when &OrderedBy = 10 AND &OrderedDsc = True
		order PaletPrensaId  when &OrderedBy = 11 AND &OrderedDsc = False
		order (PaletPrensaId)  when &OrderedBy = 11 AND &OrderedDsc = True
		order PaletPrensadoId  when &OrderedBy = 12 AND &OrderedDsc = False
		order (PaletPrensadoId)  when &OrderedBy = 12 AND &OrderedDsc = True
		order PaletPrensadoFinId  when &OrderedBy = 13 AND &OrderedDsc = False
		order (PaletPrensadoFinId)  when &OrderedBy = 13 AND &OrderedDsc = True
		order PaletCapacidad  when &OrderedBy = 14 AND &OrderedDsc = False
		order (PaletCapacidad)  when &OrderedBy = 14 AND &OrderedDsc = True
		order PaletNoCarretes  when &OrderedBy = 15 AND &OrderedDsc = False
		order (PaletNoCarretes)  when &OrderedBy = 15 AND &OrderedDsc = True
		
		using PaletWWDS(&FilterFullText, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo, &TFPaletNo_To, &TFPaletTipo_Sels
					, &TFPaletProductoId, &TFPaletProductoId_To, &TFPaletPrensaNombre, &TFPaletPrensaNombre_Sel, &TFPaletProductoNombre, &TFPaletProductoNombre_Sel
					, &TFPaletProductoDescripcion, &TFPaletProductoDescripcion_Sel, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To
					, &TFPaletEstatus_Sels, &TFPaletPrensaId, &TFPaletPrensaId_To, &TFPaletPrensadoId, &TFPaletPrensadoId_To, &TFPaletPrensadoFinId
					, &TFPaletPrensadoFinId_To, &TFPaletCapacidad, &TFPaletCapacidad_To, &TFPaletNoCarretes, &TFPaletNoCarretes_To)
		Where PaletHoraInicioEnsamble>= &NowDate

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'PaletNoSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(PaletNoSerie)
					Case &ColumnsSelector_Column.ColumnName = !'PaletNo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PaletNo
					Case &ColumnsSelector_Column.ColumnName = !'PaletTipo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PaletTipo.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'PaletProductoId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PaletProductoId
					Case &ColumnsSelector_Column.ColumnName = !'PaletPrensaNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(Produccion.PaletPrensaNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PaletProductoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(PaletProductoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PaletProductoDescripcion'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PaletProductoDescripcion)
					Case &ColumnsSelector_Column.ColumnName = !'PaletHoraInicioEnsamble'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PaletHoraInicioEnsamble
					Case &ColumnsSelector_Column.ColumnName = !'PaletHoraFinEnsamble'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PaletHoraFinEnsamble
					Case &ColumnsSelector_Column.ColumnName = !'PaletEstatus'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PaletEstatus.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'PaletPrensaId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PaletPrensaId
					Case &ColumnsSelector_Column.ColumnName = !'PaletPrensadoId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PaletPrensadoId
					Case &ColumnsSelector_Column.ColumnName = !'PaletPrensadoFinId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PaletPrensadoFinId
					Case &ColumnsSelector_Column.ColumnName = !'PaletCapacidad'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PaletCapacidad
					Case &ColumnsSelector_Column.ColumnName = !'PaletNoCarretes'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PaletNoCarretes
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
				Case &ColumnsSelector_Column.ColumnName = !'PaletNoSerie'
					&ExcelDocument.Cells(&CellRow + 1, &FirstColumn + &VisibleColumnCount).Number = &CellRow + 1 - &FirstDataCellRow
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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletNoSerie", '', !'No Serie', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletNo", '', !'No', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletTipo", '', !'Tipo', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletProductoId", '', !'Producto Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletPrensaNombre", '', !'Prensa Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletProductoNombre", '', !'Producto Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletProductoDescripcion", '', !'Producto Descripcion', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletHoraInicioEnsamble", '', !'Inicio Ensamble', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletHoraFinEnsamble", '', !'Fin Ensamble', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletEstatus", '', !'Estatus', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletPrensaId", '', !'Prensa Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletPrensadoId", '', !'Prensado Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletPrensadoFinId", '', !'Fin Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletCapacidad", '', !'Capacidad', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletNoCarretes", '', !'No Carretes', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'DB.PaletWWColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.PaletWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.PaletWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.PaletWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETNOSERIE"
				&TFPaletNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETNOSERIE_SEL"
				&TFPaletNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETNO"
				&TFPaletNo.FromString(&GridStateFilterValue.Value)
				&TFPaletNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETTIPO_SEL"
				&TFPaletTipo_SelsJson = &GridStateFilterValue.Value
				&TFPaletTipo_Sels.FromJson(&TFPaletTipo_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPALETPRODUCTOID"
				&TFPaletProductoId.FromString(&GridStateFilterValue.Value)
				&TFPaletProductoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETPRENSANOMBRE"
				&TFPaletPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETPRENSANOMBRE_SEL"
				&TFPaletPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETPRODUCTONOMBRE"
				&TFPaletProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETPRODUCTONOMBRE_SEL"
				&TFPaletProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETPRODUCTODESCRIPCION"
				&TFPaletProductoDescripcion.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETPRODUCTODESCRIPCION_SEL"
				&TFPaletProductoDescripcion_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETHORAINICIOENSAMBLE"
				&TFPaletHoraInicioEnsamble.FromString(&GridStateFilterValue.Value)
				&TFPaletHoraInicioEnsamble_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETHORAFINENSAMBLE"
				&TFPaletHoraFinEnsamble.FromString(&GridStateFilterValue.Value)
				&TFPaletHoraFinEnsamble_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETESTATUS_SEL"
				&TFPaletEstatus_SelsJson = &GridStateFilterValue.Value
				&TFPaletEstatus_Sels.FromJson(&TFPaletEstatus_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPALETPRENSAID"
				&TFPaletPrensaId.FromString(&GridStateFilterValue.Value)
				&TFPaletPrensaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETPRENSADOID"
				&TFPaletPrensadoId.FromString(&GridStateFilterValue.Value)
				&TFPaletPrensadoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETPRENSADOFINID"
				&TFPaletPrensadoFinId.FromString(&GridStateFilterValue.Value)
				&TFPaletPrensadoFinId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETCAPACIDAD"
				&TFPaletCapacidad.FromString(&GridStateFilterValue.Value)
				&TFPaletCapacidad_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETNOCARRETES"
				&TFPaletNoCarretes.FromString(&GridStateFilterValue.Value)
				&TFPaletNoCarretes_To.FromString(&GridStateFilterValue.ValueTo)
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

