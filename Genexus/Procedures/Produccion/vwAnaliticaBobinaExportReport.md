# Procedure: vwAnaliticaBobinaExportReport

- **Module:** Produccion
- **Description:** vw Analitica Bobina Export Report
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
| BobinaOrigenDescription | Variable | VARCHAR |  | Bobina Origen Description |
| BobinaEstadoDescription | Variable | VARCHAR |  | Bobina Estado Description |
| BobinaMotivoMolinoDescription | Variable | VARCHAR |  | Bobina Motivo Molino Description |
| BobinaProductoTipoMaterialDescription | Variable | VARCHAR |  | Bobina Producto Tipo Material Description |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFBobinaId | Variable | NUMERIC |  | TFBobina Id |
| TFBobinaId_To | Variable | NUMERIC |  | TFBobina Id_To |
| TFExtrusionId | Variable | NUMERIC |  | TFExtrusion Id |
| TFExtrusionId_To | Variable | NUMERIC |  | TFExtrusion Id_To |
| TFExtrusionTurnoNombre | Variable | VARCHAR |  | TFExtrusion Turno Nombre |
| TFExtrusionTurnoNombre_Sel | Variable | VARCHAR |  | TFExtrusion Turno Nombre_Sel |
| TFExtrusionOperadorNombre | Variable | VARCHAR |  | TFExtrusion Operador Nombre |
| TFExtrusionOperadorNombre_Sel | Variable | VARCHAR |  | TFExtrusion Operador Nombre_Sel |
| TFExtrusionExtrusoraNombre | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre |
| TFExtrusionExtrusoraNombre_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Nombre_Sel |
| TFBobinaNoSerie | Variable | VARCHAR |  | TFBobina No Serie |
| TFBobinaNoSerie_Sel | Variable | VARCHAR |  | TFBobina No Serie_Sel |
| TFBobinaOrigen_SelsJson | Variable | LONGVARCHAR |  | TFBobina Origen_Sels Json |
| TFBobinaOrigen_SelDscs | Variable | VARCHAR |  | TFBobina Origen_Sel Dscs |
| TFBobinaOrigen_Sels | Variable | VARCHAR |  | TFBobina Origen_Sels |
| TFBobinaOrigen_Sel | Variable | VARCHAR |  | TFBobina Origen_Sel |
| TFBobinaHoraInicio | Variable | DATETIME |  | TFBobina Hora Inicio |
| TFBobinaHoraInicio_To | Variable | DATETIME |  | TFBobina Hora Inicio_To |
| TFBobinaHoraSalida | Variable | DATETIME |  | TFBobina Hora Salida |
| TFBobinaHoraSalida_To | Variable | DATETIME |  | TFBobina Hora Salida_To |
| TFBobinaNo | Variable | NUMERIC |  | TFBobina No |
| TFBobinaNo_To | Variable | NUMERIC |  | TFBobina No_To |
| TFBobinaKg | Variable | NUMERIC |  | TFBobina Kg |
| TFBobinaKg_To | Variable | NUMERIC |  | TFBobina Kg_To |
| TFBobinaMermaKg | Variable | NUMERIC |  | TFBobina Merma Kg |
| TFBobinaMermaKg_To | Variable | NUMERIC |  | TFBobina Merma Kg_To |
| TFBobinaEspesor | Variable | NUMERIC |  | TFBobina Espesor |
| TFBobinaEspesor_To | Variable | NUMERIC |  | TFBobina Espesor_To |
| TFBobinaObservaciones | Variable | VARCHAR |  | TFBobina Observaciones |
| TFBobinaObservaciones_Sel | Variable | VARCHAR |  | TFBobina Observaciones_Sel |
| TFBobinaRechazadaObservaciones | Variable | VARCHAR |  | TFBobina Rechazada Observaciones |
| TFBobinaRechazadaObservaciones_Sel | Variable | VARCHAR |  | TFBobina Rechazada Observaciones_Sel |
| TFBobinaEstado_SelsJson | Variable | LONGVARCHAR |  | TFBobina Estado_Sels Json |
| TFBobinaEstado_SelDscs | Variable | VARCHAR |  | TFBobina Estado_Sel Dscs |
| TFBobinaEstado_Sels | Variable | VARCHAR |  | TFBobina Estado_Sels |
| TFBobinaEstado_Sel | Variable | VARCHAR |  | TFBobina Estado_Sel |
| TFBobinaCarreras | Variable | NUMERIC |  | TFBobina Carreras |
| TFBobinaCarreras_To | Variable | NUMERIC |  | TFBobina Carreras_To |
| TFBobinaIniciaReposo | Variable | DATETIME |  | TFBobina Inicia Reposo |
| TFBobinaIniciaReposo_To | Variable | DATETIME |  | TFBobina Inicia Reposo_To |
| TFBobinaMinutosEnReposo | Variable | NUMERIC |  | TFBobina Minutos En Reposo |
| TFBobinaMinutosEnReposo_To | Variable | NUMERIC |  | TFBobina Minutos En Reposo_To |
| TFBobinaMotivoMolino_SelsJson | Variable | LONGVARCHAR |  | TFBobina Motivo Molino_Sels Json |
| TFBobinaMotivoMolino_SelDscs | Variable | VARCHAR |  | TFBobina Motivo Molino_Sel Dscs |
| TFBobinaMotivoMolino_Sels | Variable | VARCHAR |  | TFBobina Motivo Molino_Sels |
| TFBobinaMotivoMolino_Sel | Variable | VARCHAR |  | TFBobina Motivo Molino_Sel |
| TFBobinaSiloMolidoId | Variable | NUMERIC |  | TFBobina Silo Molido Id |
| TFBobinaSiloMolidoId_To | Variable | NUMERIC |  | TFBobina Silo Molido Id_To |
| TFBobinaSiloMolidoNombre | Variable | VARCHAR |  | TFBobina Silo Molido Nombre |
| TFBobinaSiloMolidoNombre_Sel | Variable | VARCHAR |  | TFBobina Silo Molido Nombre_Sel |
| TFBobinaSiloVirgenId | Variable | NUMERIC |  | TFBobina Silo Virgen Id |
| TFBobinaSiloVirgenId_To | Variable | NUMERIC |  | TFBobina Silo Virgen Id_To |
| TFBobinaSiloVirgenNombre | Variable | VARCHAR |  | TFBobina Silo Virgen Nombre |
| TFBobinaSiloVirgenNombre_Sel | Variable | VARCHAR |  | TFBobina Silo Virgen Nombre_Sel |
| TFBobinaLoteVirgen | Variable | CHARACTER |  | TFBobina Lote Virgen |
| TFBobinaLoteVirgen_Sel | Variable | CHARACTER |  | TFBobina Lote Virgen_Sel |
| TFBobinaProductoId | Variable | NUMERIC |  | TFBobina Producto Id |
| TFBobinaProductoId_To | Variable | NUMERIC |  | TFBobina Producto Id_To |
| TFBobinaProductoNombre | Variable | VARCHAR |  | TFBobina Producto Nombre |
| TFBobinaProductoNombre_Sel | Variable | VARCHAR |  | TFBobina Producto Nombre_Sel |
| TFBobinaProductoTipoMaterial_SelsJson | Variable | LONGVARCHAR |  | TFBobina Producto Tipo Material_Sels Json |
| TFBobinaProductoTipoMaterial_SelDscs | Variable | VARCHAR |  | TFBobina Producto Tipo Material_Sel Dscs |
| TFBobinaProductoTipoMaterial_Sels | Variable | VARCHAR |  | TFBobina Producto Tipo Material_Sels |
| TFBobinaProductoTipoMaterial_Sel | Variable | VARCHAR |  | TFBobina Producto Tipo Material_Sel |
| TFBobinaPrensadoPrensaNombre | Variable | VARCHAR |  | TFBobina Prensado Prensa Nombre |
| TFBobinaPrensadoPrensaNombre_Sel | Variable | VARCHAR |  | TFBobina Prensado Prensa Nombre_Sel |
| TFBobinaReposoEnHoras | Variable | NUMERIC |  | TFBobina Reposo En Horas |
| TFBobinaReposoEnHoras_To | Variable | NUMERIC |  | TFBobina Reposo En Horas_To |
| TFBobinaId_To_Description | Variable | VARCHAR |  | TFBobina Id_To_Description |
| TFExtrusionId_To_Description | Variable | VARCHAR |  | TFExtrusion Id_To_Description |
| FilterTFBobinaOrigen_SelValueDescription | Variable | VARCHAR |  | Filter TFBobina Origen_Sel Value Description |
| TFBobinaHoraInicio_To_Description | Variable | VARCHAR |  | TFBobina Hora Inicio_To_Description |
| TFBobinaHoraSalida_To_Description | Variable | VARCHAR |  | TFBobina Hora Salida_To_Description |
| TFBobinaNo_To_Description | Variable | VARCHAR |  | TFBobina No_To_Description |
| TFBobinaKg_To_Description | Variable | VARCHAR |  | TFBobina Kg_To_Description |
| TFBobinaMermaKg_To_Description | Variable | VARCHAR |  | TFBobina Merma Kg_To_Description |
| TFBobinaEspesor_To_Description | Variable | VARCHAR |  | TFBobina Espesor_To_Description |
| FilterTFBobinaEstado_SelValueDescription | Variable | VARCHAR |  | Filter TFBobina Estado_Sel Value Description |
| TFBobinaCarreras_To_Description | Variable | VARCHAR |  | TFBobina Carreras_To_Description |
| TFBobinaIniciaReposo_To_Description | Variable | VARCHAR |  | TFBobina Inicia Reposo_To_Description |
| TFBobinaMinutosEnReposo_To_Description | Variable | VARCHAR |  | TFBobina Minutos En Reposo_To_Description |
| FilterTFBobinaMotivoMolino_SelValueDescription | Variable | VARCHAR |  | Filter TFBobina Motivo Molino_Sel Value Description |
| TFBobinaSiloMolidoId_To_Description | Variable | VARCHAR |  | TFBobina Silo Molido Id_To_Description |
| TFBobinaSiloVirgenId_To_Description | Variable | VARCHAR |  | TFBobina Silo Virgen Id_To_Description |
| TFBobinaProductoId_To_Description | Variable | VARCHAR |  | TFBobina Producto Id_To_Description |
| FilterTFBobinaProductoTipoMaterial_SelValueDescription | Variable | VARCHAR |  | Filter TFBobina Producto Tipo Material_Sel Value Description |
| TFBobinaReposoEnHoras_To_Description | Variable | VARCHAR |  | TFBobina Reposo En Horas_To_Description |
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
| TotBobinaKg | Variable | NUMERIC |  | Tot Bobina Kg |
| TotValueBobinaKg | Variable | VARCHAR |  | Tot Value Bobina Kg |
| TotBobinaNo | Variable | NUMERIC |  | Tot Bobina No |
| TotValueBobinaNo | Variable | VARCHAR |  | Tot Value Bobina No |
| GridCount | Variable | NUMERIC |  | Grid Count |
| GridConditionalFormattingFilter | Variable | NUMERIC |  | Grid Conditional Formatting Filter |
| FixedValueOperatorDsc | Variable | VARCHAR |  | Fixed Value Operator Dsc |
| FixedValueOperatorValue | Variable | VARCHAR |  | Fixed Value Operator Value |
| NowDate | Variable | DATE |  | Now Date |
| TFBobinaDispersion | Variable | NUMERIC |  | TFBobina Dispersion |
| TFBobinaDispersion_To | Variable | NUMERIC |  | TFBobina Dispersion_To |
| TFBobinaDispersion_To_Description | Variable | VARCHAR |  | TFBobina Dispersion_To_Description |
| TFBobinaDesviacionEstandar | Variable | NUMERIC |  | TFBobina Desviacion Estandar |
| TFBobinaDesviacionEstandar_To | Variable | NUMERIC |  | TFBobina Desviacion Estandar_To |
| TFBobinaDesviacionEstandar_To_Description | Variable | VARCHAR |  | TFBobina Desviacion Estandar_To_Description |
| TFExtrusionLotePaqueteAditivos | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos |
| TFExtrusionLotePaqueteAditivos_Sel | Variable | VARCHAR |  | TFExtrusion Lote Paquete Aditivos_Sel |
| TFBobinaInterrupcionId | Variable | NUMERIC |  | TFBobina Interrupcion Id |
| TFBobinaInterrupcionId_To | Variable | NUMERIC |  | TFBobina Interrupcion Id_To |
| TFBobinaInterrupcionId_To_Description | Variable | VARCHAR |  | TFBobina Interrupcion Id_To_Description |
| TFInterrupcionTiempo | Variable | NUMERIC |  | TFInterrupcion Tiempo |
| TFInterrupcionTiempo_To | Variable | NUMERIC |  | TFInterrupcion Tiempo_To |
| TFInterrupcionMotivo | Variable | VARCHAR |  | TFInterrupcion Motivo |
| TFInterrupcionMotivo_Sel | Variable | VARCHAR |  | TFInterrupcion Motivo_Sel |
| TFInterrupcionTiempo_To_Description | Variable | VARCHAR |  | TFInterrupcion Tiempo_To_Description |
| TFBobinaInterrupcionesId | Variable | NUMERIC |  | TFBobina Interrupciones Id |
| TFBobinaInterrupcionesId_To | Variable | NUMERIC |  | TFBobina Interrupciones Id_To |
| TFBobinaInterrupcionesMotivo | Variable | VARCHAR |  | TFBobina Interrupciones Motivo |
| TFBobinaInterrupcionesMotivo_Sel | Variable | VARCHAR |  | TFBobina Interrupciones Motivo_Sel |
| TFBobinaInterrupcionesTiempo | Variable | NUMERIC |  | TFBobina Interrupciones Tiempo |
| TFBobinaInterrupcionesTiempo_To | Variable | NUMERIC |  | TFBobina Interrupciones Tiempo_To |
| TFBobinaDownTimeCode | Variable | VARCHAR |  | TFBobina Down Time Code |
| TFBobinaDownTimeCode_Sel | Variable | VARCHAR |  | TFBobina Down Time Code_Sel |
| TFBobinaDownTimeDescription | Variable | VARCHAR |  | TFBobina Down Time Description |
| TFBobinaDownTimeDescription_Sel | Variable | VARCHAR |  | TFBobina Down Time Description_Sel |
| TFBobinaInterrupcionesId_To_Description | Variable | VARCHAR |  | TFBobina Interrupciones Id_To_Description |
| TFBobinaInterrupcionesTiempo_To_Description | Variable | VARCHAR |  | TFBobina Interrupciones Tiempo_To_Description |
| IsAuthorizedBobinaInterrupcionesTiempo | Variable | Boolean |  | Is Authorized Bobina Interrupciones Tiempo |
| BobinaInterrupcionesTiempoData | Variable | VARCHAR |  | Bobina Interrupciones Tiempo Data |
| BobinaInterrupcionesTiempoTitle | Variable | VARCHAR |  | Bobina Interrupciones Tiempo Title |
| ExtrusionExtrusoraColorEstacionDescription | Variable | VARCHAR |  | Extrusion Extrusora Color Estacion Description |
| TFExtrusionExtrusoraColorEstacion_SelsJson | Variable | LONGVARCHAR |  | TFExtrusion Extrusora Color Estacion_Sels Json |
| TFExtrusionExtrusoraColorEstacion_SelDscs | Variable | VARCHAR |  | TFExtrusion Extrusora Color Estacion_Sel Dscs |
| TFExtrusionExtrusoraColorEstacion_Sel | Variable | VARCHAR |  | TFExtrusion Extrusora Color Estacion_Sel |
| TFExtrusionExtrusoraColorEstacion_Sels | Variable | VARCHAR |  | TFExtrusion Extrusora Color Estacion_Sels |
| FilterTFExtrusionExtrusoraColorEstacion_SelValueDescription | Variable | VARCHAR |  | Filter TFExtrusion Extrusora Color Estacion_Sel Value Description |
| BobinaColorEstacionDescription | Variable | VARCHAR |  | Bobina Color Estacion Description |
| TFBobinaColorEstacion_SelsJson | Variable | LONGVARCHAR |  | TFBobina Color Estacion_Sels Json |
| TFBobinaColorEstacion_SelDscs | Variable | VARCHAR |  | TFBobina Color Estacion_Sel Dscs |
| TFBobinaColorEstacion_Sel | Variable | VARCHAR |  | TFBobina Color Estacion_Sel |
| TFBobinaColorEstacion_Sels | Variable | VARCHAR |  | TFBobina Color Estacion_Sels |
| FilterTFBobinaColorEstacion_SelValueDescription | Variable | VARCHAR |  | Filter TFBobina Color Estacion_Sel Value Description |
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
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'vwanaliticabobina_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Bobina List"

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
				&FixedValueOperatorValue = "En Medición"
			Case &GridConditionalFormattingFilter = 2
				&FixedValueOperatorValue = "Reposo"
			Case &GridConditionalFormattingFilter = 3
				&FixedValueOperatorValue = "Molino"
			Case &GridConditionalFormattingFilter = 4
				&FixedValueOperatorValue = "En Proceso"
			Case &GridConditionalFormattingFilter = 5
				&FixedValueOperatorValue = "Disponible"
			Case &GridConditionalFormattingFilter = 6
				&FixedValueOperatorValue = "En Prensado"
			Case &GridConditionalFormattingFilter = 7
				&FixedValueOperatorValue = "Pausada"
			Case &GridConditionalFormattingFilter = 8
				&FixedValueOperatorValue = "Desmontada"
			Case &GridConditionalFormattingFilter = 9
				&FixedValueOperatorValue = "Transferida"
			Case &GridConditionalFormattingFilter = 10
				&FixedValueOperatorValue = "Rechazada"
			Case &GridConditionalFormattingFilter = 11
				&FixedValueOperatorValue = "Consumida"
		EndCase
		print printBlockFixedValueOperator
	EndIf
	If not (&TFBobinaId.IsEmpty() AND &TFBobinaId_To.IsEmpty())
		print printBlockTFBobinaId
		&TFBobinaId_To_Description = format('%1 (%2)', "Id", "WWP_TSTo")
		print printBlockTFBobinaId_To
	EndIf
	If not &TFBobinaNoSerie_Sel.IsEmpty()
		print printBlockTFBobinaNoSerie_Sel
	Else
		If not &TFBobinaNoSerie.IsEmpty()
			print printBlockTFBobinaNoSerie
		EndIf
	EndIf
	If not (&TFExtrusionId.IsEmpty() AND &TFExtrusionId_To.IsEmpty())
		print printBlockTFExtrusionId
		&TFExtrusionId_To_Description = format('%1 (%2)', "Extrusion Id", "WWP_TSTo")
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
	&TFBobinaColorEstacion_Sels.FromJson(&TFBobinaColorEstacion_SelsJson)
	If not &TFBobinaColorEstacion_Sels.Count = 0
		&i = 1
		For &TFBobinaColorEstacion_Sel in &TFBobinaColorEstacion_Sels
			If &i = 1
				&TFBobinaColorEstacion_SelDscs = ''
			Else
				&TFBobinaColorEstacion_SelDscs += ', '
			EndIf
			&FilterTFBobinaColorEstacion_SelValueDescription = &TFBobinaColorEstacion_Sel.EnumerationDescription()

			&TFBobinaColorEstacion_SelDscs += &FilterTFBobinaColorEstacion_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFBobinaColorEstacion_Sel
	EndIf
	&TFBobinaOrigen_Sels.FromJson(&TFBobinaOrigen_SelsJson)
	If not &TFBobinaOrigen_Sels.Count = 0
		&i = 1
		For &TFBobinaOrigen_Sel in &TFBobinaOrigen_Sels
			If &i = 1
				&TFBobinaOrigen_SelDscs = ''
			Else
				&TFBobinaOrigen_SelDscs += ', '
			EndIf
			&FilterTFBobinaOrigen_SelValueDescription = &TFBobinaOrigen_Sel.EnumerationDescription()

			&TFBobinaOrigen_SelDscs += &FilterTFBobinaOrigen_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFBobinaOrigen_Sel
	EndIf
	&TFBobinaEstado_Sels.FromJson(&TFBobinaEstado_SelsJson)
	If not &TFBobinaEstado_Sels.Count = 0
		&i = 1
		For &TFBobinaEstado_Sel in &TFBobinaEstado_Sels
			If &i = 1
				&TFBobinaEstado_SelDscs = ''
			Else
				&TFBobinaEstado_SelDscs += ', '
			EndIf
			&FilterTFBobinaEstado_SelValueDescription = &TFBobinaEstado_Sel.EnumerationDescription()

			&TFBobinaEstado_SelDscs += &FilterTFBobinaEstado_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFBobinaEstado_Sel
	EndIf
	If not (&TFBobinaHoraInicio.IsEmpty() AND &TFBobinaHoraInicio_To.IsEmpty())
		print printBlockTFBobinaHoraInicio
		&TFBobinaHoraInicio_To_Description = format('%1 (%2)', "Hora Inicio", "WWP_TSTo")
		print printBlockTFBobinaHoraInicio_To
	EndIf
	If not (&TFBobinaHoraSalida.IsEmpty() AND &TFBobinaHoraSalida_To.IsEmpty())
		print printBlockTFBobinaHoraSalida
		&TFBobinaHoraSalida_To_Description = format('%1 (%2)', "Hora Salida", "WWP_TSTo")
		print printBlockTFBobinaHoraSalida_To
	EndIf
	If not (&TFBobinaDesviacionEstandar.IsEmpty() AND &TFBobinaDesviacionEstandar_To.IsEmpty())
		print printBlockTFBobinaDesviacionEstandar
		&TFBobinaDesviacionEstandar_To_Description = format('%1 (%2)', "Desviación Estándar", "WWP_TSTo")
		print printBlockTFBobinaDesviacionEstandar_To
	EndIf
	If not (&TFBobinaKg.IsEmpty() AND &TFBobinaKg_To.IsEmpty())
		print printBlockTFBobinaKg
		&TFBobinaKg_To_Description = format('%1 (%2)', "Kg", "WWP_TSTo")
		print printBlockTFBobinaKg_To
	EndIf
	If not (&TFBobinaMermaKg.IsEmpty() AND &TFBobinaMermaKg_To.IsEmpty())
		print printBlockTFBobinaMermaKg
		&TFBobinaMermaKg_To_Description = format('%1 (%2)', "Merma Kg", "WWP_TSTo")
		print printBlockTFBobinaMermaKg_To
	EndIf
	If not (&TFBobinaNo.IsEmpty() AND &TFBobinaNo_To.IsEmpty())
		print printBlockTFBobinaNo
		&TFBobinaNo_To_Description = format('%1 (%2)', "No", "WWP_TSTo")
		print printBlockTFBobinaNo_To
	EndIf
	If not (&TFBobinaReposoEnHoras.IsEmpty() AND &TFBobinaReposoEnHoras_To.IsEmpty())
		print printBlockTFBobinaReposoEnHoras
		&TFBobinaReposoEnHoras_To_Description = format('%1 (%2)', "Reposo (Hr)", "WWP_TSTo")
		print printBlockTFBobinaReposoEnHoras_To
	EndIf
	If not &TFExtrusionOperadorNombre_Sel.IsEmpty()
		print printBlockTFExtrusionOperadorNombre_Sel
	Else
		If not &TFExtrusionOperadorNombre.IsEmpty()
			print printBlockTFExtrusionOperadorNombre
		EndIf
	EndIf
	If not &TFBobinaObservaciones_Sel.IsEmpty()
		print printBlockTFBobinaObservaciones_Sel
	Else
		If not &TFBobinaObservaciones.IsEmpty()
			print printBlockTFBobinaObservaciones
		EndIf
	EndIf
	If not &TFBobinaRechazadaObservaciones_Sel.IsEmpty()
		print printBlockTFBobinaRechazadaObservaciones_Sel
	Else
		If not &TFBobinaRechazadaObservaciones.IsEmpty()
			print printBlockTFBobinaRechazadaObservaciones
		EndIf
	EndIf
	If not &TFBobinaSiloMolidoNombre_Sel.IsEmpty()
		print printBlockTFBobinaSiloMolidoNombre_Sel
	Else
		If not &TFBobinaSiloMolidoNombre.IsEmpty()
			print printBlockTFBobinaSiloMolidoNombre
		EndIf
	EndIf
	If not &TFBobinaSiloVirgenNombre_Sel.IsEmpty()
		print printBlockTFBobinaSiloVirgenNombre_Sel
	Else
		If not &TFBobinaSiloVirgenNombre.IsEmpty()
			print printBlockTFBobinaSiloVirgenNombre
		EndIf
	EndIf
	If not &TFBobinaLoteVirgen_Sel.IsEmpty()
		print printBlockTFBobinaLoteVirgen_Sel
	Else
		If not &TFBobinaLoteVirgen.IsEmpty()
			print printBlockTFBobinaLoteVirgen
		EndIf
	EndIf
	If not &TFExtrusionLotePaqueteAditivos_Sel.IsEmpty()
		print printBlockTFExtrusionLotePaqueteAditivos_Sel
	Else
		If not &TFExtrusionLotePaqueteAditivos.IsEmpty()
			print printBlockTFExtrusionLotePaqueteAditivos
		EndIf
	EndIf
	If not (&TFBobinaProductoId.IsEmpty() AND &TFBobinaProductoId_To.IsEmpty())
		print printBlockTFBobinaProductoId
		&TFBobinaProductoId_To_Description = format('%1 (%2)', "Producto Id", "WWP_TSTo")
		print printBlockTFBobinaProductoId_To
	EndIf
	If not &TFBobinaProductoNombre_Sel.IsEmpty()
		print printBlockTFBobinaProductoNombre_Sel
	Else
		If not &TFBobinaProductoNombre.IsEmpty()
			print printBlockTFBobinaProductoNombre
		EndIf
	EndIf
	&TFBobinaProductoTipoMaterial_Sels.FromJson(&TFBobinaProductoTipoMaterial_SelsJson)
	If not &TFBobinaProductoTipoMaterial_Sels.Count = 0
		&i = 1
		For &TFBobinaProductoTipoMaterial_Sel in &TFBobinaProductoTipoMaterial_Sels
			If &i = 1
				&TFBobinaProductoTipoMaterial_SelDscs = ''
			Else
				&TFBobinaProductoTipoMaterial_SelDscs += ', '
			EndIf
			&FilterTFBobinaProductoTipoMaterial_SelValueDescription = &TFBobinaProductoTipoMaterial_Sel.EnumerationDescription()

			&TFBobinaProductoTipoMaterial_SelDscs += &FilterTFBobinaProductoTipoMaterial_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFBobinaProductoTipoMaterial_Sel
	EndIf
	If not &TFBobinaPrensadoPrensaNombre_Sel.IsEmpty()
		print printBlockTFBobinaPrensadoPrensaNombre_Sel
	Else
		If not &TFBobinaPrensadoPrensaNombre.IsEmpty()
			print printBlockTFBobinaPrensadoPrensaNombre
		EndIf
	EndIf
	If not &TFBobinaInterrupcionesMotivo_Sel.IsEmpty()
		print printBlockTFBobinaInterrupcionesMotivo_Sel
	Else
		If not &TFBobinaInterrupcionesMotivo.IsEmpty()
			print printBlockTFBobinaInterrupcionesMotivo
		EndIf
	EndIf
	If not (&TFBobinaInterrupcionesTiempo.IsEmpty() AND &TFBobinaInterrupcionesTiempo_To.IsEmpty())
		print printBlockTFBobinaInterrupcionesTiempo
		&TFBobinaInterrupcionesTiempo_To_Description = format('%1 (%2)', "Interrupciones Tiempo", "WWP_TSTo")
		print printBlockTFBobinaInterrupcionesTiempo_To
	EndIf
	If not &TFBobinaDownTimeCode_Sel.IsEmpty()
		print printBlockTFBobinaDownTimeCode_Sel
	Else
		If not &TFBobinaDownTimeCode.IsEmpty()
			print printBlockTFBobinaDownTimeCode
		EndIf
	EndIf
	If not &TFBobinaDownTimeDescription_Sel.IsEmpty()
		print printBlockTFBobinaDownTimeDescription_Sel
	Else
		If not &TFBobinaDownTimeDescription.IsEmpty()
			print printBlockTFBobinaDownTimeDescription
		EndIf
	EndIf

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintColumnTitles'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	print printBlockBeforeGrid

	If &IsAuthorizedBobinaInterrupcionesTiempo
		&BobinaInterrupcionesTiempoTitle = "Interrupciones Tiempo"
	EndIf
	print printBlockLines_titles

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintData'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	For each DB.Bobina
		order BobinaNoSerie  when &OrderedBy = 1 AND &OrderedDsc = False
		order (BobinaNoSerie)  when &OrderedBy = 1 AND &OrderedDsc = True
		order BobinaId  when &OrderedBy = 2 AND &OrderedDsc = False
		order (BobinaId)  when &OrderedBy = 2 AND &OrderedDsc = True
		order ExtrusionId  when &OrderedBy = 3 AND &OrderedDsc = False
		order (ExtrusionId)  when &OrderedBy = 3 AND &OrderedDsc = True
		order DB.ExtrusionExtrusoraNombre  when &OrderedBy = 4 AND &OrderedDsc = False
		order (ExtrusionExtrusoraNombre)  when &OrderedBy = 4 AND &OrderedDsc = True
		order ExtrusionTurnoNombre  when &OrderedBy = 5 AND &OrderedDsc = False
		order (ExtrusionTurnoNombre)  when &OrderedBy = 5 AND &OrderedDsc = True
		order BobinaColorEstacion  when &OrderedBy = 6 AND &OrderedDsc = False
		order (BobinaColorEstacion)  when &OrderedBy = 6 AND &OrderedDsc = True
		order BobinaOrigen  when &OrderedBy = 7 AND &OrderedDsc = False
		order (BobinaOrigen)  when &OrderedBy = 7 AND &OrderedDsc = True
		order BobinaEstado  when &OrderedBy = 8 AND &OrderedDsc = False
		order (BobinaEstado)  when &OrderedBy = 8 AND &OrderedDsc = True
		order BobinaHoraInicio  when &OrderedBy = 9 AND &OrderedDsc = False
		order (BobinaHoraInicio)  when &OrderedBy = 9 AND &OrderedDsc = True
		order BobinaHoraSalida  when &OrderedBy = 10 AND &OrderedDsc = False
		order (BobinaHoraSalida)  when &OrderedBy = 10 AND &OrderedDsc = True
		order BobinaDesviacionEstandar  when &OrderedBy = 11 AND &OrderedDsc = False
		order (BobinaDesviacionEstandar)  when &OrderedBy = 11 AND &OrderedDsc = True
		order BobinaKg  when &OrderedBy = 12 AND &OrderedDsc = False
		order (BobinaKg)  when &OrderedBy = 12 AND &OrderedDsc = True
		order BobinaMermaKg  when &OrderedBy = 13 AND &OrderedDsc = False
		order (BobinaMermaKg)  when &OrderedBy = 13 AND &OrderedDsc = True
		order BobinaNo  when &OrderedBy = 14 AND &OrderedDsc = False
		order (BobinaNo)  when &OrderedBy = 14 AND &OrderedDsc = True
		order ExtrusionOperadorNombre  when &OrderedBy = 15 AND &OrderedDsc = False
		order (ExtrusionOperadorNombre)  when &OrderedBy = 15 AND &OrderedDsc = True
		order BobinaObservaciones  when &OrderedBy = 16 AND &OrderedDsc = False
		order (BobinaObservaciones)  when &OrderedBy = 16 AND &OrderedDsc = True
		order BobinaRechazadaObservaciones  when &OrderedBy = 17 AND &OrderedDsc = False
		order (BobinaRechazadaObservaciones)  when &OrderedBy = 17 AND &OrderedDsc = True
		order BobinaSiloMolidoNombre  when &OrderedBy = 18 AND &OrderedDsc = False
		order (BobinaSiloMolidoNombre)  when &OrderedBy = 18 AND &OrderedDsc = True
		order BobinaSiloVirgenNombre  when &OrderedBy = 19 AND &OrderedDsc = False
		order (BobinaSiloVirgenNombre)  when &OrderedBy = 19 AND &OrderedDsc = True
		order BobinaLoteVirgen  when &OrderedBy = 20 AND &OrderedDsc = False
		order (BobinaLoteVirgen)  when &OrderedBy = 20 AND &OrderedDsc = True
		order ExtrusionLotePaqueteAditivos  when &OrderedBy = 21 AND &OrderedDsc = False
		order (ExtrusionLotePaqueteAditivos)  when &OrderedBy = 21 AND &OrderedDsc = True
		order BobinaProductoId  when &OrderedBy = 22 AND &OrderedDsc = False
		order (BobinaProductoId)  when &OrderedBy = 22 AND &OrderedDsc = True
		order BobinaProductoNombre  when &OrderedBy = 23 AND &OrderedDsc = False
		order (BobinaProductoNombre)  when &OrderedBy = 23 AND &OrderedDsc = True
		order BobinaProductoTipoMaterial  when &OrderedBy = 24 AND &OrderedDsc = False
		order (BobinaProductoTipoMaterial)  when &OrderedBy = 24 AND &OrderedDsc = True
		order BobinaInterrupcionesMotivo  when &OrderedBy = 25 AND &OrderedDsc = False
		order (BobinaInterrupcionesMotivo)  when &OrderedBy = 25 AND &OrderedDsc = True
		order BobinaInterrupcionesTiempo  when &OrderedBy = 26 AND &OrderedDsc = False
		order (BobinaInterrupcionesTiempo)  when &OrderedBy = 26 AND &OrderedDsc = True
		order BobinaDownTimeCode  when &OrderedBy = 27 AND &OrderedDsc = False
		order (BobinaDownTimeCode)  when &OrderedBy = 27 AND &OrderedDsc = True
		order BobinaDownTimeDescription  when &OrderedBy = 28 AND &OrderedDsc = False
		order (BobinaDownTimeDescription)  when &OrderedBy = 28 AND &OrderedDsc = True
		
		using Produccion.vwAnaliticaBobinaDS(&GridConditionalFormattingFilter, &FilterFullText, &TFBobinaId, &TFBobinaId_To, &TFBobinaNoSerie, &TFBobinaNoSerie_Sel
					, &TFExtrusionId, &TFExtrusionId_To, &TFExtrusionExtrusoraNombre, &TFExtrusionExtrusoraNombre_Sel, &TFExtrusionTurnoNombre, &TFExtrusionTurnoNombre_Sel
					, &TFBobinaColorEstacion_Sels, &TFBobinaOrigen_Sels, &TFBobinaEstado_Sels, &TFBobinaHoraInicio, &TFBobinaHoraInicio_To, &TFBobinaHoraSalida
					, &TFBobinaHoraSalida_To, &TFBobinaDesviacionEstandar, &TFBobinaDesviacionEstandar_To, &TFBobinaKg, &TFBobinaKg_To, &TFBobinaMermaKg
					, &TFBobinaMermaKg_To, &TFBobinaNo, &TFBobinaNo_To, &TFBobinaReposoEnHoras, &TFBobinaReposoEnHoras_To, &TFExtrusionOperadorNombre
					, &TFExtrusionOperadorNombre_Sel, &TFBobinaObservaciones, &TFBobinaObservaciones_Sel, &TFBobinaRechazadaObservaciones, &TFBobinaRechazadaObservaciones_Sel, &TFBobinaSiloMolidoNombre
					, &TFBobinaSiloMolidoNombre_Sel, &TFBobinaSiloVirgenNombre, &TFBobinaSiloVirgenNombre_Sel, &TFBobinaLoteVirgen, &TFBobinaLoteVirgen_Sel, &TFExtrusionLotePaqueteAditivos
					, &TFExtrusionLotePaqueteAditivos_Sel, &TFBobinaProductoId, &TFBobinaProductoId_To, &TFBobinaProductoNombre, &TFBobinaProductoNombre_Sel, &TFBobinaProductoTipoMaterial_Sels
					, &TFBobinaPrensadoPrensaNombre, &TFBobinaPrensadoPrensaNombre_Sel, &TFBobinaInterrupcionesMotivo, &TFBobinaInterrupcionesMotivo_Sel, &TFBobinaInterrupcionesTiempo, &TFBobinaInterrupcionesTiempo_To
					, &TFBobinaDownTimeCode, &TFBobinaDownTimeCode_Sel, &TFBobinaDownTimeDescription, &TFBobinaDownTimeDescription_Sel)
		Where BobinaHoraInicio>= &NowDate
		If Not BobinaColorEstacion.IsEmpty()
			&BobinaColorEstacionDescription = BobinaColorEstacion.EnumerationDescription()
		Else
			&BobinaColorEstacionDescription.SetEmpty()
		Endif
		&BobinaOrigenDescription = BobinaOrigen.EnumerationDescription()
		&BobinaEstadoDescription = BobinaEstado.EnumerationDescription()
		&BobinaProductoTipoMaterialDescription = BobinaProductoTipoMaterial.EnumerationDescription()
		If &IsAuthorizedBobinaInterrupcionesTiempo
			&BobinaInterrupcionesTiempoData = trim(BobinaInterrupcionesTiempo.ToFormattedString())
		EndIf

		Do 'BeforePrintLine'
		print printBlockLines_data
		&GridCount += 1
		&TotBobinaKg = BobinaKg + &TotBobinaKg
		
		Do 'AfterPrintLine'
	EndFor

	Do 'PrintTotalizers'

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintTotalizers'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TotValueBobinaKg = trim(&TotBobinaKg.ToFormattedString())
	&TotValueBobinaNo = "WWP_TotalizerCount" + trim(&GridCount.ToFormattedString())
	print printBlockLines_Totalizers

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Produccion.vwAnaliticaBobinaGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Produccion.vwAnaliticaBobinaGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Produccion.vwAnaliticaBobinaGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAID"
				&TFBobinaId.FromString(&GridStateFilterValue.Value)
				&TFBobinaId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE"
				&TFBobinaNoSerie.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINANOSERIE_SEL"
				&TFBobinaNoSerie_Sel.FromString(&GridStateFilterValue.Value)
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
			Case &GridStateFilterValue.Name = !"TFBOBINACOLORESTACION_SEL"
				&TFBobinaColorEstacion_SelsJson = &GridStateFilterValue.Value
				&TFBobinaColorEstacion_Sels.FromJson(&TFBobinaColorEstacion_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAORIGEN_SEL"
				&TFBobinaOrigen_SelsJson = &GridStateFilterValue.Value
				&TFBobinaOrigen_Sels.FromJson(&TFBobinaOrigen_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAESTADO_SEL"
				&TFBobinaEstado_SelsJson = &GridStateFilterValue.Value
				&TFBobinaEstado_Sels.FromJson(&TFBobinaEstado_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAHORAINICIO"
				&TFBobinaHoraInicio.FromString(&GridStateFilterValue.Value)
				&TFBobinaHoraInicio_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAHORASALIDA"
				&TFBobinaHoraSalida.FromString(&GridStateFilterValue.Value)
				&TFBobinaHoraSalida_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINADESVIACIONESTANDAR"
				&TFBobinaDesviacionEstandar.FromString(&GridStateFilterValue.Value)
				&TFBobinaDesviacionEstandar_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAKG"
				&TFBobinaKg.FromString(&GridStateFilterValue.Value)
				&TFBobinaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAMERMAKG"
				&TFBobinaMermaKg.FromString(&GridStateFilterValue.Value)
				&TFBobinaMermaKg_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINANO"
				&TFBobinaNo.FromString(&GridStateFilterValue.Value)
				&TFBobinaNo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAREPOSOENHORAS"
				&TFBobinaReposoEnHoras.FromString(&GridStateFilterValue.Value)
				&TFBobinaReposoEnHoras_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE"
				&TFExtrusionOperadorNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONOPERADORNOMBRE_SEL"
				&TFExtrusionOperadorNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAOBSERVACIONES"
				&TFBobinaObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAOBSERVACIONES_SEL"
				&TFBobinaObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINARECHAZADAOBSERVACIONES"
				&TFBobinaRechazadaObservaciones.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINARECHAZADAOBSERVACIONES_SEL"
				&TFBobinaRechazadaObservaciones_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOMOLIDONOMBRE"
				&TFBobinaSiloMolidoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOMOLIDONOMBRE_SEL"
				&TFBobinaSiloMolidoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOVIRGENNOMBRE"
				&TFBobinaSiloVirgenNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINASILOVIRGENNOMBRE_SEL"
				&TFBobinaSiloVirgenNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINALOTEVIRGEN"
				&TFBobinaLoteVirgen.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINALOTEVIRGEN_SEL"
				&TFBobinaLoteVirgen_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS"
				&TFExtrusionLotePaqueteAditivos.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEXTRUSIONLOTEPAQUETEADITIVOS_SEL"
				&TFExtrusionLotePaqueteAditivos_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRODUCTOID"
				&TFBobinaProductoId.FromString(&GridStateFilterValue.Value)
				&TFBobinaProductoId_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRODUCTONOMBRE"
				&TFBobinaProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRODUCTONOMBRE_SEL"
				&TFBobinaProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRODUCTOTIPOMATERIAL_SEL"
				&TFBobinaProductoTipoMaterial_SelsJson = &GridStateFilterValue.Value
				&TFBobinaProductoTipoMaterial_Sels.FromJson(&TFBobinaProductoTipoMaterial_SelsJson)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRENSADOPRENSANOMBRE"
				&TFBobinaPrensadoPrensaNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAPRENSADOPRENSANOMBRE_SEL"
				&TFBobinaPrensadoPrensaNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAINTERRUPCIONESMOTIVO"
				&TFBobinaInterrupcionesMotivo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAINTERRUPCIONESMOTIVO_SEL"
				&TFBobinaInterrupcionesMotivo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINAINTERRUPCIONESTIEMPO"
				&TFBobinaInterrupcionesTiempo.FromString(&GridStateFilterValue.Value)
				&TFBobinaInterrupcionesTiempo_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFBOBINADOWNTIMECODE"
				&TFBobinaDownTimeCode.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINADOWNTIMECODE_SEL"
				&TFBobinaDownTimeCode_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINADOWNTIMEDESCRIPTION"
				&TFBobinaDownTimeDescription.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFBOBINADOWNTIMEDESCRIPTION_SEL"
				&TFBobinaDownTimeDescription_Sel.FromString(&GridStateFilterValue.Value)
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

	&IsAuthorizedBobinaInterrupcionesTiempo = (BobinaInterrupcionesTiempo > 0)

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

Output_file("vwAnaliticaBobinaExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

