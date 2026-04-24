# Procedure: InicializarEmbarque

- **Module:** Embarques
- **Description:** Inicializar Embarque
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EmbarqueFecha | Variable | DATE |  | Fecha de Embarque |
| EmbarqueId | Variable | NUMERIC |  | Embarque Id |
| EmbarqueProductoId | Variable | NUMERIC |  | Embarque Producto Id |
| CantidadProductos | Variable | NUMERIC |  | Cantidad Productos |
| CustomerName | Variable | VARCHAR |  | Cliente |
| Embarque | Variable | GX_BUSCOMP |  | Embarque |
| EmbarqueDetalle | Variable | GX_BUSCOMP |  | Embarque Detalle |
| OrderDate | Variable | DATE |  | Fecha de Elaboración |
| OrderDeliveryDate | Variable | DATE |  | Fecha de Entrega |
| OrderDoc | Parameter | VARCHAR | in | Order Doc |
| OrderShipping | Variable | VARCHAR |  | Envío |
| RemissionDoc | Parameter | VARCHAR | in | Remission Doc |
| TerminadoProductoNombre | Variable | VARCHAR |  | Terminado Producto Nombre |
| ConsolidatedName | Variable | VARCHAR |  | Grupo |
| CustomerShipping | Variable | VARCHAR |  | Envió |
| DeliveryDate | Variable | DATE |  | Delivery Date |
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

&EmbarqueId = BuscarEmbarqueRemission.Udp(&OrderDoc,&RemissionDoc)

do 'ObtenerFechaPedidoSAE'

if(&EmbarqueId = 0)
		
	&Embarque.Load(&EmbarqueId)
	&EmbarqueFecha = ObtenerFechaRemisionDesdeSAE.Udp(&RemissionDoc)
	ObtenerDatosRemisionDesdeSAE.Call(&RemissionDoc,&CustomerName, &OrderShipping, &ConsolidatedName, &CustomerShipping)
	&Embarque.Load(&EmbarqueId)
	&Embarque.EmbarqueOrderDoc = &OrderDoc.Trim()
	&Embarque.EmbarqueRemissionDoc = &RemissionDoc.Trim()
	&Embarque.EmbarqueFecha = &EmbarqueFecha
	&Embarque.EmbarqueEstatus = Estatusembarque.PorProgramar
	&Embarque.EmbarqueCliente = &CustomerName
	&Embarque.EmbarqueClienteGrupo = &ConsolidatedName
	&Embarque.EmbarqueClienteEnvia = &CustomerShipping
	&Embarque.EmbarqueDestino = &OrderShipping
	&Embarque.EmbarqueHoraInicio = now()
	&Embarque.EmbarqueOrderDate = &OrderDate
	&Embarque.EmbarqueOrderDeliveryDate = &OrderDeliveryDate
	&Embarque.EmbarqueObservaciones.SetEmpty()

	&Embarque.Save()
	&CantidadProductos = 0
	
	for each DB.Remission
		Where DB.RemissionDoc = &RemissionDoc
		
		&CantidadProductos = &CantidadProductos +1
		&EmbarqueDetalle = new()
		&EmbarqueDetalle.WWPBaseObjects.EmbarqueDetalleCantidadPallets = Informes.TotalPalletPorProductNumber.udp(ProductNumber,RemissionQuantity)
		&EmbarqueDetalle.EmbarqueDetalleProducto = ProductNumber
		&EmbarqueDetalle.EmbarqueDetalleConfirmadoPorAdministracion = False
		&TerminadoProductoNombre = ProductNumber.ToString().Trim()
		
		do 'BuscarProductoEnPallet'
		
		if(&EmbarqueProductoId=0)
			&EmbarqueDetalle.EmbarqueProductoId.SetNull()
		else
			&EmbarqueDetalle.EmbarqueProductoId = &EmbarqueProductoId
		endif
		
		&EmbarqueDetalle.EmbarqueId = &Embarque.EmbarqueId
		
		&EmbarqueDetalle.Save()
		
	endfor
	
	&Embarque.EmbarqueNoProductos = &CantidadProductos
	
	if(&Embarque.Success())
		commit
		
		&Embarque.Load(&Embarque.EmbarqueId)
		&Embarque.Check() //Calcular formulas
		&Embarque.Save()
		commit
		
		EmbarqueWP.Call(&Embarque.EmbarqueId)
	else
		msg(&Embarque.GetMessages().ToJson())
	endif
	
else
	do 'NotificarCambioFecha'
endif


sub 'BuscarProductoEnPallet'
	&EmbarqueProductoId = 0
	for each DB.ProductoTerminado
		where TerminadoProductoNombre = &TerminadoProductoNombre
		
		&EmbarqueProductoId = TerminadoProductoId
		exit
	endfor
endsub


Sub 'ObtenerFechaPedidoSAE'
	
	for each DB.Order
		where OrderDoc.Trim() = &OrderDoc.Trim()
		&OrderDate = OrderDate
		&OrderDeliveryDate = OrderDeliveryDate
		Exit
	endfor
EndSub

Sub 'NotificarCambioFecha'
	
	&Embarque.Load(&EmbarqueId)
        
        if(&Embarque.EmbarqueEstatus in (EstatusEmbarque.PorProgramar, EstatusEmbarque.Programado))
		
		&DeliveryDate.SetEmpty()
		&DeliveryDate = &Embarque.EmbarqueOrderDeliveryDate
		
		if(Not &DeliveryDate.IsEmpty())
			
	                //Cambio de Fechas
			if(&DeliveryDate <> &OrderDeliveryDate)
				
				&Embarque.EmbarqueOrderDate = &OrderDate
				&Embarque.EmbarqueOrderDeliveryDate = &OrderDeliveryDate
				&Embarque.Save()
				
				if(&Embarque.Success())
					commit
					
					//Enviar notificación
					WWP_SendNotification(!'CambioFechaEstimada', !"Embarque", '', "fas fa-info", "Cambio Fecha de Embarque", &Embarque.EmbarqueCodigo.ToString(), "El embarque " + &Embarque.EmbarqueCodigo.ToString() + " ha cambiado su fecha estimada de entrega", '', '', '', true)
				endif
			endif
		endif
	endif

EndSub
```

### Rules (Rules)

```genexus
parm(in:&OrderDoc, in:&RemissionDoc);
```

