# Procedure: vwPrensadoResultadoExportReport

- **Module:** Reportes
- **Description:** vw Prensado Resultado Export Report
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
| PrensadoLevasUnidadMedidaDescription | Variable | VARCHAR |  | Prensado Levas Unidad Medida Description |
| PrensadoRodillosUnidadMedidaDescription | Variable | VARCHAR |  | Prensado Rodillos Unidad Medida Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
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
| TFPrensadoLevasUnidadMedida_SelDscs | Variable | VARCHAR |  | TFPrensado Levas Unidad Medida_Sel Dscs |
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
| TFPrensadoRodillosUnidadMedida_SelDscs | Variable | VARCHAR |  | TFPrensado Rodillos Unidad Medida_Sel Dscs |
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
| TFPrensadoResultadoPiezasBuenas_To_Description | Variable | VARCHAR |  | TFPrensado Resultado Piezas Buenas_To_Description |
| TFPrensadoResultadoPiezasMolino_To_Description | Variable | VARCHAR |  | TFPrensado Resultado Piezas Molino_To_Description |
| TFPrensadoResultadoMermaKg_To_Description | Variable | VARCHAR |  | TFPrensado Resultado Merma Kg_To_Description |
| TFPrensadoResultadoNoPalets_To_Description | Variable | VARCHAR |  | TFPrensado Resultado No Palets_To_Description |
| TFPrensadoResultadoCarretesSobrantes_To_Description | Variable | VARCHAR |  | TFPrensado Resultado Carretes Sobrantes_To_Description |
| TFPrensadoResultadoGPMPrensa_To_Description | Variable | VARCHAR |  | TFPrensado Resultado GPMPrensa_To_Description |
| TFPrensadoResultadoGPMTotal_To_Description | Variable | VARCHAR |  | TFPrensado Resultado GPMTotal_To_Description |
| FilterTFPrensadoLevasUnidadMedida_SelValueDescription | Variable | VARCHAR |  | Filter TFPrensado Levas Unidad Medida_Sel Value Description |
| TFPrensadoLevasKgEntrada_To_Description | Variable | VARCHAR |  | TFPrensado Levas Kg Entrada_To_Description |
| TFPrensadoLevasKgSalida_To_Description | Variable | VARCHAR |  | TFPrensado Levas Kg Salida_To_Description |
| TFPrensadoLevasGradosEntrada_To_Description | Variable | VARCHAR |  | TFPrensado Levas Grados Entrada_To_Description |
| TFPrensadoLevasGradosSalida_To_Description | Variable | VARCHAR |  | TFPrensado Levas Grados Salida_To_Description |
| FilterTFPrensadoRodillosUnidadMedida_SelValueDescription | Variable | VARCHAR |  | Filter TFPrensado Rodillos Unidad Medida_Sel Value Description |
| TFPrensadoRodillosKgEntrada_To_Description | Variable | VARCHAR |  | TFPrensado Rodillos Kg Entrada_To_Description |
| TFPrensadoRodillosKgSalida_To_Description | Variable | VARCHAR |  | TFPrensado Rodillos Kg Salida_To_Description |
| TFPrensadoRodillosGradosEntrada_To_Description | Variable | VARCHAR |  | TFPrensado Rodillos Grados Entrada_To_Description |
| TFPrensadoRodillosGradosSalida_To_Description | Variable | VARCHAR |  | TFPrensado Rodillos Grados Salida_To_Description |
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
| TFPrensadoFecha | Variable | DATETIME |  | TFPrensado Fecha |
| TFPrensadoFecha_To | Variable | DATETIME |  | TFPrensado Fecha_To |
| TFPrensadoPrensaNombre | Variable | VARCHAR |  | TFPrensado Prensa Nombre |
| TFPrensadoPrensaNombre_Sel | Variable | VARCHAR |  | TFPrensado Prensa Nombre_Sel |
| TFPrensadoTurnoNombre | Variable | VARCHAR |  | TFPrensado Turno Nombre |
| TFPrensadoTurnoNombre_Sel | Variable | VARCHAR |  | TFPrensado Turno Nombre_Sel |
| TFPrensadoOperadorNombre | Variable | VARCHAR |  | TFPrensado Operador Nombre |
| TFPrensadoOperadorNombre_Sel | Variable | VARCHAR |  | TFPrensado Operador Nombre_Sel |
| TFPrensadoFecha_To_Description | Variable | VARCHAR |  | TFPrensado Fecha_To_Description |
| TFCarreraId | Variable | NUMERIC |  | TFCarrera Id |
| TFCarreraId_To | Variable | NUMERIC |  | TFCarrera Id_To |
| TFCarreraId_To_Description | Variable | VARCHAR |  | TFCarrera Id_To_Description |
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

