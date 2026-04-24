# Procedure: SDExtrusionTemporal

- **Module:** Produccion
- **Description:** SDExtrusion Temporal
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| BobinaNo | Variable | NUMERIC |  | Bobina No |
| Cambio | Variable | Boolean |  | Cambio |
| CambioMaterial | Variable | Boolean |  | Cambio Material |
| Chr1 | Variable | CHARACTER |  | Chr1 |
| Chr2 | Variable | CHARACTER |  | Chr2 |
| EnProceso | Variable | NUMERIC |  | En Proceso |
| Exito | Variable | Boolean |  | Exito |
| ExtOrigenId | Parameter | NUMERIC | in | Ext Origen Id |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionAncho | Variable | VARCHAR |  | Ancho |
| ExtrusionCalibre | Variable | VARCHAR |  | Calibre |
| ExtrusionLongitud | Variable | VARCHAR |  | Longitud |
| ExtrusionOrigen | Variable | GX_BUSCOMP |  | Extrusion Origen |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| Length | Variable | NUMERIC |  | Length |
| NextExtId | Variable | NUMERIC |  | Next Ext Id |
| NuevoTipoMaterial | Variable | VARCHAR |  | Nuevo Tipo Material |
| OrigenProductoId | Variable | NUMERIC |  | Producto Id |
| OrigenTipoMaterial | Variable | VARCHAR |  | Origen Tipo Material |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| ProductoNombre | Variable | VARCHAR |  | Producto Nombre |
| ProductoTipoMaterial | Variable | VARCHAR |  | Producto Tipo Material |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SDTBobinaPendiente | Variable | GX_SDT |  | SDTBobina Pendiente |
| SDTBobinaProceso | Variable | GX_SDT |  | SDTBobina Proceso |
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
	&ExtrusionCalibre.SetEmpty()
	&ExtrusionAncho.SetEmpty()
	&ExtrusionLongitud.SetEmpty()	
	
	&ExtrusionOrigen.Load(&ExtOrigenId)
	&ExtrusoraId = &ExtrusionOrigen.ExtrusionExtrusoraId
	&OrigenTipoMaterial = &ExtrusionOrigen.ExtrusionProductoTipoMaterial
	
	&Extrusion = New()
	&Extrusion.ExtrusionExtrusoraId = &ExtrusionOrigen.ExtrusionExtrusoraId
	&Extrusion.ExtrusionHoraIniciaProceso = &ExtrusionOrigen.ExtrusionHoraIniciaProceso
	&Extrusion.ExtrusionTurnoId = &ExtrusionOrigen.ExtrusionTurnoId
	&Extrusion.ExtrusionFecha = &ExtrusionOrigen.ExtrusionFecha 
	&Extrusion.ExtrusionOperadorId.SetNull()
	&Extrusion.ExtrusionEstado = EstadoExtrusion.Intermedia
	&Extrusion.ExtrusionSiloId.SetNull()
	&Extrusion.ExtrusionSiloMolidoId.SetNull()
	
	if(&ProductoId > 0)
		
		//Calibración Nueva
		&Extrusion.ExtrusionProductoId = &ProductoId
		
		do 'CalibrarExtrusion'
		do 'CambioMaterial'
	else
		//Calibración Original
		&Extrusion.ExtrusionProductoId = &ExtrusionOrigen.ExtrusionProductoId
		&ExtrusionCalibre = &ExtrusionOrigen.ExtrusionCalibre
		&ExtrusionAncho = &ExtrusionOrigen.ExtrusionAncho
		&ExtrusionLongitud = &ExtrusionOrigen.ExtrusionLongitud
	endif

	&Extrusion.ExtrusionCalibre = &ExtrusionCalibre
	&Extrusion.ExtrusionAncho = &ExtrusionAncho
	&Extrusion.ExtrusionLongitud = &ExtrusionLongitud
	&Extrusion.Save()
	
	if(&Extrusion.Success())
		&NextExtId = &Extrusion.ExtrusionId
		commit
	
		do 'GestionarBobinasProceso'
	endif

        
	Sub 'GestionarBobinasProceso'
		
		&BobinaNo = GenerarBobinaNo.Udp(&ExtrusoraId, &ProductoId)
		&BobinaNo += 1
		
		for each DB.Bobina
			where BobinaId > 0
			where ExtrusionId = &ExtOrigenId
			where BobinaEstado = EstadoBobina.EnProceso
			&BobinaId = BobinaId
                        &Bobina.Load(&BobinaId)
			
			//Cambio de Material
			if(&CambioMaterial)
				&Bobina.BobinaNo = &BobinaNo
				&Bobina.BobinaProductoId = &ProductoId
				&Bobina.Save()
				commit
				
				//Ajustar NoSerie
				BobinaNoSerie.Call(&BobinaId, &NextExtId)
			EndIf
			
		        //Listado de Bobinas Proceso
		        &SDTBobinaItem = New()
			&SDTBobinaItem.FromJson(&Bobina.ToJson())
			&SDTBobinaProceso.Add(&SDTBobinaItem)
		endfor
		
	        do 'TransferirBobinas'
	        
	EndSub

        Sub 'TransferirBobinas'
		
		for &SDTBobinaItem in &SDTBobinaProceso
		       &Bobina.Load(&SDTBobinaItem.BobinaId)
		       &Bobina.ExtrusionId = &NextExtId
		       &Bobina.Save()
		       commit
	        endfor
	EndSub
	
	Sub 'CalibrarExtrusion'
		for each DB.ExtrusoraProducto
			where ExtrusoraProductoId > 0
			where ExtrusoraId = &ExtrusoraId
			where ProductoId = &ProductoId
			&NuevoTipoMaterial = ProductoTipoMaterial
			
			&ExtrusionCalibre = ExtrusoraProductoCalibre
			&ExtrusionAncho = ExtrusoraProductoAncho
			&ExtrusionLongitud = ExtrusoraProductoLongitud
			Exit
		endfor
	EndSub

        Sub 'CambioMaterial'
		
		&CambioMaterial = false
		
		if(&NuevoTipoMaterial <> &OrigenTipoMaterial)
			&CambioMaterial = true	
		endif
	
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExtOrigenId, in:&ProductoId);
```

