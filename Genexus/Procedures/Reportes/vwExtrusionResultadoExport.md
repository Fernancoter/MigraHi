# Procedure: vwExtrusionResultadoExport

- **Module:** Reportes
- **Description:** vw Extrusion Resultado Export
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
| TFExtrusionResultadoBobinasMolino | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Molino |
| TFExtrusionResultadoBobinasMolino_To | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Molino_To |
| TFExtrusionResultadoBobinasReposo | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Reposo |
| TFExtrusionResultadoBobinasReposo_To | Variable | NUMERIC |  | TFExtrusion Resultado Bobinas Reposo_To |
| TFExtrusionResultadoVelLaminadora | Variable | NUMERIC |  | TFExtrusion Resultado Vel Laminadora |
| TFExtrusionResultadoVelLaminadora_To | Variable | NUMERIC |  | TFExtrusion Resultado Vel Laminadora_To |
| TFExtrusionResultadoVelHusillo | Variable | NUMERIC |  | TFExtrusion Resultado Vel Husillo |
| TFExtrusionResultadoVelHusillo_To | Variable | NUMERIC |  | TFExtrusion Resultado Vel Husillo_To |
| TFExtrusionResultadoTotalKg | Variable | NUMERIC |  | TFExtrusion Resultado Total Kg |
| TFExtrusionResultadoTotalKg_To | Variable | NUMERIC |  | TFExtrusion Resultado Total Kg_To |
| TFExtrusionResultadoTotalMermaKg | Variable | NUMERIC |  | TFExtrusion Resultado Total Merma Kg |
| TFExtrusionResultadoTotalMermaKg_To | Variable | NUMERIC |  | TFExtrusion Resultado Total Merma Kg_To |
| TFExtrusionResultadoCOMBA_Sel | Variable | NUMERIC |  | TFExtrusion Resultado COMBA_Sel |
| TFExtrusionResultadoObservaciones | Variable | VARCHAR |  | TFExtrusion Resultado Observaciones |
| TFExtrusionResultadoObservaciones_Sel | Variable | VARCHAR |  | TFExtrusion Resultado Observaciones_Sel |
| TFExtrusionSiloNombre | Variable | VARCHAR |  | TFExtrusion Silo Nombre |
| TFExtrusionSiloNombre_Sel | Variable | VARCHAR |  | TFExtrusion Silo Nombre_Sel |
| TFExtrusionLoteSilo | Variable | VARCHAR |  | TFExtrusion Lote Silo |
| TFExtrusionLoteSilo_Sel | Variable | VARCHAR |  | TFExtrusion Lote Silo_Sel |
| TFExtrusionRevHusilloMolido | Variable | NUMERIC |  | TFExtrusion Rev Husillo Molido |
| TFExtrusionRevHusilloMolido_To | Variable | NUMERIC |  | TFExtrusion Rev Husillo Molido_To |
| TFExtrusionRevHusilloVirgen | Variable | NUMERIC |  | TFExtrusion Rev Husillo Virgen |
| TFExtrusionRevHusilloVirgen_To | Variable | NUMERIC |  | TFExtrusion Rev Husillo Virgen_To |
| TFExtrusionVirgenKg | Variable | NUMERIC |  | TFExtrusion Virgen Kg |
| TFExtrusionVirgenKg_To | Variable | NUMERIC |  | TFExtrusion Virgen Kg_To |
| TFExtrusionMolidoKg | Variable | NUMERIC |  | TFExtrusion Molido Kg |
| TFExtrusionMolidoKg_To | Variable | NUMERIC |  | TFExtrusion Molido Kg_To |
| i | Variable | NUMERIC |  | i |
| TFExtrusionFecha | Variable | DATETIME |  | TFExtrusion Fecha |
| TFExtrusionFecha_To | Variable | DATETIME |  | TFExtrusion Fecha_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionTurnoNombre | Variable | VARCHAR |  | TFExtrusion Turno Nombre |
| TFExtrusionTurnoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Turno Nombre_Sel |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionMotivoAnticipado_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Motivo Anticipado_Sels Json |
| TFExtrusionMotivoAnticipado_Sel | Variable | VARCHAR |  | TFExtrusion Motivo Anticipado_Sel |
| TFExtrusionMotivoAnticipado_Sels | Variable | VARCHAR |  | TFExtrusion Motivo Anticipado_Sels |
| TFExtrusionProductoNombre | Variable | VARCHAR |  | TFExtrusion Producto Nombre |
| TFExtrusionProductoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Producto Nombre_Sel |
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
	&Filename = !"vwExtrusionResultadoExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFExtrusionFecha.IsEmpty() AND &TFExtrusionFecha_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Fecha")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFExtrusionFecha
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFExtrusionFecha_To
	EndIf
	If not (&TFExtrusionExtrusoraNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusora")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionExtrusoraNombre_Sel)
	Else
		If not (&TFExtrusionExtrusoraNombre.IsEmpty())
			WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusora")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionExtrusoraNombre)
		EndIf
	EndIf
	If not (&TFExtrusionProductoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionProductoNombre_Sel)
	Else
		If not (&TFExtrusionProductoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Producto")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionProductoNombre)
		EndIf
	EndIf
	If not (&TFExtrusionTurnoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionTurnoNombre_Sel)
	Else
		If not (&TFExtrusionTurnoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Turno")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionTurnoNombre)
		EndIf
	EndIf
	If not (&TFExtrusionOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionOperadorNombre_Sel)
	Else
		If not (&TFExtrusionOperadorNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Operador")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFExtrusionOperadorNombre)
		EndIf
	EndIf
	If not (&TFExtrusionResultadoBobinasMolino.IsEmpty() AND &TFExtrusionResultadoBobinasMolino_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobinas Molino")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionResultadoBobinasMolino
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionResultadoBobinasMolino_To
	EndIf
	If not (&TFExtrusionResultadoBobinasReposo.IsEmpty() AND &TFExtrusionResultadoBobinasReposo_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobinas Reposo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionResultadoBobinasReposo
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionResultadoBobinasReposo_To
	EndIf
	If not (&TFExtrusionResultadoVelLaminadora.IsEmpty() AND &TFExtrusionResultadoVelLaminadora_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Vel Laminadora")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionResultadoVelLaminadora
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionResultadoVelLaminadora_To
	EndIf
	If not (&TFExtrusionResultadoVelHusillo.IsEmpty() AND &TFExtrusionResultadoVelHusillo_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Vel Husillo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionResultadoVelHusillo
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionResultadoVelHusillo_To
	EndIf
	If not (&TFExtrusionResultadoTotalKg.IsEmpty() AND &TFExtrusionResultadoTotalKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Total Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionResultadoTotalKg
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionResultadoTotalKg_To
	EndIf
	If not (&TFExtrusionResultadoTotalMermaKg.IsEmpty() AND &TFExtrusionResultadoTotalMermaKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Merma Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionResultadoTotalMermaKg
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionResultadoTotalMermaKg_To
	EndIf
	If not (&TFExtrusionResultadoCOMBA_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "COMBA")
		Do Case
			Case &TFExtrusionResultadoCOMBA_Sel = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSChecked"
			Case &TFExtrusionResultadoCOMBA_Sel = 2
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = "WWP_TSUnChecked"
		EndCase
	EndIf
	If not (&TFExtrusionResultadoObservaciones_Sel.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observaciones")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionResultadoObservaciones_Sel)
	Else
		If not (&TFExtrusionResultadoObservaciones.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Observaciones")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionResultadoObservaciones)
		EndIf
	EndIf
	If not (&TFExtrusionSiloNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Silo Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionSiloNombre_Sel)
	Else
		If not (&TFExtrusionSiloNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Silo Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionSiloNombre)
		EndIf
	EndIf
	If not (&TFExtrusionLoteSilo_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Lote Silo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLoteSilo_Sel)
	Else
		If not (&TFExtrusionLoteSilo.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Lote Silo")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFExtrusionLoteSilo)
		EndIf
	EndIf
	If not (&TFExtrusionRevHusilloMolido.IsEmpty() AND &TFExtrusionRevHusilloMolido_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Rev Husillo Molido")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionRevHusilloMolido
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionRevHusilloMolido_To
	EndIf
	If not (&TFExtrusionRevHusilloVirgen.IsEmpty() AND &TFExtrusionRevHusilloVirgen_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Rev Husillo Virgen")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionRevHusilloVirgen
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionRevHusilloVirgen_To
	EndIf
	If not (&TFExtrusionVirgenKg.IsEmpty() AND &TFExtrusionVirgenKg_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Virgen Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionVirgenKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionVirgenKg_To
	EndIf
	If not (&TFExtrusionMolidoKg.IsEmpty() AND &TFExtrusionMolidoKg_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Extrusion Molido Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFExtrusionMolidoKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFExtrusionMolidoKg_To
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'Reportes.vwExtrusionResultadoColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'Reportes.vwExtrusionResultadoColumnsSelector')
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

	For each DB.ExtrusionResultado
		order ExtrusionFecha  when &OrderedBy = 1 AND &OrderedDsc = False
		order (ExtrusionFecha)  when &OrderedBy = 1 AND &OrderedDsc = True
		order ExtrusionExtrusoraNombre  when &OrderedBy = 2 AND &OrderedDsc = False
		order (ExtrusionExtrusoraNombre)  when &OrderedBy = 2 AND &OrderedDsc = True
		order ExtrusionProductoNombre  when &OrderedBy = 3 AND &OrderedDsc = False
		order (ExtrusionProductoNombre)  when &OrderedBy = 3 AND &OrderedDsc = True
		order ExtrusionTurnoNombre  when &OrderedBy = 4 AND &OrderedDsc = False
		order (ExtrusionTurnoNombre)  when &OrderedBy = 4 AND &OrderedDsc = True
		order ExtrusionOperadorNombre  when &OrderedBy = 5 AND &OrderedDsc = False
		order (ExtrusionOperadorNombre)  when &OrderedBy = 5 AND &OrderedDsc = True
		order ExtrusionResultadoBobinasMolino  when &OrderedBy = 6 AND &OrderedDsc = False
		order (ExtrusionResultadoBobinasMolino)  when &OrderedBy = 6 AND &OrderedDsc = True
		order ExtrusionResultadoBobinasReposo  when &OrderedBy = 7 AND &OrderedDsc = False
		order (WWPBaseObjects.Notifications.ExtrusionResultadoBobinasReposo)  when &OrderedBy = 7 AND &OrderedDsc = True
		order ExtrusionResultadoVelLaminadora  when &OrderedBy = 8 AND &OrderedDsc = False
		order (ExtrusionResultadoVelLaminadora)  when &OrderedBy = 8 AND &OrderedDsc = True
		order ExtrusionResultadoVelHusillo  when &OrderedBy = 9 AND &OrderedDsc = False
		order (ExtrusionResultadoVelHusillo)  when &OrderedBy = 9 AND &OrderedDsc = True
		order ExtrusionResultadoTotalKg  when &OrderedBy = 10 AND &OrderedDsc = False
		order (ExtrusionResultadoTotalKg)  when &OrderedBy = 10 AND &OrderedDsc = True
		order ExtrusionResultadoTotalMermaKg  when &OrderedBy = 11 AND &OrderedDsc = False
		order (ExtrusionResultadoTotalMermaKg)  when &OrderedBy = 11 AND &OrderedDsc = True
		order ExtrusionResultadoCOMBA  when &OrderedBy = 12 AND &OrderedDsc = False
		order (ExtrusionResultadoCOMBA)  when &OrderedBy = 12 AND &OrderedDsc = True
		order ExtrusionResultadoObservaciones  when &OrderedBy = 13 AND &OrderedDsc = False
		order (ExtrusionResultadoObservaciones)  when &OrderedBy = 13 AND &OrderedDsc = True
		order ExtrusionSiloNombre  when &OrderedBy = 14 AND &OrderedDsc = False
		order (ExtrusionSiloNombre)  when &OrderedBy = 14 AND &OrderedDsc = True
		order ExtrusionLoteSilo  when &OrderedBy = 15 AND &OrderedDsc = False
		order (ExtrusionLoteSilo)  when &OrderedBy = 15 AND &OrderedDsc = True
		order ExtrusionRevHusilloMolido  when &OrderedBy = 16 AND &OrderedDsc = False
		order (ExtrusionRevHusilloMolido)  when &OrderedBy = 16 AND &OrderedDsc = True
		order ExtrusionRevHusilloVirgen  when &OrderedBy = 17 AND &OrderedDsc = False
		order (ExtrusionRevHusilloVirgen)  when &OrderedBy = 17 AND &OrderedDsc = True
		order ExtrusionVirgenKg  when &OrderedBy = 18 AND &OrderedDsc = False
		order (ExtrusionVirgenKg)  when &OrderedBy = 18 AND &OrderedDsc = True
		order ExtrusionMolidoKg  when &OrderedBy = 19 AND &OrderedDsc = False
		order (ExtrusionMolidoKg)  when &OrderedBy = 19 AND &OrderedDsc = True
		
		using vwExtrusionResultadoDS(&FilterFullText, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionResultadoBobinasMolino
					, &TFExtrusionResultadoBobinasMolino_To, &TFExtrusionResultadoBobinasReposo, &TFExtrusionResultadoBobinasReposo_To, &TFExtrusionResultadoVelLaminadora, &TFExtrusionResultadoVelLaminadora_To, &TFExtrusionResultadoVelHusillo
					, &TFExtrusionResultadoVelHusillo_To, &TFExtrusionResultadoTotalKg, &TFExtrusionResultadoTotalKg_To, &TFExtrusionResultadoTotalMermaKg, &TFExtrusionResultadoTotalMermaKg_To, &TFExtrusionResultadoCOMBA_Sel
					, &TFExtrusionResultadoObservaciones, &TFExtrusionResultadoObservaciones_Sel, &TFExtrusionSiloNombre, &TFExtrusionSiloNombre_Sel, &TFExtrusionLoteSilo, &TFExtrusionLoteSilo_Sel
					, &TFExtrusionRevHusilloMolido, &TFExtrusionRevHusilloMolido_To, &TFExtrusionRevHusilloVirgen, &TFExtrusionRevHusilloVirgen_To, &TFExtrusionVirgenKg, &TFExtrusionVirgenKg_To
					, &TFExtrusionMolidoKg, &TFExtrusionMolidoKg_To)

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionFecha'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = ExtrusionFecha
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionExtrusoraNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionExtrusoraNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionProductoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionProductoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionTurnoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionTurnoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoBobinasMolino'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionResultadoBobinasMolino
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoBobinasReposo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionResultadoBobinasReposo
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoVelLaminadora'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionResultadoVelLaminadora
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoVelHusillo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionResultadoVelHusillo
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoTotalKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionResultadoTotalKg
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoTotalMermaKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = WWPBaseObjects.ExtrusionResultadoTotalMermaKg
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoCOMBA'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = ExtrusionResultadoCOMBA.ToString()
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionResultadoObservaciones'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionResultadoObservaciones)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionSiloNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWPBaseObjects.WWP_Export_SecureText(ExtrusionSiloNombre)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionLoteSilo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(ExtrusionLoteSilo)
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionRevHusilloMolido'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionRevHusilloMolido
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionRevHusilloVirgen'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionRevHusilloVirgen
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionVirgenKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionVirgenKg
					Case &ColumnsSelector_Column.ColumnName = !'ExtrusionMolidoKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = ExtrusionMolidoKg
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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionFecha", '', !'Fecha', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionExtrusoraNombre", '', !'Extrusora', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionProductoNombre", '', !'Producto', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionTurnoNombre", '', !'Turno', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionOperadorNombre", '', !'Operador', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoBobinasMolino", '', !'Bobinas Molino', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoBobinasReposo", '', !'Bobinas Reposo', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoVelLaminadora", '', !'Vel Laminadora', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoVelHusillo", '', !'Vel Husillo', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoTotalKg", '', !'Total Kg', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoTotalMermaKg", '', !'Merma Kg', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoCOMBA", '', !'COMBA', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionResultadoObservaciones", '', !'Observaciones', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionSiloNombre", '', !'Extrusion Silo Nombre', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionLoteSilo", '', !'Extrusion Lote Silo', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionRevHusilloMolido", '', !'Extrusion Rev Husillo Molido', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionRevHusilloVirgen", '', !'Extrusion Rev Husillo Virgen', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionVirgenKg", '', !'Extrusion Virgen Kg', False, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"ExtrusionMolidoKg", '', !'Extrusion Molido Kg', False, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'Reportes.vwExtrusionResultadoColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Reportes.vwExtrusionResultadoGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Reportes.vwExtrusionResultadoGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Reportes.vwExtrusionResultadoGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONFECHA"
				&TFExtrusionFecha.FromString(&GridStateFilterValue.Value)
				&TFExtrusionFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE"
				&TFExtrusionProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE_SEL"
				&TFExtrusionProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE"
				&TFExtrusionTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE_SEL"
				&TFExtrusionTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOBOBINASMOLINO"
				&TFExtrusionResultadoBobinasMolino.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoBobinasMolino_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOBOBINASREPOSO"
				&TFExtrusionResultadoBobinasReposo.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoBobinasReposo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOVELLAMINADORA"
				&TFExtrusionResultadoVelLaminadora.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoVelLaminadora_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOVELHUSILLO"
				&TFExtrusionResultadoVelHusillo.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoVelHusillo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOTOTALKG"
				&TFExtrusionResultadoTotalKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoTotalKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOTOTALMERMAKG"
				&TFExtrusionResultadoTotalMermaKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionResultadoTotalMermaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOCOMBA_SEL"
				&TFExtrusionResultadoCOMBA_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOOBSERVACIONES"
				&TFExtrusionResultadoObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONRESULTADOOBSERVACIONES_SEL"
				&TFExtrusionResultadoObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE"
				&TFExtrusionSiloNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONSILONOMBRE_SEL"
				&TFExtrusionSiloNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO"
				&TFExtrusionLoteSilo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTESILO_SEL"
				&TFExtrusionLoteSilo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONREVHUSILLOMOLIDO"
				&TFExtrusionRevHusilloMolido.FromString(&GridStateFilterValue.Value)
				&TFExtrusionRevHusilloMolido_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONREVHUSILLOVIRGEN"
				&TFExtrusionRevHusilloVirgen.FromString(&GridStateFilterValue.Value)
				&TFExtrusionRevHusilloVirgen_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONVIRGENKG"
				&TFExtrusionVirgenKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionVirgenKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMOLIDOKG"
				&TFExtrusionMolidoKg.FromString(&GridStateFilterValue.Value)
				&TFExtrusionMolidoKg_To.FromString(&GridStateFilterValue.ValueTo)
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

