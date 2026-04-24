# Procedure: vwPrensadoResultadoExport

- **Module:** Reportes
- **Description:** vw Prensado Resultado Export
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
| TFPrensadoResultadoPiezasBuenas | Variable | NUMERIC |  | TFPrensado Resultado Piezas Buenas |
| TFPrensadoResultadoPiezasBuenas_To | Variable | NUMERIC |  | TFPrensado Resultado Piezas Buenas_To |
| TFPrensadoResultadoPiezasMolino | Variable | NUMERIC |  | TFPrensado Resultado Piezas Molino |
| TFPrensadoResultadoPiezasMolino_To | Variable | NUMERIC |  | TFPrensado Resultado Piezas Molino_To |
| TFPrensadoResultadoMermaKg | Variable | NUMERIC |  | TFPrensado Resultado Merma Kg |
| TFPrensadoResultadoMermaKg_To | Variable | NUMERIC |  | TFPrensado Resultado Merma Kg_To |
| TFPrensadoResultadoNoPalets | Variable | NUMERIC |  | TFPrensado Resultado No Palets |
| TFPrensadoResultadoNoPalets_To | Variable | NUMERIC |  | TFPrensado Resultado No Palets_To |
| TFPrensadoResultadoCarretesSobrantes | Variable | NUMERIC |  | TFPrensado Resultado Carretes Sobrantes |
| TFPrensadoResultadoCarretesSobrantes_To | Variable | NUMERIC |  | TFPrensado Resultado Carretes Sobrantes_To |
| TFPrensadoResultadoObservaciones | Variable | VARCHAR |  | TFPrensado Resultado Observaciones |
| TFPrensadoResultadoObservaciones_Sel | Variable | VARCHAR |  | TFPrensado Resultado Observaciones_Sel |
| TFPrensadoResultadoRPMLinea | Variable | VARCHAR |  | TFPrensado Resultado RPMLinea |
| TFPrensadoResultadoRPMLinea_Sel | Variable | VARCHAR |  | TFPrensado Resultado RPMLinea_Sel |
| TFPrensadoResultadoGPMPrensa | Variable | NUMERIC |  | TFPrensado Resultado GPMPrensa |
| TFPrensadoResultadoGPMPrensa_To | Variable | NUMERIC |  | TFPrensado Resultado GPMPrensa_To |
| TFPrensadoResultadoGPMTotal | Variable | NUMERIC |  | TFPrensado Resultado GPMTotal |
| TFPrensadoResultadoGPMTotal_To | Variable | NUMERIC |  | TFPrensado Resultado GPMTotal_To |
| TFPrensadoResultadoHerramientas | Variable | VARCHAR |  | TFPrensado Resultado Herramientas |
| TFPrensadoResultadoHerramientas_Sel | Variable | VARCHAR |  | TFPrensado Resultado Herramientas_Sel |
| TFPrensadoLevasUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Levas Unidad Medida_Sels Json |
| TFPrensadoLevasUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sels |
| TFPrensadoLevasUnidadMedida_Sel | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sel |
| TFPrensadoLevasKgEntrada | Variable | NUMERIC |  | TFPrensado Levas Kg Entrada |
| TFPrensadoLevasKgEntrada_To | Variable | NUMERIC |  | TFPrensado Levas Kg Entrada_To |
| TFPrensadoLevasKgSalida | Variable | NUMERIC |  | TFPrensado Levas Kg Salida |
| TFPrensadoLevasKgSalida_To | Variable | NUMERIC |  | TFPrensado Levas Kg Salida_To |
| TFPrensadoLevasGradosEntrada | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada |
| TFPrensadoLevasGradosEntrada_To | Variable | NUMERIC |  | TFPrensado Levas Grados Entrada_To |
| TFPrensadoLevasGradosSalida | Variable | NUMERIC |  | TFPrensado Levas Grados Salida |
| TFPrensadoLevasGradosSalida_To | Variable | NUMERIC |  | TFPrensado Levas Grados Salida_To |
| TFPrensadoRodillosUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels Json |
| TFPrensadoRodillosUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels |
| TFPrensadoRodillosUnidadMedida_Sel | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sel |
| TFPrensadoRodillosKgEntrada | Variable | NUMERIC |  | TFPrensado Rodillos Kg Entrada |
| TFPrensadoRodillosKgEntrada_To | Variable | NUMERIC |  | TFPrensado Rodillos Kg Entrada_To |
| TFPrensadoRodillosKgSalida | Variable | NUMERIC |  | TFPrensado Rodillos Kg Salida |
| TFPrensadoRodillosKgSalida_To | Variable | NUMERIC |  | TFPrensado Rodillos Kg Salida_To |
| TFPrensadoRodillosGradosEntrada | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada |
| TFPrensadoRodillosGradosEntrada_To | Variable | NUMERIC |  | TFPrensado Rodillos Grados Entrada_To |
| TFPrensadoRodillosGradosSalida | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida |
| TFPrensadoRodillosGradosSalida_To | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida_To |
| i | Variable | NUMERIC |  | i |
| TFPrensadoFecha | Variable | DATETIME |  | TFPrensado Fecha |
| TFPrensadoFecha_To | Variable | DATETIME |  | TFPrensado Fecha_To |
| TFPrensadoPrensaNombre | Variable | VARCHAR |  | TFPrensado Prensa Nombre |
| TFPrensadoPrensaNombre_Sel | Variable | VARCHAR |  | TFPrensado Prensa Nombre_Sel |
| TFPrensadoTurnoNombre | Variable | VARCHAR |  | TFPrensado Turno Nombre |
| TFPrensadoTurnoNombre_Sel | Variable | VARCHAR |  | TFPrensado Turno Nombre_Sel |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFCarreraId | Variable | NUMERIC |  | TFCarrera Id |
| TFCarreraId_To | Variable | NUMERIC |  | TFCarrera Id_To |
| VariableCarrera | Variable | NUMERIC |  | Variable Carrera |
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
	&Filename = !"vwPrensadoResultadoExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFPrensadoResultadoPiezasBuenas.IsEmpty() AND &TFPrensadoResultadoPiezasBuenas_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Piezas Buenas")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoResultadoPiezasBuenas
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoResultadoPiezasBuenas_To
	EndIf
	If not (&TFPrensadoResultadoPiezasMolino.IsEmpty() AND &TFPrensadoResultadoPiezasMolino_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Piezas Molino")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoResultadoPiezasMolino
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoResultadoPiezasMolino_To
	EndIf
	If not (&TFPrensadoResultadoMermaKg.IsEmpty() AND &TFPrensadoResultadoMermaKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Merma Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoResultadoMermaKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoResultadoMermaKg_To
	EndIf
	If not (&TFPrensadoResultadoNoPalets.IsEmpty() AND &TFPrensadoResultadoNoPalets_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "No Palets")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoResultadoNoPalets
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoResultadoNoPalets_To
	EndIf
	If not (&TFPrensadoResultadoCarretesSobrantes.IsEmpty() AND &TFPrensadoResultadoCarretesSobrantes_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carretes Sobrantes")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoResultadoCarretesSobrantes
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoResultadoCarretesSobrantes_To
	EndIf
	If not (&TFPrensadoResultadoObservaciones_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observaciones")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoResultadoObservaciones_Sel)
	Else
		If not (&TFPrensadoResultadoObservaciones.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observaciones")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoResultadoObservaciones)
		EndIf
	EndIf
	If not (&TFPrensadoResultadoRPMLinea_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "RPM Linea")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoResultadoRPMLinea_Sel)
	Else
		If not (&TFPrensadoResultadoRPMLinea.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "RPM Linea")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoResultadoRPMLinea)
		EndIf
	EndIf
	If not (&TFPrensadoResultadoGPMPrensa.IsEmpty() AND &TFPrensadoResultadoGPMPrensa_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "GPM Prensa")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoResultadoGPMPrensa
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoResultadoGPMPrensa_To
	EndIf
	If not (&TFPrensadoResultadoGPMTotal.IsEmpty() AND &TFPrensadoResultadoGPMTotal_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "GPM Total")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoResultadoGPMTotal
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoResultadoGPMTotal_To
	EndIf
	If not (&TFPrensadoResultadoHerramientas_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Utensilios / Herramientas")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoResultadoHerramientas_Sel)
	Else
		If not (&TFPrensadoResultadoHerramientas.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Utensilios / Herramientas")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoResultadoHerramientas)
		EndIf
	EndIf
	If not (&TFPrensadoLevasUnidadMedida_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas UM")
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
	If not (&TFPrensadoLevasKgEntrada.IsEmpty() AND &TFPrensadoLevasKgEntrada_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas Entrada (Kg)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoLevasKgEntrada
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoLevasKgEntrada_To
	EndIf
	If not (&TFPrensadoLevasKgSalida.IsEmpty() AND &TFPrensadoLevasKgSalida_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas Salida (Kg)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoLevasKgSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoLevasKgSalida_To
	EndIf
	If not (&TFPrensadoLevasGradosEntrada.IsEmpty() AND &TFPrensadoLevasGradosEntrada_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas Entrada (Grados)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoLevasGradosEntrada
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoLevasGradosEntrada_To
	EndIf
	If not (&TFPrensadoLevasGradosSalida.IsEmpty() AND &TFPrensadoLevasGradosSalida_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Levas Salida (Grados)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoLevasGradosSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoLevasGradosSalida_To
	EndIf
	If not (&TFPrensadoRodillosUnidadMedida_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos UM")
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
	If not (&TFPrensadoRodillosKgEntrada.IsEmpty() AND &TFPrensadoRodillosKgEntrada_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Entrada (Kg)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoRodillosKgEntrada
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosKgEntrada_To
	EndIf
	If not (&TFPrensadoRodillosKgSalida.IsEmpty() AND &TFPrensadoRodillosKgSalida_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Salida (Kg)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoRodillosKgSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosKgSalida_To
	EndIf
	If not (&TFPrensadoRodillosGradosEntrada.IsEmpty() AND &TFPrensadoRodillosGradosEntrada_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Entrada (Grados)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoRodillosGradosEntrada
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosGradosEntrada_To
	EndIf
	If not (&TFPrensadoRodillosGradosSalida.IsEmpty() AND &TFPrensadoRodillosGradosSalida_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Salida (Grados)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoRodillosGradosSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosGradosSalida_To
	EndIf
	If not (&TFPrensadoFecha.IsEmpty() AND &TFPrensadoFecha_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPrensadoFecha
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPrensadoFecha_To
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
	If not (&TFPrensadoPrensaNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoPrensaNombre_Sel)
	Else
		If not (&TFPrensadoPrensaNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoPrensaNombre)
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
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'Reportes.vwPrensadoResultadoColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'Reportes.vwPrensadoResultadoColumnsSelector')
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

	For each DB.PrensadoResultado
		order PrensadoResultadoPiezasBuenas  when &OrderedBy = 1 AND &OrderedDsc = False
		order (PrensadoResultadoPiezasBuenas)  when &OrderedBy = 1 AND &OrderedDsc = True
		order PrensadoResultadoPiezasMolino  when &OrderedBy = 2 AND &OrderedDsc = False
		order (PrensadoResultadoPiezasMolino)  when &OrderedBy = 2 AND &OrderedDsc = True
		order PrensadoResultadoMermaKg  when &OrderedBy = 3 AND &OrderedDsc = False
		order (GeneXusSecurity.PrensadoResultadoMermaKg)  when &OrderedBy = 3 AND &OrderedDsc = True
		order PrensadoResultadoNoPalets  when &OrderedBy = 4 AND &OrderedDsc = False
		order (PrensadoResultadoNoPalets)  when &OrderedBy = 4 AND &OrderedDsc = True
		order PrensadoResultadoCarretesSobrantes  when &OrderedBy = 5 AND &OrderedDsc = False
		order (PrensadoResultadoCarretesSobrantes)  when &OrderedBy = 5 AND &OrderedDsc = True
		order PrensadoResultadoObservaciones  when &OrderedBy = 6 AND &OrderedDsc = False
		order (PrensadoResultadoObservaciones)  when &OrderedBy = 6 AND &OrderedDsc = True
		order PrensadoResultadoRPMLinea  when &OrderedBy = 7 AND &OrderedDsc = False
		order (PrensadoResultadoRPMLinea)  when &OrderedBy = 7 AND &OrderedDsc = True
		order PrensadoResultadoGPMPrensa  when &OrderedBy = 8 AND &OrderedDsc = False
		order (PrensadoResultadoGPMPrensa)  when &OrderedBy = 8 AND &OrderedDsc = True
		order PrensadoResultadoGPMTotal  when &OrderedBy = 9 AND &OrderedDsc = False
		order (PrensadoResultadoGPMTotal)  when &OrderedBy = 9 AND &OrderedDsc = True
		order PrensadoResultadoHerramientas  when &OrderedBy = 10 AND &OrderedDsc = False
		order (PrensadoResultadoHerramientas)  when &OrderedBy = 10 AND &OrderedDsc = True
		order PrensadoLevasUnidadMedida  when &OrderedBy = 11 AND &OrderedDsc = False
		order (PrensadoLevasUnidadMedida)  when &OrderedBy = 11 AND &OrderedDsc = True
		order PrensadoLevasKgEntrada  when &OrderedBy = 12 AND &OrderedDsc = False
		order (PrensadoLevasKgEntrada)  when &OrderedBy = 12 AND &OrderedDsc = True
		order PrensadoLevasKgSalida  when &OrderedBy = 13 AND &OrderedDsc = False
		order (PrensadoLevasKgSalida)  when &OrderedBy = 13 AND &OrderedDsc = True
		order PrensadoLevasGradosEntrada  when &OrderedBy = 14 AND &OrderedDsc = False
		order (PrensadoLevasGradosEntrada)  when &OrderedBy = 14 AND &OrderedDsc = True
		order PrensadoLevasGradosSalida  when &OrderedBy = 15 AND &OrderedDsc = False
		order (PrensadoLevasGradosSalida)  when &OrderedBy = 15 AND &OrderedDsc = True
		order PrensadoRodillosUnidadMedida  when &OrderedBy = 16 AND &OrderedDsc = False
		order (PrensadoRodillosUnidadMedida)  when &OrderedBy = 16 AND &OrderedDsc = True
		order PrensadoRodillosKgEntrada  when &OrderedBy = 17 AND &OrderedDsc = False
		order (GeneXusSecurity.PrensadoRodillosKgEntrada)  when &OrderedBy = 17 AND &OrderedDsc = True
		order PrensadoRodillosKgSalida  when &OrderedBy = 18 AND &OrderedDsc = False
		order (DB.PrensadoRodillosKgSalida)  when &OrderedBy = 18 AND &OrderedDsc = True
		order PrensadoRodillosGradosEntrada  when &OrderedBy = 19 AND &OrderedDsc = False
		order (PrensadoRodillosGradosEntrada)  when &OrderedBy = 19 AND &OrderedDsc = True
		order PrensadoRodillosGradosSalida  when &OrderedBy = 20 AND &OrderedDsc = False
		order (PrensadoRodillosGradosSalida)  when &OrderedBy = 20 AND &OrderedDsc = True
		order PrensadoFecha  when &OrderedBy = 21 AND &OrderedDsc = False
		order (PrensadoFecha)  when &OrderedBy = 21 AND &OrderedDsc = True
		order PrensadoTurnoNombre  when &OrderedBy = 22 AND &OrderedDsc = False
		order (PrensadoTurnoNombre)  when &OrderedBy = 22 AND &OrderedDsc = True
		order PrensadoPrensaNombre  when &OrderedBy = 23 AND &OrderedDsc = False
		order (PrensadoPrensaNombre)  when &OrderedBy = 23 AND &OrderedDsc = True
		order PrensadoOperadorNombre  when &OrderedBy = 24 AND &OrderedDsc = False
		order (PrensadoOperadorNombre)  when &OrderedBy = 24 AND &OrderedDsc = True
		
		using Reportes.vwPrensadoResultadoDS(&FilterFullText, &TFPrensadoResultadoPiezasBuenas, &TFPrensadoResultadoPiezasBuenas_To, &TFPrensadoResultadoPiezasMolino, &TFPrensadoResultadoPiezasMolino_To, &TFPrensadoResultadoMermaKg
					, &TFPrensadoResultadoMermaKg_To, &TFPrensadoResultadoNoPalets, &TFPrensadoResultadoNoPalets_To, &TFPrensadoResultadoCarretesSobrantes, &TFPrensadoResultadoCarretesSobrantes_To, &TFPrensadoResultadoObservaciones
					, &TFPrensadoResultadoObservaciones_Sel, &TFPrensadoResultadoRPMLinea, &TFPrensadoResultadoRPMLinea_Sel, &TFPrensadoResultadoGPMPrensa, &TFPrensadoResultadoGPMPrensa_To, &TFPrensadoResultadoGPMTotal
					, &TFPrensadoResultadoGPMTotal_To, &TFPrensadoResultadoHerramientas, &TFPrensadoResultadoHerramientas_Sel, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada
					, &TFPrensadoRodillosGradosEntrada_To, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel)

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoPiezasBuenas'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoResultadoPiezasBuenas
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoPiezasMolino'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoResultadoPiezasMolino
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoMermaKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoResultadoMermaKg
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoNoPalets'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoResultadoNoPalets
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoCarretesSobrantes'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoResultadoCarretesSobrantes
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoObservaciones'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoResultadoObservaciones)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoRPMLinea'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoResultadoRPMLinea)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoGPMPrensa'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoResultadoGPMPrensa
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoGPMTotal'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoResultadoGPMTotal
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoHerramientas'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoResultadoHerramientas)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasUnidadMedida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PrensadoLevasUnidadMedida.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasKgEntrada'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoLevasKgEntrada
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasKgSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoLevasKgSalida
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasGradosEntrada'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoLevasGradosEntrada
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoLevasGradosSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoLevasGradosSalida
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosUnidadMedida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PrensadoRodillosUnidadMedida.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosKgEntrada'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoRodillosKgEntrada
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosKgSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoRodillosKgSalida
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosGradosEntrada'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoRodillosGradosEntrada
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosGradosSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoRodillosGradosSalida
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoFecha'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PrensadoFecha
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoTurnoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoTurnoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoPrensaNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoPrensaNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoOperadorNombre)
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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoPiezasBuenas", '', !'Piezas Buenas', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoPiezasMolino", '', !'Piezas Molino', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoMermaKg", '', !'Merma Kg', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoNoPalets", '', !'No Palets', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoCarretesSobrantes", '', !'Carretes Sobrantes', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoObservaciones", '', !'Observaciones', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoRPMLinea", '', !'RPM Linea', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoGPMPrensa", '', !'GPM Prensa', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoGPMTotal", '', !'GPM Total', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoHerramientas", '', !'Utensilios / Herramientas', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasUnidadMedida", '', !'Levas UM', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasKgEntrada", '', !'Levas Entrada (Kg)', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasKgSalida", '', !'Levas Salida (Kg)', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasGradosEntrada", '', !'Levas Entrada (Grados)', False, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasGradosSalida", '', !'Levas Salida (Grados)', False, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosUnidadMedida", '', !'Rodillos UM', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosKgEntrada", '', !'Rodillos Entrada (Kg)', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosKgSalida", '', !'Rodillos Salida (Kg)', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosGradosEntrada", '', !'Rodillos Entrada (Grados)', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosGradosSalida", '', !'Rodillos Salida (Grados)', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoFecha", '', !'Fecha', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoTurnoNombre", '', !'Turno', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoPrensaNombre", '', !'Prensa', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoOperadorNombre", '', !'Operador', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'Reportes.vwPrensadoResultadoColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Reportes.vwPrensadoResultadoGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Reportes.vwPrensadoResultadoGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Reportes.vwPrensadoResultadoGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOPIEZASBUENAS"
				&TFPrensadoResultadoPiezasBuenas.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoPiezasBuenas_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOPIEZASMOLINO"
				&TFPrensadoResultadoPiezasMolino.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoPiezasMolino_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOMERMAKG"
				&TFPrensadoResultadoMermaKg.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoMermaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADONOPALETS"
				&TFPrensadoResultadoNoPalets.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoNoPalets_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOCARRETESSOBRANTES"
				&TFPrensadoResultadoCarretesSobrantes.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoCarretesSobrantes_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOOBSERVACIONES"
				&TFPrensadoResultadoObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOOBSERVACIONES_SEL"
				&TFPrensadoResultadoObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADORPMLINEA"
				&TFPrensadoResultadoRPMLinea.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADORPMLINEA_SEL"
				&TFPrensadoResultadoRPMLinea_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOGPMPRENSA"
				&TFPrensadoResultadoGPMPrensa.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoGPMPrensa_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOGPMTOTAL"
				&TFPrensadoResultadoGPMTotal.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoGPMTotal_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOHERRAMIENTAS"
				&TFPrensadoResultadoHerramientas.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOHERRAMIENTAS_SEL"
				&TFPrensadoResultadoHerramientas_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOLEVASUNIDADMEDIDA_SEL"
				&TFPrensadoLevasUnidadMedida_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoLevasUnidadMedida_Sels.FromJson(&TFPrensadoLevasUnidadMedida_SelsJson)
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
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSUNIDADMEDIDA_SEL"
				&TFPrensadoRodillosUnidadMedida_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoRodillosUnidadMedida_Sels.FromJson(&TFPrensadoRodillosUnidadMedida_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSKGENTRADA"
				&TFPrensadoRodillosKgEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosKgEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSKGSALIDA"
				&TFPrensadoRodillosKgSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosKgSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSGRADOSENTRADA"
				&TFPrensadoRodillosGradosEntrada.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosGradosEntrada_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSGRADOSSALIDA"
				&TFPrensadoRodillosGradosSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosGradosSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOFECHA"
				&TFPrensadoFecha.FromString(&GridStateFilterValue.Value)
				&TFPrensadoFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE"
				&TFPrensadoTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE_SEL"
				&TFPrensadoTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE"
				&TFPrensadoPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE_SEL"
				&TFPrensadoPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE"
				&TFPrensadoOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE_SEL"
				&TFPrensadoOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
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

