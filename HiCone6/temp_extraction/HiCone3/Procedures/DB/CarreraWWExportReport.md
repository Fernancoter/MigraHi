# Procedure: CarreraWWExportReport

- **Module:** DB
- **Description:** Carrera WWExport Report
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
| CarreraEstadoDescription | Variable | VARCHAR |  | Carrera Estado Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFCarreraNo | Variable | NUMERIC |  | TFCarrera No |
| TFCarreraNo_To | Variable | NUMERIC |  | TFCarrera No_To |
| TFCarreraEstado_SelsJson | Variable | LONGVARCHAR |  | TFCarrera Estado_Sels Json |
| TFCarreraEstado_SelDscs | Variable | VARCHAR |  | TFCarrera Estado_Sel Dscs |
| TFCarreraEstado_Sel | Variable | VARCHAR |  | TFCarrera Estado_Sel |
| TFCarreraEstado_Sels | Variable | VARCHAR |  | TFCarrera Estado_Sels |
| TFCarreraPaletTerminado | Variable | VARCHAR |  | TFCarrera Palet Terminado |
| TFCarreraPaletTerminado_Sel | Variable | VARCHAR |  | TFCarrera Palet Terminado_Sel |
| TFCarreraFechaRegistro | Variable | DATETIME |  | TFCarrera Fecha Registro |
| TFCarreraFechaRegistro_To | Variable | DATETIME |  | TFCarrera Fecha Registro_To |
| TFInicioPBPrensadoId | Variable | NUMERIC |  | TFInicio PBPrensado Id |
| TFInicioPBPrensadoId_To | Variable | NUMERIC |  | TFInicio PBPrensado Id_To |
| TFInicioPBPrensaNombre | Variable | VARCHAR |  | TFInicio PBPrensa Nombre |
| TFInicioPBPrensaNombre_Sel | Variable | VARCHAR |  | TFInicio PBPrensa Nombre_Sel |
| TFInicioPBTurnoNombre | Variable | VARCHAR |  | TFInicio PBTurno Nombre |
| TFInicioPBTurnoNombre_Sel | Variable | VARCHAR |  | TFInicio PBTurno Nombre_Sel |
| TFInicioPrensadoBobinaNoSerie | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie |
| TFInicioPrensadoBobinaNoSerie_Sel | Variable | VARCHAR |  | TFInicio Prensado Bobina No Serie_Sel |
| TFCarreraNo_To_Description | Variable | VARCHAR |  | TFCarrera No_To_Description |
| FilterTFCarreraEstado_SelValueDescription | Variable | VARCHAR |  | Filter TFCarrera Estado_Sel Value Description |
| TFCarreraFechaRegistro_To_Description | Variable | VARCHAR |  | TFCarrera Fecha Registro_To_Description |
| TFInicioPBPrensadoId_To_Description | Variable | VARCHAR |  | TFInicio PBPrensado Id_To_Description |
| GridConditionalFormattingFilter | Variable | NUMERIC |  | Grid Conditional Formatting Filter |
| FixedValueOperatorDsc | Variable | VARCHAR |  | Fixed Value Operator Dsc |
| FixedValueOperatorValue | Variable | VARCHAR |  | Fixed Value Operator Value |
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
| NowDate | Variable | DATE |  | Now Date |
| TFCarreraInterrupcionId | Variable | NUMERIC |  | TFCarrera Interrupcion Id |
| TFCarreraInterrupcionId_To | Variable | NUMERIC |  | TFCarrera Interrupcion Id_To |
| TFCarreraInterrupcionMotivo | Variable | VARCHAR |  | TFCarrera Interrupcion Motivo |
| TFCarreraInterrupcionMotivo_Sel | Variable | VARCHAR |  | TFCarrera Interrupcion Motivo_Sel |
| TFCarreraInterrupcionTiempo | Variable | NUMERIC |  | TFCarrera Interrupcion Tiempo |
| TFCarreraInterrupcionTiempo_To | Variable | NUMERIC |  | TFCarrera Interrupcion Tiempo_To |
| TFCarreraDownTimeCode | Variable | VARCHAR |  | TFCarrera Down Time Code |
| TFCarreraDownTimeCode_Sel | Variable | VARCHAR |  | TFCarrera Down Time Code_Sel |
| TFCarreraDownTimeDescription | Variable | VARCHAR |  | TFCarrera Down Time Description |
| TFCarreraDownTimeDescription_Sel | Variable | VARCHAR |  | TFCarrera Down Time Description_Sel |
| TFCarreraInterrupcionId_To_Description | Variable | VARCHAR |  | TFCarrera Interrupcion Id_To_Description |
| TFCarreraInterrupcionTiempo_To_Description | Variable | VARCHAR |  | TFCarrera Interrupcion Tiempo_To_Description |
| IsAuthorizedCarreraInterrupcionId | Variable | Boolean |  | Is Authorized Carrera Interrupcion Id |
| CarreraInterrupcionIdData | Variable | VARCHAR |  | Carrera Interrupcion Id Data |
| CarreraInterrupcionIdTitle | Variable | VARCHAR |  | Carrera Interrupcion Id Title |
| IsAuthorizedCarreraInterrupcionTiempo | Variable | Boolean |  | Is Authorized Carrera Interrupcion Tiempo |
| CarreraInterrupcionTiempoData | Variable | VARCHAR |  | Carrera Interrupcion Tiempo Data |
| CarreraInterrupcionTiempoTitle | Variable | VARCHAR |  | Carrera Interrupcion Tiempo Title |
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
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'carreraww_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Carrera List"

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

