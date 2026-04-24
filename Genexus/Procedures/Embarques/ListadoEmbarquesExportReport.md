# Procedure: ListadoEmbarquesExportReport

- **Module:** Embarques
- **Description:** Listado Embarques Export Report
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
| EmbarqueEstatusDescription | Variable | VARCHAR |  | Embarque Estatus Description |
| TotEmbarqueCodigo | Variable | NUMERIC |  | Tot Embarque Codigo |
| TotValueEmbarqueCodigo | Variable | VARCHAR |  | Tot Value Embarque Codigo |
| TotEmbarqueDetalleCantidadPallets | Variable | NUMERIC |  | Tot Embarque Detalle Cantidad Pallets |
| TotValueEmbarqueDetalleCantidadPallets | Variable | VARCHAR |  | Tot Value Embarque Detalle Cantidad Pallets |
| GridCount | Variable | NUMERIC |  | Grid Count |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| TFEmbarqueCodigo | Variable | VARCHAR |  | TFEmbarque Codigo |
| TFEmbarqueCodigo_Sel | Variable | VARCHAR |  | TFEmbarque Codigo_Sel |
| TFEmbarqueFolioCarga | Variable | VARCHAR |  | TFEmbarque Folio Carga |
| TFEmbarqueFolioCarga_Sel | Variable | VARCHAR |  | TFEmbarque Folio Carga_Sel |
| TFEmbarqueHoraEstimadaInicio | Variable | DATETIME |  | TFEmbarque Hora Estimada Inicio |
| TFEmbarqueHoraEstimadaInicio_To | Variable | DATETIME |  | TFEmbarque Hora Estimada Inicio_To |
| TFEmbarqueOrderDate | Variable | DATE |  | TFEmbarque Order Date |
| TFEmbarqueOrderDate_To | Variable | DATE |  | TFEmbarque Order Date_To |
| TFEmbarqueOrderDeliveryDate | Variable | DATE |  | TFEmbarque Order Delivery Date |
| TFEmbarqueOrderDeliveryDate_To | Variable | DATE |  | TFEmbarque Order Delivery Date_To |
| TFEmbarqueDiffDiasPedido | Variable | NUMERIC |  | TFEmbarque Diff Dias Pedido |
| TFEmbarqueDiffDiasPedido_To | Variable | NUMERIC |  | TFEmbarque Diff Dias Pedido_To |
| TFEmbarqueDiffDiasEntrega | Variable | NUMERIC |  | TFEmbarque Diff Dias Entrega |
| TFEmbarqueDiffDiasEntrega_To | Variable | NUMERIC |  | TFEmbarque Diff Dias Entrega_To |
| TFEmbarqueFecha | Variable | DATE |  | TFEmbarque Fecha |
| TFEmbarqueFecha_To | Variable | DATE |  | TFEmbarque Fecha_To |
| TFEmbarqueHoraFin | Variable | DATETIME |  | TFEmbarque Hora Fin |
| TFEmbarqueHoraFin_To | Variable | DATETIME |  | TFEmbarque Hora Fin_To |
| TFEmbarqueCliente | Variable | VARCHAR |  | TFEmbarque Cliente |
| TFEmbarqueCliente_Sel | Variable | VARCHAR |  | TFEmbarque Cliente_Sel |
| TFEmbarqueProductoNombre | Variable | VARCHAR |  | TFEmbarque Producto Nombre |
| TFEmbarqueProductoNombre_Sel | Variable | VARCHAR |  | TFEmbarque Producto Nombre_Sel |
| TFEmbarqueDetalleCantidadPallets | Variable | NUMERIC |  | TFEmbarque Detalle Cantidad Pallets |
| TFEmbarqueDetalleCantidadPallets_To | Variable | NUMERIC |  | TFEmbarque Detalle Cantidad Pallets_To |
| TFEmbarqueOrderDoc | Variable | VARCHAR |  | TFEmbarque Order Doc |
| TFEmbarqueOrderDoc_Sel | Variable | VARCHAR |  | TFEmbarque Order Doc_Sel |
| TFEmbarqueRemissionDoc | Variable | VARCHAR |  | TFEmbarque Remission Doc |
| TFEmbarqueRemissionDoc_Sel | Variable | VARCHAR |  | TFEmbarque Remission Doc_Sel |
| TFEmbarqueTransporte | Variable | VARCHAR |  | TFEmbarque Transporte |
| TFEmbarqueTransporte_Sel | Variable | VARCHAR |  | TFEmbarque Transporte_Sel |
| TFEmbarquePlacas | Variable | VARCHAR |  | TFEmbarque Placas |
| TFEmbarquePlacas_Sel | Variable | VARCHAR |  | TFEmbarque Placas_Sel |
| TFEmbarqueConductor | Variable | VARCHAR |  | TFEmbarque Conductor |
| TFEmbarqueConductor_Sel | Variable | VARCHAR |  | TFEmbarque Conductor_Sel |
| TFEmbarqueNoProductos | Variable | NUMERIC |  | TFEmbarque No Productos |
| TFEmbarqueNoProductos_To | Variable | NUMERIC |  | TFEmbarque No Productos_To |
| TFEmbarqueEstatus_SelsJson | Variable | LONGVARCHAR |  | TFEmbarque Estatus_Sels Json |
| TFEmbarqueEstatus_SelDscs | Variable | VARCHAR |  | TFEmbarque Estatus_Sel Dscs |
| TFEmbarqueEstatus_Sel | Variable | VARCHAR |  | TFEmbarque Estatus_Sel |
| TFEmbarqueEstatus_Sels | Variable | VARCHAR |  | TFEmbarque Estatus_Sels |
| TFEmbarqueDetalleConfirmadoPorAdministracion_Sel | Variable | NUMERIC |  | TFEmbarque Detalle Confirmado Por Administracion_Sel |
| TFEmbarqueHoraEstimadaInicio_To_Description | Variable | VARCHAR |  | TFEmbarque Hora Estimada Inicio_To_Description |
| TFEmbarqueOrderDate_To_Description | Variable | VARCHAR |  | TFEmbarque Order Date_To_Description |
| TFEmbarqueOrderDeliveryDate_To_Description | Variable | VARCHAR |  | TFEmbarque Order Delivery Date_To_Description |
| TFEmbarqueDiffDiasPedido_To_Description | Variable | VARCHAR |  | TFEmbarque Diff Dias Pedido_To_Description |
| TFEmbarqueDiffDiasEntrega_To_Description | Variable | VARCHAR |  | TFEmbarque Diff Dias Entrega_To_Description |
| TFEmbarqueFecha_To_Description | Variable | VARCHAR |  | TFEmbarque Fecha_To_Description |
| TFEmbarqueHoraFin_To_Description | Variable | VARCHAR |  | TFEmbarque Hora Fin_To_Description |
| TFEmbarqueDetalleCantidadPallets_To_Description | Variable | VARCHAR |  | TFEmbarque Detalle Cantidad Pallets_To_Description |
| TFEmbarqueNoProductos_To_Description | Variable | VARCHAR |  | TFEmbarque No Productos_To_Description |
| FilterTFEmbarqueEstatus_SelValueDescription | Variable | VARCHAR |  | Filter TFEmbarque Estatus_Sel Value Description |
| FilterTFEmbarqueDetalleConfirmadoPorAdministracion_SelValueDescription | Variable | VARCHAR |  | Filter TFEmbarque Detalle Confirmado Por Administracion_Sel Value Description |
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
&IsAuthorized = SecGAMIsAuthByFunctionalityKey.Udp(!'listadoembarques_Execute') 
If &IsAuthorized

	LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'