// Exports the contents of a grid (using the selected order and filters) to a PDF file.
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'vwprensadoresultado_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Prensado Resultado List"

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
	If not (&TFPrensadoResultadoPiezasBuenas.IsEmpty() AND &TFPrensadoResultadoPiezasBuenas_To.IsEmpty())
		print printBlockTFPrensadoResultadoPiezasBuenas
		&TFPrensadoResultadoPiezasBuenas_To_Description = format('%1 (%2)', "Piezas Buenas", "WWP_TSTo")
		print printBlockTFPrensadoResultadoPiezasBuenas_To
	EndIf
	If not (&TFPrensadoResultadoPiezasMolino.IsEmpty() AND &TFPrensadoResultadoPiezasMolino_To.IsEmpty())
		print printBlockTFPrensadoResultadoPiezasMolino
		&TFPrensadoResultadoPiezasMolino_To_Description = format('%1 (%2)', "Piezas Molino", "WWP_TSTo")
		print printBlockTFPrensadoResultadoPiezasMolino_To
	EndIf
	If not (&TFPrensadoResultadoMermaKg.IsEmpty() AND &TFPrensadoResultadoMermaKg_To.IsEmpty())
		print printBlockTFPrensadoResultadoMermaKg
		&TFPrensadoResultadoMermaKg_To_Description = format('%1 (%2)', "Merma Kg", "WWP_TSTo")
		print printBlockTFPrensadoResultadoMermaKg_To
	EndIf
	If not (&TFPrensadoResultadoNoPalets.IsEmpty() AND &TFPrensadoResultadoNoPalets_To.IsEmpty())
		print printBlockTFPrensadoResultadoNoPalets
		&TFPrensadoResultadoNoPalets_To_Description = format('%1 (%2)', "No Palets", "WWP_TSTo")
		print printBlockTFPrensadoResultadoNoPalets_To
	EndIf
	If not (&TFPrensadoResultadoCarretesSobrantes.IsEmpty() AND &TFPrensadoResultadoCarretesSobrantes_To.IsEmpty())
		print printBlockTFPrensadoResultadoCarretesSobrantes
		&TFPrensadoResultadoCarretesSobrantes_To_Description = format('%1 (%2)', "Carretes Sobrantes", "WWP_TSTo")
		print printBlockTFPrensadoResultadoCarretesSobrantes_To
	EndIf
	If not &TFPrensadoResultadoObservaciones_Sel.IsEmpty()
		print printBlockTFPrensadoResultadoObservaciones_Sel
	Else
		If not &TFPrensadoResultadoObservaciones.IsEmpty()
			print printBlockTFPrensadoResultadoObservaciones
		EndIf
	EndIf
	If not &TFPrensadoResultadoRPMLinea_Sel.IsEmpty()
		print printBlockTFPrensadoResultadoRPMLinea_Sel
	Else
		If not &TFPrensadoResultadoRPMLinea.IsEmpty()
			print printBlockTFPrensadoResultadoRPMLinea
		EndIf
	EndIf
	If not (&TFPrensadoResultadoGPMPrensa.IsEmpty() AND &TFPrensadoResultadoGPMPrensa_To.IsEmpty())
		print printBlockTFPrensadoResultadoGPMPrensa
		&TFPrensadoResultadoGPMPrensa_To_Description = format('%1 (%2)', "GPM Prensa", "WWP_TSTo")
		print printBlockTFPrensadoResultadoGPMPrensa_To
	EndIf
	If not (&TFPrensadoResultadoGPMTotal.IsEmpty() AND &TFPrensadoResultadoGPMTotal_To.IsEmpty())
		print printBlockTFPrensadoResultadoGPMTotal
		&TFPrensadoResultadoGPMTotal_To_Description = format('%1 (%2)', "GPM Total", "WWP_TSTo")
		print printBlockTFPrensadoResultadoGPMTotal_To
	EndIf
	If not &TFPrensadoResultadoHerramientas_Sel.IsEmpty()
		print printBlockTFPrensadoResultadoHerramientas_Sel
	Else
		If not &TFPrensadoResultadoHerramientas.IsEmpty()
			print printBlockTFPrensadoResultadoHerramientas
		EndIf
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
	If not (&TFPrensadoLevasKgEntrada.IsEmpty() AND &TFPrensadoLevasKgEntrada_To.IsEmpty())
		print printBlockTFPrensadoLevasKgEntrada
		&TFPrensadoLevasKgEntrada_To_Description = format('%1 (%2)', "Levas Entrada (Kg)", "WWP_TSTo")
		print printBlockTFPrensadoLevasKgEntrada_To
	EndIf
	If not (&TFPrensadoLevasKgSalida.IsEmpty() AND &TFPrensadoLevasKgSalida_To.IsEmpty())
		print printBlockTFPrensadoLevasKgSalida
		&TFPrensadoLevasKgSalida_To_Description = format('%1 (%2)', "Levas Salida (Kg)", "WWP_TSTo")
		print printBlockTFPrensadoLevasKgSalida_To
	EndIf
	If not (&TFPrensadoLevasGradosEntrada.IsEmpty() AND &TFPrensadoLevasGradosEntrada_To.IsEmpty())
		print printBlockTFPrensadoLevasGradosEntrada
		&TFPrensadoLevasGradosEntrada_To_Description = format('%1 (%2)', "Levas Entrada (Grados)", "WWP_TSTo")
		print printBlockTFPrensadoLevasGradosEntrada_To
	EndIf
	If not (&TFPrensadoLevasGradosSalida.IsEmpty() AND &TFPrensadoLevasGradosSalida_To.IsEmpty())
		print printBlockTFPrensadoLevasGradosSalida
		&TFPrensadoLevasGradosSalida_To_Description = format('%1 (%2)', "Levas Salida (Grados)", "WWP_TSTo")
		print printBlockTFPrensadoLevasGradosSalida_To
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
	If not (&TFPrensadoRodillosKgEntrada.IsEmpty() AND &TFPrensadoRodillosKgEntrada_To.IsEmpty())
		print printBlockTFPrensadoRodillosKgEntrada
		&TFPrensadoRodillosKgEntrada_To_Description = format('%1 (%2)', "Rodillos Entrada (Kg)", "WWP_TSTo")
		print printBlockTFPrensadoRodillosKgEntrada_To
	EndIf
	If not (&TFPrensadoRodillosKgSalida.IsEmpty() AND &TFPrensadoRodillosKgSalida_To.IsEmpty())
		print printBlockTFPrensadoRodillosKgSalida
		&TFPrensadoRodillosKgSalida_To_Description = format('%1 (%2)', "Rodillos Salida (Kg)", "WWP_TSTo")
		print printBlockTFPrensadoRodillosKgSalida_To
	EndIf
	If not (&TFPrensadoRodillosGradosEntrada.IsEmpty() AND &TFPrensadoRodillosGradosEntrada_To.IsEmpty())
		print printBlockTFPrensadoRodillosGradosEntrada
		&TFPrensadoRodillosGradosEntrada_To_Description = format('%1 (%2)', "Rodillos Entrada (Grados)", "WWP_TSTo")
		print printBlockTFPrensadoRodillosGradosEntrada_To
	EndIf
	If not (&TFPrensadoRodillosGradosSalida.IsEmpty() AND &TFPrensadoRodillosGradosSalida_To.IsEmpty())
		print printBlockTFPrensadoRodillosGradosSalida
		&TFPrensadoRodillosGradosSalida_To_Description = format('%1 (%2)', "Rodillos Salida (Grados)", "WWP_TSTo")
		print printBlockTFPrensadoRodillosGradosSalida_To
	EndIf
	If not (&TFPrensadoFecha.IsEmpty() AND &TFPrensadoFecha_To.IsEmpty())
		print printBlockTFPrensadoFecha
		&TFPrensadoFecha_To_Description = format('%1 (%2)', "Fecha", "WWP_TSTo")
		print printBlockTFPrensadoFecha_To
	EndIf
	If not &TFPrensadoTurnoNombre_Sel.IsEmpty()
		print printBlockTFPrensadoTurnoNombre_Sel
	Else
		If not &TFPrensadoTurnoNombre.IsEmpty()
			print printBlockTFPrensadoTurnoNombre
		EndIf
	EndIf
	If not &TFPrensadoPrensaNombre_Sel.IsEmpty()
		print printBlockTFPrensadoPrensaNombre_Sel
	Else
		If not &TFPrensadoPrensaNombre.IsEmpty()
			print printBlockTFPrensadoPrensaNombre
		EndIf
	EndIf
	If not &TFPrensadoOperadorNombre_Sel.IsEmpty()
		print printBlockTFPrensadoOperadorNombre_Sel
	Else
		If not &TFPrensadoOperadorNombre.IsEmpty()
			print printBlockTFPrensadoOperadorNombre
		EndIf
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

	For each DB.PrensadoResultado
		order PrensadoResultadoPiezasBuenas  when &OrderedBy = 1 AND &OrderedDsc = False
		order (PrensadoResultadoPiezasBuenas)  when &OrderedBy = 1 AND &OrderedDsc = True
		order PrensadoResultadoPiezasMolino  when &OrderedBy = 2 AND &OrderedDsc = False
		order (PrensadoResultadoPiezasMolino)  when &OrderedBy = 2 AND &OrderedDsc = True
		order PrensadoResultadoMermaKg  when &OrderedBy = 3 AND &OrderedDsc = False
		order (PrensadoResultadoMermaKg)  when &OrderedBy = 3 AND &OrderedDsc = True
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
		order (PrensadoRodillosKgEntrada)  when &OrderedBy = 17 AND &OrderedDsc = True
		order PrensadoRodillosKgSalida  when &OrderedBy = 18 AND &OrderedDsc = False
		order (PrensadoRodillosKgSalida)  when &OrderedBy = 18 AND &OrderedDsc = True
		order PrensadoRodillosGradosEntrada  when &OrderedBy = 19 AND &OrderedDsc = False
		order (PrensadoRodillosGradosEntrada)  when &OrderedBy = 19 AND &OrderedDsc = True
		order PrensadoRodillosGradosSalida  when &OrderedBy = 20 AND &OrderedDsc = False
		order (PrensadoRodillosGradosSalida)  when &OrderedBy = 20 AND &OrderedDsc = True
		order PrensadoFecha  when &OrderedBy = 21 AND &OrderedDsc = False
		order (PrensadoFecha)  when &OrderedBy = 21 AND &OrderedDsc = True
		order PrensadoTurnoNombre  when &OrderedBy = 22 AND &OrderedDsc = False
		order (PrensadoTurnoNombre)  when &OrderedBy = 22 AND &OrderedDsc = True
		order DB.PrensadoPrensaNombre  when &OrderedBy = 23 AND &OrderedDsc = False
		order (PrensadoPrensaNombre)  when &OrderedBy = 23 AND &OrderedDsc = True
		order PrensadoOperadorNombre  when &OrderedBy = 24 AND &OrderedDsc = False
		order (PrensadoOperadorNombre)  when &OrderedBy = 24 AND &OrderedDsc = True
		
		using vwPrensadoResultadoDS(&FilterFullText, &TFPrensadoResultadoPiezasBuenas, &TFPrensadoResultadoPiezasBuenas_To, &TFPrensadoResultadoPiezasMolino, &TFPrensadoResultadoPiezasMolino_To, &TFPrensadoResultadoMermaKg
					, &TFPrensadoResultadoMermaKg_To, &TFPrensadoResultadoNoPalets, &TFPrensadoResultadoNoPalets_To, &TFPrensadoResultadoCarretesSobrantes, &TFPrensadoResultadoCarretesSobrantes_To, &TFPrensadoResultadoObservaciones
					, &TFPrensadoResultadoObservaciones_Sel, &TFPrensadoResultadoRPMLinea, &TFPrensadoResultadoRPMLinea_Sel, &TFPrensadoResultadoGPMPrensa, &TFPrensadoResultadoGPMPrensa_To, &TFPrensadoResultadoGPMTotal
					, &TFPrensadoResultadoGPMTotal_To, &TFPrensadoResultadoHerramientas, &TFPrensadoResultadoHerramientas_Sel, &TFPrensadoLevasUnidadMedida_Sels, &TFPrensadoLevasKgEntrada, &TFPrensadoLevasKgEntrada_To
					, &TFPrensadoLevasKgSalida, &TFPrensadoLevasKgSalida_To, &TFPrensadoLevasGradosEntrada, &TFPrensadoLevasGradosEntrada_To, &TFPrensadoLevasGradosSalida, &TFPrensadoLevasGradosSalida_To
					, &TFPrensadoRodillosUnidadMedida_Sels, &TFPrensadoRodillosKgEntrada, &TFPrensadoRodillosKgEntrada_To, &TFPrensadoRodillosKgSalida, &TFPrensadoRodillosKgSalida_To, &TFPrensadoRodillosGradosEntrada
					, &TFPrensadoRodillosGradosEntrada_To, &TFPrensadoRodillosGradosSalida, &TFPrensadoRodillosGradosSalida_To, &TFPrensadoFecha, &TFPrensadoFecha_To, &TFPrensadoTurnoNombre
					, &TFPrensadoTurnoNombre_Sel, &TFPrensadoPrensaNombre, &TFPrensadoPrensaNombre_Sel, &TFPrensadoOperadorNombre, &TFPrensadoOperadorNombre_Sel)
		&PrensadoLevasUnidadMedidaDescription = PrensadoLevasUnidadMedida.EnumerationDescription()
		&PrensadoRodillosUnidadMedidaDescription = PrensadoRodillosUnidadMedida.EnumerationDescription()

		Do 'BeforePrintLine'
		print printBlockLines_data
		Do 'AfterPrintLine'
	EndFor

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

Output_file("vwPrensadoResultadoExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

