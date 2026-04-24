# Procedure: vwAnaliticaCarreteExport

- **Module:** Produccion
- **Description:** vw Analitica Carrete Export
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
| TFCarreteId | Variable | NUMERIC |  | TFCarrete Id |
| TFCarreteId_To | Variable | NUMERIC |  | TFCarrete Id_To |
| TFCarreteNoLinea | Variable | NUMERIC |  | TFCarrete No Linea |
| TFCarreteNoLinea_To | Variable | NUMERIC |  | TFCarrete No Linea_To |
| TFCarreteNoSerie | Variable | VARCHAR |  | TFCarrete No Serie |
| TFCarreteNoSerie_Sel | Variable | VARCHAR |  | TFCarrete No Serie_Sel |
| TFCarreteEstado_SelsJson | Variable | LONGVARCHAR |  | TFCarrete Estado_Sels Json |
| TFCarreteEstado_Sels | Variable | VARCHAR |  | TFCarrete Estado_Sels |
| TFCarreteEstado_Sel | Variable | VARCHAR |  | TFCarrete Estado_Sel |
| TFCarreteEnMolino_Sel | Variable | NUMERIC |  | TFCarrete En Molino_Sel |
| TFCarreteMolino_SelsJson | Variable | LONGVARCHAR |  | TFCarrete Molino_Sels Json |
| TFCarreteMolino_Sels | Variable | VARCHAR |  | TFCarrete Molino_Sels |
| TFCarreteMolino_Sel | Variable | VARCHAR |  | TFCarrete Molino_Sel |
| TFCarreteMermaMolino_Sel | Variable | NUMERIC |  | TFCarrete Merma Molino_Sel |
| TFCarreteMermaKg | Variable | NUMERIC |  | TFCarrete Merma Kg |
| TFCarreteMermaKg_To | Variable | NUMERIC |  | TFCarrete Merma Kg_To |
| TFCarreteObservacion | Variable | VARCHAR |  | TFCarrete Observacion |
| TFCarreteObservacion_Sel | Variable | VARCHAR |  | TFCarrete Observacion_Sel |
| TFCarreteTerminaPalet_Sel | Variable | NUMERIC |  | TFCarrete Termina Palet_Sel |
| TFCarretePaletSerie | Variable | VARCHAR |  | TFCarrete Palet Serie |
| TFCarretePaletSerie_Sel | Variable | VARCHAR |  | TFCarrete Palet Serie_Sel |
| TFCarreteCarreraId | Variable | NUMERIC |  | TFCarrete Carrera Id |
| TFCarreteCarreraId_To | Variable | NUMERIC |  | TFCarrete Carrera Id_To |
| TFCarreraNo | Variable | NUMERIC |  | TFCarrera No |
| TFCarreraNo_To | Variable | NUMERIC |  | TFCarrera No_To |
| TFInicioPBPrensaNombre | Variable | VARCHAR |  | TFInicio PBPrensa Nombre |
| TFInicioPBPrensaNombre_Sel | Variable | VARCHAR |  | TFInicio PBPrensa Nombre_Sel |
| TFInicioPBTurnoNombre | Variable | VARCHAR |  | TFInicio PBTurno Nombre |
| TFInicioPBTurnoNombre_Sel | Variable | VARCHAR |  | TFInicio PBTurno Nombre_Sel |
| TFInicioPBOperadorNombre | Variable | VARCHAR |  | TFInicio PBOperador Nombre |
| TFInicioPBOperadorNombre_Sel | Variable | VARCHAR |  | TFInicio PBOperador Nombre_Sel |
| TFPrensadoResultadoObservaciones | Variable | VARCHAR |  | TFPrensado Resultado Observaciones |
| TFPrensadoResultadoObservaciones_Sel | Variable | VARCHAR |  | TFPrensado Resultado Observaciones_Sel |
| TFInicioPrensadoBobinaNoSerie | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie |
| TFInicioPrensadoBobinaNoSerie_Sel | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie_Sel |
| TFInicioPrensadoBobinaReposoHoras | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas |
| TFInicioPrensadoBobinaReposoHoras_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas_To |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionSiloMolidoNombre | Variable | VARCHAR |  | TFExtrusion Silo Molido Nombre |
| TFExtrusionSiloMolidoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Silo Molido Nombre_Sel |
| TFExtrusionSiloNombre | Variable | VARCHAR |  | TFExtrusion Silo Nombre |
| TFExtrusionSiloNombre_Sel | Variable | VARCHAR |  | TFExtrusion Silo Nombre_Sel |
| i | Variable | NUMERIC |  | i |
| TFCarreteCarreraTroquel | Variable | VARCHAR |  | TFCarrete Carrera Troquel |
| TFCarreteCarreraTroquel_Sel | Variable | VARCHAR |  | TFCarrete Carrera Troquel_Sel |
| TFCarreteCarreraFecha | Variable | DATETIME |  | TFCarrete Carrera Fecha |
| TFCarreteCarreraFecha_To | Variable | DATETIME |  | TFCarrete Carrera Fecha_To |
| TFInicioPBPrensadoFecha | Variable | DATETIME |  | TFInicio PBPrensado Fecha |
| TFInicioPBPrensadoFecha_To | Variable | DATETIME |  | TFInicio PBPrensado Fecha_To |
| NowDate | Variable | DATE |  | Now Date |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| TFCarreteCarreraFechaValidacion | Variable | DATETIME |  | TFCarrete Carrera Fecha Validacion |
| TFCarreteCarreraFechaValidacion_To | Variable | DATETIME |  | TFCarrete Carrera Fecha Validacion_To |
| TFExtrusionLoteSilo | Variable | VARCHAR |  | TFExtrusion Lote Silo |
| TFExtrusionLoteSilo_Sel | Variable | VARCHAR |  | TFExtrusion Lote Silo_Sel |
| TFExtrusionLotePaqueteAditivos_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sels Json |
| TFExtrusionLotePaqueteAditivos_Sel | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sel |
| TFExtrusionLotePaqueteAditivos_Sels | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sels |
| TFExtrusionLotePaqueteAditivos | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos |
| TFInicioPrensadoBobinaVirgenKg | Variable | NUMERIC |  | TFInicio Prensado Bobina Virgen Kg |
| TFInicioPrensadoBobinaVirgenKg_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Virgen Kg_To |
| TFInicioPrensadoBobinaMolinoKg | Variable | NUMERIC |  | TFInicio Prensado Bobina Molino Kg |
| TFInicioPrensadoBobinaMolinoKg_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Molino Kg_To |
| TFInicioPrensadoBobinaRevHusilloVirgen | Variable | NUMERIC |  | TFInicio Prensado Bobina Rev Husillo Virgen |
| TFInicioPrensadoBobinaRevHusilloVirgen_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Rev Husillo Virgen_To |
| TFInicioPrensadoBobinaRevHusilloMolino | Variable | NUMERIC |  | TFInicio Prensado Bobina Rev Husillo Molino |
| TFInicioPrensadoBobinaRevHusilloMolino_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Rev Husillo Molino_To |
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
	&Filename = !"vwAnaliticaCarreteExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFCarreteNoSerie_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrete")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarreteNoSerie_Sel)
	Else
		If not (&TFCarreteNoSerie.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrete")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarreteNoSerie)
		EndIf
	EndIf
	If not (&TFCarreteId.IsEmpty() AND &TFCarreteId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "CarreteId")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFCarreteId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFCarreteId_To
	EndIf
	If not (&TFCarreteNoLinea.IsEmpty() AND &TFCarreteNoLinea_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Línea")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFCarreteNoLinea
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFCarreteNoLinea_To
	EndIf
	If not (&TFCarreteEstado_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Estado")
		&i = 1
		For &TFCarreteEstado_Sel in &TFCarreteEstado_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFCarreteEstado_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFCarreteEnMolino_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "En Molino")
		Do Case
			Case &TFCarreteEnMolino_Sel = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSChecked"
			Case &TFCarreteEnMolino_Sel = 2
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSUnChecked"
		EndCase
	EndIf
	If not (&TFCarreteMolino_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Molino")
		&i = 1
		For &TFCarreteMolino_Sel in &TFCarreteMolino_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFCarreteMolino_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFCarreteObservacion_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observacion")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarreteObservacion_Sel)
	Else
		If not (&TFCarreteObservacion.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observacion")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarreteObservacion)
		EndIf
	EndIf
	If not (&TFCarreteTerminaPalet_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Termina Palet")
		Do Case
			Case &TFCarreteTerminaPalet_Sel = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSChecked"
			Case &TFCarreteTerminaPalet_Sel = 2
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSUnChecked"
		EndCase
	EndIf
	If not (&TFCarreteCarreraId.IsEmpty() AND &TFCarreteCarreraId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrera Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFCarreteCarreraId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFCarreteCarreraId_To
	EndIf
	If not (&TFCarreteMermaMolino_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Merma Molino")
		Do Case
			Case &TFCarreteMermaMolino_Sel = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSChecked"
			Case &TFCarreteMermaMolino_Sel = 2
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSUnChecked"
		EndCase
	EndIf
	If not (&TFCarreteMermaKg.IsEmpty() AND &TFCarreteMermaKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Merma Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFCarreteMermaKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFCarreteMermaKg_To
	EndIf
	If not (&TFCarretePaletSerie_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Palet Serie")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarretePaletSerie_Sel)
	Else
		If not (&TFCarretePaletSerie.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Palet Serie")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarretePaletSerie)
		EndIf
	EndIf
	If not (&TFCarreraNo.IsEmpty() AND &TFCarreraNo_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrera No")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFCarreraNo
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFCarreraNo_To
	EndIf
	If not (&TFInicioPBPrensadoFecha.IsEmpty() AND &TFInicioPBPrensadoFecha_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha Prensado")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFInicioPBPrensadoFecha
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFInicioPBPrensadoFecha_To
	EndIf
	If not (&TFCarreteCarreraTroquel_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Troquel")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarreteCarreraTroquel_Sel)
	Else
		If not (&TFCarreteCarreraTroquel.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Troquel")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFCarreteCarreraTroquel)
		EndIf
	EndIf
	If not (&TFCarreteCarreraFecha.IsEmpty() AND &TFCarreteCarreraFecha_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrete Fecha Inicio")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFCarreteCarreraFecha
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFCarreteCarreraFecha_To
	EndIf
	If not (&TFCarreteCarreraFechaValidacion.IsEmpty() AND &TFCarreteCarreraFechaValidacion_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Carrete Fecha Validación")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFCarreteCarreraFechaValidacion
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFCarreteCarreraFechaValidacion_To
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
	If not (&TFInicioPBTurnoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFInicioPBTurnoNombre_Sel)
	Else
		If not (&TFInicioPBTurnoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFInicioPBTurnoNombre)
		EndIf
	EndIf
	If not (&TFInicioPBOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador (Prensa)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFInicioPBOperadorNombre_Sel)
	Else
		If not (&TFInicioPBOperadorNombre.IsEmpty())
			WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador (Prensa)")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFInicioPBOperadorNombre)
		EndIf
	EndIf
	If not (&TFPrensadoResultadoObservaciones_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observaciones (Prensado)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoResultadoObservaciones_Sel)
	Else
		If not (&TFPrensadoResultadoObservaciones.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observaciones (Prensado)")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFPrensadoResultadoObservaciones)
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
	If not (&TFInicioPrensadoBobinaVirgenKg.IsEmpty() AND &TFInicioPrensadoBobinaVirgenKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Kg Virgen")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFInicioPrensadoBobinaVirgenKg
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFInicioPrensadoBobinaVirgenKg_To
	EndIf
	If not (&TFInicioPrensadoBobinaMolinoKg.IsEmpty() AND &TFInicioPrensadoBobinaMolinoKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Kg Molino")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFInicioPrensadoBobinaMolinoKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFInicioPrensadoBobinaMolinoKg_To
	EndIf
	If not (&TFInicioPrensadoBobinaRevHusilloVirgen.IsEmpty() AND &TFInicioPrensadoBobinaRevHusilloVirgen_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rev. Husillo Virgen")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFInicioPrensadoBobinaRevHusilloVirgen
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFInicioPrensadoBobinaRevHusilloVirgen_To
	EndIf
	If not (&TFInicioPrensadoBobinaRevHusilloMolino.IsEmpty() AND &TFInicioPrensadoBobinaRevHusilloMolino_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Rev. Husillo Molino")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFInicioPrensadoBobinaRevHusilloMolino
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFInicioPrensadoBobinaRevHusilloMolino_To
	EndIf
	If not (&TFInicioPrensadoBobinaReposoHoras.IsEmpty() AND &TFInicioPrensadoBobinaReposoHoras_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Reposo (Horas)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFInicioPrensadoBobinaReposoHoras
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFInicioPrensadoBobinaReposoHoras_To
	EndIf
	If not (&TFExtrusionOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador (Extrusora)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionOperadorNombre_Sel)
	Else
		If not (&TFExtrusionOperadorNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador (Extrusora)")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionOperadorNombre)
		EndIf
	EndIf
	If not (&TFExtrusionSiloMolidoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Molido")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionSiloMolidoNombre_Sel)
	Else
		If not (&TFExtrusionSiloMolidoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Molido")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionSiloMolidoNombre)
		EndIf
	EndIf
	If not (&TFExtrusionSiloNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Virgen")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionSiloNombre_Sel)
	Else
		If not (&TFExtrusionSiloNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Virgen")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionSiloNombre)
		EndIf
	EndIf
	If not (&TFExtrusionLoteSilo_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Lote Silo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLoteSilo_Sel)
	Else
		If not (&TFExtrusionLoteSilo.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Lote Silo")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionLoteSilo)
		EndIf
	EndIf
	If not (&TFExtrusionLotePaqueteAditivos_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Paquete Aditivos")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLotePaqueteAditivos_Sel)
	Else
		If not (&TFExtrusionLotePaqueteAditivos.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Paquete Aditivos")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionLotePaqueteAditivos)
		EndIf
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'Produccion.vwAnaliticaCarreteColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'Produccion.vwAnaliticaCarreteColumnsSelector')
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

	For each DB.Carrete
		order CarreteNoLinea  when &OrderedBy = 1 AND &OrderedDsc = False
		order (DB.CarreteNoLinea)  when &OrderedBy = 1 AND &OrderedDsc = True
		order CarreteNoSerie  when &OrderedBy = 2 AND &OrderedDsc = False
		order (CarreteNoSerie)  when &OrderedBy = 2 AND &OrderedDsc = True
		order CarreteId  when &OrderedBy = 3 AND &OrderedDsc = False
		order (CarreteId)  when &OrderedBy = 3 AND &OrderedDsc = True
		order CarreteEstado  when &OrderedBy = 4 AND &OrderedDsc = False
		order (CarreteEstado)  when &OrderedBy = 4 AND &OrderedDsc = True
		order CarreteEnMolino  when &OrderedBy = 5 AND &OrderedDsc = False
		order (CarreteEnMolino)  when &OrderedBy = 5 AND &OrderedDsc = True
		order CarreteMolino  when &OrderedBy = 6 AND &OrderedDsc = False
		order (CarreteMolino)  when &OrderedBy = 6 AND &OrderedDsc = True
		order CarreteObservacion  when &OrderedBy = 7 AND &OrderedDsc = False
		order (CarreteObservacion)  when &OrderedBy = 7 AND &OrderedDsc = True
		order CarreteTerminaPalet  when &OrderedBy = 8 AND &OrderedDsc = False
		order (CarreteTerminaPalet)  when &OrderedBy = 8 AND &OrderedDsc = True
		order CarreteCarreraId  when &OrderedBy = 9 AND &OrderedDsc = False
		order (DB.CarreteCarreraId)  when &OrderedBy = 9 AND &OrderedDsc = True
		order CarreteMermaMolino  when &OrderedBy = 10 AND &OrderedDsc = False
		order (CarreteMermaMolino)  when &OrderedBy = 10 AND &OrderedDsc = True
		order CarreteMermaKg  when &OrderedBy = 11 AND &OrderedDsc = False
		order (CarreteMermaKg)  when &OrderedBy = 11 AND &OrderedDsc = True
		order CarretePaletSerie  when &OrderedBy = 12 AND &OrderedDsc = False
		order (CarretePaletSerie)  when &OrderedBy = 12 AND &OrderedDsc = True
		order CarreraNo  when &OrderedBy = 13 AND &OrderedDsc = False
		order (CarreraNo)  when &OrderedBy = 13 AND &OrderedDsc = True
		order InicioPBPrensadoFecha  when &OrderedBy = 14 AND &OrderedDsc = False
		order (InicioPBPrensadoFecha)  when &OrderedBy = 14 AND &OrderedDsc = True
		order CarreteCarreraTroquel  when &OrderedBy = 15 AND &OrderedDsc = False
		order (CarreteCarreraTroquel)  when &OrderedBy = 15 AND &OrderedDsc = True
		order CarreteCarreraFecha  when &OrderedBy = 16 AND &OrderedDsc = False
		order (CarreteCarreraFecha)  when &OrderedBy = 16 AND &OrderedDsc = True
		order CarreteCarreraFechaValidacion  when &OrderedBy = 17 AND &OrderedDsc = False
		order (CarreteCarreraFechaValidacion)  when &OrderedBy = 17 AND &OrderedDsc = True
		order InicioPBPrensaNombre  when &OrderedBy = 18 AND &OrderedDsc = False
		order (InicioPBPrensaNombre)  when &OrderedBy = 18 AND &OrderedDsc = True
		order InicioPBTurnoNombre  when &OrderedBy = 19 AND &OrderedDsc = False
		order (InicioPBTurnoNombre)  when &OrderedBy = 19 AND &OrderedDsc = True
		order InicioPBOperadorNombre  when &OrderedBy = 20 AND &OrderedDsc = False
		order (InicioPBOperadorNombre)  when &OrderedBy = 20 AND &OrderedDsc = True
		order PrensadoResultadoObservaciones  when &OrderedBy = 21 AND &OrderedDsc = False
		order (PrensadoResultadoObservaciones)  when &OrderedBy = 21 AND &OrderedDsc = True
		order InicioPrensadoBobinaNoSerie  when &OrderedBy = 22 AND &OrderedDsc = False
		order (InicioPrensadoBobinaNoSerie)  when &OrderedBy = 22 AND &OrderedDsc = True
		order InicioPrensadoBobinaVirgenKg  when &OrderedBy = 23 AND &OrderedDsc = False
		order (InicioPrensadoBobinaVirgenKg)  when &OrderedBy = 23 AND &OrderedDsc = True
		order InicioPrensadoBobinaMolinoKg  when &OrderedBy = 24 AND &OrderedDsc = False
		order (InicioPrensadoBobinaMolinoKg)  when &OrderedBy = 24 AND &OrderedDsc = True
		order InicioPrensadoBobinaRevHusilloVirgen  when &OrderedBy = 25 AND &OrderedDsc = False
		order (InicioPrensadoBobinaRevHusilloVirgen)  when &OrderedBy = 25 AND &OrderedDsc = True
		order InicioPrensadoBobinaRevHusilloMolino  when &OrderedBy = 26 AND &OrderedDsc = False
		order (InicioPrensadoBobinaRevHusilloMolino)  when &OrderedBy = 26 AND &OrderedDsc = True
		order InicioPrensadoBobinaReposoHoras  when &OrderedBy = 27 AND &OrderedDsc = False
		order (InicioPrensadoBobinaReposoHoras)  when &OrderedBy = 27 AND &OrderedDsc = True
		order ExtrusionOperadorNombre  when &OrderedBy = 28 AND &OrderedDsc = False
		order (ExtrusionOperadorNombre)  when &OrderedBy = 28 AND &OrderedDsc = True
		order ExtrusionSiloMolidoNombre  when &OrderedBy = 29 AND &OrderedDsc = False
		order (ExtrusionSiloMolidoNombre)  when &OrderedBy = 29 AND &OrderedDsc = True
		order ExtrusionSiloNombre  when &OrderedBy = 30 AND &OrderedDsc = False
		order (ExtrusionSiloNombre)  when &OrderedBy = 30 AND &OrderedDsc = True
		order ExtrusionLoteSilo  when &OrderedBy = 31 AND &OrderedDsc = False
		order (ExtrusionLoteSilo)  when &OrderedBy = 31 AND &OrderedDsc = True
		order ExtrusionLotePaqueteAditivos  when &OrderedBy = 32 AND &OrderedDsc = False
		order (ExtrusionLotePaqueteAditivos)  when &OrderedBy = 32 AND &OrderedDsc = True
		
		using Produccion.vwAnaliticaCarreteDS(&FilterFullText, &TFCarreteNoSerie, &TFCarreteNoSerie_Sel, &TFCarreteId, &TFCarreteId_To, &TFCarreteNoLinea
					, &TFCarreteNoLinea_To, &TFCarreteEstado_Sels, &TFCarreteEnMolino_Sel, &TFCarreteMolino_Sels, &TFCarreteObservacion, &TFCarreteObservacion_Sel
					, &TFCarreteTerminaPalet_Sel, &TFCarreteCarreraId, &TFCarreteCarreraId_To, &TFCarreteMermaMolino_Sel, &TFCarreteMermaKg, &TFCarreteMermaKg_To
					, &TFCarretePaletSerie, &TFCarretePaletSerie_Sel, &TFCarreraNo, &TFCarreraNo_To, &TFInicioPBPrensadoFecha, &TFInicioPBPrensadoFecha_To
					, &TFCarreteCarreraTroquel, &TFCarreteCarreraTroquel_Sel, &TFCarreteCarreraFecha, &TFCarreteCarreraFecha_To, &TFCarreteCarreraFechaValidacion, &TFCarreteCarreraFechaValidacion_To
					, &TFInicioPBPrensaNombre, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPBOperadorNombre, &TFInicioPBOperadorNombre_Sel
					, &TFPrensadoResultadoObservaciones, &TFPrensadoResultadoObservaciones_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFInicioPrensadoBobinaVirgenKg, &TFInicioPrensadoBobinaVirgenKg_To
					, &TFInicioPrensadoBobinaMolinoKg, &TFInicioPrensadoBobinaMolinoKg_To, &TFInicioPrensadoBobinaRevHusilloVirgen, &TFInicioPrensadoBobinaRevHusilloVirgen_To, &TFInicioPrensadoBobinaRevHusilloMolino, &TFInicioPrensadoBobinaRevHusilloMolino_To
					, &TFInicioPrensadoBobinaReposoHoras, &TFInicioPrensadoBobinaReposoHoras_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionSiloMolidoNombre, &TFExtrusionSiloMolidoNombre_Sel
					, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel)
		Where InicioPBPrensadoFecha>= &NowDate

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'CarreteNoSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(CarreteNoSerie)
					Case &ColumnsSelector_Column.ColumnName = !'CarreteId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = CarreteId
					Case &ColumnsSelector_Column.ColumnName = !'CarreteNoLinea'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = CarreteNoLinea
					Case &ColumnsSelector_Column.ColumnName = !'CarreteEstado'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = CarreteEstado.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'CarreteEnMolino'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = CarreteEnMolino.ToString()
					Case &ColumnsSelector_Column.ColumnName = !'CarreteMolino'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = CarreteMolino.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'CarreteObservacion'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(CarreteObservacion)
					Case &ColumnsSelector_Column.ColumnName = !'CarreteTerminaPalet'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = CarreteTerminaPalet.ToString()
					Case &ColumnsSelector_Column.ColumnName = !'CarreteCarreraId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = CarreteCarreraId
					Case &ColumnsSelector_Column.ColumnName = !'CarreteMermaMolino'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = CarreteMermaMolino.ToString()
					Case &ColumnsSelector_Column.ColumnName = !'CarreteMermaKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = CarreteMermaKg
					Case &ColumnsSelector_Column.ColumnName = !'CarretePaletSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(CarretePaletSerie)
					Case &ColumnsSelector_Column.ColumnName = !'CarreraNo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = CarreraNo
					Case &ColumnsSelector_Column.ColumnName = !'InicioPBPrensadoFecha'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = InicioPBPrensadoFecha
					Case &ColumnsSelector_Column.ColumnName = !'CarreteCarreraTroquel'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(CarreteCarreraTroquel)
					Case &ColumnsSelector_Column.ColumnName = !'CarreteCarreraFecha'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = CarreteCarreraFecha
					Case &ColumnsSelector_Column.ColumnName = !'CarreteCarreraFechaValidacion'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = CarreteCarreraFechaValidacion
					Case &ColumnsSelector_Column.ColumnName = !'InicioPBPrensaNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(InicioPBPrensaNombre)
					Case &ColumnsSelector_Column.ColumnName = !'InicioPBTurnoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(InicioPBTurnoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'InicioPBOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(InicioPBOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoResultadoObservaciones'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoResultadoObservaciones)
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaNoSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(InicioPrensadoBobinaNoSerie)
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaVirgenKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = InicioPrensadoBobinaVirgenKg
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaMolinoKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = InicioPrensadoBobinaMolinoKg
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaRevHusilloVirgen'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = InicioPrensadoBobinaRevHusilloVirgen
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaRevHusilloMolino'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = InicioPrensadoBobinaRevHusilloMolino
					Case &ColumnsSelector_Column.ColumnName = !'InicioPrensadoBobinaReposoHoras'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = InicioPrensadoBobinaReposoHoras
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionSiloMolidoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionSiloMolidoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionSiloNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(ExtrusionSiloNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionLoteSilo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(ExtrusionLoteSilo)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionLotePaqueteAditivos'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionLotePaqueteAditivos)
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
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteNoSerie", '', !'Carrete', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteId", '', !'CarreteId', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteNoLinea", '', !'Línea', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteEstado", '', !'Estado', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteEnMolino", '', !'En Molino', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteMolino", '', !'Molino', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteObservacion", '', !'Observacion', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteTerminaPalet", '', !'Termina Palet', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteCarreraId", '', !'Carrera Id', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteMermaMolino", '', !'Merma Molino', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteMermaKg", '', !'Merma Kg', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarretePaletSerie", '', !'Palet Serie', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreraNo", '', !'Carrera No', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPBPrensadoFecha", '', !'Fecha Prensado', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteCarreraTroquel", '', !'Troquel', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteCarreraFecha", '', !'Carrete Fecha Inicio', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"CarreteCarreraFechaValidacion", '', !'Carrete Fecha Validación', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPBPrensaNombre", '', !'Prensa', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPBTurnoNombre", '', !'Turno', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPBOperadorNombre", '', !'Operador (Prensa)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoResultadoObservaciones", '', !'Observaciones (Prensado)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaNoSerie", '', !'Bobina', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaVirgenKg", '', !'Kg Virgen', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaMolinoKg", '', !'Kg Molino', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaRevHusilloVirgen", '', !'Rev. Husillo Virgen', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaRevHusilloMolino", '', !'Rev. Husillo Molino', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"InicioPrensadoBobinaReposoHoras", '', !'Bobina Reposo (Horas)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionOperadorNombre", '', !'Operador (Extrusora)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionSiloMolidoNombre", '', !'Silo Molido', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionSiloNombre", '', !'Silo Virgen', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionLoteSilo", '', !'Extrusion Lote Silo', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionLotePaqueteAditivos", '', !'Paquete Aditivos', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'Produccion.vwAnaliticaCarreteColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.vwAnaliticaCarreteGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.vwAnaliticaCarreteGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.vwAnaliticaCarreteGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETENOSERIE"
				&TFCarreteNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETENOSERIE_SEL"
				&TFCarreteNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEID"
				&TFCarreteId.FromString(&GridStateFilterValue.Value)
				&TFCarreteId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETENOLINEA"
				&TFCarreteNoLinea.FromString(&GridStateFilterValue.Value)
				&TFCarreteNoLinea_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEESTADO_SEL"
				&TFCarreteEstado_SelsJson = &GridStateFilterValue.Value
				&TFCarreteEstado_Sels.FromJson(&TFCarreteEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFCARRETEENMOLINO_SEL"
				&TFCarreteEnMolino_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEMOLINO_SEL"
				&TFCarreteMolino_SelsJson = &GridStateFilterValue.Value
				&TFCarreteMolino_Sels.FromJson(&TFCarreteMolino_SelsJson)
			Case &GridStateFilterValue.Name = !"TFCARRETEOBSERVACION"
				&TFCarreteObservacion.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEOBSERVACION_SEL"
				&TFCarreteObservacion_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETETERMINAPALET_SEL"
				&TFCarreteTerminaPalet_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERAID"
				&TFCarreteCarreraId.FromString(&GridStateFilterValue.Value)
				&TFCarreteCarreraId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEMERMAMOLINO_SEL"
				&TFCarreteMermaMolino_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEMERMAKG"
				&TFCarreteMermaKg.FromString(&GridStateFilterValue.Value)
				&TFCarreteMermaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEPALETSERIE"
				&TFCarretePaletSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEPALETSERIE_SEL"
				&TFCarretePaletSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERANO"
				&TFCarreraNo.FromString(&GridStateFilterValue.Value)
				&TFCarreraNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSADOFECHA"
				&TFInicioPBPrensadoFecha.FromString(&GridStateFilterValue.Value)
				&TFInicioPBPrensadoFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERATROQUEL"
				&TFCarreteCarreraTroquel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERATROQUEL_SEL"
				&TFCarreteCarreraTroquel_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERAFECHA"
				&TFCarreteCarreraFecha.FromString(&GridStateFilterValue.Value)
				&TFCarreteCarreraFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETECARRERAFECHAVALIDACION"
				&TFCarreteCarreraFechaValidacion.FromString(&GridStateFilterValue.Value)
				&TFCarreteCarreraFechaValidacion_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE"
				&TFInicioPBPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE_SEL"
				&TFInicioPBPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBTURNONOMBRE"
				&TFInicioPBTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBTURNONOMBRE_SEL"
				&TFInicioPBTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBOPERADORNOMBRE"
				&TFInicioPBOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBOPERADORNOMBRE_SEL"
				&TFInicioPBOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOOBSERVACIONES"
				&TFPrensadoResultadoObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADORESULTADOOBSERVACIONES_SEL"
				&TFPrensadoResultadoObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE"
				&TFInicioPrensadoBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE_SEL"
				&TFInicioPrensadoBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAVIRGENKG"
				&TFInicioPrensadoBobinaVirgenKg.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaVirgenKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAMOLINOKG"
				&TFInicioPrensadoBobinaMolinoKg.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaMolinoKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAREVHUSILLOVIRGEN"
				&TFInicioPrensadoBobinaRevHusilloVirgen.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaRevHusilloVirgen_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAREVHUSILLOMOLINO"
				&TFInicioPrensadoBobinaRevHusilloMolino.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaRevHusilloMolino_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINAREPOSOHORAS"
				&TFInicioPrensadoBobinaReposoHoras.FromString(&GridStateFilterValue.Value)
				&TFInicioPrensadoBobinaReposoHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILOMOLIDONOMBRE"
				&TFExtrusionSiloMolidoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILOMOLIDONOMBRE_SEL"
				&TFExtrusionSiloMolidoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE"
				&TFExtrusionSiloNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE_SEL"
				&TFExtrusionSiloNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO"
				&TFExtrusionLoteSilo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO_SEL"
				&TFExtrusionLoteSilo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS"
				&TFExtrusionLotePaqueteAditivos.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS_SEL"
				&TFExtrusionLotePaqueteAditivos_Sel.FromString(&GridStateFilterValue.Value)
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

