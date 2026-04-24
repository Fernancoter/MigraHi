# Procedure: PrensadoBobinaWWExport

- **Module:** DB
- **Description:** Prensado Bobina WWExport
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
| TFPrensadoBobinaId | Variable | NUMERIC |  | TFPrensado Bobina Id |
| TFPrensadoBobinaId_To | Variable | NUMERIC |  | TFPrensado Bobina Id_To |
| TFPrensadoId | Variable | NUMERIC |  | TFPrensado Id |
| TFPrensadoId_To | Variable | NUMERIC |  | TFPrensado Id_To |
| TFBobinaId | Variable | NUMERIC |  | TFBobina Id |
| TFBobinaId_To | Variable | NUMERIC |  | TFBobina Id_To |
| TFBobinaNoSerie | Variable | VARCHAR |  | TFBobina No Serie |
| TFBobinaNoSerie_Sel | Variable | VARCHAR |  | TFBobina No Serie_Sel |
| TFBobinaEstado_SelsJson | Variable | LONGVARCHAR |  | TFBobina Estado_Sels Json |
| TFBobinaEstado_Sel | Variable | VARCHAR |  | TFBobina Estado_Sel |
| TFBobinaEstado_Sels | Variable | VARCHAR |  | TFBobina Estado_Sels |
| TFBobinaNo | Variable | NUMERIC |  | TFBobina No |
| TFBobinaNo_To | Variable | NUMERIC |  | TFBobina No_To |
| TFBobinaOrigen_SelsJson | Variable | LONGVARCHAR |  | TFBobina Origen_Sels Json |
| TFBobinaOrigen_Sel | Variable | VARCHAR |  | TFBobina Origen_Sel |
| TFBobinaOrigen_Sels | Variable | VARCHAR |  | TFBobina Origen_Sels |
| TFBobinaKg | Variable | NUMERIC |  | TFBobina Kg |
| TFBobinaKg_To | Variable | NUMERIC |  | TFBobina Kg_To |
| TFBobinaHoraSalida | Variable | DATETIME |  | TFBobina Hora Salida |
| TFBobinaHoraSalida_To | Variable | DATETIME |  | TFBobina Hora Salida_To |
| TFBobinaCarreras | Variable | NUMERIC |  | TFBobina Carreras |
| TFBobinaCarreras_To | Variable | NUMERIC |  | TFBobina Carreras_To |
| TFBobinaMinutosEnReposo | Variable | NUMERIC |  | TFBobina Minutos En Reposo |
| TFBobinaMinutosEnReposo_To | Variable | NUMERIC |  | TFBobina Minutos En Reposo_To |
| TFBobinaReposoEnHoras | Variable | NUMERIC |  | TFBobina Reposo En Horas |
| TFBobinaReposoEnHoras_To | Variable | NUMERIC |  | TFBobina Reposo En Horas_To |
| TFPrensadoBobinaCantCarrera | Variable | NUMERIC |  | TFPrensado Bobina Cant Carrera |
| TFPrensadoBobinaCantCarrera_To | Variable | NUMERIC |  | TFPrensado Bobina Cant Carrera_To |
| TFPrensadoOperadorId | Variable | NUMERIC |  | TFPrensado Operador Id |
| TFPrensadoOperadorId_To | Variable | NUMERIC |  | TFPrensado Operador Id_To |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
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
| TFPrensadoProductoTipoMaterial_Sel | Variable | VARCHAR |  | TFPrensado Producto Tipo Material_Sel |
| TFPrensadoProductoTipoMaterial_Sels | Variable | VARCHAR |  | TFPrensado Producto Tipo Material_Sels |
| TFPrensadoFecha | Variable | DATETIME |  | TFPrensado Fecha |
| TFPrensadoFecha_To | Variable | DATETIME |  | TFPrensado Fecha_To |
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
	&Filename = !"PrensadoBobinaWWExport-" + &Random.ToString().Trim() + !".xlsx"

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
	If not (&TFPrensadoBobinaId.IsEmpty() AND &TFPrensadoBobinaId_To.IsEmpty())
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoBobinaId
		WWPBaseObjects.WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoBobinaId_To
	EndIf
	If not (&TFPrensadoId.IsEmpty() AND &TFPrensadoId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoId_To
	EndIf
	If not (&TFBobinaId.IsEmpty() AND &TFBobinaId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaId_To
	EndIf
	If not (&TFBobinaNoSerie_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina No Serie")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaNoSerie_Sel)
	Else
		If not (&TFBobinaNoSerie.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina No Serie")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFBobinaNoSerie)
		EndIf
	EndIf
	If not (&TFBobinaEstado_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Estado")
		&i = 1
		For &TFBobinaEstado_Sel in &TFBobinaEstado_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFBobinaEstado_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFBobinaNo.IsEmpty() AND &TFBobinaNo_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina No")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaNo
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaNo_To
	EndIf
	If not (&TFBobinaOrigen_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Origen")
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
	If not (&TFBobinaKg.IsEmpty() AND &TFBobinaKg_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Kg")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaKg
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaKg_To
	EndIf
	If not (&TFBobinaHoraSalida.IsEmpty() AND &TFBobinaHoraSalida_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Hora Salida")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFBobinaHoraSalida
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFBobinaHoraSalida_To
	EndIf
	If not (&TFBobinaCarreras.IsEmpty() AND &TFBobinaCarreras_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Carreras")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaCarreras
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaCarreras_To
	EndIf
	If not (&TFBobinaMinutosEnReposo.IsEmpty() AND &TFBobinaMinutosEnReposo_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Bobina Minutos En Reposo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaMinutosEnReposo
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaMinutosEnReposo_To
	EndIf
	If not (&TFBobinaReposoEnHoras.IsEmpty() AND &TFBobinaReposoEnHoras_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Tiempo Reposo (Hr)")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFBobinaReposoEnHoras
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFBobinaReposoEnHoras_To
	EndIf
	If not (&TFPrensadoBobinaCantCarrera.IsEmpty() AND &TFPrensadoBobinaCantCarrera_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Cant Carrera")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoBobinaCantCarrera
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoBobinaCantCarrera_To
	EndIf
	If not (&TFPrensadoOperadorId.IsEmpty() AND &TFPrensadoOperadorId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Operador Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoOperadorId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoOperadorId_To
	EndIf
	If not (&TFPrensadoOperadorNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Operador Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoOperadorNombre_Sel)
	Else
		If not (&TFPrensadoOperadorNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Operador Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoOperadorNombre)
		EndIf
	EndIf
	If not (&TFPrensadoPrensaId.IsEmpty() AND &TFPrensadoPrensaId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoPrensaId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoPrensaId_To
	EndIf
	If not (&TFPrensadoPrensaNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWPBaseObjects.WWP_Export_SecureText(&TFPrensadoPrensaNombre_Sel)
	Else
		If not (&TFPrensadoPrensaNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensa Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoPrensaNombre)
		EndIf
	EndIf
	If not (&TFPrensadoTurnoId.IsEmpty() AND &TFPrensadoTurnoId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Turno Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoTurnoId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoTurnoId_To
	EndIf
	If not (&TFPrensadoTurnoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Turno Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoTurnoNombre_Sel)
	Else
		If not (&TFPrensadoTurnoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Turno Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoTurnoNombre)
		EndIf
	EndIf
	If not (&TFPrensadoProductoId.IsEmpty() AND &TFPrensadoProductoId_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Producto Id")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Number = &TFPrensadoProductoId
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Number = &TFPrensadoProductoId_To
	EndIf
	If not (&TFPrensadoProductoNombre_Sel.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Producto Nombre")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoProductoNombre_Sel)
	Else
		If not (&TFPrensadoProductoNombre.IsEmpty())
			WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Producto Nombre")
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = WWP_Export_SecureText(&TFPrensadoProductoNombre)
		EndIf
	EndIf
	If not (&TFPrensadoProductoTipoMaterial_Sels.Count = 0)
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Producto Tipo Material")
		&i = 1
		For &TFPrensadoProductoTipoMaterial_Sel in &TFPrensadoProductoTipoMaterial_Sels
			If &i = 1
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text = ''
			Else
				&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += ', '
			EndIf
			&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Text += &TFPrensadoProductoTipoMaterial_Sel.EnumerationDescription()
			&i += 1
		EndFor
	EndIf
	If not (&TFPrensadoFecha.IsEmpty() AND &TFPrensadoFecha_To.IsEmpty())
		WWP_ExportWriteFilter(&ExcelDocument, true, &CellRow, &FirstColumn, "Prensado Fecha")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 1).Date = &TFPrensadoFecha
		WWP_ExportWriteFilter(&ExcelDocument, false, &CellRow, &FirstColumn + 2, "WWP_TSTo")
		&ExcelDocument.Cells(&CellRow, &FirstColumn + 3).Date = &TFPrensadoFecha_To
	EndIf
	&CellRow += 2

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'WriteColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&VisibleColumnCount = 0
	If &Session.Get(!'DB.PrensadoBobinaWWColumnsSelector') <> ''
		&ColumnsSelectorXML = &Session.Get(!'DB.PrensadoBobinaWWColumnsSelector')
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

	For each PrensadoBobina
		order PrensadoBobinaId  when &OrderedBy = 1 AND &OrderedDsc = False
		order (PrensadoBobinaId)  when &OrderedBy = 1 AND &OrderedDsc = True
		order PrensadoId  when &OrderedBy = 2 AND &OrderedDsc = False
		order (PrensadoId)  when &OrderedBy = 2 AND &OrderedDsc = True
		order BobinaId  when &OrderedBy = 3 AND &OrderedDsc = False
		order (BobinaId)  when &OrderedBy = 3 AND &OrderedDsc = True
		order BobinaNoSerie  when &OrderedBy = 4 AND &OrderedDsc = False
		order (BobinaNoSerie)  when &OrderedBy = 4 AND &OrderedDsc = True
		order BobinaEstado  when &OrderedBy = 5 AND &OrderedDsc = False
		order (BobinaEstado)  when &OrderedBy = 5 AND &OrderedDsc = True
		order BobinaNo  when &OrderedBy = 6 AND &OrderedDsc = False
		order (BobinaNo)  when &OrderedBy = 6 AND &OrderedDsc = True
		order BobinaOrigen  when &OrderedBy = 7 AND &OrderedDsc = False
		order (BobinaOrigen)  when &OrderedBy = 7 AND &OrderedDsc = True
		order BobinaKg  when &OrderedBy = 8 AND &OrderedDsc = False
		order (BobinaKg)  when &OrderedBy = 8 AND &OrderedDsc = True
		order BobinaHoraSalida  when &OrderedBy = 9 AND &OrderedDsc = False
		order (BobinaHoraSalida)  when &OrderedBy = 9 AND &OrderedDsc = True
		order BobinaCarreras  when &OrderedBy = 10 AND &OrderedDsc = False
		order (BobinaCarreras)  when &OrderedBy = 10 AND &OrderedDsc = True
		order BobinaMinutosEnReposo  when &OrderedBy = 11 AND &OrderedDsc = False
		order (BobinaMinutosEnReposo)  when &OrderedBy = 11 AND &OrderedDsc = True
		order PrensadoBobinaCantCarrera  when &OrderedBy = 12 AND &OrderedDsc = False
		order (PrensadoBobinaCantCarrera)  when &OrderedBy = 12 AND &OrderedDsc = True
		order PrensadoOperadorId  when &OrderedBy = 13 AND &OrderedDsc = False
		order (PrensadoOperadorId)  when &OrderedBy = 13 AND &OrderedDsc = True
		order PrensadoOperadorNombre  when &OrderedBy = 14 AND &OrderedDsc = False
		order (PrensadoOperadorNombre)  when &OrderedBy = 14 AND &OrderedDsc = True
		order PrensadoPrensaId  when &OrderedBy = 15 AND &OrderedDsc = False
		order (PrensadoPrensaId)  when &OrderedBy = 15 AND &OrderedDsc = True
		order PrensadoPrensaNombre  when &OrderedBy = 16 AND &OrderedDsc = False
		order (PrensadoPrensaNombre)  when &OrderedBy = 16 AND &OrderedDsc = True
		order PrensadoTurnoId  when &OrderedBy = 17 AND &OrderedDsc = False
		order (PrensadoTurnoId)  when &OrderedBy = 17 AND &OrderedDsc = True
		order PrensadoTurnoNombre  when &OrderedBy = 18 AND &OrderedDsc = False
		order (PrensadoTurnoNombre)  when &OrderedBy = 18 AND &OrderedDsc = True
		order PrensadoProductoId  when &OrderedBy = 19 AND &OrderedDsc = False
		order (PrensadoProductoId)  when &OrderedBy = 19 AND &OrderedDsc = True
		order PrensadoProductoNombre  when &OrderedBy = 20 AND &OrderedDsc = False
		order (PrensadoProductoNombre)  when &OrderedBy = 20 AND &OrderedDsc = True
		order PrensadoProductoTipoMaterial  when &OrderedBy = 21 AND &OrderedDsc = False
		order (PrensadoProductoTipoMaterial)  when &OrderedBy = 21 AND &OrderedDsc = True
		order PrensadoFecha  when &OrderedBy = 22 AND &OrderedDsc = False
		order (PrensadoFecha)  when &OrderedBy = 22 AND &OrderedDsc = True
		
		using DB.PrensadoBobinaWWDS(&FilterFullText, &TFPrensadoBobinaId, &TFPrensadoBobinaId_To, &TFPrensadoId, &TFPrensadoId_To, &TFBobinaId
					, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel, &TFBobinaEstado_Sels, &TFBobinaNo, &TFBobinaNo_To
					, &TFBobinaOrigen_Sels, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaHoraSalida, &TFBobinaHoraSalida_To, &TFBobinaCarreras
					, &TFBobinaCarreras_To, &TFBobinaMinutosEnReposo, &TFBobinaMinutosEnReposo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFPrensadoBobinaCantCarrera
					, &TFPrensadoBobinaCantCarrera_To, &TFPrensadoOperadorId, &TFPrensadoOperadorId_To, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel, &TFPrensadoPrensaId
					, &TFPrensadoPrensaId_To, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoTurnoId, &TFPrensadoTurnoId_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoProductoId, &TFPrensadoProductoId_To, &TFPrensadoProductoNombre, &TFPrensadoProductoNombre_Sel, &TFPrensadoProductoTipoMaterial_Sels
					, &TFPrensadoFecha, &TFPrensadoFecha_To)

		// Write cell values
		&CellRow += 1
		
		Do 'BeforeWriteLine'
		&VisibleColumnCount = 0
		For &ColumnsSelector_Column in &ColumnsSelector.Columns
			If &ColumnsSelector_Column.IsVisible = True
				Do Case
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoBobinaId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoBobinaId
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoId
					Case &ColumnsSelector_Column.ColumnName = !'BobinaId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaId
					Case &ColumnsSelector_Column.ColumnName = !'BobinaNoSerie'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(BobinaNoSerie)
					Case &ColumnsSelector_Column.ColumnName = !'BobinaEstado'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = BobinaEstado.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'BobinaNo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaNo
					Case &ColumnsSelector_Column.ColumnName = !'BobinaOrigen'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = BobinaOrigen.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'BobinaKg'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaKg
					Case &ColumnsSelector_Column.ColumnName = !'BobinaHoraSalida'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = BobinaHoraSalida
					Case &ColumnsSelector_Column.ColumnName = !'BobinaCarreras'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaCarreras
					Case &ColumnsSelector_Column.ColumnName = !'BobinaMinutosEnReposo'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaMinutosEnReposo
					Case &ColumnsSelector_Column.ColumnName = !'BobinaReposoEnHoras'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = BobinaReposoEnHoras
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoBobinaCantCarrera'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoBobinaCantCarrera
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoOperadorId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoOperadorId
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoOperadorNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoOperadorNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoPrensaId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoPrensaId
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoPrensaNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoPrensaNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoTurnoId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoTurnoId
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoTurnoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoTurnoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoProductoId'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Number = PrensadoProductoId
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoProductoNombre'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = WWP_Export_SecureText(PrensadoProductoNombre)
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoProductoTipoMaterial'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Text = PrensadoProductoTipoMaterial.EnumerationDescription()
					Case &ColumnsSelector_Column.ColumnName = !'PrensadoFecha'
						&ExcelDocument.Cells(&CellRow, &FirstColumn + &VisibleColumnCount).Date = PrensadoFecha
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
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoBobinaId", '', !'Bobina Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoId", '', !'Prensado Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaId", '', !'Bobina Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaNoSerie", '', !'Bobina No Serie', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaEstado", '', !'Bobina Estado', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaNo", '', !'Bobina No', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaOrigen", '', !'Bobina Origen', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaKg", '', !'Bobina Kg', True, '')
	WWPBaseObjects.WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaHoraSalida", '', !'Bobina Hora Salida', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaCarreras", '', !'Bobina Carreras', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaMinutosEnReposo", '', !'Bobina Minutos En Reposo', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"BobinaReposoEnHoras", '', !'Tiempo Reposo (Hr)', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoBobinaCantCarrera", '', !'Cant Carrera', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoOperadorId", '', !'Prensado Operador Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoOperadorNombre", '', !'Prensado Operador Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoPrensaId", '', !'Prensa Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoPrensaNombre", '', !'Prensa Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoTurnoId", '', !'Prensado Turno Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoTurnoNombre", '', !'Prensado Turno Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoProductoId", '', !'Prensado Producto Id', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoProductoNombre", '', !'Prensado Producto Nombre', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoProductoTipoMaterial", '', !'Prensado Producto Tipo Material', True, '')
	WWP_ColumnsSelector_Add(&ColumnsSelector, !"PrensadoFecha", '', !'Prensado Fecha', True, '')
		
	&UserCustomValue = LoadColumnsSelectorState.Udp(!'DB.PrensadoBobinaWWColumnsSelector')
	If not(&UserCustomValue.IsEmpty())
		&ColumnsSelectorAux.FromXml(&UserCustomValue)
		WWPBaseObjects.WWP_ColumnSelector_UpdateColumns(&ColumnsSelectorAux, &ColumnsSelector)
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.PrensadoBobinaWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.PrensadoBobinaWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.PrensadoBobinaWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOBOBINAID"
				&TFPrensadoBobinaId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoBobinaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOID"
				&TFPrensadoId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAID"
				&TFBobinaId.FromString(&GridStateFilterValue.Value)
				&TFBobinaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE"
				&TFBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE_SEL"
				&TFBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAESTADO_SEL"
				&TFBobinaEstado_SelsJson = &GridStateFilterValue.Value
				&TFBobinaEstado_Sels.FromJson(&TFBobinaEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINANO"
				&TFBobinaNo.FromString(&GridStateFilterValue.Value)
				&TFBobinaNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAORIGEN_SEL"
				&TFBobinaOrigen_SelsJson = &GridStateFilterValue.Value
				&TFBobinaOrigen_Sels.FromJson(&TFBobinaOrigen_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAKG"
				&TFBobinaKg.FromString(&GridStateFilterValue.Value)
				&TFBobinaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAHORASALIDA"
				&TFBobinaHoraSalida.FromString(&GridStateFilterValue.Value)
				&TFBobinaHoraSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINACARRERAS"
				&TFBobinaCarreras.FromString(&GridStateFilterValue.Value)
				&TFBobinaCarreras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAMINUTOSENREPOSO"
				&TFBobinaMinutosEnReposo.FromString(&GridStateFilterValue.Value)
				&TFBobinaMinutosEnReposo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAREPOSOENHORAS"
				&TFBobinaReposoEnHoras.FromString(&GridStateFilterValue.Value)
				&TFBobinaReposoEnHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOBOBINACANTCARRERA"
				&TFPrensadoBobinaCantCarrera.FromString(&GridStateFilterValue.Value)
				&TFPrensadoBobinaCantCarrera_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORID"
				&TFPrensadoOperadorId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoOperadorId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE"
				&TFPrensadoOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOOPERADORNOMBRE_SEL"
				&TFPrensadoOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSAID"
				&TFPrensadoPrensaId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoPrensaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE"
				&TFPrensadoPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRENSANOMBRE_SEL"
				&TFPrensadoPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNOID"
				&TFPrensadoTurnoId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoTurnoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE"
				&TFPrensadoTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOTURNONOMBRE_SEL"
				&TFPrensadoTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTOID"
				&TFPrensadoProductoId.FromString(&GridStateFilterValue.Value)
				&TFPrensadoProductoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE"
				&TFPrensadoProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTONOMBRE_SEL"
				&TFPrensadoProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFPRENSADOPRODUCTOTIPOMATERIAL_SEL"
				&TFPrensadoProductoTipoMaterial_SelsJson = &GridStateFilterValue.Value
				&TFPrensadoProductoTipoMaterial_Sels.FromJson(&TFPrensadoProductoTipoMaterial_SelsJson)
			Case &GridStateFilterValue.Name = !"TFPRENSADOFECHA"
				&TFPrensadoFecha.FromString(&GridStateFilterValue.Value)
				&TFPrensadoFecha_To.FromString(&GridStateFilterValue.ValueTo)
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

