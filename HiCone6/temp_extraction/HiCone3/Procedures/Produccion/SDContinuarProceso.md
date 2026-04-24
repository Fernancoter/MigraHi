# Procedure: SDContinuarProceso

- **Module:** Produccion
- **Description:** SDContinuar Proceso
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
| isOK | Variable | Boolean |  | is OK |
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
		&SgteExtrusion.ExtrusionLongitud = &ExtrusionLongitud
		&SgteExtrusion.Save()
		
		if(&SgteExtrusion.Success())
			commit
		endif
        endif

	
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
		   where ProductoId = &BobinaProductoId
		
		   &ExtrusionCalibre = ExtrusoraProductoCalibre
                   &ExtrusionAncho = ExtrusoraProductoAncho
                   &ExtrusionLongitud = ExtrusoraProductoLongitud
		   Exit
	     endfor
        EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&SgteExtrusionId);
```

