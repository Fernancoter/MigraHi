# Procedure: SDFinalizarExtrusion

- **Module:** Produccion
- **Description:** SDFinalizar Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| BobinaNo | Variable | NUMERIC |  | Bobina No |
| CambioMaterial | Variable | Boolean |  | Cambio Material |
| ExtId | Variable | NUMERIC |  | Ext Id |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| isOK | Parameter | Boolean | out | is OK |
| NextExtId | Variable | NUMERIC |  | Next Ext Id |
| OrigenTipoMaterial | Variable | VARCHAR |  | Origen Tipo Material |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SDTBobinaProceso | Variable | GX_SDT |  | SDTBobina Proceso |
| SgteExtrusion | Variable | GX_BUSCOMP |  | Sgte Extrusion |
| SgteExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| SgteProductoId | Variable | NUMERIC |  | Producto Id |
| SgteTipoMaterial | Variable | VARCHAR |  | Sgte Tipo Material |
| ExtrusionAncho | Variable | VARCHAR |  | Ancho |
| ExtrusionLongitud | Variable | VARCHAR |  | Longitud |
| ExtrusionCalibre | Variable | VARCHAR |  | Calibre |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| BobinaProductoId | Variable | NUMERIC |  | Bobina Producto Id |
| SgteExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
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

        do 'TransferirBobinas'
	
	//Sgte Extrusion
        &SgteExtrusion.Load(&SgteExtrusionId)
	&SgteExtrusoraId = &SgteExtrusion.ExtrusionExtrusoraId
	&SgteProductoId = &SgteExtrusion.ExtrusionProductoId
	
	if(&BobinaProductoId <> &SgteProductoId)
		
		do 'CalibrarExtrusion'
		
		&SgteExtrusion.ExtrusionProductoId = &BobinaProductoId
		&SgteExtrusion.ExtrusionCalibre = &ExtrusionCalibre
		&SgteExtrusion.ExtrusionAncho = &ExtrusionAncho
		&SgteExtrusion.WWPBaseObjects.ExtrusionLongitud = &ExtrusionLongitud
		&SgteExtrusion.Save()
		
		if(&SgteExtrusion.Success())
			commit
		endif
        endif
	
	
        //Reset (Estado - Notificaciones - Variable GAM)
//	SDLimpiarNotificaciones.Call(&ExtrusionId, NotificacionTipo.Bobina)
//	SetEstadoExtrusion.Call(&ExtrusionId, EstadoExtrusion.Terminada)
//	SetGAMAttribute.Call('ExtrusionID','0')

	
	Sub 'TransferirBobinas'
		for each DB.Bobina
			where BobinaId > 0
			where ExtrusionId = &ExtrusionId
			where BobinaEstado = EstadoBobina.EnProceso
			&BobinaProductoId = BobinaProductoId
			&BobinaId = BobinaId
		        
			&Bobina.Load(&BobinaId)
			&Bobina.ExtrusionId = &SgteExtrusionId
			&Bobina.Save()
			
			if(&Bobina.Success())
				commit
			endif
		Endfor
        EndSub
        
        Sub 'CalibrarExtrusion'
	     for each DB.ExtrusoraProducto
		   where ExtrusoraProductoId > 0
		   where ExtrusoraId = &SgteExtrusoraId
		   where Mail.ProductoId = &BobinaProductoId
		
		   &ExtrusionCalibre = ExtrusoraProductoCalibre
                   &ExtrusionAncho = ExtrusoraProductoAncho
                   &ExtrusionLongitud = ExtrusoraProductoLongitud
		   Exit
	     endfor
        EndSub

   

//        //Extrusion
//        &Extrusion.Load(&ExtrusionId)
//        &OrigenTipoMaterial = &Extrusion.ExtrusionProductoTipoMaterial
//        
//	//Sgte Extrusion
//      &SgteExtrusion.Load(&SgteExtrusionId)
//	&SgteProductoId = &SgteExtrusion.ExtrusionProductoId
//	&SgteTipoMaterial = &SgteExtrusion.ExtrusionProductoTipoMaterial
//	
//	//Gestionar Bobinas En Proceso
//	for each Bobina
//		where BobinaId > 0
//		where ExtrusionId = &ExtrusionId
//		where BobinaEstado = EstadoBobina.EnProceso
//		&BobinaId = BobinaId
//		&Bobina.Load(&BobinaId)
//		
//		if(&SgteExtrusionId > 0)
//			
//			do 'CambioMaterial'
//			
//			//Cambio de Material
//			if(&CambioMaterial)
//				&BobinaNo = GenerarBobinaNo.Udp(&ExtrusoraId, &SgteProductoId)
//				&BobinaNo += 1
//				&Bobina.BobinaNo = &BobinaNo
//				&Bobina.BobinaProductoId = &SgteProductoId
//				&Bobina.Save()
//				commit
//				
//				//Ajustar NoSerie
//				BobinaNoSerie.Call(&BobinaId, &SgteExtrusionId)
//			EndIf
//			
//			//Listado de Bobinas Proceso
//			&SDTBobinaItem = New()
//			&SDTBobinaItem.FromJson(&Bobina.ToJson())
//			&SDTBobinaProceso.Add(&SDTBobinaItem)
//		endif
//		
//		
//	Endfor
//	
//	do 'TransferirBobinas'
//	
//	//Reset (Estado - Notificaciones - Variable GAM)
//	SDLimpiarNotificaciones.Call(&ExtrusionId, NotificacionTipo.Bobina)
//	SetEstadoExtrusion.Call(&ExtrusionId, EstadoExtrusion.Terminada)
//	SetGAMAttribute.Call('ExtrusionID','0')
//	
//	
//	Sub 'TransferirBobinas'
//			
//		for &SDTBobinaItem in &SDTBobinaProceso
//			&Bobina.Load(&SDTBobinaItem.BobinaId)
//			&Bobina.ExtrusionId = &SgteExtrusionId
//			&Bobina.Save()
//			commit
//		endfor
//	EndSub
//	
//	Sub 'CambioMaterial'
//		
//		&CambioMaterial = false
//		
//		if(&SgteTipoMaterial <> &OrigenTipoMaterial)
//			&CambioMaterial = true	
//		endif
//	
//	EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&SgteExtrusionId, out:&isOK);
```

