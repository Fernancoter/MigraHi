# Procedure: ListadoEmbarquesGetFilterData

- **Module:** Embarques
- **Description:** Listado Embarques Get Filter Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| IsAuthorized | Variable | Boolean |  | Is Authorized |
| WWPContext | Variable | GX_SDT |  | WWPContext |
| SecurityFunctionalityKeys | Variable | VARCHAR |  | Security Functionality Keys |
| TFEmbarqueId | Variable | NUMERIC |  | TFEmbarque Id |
| TFEmbarqueId_To | Variable | NUMERIC |  | TFEmbarque Id_To |
| TFEmbarqueCodigo | Variable | VARCHAR |  | TFEmbarque Codigo |
| TFEmbarqueCodigo_Sel | Variable | VARCHAR |  | TFEmbarque Codigo_Sel |
| TFEmbarqueOrderDoc | Variable | VARCHAR |  | TFEmbarque Order Doc |
| TFEmbarqueOrderDoc_Sel | Variable | VARCHAR |  | TFEmbarque Order Doc_Sel |
| TFEmbarqueRemissionDoc | Variable | VARCHAR |  | TFEmbarque Remission Doc |
| TFEmbarqueRemissionDoc_Sel | Variable | VARCHAR |  | TFEmbarque Remission Doc_Sel |
| TFEmbarqueFolioCarga | Variable | VARCHAR |  | TFEmbarque Folio Carga |
| TFEmbarqueFolioCarga_Sel | Variable | VARCHAR |  | TFEmbarque Folio Carga_Sel |
| TFEmbarqueFecha | Variable | DATE |  | TFEmbarque Fecha |
| TFEmbarqueFecha_To | Variable | DATE |  | TFEmbarque Fecha_To |
| TFEmbarqueHoraInicio | Variable | DATETIME |  | TFEmbarque Hora Inicio |
| TFEmbarqueHoraInicio_To | Variable | DATETIME |  | TFEmbarque Hora Inicio_To |
| TFEmbarqueHoraFin | Variable | DATETIME |  | TFEmbarque Hora Fin |
| TFEmbarqueHoraFin_To | Variable | DATETIME |  | TFEmbarque Hora Fin_To |
| TFEmbarqueTransporte | Variable | VARCHAR |  | TFEmbarque Transporte |
| TFEmbarqueTransporte_Sel | Variable | VARCHAR |  | TFEmbarque Transporte_Sel |
| TFEmbarquePlacas | Variable | VARCHAR |  | TFEmbarque Placas |
| TFEmbarquePlacas_Sel | Variable | VARCHAR |  | TFEmbarque Placas_Sel |
| TFEmbarqueConductor | Variable | VARCHAR |  | TFEmbarque Conductor |
| TFEmbarqueConductor_Sel | Variable | VARCHAR |  | TFEmbarque Conductor_Sel |
| TFEmbarqueNoProductos | Variable | NUMERIC |  | TFEmbarque No Productos |
| TFEmbarqueNoProductos_To | Variable | NUMERIC |  | TFEmbarque No Productos_To |
| TFEmbarqueEstatus_SelsJson | Variable | LONGVARCHAR |  | TFEmbarque Estatus_Sels Json |
| TFEmbarqueEstatus_Sels | Variable | VARCHAR |  | TFEmbarque Estatus_Sels |
| TFEmbarqueDetalleCantidadPallets | Variable | NUMERIC |  | TFEmbarque Detalle Cantidad Pallets |
| TFEmbarqueDetalleCantidadPallets_To | Variable | NUMERIC |  | TFEmbarque Detalle Cantidad Pallets_To |
| TFEmbarqueDetalleId | Variable | NUMERIC |  | TFEmbarque Detalle Id |
| TFEmbarqueDetalleId_To | Variable | NUMERIC |  | TFEmbarque Detalle Id_To |
| TFEmbarqueDetalleProducto | Variable | VARCHAR |  | TFEmbarque Detalle Producto |
| TFEmbarqueDetalleProducto_Sel | Variable | VARCHAR |  | TFEmbarque Detalle Producto_Sel |
| TFEmbarqueProductoNombre | Variable | VARCHAR |  | TFEmbarque Producto Nombre |
| TFEmbarqueProductoNombre_Sel | Variable | VARCHAR |  | TFEmbarque Producto Nombre_Sel |
| TFEmbarqueProductoId | Variable | NUMERIC |  | TFEmbarque Producto Id |
| TFEmbarqueProductoId_To | Variable | NUMERIC |  | TFEmbarque Producto Id_To |
| SearchTxt | Parameter | VARCHAR | in | Search Txt |
| SearchTxtTo | Parameter | VARCHAR | in | Search Txt To |
| DDOName | Parameter | VARCHAR | in | DDOName |
| InsertIndex | Variable | NUMERIC |  | Insert Index |
| Option | Variable | VARCHAR |  | Option |
| Options | Variable | VARCHAR |  | Options |
| OptionsJson | Parameter | LONGVARCHAR | out | Options Json |
| OptionDesc | Variable | VARCHAR |  | Option Desc |
| OptionsDesc | Variable | VARCHAR |  | Options Desc |
| OptionsDescJson | Parameter | LONGVARCHAR | out | Options Desc Json |
| OptionIndexes | Variable | VARCHAR |  | Option Indexes |
| OptionIndexesJson | Parameter | LONGVARCHAR | out | Option Indexes Json |
| count | Variable | NUMERIC |  | count |
| Session | Variable | GX_USRDEFTYP |  | Session |
| GridStateXML | Variable | LONGVARCHAR |  | Grid State XML |
| GridState | Variable | GX_SDT |  | Grid State |
| GridStateFilterValue | Variable | GX_SDT |  | Grid State Filter Value |
| GridStateDynamicFilter | Variable | GX_SDT |  | Grid State Dynamic Filter |
| FilterFullText | Variable | VARCHAR |  | Filter Full Text |
| TFEmbarqueDetalleConfirmadoPorAdministracion_Sel | Variable | NUMERIC |  | TFEmbarque Detalle Confirmado Por Administracion_Sel |
| TFEmbarqueHoraEstimadaInicio | Variable | DATETIME |  | TFEmbarque Hora Estimada Inicio |
| TFEmbarqueHoraEstimadaInicio_To | Variable | DATETIME |  | TFEmbarque Hora Estimada Inicio_To |
| TFEmbarqueCliente | Variable | VARCHAR |  | TFEmbarque Cliente |
| TFEmbarqueCliente_Sel | Variable | VARCHAR |  | TFEmbarque Cliente_Sel |
| TFEmbarqueOrderDate | Variable | DATE |  | TFEmbarque Order Date |
| TFEmbarqueOrderDate_To | Variable | DATE |  | TFEmbarque Order Date_To |
| TFEmbarqueOrderDeliveryDate | Variable | DATE |  | TFEmbarque Order Delivery Date |
| TFEmbarqueOrderDeliveryDate_To | Variable | DATE |  | TFEmbarque Order Delivery Date_To |
| TFEmbarqueDiffDiasPedido | Variable | NUMERIC |  | TFEmbarque Diff Dias Pedido |
| TFEmbarqueDiffDiasPedido_To | Variable | NUMERIC |  | TFEmbarque Diff Dias Pedido_To |
| TFEmbarqueDiffDiasEntrega | Variable | NUMERIC |  | TFEmbarque Diff Dias Entrega |
| TFEmbarqueDiffDiasEntrega_To | Variable | NUMERIC |  | TFEmbarque Diff Dias Entrega_To |
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

