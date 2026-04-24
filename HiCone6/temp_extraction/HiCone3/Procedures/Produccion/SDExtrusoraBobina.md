# Procedure: SDExtrusoraBobina

- **Module:** Produccion
- **Description:** SDExtrusora Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| BobinaNo | Variable | NUMERIC |  | Bobina No |
| BobinaProductoId | Variable | NUMERIC |  | Bobina Producto Id |
| BobinaProductoMaterial | Variable | VARCHAR |  | Bobina Producto Material |
| CambioMaterial | Variable | Boolean |  | Cambio Material |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ExtrusionProductoId | Variable | NUMERIC |  | Extrusion Producto Id |
| ExtrusionProductoMaterial | Variable | VARCHAR |  | Extrusion Producto Material |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SDTBobinaPausadas | Variable | GX_SDT |  | SDTBobina Pausadas |
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
        
	&Extrusion.Load(&ExtrusionId)
	&ExtrusionProductoId = &Extrusion.ExtrusionProductoId
	&ExtrusionProductoMaterial = &Extrusion.ExtrusionProductoTipoMaterial
	&ExtrusoraId = &Extrusion.ExtrusionExtrusoraId
	
	&BobinaNo = GenerarBobinaNo.Udp(&ExtrusoraId, &ExtrusionProductoId)
	&BobinaNo += 1
	
	for each DB.ExtrusoraBobina
		where ExtrusoraBobinaId > 0
		where ExtrusoraId = &ExtrusoraId
		where BobinaId > 0
		where BobinaEstado = EstadoBobina.Pausada
		&BobinaId = BobinaId
		&BobinaProductoMaterial = BobinaProductoTipoMaterial
		&Bobina.Load(&BobinaId)
		
		do 'CambioMaterial'
		
	        //Cambio de Material
		if(&CambioMaterial)
			&Bobina.BobinaNo = &BobinaNo
			&Bobina.BobinaProductoId = &ExtrusionProductoId
			&Bobina.Save()
			commit
			
			//Ajustar NoSerie
			BobinaNoSerie.Call(&BobinaId, &ExtrusionId)
		EndIf
		
	        //Listado de Bobinas Proceso
	        &SDTBobinaItem = New()
		&SDTBobinaItem.FromJson(&Bobina.ToJson())
		&SDTBobinaPausadas.Add(&SDTBobinaItem)
	Endfor

        if(&SDTBobinaPausadas.Count > 0)
		do 'TransferirBobinas'
	endif


        Sub 'TransferirBobinas'
		
		for &SDTBobinaItem in &SDTBobinaPausadas
		       &Bobina.Load(&SDTBobinaItem.BobinaId)
		       &Bobina.ExtrusionId = &ExtrusionId
		       &Bobina.BobinaEstado = EstadoBobina.EnProceso
		       &Bobina.Save()
		       commit
	        endfor
	EndSub


        Sub 'CambioMaterial'
		
		&CambioMaterial = false
		
		if(&BobinaProductoMaterial <> &ExtrusionProductoMaterial)
			&CambioMaterial = true	
		endif
	
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId);
```

