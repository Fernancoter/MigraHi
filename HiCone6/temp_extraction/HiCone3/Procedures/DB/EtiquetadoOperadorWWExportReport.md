# Procedure: EtiquetadoOperadorWWExportReport

- **Module:** DB
- **Description:** Etiquetado Operador WWExport Report
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
| EtiquetadoOperadorLineaEtiquetadoraDescription | Variable | VARCHAR |  | Etiquetado Operador Linea Etiquetadora Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFEtiquetadoOperadorId | Variable | NUMERIC |  | TFEtiquetado Operador Id |
| TFEtiquetadoOperadorId_To | Variable | NUMERIC |  | TFEtiquetado Operador Id_To |
| TFEtiquetadoOperadorFechaHora | Variable | DATETIME |  | TFEtiquetado Operador Fecha Hora |
| TFEtiquetadoOperadorFechaHora_To | Variable | DATETIME |  | TFEtiquetado Operador Fecha Hora_To |
| TFEtiquetadoOperadorVoBoCarrete_Sel | Variable | NUMERIC |  | TFEtiquetado Operador Vo Bo Carrete_Sel |
| TFEtiquetadoOperadorLineaEtiquetadora_SelsJson | Variable | LONGVARCHAR |  | TFEtiquetado Operador Linea Etiquetadora_Sels Json |
| TFEtiquetadoOperadorLineaEtiquetadora_SelDscs | Variable | VARCHAR |  | TFEtiquetado Operador Linea Etiquetadora_Sel Dscs |
| TFEtiquetadoOperadorLineaEtiquetadora_Sels | Variable | VARCHAR |  | TFEtiquetado Operador Linea Etiquetadora_Sels |
| TFEtiquetadoOperadorLineaEtiquetadora_Sel | Variable | VARCHAR |  | TFEtiquetado Operador Linea Etiquetadora_Sel |
| TFEtiquetadoOperadorObservacionCarrete | Variable | VARCHAR |  | TFEtiquetado Operador Observacion Carrete |
| TFEtiquetadoOperadorObservacionCarrete_Sel | Variable | VARCHAR |  | TFEtiquetado Operador Observacion Carrete_Sel |
| TFOrdenEtiquetadoId | Variable | NUMERIC |  | TFOrden Etiquetado Id |
| TFOrdenEtiquetadoId_To | Variable | NUMERIC |  | TFOrden Etiquetado Id_To |
| TFPalletEtiquetadoId | Variable | NUMERIC |  | TFPallet Etiquetado Id |
| TFPalletEtiquetadoId_To | Variable | NUMERIC |  | TFPallet Etiquetado Id_To |
| TFCarreteEtiquetadoId | Variable | NUMERIC |  | TFCarrete Etiquetado Id |
| TFCarreteEtiquetadoId_To | Variable | NUMERIC |  | TFCarrete Etiquetado Id_To |
| TFCarreteEtiquetadoSerie | Variable | VARCHAR |  | TFCarrete Etiquetado Serie |
| TFCarreteEtiquetadoSerie_Sel | Variable | VARCHAR |  | TFCarrete Etiquetado Serie_Sel |
| TFEtiquetadoOperadorId_To_Description | Variable | VARCHAR |  | TFEtiquetado Operador Id_To_Description |
| TFEtiquetadoOperadorFechaHora_To_Description | Variable | VARCHAR |  | TFEtiquetado Operador Fecha Hora_To_Description |
| FilterTFEtiquetadoOperadorVoBoCarrete_SelValueDescription | Variable | VARCHAR |  | Filter TFEtiquetado Operador Vo Bo Carrete_Sel Value Description |
| FilterTFEtiquetadoOperadorLineaEtiquetadora_SelValueDescription | Variable | VARCHAR |  | Filter TFEtiquetado Operador Linea Etiquetadora_Sel Value Description |
| TFOrdenEtiquetadoId_To_Description | Variable | VARCHAR |  | TFOrden Etiquetado Id_To_Description |
| TFPalletEtiquetadoId_To_Description | Variable | VARCHAR |  | TFPallet Etiquetado Id_To_Description |
| TFCarreteEtiquetadoId_To_Description | Variable | VARCHAR |  | TFCarrete Etiquetado Id_To_Description |
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
| EtiquetadoOperadorMotivoMolinoDescription | Variable | VARCHAR |  | Etiquetado Operador Motivo Molino Description |
| TFEtiquetadoOperadorMotivoMolino_SelsJson | Variable | LONGVARCHAR |  | TFEtiquetado Operador Motivo Molino_Sels Json |
| TFEtiquetadoOperadorMotivoMolino_SelDscs | Variable | VARCHAR |  | TFEtiquetado Operador Motivo Molino_Sel Dscs |
| TFEtiquetadoOperadorMotivoMolino_Sel | Variable | VARCHAR |  | TFEtiquetado Operador Motivo Molino_Sel |
| TFEtiquetadoOperadorMotivoMolino_Sels | Variable | VARCHAR |  | TFEtiquetado Operador Motivo Molino_Sels |
| FilterTFEtiquetadoOperadorMotivoMolino_SelValueDescription | Variable | VARCHAR |  | Filter TFEtiquetado Operador Motivo Molino_Sel Value Description |
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
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'etiquetadooperadorww_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Etiquetado Operador List"

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
	If not (&TFEtiquetadoOperadorId.IsEmpty() AND &TFEtiquetadoOperadorId_To.IsEmpty())
		print printBlockTFEtiquetadoOperadorId
		&TFEtiquetadoOperadorId_To_Description = format('%1 (%2)', "Operador Id", "WWP_TSTo")
		print printBlockTFEtiquetadoOperadorId_To
	EndIf
	If not (&TFEtiquetadoOperadorFechaHora.IsEmpty() AND &TFEtiquetadoOperadorFechaHora_To.IsEmpty())
		print printBlockTFEtiquetadoOperadorFechaHora
		&TFEtiquetadoOperadorFechaHora_To_Description = format('%1 (%2)', "Fecha Hora", "WWP_TSTo")
		print printBlockTFEtiquetadoOperadorFechaHora_To
	EndIf
	If not &TFEtiquetadoOperadorVoBoCarrete_Sel.IsEmpty()
		Do Case
			Case &TFEtiquetadoOperadorVoBoCarrete_Sel = 1
				&FilterTFEtiquetadoOperadorVoBoCarrete_SelValueDescription = "WWP_TSChecked" 
			Case &TFEtiquetadoOperadorVoBoCarrete_Sel = 2
				&FilterTFEtiquetadoOperadorVoBoCarrete_SelValueDescription = "WWP_TSUnChecked" 
		EndCase

		print printBlockTFEtiquetadoOperadorVoBoCarrete_Sel
	EndIf
	&TFEtiquetadoOperadorLineaEtiquetadora_Sels.FromJson(&TFEtiquetadoOperadorLineaEtiquetadora_SelsJson)
	If not &TFEtiquetadoOperadorLineaEtiquetadora_Sels.Count = 0
		&i = 1
		For &TFEtiquetadoOperadorLineaEtiquetadora_Sel in &TFEtiquetadoOperadorLineaEtiquetadora_Sels
			If &i = 1
				&TFEtiquetadoOperadorLineaEtiquetadora_SelDscs = ''
			Else
				&TFEtiquetadoOperadorLineaEtiquetadora_SelDscs += ', '
			EndIf
			&FilterTFEtiquetadoOperadorLineaEtiquetadora_SelValueDescription = &TFEtiquetadoOperadorLineaEtiquetadora_Sel.EnumerationDescription()

			&TFEtiquetadoOperadorLineaEtiquetadora_SelDscs += &FilterTFEtiquetadoOperadorLineaEtiquetadora_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFEtiquetadoOperadorLineaEtiquetadora_Sel
	EndIf
	If not &TFEtiquetadoOperadorObservacionCarrete_Sel.IsEmpty()
		print printBlockTFEtiquetadoOperadorObservacionCarrete_Sel
	Else
		If not &TFEtiquetadoOperadorObservacionCarrete.IsEmpty()
			print printBlockTFEtiquetadoOperadorObservacionCarrete
		EndIf
	EndIf
	&TFEtiquetadoOperadorMotivoMolino_Sels.FromJson(&TFEtiquetadoOperadorMotivoMolino_SelsJson)
	If not &TFEtiquetadoOperadorMotivoMolino_Sels.Count = 0
		&i = 1
		For &TFEtiquetadoOperadorMotivoMolino_Sel in &TFEtiquetadoOperadorMotivoMolino_Sels
			If &i = 1
				&TFEtiquetadoOperadorMotivoMolino_SelDscs = ''
			Else
				&TFEtiquetadoOperadorMotivoMolino_SelDscs += ', '
			EndIf
			&FilterTFEtiquetadoOperadorMotivoMolino_SelValueDescription = ''
			Do Case
				Case &TFEtiquetadoOperadorMotivoMolino_Sel.ToString().Trim() = !"N/A"
					&FilterTFEtiquetadoOperadorMotivoMolino_SelValueDescription = "No Aplica" 

				Case &TFEtiquetadoOperadorMotivoMolino_Sel.ToString().Trim() = !"Doble Etiqueta"
					&FilterTFEtiquetadoOperadorMotivoMolino_SelValueDescription = "Doble Etiqueta" 

				Case &TFEtiquetadoOperadorMotivoMolino_Sel.ToString().Trim() = !"Sin Etiqueta"
					&FilterTFEtiquetadoOperadorMotivoMolino_SelValueDescription = "Sin Etiqueta" 

			EndCase

			&TFEtiquetadoOperadorMotivoMolino_SelDscs += &FilterTFEtiquetadoOperadorMotivoMolino_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFEtiquetadoOperadorMotivoMolino_Sel
	EndIf
	If not (&TFOrdenEtiquetadoId.IsEmpty() AND &TFOrdenEtiquetadoId_To.IsEmpty())
		print printBlockTFOrdenEtiquetadoId
		&TFOrdenEtiquetadoId_To_Description = format('%1 (%2)', "Etiquetado Id", "WWP_TSTo")
		print printBlockTFOrdenEtiquetadoId_To
	EndIf
	If not (&TFPalletEtiquetadoId.IsEmpty() AND &TFPalletEtiquetadoId_To.IsEmpty())
		print printBlockTFPalletEtiquetadoId
		&TFPalletEtiquetadoId_To_Description = format('%1 (%2)', "Etiquetado Id", "WWP_TSTo")
		print printBlockTFPalletEtiquetadoId_To
	EndIf
	If not (&TFCarreteEtiquetadoId.IsEmpty() AND &TFCarreteEtiquetadoId_To.IsEmpty())
		print printBlockTFCarreteEtiquetadoId
		&TFCarreteEtiquetadoId_To_Description = format('%1 (%2)', "Etiquetado Id", "WWP_TSTo")
		print printBlockTFCarreteEtiquetadoId_To
	EndIf
	If not &TFCarreteEtiquetadoSerie_Sel.IsEmpty()
		print printBlockTFCarreteEtiquetadoSerie_Sel
	Else
		If not &TFCarreteEtiquetadoSerie.IsEmpty()
			print printBlockTFCarreteEtiquetadoSerie
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

	For each EtiquetadoOperador
		order EtiquetadoOperadorFechaHora  when &OrderedBy = 1 AND &OrderedDsc = False
		order (EtiquetadoOperadorFechaHora)  when &OrderedBy = 1 AND &OrderedDsc = True
		order EtiquetadoOperadorId  when &OrderedBy = 2 AND &OrderedDsc = False
		order (EtiquetadoOperadorId)  when &OrderedBy = 2 AND &OrderedDsc = True
		order EtiquetadoOperadorVoBoCarrete  when &OrderedBy = 3 AND &OrderedDsc = False
		order (EtiquetadoOperadorVoBoCarrete)  when &OrderedBy = 3 AND &OrderedDsc = True
		order EtiquetadoOperadorLineaEtiquetadora  when &OrderedBy = 4 AND &OrderedDsc = False
		order (EtiquetadoOperadorLineaEtiquetadora)  when &OrderedBy = 4 AND &OrderedDsc = True
		order EtiquetadoOperadorObservacionCarrete  when &OrderedBy = 5 AND &OrderedDsc = False
		order (EtiquetadoOperadorObservacionCarrete)  when &OrderedBy = 5 AND &OrderedDsc = True
		order EtiquetadoOperadorMotivoMolino  when &OrderedBy = 6 AND &OrderedDsc = False
		order (EtiquetadoOperadorMotivoMolino)  when &OrderedBy = 6 AND &OrderedDsc = True
		order OrdenEtiquetadoId  when &OrderedBy = 7 AND &OrderedDsc = False
		order (OrdenEtiquetadoId)  when &OrderedBy = 7 AND &OrderedDsc = True
		order Produccion.PalletEtiquetadoId  when &OrderedBy = 8 AND &OrderedDsc = False
		order (PalletEtiquetadoId)  when &OrderedBy = 8 AND &OrderedDsc = True
		order CarreteEtiquetadoId  when &OrderedBy = 9 AND &OrderedDsc = False
		order (CarreteEtiquetadoId)  when &OrderedBy = 9 AND &OrderedDsc = True
		order CarreteEtiquetadoSerie  when &OrderedBy = 10 AND &OrderedDsc = False
		order (CarreteEtiquetadoSerie)  when &OrderedBy = 10 AND &OrderedDsc = True
		
		using DB.EtiquetadoOperadorWWDS(&FilterFullText, &TFEtiquetadoOperadorId, &TFEtiquetadoOperadorId_To, &TFEtiquetadoOperadorFechaHora, &TFEtiquetadoOperadorFechaHora_To, &TFEtiquetadoOperadorVoBoCarrete_Sel
					, &TFEtiquetadoOperadorLineaEtiquetadora_Sels, &TFEtiquetadoOperadorObservacionCarrete, &TFEtiquetadoOperadorObservacionCarrete_Sel, &TFEtiquetadoOperadorMotivoMolino_Sels, &TFOrdenEtiquetadoId, &TFOrdenEtiquetadoId_To
					, &TFPalletEtiquetadoId, &TFPalletEtiquetadoId_To, &TFCarreteEtiquetadoId, &TFCarreteEtiquetadoId_To, &TFCarreteEtiquetadoSerie, &TFCarreteEtiquetadoSerie_Sel)
		&EtiquetadoOperadorLineaEtiquetadoraDescription = EtiquetadoOperadorLineaEtiquetadora.EnumerationDescription()
		&EtiquetadoOperadorMotivoMolinoDescription = ''
		Do Case
			Case EtiquetadoOperadorMotivoMolino.ToString().Trim() = !"N/A"
				&EtiquetadoOperadorMotivoMolinoDescription = "No Aplica" 

			Case EtiquetadoOperadorMotivoMolino.ToString().Trim() = !"Doble Etiqueta"
				&EtiquetadoOperadorMotivoMolinoDescription = "Doble Etiqueta" 

			Case EtiquetadoOperadorMotivoMolino.ToString().Trim() = !"Sin Etiqueta"
				&EtiquetadoOperadorMotivoMolinoDescription = "Sin Etiqueta" 

		EndCase

		Do 'BeforePrintLine'
		print printBlockLines_data
		Do 'AfterPrintLine'
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"DB.EtiquetadoOperadorWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.EtiquetadoOperadorWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.EtiquetadoOperadorWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFETIQUETADOOPERADORID"
				&TFEtiquetadoOperadorId.FromString(&GridStateFilterValue.Value)
				&TFEtiquetadoOperadorId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFETIQUETADOOPERADORFECHAHORA"
				&TFEtiquetadoOperadorFechaHora.FromString(&GridStateFilterValue.Value)
				&TFEtiquetadoOperadorFechaHora_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFETIQUETADOOPERADORVOBOCARRETE_SEL"
				&TFEtiquetadoOperadorVoBoCarrete_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFETIQUETADOOPERADORLINEAETIQUETADORA_SEL"
				&TFEtiquetadoOperadorLineaEtiquetadora_SelsJson = &GridStateFilterValue.Value
				&TFEtiquetadoOperadorLineaEtiquetadora_Sels.FromJson(&TFEtiquetadoOperadorLineaEtiquetadora_SelsJson)
			Case &GridStateFilterValue.Name = !"TFETIQUETADOOPERADOROBSERVACIONCARRETE"
				&TFEtiquetadoOperadorObservacionCarrete.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFETIQUETADOOPERADOROBSERVACIONCARRETE_SEL"
				&TFEtiquetadoOperadorObservacionCarrete_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFETIQUETADOOPERADORMOTIVOMOLINO_SEL"
				&TFEtiquetadoOperadorMotivoMolino_SelsJson = &GridStateFilterValue.Value
				&TFEtiquetadoOperadorMotivoMolino_Sels.FromJson(&TFEtiquetadoOperadorMotivoMolino_SelsJson)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOID"
				&TFOrdenEtiquetadoId.FromString(&GridStateFilterValue.Value)
				&TFOrdenEtiquetadoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFPALLETETIQUETADOID"
				&TFPalletEtiquetadoId.FromString(&GridStateFilterValue.Value)
				&TFPalletEtiquetadoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEETIQUETADOID"
				&TFCarreteEtiquetadoId.FromString(&GridStateFilterValue.Value)
				&TFCarreteEtiquetadoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFCARRETEETIQUETADOSERIE"
				&TFCarreteEtiquetadoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFCARRETEETIQUETADOSERIE_SEL"
				&TFCarreteEtiquetadoSerie_Sel.FromString(&GridStateFilterValue.Value)
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

Output_file("EtiquetadoOperadorWWExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

