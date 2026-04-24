# Procedure: ExtrusionWWExportReport

- **Module:** DB
- **Description:** Extrusion WWExport Report
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
| ExtrusionEstadoDescription | Variable | VARCHAR |  | Extrusion Estado Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFExtrusionBobinas | Variable | NUMERIC |  | TFExtrusion Bobinas |
| TFExtrusionBobinas_To | Variable | NUMERIC |  | TFExtrusion Bobinas_To |
| TFExtrusionLotePaqueteAditivos | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos |
| TFExtrusionLotePaqueteAditivos_Sel | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sel |
| TFExtrusionId | Variable | NUMERIC |  | TFExtrusion Id |
| TFExtrusionId_To | Variable | NUMERIC |  | TFExtrusion Id_To |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFExtrusionTurnoNombre | Variable | VARCHAR |  | TFExtrusion Turno Nombre |
| TFExtrusionTurnoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Turno Nombre_Sel |
| TFExtrusionProductoNombre | Variable | VARCHAR |  | TFExtrusion Producto Nombre |
| TFExtrusionProductoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Producto Nombre_Sel |
| TFExtrusionTiempoInterrupcion | Variable | NUMERIC |  | TFExtrusion Tiempo Interrupcion |
| TFExtrusionTiempoInterrupcion_To | Variable | NUMERIC |  | TFExtrusion Tiempo Interrupcion_To |
| TFExtrusionFecha | Variable | DATETIME |  | TFExtrusion Fecha |
| TFExtrusionFecha_To | Variable | DATETIME |  | TFExtrusion Fecha_To |
| TFExtrusionMeta | Variable | NUMERIC |  | TFExtrusion Meta |
| TFExtrusionMeta_To | Variable | NUMERIC |  | TFExtrusion Meta_To |
| TFExtrusionEstado_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Estado_Sels Json |
| TFExtrusionEstado_SelDscs | Variable | VARCHAR |  | TFExtrusion Estado_Sel Dscs |
| TFExtrusionEstado_Sel | Variable | VARCHAR |  | TFExtrusion Estado_Sel |
| TFExtrusionEstado_Sels | Variable | VARCHAR |  | TFExtrusion Estado_Sels |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionHoraIniciaProceso | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso |
| TFExtrusionHoraIniciaProceso_To | Variable | DATETIME |  | TFExtrusion Hora Inicia Proceso_To |
| TFExtrusionHoraFinProceso | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso |
| TFExtrusionHoraFinProceso_To | Variable | DATETIME |  | TFExtrusion Hora Fin Proceso_To |
| TFExtrusionBobinas_To_Description | Variable | VARCHAR |  | TFExtrusion Bobinas_To_Description |
| TFExtrusionId_To_Description | Variable | VARCHAR |  | TFExtrusion Id_To_Description |
| TFExtrusionTiempoInterrupcion_To_Description | Variable | VARCHAR |  | TFExtrusion Tiempo Interrupcion_To_Description |
| TFExtrusionFecha_To_Description | Variable | VARCHAR |  | TFExtrusion Fecha_To_Description |
| TFExtrusionMeta_To_Description | Variable | VARCHAR |  | TFExtrusion Meta_To_Description |
| FilterTFExtrusionEstado_SelValueDescription | Variable | VARCHAR |  | Filter TFExtrusion Estado_Sel Value Description |
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
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'extrusionww_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Extrusion List"

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
	If not (&TFExtrusionBobinas.IsEmpty() AND &TFExtrusionBobinas_To.IsEmpty())
		print printBlockTFExtrusionBobinas
		&TFExtrusionBobinas_To_Description = format('%1 (%2)', "Bobinas", "WWP_TSTo")
		print printBlockTFExtrusionBobinas_To
	EndIf
	If not &TFExtrusionLotePaqueteAditivos_Sel.IsEmpty()
		print printBlockTFExtrusionLotePaqueteAditivos_Sel
	Else
		If not &TFExtrusionLotePaqueteAditivos.IsEmpty()
			print printBlockTFExtrusionLotePaqueteAditivos
		EndIf
	EndIf
	If not (&TFExtrusionId.IsEmpty() AND &TFExtrusionId_To.IsEmpty())
		print printBlockTFExtrusionId
		&TFExtrusionId_To_Description = format('%1 (%2)', "Id", "WWP_TSTo")
		print printBlockTFExtrusionId_To
	EndIf
	If not &TFExtrusionExtrusoraNombre_Sel.IsEmpty()
		print printBlockTFExtrusionExtrusoraNombre_Sel
	Else
		If not &TFExtrusionExtrusoraNombre.IsEmpty()
			print printBlockTFExtrusionExtrusoraNombre
		EndIf
	EndIf
	If not &TFExtrusionTurnoNombre_Sel.IsEmpty()
		print printBlockTFExtrusionTurnoNombre_Sel
	Else
		If not &TFExtrusionTurnoNombre.IsEmpty()
			print printBlockTFExtrusionTurnoNombre
		EndIf
	EndIf
	If not &TFExtrusionProductoNombre_Sel.IsEmpty()
		print printBlockTFExtrusionProductoNombre_Sel
	Else
		If not &TFExtrusionProductoNombre.IsEmpty()
			print printBlockTFExtrusionProductoNombre
		EndIf
	EndIf
	If not (&TFExtrusionTiempoInterrupcion.IsEmpty() AND &TFExtrusionTiempoInterrupcion_To.IsEmpty())
		print printBlockTFExtrusionTiempoInterrupcion
		&TFExtrusionTiempoInterrupcion_To_Description = format('%1 (%2)', "Tiempo Interrupción (min)", "WWP_TSTo")
		print printBlockTFExtrusionTiempoInterrupcion_To
	EndIf
	If not (&TFExtrusionFecha.IsEmpty() AND &TFExtrusionFecha_To.IsEmpty())
		print printBlockTFExtrusionFecha
		&TFExtrusionFecha_To_Description = format('%1 (%2)', "Fecha", "WWP_TSTo")
		print printBlockTFExtrusionFecha_To
	EndIf
	If not (&TFExtrusionMeta.IsEmpty() AND &TFExtrusionMeta_To.IsEmpty())
		print printBlockTFExtrusionMeta
		&TFExtrusionMeta_To_Description = format('%1 (%2)', "Meta", "WWP_TSTo")
		print printBlockTFExtrusionMeta_To
	EndIf
	&TFExtrusionEstado_Sels.FromJson(&TFExtrusionEstado_SelsJson)
	If not &TFExtrusionEstado_Sels.Count = 0
		&i = 1
		For &TFExtrusionEstado_Sel in &TFExtrusionEstado_Sels
			If &i = 1
				&TFExtrusionEstado_SelDscs = ''
			Else
				&TFExtrusionEstado_SelDscs += ', '
			EndIf
			&FilterTFExtrusionEstado_SelValueDescription = &TFExtrusionEstado_Sel.EnumerationDescription()

			&TFExtrusionEstado_SelDscs += &FilterTFExtrusionEstado_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFExtrusionEstado_Sel
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
		&TFExtrusionHoraIniciaProceso_To_Description = format('%1 (%2)', "Inicia Proceso", "WWP_TSTo")
		print printBlockTFExtrusionHoraIniciaProceso_To
	EndIf
	If not (&TFExtrusionHoraFinProceso.IsEmpty() AND &TFExtrusionHoraFinProceso_To.IsEmpty())
		print printBlockTFExtrusionHoraFinProceso
		&TFExtrusionHoraFinProceso_To_Description = format('%1 (%2)', "Fin Proceso", "WWP_TSTo")
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

	For each Extrusion
		order ExtrusionExtrusoraNombre  when &OrderedBy = 1 AND &OrderedDsc = False
		order (ExtrusionExtrusoraNombre)  when &OrderedBy = 1 AND &OrderedDsc = True
		order ExtrusionLotePaqueteAditivos  when &OrderedBy = 2 AND &OrderedDsc = False
		order (ExtrusionLotePaqueteAditivos)  when &OrderedBy = 2 AND &OrderedDsc = True
		order ExtrusionId  when &OrderedBy = 3 AND &OrderedDsc = False
		order (ExtrusionId)  when &OrderedBy = 3 AND &OrderedDsc = True
		order ExtrusionTurnoNombre  when &OrderedBy = 4 AND &OrderedDsc = False
		order (ExtrusionTurnoNombre)  when &OrderedBy = 4 AND &OrderedDsc = True
		order ExtrusionProductoNombre  when &OrderedBy = 5 AND &OrderedDsc = False
		order (ExtrusionProductoNombre)  when &OrderedBy = 5 AND &OrderedDsc = True
		order ExtrusionFecha  when &OrderedBy = 6 AND &OrderedDsc = False
		order (ExtrusionFecha)  when &OrderedBy = 6 AND &OrderedDsc = True
		order ExtrusionMeta  when &OrderedBy = 7 AND &OrderedDsc = False
		order (ExtrusionMeta)  when &OrderedBy = 7 AND &OrderedDsc = True
		order ExtrusionEstado  when &OrderedBy = 8 AND &OrderedDsc = False
		order (ExtrusionEstado)  when &OrderedBy = 8 AND &OrderedDsc = True
		order ExtrusionOperadorNombre  when &OrderedBy = 9 AND &OrderedDsc = False
		order (ExtrusionOperadorNombre)  when &OrderedBy = 9 AND &OrderedDsc = True
		order ExtrusionHoraIniciaProceso  when &OrderedBy = 10 AND &OrderedDsc = False
		order (ExtrusionHoraIniciaProceso)  when &OrderedBy = 10 AND &OrderedDsc = True
		order ExtrusionHoraFinProceso  when &OrderedBy = 11 AND &OrderedDsc = False
		order (ExtrusionHoraFinProceso)  when &OrderedBy = 11 AND &OrderedDsc = True
		
		using ExtrusionWWDS(&FilterFullText, &TFExtrusionBobinas, &TFExtrusionBobinas_To, &TFExtrusionLotePaqueteAditivos, &TFExtrusionLotePaqueteAditivos_Sel, &TFExtrusionId
					, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel, &TFExtrusionProductoNombre
					, &TFExtrusionProductoNombre_Sel, &TFExtrusionTiempoInterrupcion, &TFExtrusionTiempoInterrupcion_To, &TFExtrusionFecha, &TFExtrusionFecha_To, &TFExtrusionMeta
					, &TFExtrusionMeta_To, &TFExtrusionEstado_Sels, &TFExtrusionOperadorNombre, &TFExtrusionOperadorNombre_Sel, &TFExtrusionHoraIniciaProceso, &TFExtrusionHoraIniciaProceso_To
					, &TFExtrusionHoraFinProceso, &TFExtrusionHoraFinProceso_To)
		Where ExtrusionFecha>= &NowDate
		&ExtrusionEstadoDescription = ExtrusionEstado.EnumerationDescription()

		Do 'BeforePrintLine'
		Do Case
			Case ExtrusionEstado = EstadoExtrusion.EnProceso 
				print printBlockLines_data_2
			Case ExtrusionEstado = EstadoExtrusion.Programada
				print printBlockLines_data_3
			Case ExtrusionEstado = EstadoExtrusion.Terminada
				print printBlockLines_data_4
			Case ExtrusionEstado = EstadoExtrusion.Intermedia
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
	If &Session.Get(!"DB.ExtrusionWWGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"DB.ExtrusionWWGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"DB.ExtrusionWWGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONBOBINAS"
				&TFExtrusionBobinas.FromString(&GridStateFilterValue.Value)
				&TFExtrusionBobinas_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS"
				&TFExtrusionLotePaqueteAditivos.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS_SEL"
				&TFExtrusionLotePaqueteAditivos_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONID"
				&TFExtrusionId.FromString(&GridStateFilterValue.Value)
				&TFExtrusionId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE"
				&TFExtrusionExtrusoraNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONEXTRUSORANOMBRE_SEL"
				&TFExtrusionExtrusoraNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE"
				&TFExtrusionTurnoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTURNONOMBRE_SEL"
				&TFExtrusionTurnoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE"
				&TFExtrusionProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONPRODUCTONOMBRE_SEL"
				&TFExtrusionProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONTIEMPOINTERRUPCION"
				&TFExtrusionTiempoInterrupcion.FromString(&GridStateFilterValue.Value)
				&TFExtrusionTiempoInterrupcion_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONFECHA"
				&TFExtrusionFecha.FromString(&GridStateFilterValue.Value)
				&TFExtrusionFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONMETA"
				&TFExtrusionMeta.FromString(&GridStateFilterValue.Value)
				&TFExtrusionMeta_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONESTADO_SEL"
				&TFExtrusionEstado_SelsJson = &GridStateFilterValue.Value
				&TFExtrusionEstado_Sels.FromJson(&TFExtrusionEstado_SelsJson)
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

Output_file("ExtrusionWWExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

