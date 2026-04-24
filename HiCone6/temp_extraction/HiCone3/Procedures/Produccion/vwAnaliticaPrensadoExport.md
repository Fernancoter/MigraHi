# Procedure: vwAnaliticaPrensadoExport

- **Module:** Produccion
- **Description:** vw Analitica Prensado Export
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
| TFPrensadoId | Variable | NUMERIC |  | TFPrensado Id |
| TFPrensadoId_To | Variable | NUMERIC |  | TFPrensado Id_To |
| TFPrensadoFecha | Variable | DATETIME |  | TFPrensado Fecha |
| TFPrensadoFecha_To | Variable | DATETIME |  | TFPrensado Fecha_To |
| TFPrensadoPrensaId | Variable | NUMERIC |  | TFPrensado Prensa Id |
| TFPrensadoPrensaId_To | Variable | NUMERIC |  | TFPrensado Prensa Id_To |
| TFPrensadoPrensaNombre | Variable | VARCHAR |  | TFPrensado Prensa Nombre |
| TFPrensadoPrensaNombre_Sel | Variable | VARCHAR |  | TFPrensado Prensa Nombre_Sel |
| TFPrensadoTurnoId | Variable | NUMERIC |  | TFPrensado Turno Id |
| TFPrensadoTurnoId_To | Variable | NUMERIC |  | TFPrensado Turno Id_To |
| TFPrensadoTurnoNombre | Variable | VARCHAR |  | TFPrensado Turno Nombre |
| TFPrensadoTurnoNombre_Sel | Variable | VARCHAR |  | TFPrensado Turno Nombre_Sel |
| TFPrensadoProductoId | Variable | NUMERIC |  | TFPrensado Producto Id |
| TFPrensadoProductoId_To | Variable | NUMERIC |  | TFPrensado Producto Id_To |
| TFPrensadoProductoNombre | Variable | VARCHAR |  | TFPrensado Producto Nombre |
| TFPrensadoProductoNombre_Sel | Variable | VARCHAR |  | TFPrensado Producto Nombre_Sel |
| TFPrensadoProductoTipoMaterial_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Producto Tipo Material_Sels Json |
| TFPrensadoProductoTipoMaterial_Sels | Variable | VARCHAR |  | TFPrensado Producto Tipo Material_Sels |
| TFPrensadoProductoTipoMaterial_Sel | Variable | VARCHAR |  | TFPrensado Producto Tipo Material_Sel |
| TFPrensadoOperadorId | Variable | NUMERIC |  | TFPrensado Operador Id |
| TFPrensadoOperadorId_To | Variable | NUMERIC |  | TFPrensado Operador Id_To |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFPrensadoOperadorGUID | Variable | CHARACTER |  | TFPrensado Operador GUID |
| TFPrensadoOperadorGUID_Sel | Variable | CHARACTER |  | TFPrensado Operador GUID_Sel |
| TFPrensadoBobinaMermaKg | Variable | NUMERIC |  | TFPrensado Bobina Merma Kg |
| TFPrensadoBobinaMermaKg_To | Variable | NUMERIC |  | TFPrensado Bobina Merma Kg_To |
| TFPrensadoEstado_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Estado_Sels Json |
| TFPrensadoEstado_Sels | Variable | VARCHAR |  | TFPrensado Estado_Sels |
| TFPrensadoEstado_Sel | Variable | VARCHAR |  | TFPrensado Estado_Sel |
| TFPrensadoLevasUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Levas Unidad Medida_Sels Json |
| TFPrensadoLevasUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sels |
| TFPrensadoLevasUnidadMedida_Sel | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sel |
| TFPrensadoRodillosUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels Json |
| TFPrensadoRodillosUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels |
| TFPrensadoRodillosUnidadMedida_Sel | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sel |
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
| TFPrensadoRodillosGradosSalida | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida |
| TFPrensadoRodillosGradosSalida_To | Variable | NUMERIC |  | TFPrensado Rodillos Grados Salida_To |
| TFPrensadoMotivoAnticipado | Variable | VARCHAR |  | TFPrensado Motivo Anticipado |
| TFPrensadoMotivoAnticipado_Sel | Variable | VARCHAR |  | TFPrensado Motivo Anticipado_Sel |
| TFPrensadoTroquelId | Variable | NUMERIC |  | TFPrensado Troquel Id |
| TFPrensadoTroquelId_To | Variable | NUMERIC |  | TFPrensado Troquel Id_To |
| TFPrensadoTroquelNombre | Variable | VARCHAR |  | TFPrensado Troquel Nombre |
| TFPrensadoTroquelNombre_Sel | Variable | VARCHAR |  | TFPrensado Troquel Nombre_Sel |
| TFPrensadoHoraIniciaProceso | Variable | DATETIME |  | TFPrensado Hora Inicia Proceso |
| TFPrensadoHoraIniciaProceso_To | Variable | DATETIME |  | TFPrensado Hora Inicia Proceso_To |
| TFPrensadoHoraFinProceso | Variable | DATETIME |  | TFPrensado Hora Fin Proceso |
| TFPrensadoHoraFinProceso_To | Variable | DATETIME |  | TFPrensado Hora Fin Proceso_To |
| TFPrensadoProductoDescripcion | Variable | VARCHAR |  | TFPrensado Producto Descripcion |
| TFPrensadoProductoDescripcion_Sel | Variable | VARCHAR |  | TFPrensado Producto Descripcion_Sel |
| TFPrensadoMeta | Variable | NUMERIC |  | TFPrensado Meta |
| TFPrensadoMeta_To | Variable | NUMERIC |  | TFPrensado Meta_To |
| TFPrensadoTotalPalets | Variable | NUMERIC |  | TFPrensado Total Palets |
| TFPrensadoTotalPalets_To | Variable | NUMERIC |  | TFPrensado Total Palets_To |
| TFPrensadoResultadoTotalPalets | Variable | NUMERIC |  | TFPrensado Resultado Total Palets |
| TFPrensadoResultadoTotalPalets_To | Variable | NUMERIC |  | TFPrensado Resultado Total Palets_To |
| i | Variable | NUMERIC |  | i |
| TFPrensadoTiempoInterrupcion | Variable | NUMERIC |  | TFPrensado Tiempo Interrupcion |
| TFPrensadoTiempoInterrupcion_To | Variable | NUMERIC |  | TFPrensado Tiempo Interrupcion_To |
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
	&Filename = !"vwAnaliticaPrensadoExport-" + &Random.ToString().Trim() + !".xlsx"

	&ExcelDocument.Open(&Filename)
	Do 'CheckStatus'
	&ExcelDocument.Clear()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteFilters'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	If not (&FilterFullText.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "WWP_FullTextFilterDescription")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&FilterFullText)
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
			WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa")
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
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoOperadorNombre_Sel)
	Else
		If not (&TFPrensadoOperadorNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoOperadorNombre)
		EndIf
	EndIf
	If not (&TFPrensadoTiempoInterrupcion.IsEmpty() AND &TFPrensadoTiempoInterrupcion_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Tiempo Interrupción (min)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoTiempoInterrupcion
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoTiempoInterrupcion_To
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
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosKgEntrada_To
	EndIf
	If not (&TFPrensadoRodillosKgSalida.IsEmpty() AND &TFPrensadoRodillosKgSalida_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Kg Salida")
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
	If not (&TFPrensadoRodillosGradosSalida.IsEmpty() AND &TFPrensadoRodillosGradosSalida_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rodillos Grados Salida")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoRodillosGradosSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoRodillosGradosSalida_To
	EndIf
	If not (&TFPrensadoTroquelNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Troquel")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoTroquelNombre_Sel)
	Else
		If not (&TFPrensadoTroquelNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Troquel")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoTroquelNombre)
		EndIf
	EndIf
	If not (&TFPrensadoHoraIniciaProceso.IsEmpty() AND &TFPrensadoHoraIniciaProceso_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Inicia Proceso")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPrensadoHoraIniciaProceso
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPrensadoHoraIniciaProceso_To
	EndIf
	If not (&TFPrensadoHoraFinProceso.IsEmpty() AND &TFPrensadoHoraFinProceso_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fin Proceso")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPrensadoHoraFinProceso
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPrensadoHoraFinProceso_To
	EndIf
	If not (&TFPrensadoResultadoTotalPalets.IsEmpty() AND &TFPrensadoResultadoTotalPalets_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Pallets")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoResultadoTotalPalets
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoResultadoTotalPalets_To
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'Produccion.vwAnaliticaPrensadoColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'Produccion.vwAnaliticaPrensadoColumnsSelector')
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

	For each DB.Prensado
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
		order PrensadoRodillosGradosSalida  when &OrderedBy = 16 AND &OrderedDsc = False
		order (PrensadoRodillosGradosSalida)  when &OrderedBy = 16 AND &OrderedDsc = True
		order PrensadoTroquelNombre  when &OrderedBy = 17 AND &OrderedDsc = False
		order (PrensadoTroquelNombre)  when &OrderedBy = 17 AND &OrderedDsc = True
		order PrensadoHoraIniciaProceso  when &OrderedBy = 18 AND &OrderedDsc = False
		order (PrensadoHoraIniciaProceso)  when &OrderedBy = 18 AND &OrderedDsc = True
		order PrensadoHoraFinProceso  when &OrderedBy = 19 AND &OrderedDsc = False
		order (PrensadoHoraFinProceso)  when &OrderedBy = 19 AND &OrderedDsc = True
		
		using vwAnaliticaPrensadoDS(&FilterFullText, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel, &TFPrensadoTiempoInterrupcion
					, &TFPrensadoTiempoInterrupcion_To, &TFPrensadoEstado_Sels, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada, &TFPrensadoRodillosGradosEntrada_To
					, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoTroquelNombre, &TFPrensadoTroquelNombre_Sel, &TFPrensadoHoraIniciaProceso, &TFPrensadoHoraIniciaProceso_To
					, &TFPrensadoHoraFinProceso, &TFPrensadoHoraFinProceso_To, &TFPrensadoResultadoTotalPalets, &TFPrensadoResultadoTotalPalets_To)
		Where PrensadoFecha>= &NowDate

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
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
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoTiempoInterrupcion'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoTiempoInterrupcion
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
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoRodillosGradosSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoRodillosGradosSalida
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoTroquelNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoTroquelNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoHoraIniciaProceso'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PrensadoHoraIniciaProceso
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoHoraFinProceso'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PrensadoHoraFinProceso
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoTotalPalets'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoResultadoTotalPalets
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
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoFecha", '', !'Fecha', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoPrensaNombre", '', !'Prensa', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoTurnoNombre", '', !'Turno', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoProductoNombre", '', !'Producto', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoOperadorNombre", '', !'Operador', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoTiempoInterrupcion", '', !'Tiempo Interrupción (min)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoEstado", '', !'Estado', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasUnidadMedida", '', !'U.M. Levas', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosUnidadMedida", '', !'U.M. Rodillos', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasKgEntrada", '', !'Levas Kg Entrada', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasKgSalida", '', !'Levas Kg Salida', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasGradosEntrada", '', !'Levas Grados Entrada', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoLevasGradosSalida", '', !'Levas Grados Salida', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosKgEntrada", '', !'Rodillos Kg Entrada', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosKgSalida", '', !'Rodillos Kg Salida', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosGradosEntrada", '', !'Rodillos Grados Entrada', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoRodillosGradosSalida", '', !'Rodillos Grados Salida', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoTroquelNombre", '', !'Troquel', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoHoraIniciaProceso", '', !'Inicia Proceso', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoHoraFinProceso", '', !'Fin Proceso', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoTotalPalets", '', !'Pallets', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'Produccion.vwAnaliticaPrensadoColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.vwAnaliticaPrensadoGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.vwAnaliticaPrensadoGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.vwAnaliticaPrensadoGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
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
			Case &GridStateFilterValue.Name = !"TFPRENSADOTIEMPOINTERRUPCION"
				&TFPrensadoTiempoInterrupcion.FromString(&GridStateFilterValue.Value)
				&TFPrensadoTiempoInterrupcion_To.FromString(&GridStateFilterValue.ValueTo)
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
			Case &GridStateFilterValue.Name = !"TFPRENSADORODILLOSGRADOSSALIDA"
				&TFPrensadoRodillosGradosSalida.FromString(&GridStateFilterValue.Value)
				&TFPrensadoRodillosGradosSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTROQUELNOMBRE"
				&TFPrensadoTroquelNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTROQUELNOMBRE_SEL"
				&TFPrensadoTroquelNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOHORAINICIAPROCESO"
				&TFPrensadoHoraIniciaProceso.FromString(&GridStateFilterValue.Value)
				&TFPrensadoHoraIniciaProceso_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOHORAFINPROCESO"
				&TFPrensadoHoraFinProceso.FromString(&GridStateFilterValue.Value)
				&TFPrensadoHoraFinProceso_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOTOTALPALETS"
				&TFPrensadoResultadoTotalPalets.FromString(&GridStateFilterValue.Value)
				&TFPrensadoResultadoTotalPalets_To.FromString(&GridStateFilterValue.ValueTo)
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

