# Procedure: BobinaWWExport

- **Module:** DB
- **Description:** Bobina WWExport
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
| TFBobinaId | Variable | NUMERIC |  | TFBobina Id |
| TFBobinaId_To | Variable | NUMERIC |  | TFBobina Id_To |
| TFBobinaNoSerie | Variable | VARCHAR |  | TFBobina No Serie |
| TFBobinaNoSerie_Sel | Variable | VARCHAR |  | TFBobina No Serie_Sel |
| TFExtrusionId | Variable | NUMERIC |  | TFExtrusion Id |
| TFExtrusionId_To | Variable | NUMERIC |  | TFExtrusion Id_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionTurnoNombre | Variable | VARCHAR |  | TFExtrusion Turno Nombre |
| TFExtrusionTurnoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Turno Nombre_Sel |
| TFBobinaOrigen_SelsJson | Variable | LONGVARCHAR |  | TFBobina Origen_Sels Json |
| TFBobinaOrigen_Sel | Variable | VARCHAR |  | TFBobina Origen_Sel |
| TFBobinaOrigen_Sels | Variable | VARCHAR |  | TFBobina Origen_Sels |
| TFBobinaHoraInicio | Variable | DATETIME |  | TFBobina Hora Inicio |
| TFBobinaHoraInicio_To | Variable | DATETIME |  | TFBobina Hora Inicio_To |
| TFBobinaHoraSalida | Variable | DATETIME |  | TFBobina Hora Salida |
| TFBobinaHoraSalida_To | Variable | DATETIME |  | TFBobina Hora Salida_To |
| TFBobinaKg | Variable | NUMERIC |  | TFBobina Kg |
| TFBobinaKg_To | Variable | NUMERIC |  | TFBobina Kg_To |
| TFBobinaNo | Variable | NUMERIC |  | TFBobina No |
| TFBobinaNo_To | Variable | NUMERIC |  | TFBobina No_To |
| TFBobinaReposoEnHoras | Variable | NUMERIC |  | TFBobina Reposo En Horas |
| TFBobinaReposoEnHoras_To | Variable | NUMERIC |  | TFBobina Reposo En Horas_To |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFBobinaObservaciones | Variable | VARCHAR |  | TFBobina Observaciones |
| TFBobinaObservaciones_Sel | Variable | VARCHAR |  | TFBobina Observaciones_Sel |
| TFBobinaRechazadaObservaciones | Variable | VARCHAR |  | TFBobina Rechazada Observaciones |
| TFBobinaRechazadaObservaciones_Sel | Variable | VARCHAR |  | TFBobina Rechazada Observaciones_Sel |
| TFBobinaSiloMolidoNombre | Variable | VARCHAR |  | TFBobina Silo Molido Nombre |
| TFBobinaSiloMolidoNombre_Sel | Variable | VARCHAR |  | TFBobina Silo Molido Nombre_Sel |
| TFExtrusionLotePaqueteAditivos | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos |
| TFExtrusionLotePaqueteAditivos_Sel | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sel |
| GridConditionalFormattingFilter | Variable | NUMERIC |  | Grid Conditional Formatting Filter |
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
	&Filename = !"BobinaWWExport-" + &Random.ToString().Trim() + !".xlsx"

	&ExcelDocument.Open(&Filename)
	Do 'CheckStatus'
	&ExcelDocument.Clear()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteFilters'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	If not (&FilterFullText.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "WWP_FullTextFilterDescription")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&FilterFullText)
	EndIf
	If not (&TFBobinaId.IsEmpty() AND &TFBobinaId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaId_To
	EndIf
	If not (&TFBobinaNoSerie_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No Serie")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaNoSerie_Sel)
	Else
		If not (&TFBobinaNoSerie.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No Serie")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaNoSerie)
		EndIf
	EndIf
	If not (&TFExtrusionId.IsEmpty() AND &TFExtrusionId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionId_To
	EndIf
	If not (&TFExtrusionExtrusoraNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusora")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionExtrusoraNombre_Sel)
	Else
		If not (&TFExtrusionExtrusoraNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusora")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionExtrusoraNombre)
		EndIf
	EndIf
	If not (&TFExtrusionTurnoNombre_Sel.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionTurnoNombre_Sel)
	Else
		If not (&TFExtrusionTurnoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionTurnoNombre)
		EndIf
	EndIf
	If not (&TFBobinaOrigen_Sels.Count = 0)
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Origen")
		&i = 1
		For &TFBobinaOrigen_Sel in &TFBobinaOrigen_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFBobinaOrigen_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFBobinaHoraInicio.IsEmpty() AND &TFBobinaHoraInicio_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Hora Inicio")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFBobinaHoraInicio
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFBobinaHoraInicio_To
	EndIf
	If not (&TFBobinaHoraSalida.IsEmpty() AND &TFBobinaHoraSalida_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Hora Salida")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFBobinaHoraSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFBobinaHoraSalida_To
	EndIf
	If not (&TFBobinaKg.IsEmpty() AND &TFBobinaKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaKg_To
	EndIf
	If not (&TFBobinaNo.IsEmpty() AND &TFBobinaNo_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaNo
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaNo_To
	EndIf
	If not (&TFBobinaReposoEnHoras.IsEmpty() AND &TFBobinaReposoEnHoras_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Reposo (Hr)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaReposoEnHoras
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaReposoEnHoras_To
	EndIf
	If not (&TFExtrusionOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionOperadorNombre_Sel)
	Else
		If not (&TFExtrusionOperadorNombre.IsEmpty())
			WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionOperadorNombre)
		EndIf
	EndIf
	If not (&TFBobinaObservaciones_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observaciones")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaObservaciones_Sel)
	Else
		If not (&TFBobinaObservaciones.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observaciones")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaObservaciones)
		EndIf
	EndIf
	If not (&TFBobinaRechazadaObservaciones_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rechazada Observaciones")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaRechazadaObservaciones_Sel)
	Else
		If not (&TFBobinaRechazadaObservaciones.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rechazada Observaciones")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaRechazadaObservaciones)
		EndIf
	EndIf
	If not (&TFBobinaSiloMolidoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Molido")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFBobinaSiloMolidoNombre_Sel)
	Else
		If not (&TFBobinaSiloMolidoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Molido")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaSiloMolidoNombre)
		EndIf
	EndIf
	If not (&TFExtrusionLotePaqueteAditivos_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Paquete Aditivos")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLotePaqueteAditivos_Sel)
	Else
		If not (&TFExtrusionLotePaqueteAditivos.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Paquete Aditivos")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLotePaqueteAditivos)
		EndIf
	EndIf
	If not &GridConditionalFormattingFilter.IsEmpty()
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "WWP_FullTextFilterDescription")
		Do Case
			Case &GridConditionalFormattingFilter = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "En Medición"
			Case &GridConditionalFormattingFilter = 2
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "Reposo"
			Case &GridConditionalFormattingFilter = 3
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "Molino"
			Case &GridConditionalFormattingFilter = 4
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "En Proceso"
			Case &GridConditionalFormattingFilter = 5
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "Disponible"
			Case &GridConditionalFormattingFilter = 6
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "En Prensado"
			Case &GridConditionalFormattingFilter = 7
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "Pausada"
			Case &GridConditionalFormattingFilter = 8
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "Desmontada"
			Case &GridConditionalFormattingFilter = 9
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "Transferida"
			Case &GridConditionalFormattingFilter = 10
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "Rechazada"
			Case &GridConditionalFormattingFilter = 11
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "Consumida"
		EndCase
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'DB.BobinaWWColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'DB.BobinaWWColumnsSelector')
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
	For each Bobina
		order BobinaNoSerie  when &OrderedBy = 1 AND &OrderedDsc = False
		order (BobinaNoSerie)  when &OrderedBy = 1 AND &OrderedDsc = True
		order BobinaId  when &OrderedBy = 2 AND &OrderedDsc = False
		order (BobinaId)  when &OrderedBy = 2 AND &OrderedDsc = True
		order ExtrusionId  when &OrderedBy = 3 AND &OrderedDsc = False
		order (ExtrusionId)  when &OrderedBy = 3 AND &OrderedDsc = True
		order ExtrusionExtrusoraNombre  when &OrderedBy = 4 AND &OrderedDsc = False
		order (ExtrusionExtrusoraNombre)  when &OrderedBy = 4 AND &OrderedDsc = True
		order ExtrusionTurnoNombre  when &OrderedBy = 5 AND &OrderedDsc = False
		order (ExtrusionTurnoNombre)  when &OrderedBy = 5 AND &OrderedDsc = True
		order BobinaOrigen  when &OrderedBy = 6 AND &OrderedDsc = False
		order (BobinaOrigen)  when &OrderedBy = 6 AND &OrderedDsc = True
		order BobinaHoraInicio  when &OrderedBy = 7 AND &OrderedDsc = False
		order (BobinaHoraInicio)  when &OrderedBy = 7 AND &OrderedDsc = True
		order BobinaHoraSalida  when &OrderedBy = 8 AND &OrderedDsc = False
		order (BobinaHoraSalida)  when &OrderedBy = 8 AND &OrderedDsc = True
		order DB.BobinaKg  when &OrderedBy = 9 AND &OrderedDsc = False
		order (BobinaKg)  when &OrderedBy = 9 AND &OrderedDsc = True
		order BobinaNo  when &OrderedBy = 10 AND &OrderedDsc = False
		order (BobinaNo)  when &OrderedBy = 10 AND &OrderedDsc = True
		order ExtrusionOperadorNombre  when &OrderedBy = 11 AND &OrderedDsc = False
		order (ExtrusionOperadorNombre)  when &OrderedBy = 11 AND &OrderedDsc = True
		order BobinaObservaciones  when &OrderedBy = 12 AND &OrderedDsc = False
		order (DB.BobinaObservaciones)  when &OrderedBy = 12 AND &OrderedDsc = True
		order BobinaRechazadaObservaciones  when &OrderedBy = 13 AND &OrderedDsc = False
		order (BobinaRechazadaObservaciones)  when &OrderedBy = 13 AND &OrderedDsc = True
		order BobinaSiloMolidoNombre  when &OrderedBy = 14 AND &OrderedDsc = False
		order (BobinaSiloMolidoNombre)  when &OrderedBy = 14 AND &OrderedDsc = True
		order ExtrusionLotePaqueteAditivos  when &OrderedBy = 15 AND &OrderedDsc = False
		order (ExtrusionLotePaqueteAditivos)  when &OrderedBy = 15 AND &OrderedDsc = True
		
		using BobinaWWDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaOrigen_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida, &TFBobinaHoraSalida_To, &TFBobinaKg
					, &TFBobinaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'BobinaId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaId
					Case &ColumnsSelector_Column.ColumnName = !'BobinaNoSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(BobinaNoSerie)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionId
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionExtrusoraNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionExtrusoraNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionTurnoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(ExtrusionTurnoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'BobinaOrigen'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = BobinaOrigen.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'BobinaHoraInicio'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = BobinaHoraInicio
					Case &ColumnsSelector_Column.ColumnName = !'BobinaHoraSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = BobinaHoraSalida
					Case &ColumnsSelector_Column.ColumnName = !'BobinaKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaKg
					Case &ColumnsSelector_Column.ColumnName = !'BobinaNo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaNo
					Case &ColumnsSelector_Column.ColumnName = !'BobinaReposoEnHoras'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaReposoEnHoras
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'BobinaObservaciones'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(BobinaObservaciones)
					Case &ColumnsSelector_Column.ColumnName = !'BobinaRechazadaObservaciones'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(BobinaRechazadaObservaciones)
					Case &ColumnsSelector_Column.ColumnName = !'BobinaSiloMolidoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(BobinaSiloMolidoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionLotePaqueteAditivos'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionLotePaqueteAditivos)
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
				Case &ColumnsSelector_Column.ColumnName = !'BobinaKg'
					&ExcelDocument.Cells(&CellRow + 1, &FirstColumn + &VisibleColumnCount).Text = format(!"=SUM(%1%2:%1%3)", CHR(ASC(!'A') + &VisibleColumnCount), &FirstDataCellRow.ToString().Trim(), &CellRow.ToString().Trim())
				Case &ColumnsSelector_Column.ColumnName = !'BobinaNo'
					&ExcelDocument.Cells(&CellRow + 1, &FirstColumn + &VisibleColumnCount).Text = format(!"=COUNTA(%1%2:%1%3)", CHR(ASC(!'A') + &VisibleColumnCount), &FirstDataCellRow.ToString().Trim(), &CellRow.ToString().Trim())
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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaId", '', !'Id', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaNoSerie", '', !'No Serie', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionId", '', !'Extrusion Id', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionExtrusoraNombre", '', !'Extrusora', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionTurnoNombre", '', !'Turno', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaOrigen", '', !'Origen', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaHoraInicio", '', !'Hora Inicio', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaHoraSalida", '', !'Hora Salida', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaKg", '', !'Kg', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaNo", '', !'No', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaReposoEnHoras", '', !'Reposo (Hr)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionOperadorNombre", '', !'Operador', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaObservaciones", '', !'Observaciones', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaRechazadaObservaciones", '', !'Rechazada Observaciones', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaSiloMolidoNombre", '', !'Silo Molido', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionLotePaqueteAditivos", '', !'Paquete Aditivos', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'DB.BobinaWWColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.BobinaWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.BobinaWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.BobinaWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAID"
				&TFBobinaId.FromString(&GridStateFilterValue.Value)
				&TFBobinaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE"
				&TFBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE_SEL"
				&TFBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONID"
				&TFExtrusionId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE"
				&TFExtrusionTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE_SEL"
				&TFExtrusionTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAORIGEN_SEL"
				&TFBobinaOrigen_SelsJson = &GridStateFilterValue.Value
				&TFBobinaOrigen_Sels.FromJson(&TFBobinaOrigen_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAHORAINICIO"
				&TFBobinaHoraInicio.FromString(&GridStateFilterValue.Value)
				&TFBobinaHoraInicio_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAHORASALIDA"
				&TFBobinaHoraSalida.FromString(&GridStateFilterValue.Value)
				&TFBobinaHoraSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAKG"
				&TFBobinaKg.FromString(&GridStateFilterValue.Value)
				&TFBobinaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINANO"
				&TFBobinaNo.FromString(&GridStateFilterValue.Value)
				&TFBobinaNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAREPOSOENHORAS"
				&TFBobinaReposoEnHoras.FromString(&GridStateFilterValue.Value)
				&TFBobinaReposoEnHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAOBSERVACIONES"
				&TFBobinaObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAOBSERVACIONES_SEL"
				&TFBobinaObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINARECHAZADAOBSERVACIONES"
				&TFBobinaRechazadaObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINARECHAZADAOBSERVACIONES_SEL"
				&TFBobinaRechazadaObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOMOLIDONOMBRE"
				&TFBobinaSiloMolidoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOMOLIDONOMBRE_SEL"
				&TFBobinaSiloMolidoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS"
				&TFExtrusionLotePaqueteAditivos.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS_SEL"
				&TFExtrusionLotePaqueteAditivos_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"GRIDCFFILTER"
				&GridConditionalFormattingFilter.FromString(&GridStateFilterValue.Value)
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

