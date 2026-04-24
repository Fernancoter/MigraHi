# Procedure: vwTrazabilidadExportReport

- **Module:** Produccion
- **Description:** vw Trazabilidad Export Report
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
| PaletEstatusDescription | Variable | VARCHAR |  | Palet Estatus Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
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
| TFPaletEstatus_SelDscs | Variable | VARCHAR |  | TFPalet Estatus_Sel Dscs |
| TFPaletEstatus_Sel | Variable | VARCHAR |  | TFPalet Estatus_Sel |
| TFPaletEstatus_Sels | Variable | VARCHAR |  | TFPalet Estatus_Sels |
| TFCarreteNoSerie | Variable | VARCHAR |  | TFCarrete No Serie |
| TFCarreteNoSerie_Sel | Variable | VARCHAR |  | TFCarrete No Serie_Sel |
| TFInicioPrensadoBobinaNoSerie | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie |
| TFInicioPrensadoBobinaNoSerie_Sel | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie_Sel |
| TFInicioPrensadoBobinaNo | Variable | NUMERIC |  | TFInicio Prensado Bobina No |
| TFInicioPrensadoBobinaNo_To | Variable | NUMERIC |  | TFInicio Prensado Bobina No_To |
| TFInicioPrensadoBobinaReposoHoras | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas |
| TFInicioPrensadoBobinaReposoHoras_To | Variable | NUMERIC |  | TFInicio Prensado Bobina Reposo Horas_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionHoraIniciaProceso | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso |
| TFExtrusionHoraIniciaProceso_To | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso_To |
| TFExtrusionHoraFinProceso | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso |
| TFExtrusionHoraFinProceso_To | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso_To |
| TFCarreraNo_To_Description | Variable | VARCHAR |  | TFCarrera No_To_Description |
| TFCarreteNoLinea_To_Description | Variable | VARCHAR |  | TFCarrete No Linea_To_Description |
| TFCarreraFechaRegistro_To_Description | Variable | VARCHAR |  | TFCarrera Fecha Registro_To_Description |
| TFCarreraFechaValidacion_To_Description | Variable | VARCHAR |  | TFCarrera Fecha Validacion_To_Description |
| TFCarreteId_To_Description | Variable | VARCHAR |  | TFCarrete Id_To_Description |
| TFPaletNo_To_Description | Variable | VARCHAR |  | TFPalet No_To_Description |
| TFPaletHoraInicioEnsamble_To_Description | Variable | VARCHAR |  | TFPalet Hora Inicio Ensamble_To_Description |
| TFPaletHoraFinEnsamble_To_Description | Variable | VARCHAR |  | TFPalet Hora Fin Ensamble_To_Description |
| FilterTFPaletEstatus_SelValueDescription | Variable | VARCHAR |  | Filter TFPalet Estatus_Sel Value Description |
| TFInicioPrensadoBobinaNo_To_Description | Variable | VARCHAR |  | TFInicio Prensado Bobina No_To_Description |
| TFInicioPrensadoBobinaReposoHoras_To_Description | Variable | VARCHAR |  | TFInicio Prensado Bobina Reposo Horas_To_Description |
| TFExtrusionHoraIniciaProceso_To_Description | Variable | VARCHAR |  | TFExtrusion Hora Inicia Proceso_To_Description |
| TFExtrusionHoraFinProceso_To_Description | Variable | VARCHAR |  | TFExtrusion Hora Fin Proceso_To_Description |
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
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'vwtrazabilidad_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Palet Carrete List"

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
	If not &TFInicioPBPrensaNombre_Sel.IsEmpty()
		print printBlockTFInicioPBPrensaNombre_Sel
	Else
		If not &TFInicioPBPrensaNombre.IsEmpty()
			print printBlockTFInicioPBPrensaNombre
		EndIf
	EndIf
	If not &TFPrensadoProductoNombre_Sel.IsEmpty()
		print printBlockTFPrensadoProductoNombre_Sel
	Else
		If not &TFPrensadoProductoNombre.IsEmpty()
			print printBlockTFPrensadoProductoNombre
		EndIf
	EndIf
	If not (&TFCarreraNo.IsEmpty() AND &TFCarreraNo_To.IsEmpty())
		print printBlockTFCarreraNo
		&TFCarreraNo_To_Description = format('%1 (%2)', "Carrera", "WWP_TSTo")
		print printBlockTFCarreraNo_To
	EndIf
	If not (&TFCarreteNoLinea.IsEmpty() AND &TFCarreteNoLinea_To.IsEmpty())
		print printBlockTFCarreteNoLinea
		&TFCarreteNoLinea_To_Description = format('%1 (%2)', "Línea", "WWP_TSTo")
		print printBlockTFCarreteNoLinea_To
	EndIf
	If not (&TFCarreraFechaRegistro.IsEmpty() AND &TFCarreraFechaRegistro_To.IsEmpty())
		print printBlockTFCarreraFechaRegistro
		&TFCarreraFechaRegistro_To_Description = format('%1 (%2)', "Fecha de Registro", "WWP_TSTo")
		print printBlockTFCarreraFechaRegistro_To
	EndIf
	If not (&TFCarreraFechaValidacion.IsEmpty() AND &TFCarreraFechaValidacion_To.IsEmpty())
		print printBlockTFCarreraFechaValidacion
		&TFCarreraFechaValidacion_To_Description = format('%1 (%2)', "Fecha Validación", "WWP_TSTo")
		print printBlockTFCarreraFechaValidacion_To
	EndIf
	If not (&TFCarreteId.IsEmpty() AND &TFCarreteId_To.IsEmpty())
		print printBlockTFCarreteId
		&TFCarreteId_To_Description = format('%1 (%2)', "Carrete", "WWP_TSTo")
		print printBlockTFCarreteId_To
	EndIf
	If not &TFPaletNoSerie_Sel.IsEmpty()
		print printBlockTFPaletNoSerie_Sel
	Else
		If not &TFPaletNoSerie.IsEmpty()
			print printBlockTFPaletNoSerie
		EndIf
	EndIf
	If not (&TFPaletNo.IsEmpty() AND &TFPaletNo_To.IsEmpty())
		print printBlockTFPaletNo
		&TFPaletNo_To_Description = format('%1 (%2)', "N° de Pallet", "WWP_TSTo")
		print printBlockTFPaletNo_To
	EndIf
	If not (&TFPaletHoraInicioEnsamble.IsEmpty() AND &TFPaletHoraInicioEnsamble_To.IsEmpty())
		print printBlockTFPaletHoraInicioEnsamble
		&TFPaletHoraInicioEnsamble_To_Description = format('%1 (%2)', "Pallet H. Ini. Ensamble", "WWP_TSTo")
		print printBlockTFPaletHoraInicioEnsamble_To
	EndIf
	If not (&TFPaletHoraFinEnsamble.IsEmpty() AND &TFPaletHoraFinEnsamble_To.IsEmpty())
		print printBlockTFPaletHoraFinEnsamble
		&TFPaletHoraFinEnsamble_To_Description = format('%1 (%2)', "Pallet H. Fin. Ensamble", "WWP_TSTo")
		print printBlockTFPaletHoraFinEnsamble_To
	EndIf
	If not &TFPrensadoOperadorNombre_Sel.IsEmpty()
		print printBlockTFPrensadoOperadorNombre_Sel
	Else
		If not &TFPrensadoOperadorNombre.IsEmpty()
			print printBlockTFPrensadoOperadorNombre
		EndIf
	EndIf
	&TFPaletEstatus_Sels.FromJson(&TFPaletEstatus_SelsJson)
	If not &TFPaletEstatus_Sels.Count = 0
		&i = 1
		For &TFPaletEstatus_Sel in &TFPaletEstatus_Sels
			If &i = 1
				&TFPaletEstatus_SelDscs = ''
			Else
				&TFPaletEstatus_SelDscs += ', '
			EndIf
			&FilterTFPaletEstatus_SelValueDescription = &TFPaletEstatus_Sel.EnumerationDescription()

			&TFPaletEstatus_SelDscs += &FilterTFPaletEstatus_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFPaletEstatus_Sel
	EndIf
	If not &TFCarreteNoSerie_Sel.IsEmpty()
		print printBlockTFCarreteNoSerie_Sel
	Else
		If not &TFCarreteNoSerie.IsEmpty()
			print printBlockTFCarreteNoSerie
		EndIf
	EndIf
	If not &TFInicioPrensadoBobinaNoSerie_Sel.IsEmpty()
		print printBlockTFInicioPrensadoBobinaNoSerie_Sel
	Else
		If not &TFInicioPrensadoBobinaNoSerie.IsEmpty()
			print printBlockTFInicioPrensadoBobinaNoSerie
		EndIf
	EndIf
	If not (&TFInicioPrensadoBobinaNo.IsEmpty() AND &TFInicioPrensadoBobinaNo_To.IsEmpty())
		print printBlockTFInicioPrensadoBobinaNo
		&TFInicioPrensadoBobinaNo_To_Description = format('%1 (%2)', "N° de Bobina", "WWP_TSTo")
		print printBlockTFInicioPrensadoBobinaNo_To
	EndIf
	If not (&TFInicioPrensadoBobinaReposoHoras.IsEmpty() AND &TFInicioPrensadoBobinaReposoHoras_To.IsEmpty())
		print printBlockTFInicioPrensadoBobinaReposoHoras
		&TFInicioPrensadoBobinaReposoHoras_To_Description = format('%1 (%2)', "Bobina Reposo (Hr)", "WWP_TSTo")
		print printBlockTFInicioPrensadoBobinaReposoHoras_To
	EndIf
	If not &TFExtrusionExtrusoraNombre_Sel.IsEmpty()
		print printBlockTFExtrusionExtrusoraNombre_Sel
	Else
		If not &TFExtrusionExtrusoraNombre.IsEmpty()
			print printBlockTFExtrusionExtrusoraNombre
		EndIf
	EndIf
	If not &TFExtrusionOperadorNombre_Sel.IsEmpty()
		print printBlockTFExtrusionOperadorNombre_Sel
	Else
		If not &TFExtrusionOperadorNombre.IsEmpty()
			print printBlockTFExtrusionOperadorNombre
		EndIf
	EndIf
	If not (&TFExtrusionHoraIniciaProceso.IsEmpty() AND &TFExtrusionHoraIniciaProceso_To.IsEmpty())
		print printBlockTFExtrusionHoraIniciaProceso
		&TFExtrusionHoraIniciaProceso_To_Description = format('%1 (%2)', "Hr. Ini. Extrusión", "WWP_TSTo")
		print printBlockTFExtrusionHoraIniciaProceso_To
	EndIf
	If not (&TFExtrusionHoraFinProceso.IsEmpty() AND &TFExtrusionHoraFinProceso_To.IsEmpty())
		print printBlockTFExtrusionHoraFinProceso
		&TFExtrusionHoraFinProceso_To_Description = format('%1 (%2)', "Hr. Fin. Extrusión", "WWP_TSTo")
		print printBlockTFExtrusionHoraFinProceso_To
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
		&PaletEstatusDescription = PaletEstatus.EnumerationDescription()

		Do 'BeforePrintLine'
		print printBlockLines_data
		Do 'AfterPrintLine'
	EndFor

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

Output_file("vwTrazabilidadExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