&Title = "Embarque Detalle List"

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
	If not &TFEmbarqueCodigo_Sel.IsEmpty()
		print printBlockTFEmbarqueCodigo_Sel
	Else
		If not &TFEmbarqueCodigo.IsEmpty()
			print printBlockTFEmbarqueCodigo
		EndIf
	EndIf
	If not &TFEmbarqueFolioCarga_Sel.IsEmpty()
		print printBlockTFEmbarqueFolioCarga_Sel
	Else
		If not &TFEmbarqueFolioCarga.IsEmpty()
			print printBlockTFEmbarqueFolioCarga
		EndIf
	EndIf
	If not (&TFEmbarqueHoraEstimadaInicio.IsEmpty() AND &TFEmbarqueHoraEstimadaInicio_To.IsEmpty())
		print printBlockTFEmbarqueHoraEstimadaInicio
		&TFEmbarqueHoraEstimadaInicio_To_Description = format('%1 (%2)', "Hora estimada Inicio", "WWP_TSTo")
		print printBlockTFEmbarqueHoraEstimadaInicio_To
	EndIf
	If not (&TFEmbarqueOrderDate.IsEmpty() AND &TFEmbarqueOrderDate_To.IsEmpty())
		print printBlockTFEmbarqueOrderDate
		&TFEmbarqueOrderDate_To_Description = format('%1 (%2)', "Fecha Elaboración (Pedido)", "WWP_TSTo")
		print printBlockTFEmbarqueOrderDate_To
	EndIf
	If not (&TFEmbarqueOrderDeliveryDate.IsEmpty() AND &TFEmbarqueOrderDeliveryDate_To.IsEmpty())
		print printBlockTFEmbarqueOrderDeliveryDate
		&TFEmbarqueOrderDeliveryDate_To_Description = format('%1 (%2)', "Fecha Estimada (Entrega)", "WWP_TSTo")
		print printBlockTFEmbarqueOrderDeliveryDate_To
	EndIf
	If not (&TFEmbarqueDiffDiasPedido.IsEmpty() AND &TFEmbarqueDiffDiasPedido_To.IsEmpty())
		print printBlockTFEmbarqueDiffDiasPedido
		&TFEmbarqueDiffDiasPedido_To_Description = format('%1 (%2)', "Diferencia Dias (Pedido)", "WWP_TSTo")
		print printBlockTFEmbarqueDiffDiasPedido_To
	EndIf
	If not (&TFEmbarqueDiffDiasEntrega.IsEmpty() AND &TFEmbarqueDiffDiasEntrega_To.IsEmpty())
		print printBlockTFEmbarqueDiffDiasEntrega
		&TFEmbarqueDiffDiasEntrega_To_Description = format('%1 (%2)', "Diferencia Dias (Entrega)", "WWP_TSTo")
		print printBlockTFEmbarqueDiffDiasEntrega_To
	EndIf
	If not (&TFEmbarqueFecha.IsEmpty() AND &TFEmbarqueFecha_To.IsEmpty())
		print printBlockTFEmbarqueFecha
		&TFEmbarqueFecha_To_Description = format('%1 (%2)', "Fecha de Embarque", "WWP_TSTo")
		print printBlockTFEmbarqueFecha_To
	EndIf
	If not (&TFEmbarqueHoraFin.IsEmpty() AND &TFEmbarqueHoraFin_To.IsEmpty())
		print printBlockTFEmbarqueHoraFin
		&TFEmbarqueHoraFin_To_Description = format('%1 (%2)', "Hora Fin", "WWP_TSTo")
		print printBlockTFEmbarqueHoraFin_To
	EndIf
	If not &TFEmbarqueCliente_Sel.IsEmpty()
		print printBlockTFEmbarqueCliente_Sel
	Else
		If not &TFEmbarqueCliente.IsEmpty()
			print printBlockTFEmbarqueCliente
		EndIf
	EndIf
	If not &TFEmbarqueProductoNombre_Sel.IsEmpty()
		print printBlockTFEmbarqueProductoNombre_Sel
	Else
		If not &TFEmbarqueProductoNombre.IsEmpty()
			print printBlockTFEmbarqueProductoNombre
		EndIf
	EndIf
	If not (&TFEmbarqueDetalleCantidadPallets.IsEmpty() AND &TFEmbarqueDetalleCantidadPallets_To.IsEmpty())
		print printBlockTFEmbarqueDetalleCantidadPallets
		&TFEmbarqueDetalleCantidadPallets_To_Description = format('%1 (%2)', "Cantidad Pallets", "WWP_TSTo")
		print printBlockTFEmbarqueDetalleCantidadPallets_To
	EndIf
	If not &TFEmbarqueOrderDoc_Sel.IsEmpty()
		print printBlockTFEmbarqueOrderDoc_Sel
	Else
		If not &TFEmbarqueOrderDoc.IsEmpty()
			print printBlockTFEmbarqueOrderDoc
		EndIf
	EndIf
	If not &TFEmbarqueRemissionDoc_Sel.IsEmpty()
		print printBlockTFEmbarqueRemissionDoc_Sel
	Else
		If not &TFEmbarqueRemissionDoc.IsEmpty()
			print printBlockTFEmbarqueRemissionDoc
		EndIf
	EndIf
	If not &TFEmbarqueTransporte_Sel.IsEmpty()
		print printBlockTFEmbarqueTransporte_Sel
	Else
		If not &TFEmbarqueTransporte.IsEmpty()
			print printBlockTFEmbarqueTransporte
		EndIf
	EndIf
	If not &TFEmbarquePlacas_Sel.IsEmpty()
		print printBlockTFEmbarquePlacas_Sel
	Else
		If not &TFEmbarquePlacas.IsEmpty()
			print printBlockTFEmbarquePlacas
		EndIf
	EndIf
	If not &TFEmbarqueConductor_Sel.IsEmpty()
		print printBlockTFEmbarqueConductor_Sel
	Else
		If not &TFEmbarqueConductor.IsEmpty()
			print printBlockTFEmbarqueConductor
		EndIf
	EndIf
	If not (&TFEmbarqueNoProductos.IsEmpty() AND &TFEmbarqueNoProductos_To.IsEmpty())
		print printBlockTFEmbarqueNoProductos
		&TFEmbarqueNoProductos_To_Description = format('%1 (%2)', "No. Productos", "WWP_TSTo")
		print printBlockTFEmbarqueNoProductos_To
	EndIf
	&TFEmbarqueEstatus_Sels.FromJson(&TFEmbarqueEstatus_SelsJson)
	If not &TFEmbarqueEstatus_Sels.Count = 0
		&i = 1
		For &TFEmbarqueEstatus_Sel in &TFEmbarqueEstatus_Sels
			If &i = 1
				&TFEmbarqueEstatus_SelDscs = ''
			Else
				&TFEmbarqueEstatus_SelDscs += ', '
			EndIf
			&FilterTFEmbarqueEstatus_SelValueDescription = &TFEmbarqueEstatus_Sel.EnumerationDescription()

			&TFEmbarqueEstatus_SelDscs += &FilterTFEmbarqueEstatus_SelValueDescription
			&i += 1
		EndFor
		print printBlockTFEmbarqueEstatus_Sel
	EndIf
	If not &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel.IsEmpty()
		Do Case
			Case &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel = 1
				&FilterTFEmbarqueDetalleConfirmadoPorAdministracion_SelValueDescription = "WWP_TSChecked" 
			Case &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel = 2
				&FilterTFEmbarqueDetalleConfirmadoPorAdministracion_SelValueDescription = "WWP_TSUnChecked" 
		EndCase

		print printBlockTFEmbarqueDetalleConfirmadoPorAdministracion_Sel
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

	For each DB.EmbarqueDetalle
		order EmbarqueFecha  when &OrderedBy = 1 AND &OrderedDsc = False
		order (EmbarqueFecha)  when &OrderedBy = 1 AND &OrderedDsc = True
		order EmbarqueFolioCarga  when &OrderedBy = 2 AND &OrderedDsc = False
		order (EmbarqueFolioCarga)  when &OrderedBy = 2 AND &OrderedDsc = True
		order EmbarqueHoraEstimadaInicio  when &OrderedBy = 3 AND &OrderedDsc = False
		order (EmbarqueHoraEstimadaInicio)  when &OrderedBy = 3 AND &OrderedDsc = True
		order EmbarqueOrderDate  when &OrderedBy = 4 AND &OrderedDsc = False
		order (EmbarqueOrderDate)  when &OrderedBy = 4 AND &OrderedDsc = True
		order EmbarqueOrderDeliveryDate  when &OrderedBy = 5 AND &OrderedDsc = False
		order (EmbarqueOrderDeliveryDate)  when &OrderedBy = 5 AND &OrderedDsc = True
		order EmbarqueHoraFin  when &OrderedBy = 6 AND &OrderedDsc = False
		order (EmbarqueHoraFin)  when &OrderedBy = 6 AND &OrderedDsc = True
		order EmbarqueCliente  when &OrderedBy = 7 AND &OrderedDsc = False
		order (EmbarqueCliente)  when &OrderedBy = 7 AND &OrderedDsc = True
		order EmbarqueProductoNombre  when &OrderedBy = 8 AND &OrderedDsc = False
		order (EmbarqueProductoNombre)  when &OrderedBy = 8 AND &OrderedDsc = True
		order EmbarqueDetalleCantidadPallets  when &OrderedBy = 9 AND &OrderedDsc = False
		order (EmbarqueDetalleCantidadPallets)  when &OrderedBy = 9 AND &OrderedDsc = True
		order EmbarqueOrderDoc  when &OrderedBy = 10 AND &OrderedDsc = False
		order (EmbarqueOrderDoc)  when &OrderedBy = 10 AND &OrderedDsc = True
		order EmbarqueRemissionDoc  when &OrderedBy = 11 AND &OrderedDsc = False
		order (EmbarqueRemissionDoc)  when &OrderedBy = 11 AND &OrderedDsc = True
		order EmbarqueTransporte  when &OrderedBy = 12 AND &OrderedDsc = False
		order (EmbarqueTransporte)  when &OrderedBy = 12 AND &OrderedDsc = True
		order EmbarquePlacas  when &OrderedBy = 13 AND &OrderedDsc = False
		order (EmbarquePlacas)  when &OrderedBy = 13 AND &OrderedDsc = True
		order EmbarqueConductor  when &OrderedBy = 14 AND &OrderedDsc = False
		order (EmbarqueConductor)  when &OrderedBy = 14 AND &OrderedDsc = True
		order EmbarqueNoProductos  when &OrderedBy = 15 AND &OrderedDsc = False
		order (EmbarqueNoProductos)  when &OrderedBy = 15 AND &OrderedDsc = True
		order EmbarqueEstatus  when &OrderedBy = 16 AND &OrderedDsc = False
		order (DB.EmbarqueEstatus)  when &OrderedBy = 16 AND &OrderedDsc = True
		order EmbarqueDetalleConfirmadoPorAdministracion  when &OrderedBy = 17 AND &OrderedDsc = False
		order (EmbarqueDetalleConfirmadoPorAdministracion)  when &OrderedBy = 17 AND &OrderedDsc = True
		
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)
		&EmbarqueEstatusDescription = EmbarqueEstatus.EnumerationDescription()

		Do 'BeforePrintLine'
		print printBlockLines_data
		&GridCount += 1
		&TotEmbarqueDetalleCantidadPallets = EmbarqueDetalleCantidadPallets + &TotEmbarqueDetalleCantidadPallets
		
		Do 'AfterPrintLine'
	EndFor

	Do 'PrintTotalizers'

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'PrintTotalizers'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TotValueEmbarqueCodigo = "WWP_TotalizerCount" + trim(&GridCount.ToFormattedString())
	&TotValueEmbarqueDetalleCantidadPallets = trim(&TotEmbarqueDetalleCantidadPallets.ToFormattedString())
	print printBlockLines_Totalizers

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Embarques.ListadoEmbarquesGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Embarques.ListadoEmbarquesGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Embarques.ListadoEmbarquesGridState"))
	Endif	

	&OrderedBy = &GridState.OrderedBy
	&OrderedDsc = &GridState.OrderedDsc

	For &GridStateFilterValue in &GridState.FilterValues
		Do Case
			Case &GridStateFilterValue.Name = !"FILTERFULLTEXT"
				&FilterFullText.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECODIGO"
				&TFEmbarqueCodigo.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECODIGO_SEL"
				&TFEmbarqueCodigo_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFOLIOCARGA"
				&TFEmbarqueFolioCarga.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFOLIOCARGA_SEL"
				&TFEmbarqueFolioCarga_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEHORAESTIMADAINICIO"
				&TFEmbarqueHoraEstimadaInicio.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueHoraEstimadaInicio_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEORDERDATE"
				&TFEmbarqueOrderDate.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueOrderDate_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEORDERDELIVERYDATE"
				&TFEmbarqueOrderDeliveryDate.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueOrderDeliveryDate_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEDIFFDIASPEDIDO"
				&TFEmbarqueDiffDiasPedido.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueDiffDiasPedido_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEDIFFDIASENTREGA"
				&TFEmbarqueDiffDiasEntrega.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueDiffDiasEntrega_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEFECHA"
				&TFEmbarqueFecha.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueFecha_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEHORAFIN"
				&TFEmbarqueHoraFin.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueHoraFin_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECLIENTE"
				&TFEmbarqueCliente.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECLIENTE_SEL"
				&TFEmbarqueCliente_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEPRODUCTONOMBRE"
				&TFEmbarqueProductoNombre.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEPRODUCTONOMBRE_SEL"
				&TFEmbarqueProductoNombre_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEDETALLECANTIDADPALLETS"
				&TFEmbarqueDetalleCantidadPallets.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueDetalleCantidadPallets_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEORDERDOC"
				&TFEmbarqueOrderDoc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEORDERDOC_SEL"
				&TFEmbarqueOrderDoc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEREMISSIONDOC"
				&TFEmbarqueRemissionDoc.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEREMISSIONDOC_SEL"
				&TFEmbarqueRemissionDoc_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUETRANSPORTE"
				&TFEmbarqueTransporte.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUETRANSPORTE_SEL"
				&TFEmbarqueTransporte_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEPLACAS"
				&TFEmbarquePlacas.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEPLACAS_SEL"
				&TFEmbarquePlacas_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECONDUCTOR"
				&TFEmbarqueConductor.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUECONDUCTOR_SEL"
				&TFEmbarqueConductor_Sel.FromString(&GridStateFilterValue.Value)
			Case &GridStateFilterValue.Name = !"TFEMBARQUENOPRODUCTOS"
				&TFEmbarqueNoProductos.FromString(&GridStateFilterValue.Value)
				&TFEmbarqueNoProductos_To.FromString(&GridStateFilterValue.ValueTo)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEESTATUS_SEL"
				&TFEmbarqueEstatus_SelsJson = &GridStateFilterValue.Value
				&TFEmbarqueEstatus_Sels.FromJson(&TFEmbarqueEstatus_SelsJson)
			Case &GridStateFilterValue.Name = !"TFEMBARQUEDETALLECONFIRMADOPORADMINISTRACION_SEL"
				&TFEmbarqueDetalleConfirmadoPorAdministracion_Sel.FromString(&GridStateFilterValue.Value)
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

Output_file("ListadoEmbarquesExportReport","PDF");

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

