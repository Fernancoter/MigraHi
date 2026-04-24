# Procedure: SDNuevoProducto

- **Module:** Produccion
- **Description:** SDNuevo Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| BobinaNo | Variable | NUMERIC |  | Bobina No |
| BobinaProductoId | Variable | NUMERIC |  | Bobina Producto Id |
| BPTipoMaterial | Variable | VARCHAR |  | BPTipo Material |
| CambioMaterial | Variable | Boolean |  | Cambio Material |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionAncho | Variable | VARCHAR |  | Ancho |
| ExtrusionCalibre | Variable | VARCHAR |  | Calibre |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ExtrusionLongitud | Variable | VARCHAR |  | Longitud |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| isOK | Variable | Boolean |  | is OK |
| NPTipoMaterial | Variable | VARCHAR |  | NPTipo Material |
| NuevoProducto | Variable | GX_BUSCOMP |  | Nuevo Producto |
| OrigenTipoMaterial | Variable | VARCHAR |  | Origen Tipo Material |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SDTBobinaProceso | Variable | GX_SDT |  | SDTBobina Proceso |
| SgteExtrusion | Variable | GX_BUSCOMP |  | Sgte Extrusion |
| SgteExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| SgteExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| SgteProductoId | Variable | NUMERIC |  | Producto Id |
| SgteTipoMaterial | Variable | VARCHAR |  | Sgte Tipo Material |
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
	
	&NuevoProducto.Load(&ProductoId)
	&NPTipoMaterial = &NuevoProducto.ProductoTipoMaterial
	
	//Sgte Extrusion
        &SgteExtrusion.Load(&SgteExtrusionId)
	&SgteExtrusoraId = &SgteExtrusion.ExtrusionExtrusoraId
	&SgteProductoId = &SgteExtrusion.ExtrusionProductoId
	
	if(&ProductoId <> &SgteProductoId)
		
		do 'CalibrarExtrusion'
		
		&SgteExtrusion.ExtrusionProductoId = &ProductoId
		&SgteExtrusion.ExtrusionCalibre = &ExtrusionCalibre
		&SgteExtrusion.ExtrusionAncho = &ExtrusionAncho
		&SgteExtrusion.WWPBaseObjects.ExtrusionLongitud = &ExtrusionLongitud
		&SgteExtrusion.Save()
		
		if(&SgteExtrusion.Success())
			commit
		endif
        endif
        
	do 'GestionarBobinas'
	do 'TransferirBobinas'
	
	Sub 'GestionarBobinas'
		
		&BobinaNo = Produccion.GenerarBobinaNo.Udp(&SgteExtrusoraId, &ProductoId)
		&BobinaNo += 1
				
		for each DB.Bobina
			where BobinaId > 0
			where ExtrusionId = &ExtrusionId
			where BobinaEstado = EstadoBobina.EnProceso
			&BPTipoMaterial = BobinaProductoTipoMaterial
			&BobinaId = BobinaId
			&Bobina.Load(&BobinaId)
			
			do 'CambioMaterial'
			
			if(&CambioMaterial)
				&Bobina.BobinaNo = &BobinaNo
				&Bobina.BobinaProductoId = &ProductoId
				&Bobina.Save()
				commit
				
				//Ajustar NoSerie
				Produccion.BobinaNoSerie.Call(&BobinaId, &SgteExtrusionId)
			endif
                        
			//Listado de Bobinas Proceso
			&SDTBobinaItem = New()
			&SDTBobinaItem.FromJson(&Bobina.ToJson())
			&SDTBobinaProceso.Add(&SDTBobinaItem)
		Endfor
        EndSub
        
        Sub 'CalibrarExtrusion'
	     for each DB.ExtrusoraProducto
		   where ExtrusoraProductoId > 0
		   where ExtrusoraId = &SgteExtrusoraId
		   where ProductoId = &ProductoId
		
		   &ExtrusionCalibre = ExtrusoraProductoCalibre
                   &ExtrusionAncho = ExtrusoraProductoAncho
                   &ExtrusionLongitud = ExtrusoraProductoLongitud
		   Exit
	     endfor
        EndSub

	Sub 'TransferirBobinas'
			
		for &SDTBobinaItem in &SDTBobinaProceso
			&Bobina.Load(&SDTBobinaItem.BobinaId)
			&Bobina.ExtrusionId = &SgteExtrusionId
			&Bobina.Save()
			commit
		endfor
	EndSub

	Sub 'CambioMaterial'
		
		&CambioMaterial = false
		
		if(&BPTipoMaterial <> &NPTipoMaterial)
			&CambioMaterial = true	
		endif
	
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&SgteExtrusionId, in:&ProductoId);
```

