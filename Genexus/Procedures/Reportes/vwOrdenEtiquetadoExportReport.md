# Procedure: vwOrdenEtiquetadoExportReport

- **Module:** Reportes
- **Description:** vw Orden Etiquetado Export Report
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
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFOrdenEtiquetadoFechaInicio | Variable | DATETIME |  | TFOrden Etiquetado Fecha Inicio |
| TFOrdenEtiquetadoFechaInicio_To | Variable | DATETIME |  | TFOrden Etiquetado Fecha Inicio_To |
| TFOrdenEtiquetadoFechaTermina | Variable | DATETIME |  | TFOrden Etiquetado Fecha Termina |
| TFOrdenEtiquetadoFechaTermina_To | Variable | DATETIME |  | TFOrden Etiquetado Fecha Termina_To |
| TFOrdenEtiquetadoPiezasBuenas | Variable | NUMERIC |  | TFOrden Etiquetado Piezas Buenas |
| TFOrdenEtiquetadoPiezasBuenas_To | Variable | NUMERIC |  | TFOrden Etiquetado Piezas Buenas_To |
| TFOrdenEtiquetadoPiezasMolino | Variable | NUMERIC |  | TFOrden Etiquetado Piezas Molino |
| TFOrdenEtiquetadoPiezasMolino_To | Variable | NUMERIC |  | TFOrden Etiquetado Piezas Molino_To |
| TFOrdenEtiquetadoEtiquetadoraActiva | Variable | VARCHAR |  | TFOrden Etiquetado Etiquetadora Activa |
| TFOrdenEtiquetadoEtiquetadoraActiva_Sel | Variable | VARCHAR |  | TFOrden Etiquetado Etiquetadora Activa_Sel |
| TFOrdenEtiquetadoVelLineaUno | Variable | VARCHAR |  | TFOrden Etiquetado Vel Linea Uno |
| TFOrdenEtiquetadoVelLineaUno_Sel | Variable | VARCHAR |  | TFOrden Etiquetado Vel Linea Uno_Sel |
| TFOrdenEtiquetadoVelLineaDos | Variable | VARCHAR |  | TFOrden Etiquetado Vel Linea Dos |
| TFOrdenEtiquetadoVelLineaDos_Sel | Variable | VARCHAR |  | TFOrden Etiquetado Vel Linea Dos_Sel |
| TFOrdenEtiquetadoHorasUtiles | Variable | NUMERIC |  | TFOrden Etiquetado Horas Utiles |
| TFOrdenEtiquetadoHorasUtiles_To | Variable | NUMERIC |  | TFOrden Etiquetado Horas Utiles_To |
| TFOrdenEtiquetadoEficiencia | Variable | NUMERIC |  | TFOrden Etiquetado Eficiencia |
| TFOrdenEtiquetadoEficiencia_To | Variable | NUMERIC |  | TFOrden Etiquetado Eficiencia_To |
| TFOrdenEtiquetadoObservaciones | Variable | VARCHAR |  | TFOrden Etiquetado Observaciones |
| TFOrdenEtiquetadoObservaciones_Sel | Variable | VARCHAR |  | TFOrden Etiquetado Observaciones_Sel |
| TFTurnoEtiquetadoNombre | Variable | VARCHAR |  | TFTurno Etiquetado Nombre |
| TFTurnoEtiquetadoNombre_Sel | Variable | VARCHAR |  | TFTurno Etiquetado Nombre_Sel |
| TFOperadorEtiquetadoNombre | Variable | VARCHAR |  | TFOperador Etiquetado Nombre |
| TFOperadorEtiquetadoNombre_Sel | Variable | VARCHAR |  | TFOperador Etiquetado Nombre_Sel |
| TFOrdenEtiquetadoFechaInicio_To_Description | Variable | VARCHAR |  | TFOrden Etiquetado Fecha Inicio_To_Description |
| TFOrdenEtiquetadoFechaTermina_To_Description | Variable | VARCHAR |  | TFOrden Etiquetado Fecha Termina_To_Description |
| TFOrdenEtiquetadoPiezasBuenas_To_Description | Variable | VARCHAR |  | TFOrden Etiquetado Piezas Buenas_To_Description |
| TFOrdenEtiquetadoPiezasMolino_To_Description | Variable | VARCHAR |  | TFOrden Etiquetado Piezas Molino_To_Description |
| TFOrdenEtiquetadoHorasUtiles_To_Description | Variable | VARCHAR |  | TFOrden Etiquetado Horas Utiles_To_Description |
| TFOrdenEtiquetadoEficiencia_To_Description | Variable | VARCHAR |  | TFOrden Etiquetado Eficiencia_To_Description |
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
| GridConditionalFormattingFilter | Variable | NUMERIC |  | Grid Conditional Formatting Filter |
| FixedValueOperatorDsc | Variable | VARCHAR |  | Fixed Value Operator Dsc |
| FixedValueOperatorValue | Variable | VARCHAR |  | Fixed Value Operator Value |
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
&IsAuthorized = WWPBaseObjects.SecGAMIsAuthByFunctionalityKey.Udp(!'vwordenetiquetado_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Orden Etiquetado List"

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
	If not &GridConditionalFormattingFilter.IsEmpty()
		&FixedValueOperatorDsc = "WWP_FullTextFilterDescription"
		Do Case
			Case &GridConditionalFormattingFilter = 1
				&FixedValueOperatorValue = "Abierta"
			Case &GridConditionalFormattingFilter = 2
				&FixedValueOperatorValue = "Cerrada"
		EndCase
		print printBlockFixedValueOperator
	EndIf
	If not (&TFOrdenEtiquetadoFechaInicio.IsEmpty() AND &TFOrdenEtiquetadoFechaInicio_To.IsEmpty())
		print printBlockTFOrdenEtiquetadoFechaInicio
		&TFOrdenEtiquetadoFechaInicio_To_Description = format('%1 (%2)', "Fecha Inicio", "WWP_TSTo")
		print printBlockTFOrdenEtiquetadoFechaInicio_To
	EndIf
	If not (&TFOrdenEtiquetadoFechaTermina.IsEmpty() AND &TFOrdenEtiquetadoFechaTermina_To.IsEmpty())
		print printBlockTFOrdenEtiquetadoFechaTermina
		&TFOrdenEtiquetadoFechaTermina_To_Description = format('%1 (%2)', "Fecha Termina", "WWP_TSTo")
		print printBlockTFOrdenEtiquetadoFechaTermina_To
	EndIf
	If not &TFOperadorEtiquetadoNombre_Sel.IsEmpty()
		print printBlockTFOperadorEtiquetadoNombre_Sel
	Else
		If not &TFOperadorEtiquetadoNombre.IsEmpty()
			print printBlockTFOperadorEtiquetadoNombre
		EndIf
	EndIf
	If not &TFTurnoEtiquetadoNombre_Sel.IsEmpty()
		print printBlockTFTurnoEtiquetadoNombre_Sel
	Else
		If not &TFTurnoEtiquetadoNombre.IsEmpty()
			print printBlockTFTurnoEtiquetadoNombre
		EndIf
	EndIf
	If not (&TFOrdenEtiquetadoPiezasBuenas.IsEmpty() AND &TFOrdenEtiquetadoPiezasBuenas_To.IsEmpty())
		print printBlockTFOrdenEtiquetadoPiezasBuenas
		&TFOrdenEtiquetadoPiezasBuenas_To_Description = format('%1 (%2)', "Piezas Buenas", "WWP_TSTo")
		print printBlockTFOrdenEtiquetadoPiezasBuenas_To
	EndIf
	If not (&TFOrdenEtiquetadoPiezasMolino.IsEmpty() AND &TFOrdenEtiquetadoPiezasMolino_To.IsEmpty())
		print printBlockTFOrdenEtiquetadoPiezasMolino
		&TFOrdenEtiquetadoPiezasMolino_To_Description = format('%1 (%2)', "Piezas Molino", "WWP_TSTo")
		print printBlockTFOrdenEtiquetadoPiezasMolino_To
	EndIf
	If not &TFOrdenEtiquetadoEtiquetadoraActiva_Sel.IsEmpty()
		print printBlockTFOrdenEtiquetadoEtiquetadoraActiva_Sel
	Else
		If not &TFOrdenEtiquetadoEtiquetadoraActiva.IsEmpty()
			print printBlockTFOrdenEtiquetadoEtiquetadoraActiva
		EndIf
	EndIf
	If not &TFOrdenEtiquetadoVelLineaUno_Sel.IsEmpty()
		print printBlockTFOrdenEtiquetadoVelLineaUno_Sel
	Else
		If not &TFOrdenEtiquetadoVelLineaUno.IsEmpty()
			print printBlockTFOrdenEtiquetadoVelLineaUno
		EndIf
	EndIf
	If not &TFOrdenEtiquetadoVelLineaDos_Sel.IsEmpty()
		print printBlockTFOrdenEtiquetadoVelLineaDos_Sel
	Else
		If not &TFOrdenEtiquetadoVelLineaDos.IsEmpty()
			print printBlockTFOrdenEtiquetadoVelLineaDos
		EndIf
	EndIf
	If not (&TFOrdenEtiquetadoHorasUtiles.IsEmpty() AND &TFOrdenEtiquetadoHorasUtiles_To.IsEmpty())
		print printBlockTFOrdenEtiquetadoHorasUtiles
		&TFOrdenEtiquetadoHorasUtiles_To_Description = format('%1 (%2)', "Horas Útiles", "WWP_TSTo")
		print printBlockTFOrdenEtiquetadoHorasUtiles_To
	EndIf
	If not (&TFOrdenEtiquetadoEficiencia.IsEmpty() AND &TFOrdenEtiquetadoEficiencia_To.IsEmpty())
		print printBlockTFOrdenEtiquetadoEficiencia
		&TFOrdenEtiquetadoEficiencia_To_Description = format('%1 (%2)', "Eficiencia", "WWP_TSTo")
		print printBlockTFOrdenEtiquetadoEficiencia_To
	EndIf
	If not &TFOrdenEtiquetadoObservaciones_Sel.IsEmpty()
		print printBlockTFOrdenEtiquetadoObservaciones_Sel
	Else
		If not &TFOrdenEtiquetadoObservaciones.IsEmpty()
			print printBlockTFOrdenEtiquetadoObservaciones
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

	For each DB.OrdenEtiquetado
		order OrdenEtiquetadoFechaInicio  when &OrderedBy = 1 AND &OrderedDsc = False
		order (OrdenEtiquetadoFechaInicio)  when &OrderedBy = 1 AND &OrderedDsc = True
		order OrdenEtiquetadoFechaTermina  when &OrderedBy = 2 AND &OrderedDsc = False
		order (OrdenEtiquetadoFechaTermina)  when &OrderedBy = 2 AND &OrderedDsc = True
		order OperadorEtiquetadoNombre  when &OrderedBy = 3 AND &OrderedDsc = False
		order (OperadorEtiquetadoNombre)  when &OrderedBy = 3 AND &OrderedDsc = True
		order DB.TurnoEtiquetadoNombre  when &OrderedBy = 4 AND &OrderedDsc = False
		order (TurnoEtiquetadoNombre)  when &OrderedBy = 4 AND &OrderedDsc = True
		order OrdenEtiquetadoPiezasBuenas  when &OrderedBy = 5 AND &OrderedDsc = False
		order (OrdenEtiquetadoPiezasBuenas)  when &OrderedBy = 5 AND &OrderedDsc = True
		order OrdenEtiquetadoPiezasMolino  when &OrderedBy = 6 AND &OrderedDsc = False
		order (OrdenEtiquetadoPiezasMolino)  when &OrderedBy = 6 AND &OrderedDsc = True
		order OrdenEtiquetadoEtiquetadoraActiva  when &OrderedBy = 7 AND &OrderedDsc = False
		order (OrdenEtiquetadoEtiquetadoraActiva)  when &OrderedBy = 7 AND &OrderedDsc = True
		order OrdenEtiquetadoVelLineaUno  when &OrderedBy = 8 AND &OrderedDsc = False
		order (OrdenEtiquetadoVelLineaUno)  when &OrderedBy = 8 AND &OrderedDsc = True
		order OrdenEtiquetadoVelLineaDos  when &OrderedBy = 9 AND &OrderedDsc = False
		order (OrdenEtiquetadoVelLineaDos)  when &OrderedBy = 9 AND &OrderedDsc = True
		order OrdenEtiquetadoHorasUtiles  when &OrderedBy = 10 AND &OrderedDsc = False
		order (OrdenEtiquetadoHorasUtiles)  when &OrderedBy = 10 AND &OrderedDsc = True
		order OrdenEtiquetadoEficiencia  when &OrderedBy = 11 AND &OrderedDsc = False
		order (OrdenEtiquetadoEficiencia)  when &OrderedBy = 11 AND &OrderedDsc = True
		order OrdenEtiquetadoObservaciones  when &OrderedBy = 12 AND &OrderedDsc = False
		order (OrdenEtiquetadoObservaciones)  when &OrderedBy = 12 AND &OrderedDsc = True
		
		using vwOrdenEtiquetadoDS(&GridConditionalFormattingFilter, &FilterFullText, &TFOrdenEtiquetadoFechaInicio, &TFOrdenEtiquetadoFechaInicio_To, &TFOrdenEtiquetadoFechaTermina, &TFOrdenEtiquetadoFechaTermina_To
					, &TFOperadorEtiquetadoNombre, &TFOperadorEtiquetadoNombre_Sel, &TFTurnoEtiquetadoNombre, &TFTurnoEtiquetadoNombre_Sel, &TFOrdenEtiquetadoPiezasBuenas, &TFOrdenEtiquetadoPiezasBuenas_To
					, &TFOrdenEtiquetadoPiezasMolino, &TFOrdenEtiquetadoPiezasMolino_To, &TFOrdenEtiquetadoEtiquetadoraActiva, &TFOrdenEtiquetadoEtiquetadoraActiva_Sel, &TFOrdenEtiquetadoVelLineaUno, &TFOrdenEtiquetadoVelLineaUno_Sel
					, &TFOrdenEtiquetadoVelLineaDos, &TFOrdenEtiquetadoVelLineaDos_Sel, &TFOrdenEtiquetadoHorasUtiles, &TFOrdenEtiquetadoHorasUtiles_To, &TFOrdenEtiquetadoEficiencia, &TFOrdenEtiquetadoEficiencia_To
					, &TFOrdenEtiquetadoObservaciones, &TFOrdenEtiquetadoObservaciones_Sel)

		Do 'BeforePrintLine'
		print printBlockLines_data
		Do 'AfterPrintLine'
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Reportes.vwOrdenEtiquetadoGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Reportes.vwOrdenEtiquetadoGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Reportes.vwOrdenEtiquetadoGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOFECHAINICIO"
				&TFOrdenEtiquetadoFechaInicio.FromString(&GridStateFilterValue.Value)
				&TFOrdenEtiquetadoFechaInicio_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOFECHATERMINA"
				&TFOrdenEtiquetadoFechaTermina.FromString(&GridStateFilterValue.Value)
				&TFOrdenEtiquetadoFechaTermina_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFOPERADORETIQUETADONOMBRE"
				&TFOperadorEtiquetadoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFOPERADORETIQUETADONOMBRE_SEL"
				&TFOperadorEtiquetadoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFTURNOETIQUETADONOMBRE"
				&TFTurnoEtiquetadoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFTURNOETIQUETADONOMBRE_SEL"
				&TFTurnoEtiquetadoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOPIEZASBUENAS"
				&TFOrdenEtiquetadoPiezasBuenas.FromString(&GridStateFilterValue.Value)
				&TFOrdenEtiquetadoPiezasBuenas_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOPIEZASMOLINO"
				&TFOrdenEtiquetadoPiezasMolino.FromString(&GridStateFilterValue.Value)
				&TFOrdenEtiquetadoPiezasMolino_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOETIQUETADORAACTIVA"
				&TFOrdenEtiquetadoEtiquetadoraActiva.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOETIQUETADORAACTIVA_SEL"
				&TFOrdenEtiquetadoEtiquetadoraActiva_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOVELLINEAUNO"
				&TFOrdenEtiquetadoVelLineaUno.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOVELLINEAUNO_SEL"
				&TFOrdenEtiquetadoVelLineaUno_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOVELLINEADOS"
				&TFOrdenEtiquetadoVelLineaDos.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOVELLINEADOS_SEL"
				&TFOrdenEtiquetadoVelLineaDos_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOHORASUTILES"
				&TFOrdenEtiquetadoHorasUtiles.FromString(&GridStateFilterValue.Value)
				&TFOrdenEtiquetadoHorasUtiles_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOEFICIENCIA"
				&TFOrdenEtiquetadoEficiencia.FromString(&GridStateFilterValue.Value)
				&TFOrdenEtiquetadoEficiencia_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOOBSERVACIONES"
				&TFOrdenEtiquetadoObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFORDENETIQUETADOOBSERVACIONES_SEL"
				&TFOrdenEtiquetadoObservaciones_Sel.FromString(&GridStateFilterValue.Value)
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
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

Output_file("vwOrdenEtiquetadoExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