&Options = new()
&OptionsDesc = new()
&OptionIndexes = new()
LoadWWPContext.Call(&WWPContext)

Do 'LoadGridState'
Do Case
	Case &DDOName.ToUpper() = !'DDO_EMBARQUECODIGO'
		Do 'LoadEmbarqueCodigoOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUEFOLIOCARGA'
		Do 'LoadEmbarqueFolioCargaOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUECLIENTE'
		Do 'LoadEmbarqueClienteOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUEPRODUCTONOMBRE'
		Do 'LoadEmbarqueProductoNombreOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUEORDERDOC'
		Do 'LoadEmbarqueOrderDocOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUEREMISSIONDOC'
		Do 'LoadEmbarqueRemissionDocOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUETRANSPORTE'
		Do 'LoadEmbarqueTransporteOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUEPLACAS'
		Do 'LoadEmbarquePlacasOptions'
	Case &DDOName.ToUpper() = !'DDO_EMBARQUECONDUCTOR'
		Do 'LoadEmbarqueConductorOptions'
EndCase

&OptionsJson = &Options.ToJson()
&OptionsDescJson = &OptionsDesc.ToJson()
&OptionIndexesJson = &OptionIndexes.ToJson()

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */


Sub 'LoadGridState'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	// Load grid state from session.
	If &Session.Get(!"Embarques.ListadoEmbarquesGridState") = !""
		&GridState.FromXml(LoadGridState.Udp(!"Embarques.ListadoEmbarquesGridState"))
	Else
		&GridState.FromXml(&Session.Get(!"Embarques.ListadoEmbarquesGridState"))
	Endif	

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

Sub 'LoadEmbarqueCodigoOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueCodigo = &SearchTxt
	&TFEmbarqueCodigo_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarqueId
		using Embarques.ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarqueId
			&count += 1
		EndFor
		If not EmbarqueCodigo.IsEmpty()
			&Option = EmbarqueCodigo
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			&Options.Add(&Option, &InsertIndex)
			&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueFolioCargaOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueFolioCarga = &SearchTxt
	&TFEmbarqueFolioCarga_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarqueFolioCarga
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarqueFolioCarga
			&count += 1
		EndFor
		If not EmbarqueFolioCarga.IsEmpty()
			&Option = EmbarqueFolioCarga
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueClienteOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueCliente = &SearchTxt
	&TFEmbarqueCliente_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarqueCliente
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarqueCliente
			&count += 1
		EndFor
		If not EmbarqueCliente.IsEmpty()
			&Option = EmbarqueCliente
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueProductoNombreOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueProductoNombre = &SearchTxt
	&TFEmbarqueProductoNombre_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarqueProductoId
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarqueProductoId
			&count += 1
		EndFor
		If not EmbarqueProductoNombre.IsEmpty()
			&Option = EmbarqueProductoNombre
			
			&InsertIndex = 1
			Do while &InsertIndex <= &Options.Count AND &Options.Item(&InsertIndex) < &Option
				&InsertIndex = &InsertIndex + 1
			EndDo
			&Options.Add(&Option, &InsertIndex)
			&OptionIndexes.Add(trim(&count.ToFormattedString()), &InsertIndex)
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueOrderDocOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueOrderDoc = &SearchTxt
	&TFEmbarqueOrderDoc_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarqueOrderDoc
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarqueOrderDoc
			&count += 1
		EndFor
		If not EmbarqueOrderDoc.IsEmpty()
			&Option = EmbarqueOrderDoc
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueRemissionDocOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueRemissionDoc = &SearchTxt
	&TFEmbarqueRemissionDoc_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarqueRemissionDoc
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarqueRemissionDoc
			&count += 1
		EndFor
		If not EmbarqueRemissionDoc.IsEmpty()
			&Option = EmbarqueRemissionDoc
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueTransporteOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueTransporte = &SearchTxt
	&TFEmbarqueTransporte_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarqueTransporte
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarqueTransporte
			&count += 1
		EndFor
		If not EmbarqueTransporte.IsEmpty()
			&Option = EmbarqueTransporte
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarquePlacasOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarquePlacas = &SearchTxt
	&TFEmbarquePlacas_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarquePlacas
		using Embarques.ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarquePlacas
			&count += 1
		EndFor
		If not EmbarquePlacas.IsEmpty()
			&Option = EmbarquePlacas
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub

Sub 'LoadEmbarqueConductorOptions'

	/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

	&TFEmbarqueConductor = &SearchTxt
	&TFEmbarqueConductor_Sel.SetEmpty()
	For Each DB.EmbarqueDetalle
		Order EmbarqueConductor
		using ListadoEmbarquesDS(&FilterFullText, &TFEmbarqueCodigo, &TFEmbarqueCodigo_Sel, &TFEmbarqueFolioCarga, &TFEmbarqueFolioCarga_Sel, &TFEmbarqueHoraEstimadaInicio
					, &TFEmbarqueHoraEstimadaInicio_To, &TFEmbarqueOrderDate, &TFEmbarqueOrderDate_To, &TFEmbarqueOrderDeliveryDate, &TFEmbarqueOrderDeliveryDate_To, &TFEmbarqueDiffDiasPedido
					, &TFEmbarqueDiffDiasPedido_To, &TFEmbarqueDiffDiasEntrega, &TFEmbarqueDiffDiasEntrega_To, &TFEmbarqueFecha, &TFEmbarqueFecha_To, &TFEmbarqueHoraFin
					, &TFEmbarqueHoraFin_To, &TFEmbarqueCliente, &TFEmbarqueCliente_Sel, &TFEmbarqueProductoNombre, &TFEmbarqueProductoNombre_Sel, &TFEmbarqueDetalleCantidadPallets
					, &TFEmbarqueDetalleCantidadPallets_To, &TFEmbarqueOrderDoc, &TFEmbarqueOrderDoc_Sel, &TFEmbarqueRemissionDoc, &TFEmbarqueRemissionDoc_Sel, &TFEmbarqueTransporte
					, &TFEmbarqueTransporte_Sel, &TFEmbarquePlacas, &TFEmbarquePlacas_Sel, &TFEmbarqueConductor, &TFEmbarqueConductor_Sel, &TFEmbarqueNoProductos
					, &TFEmbarqueNoProductos_To, &TFEmbarqueEstatus_Sels, &TFEmbarqueDetalleConfirmadoPorAdministracion_Sel)

		&count = 0
		For Each DB.EmbarqueDetalle
			Order EmbarqueConductor
			&count += 1
		EndFor
		If not EmbarqueConductor.IsEmpty()
			&Option = EmbarqueConductor
			
			&Options.Add(&Option)
			&OptionIndexes.Add(trim(&count.ToFormattedString()))
		EndIf
		If &Options.Count = 50
			Exit
		EndIf
	EndFor

	/* Generated by DVelop Work With Plus Pattern [End] - Do not change */

EndSub
```

### Rules (Rules)

```genexus
/* Generated by DVelop Work With Plus Pattern [Start] - Do not change */

parm(in:&DDOName, in:&SearchTxt, in:&SearchTxtTo, out:&OptionsJson, out:&OptionsDescJson, out:&OptionIndexesJson);

/* Generated by DVelop Work With Plus Pattern [End] - Do not change */
```