Do 'AttributesSecurityCode'

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
	If not &GridConditionalFormattingFilter.IsEmpty()
		&FixedValueOperatorDsc = "WWP_FullTextFilterDescription"
		Do Case
			Case &GridConditionalFormattingFilter = 1
				&FixedValueOperatorValue = "En Proceso"
			Case &GridConditionalFormattingFilter = 2
				&FixedValueOperatorValue = "Terminada"
			Case &GridConditionalFormattingFilter = 3
				&FixedValueOperatorValue = "Validada"
		EndCase
		print printBlockFixedValueOperator
	EndIf
	If not (&TFCarreraNo.IsEmpty() AND &TFCarreraNo_To.IsEmpty())
		print printBlockTFCarreraNo
		&TFCarreraNo_To_Description = format('%1 (%2)', "No", "WWP_TSTo")
		print printBlockTFCarreraNo_To
	EndIf
	&TFCarreraEstado_Sels.FromJson(&TFCarreraEstado_SelsJson)
	If not &TFCarreraEstado_Sels.Count = 0
		&i = 1
		For &TFCarreraEstado_Sel in &TFCarreraEstado_Sels
			If &i = 1
				&TFCarreraEstado_SelDscs = ''
			Else
				&TFCarreraEstado_SelDscs += ', '
			EndIf
			&FilterTFCarreraEstado_SelValueDescription = &TFCarreraEstado_Sel.EnumerationDescription()

			&TFCarreraEstado_SelDscs += &FilterTFCarreraEstado_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFCarreraEstado_Sel
	EndIf
	If not &TFCarreraPaletTerminado_Sel.IsEmpty()
		print printBlockTFCarreraPaletTerminado_Sel
	Else
		If not &TFCarreraPaletTerminado.IsEmpty()
			print printBlockTFCarreraPaletTerminado
		EndIf
	EndIf
	If not (&TFCarreraFechaRegistro.IsEmpty() AND &TFCarreraFechaRegistro_To.IsEmpty())
		print printBlockTFCarreraFechaRegistro
		&TFCarreraFechaRegistro_To_Description = format('%1 (%2)', "Fecha Registro", "WWP_TSTo")
		print printBlockTFCarreraFechaRegistro_To
	EndIf
	If not (&TFInicioPBPrensadoId.IsEmpty() AND &TFInicioPBPrensadoId_To.IsEmpty())
		print printBlockTFInicioPBPrensadoId
		&TFInicioPBPrensadoId_To_Description = format('%1 (%2)', "Prensado Id", "WWP_TSTo")
		print printBlockTFInicioPBPrensadoId_To
	EndIf
	If not &TFInicioPBPrensaNombre_Sel.IsEmpty()
		print printBlockTFInicioPBPrensaNombre_Sel
	Else
		If not &TFInicioPBPrensaNombre.IsEmpty()
			print printBlockTFInicioPBPrensaNombre
		EndIf
	EndIf
	If not &TFInicioPBTurnoNombre_Sel.IsEmpty()
		print printBlockTFInicioPBTurnoNombre_Sel
	Else
		If not &TFInicioPBTurnoNombre.IsEmpty()
			print printBlockTFInicioPBTurnoNombre
		EndIf
	EndIf
	If not &TFInicioPrensadoBobinaNoSerie_Sel.IsEmpty()
		print printBlockTFInicioPrensadoBobinaNoSerie_Sel
	Else
		If not &TFInicioPrensadoBobinaNoSerie.IsEmpty()
			print printBlockTFInicioPrensadoBobinaNoSerie
		EndIf
	EndIf
	If not (&TFCarreraInterrupcionId.IsEmpty() AND &TFCarreraInterrupcionId_To.IsEmpty())
		print printBlockTFCarreraInterrupcionId
		&TFCarreraInterrupcionId_To_Description = format('%1 (%2)', "Interrupcion Id", "WWP_TSTo")
		print printBlockTFCarreraInterrupcionId_To
	EndIf
	If not &TFCarreraInterrupcionMotivo_Sel.IsEmpty()
		print printBlockTFCarreraInterrupcionMotivo_Sel
	Else
		If not &TFCarreraInterrupcionMotivo.IsEmpty()
			print printBlockTFCarreraInterrupcionMotivo
		EndIf
	EndIf
	If not (&TFCarreraInterrupcionTiempo.IsEmpty() AND &TFCarreraInterrupcionTiempo_To.IsEmpty())
		print printBlockTFCarreraInterrupcionTiempo
		&TFCarreraInterrupcionTiempo_To_Description = format('%1 (%2)', "Interrupcion Tiempo", "WWP_TSTo")
		print printBlockTFCarreraInterrupcionTiempo_To
	EndIf
	If not &TFCarreraDownTimeCode_Sel.IsEmpty()
		print printBlockTFCarreraDownTimeCode_Sel
	Else
		If not &TFCarreraDownTimeCode.IsEmpty()
			print printBlockTFCarreraDownTimeCode
		EndIf
	EndIf
	If not &TFCarreraDownTimeDescription_Sel.IsEmpty()
		print printBlockTFCarreraDownTimeDescription_Sel
	Else
		If not &TFCarreraDownTimeDescription.IsEmpty()
			print printBlockTFCarreraDownTimeDescription
		EndIf
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	print printBlockBeforeGrid

	If &IsAuthorizedCarreraInterrupcionId
		&CarreraInterrupcionIdTitle = "Interrupcion Id"
	EndIf

	If &IsAuthorizedCarreraInterrupcionTiempo
		&CarreraInterrupcionTiempoTitle = "Interrupcion Tiempo"
	EndIf
	print printBlockLines_titles

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintData'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	For each Carrera
		order CarreraNo  when &OrderedBy = 1 AND &OrderedDsc = False
		order (CarreraNo)  when &OrderedBy = 1 AND &OrderedDsc = True
		order CarreraEstado  when &OrderedBy = 2 AND &OrderedDsc = False
		order (CarreraEstado)  when &OrderedBy = 2 AND &OrderedDsc = True
		order CarreraPaletTerminado  when &OrderedBy = 3 AND &OrderedDsc = False
		order (CarreraPaletTerminado)  when &OrderedBy = 3 AND &OrderedDsc = True
		order CarreraFechaRegistro  when &OrderedBy = 4 AND &OrderedDsc = False
		order (CarreraFechaRegistro)  when &OrderedBy = 4 AND &OrderedDsc = True
		order InicioPBPrensadoId  when &OrderedBy = 5 AND &OrderedDsc = False
		order (InicioPBPrensadoId)  when &OrderedBy = 5 AND &OrderedDsc = True
		order InicioPBPrensaNombre  when &OrderedBy = 6 AND &OrderedDsc = False
		order (InicioPBPrensaNombre)  when &OrderedBy = 6 AND &OrderedDsc = True
		order InicioPBTurnoNombre  when &OrderedBy = 7 AND &OrderedDsc = False
		order (InicioPBTurnoNombre)  when &OrderedBy = 7 AND &OrderedDsc = True
		order InicioPrensadoBobinaNoSerie  when &OrderedBy = 8 AND &OrderedDsc = False
		order (InicioPrensadoBobinaNoSerie)  when &OrderedBy = 8 AND &OrderedDsc = True
		order CarreraInterrupcionId  when &OrderedBy = 9 AND &OrderedDsc = False
		order (CarreraInterrupcionId)  when &OrderedBy = 9 AND &OrderedDsc = True
		order CarreraInterrupcionMotivo  when &OrderedBy = 10 AND &OrderedDsc = False
		order (CarreraInterrupcionMotivo)  when &OrderedBy = 10 AND &OrderedDsc = True
		order CarreraInterrupcionTiempo  when &OrderedBy = 11 AND &OrderedDsc = False
		order (CarreraInterrupcionTiempo)  when &OrderedBy = 11 AND &OrderedDsc = True
		order CarreraDownTimeCode  when &OrderedBy = 12 AND &OrderedDsc = False
		order (CarreraDownTimeCode)  when &OrderedBy = 12 AND &OrderedDsc = True
		order CarreraDownTimeDescription  when &OrderedBy = 13 AND &OrderedDsc = False
		order (CarreraDownTimeDescription)  when &OrderedBy = 13 AND &OrderedDsc = True
		
		using CarreraWWDS(&GridConditionalFormattingFilter, &FilterFullText, &TFCarreraNo, &TFCarreraNo_To, &TFCarreraEstado_Sels, &TFCarreraPaletTerminado
					, &TFCarreraPaletTerminado_Sel, &TFCarreraFechaRegistro, &TFCarreraFechaRegistro_To, &TFInicioPBPrensadoId, &TFInicioPBPrensadoId_To, &TFInicioPBPrensaNombre
					, &TFInicioPBPrensaNombre_Sel, &TFInicioPBTurnoNombre, &TFInicioPBTurnoNombre_Sel, &TFInicioPrensadoBobinaNoSerie, &TFInicioPrensadoBobinaNoSerie_Sel, &TFCarreraInterrupcionId
					, &TFCarreraInterrupcionId_To, &TFCarreraInterrupcionMotivo, &TFCarreraInterrupcionMotivo_Sel, &TFCarreraInterrupcionTiempo, &TFCarreraInterrupcionTiempo_To, &TFCarreraDownTimeCode
					, &TFCarreraDownTimeCode_Sel, &TFCarreraDownTimeDescription, &TFCarreraDownTimeDescription_Sel)
		Where CarreraFechaRegistro>= &NowDate
		&CarreraEstadoDescription = CarreraEstado.EnumerationDescription()
		If &IsAuthorizedCarreraInterrupcionId
			&CarreraInterrupcionIdData = trim(CarreraInterrupcionId.ToFormattedString())
		EndIf
		If &IsAuthorizedCarreraInterrupcionTiempo
			&CarreraInterrupcionTiempoData = trim(CarreraInterrupcionTiempo.ToFormattedString())
		EndIf

		Do 'BeforePrintLine'
		print printBlockLines_data
		Do 'AfterPrintLine'
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.CarreraWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.CarreraWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.CarreraWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERANO"
				&TFCarreraNo.FromString(&GridStateFilterValue.Value)
				&TFCarreraNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRERAESTADO_SEL"
				&TFCarreraEstado_SelsJson = &GridStateFilterValue.Value
				&TFCarreraEstado_Sels.FromJson(&TFCarreraEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFCARRERAPALETTERMINADO"
				&TFCarreraPaletTerminado.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERAPALETTERMINADO_SEL"
				&TFCarreraPaletTerminado_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERAFECHAREGISTRO"
				&TFCarreraFechaRegistro.FromString(&GridStateFilterValue.Value)
				&TFCarreraFechaRegistro_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSADOID"
				&TFInicioPBPrensadoId.FromString(&GridStateFilterValue.Value)
				&TFInicioPBPrensadoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE"
				&TFInicioPBPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBPRENSANOMBRE_SEL"
				&TFInicioPBPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBTURNONOMBRE"
				&TFInicioPBTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPBTURNONOMBRE_SEL"
				&TFInicioPBTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE"
				&TFInicioPrensadoBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFINICIOPRENSADOBOBINANOSERIE_SEL"
				&TFInicioPrensadoBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERAINTERRUPCIONID"
				&TFCarreraInterrupcionId.FromString(&GridStateFilterValue.Value)
				&TFCarreraInterrupcionId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRERAINTERRUPCIONMOTIVO"
				&TFCarreraInterrupcionMotivo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERAINTERRUPCIONMOTIVO_SEL"
				&TFCarreraInterrupcionMotivo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERAINTERRUPCIONTIEMPO"
				&TFCarreraInterrupcionTiempo.FromString(&GridStateFilterValue.Value)
				&TFCarreraInterrupcionTiempo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRERADOWNTIMECODE"
				&TFCarreraDownTimeCode.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERADOWNTIMECODE_SEL"
				&TFCarreraDownTimeCode_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERADOWNTIMEDESCRIPTION"
				&TFCarreraDownTimeDescription.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRERADOWNTIMEDESCRIPTION_SEL"
				&TFCarreraDownTimeDescription_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"GRIDCFFILTER"
				&GridConditionalFormattingFilter.FromString(&GridStateFilterValue.Value)
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

Sub 'AttributesSecurityCode'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&IsAuthorizedCarreraInterrupcionId = (CarreraInterrupcionId > 0)
	&IsAuthorizedCarreraInterrupcionTiempo = (CarreraInterrupcionTiempo > 0)

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

Output_file("CarreraWWExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

