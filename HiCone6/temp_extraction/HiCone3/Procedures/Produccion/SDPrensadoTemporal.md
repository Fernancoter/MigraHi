# Procedure: SDPrensadoTemporal

- **Module:** Produccion
- **Description:** SDPrensado Temporal
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| BobinaItem | Variable | GX_SDT |  | Bobina Item |
| BobinaNo | Variable | NUMERIC |  | Bobina No |
| Cambio | Variable | Boolean |  | Cambio |
| CambioMaterial | Variable | Boolean |  | Cambio Material |
| Chr1 | Variable | CHARACTER |  | Chr1 |
| Chr2 | Variable | CHARACTER |  | Chr2 |
| Compatible | Variable | Boolean |  | Compatible |
| EnProceso | Variable | NUMERIC |  | En Proceso |
| Exito | Variable | Boolean |  | Exito |
| ExtOrigenId | Variable | NUMERIC |  | Ext Origen Id |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionAncho | Variable | VARCHAR |  | Ancho |
| ExtrusionCalibre | Variable | VARCHAR |  | Calibre |
| ExtrusionLongitud | Variable | VARCHAR |  | Longitud |
| ExtrusionOrigen | Variable | GX_BUSCOMP |  | Extrusion Origen |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| Length | Variable | NUMERIC |  | Length |
| NextExtId | Variable | NUMERIC |  | Next Ext Id |
| NextPrenId | Variable | NUMERIC |  | Next Pren Id |
| NuevoTipoMaterial | Variable | VARCHAR |  | Nuevo Tipo Material |
| OrigenProductoId | Variable | NUMERIC |  | Producto Id |
| OrigenTipoMaterial | Variable | VARCHAR |  | Origen Tipo Material |
| PrenOrigenId | Parameter | NUMERIC | in | Pren Origen Id |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoOrigen | Variable | GX_BUSCOMP |  | Prensado Origen |
| PrensadoOrigenId | Variable | NUMERIC |  | Prensado Origen Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| ProductoNombre | Variable | VARCHAR |  | Producto Nombre |
| ProductoTipoMaterial | Variable | VARCHAR |  | Producto Tipo Material |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SDTBobinaPendiente | Variable | GX_SDT |  | SDTBobina Pendiente |
| TroquelId | Parameter | NUMERIC | in | Troquel Id |
| TroquelOrigenId | Variable | NUMERIC |  | Troquel Origen Id |
| Factor | Variable | NUMERIC |  | Factor |
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
	
	&PrensadoOrigen.Load(&PrenOrigenId)
	&PrensaId = &PrensadoOrigen.PrensadoPrensaId
	&TroquelOrigenId = &PrensadoOrigen.PrensadoTroquelId
	
	&Prensado = New()
	&Prensado.PrensadoPrensaId = &PrensaId
	&Prensado.PrensadoHoraIniciaProceso = &PrensadoOrigen.PrensadoHoraIniciaProceso
	&Prensado.PrensadoTurnoId = &PrensadoOrigen.PrensadoTurnoId
	&Prensado.PrensadoFecha = &PrensadoOrigen.PrensadoFecha
	&Prensado.PrensadoOperadorId.SetNull()
	&Prensado.PrensadoEstado = EstadoPrensado.Intermedio
	&Prensado.PrensadoLevasUnidadMedida = UnidadMedida.kg
        &Prensado.PrensadoRodillosUnidadMedida = UnidadMedida.kg
	
	if(&ProductoId > 0)
		
		//Calibración Nueva
		&Prensado.PrensadoProductoId = &ProductoId
		
		//Tratamiento de Troqueles
		if(&TroquelId > 0)
			&Prensado.PrensadoTroquelId = &TroquelId
			SDCrearPrensaTroquel.Call(&PrensaId, &TroquelId)
		else
			&Prensado.DB.PrensadoTroquelId = &PrensadoOrigen.PrensadoTroquelId
		endif
	else
		//Calibración Original
		&Prensado.PrensadoProductoId = &PrensadoOrigen.PrensadoProductoId
		&Prensado.PrensadoTroquelId = &PrensadoOrigen.PrensadoTroquelId
	endif

	&Prensado.Save()
	
	if(&Prensado.Success())
		&NextPrenId = &Prensado.PrensadoId
		
		do 'GestionarBobina'
		
		commit
	endif

        Sub 'GestionarBobina'
		
		&BobinaItem = SDBobinaEnPrensado.Udp(&PrenOrigenId)
		
		if(&BobinaItem.BobinaId > 0)
			
			&Factor = SDFactorConsumoKg.Udp(&BobinaItem.BobinaKg)
			
			if(&BobinaItem.BobinaCarreras < &Factor)
	                        
				SetEstadoBobina.Call(&BobinaItem.BobinaId, EstadoBobina.Desmontada)
				
//				if(&ProductoId > 0)
//				        SetEstadoBobina.Call(&BobinaItem.BobinaId, EstadoBobina.Desmontada)
//				else
//					CrearPrensadoBobina.Call(&NextPrenId, &BobinaItem.BobinaId)
//				endif
			else
				SetEstadoBobina.Call(&BobinaItem.BobinaId, EstadoBobina.Consumida)
				SDPrensadoMermaKg.Call(&PrenOrigenId)
			endif
	        endif
	
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&PrenOrigenId, in:&ProductoId, in:&TroquelId);
```

