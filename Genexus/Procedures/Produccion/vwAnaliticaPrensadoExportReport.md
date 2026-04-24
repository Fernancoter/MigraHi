# Procedure: vwAnaliticaPrensadoExportReport

- **Module:** Produccion
- **Description:** vw Analitica Prensado Export Report
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| OrderedBy | Variable | NUMERIC |  | Ordered By |
| OrderedDsc | Variable | Boolean |  | Ordered Dsc |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| PrensadoProductoTipoMaterialDescription | Variable | VARCHAR |  | Prensado Producto Tipo Material Description |
| PrensadoEstadoDescription | Variable | VARCHAR |  | Prensado Estado Description |
| PrensadoLevasUnidadMedidaDescription | Variable | VARCHAR |  | Prensado Levas Unidad Medida Description |
| PrensadoRodillosUnidadMedidaDescription | Variable | VARCHAR |  | Prensado Rodillos Unidad Medida Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
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
| TFPrensadoProductoTipoMaterial_SelDscs | Variable | VARCHAR |  | TFPrensado Producto Tipo Material_Sel Dscs |
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
| TFPrensadoEstado_SelDscs | Variable | VARCHAR |  | TFPrensado Estado_Sel Dscs |
| TFPrensadoEstado_Sels | Variable | VARCHAR |  | TFPrensado Estado_Sels |
| TFPrensadoEstado_Sel | Variable | VARCHAR |  | TFPrensado Estado_Sel |
| TFPrensadoLevasUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Levas Unidad Medida_Sels Json |
| TFPrensadoLevasUnidadMedida_SelDscs | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sel Dscs |
| TFPrensadoLevasUnidadMedida_Sels | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sels |
| TFPrensadoLevasUnidadMedida_Sel | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sel |
| TFPrensadoRodillosUnidadMedida_SelsJson | Variable | LONGVARCHAR |  | TFPrensado Rodillos Unidad Medida_Sels Json |
| TFPrensadoRodillosUnidadMedida_SelDscs | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sel Dscs |
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
| TFPrensadoId_To_Description | Variable | VARCHAR |  | TFPrensado Id_To_Description |
| TFPrensadoFecha_To_Description | Variable | VARCHAR |  | TFPrensado Fecha_To_Description |
| TFPrensadoPrensaId_To_Description | Variable | VARCHAR |  | TFPrensado Prensa Id_To_Description |
| TFPrensadoTurnoId_To_Description | Variable | VARCHAR |  | TFPrensado Turno Id_To_Description |
| TFPrensadoProductoId_To_Description | Variable | VARCHAR |  | TFPrensado Producto Id_To_Description |
| FilterTFPrensadoProductoTipoMaterial_SelValueDescription | Variable | VARCHAR |  | Filter TFPrensado Producto Tipo Material_Sel Value Description |
| TFPrensadoOperadorId_To_Description | Variable | VARCHAR |  | TFPrensado Operador Id_To_Description |
| TFPrensadoBobinaMermaKg_To_Description | Variable | VARCHAR |  | TFPrensado Bobina Merma Kg_To_Description |
| FilterTFPrensadoEstado_SelValueDescription | Variable | VARCHAR |  | Filter TFPrensado Estado_Sel Value Description |
| FilterTFPrensadoLevasUnidadMedida_SelValueDescription | Variable | VARCHAR |  | Filter TFPrensado Levas Unidad Medida_Sel Value Description |
| FilterTFPrensadoRodillosUnidadMedida_SelValueDescription | Variable | VARCHAR |  | Filter TFPrensado Rodillos Unidad Medida_Sel Value Description |
| TFPrensadoLevasKgEntrada_To_Description | Variable | VARCHAR |  | TFPrensado Levas Kg Entrada_To_Description |
| TFPrensadoLevasKgSalida_To_Description | Variable | VARCHAR |  | TFPrensado Levas Kg Salida_To_Description |
| TFPrensadoLevasGradosEntrada_To_Description | Variable | VARCHAR |  | TFPrensado Levas Grados Entrada_To_Description |
| TFPrensadoLevasGradosSalida_To_Description | Variable | VARCHAR |  | TFPrensado Levas Grados Salida_To_Description |
| TFPrensadoRodillosKgEntrada_To_Description | Variable | VARCHAR |  | TFPrensado Rodillos Kg Entrada_To_Description |
| TFPrensadoRodillosKgSalida_To_Description | Variable | VARCHAR |  | TFPrensado Rodillos Kg Salida_To_Description |
| TFPrensadoRodillosGradosEntrada_To_Description | Variable | VARCHAR |  | TFPrensado Rodillos Grados Entrada_To_Description |
| TFPrensadoRodillosGradosSalida_To_Description | Variable | VARCHAR |  | TFPrensado Rodillos Grados Salida_To_Description |
| TFPrensadoTroquelId_To_Description | Variable | VARCHAR |  | TFPrensado Troquel Id_To_Description |
| TFPrensadoHoraIniciaProceso_To_Description | Variable | VARCHAR |  | TFPrensado Hora Inicia Proceso_To_Description |
| TFPrensadoHoraFinProceso_To_Description | Variable | VARCHAR |  | TFPrensado Hora Fin Proceso_To_Description |
| TFPrensadoMeta_To_Description | Variable | VARCHAR |  | TFPrensado Meta_To_Description |
| TFPrensadoTotalPalets_To_Description | Variable | VARCHAR |  | TFPrensado Total Palets_To_Description |
| TFPrensadoResultadoTotalPalets_To_Description | Variable | VARCHAR |  | TFPrensado Resultado Total Palets_To_Description |
| i | Variable | NUMERIC |  | i |
| AddressLine1 | Variable | VARCHAR |  | Address Line1 |
| AddressLine2 | Variable | VARCHAR |  | Address Line2 |
| AddressLine3 | Variable | VARCHAR |  | Address Line3 |
| AppName | Variable | VARCHAR |  | App Name |
| Attribute | Variable | VARCHAR |  | Attribute |
| DateInfo | Variable | VARCHAR |  | Date Info |
| Filter | Variable | VARCHAR |  | Filter |
| Mail | Variable | VARCHAR |  | Mail |
| PageInfo | Variable | VARCHAR |  | Page Info |
| Phone | Variable | VARCHAR |  | Phone |
| Title | Variable | VARCHAR |  | Title |
| Website | Variable | VARCHAR |  | Website |
| TFPrensadoTiempoInterrupcion | Variable | NUMERIC |  | TFPrensado Tiempo Interrupcion |
| TFPrensadoTiempoInterrupcion_To | Variable | NUMERIC |  | TFPrensado Tiempo Interrupcion_To |
| TFPrensadoTiempoInterrupcion_To_Description | Variable | VARCHAR |  | TFPrensado Tiempo Interrupcion_To_Description |
| NowDate | Variable | DATE |  | Now Date |
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

