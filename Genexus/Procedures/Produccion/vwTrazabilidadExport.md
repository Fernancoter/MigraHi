# Procedure: vwTrazabilidadExport

- **Module:** Produccion
- **Description:** vw Trazabilidad Export
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
| TFInicioPBPrensaNombre | Variable | VARCHAR |  | TFInicio PBPrensa Nombre |
| TFInicioPBPrensaNombre_Sel | Variable | VARCHAR |  | TFInicio PBPrensa Nombre_Sel |
| TFPrensadoProductoNombre | Variable | VARCHAR |  | TFPrensado Producto Nombre |
| TFPrensadoProductoNombre_Sel | Variable | VARCHAR |  | TFPrensado Producto Nombre_Sel |
| TFCarreraNo | Variable | NUMERIC |  | TFCarrera No |
| TFCarreraNo_To | Variable | NUMERIC |  | TFCarrera No_To |
| TFCarreteNoLinea | Variable | NUMERIC |  | TFCarrete No Linea |
| TFCarreteNoLinea_To | Variable | NUMERIC |  | TFCarrete No Linea_To |
| TFCarreraFechaRegistro | Variable | DATETIME |  | TFCarrera Fecha Registro |
| TFCarreraFechaRegistro_To | Variable | DATETIME |  | TFCarrera Fecha Registro_To |
| TFCarreraFechaValidacion | Variable | DATETIME |  | TFCarrera Fecha Validacion |
| TFCarreraFechaValidacion_To | Variable | DATETIME |  | TFCarrera Fecha Validacion_To |
| TFCarreteId | Variable | NUMERIC |  | TFCarrete Id |
| TFCarreteId_To | Variable | NUMERIC |  | TFCarrete Id_To |
| TFPaletNoSerie | Variable | VARCHAR |  | TFPalet No Serie |
| TFPaletNoSerie_Sel | Variable | VARCHAR |  | TFPalet No Serie_Sel |
| TFPaletNo | Variable | NUMERIC |  | TFPalet No |
| TFPaletNo_To | Variable | NUMERIC |  | TFPalet No_To |
| TFPaletHoraInicioEnsamble | Variable | DATETIME |  | TFPalet Hora Inicio Ensamble |
| TFPaletHoraInicioEnsamble_To | Variable | DATETIME |  | TFPalet Hora Inicio Ensamble_To |
| TFPaletHoraFinEnsamble | Variable | DATETIME |  | TFPalet Hora Fin Ensamble |
| TFPaletHoraFinEnsamble_To | Variable | DATETIME |  | TFPalet Hora Fin Ensamble_To |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFPaletEstatus_SelsJson | Variable | LONGVARCHAR |  | TFPalet Estatus_Sels Json |
| TFPaletEstatus_Sels | Variable | VARCHAR |  | TFPalet Estatus_Sels |
| TFPaletEstatus_Sel | Variable | VARCHAR |  | TFPalet Estatus_Sel |
| TFCarreteNoSerie | Variable | VARCHAR |  | TFCarrete No Serie |
| TFCarreteNoSerie_Sel | Variable | VARCHAR |  | TFCarrete No Serie_Sel |
| TFInicioPrensadoBobinaNoSerie | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie |
| TFInicioPrensadoBobinaNoSerie_Sel | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie_Sel |
| TFInicioPrensadoBobinaNo | Variable | NUMERIC |  | TFInicio Prensado Bobina No |
| TFInicioPrensadoBobinaNo_To | Variable | NUMERIC |  | TFInicio Prensado Bobina No_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionHoraIniciaProceso | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso |
| TFExtrusionHoraIniciaProceso_To | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso_To |
| TFExtrusionHoraFinProceso | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso |
| TFExtrusionHoraFinProceso_To | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso_To |
| i | Variable | NUMERIC |  | i |
| TFInicioPrensadoBobinaReposo | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo |
| TFInicioPrensadoBobinaReposo_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo_To |
| TFInicioPrensadoBobinaReposoHoras | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas |
| TFInicioPrensadoBobinaReposoHoras_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas_To |
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
	&Filename = !"vwTrazabilidadExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFInicioPBPrensaNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFInicioPBPrensaNombre_Sel)
	Else
		If not (&TFInicioPBPrensaNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFInicioPBPrensaNombre)
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
	If not (&TFCarreraNo.IsEmpty() AND &TFCarreraNo_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrera")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFCarreraNo
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFCarreraNo_To
	EndIf
	If not (&TFCarreteNoLinea.IsEmpty() AND &TFCarreteNoLinea_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Línea")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFCarreteNoLinea
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFCarreteNoLinea_To
	EndIf
	If not (&TFCarreraFechaRegistro.IsEmpty() AND &TFCarreraFechaRegistro_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha de Registro")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFCarreraFechaRegistro
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFCarreraFechaRegistro_To
	EndIf
	If not (&TFCarreraFechaValidacion.IsEmpty() AND &TFCarreraFechaValidacion_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha Validación")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFCarreraFechaValidacion
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFCarreraFechaValidacion_To
	EndIf
	If not (&TFCarreteId.IsEmpty() AND &TFCarreteId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrete")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFCarreteId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFCarreteId_To
	EndIf
	If not (&TFPaletNoSerie_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Pallet")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletNoSerie_Sel)
	Else
		If not (&TFPaletNoSerie.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Pallet")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPaletNoSerie)
		EndIf
	EndIf
	If not (&TFPaletNo.IsEmpty() AND &TFPaletNo_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "N° de Pallet")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPaletNo
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPaletNo_To
	EndIf
	If not (&TFPaletHoraInicioEnsamble.IsEmpty() AND &TFPaletHoraInicioEnsamble_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Pallet H. Ini. Ensamble")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPaletHoraInicioEnsamble
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPaletHoraInicioEnsamble_To
	EndIf
	If not (&TFPaletHoraFinEnsamble.IsEmpty() AND &TFPaletHoraFinEnsamble_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Pallet H. Fin. Ensamble")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPaletHoraFinEnsamble
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPaletHoraFinEnsamble_To
	EndIf
	If not (&TFPrensadoOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador de Prensa")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoOperadorNombre_Sel)
	Else
		If not (&TFPrensadoOperadorNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador de Prensa")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoOperadorNombre)
		EndIf
	EndIf
	If not (&TFPaletEstatus_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Estatus del Pallet")
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
	If not (&TFCarreteNoSerie_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrete No Serie")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarreteNoSerie_Sel)
	Else
		If not (&TFCarreteNoSerie.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrete No Serie")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarreteNoSerie)
		EndIf
	EndIf
	If not (&TFInicioPrensadoBobinaNoSerie_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFInicioPrensadoBobinaNoSerie_Sel)
	Else
		If not (&TFInicioPrensadoBobinaNoSerie.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFInicioPrensadoBobinaNoSerie)
		EndIf
	EndIf
	If not (&TFInicioPrensadoBobinaNo.IsEmpty() AND &TFInicioPrensadoBobinaNo_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "N° de Bobina")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFInicioPrensadoBobinaNo
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFInicioPrensadoBobinaNo_To
	EndIf
	If not (&TFInicioPrensadoBobinaReposoHoras.IsEmpty() AND &TFInicioPrensadoBobinaReposoHoras_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Reposo (Hr)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFInicioPrensadoBobinaReposoHoras
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFInicioPrensadoBobinaReposoHoras_To
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
	If not (&TFExtrusionOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador de la Extrusión")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionOperadorNombre_Sel)
	Else
		If not (&TFExtrusionOperadorNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador de la Extrusión")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionOperadorNombre)
		EndIf
	EndIf
	If not (&TFExtrusionHoraIniciaProceso.IsEmpty() AND &TFExtrusionHoraIniciaProceso_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Hr. Ini. Extrusión")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFExtrusionHoraIniciaProceso
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFExtrusionHoraIniciaProceso_To
	EndIf
	If not (&TFExtrusionHoraFinProceso.IsEmpty() AND &TFExtrusionHoraFinProceso_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Hr. Fin. Extrusión")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFExtrusionHoraFinProceso
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFExtrusionHoraFinProceso_To
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'Produccion.vwTrazabilidadColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'Produccion.vwTrazabilidadColumnsSelector')
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

	For each DB.PaletCarrete
		order PaletCarreteId  when &OrderedBy = 1
		order InicioPBPrensaNombre  when &OrderedBy = 2 AND &OrderedDsc = False
		order (InicioPBPrensaNombre)  when &OrderedBy = 2 AND &OrderedDsc = True
		order PrensadoProductoNombre  when &OrderedBy = 3 AND &OrderedDsc = False
		order (PrensadoProductoNombre)  when &OrderedBy = 3 AND &OrderedDsc = True
		order CarreraNo  when &OrderedBy = 4 AND &OrderedDsc = False
		order (CarreraNo)  when &OrderedBy = 4 AND &OrderedDsc = True
		order CarreteNoLinea  when &OrderedBy = 5 AND &OrderedDsc = False
		order (CarreteNoLinea)  when &OrderedBy = 5 AND &OrderedDsc = True
		order CarreraFechaRegistro  when &OrderedBy = 6 AND &OrderedDsc = False
		order (CarreraFechaRegistro)  when &OrderedBy = 6 AND &OrderedDsc = True
		order CarreraFechaValidacion  when &OrderedBy = 7 AND &OrderedDsc = False
		order (CarreraFechaValidacion)  when &OrderedBy = 7 AND &OrderedDsc = True
		order CarreteId  when &OrderedBy = 8 AND &OrderedDsc = False
		order (CarreteId)  when &OrderedBy = 8 AND &OrderedDsc = True
		order PaletNoSerie  when &OrderedBy = 9 AND &OrderedDsc = False
		order (PaletNoSerie)  when &OrderedBy = 9 AND &OrderedDsc = True
		order PaletNo  when &OrderedBy = 10 AND &OrderedDsc = False
		order (PaletNo)  when &OrderedBy = 10 AND &OrderedDsc = True
		order PaletHoraInicioEnsamble  when &OrderedBy = 11 AND &OrderedDsc = False
		order (PaletHoraInicioEnsamble)  when &OrderedBy = 11 AND &OrderedDsc = True
		order PaletHoraFinEnsamble  when &OrderedBy = 12 AND &OrderedDsc = False
		order (PaletHoraFinEnsamble)  when &OrderedBy = 12 AND &OrderedDsc = True
		order PrensadoOperadorNombre  when &OrderedBy = 13 AND &OrderedDsc = False
		order (PrensadoOperadorNombre)  when &OrderedBy = 13 AND &OrderedDsc = True
		order PaletEstatus  when &OrderedBy = 14 AND &OrderedDsc = False
		order (PaletEstatus)  when &OrderedBy = 14 AND &OrderedDsc = True
		order CarreteNoSerie  when &OrderedBy = 15 AND &OrderedDsc = False
		order (CarreteNoSerie)  when &OrderedBy = 15 AND &OrderedDsc = True
		order InicioPrensadoBobinaNoSerie  when &OrderedBy = 16 AND &OrderedDsc = False
		order (InicioPrensadoBobinaNoSerie)  when &OrderedBy = 16 AND &OrderedDsc = True
		order InicioPrensadoBobinaNo  when &OrderedBy = 17 AND &OrderedDsc = False
		order (InicioPrensadoBobinaNo)  when &OrderedBy = 17 AND &OrderedDsc = True
		order InicioPrensadoBobinaReposoHoras  when &OrderedBy = 18 AND &OrderedDsc = False
		order (InicioPrensadoBobinaReposoHoras)  when &OrderedBy = 18 AND &OrderedDsc = True
		order ExtrusionExtrusoraNombre  when &OrderedBy = 19 AND &OrderedDsc = False
		order (ExtrusionExtrusoraNombre)  when &OrderedBy = 19 AND &OrderedDsc = True
		order ExtrusionOperadorNombre  when &OrderedBy = 20 AND &OrderedDsc = False
		order (ExtrusionOperadorNombre)  when &OrderedBy = 20 AND &OrderedDsc = True
		order ExtrusionHoraIniciaProceso  when &OrderedBy = 21 AND &OrderedDsc = False
		order (ExtrusionHoraIniciaProceso)  when &OrderedBy = 21 AND &OrderedDsc = True
		order ExtrusionHoraFinProceso  when &OrderedBy = 22 AND &OrderedDsc = False
		order (ExtrusionHoraFinProceso)  when &OrderedBy = 22 AND &OrderedDsc = True
		
		using vwTrazabilidadDS(&FilterFullText, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFCarreraNo
					, &TFCarreraNo_To, &TFCarreteNoLinea, &TFCarreteNoLinea_To, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFCarreraFechaValidacion
					, &TFCarreraFechaValidacion_To, &TFCarreteId, &TFCarreteId_To, &TFPaletNoSerie, &TFPaletNoSerie_Sel, &TFPaletNo
					, &TFPaletNo_To, &TFPaletHoraInicioEnsamble, &TFPaletHoraInicioEnsamble_To, &TFPaletHoraFinEnsamble, &TFPaletHoraFinEnsamble_To, &TFPrensadoOperadorNombre
					, &TFPrensadoOperadorNombre_Sel, &TFPaletEstatus_Sels, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel
					, &TFInicioPrensadoBobinaNo, &TFInicioPrensadoBobinaNo_To, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel
					, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'InicioPBPrensaNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(InicioPBPrensaNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoProductoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoProductoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'CarreraNo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = CarreraNo
					Case &ColumnsSelector_Column.ColumnName = !'CarreteNoLinea'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = CarreteNoLinea
					Case &ColumnsSelector_Column.ColumnName = !'CarreraFechaRegistro'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = CarreraFechaRegistro
					Case &ColumnsSelector_Column.ColumnName = !'CarreraFechaValidacion'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = CarreraFechaValidacion
					Case &ColumnsSelector_Column.ColumnName = !'CarreteId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = CarreteId
					Case &ColumnsSelector_Column.ColumnName = !'PaletNoSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PaletNoSerie)
					Case &ColumnsSelector_Column.ColumnName = !'PaletNo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PaletNo
					Case &ColumnsSelector_Column.ColumnName = !'PaletHoraInicioEnsamble'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PaletHoraInicioEnsamble
					Case &ColumnsSelector_Column.ColumnName = !'PaletHoraFinEnsamble'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PaletHoraFinEnsamble
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PaletEstatus'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PaletEstatus.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'CarreteNoSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(CarreteNoSerie)
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaNoSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(InicioPrensadoBobinaNoSerie)
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaNo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = InicioPrensadoBobinaNo
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaReposoHoras'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = InicioPrensadoBobinaReposoHoras
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionExtrusoraNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionExtrusoraNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionHoraIniciaProceso'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = ExtrusionHoraIniciaProceso
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionHoraFinProceso'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = ExtrusionHoraFinProceso
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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPBPrensaNombre", '', !'Prensa', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoProductoNombre", '', !'Producto', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreraNo", '', !'Carrera', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteNoLinea", '', !'Línea', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreraFechaRegistro", '', !'Fecha de Registro', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreraFechaValidacion", '', !'Fecha Validación', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteId", '', !'Carrete', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletNoSerie", '', !'Pallet', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletNo", '', !'N° de Pallet', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletHoraInicioEnsamble", '', !'Pallet H. Ini. Ensamble', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletHoraFinEnsamble", '', !'Pallet H. Fin. Ensamble', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoOperadorNombre", '', !'Operador de Prensa', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PaletEstatus", '', !'Estatus del Pallet', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteNoSerie", '', !'Carrete No Serie', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaNoSerie", '', !'Bobina', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaNo", '', !'N° de Bobina', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaReposoHoras", '', !'Bobina Reposo (Hr)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionExtrusoraNombre", '', !'Extrusora', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionOperadorNombre", '', !'Operador de la Extrusión', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionHoraIniciaProceso", '', !'Hr. Ini. Extrusión', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionHoraFinProceso", '', !'Hr. Fin. Extrusión', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'Produccion.vwTrazabilidadColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.vwTrazabilidadGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.vwTrazabilidadGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.vwTrazabilidadGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE"
				&TFInicioPBPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE_SEL"
				&TFInicioPBPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE"
				&TFPrensadoProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE_SEL"
				&TFPrensadoProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERANO"
				&TFCarreraNo.FromString(&GridStateFilterValue.Value)
				&TFCarreraNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETENOLINEA"
				&TFCarreteNoLinea.FromString(&GridStateFilterValue.Value)
				&TFCarreteNoLinea_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRERAFECHAREGISTRO"
				&TFCarreraFechaRegistro.FromString(&GridStateFilterValue.Value)
				&TFCarreraFechaRegistro_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRERAFECHAVALIDACION"
				&TFCarreraFechaValidacion.FromString(&GridStateFilterValue.Value)
				&TFCarreraFechaValidacion_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEID"
				&TFCarreteId.FromString(&GridStateFilterValue.Value)
				&TFCarreteId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETNOSERIE"
				&TFPaletNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETNOSERIE_SEL"
				&TFPaletNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETNO"
				&TFPaletNo.FromString(&GridStateFilterValue.Value)
				&TFPaletNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETHORAINICIOENSAMBLE"
				&TFPaletHoraInicioEnsamble.FromString(&GridStateFilterValue.Value)
				&TFPaletHoraInicioEnsamble_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALETHORAFINENSAMBLE"
				&TFPaletHoraFinEnsamble.FromString(&GridStateFilterValue.Value)
				&TFPaletHoraFinEnsamble_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE"
				&TFPrensadoOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE_SEL"
				&TFPrensadoOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPALETESTATUS_SEL"
				&TFPaletEstatus_SelsJson = &GridStateFilterValue.Value
				&TFPaletEstatus_Sels.FromJson(&TFPaletEstatus_SelsJson)
			Case &GridStateFilterValue.Name = !"TFCARRETENOSERIE"
				&TFCarreteNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETENOSERIE_SEL"
				&TFCarreteNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE"
				&TFInicioPrensadoBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE_SEL"
				&TFInicioPrensadoBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANO"
				&TFInicioPrensadoBobinaNo.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAREPOSOHORAS"
				&TFInicioPrensadoBobinaReposoHoras.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaReposoHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONHORAINICIAPROCESO"
				&TFExtrusionHoraIniciaProceso.FromString(&GridStateFilterValue.Value)
				&TFExtrusionHoraIniciaProceso_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONHORAFINPROCESO"
				&TFExtrusionHoraFinProceso.FromString(&GridStateFilterValue.Value)
				&TFExtrusionHoraFinProceso_To.FromString(&GridStateFilterValue.ValueTo)
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

