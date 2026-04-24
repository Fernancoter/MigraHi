# Procedure: listarExtrusionExport

- **Module:** Produccion
- **Description:** listar Extrusion Export
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
| TFExtrusionId | Variable | NUMERIC |  | TFExtrusion Id |
| TFExtrusionId_To | Variable | NUMERIC |  | TFExtrusion Id_To |
| TFExtrusionExtrusoraId | Variable | NUMERIC |  | TFExtrusion Extrusora Id |
| TFExtrusionExtrusoraId_To | Variable | NUMERIC |  | TFExtrusion Extrusora Id_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionTurnoId | Variable | NUMERIC |  | TFExtrusion Turno Id |
| TFExtrusionTurnoId_To | Variable | NUMERIC |  | TFExtrusion Turno Id_To |
| TFExtrusionTurnoNombre | Variable | VARCHAR |  | TFExtrusion Turno Nombre |
| TFExtrusionTurnoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Turno Nombre_Sel |
| TFExtrusionProductoId | Variable | NUMERIC |  | TFExtrusion Producto Id |
| TFExtrusionProductoId_To | Variable | NUMERIC |  | TFExtrusion Producto Id_To |
| TFExtrusionProductoNombre | Variable | VARCHAR |  | TFExtrusion Producto Nombre |
| TFExtrusionProductoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Producto Nombre_Sel |
| TFExtrusionProductoTipoMaterial_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Producto Tipo Material_Sels Json |
| TFExtrusionProductoTipoMaterial_Sel | Variable | VARCHAR |  | TFExtrusion Producto Tipo Material_Sel |
| TFExtrusionProductoTipoMaterial_Sels | Variable | VARCHAR |  | TFExtrusion Producto Tipo Material_Sels |
| TFExtrusionFecha | Variable | DATETIME |  | TFExtrusion Fecha |
| TFExtrusionFecha_To | Variable | DATETIME |  | TFExtrusion Fecha_To |
| TFExtrusionCalibre | Variable | VARCHAR |  | TFExtrusion Calibre |
| TFExtrusionCalibre_Sel | Variable | VARCHAR |  | TFExtrusion Calibre_Sel |
| TFExtrusionAncho | Variable | VARCHAR |  | TFExtrusion Ancho |
| TFExtrusionAncho_Sel | Variable | VARCHAR |  | TFExtrusion Ancho_Sel |
| TFExtrusionLongitud | Variable | VARCHAR |  | TFExtrusion Longitud |
| TFExtrusionLongitud_Sel | Variable | VARCHAR |  | TFExtrusion Longitud_Sel |
| TFExtrusionVirgenKg | Variable | NUMERIC |  | TFExtrusion Virgen Kg |
| TFExtrusionVirgenKg_To | Variable | NUMERIC |  | TFExtrusion Virgen Kg_To |
| TFExtrusionMeta | Variable | NUMERIC |  | TFExtrusion Meta |
| TFExtrusionMeta_To | Variable | NUMERIC |  | TFExtrusion Meta_To |
| TFExtrusionMolidoKg | Variable | NUMERIC |  | TFExtrusion Molido Kg |
| TFExtrusionMolidoKg_To | Variable | NUMERIC |  | TFExtrusion Molido Kg_To |
| TFExtrusionRevHusilloVirgen | Variable | NUMERIC |  | TFExtrusion Rev Husillo Virgen |
| TFExtrusionRevHusilloVirgen_To | Variable | NUMERIC |  | TFExtrusion Rev Husillo Virgen_To |
| TFExtrusionRevHusilloMolido | Variable | NUMERIC |  | TFExtrusion Rev Husillo Molido |
| TFExtrusionRevHusilloMolido_To | Variable | NUMERIC |  | TFExtrusion Rev Husillo Molido_To |
| TFExtrusionEstado_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Estado_Sels Json |
| TFExtrusionEstado_Sel | Variable | VARCHAR |  | TFExtrusion Estado_Sel |
| TFExtrusionEstado_Sels | Variable | VARCHAR |  | TFExtrusion Estado_Sels |
| TFExtrusionOperadorId | Variable | NUMERIC |  | TFExtrusion Operador Id |
| TFExtrusionOperadorId_To | Variable | NUMERIC |  | TFExtrusion Operador Id_To |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionHoraIniciaProceso | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso |
| TFExtrusionHoraIniciaProceso_To | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso_To |
| TFExtrusionHoraFinProceso | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso |
| TFExtrusionHoraFinProceso_To | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso_To |
| TFExtrusionLoteSilo | Variable | VARCHAR |  | TFExtrusion Lote Silo |
| TFExtrusionLoteSilo_Sel | Variable | VARCHAR |  | TFExtrusion Lote Silo_Sel |
| TFExtrusionMotivoAnticipado_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Motivo Anticipado_Sels Json |
| TFExtrusionMotivoAnticipado_Sel | Variable | VARCHAR |  | TFExtrusion Motivo Anticipado_Sel |
| TFExtrusionMotivoAnticipado_Sels | Variable | VARCHAR |  | TFExtrusion Motivo Anticipado_Sels |
| TFExtrusionResultadoBobinasReposoTotales | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Reposo Totales |
| TFExtrusionResultadoBobinasReposoTotales_To | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Reposo Totales_To |
| TFExtrusionSiloId | Variable | NUMERIC |  | TFExtrusion Silo Id |
| TFExtrusionSiloId_To | Variable | NUMERIC |  | TFExtrusion Silo Id_To |
| TFExtrusionSiloNombre | Variable | VARCHAR |  | TFExtrusion Silo Nombre |
| TFExtrusionSiloNombre_Sel | Variable | VARCHAR |  | TFExtrusion Silo Nombre_Sel |
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
	&Filename = !"listarExtrusionExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFExtrusionId.IsEmpty() AND &TFExtrusionId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionId_To
	EndIf
	If not (&TFExtrusionExtrusoraId.IsEmpty() AND &TFExtrusionExtrusoraId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusora Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionExtrusoraId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionExtrusoraId_To
	EndIf
	If not (&TFExtrusionExtrusoraNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusora Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionExtrusoraNombre_Sel)
	Else
		If not (&TFExtrusionExtrusoraNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusora Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionExtrusoraNombre)
		EndIf
	EndIf
	If not (&TFExtrusionTurnoId.IsEmpty() AND &TFExtrusionTurnoId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionTurnoId
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionTurnoId_To
	EndIf
	If not (&TFExtrusionTurnoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionTurnoNombre_Sel)
	Else
		If not (&TFExtrusionTurnoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionTurnoNombre)
		EndIf
	EndIf
	If not (&TFExtrusionProductoId.IsEmpty() AND &TFExtrusionProductoId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionProductoId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionProductoId_To
	EndIf
	If not (&TFExtrusionProductoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionProductoNombre_Sel)
	Else
		If not (&TFExtrusionProductoNombre.IsEmpty())
			WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionProductoNombre)
		EndIf
	EndIf
	If not (&TFExtrusionProductoTipoMaterial_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Tipo Material")
		&i = 1
		For &TFExtrusionProductoTipoMaterial_Sel in &TFExtrusionProductoTipoMaterial_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFExtrusionProductoTipoMaterial_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFExtrusionFecha.IsEmpty() AND &TFExtrusionFecha_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFExtrusionFecha
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFExtrusionFecha_To
	EndIf
	If not (&TFExtrusionCalibre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Calibre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionCalibre_Sel)
	Else
		If not (&TFExtrusionCalibre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Calibre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionCalibre)
		EndIf
	EndIf
	If not (&TFExtrusionAncho_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Ancho")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionAncho_Sel)
	Else
		If not (&TFExtrusionAncho.IsEmpty())
			WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Ancho")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionAncho)
		EndIf
	EndIf
	If not (&TFExtrusionLongitud_Sel.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Longitud")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLongitud_Sel)
	Else
		If not (&TFExtrusionLongitud.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Longitud")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLongitud)
		EndIf
	EndIf
	If not (&TFExtrusionVirgenKg.IsEmpty() AND &TFExtrusionVirgenKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Virgen Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionVirgenKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionVirgenKg_To
	EndIf
	If not (&TFExtrusionMeta.IsEmpty() AND &TFExtrusionMeta_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Meta")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionMeta
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionMeta_To
	EndIf
	If not (&TFExtrusionMolidoKg.IsEmpty() AND &TFExtrusionMolidoKg_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Molido Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionMolidoKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionMolidoKg_To
	EndIf
	If not (&TFExtrusionRevHusilloVirgen.IsEmpty() AND &TFExtrusionRevHusilloVirgen_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Husillo Virgen")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionRevHusilloVirgen
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionRevHusilloVirgen_To
	EndIf
	If not (&TFExtrusionRevHusilloMolido.IsEmpty() AND &TFExtrusionRevHusilloMolido_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Husillo Molido")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionRevHusilloMolido
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionRevHusilloMolido_To
	EndIf
	If not (&TFExtrusionEstado_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Estado")
		&i = 1
		For &TFExtrusionEstado_Sel in &TFExtrusionEstado_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFExtrusionEstado_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFExtrusionOperadorId.IsEmpty() AND &TFExtrusionOperadorId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionOperadorId
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionOperadorId_To
	EndIf
	If not (&TFExtrusionOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionOperadorNombre_Sel)
	Else
		If not (&TFExtrusionOperadorNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionOperadorNombre)
		EndIf
	EndIf
	If not (&TFExtrusionHoraIniciaProceso.IsEmpty() AND &TFExtrusionHoraIniciaProceso_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Inicia Proceso")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFExtrusionHoraIniciaProceso
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFExtrusionHoraIniciaProceso_To
	EndIf
	If not (&TFExtrusionHoraFinProceso.IsEmpty() AND &TFExtrusionHoraFinProceso_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fin Proceso")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFExtrusionHoraFinProceso
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFExtrusionHoraFinProceso_To
	EndIf
	If not (&TFExtrusionLoteSilo_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Lote Silo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLoteSilo_Sel)
	Else
		If not (&TFExtrusionLoteSilo.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Lote Silo")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLoteSilo)
		EndIf
	EndIf
	If not (&TFExtrusionMotivoAnticipado_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Motivo Anticipado")
		&i = 1
		For &TFExtrusionMotivoAnticipado_Sel in &TFExtrusionMotivoAnticipado_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += WWP_Export_SecureText(&TFExtrusionMotivoAnticipado_Sel)
			&i += 1
		EndFor
	EndIf
	If not (&TFExtrusionResultadoBobinasReposoTotales.IsEmpty() AND &TFExtrusionResultadoBobinasReposoTotales_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fabricadas")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionResultadoBobinasReposoTotales
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionResultadoBobinasReposoTotales_To
	EndIf
	If not (&TFExtrusionSiloId.IsEmpty() AND &TFExtrusionSiloId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionSiloId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionSiloId_To
	EndIf
	If not (&TFExtrusionSiloNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionSiloNombre_Sel)
	Else
		If not (&TFExtrusionSiloNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Silo Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionSiloNombre)
		EndIf
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'Produccion.listarExtrusionColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'Produccion.listarExtrusionColumnsSelector')
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

	For each DB.Extrusion
		order ExtrusionExtrusoraNombre  when &OrderedBy = 1 AND &OrderedDsc = False
		order (ExtrusionExtrusoraNombre)  when &OrderedBy = 1 AND &OrderedDsc = True
		order ExtrusionId  when &OrderedBy = 2 AND &OrderedDsc = False
		order (ExtrusionId)  when &OrderedBy = 2 AND &OrderedDsc = True
		order ExtrusionExtrusoraId  when &OrderedBy = 3 AND &OrderedDsc = False
		order (ExtrusionExtrusoraId)  when &OrderedBy = 3 AND &OrderedDsc = True
		order ExtrusionTurnoId  when &OrderedBy = 4 AND &OrderedDsc = False
		order (ExtrusionTurnoId)  when &OrderedBy = 4 AND &OrderedDsc = True
		order ExtrusionTurnoNombre  when &OrderedBy = 5 AND &OrderedDsc = False
		order (ExtrusionTurnoNombre)  when &OrderedBy = 5 AND &OrderedDsc = True
		order ExtrusionProductoId  when &OrderedBy = 6 AND &OrderedDsc = False
		order (ExtrusionProductoId)  when &OrderedBy = 6 AND &OrderedDsc = True
		order ExtrusionProductoNombre  when &OrderedBy = 7 AND &OrderedDsc = False
		order (ExtrusionProductoNombre)  when &OrderedBy = 7 AND &OrderedDsc = True
		order ExtrusionProductoTipoMaterial  when &OrderedBy = 8 AND &OrderedDsc = False
		order (ExtrusionProductoTipoMaterial)  when &OrderedBy = 8 AND &OrderedDsc = True
		order ExtrusionFecha  when &OrderedBy = 9 AND &OrderedDsc = False
		order (ExtrusionFecha)  when &OrderedBy = 9 AND &OrderedDsc = True
		order ExtrusionCalibre  when &OrderedBy = 10 AND &OrderedDsc = False
		order (ExtrusionCalibre)  when &OrderedBy = 10 AND &OrderedDsc = True
		order ExtrusionAncho  when &OrderedBy = 11 AND &OrderedDsc = False
		order (ExtrusionAncho)  when &OrderedBy = 11 AND &OrderedDsc = True
		order ExtrusionLongitud  when &OrderedBy = 12 AND &OrderedDsc = False
		order (ExtrusionLongitud)  when &OrderedBy = 12 AND &OrderedDsc = True
		order ExtrusionVirgenKg  when &OrderedBy = 13 AND &OrderedDsc = False
		order (ExtrusionVirgenKg)  when &OrderedBy = 13 AND &OrderedDsc = True
		order ExtrusionMeta  when &OrderedBy = 14 AND &OrderedDsc = False
		order (ExtrusionMeta)  when &OrderedBy = 14 AND &OrderedDsc = True
		order ExtrusionMolidoKg  when &OrderedBy = 15 AND &OrderedDsc = False
		order (ExtrusionMolidoKg)  when &OrderedBy = 15 AND &OrderedDsc = True
		order ExtrusionRevHusilloVirgen  when &OrderedBy = 16 AND &OrderedDsc = False
		order (ExtrusionRevHusilloVirgen)  when &OrderedBy = 16 AND &OrderedDsc = True
		order ExtrusionRevHusilloMolido  when &OrderedBy = 17 AND &OrderedDsc = False
		order (ExtrusionRevHusilloMolido)  when &OrderedBy = 17 AND &OrderedDsc = True
		order ExtrusionEstado  when &OrderedBy = 18 AND &OrderedDsc = False
		order (ExtrusionEstado)  when &OrderedBy = 18 AND &OrderedDsc = True
		order ExtrusionOperadorId  when &OrderedBy = 19 AND &OrderedDsc = False
		order (ExtrusionOperadorId)  when &OrderedBy = 19 AND &OrderedDsc = True
		order ExtrusionOperadorNombre  when &OrderedBy = 20 AND &OrderedDsc = False
		order (ExtrusionOperadorNombre)  when &OrderedBy = 20 AND &OrderedDsc = True
		order ExtrusionHoraIniciaProceso  when &OrderedBy = 21 AND &OrderedDsc = False
		order (ExtrusionHoraIniciaProceso)  when &OrderedBy = 21 AND &OrderedDsc = True
		order ExtrusionHoraFinProceso  when &OrderedBy = 22 AND &OrderedDsc = False
		order (ExtrusionHoraFinProceso)  when &OrderedBy = 22 AND &OrderedDsc = True
		order ExtrusionLoteSilo  when &OrderedBy = 23 AND &OrderedDsc = False
		order (ExtrusionLoteSilo)  when &OrderedBy = 23 AND &OrderedDsc = True
		order ExtrusionMotivoAnticipado  when &OrderedBy = 24 AND &OrderedDsc = False
		order (ExtrusionMotivoAnticipado)  when &OrderedBy = 24 AND &OrderedDsc = True
		order ExtrusionSiloId  when &OrderedBy = 25 AND &OrderedDsc = False
		order (ExtrusionSiloId)  when &OrderedBy = 25 AND &OrderedDsc = True
		order ExtrusionSiloNombre  when &OrderedBy = 26 AND &OrderedDsc = False
		order (ExtrusionSiloNombre)  when &OrderedBy = 26 AND &OrderedDsc = True
		
		using listarExtrusionDS(&FilterFullText, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraId, &TFExtrusionExtrusoraId_To, &TFExtrusionExtrusoraNombre
					, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoId, &TFExtrusionTurnoId_To, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionProductoId
					, &TFExtrusionProductoId_To, &TFExtrusionProductoNombre, &TFExtrusionProductoNombre_Sel, &TFExtrusionProductoTipoMaterial_Sels, &TFExtrusionFecha, &TFExtrusionFecha_To
					, &TFExtrusionCalibre, &TFExtrusionCalibre_Sel, &TFExtrusionAncho, &TFExtrusionAncho_Sel, &TFExtrusionLongitud, &TFExtrusionLongitud_Sel
					, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To, &TFExtrusionMeta, &TFExtrusionMeta_To, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To
					, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionEstado_Sels, &TFExtrusionOperadorId
					, &TFExtrusionOperadorId_To, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To, &TFExtrusionHoraFinProceso
					, &TFExtrusionHoraFinProceso_To, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel, &TFExtrusionMotivoAnticipado_Sels, &TFExtrusionResultadoBobinasReposoTotales, &TFExtrusionResultadoBobinasReposoTotales_To
					, &TFExtrusionSiloId, &TFExtrusionSiloId_To, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel)

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionId
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionExtrusoraId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionExtrusoraId
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionExtrusoraNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionExtrusoraNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionTurnoId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionTurnoId
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionTurnoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionTurnoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionProductoId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionProductoId
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionProductoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(DB.ExtrusionProductoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionProductoTipoMaterial'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = ExtrusionProductoTipoMaterial.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionFecha'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = ExtrusionFecha
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionCalibre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionCalibre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionAncho'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionAncho)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionLongitud'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionLongitud)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionVirgenKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionVirgenKg
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionMeta'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionMeta
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionMolidoKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionMolidoKg
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionRevHusilloVirgen'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionRevHusilloVirgen
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionRevHusilloMolido'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionRevHusilloMolido
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionEstado'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = ExtrusionEstado.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionOperadorId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionOperadorId
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionHoraIniciaProceso'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = ExtrusionHoraIniciaProceso
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionHoraFinProceso'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = ExtrusionHoraFinProceso
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionLoteSilo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionLoteSilo)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionMotivoAnticipado'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(ExtrusionMotivoAnticipado)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoBobinasReposoTotales'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionResultadoBobinasReposoTotales
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionSiloId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionSiloId
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionSiloNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionSiloNombre)
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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionId", '', !'Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionExtrusoraId", '', !'Extrusora Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionExtrusoraNombre", '', !'Extrusora Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionTurnoId", '', !'Turno Id', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionTurnoNombre", '', !'Turno Nombre', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionProductoId", '', !'Producto Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionProductoNombre", '', !'Producto Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionProductoTipoMaterial", '', !'Tipo Material', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionFecha", '', !'Fecha', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionCalibre", '', !'Calibre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionAncho", '', !'Ancho', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionLongitud", '', !'Longitud', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionVirgenKg", '', !'Virgen Kg', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionMeta", '', !'Meta', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionMolidoKg", '', !'Molido Kg', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionRevHusilloVirgen", '', !'Husillo Virgen', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionRevHusilloMolido", '', !'Husillo Molido', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionEstado", '', !'Estado', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionOperadorId", '', !'Operador Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionOperadorNombre", '', !'Operador Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionHoraIniciaProceso", '', !'Inicia Proceso', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionHoraFinProceso", '', !'Fin Proceso', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionLoteSilo", '', !'Lote Silo', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionMotivoAnticipado", '', !'Motivo Anticipado', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoBobinasReposoTotales", '', !'Fabricadas', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionSiloId", '', !'Silo Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionSiloNombre", '', !'Silo Nombre', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'Produccion.listarExtrusionColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.listarExtrusionGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.listarExtrusionGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.listarExtrusionGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONID"
				&TFExtrusionId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORAID"
				&TFExtrusionExtrusoraId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionExtrusoraId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNOID"
				&TFExtrusionTurnoId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionTurnoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE"
				&TFExtrusionTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE_SEL"
				&TFExtrusionTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTOID"
				&TFExtrusionProductoId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionProductoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE"
				&TFExtrusionProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE_SEL"
				&TFExtrusionProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTOTIPOMATERIAL_SEL"
				&TFExtrusionProductoTipoMaterial_SelsJson = &GridStateFilterValue.Value
				&TFExtrusionProductoTipoMaterial_Sels.FromJson(&TFExtrusionProductoTipoMaterial_SelsJson)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONFECHA"
				&TFExtrusionFecha.FromString(&GridStateFilterValue.Value)
				&TFExtrusionFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONCALIBRE"
				&TFExtrusionCalibre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONCALIBRE_SEL"
				&TFExtrusionCalibre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONANCHO"
				&TFExtrusionAncho.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONANCHO_SEL"
				&TFExtrusionAncho_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLONGITUD"
				&TFExtrusionLongitud.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLONGITUD_SEL"
				&TFExtrusionLongitud_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONVIRGENKG"
				&TFExtrusionVirgenKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionVirgenKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMETA"
				&TFExtrusionMeta.FromString(&GridStateFilterValue.Value)
				&TFExtrusionMeta_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMOLIDOKG"
				&TFExtrusionMolidoKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionMolidoKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONREVHUSILLOVIRGEN"
				&TFExtrusionRevHusilloVirgen.FromString(&GridStateFilterValue.Value)
				&TFExtrusionRevHusilloVirgen_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONREVHUSILLOMOLIDO"
				&TFExtrusionRevHusilloMolido.FromString(&GridStateFilterValue.Value)
				&TFExtrusionRevHusilloMolido_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONESTADO_SEL"
				&TFExtrusionEstado_SelsJson = &GridStateFilterValue.Value
				&TFExtrusionEstado_Sels.FromJson(&TFExtrusionEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORID"
				&TFExtrusionOperadorId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionOperadorId_To.FromString(&GridStateFilterValue.ValueTo)
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
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO"
				&TFExtrusionLoteSilo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO_SEL"
				&TFExtrusionLoteSilo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMOTIVOANTICIPADO_SEL"
				&TFExtrusionMotivoAnticipado_SelsJson = &GridStateFilterValue.Value
				&TFExtrusionMotivoAnticipado_Sels.FromJson(&TFExtrusionMotivoAnticipado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOBOBINASREPOSOTOTALES"
				&TFExtrusionResultadoBobinasReposoTotales.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoBobinasReposoTotales_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILOID"
				&TFExtrusionSiloId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionSiloId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE"
				&TFExtrusionSiloNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE_SEL"
				&TFExtrusionSiloNombre_Sel.FromString(&GridStateFilterValue.Value)
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