// Exports the contents of a grid (using the selected order and filters) to a PDF file.
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'vwanaliticaprensado_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Prensado List"

//Report Template Source
	Header
		&AppName = "DVelop Software Solutions"
		&Phone = !"+1 550 8923"
		&Mail = !"info@mail.com"
		&Website = !"http://www.web.com"
		&AddressLine1 = !"French Boulevard 2859"
		&AddressLine2 = !"Downtown"
		&AddressLine3 = !"Paris, France"
		Print printTitle
	End 
	Footer
		&PageInfo = "Page: " + &Page.ToString().Trim()
		&DateInfo = "Date: " + &Today.ToFormattedString()
		Print printFooter
	End

	Do 'PrintFilters'

	Do 'PrintColumnTitles'

	Do 'PrintData'

	Do 'PrintFooter'

EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'PrintFilters'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	If not &FilterFullText.IsEmpty()
		print printBlockFilterFilterFullText
	EndIf
	If not (&TFPrensadoFecha.IsEmpty() AND &TFPrensadoFecha_To.IsEmpty())
		print printBlockTFPrensadoFecha
		&TFPrensadoFecha_To_Description = format('%1 (%2)', "Fecha", "WWP_TSTo")
		print printBlockTFPrensadoFecha_To
	EndIf
	If not &TFPrensadoPrensaNombre_Sel.IsEmpty()
		print printBlockTFPrensadoPrensaNombre_Sel
	Else
		If not &TFPrensadoPrensaNombre.IsEmpty()
			print printBlockTFPrensadoPrensaNombre
		EndIf
	EndIf
	If not &TFPrensadoTurnoNombre_Sel.IsEmpty()
		print printBlockTFPrensadoTurnoNombre_Sel
	Else
		If not &TFPrensadoTurnoNombre.IsEmpty()
			print printBlockTFPrensadoTurnoNombre
		EndIf
	EndIf
	If not &TFPrensadoProductoNombre_Sel.IsEmpty()
		print printBlockTFPrensadoProductoNombre_Sel
	Else
		If not &TFPrensadoProductoNombre.IsEmpty()
			print printBlockTFPrensadoProductoNombre
		EndIf
	EndIf
	If not &TFPrensadoOperadorNombre_Sel.IsEmpty()
		print printBlockTFPrensadoOperadorNombre_Sel
	Else
		If not &TFPrensadoOperadorNombre.IsEmpty()
			print printBlockTFPrensadoOperadorNombre
		EndIf
	EndIf
	If not (&TFPrensadoTiempoInterrupcion.IsEmpty() AND &TFPrensadoTiempoInterrupcion_To.IsEmpty())
		print printBlockTFPrensadoTiempoInterrupcion
		&TFPrensadoTiempoInterrupcion_To_Description = format('%1 (%2)', "Tiempo Interrupción (min)", "WWP_TSTo")
		print printBlockTFPrensadoTiempoInterrupcion_To
	EndIf
	&TFPrensadoEstado_Sels.FromJson(&TFPrensadoEstado_SelsJson)
	If not &TFPrensadoEstado_Sels.Count = 0
		&i = 1
		For &TFPrensadoEstado_Sel in &TFPrensadoEstado_Sels
			If &i = 1
				&TFPrensadoEstado_SelDscs = ''
			Else
				&TFPrensadoEstado_SelDscs += ', '
			EndIf
			&FilterTFPrensadoEstado_SelValueDescription = &TFPrensadoEstado_Sel.EnumerationDescription()

			&TFPrensadoEstado_SelDscs += &FilterTFPrensadoEstado_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFPrensadoEstado_Sel
	EndIf
	&TFPrensadoLevasUnidadMedida_Sels.FromJson(&TFPrensadoLevasUnidadMedida_SelsJson)
	If not &TFPrensadoLevasUnidadMedida_Sels.Count = 0
		&i = 1
		For &TFPrensadoLevasUnidadMedida_Sel in &TFPrensadoLevasUnidadMedida_Sels
			If &i = 1
				&TFPrensadoLevasUnidadMedida_SelDscs = ''
			Else
				&TFPrensadoLevasUnidadMedida_SelDscs += ', '
			EndIf
			&FilterTFPrensadoLevasUnidadMedida_SelValueDescription = &TFPrensadoLevasUnidadMedida_Sel.EnumerationDescription()

			&TFPrensadoLevasUnidadMedida_SelDscs += &FilterTFPrensadoLevasUnidadMedida_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFPrensadoLevasUnidadMedida_Sel
	EndIf
	&TFPrensadoRodillosUnidadMedida_Sels.FromJson(&TFPrensadoRodillosUnidadMedida_SelsJson)
	If not &TFPrensadoRodillosUnidadMedida_Sels.Count = 0
		&i = 1
		For &TFPrensadoRodillosUnidadMedida_Sel in &TFPrensadoRodillosUnidadMedida_Sels
			If &i = 1
				&TFPrensadoRodillosUnidadMedida_SelDscs = ''
			Else
				&TFPrensadoRodillosUnidadMedida_SelDscs += ', '
			EndIf
			&FilterTFPrensadoRodillosUnidadMedida_SelValueDescription = &TFPrensadoRodillosUnidadMedida_Sel.EnumerationDescription()

			&TFPrensadoRodillosUnidadMedida_SelDscs += &FilterTFPrensadoRodillosUnidadMedida_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFPrensadoRodillosUnidadMedida_Sel
	EndIf
	If not (&TFPrensadoLevasKgEntrada.IsEmpty() AND &TFPrensadoLevasKgEntrada_To.IsEmpty())
		print printBlockTFPrensadoLevasKgEntrada
		&TFPrensadoLevasKgEntrada_To_Description = format('%1 (%2)', "Levas Kg Entrada", "WWP_TSTo")
		print printBlockTFPrensadoLevasKgEntrada_To
	EndIf
	If not (&TFPrensadoLevasKgSalida.IsEmpty() AND &TFPrensadoLevasKgSalida_To.IsEmpty())
		print printBlockTFPrensadoLevasKgSalida
		&TFPrensadoLevasKgSalida_To_Description = format('%1 (%2)', "Levas Kg Salida", "WWP_TSTo")
		print printBlockTFPrensadoLevasKgSalida_To
	EndIf
	If not (&TFPrensadoLevasGradosEntrada.IsEmpty() AND &TFPrensadoLevasGradosEntrada_To.IsEmpty())
		print printBlockTFPrensadoLevasGradosEntrada
		&TFPrensadoLevasGradosEntrada_To_Description = format('%1 (%2)', "Levas Grados Entrada", "WWP_TSTo")
		print printBlockTFPrensadoLevasGradosEntrada_To
	EndIf
	If not (&TFPrensadoLevasGradosSalida.IsEmpty() AND &TFPrensadoLevasGradosSalida_To.IsEmpty())
		print printBlockTFPrensadoLevasGradosSalida
		&TFPrensadoLevasGradosSalida_To_Description = format('%1 (%2)', "Levas Grados Salida", "WWP_TSTo")
		print printBlockTFPrensadoLevasGradosSalida_To
	EndIf
	If not (&TFPrensadoRodillosKgEntrada.IsEmpty() AND &TFPrensadoRodillosKgEntrada_To.IsEmpty())
		print printBlockTFPrensadoRodillosKgEntrada
		&TFPrensadoRodillosKgEntrada_To_Description = format('%1 (%2)', "Rodillos Kg Entrada", "WWP_TSTo")
		print printBlockTFPrensadoRodillosKgEntrada_To
	EndIf
	If not (&TFPrensadoRodillosKgSalida.IsEmpty() AND &TFPrensadoRodillosKgSalida_To.IsEmpty())
		print printBlockTFPrensadoRodillosKgSalida
		&TFPrensadoRodillosKgSalida_To_Description = format('%1 (%2)', "Rodillos Kg Salida", "WWP_TSTo")
		print printBlockTFPrensadoRodillosKgSalida_To
	EndIf
	If not (&TFPrensadoRodillosGradosEntrada.IsEmpty() AND &TFPrensadoRodillosGradosEntrada_To.IsEmpty())
		print printBlockTFPrensadoRodillosGradosEntrada
		&TFPrensadoRodillosGradosEntrada_To_Description = format('%1 (%2)', "Rodillos Grados Entrada", "WWP_TSTo")
		print printBlockTFPrensadoRodillosGradosEntrada_To
	EndIf
	If not (&TFPrensadoRodillosGradosSalida.IsEmpty() AND &TFPrensadoRodillosGradosSalida_To.IsEmpty())
		print printBlockTFPrensadoRodillosGradosSalida
		&TFPrensadoRodillosGradosSalida_To_Description = format('%1 (%2)', "Rodillos Grados Salida", "WWP_TSTo")
		print printBlockTFPrensadoRodillosGradosSalida_To
	EndIf
	If not &TFPrensadoTroquelNombre_Sel.IsEmpty()
		print printBlockTFPrensadoTroquelNombre_Sel
	Else
		If not &TFPrensadoTroquelNombre.IsEmpty()
			print printBlockTFPrensadoTroquelNombre
		EndIf
	EndIf
	If not (&TFPrensadoHoraIniciaProceso.IsEmpty() AND &TFPrensadoHoraIniciaProceso_To.IsEmpty())
		print printBlockTFPrensadoHoraIniciaProceso
		&TFPrensadoHoraIniciaProceso_To_Description = format('%1 (%2)', "Inicia Proceso", "WWP_TSTo")
		print printBlockTFPrensadoHoraIniciaProceso_To
	EndIf
	If not (&TFPrensadoHoraFinProceso.IsEmpty() AND &TFPrensadoHoraFinProceso_To.IsEmpty())
		print printBlockTFPrensadoHoraFinProceso
		&TFPrensadoHoraFinProceso_To_Description = format('%1 (%2)', "Fin Proceso", "WWP_TSTo")
		print printBlockTFPrensadoHoraFinProceso_To
	EndIf
	If not (&TFPrensadoResultadoTotalPalets.IsEmpty() AND &TFPrensadoResultadoTotalPalets_To.IsEmpty())
		print printBlockTFPrensadoResultadoTotalPalets
		&TFPrensadoResultadoTotalPalets_To_Description = format('%1 (%2)', "Pallets", "WWP_TSTo")
		print printBlockTFPrensadoResultadoTotalPalets_To
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	print printBlockBeforeGrid
	print printBlockLines_titles

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintData'

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
		&PrensadoEstadoDescription = PrensadoEstado.EnumerationDescription()
		&PrensadoLevasUnidadMedidaDescription = PrensadoLevasUnidadMedida.EnumerationDescription()
		&PrensadoRodillosUnidadMedidaDescription = PrensadoRodillosUnidadMedida.EnumerationDescription()

		Do 'BeforePrintLine'
		Do Case
			Case PrensadoEstado = EstadoPrensado.EnProceso
				print printBlockLines_data_2
			Case PrensadoEstado = EstadoPrensado.Programado
				print printBlockLines_data_3
			Case PrensadoEstado = EstadoPrensado.Terminado
				print printBlockLines_data_4
			Case PrensadoEstado = EstadoPrensado.Intermedio
				print printBlockLines_data_5
			Otherwise
				print printBlockLines_data
		EndCase
		
		Do 'AfterPrintLine'
	EndFor

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

Sub 'BeforePrintLine'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'AfterPrintLine'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintFooter'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */



	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

Output_file("vwAnaliticaPrensadoExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

