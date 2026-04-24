# Procedure: SDFinalizarPrensado

- **Module:** Produccion
- **Description:** SDFinalizar Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaItem | Variable | GX_SDT |  | Bobina Item |
| isOK | Parameter | Boolean | out | is OK |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| SgtePrensado | Variable | GX_BUSCOMP |  | Sgte Prensado |
| SgtePrensadoId | Variable | NUMERIC |  | Prensado Id |
| SgteProductoId | Variable | NUMERIC |  | Producto Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
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

	//Sgte Turno Programado (Prensa)
	&SgtePrensadoId = Produccion.SgteTurnoPrensado.Udp(&PrensadoId)
	&SgtePrensado.Load(&SgtePrensadoId)
	&SgteProductoId = &SgtePrensado.PrensadoProductoId
	
	//Decision sobre la Bobina En Prensado
        &BobinaItem = SDBobinaEnPrensado.Udp(&PrensadoId)
	
	if(&BobinaItem.BobinaId > 0)
		
		&Factor = SDFactorConsumoKg.Udp(&BobinaItem.BobinaKg)
		
		if(&BobinaItem.BobinaCarreras < &Factor)
	                
			if(&SgtePrensadoId > 0)
				if(&ProductoId <> &SgteProductoId)
				        SetEstadoBobina.Call(&BobinaItem.BobinaId, EstadoBobina.Desmontada)
				else
					Produccion.CrearPrensadoBobina.Call(&SgtePrensadoId, &BobinaItem.BobinaId)
				endif
		        else
				SetEstadoBobina.Call(&BobinaItem.BobinaId, Produccion.EstadoBobina.Desmontada)
			endif
		else
			SetEstadoBobina.Call(&BobinaItem.BobinaId, Produccion.EstadoBobina.Consumida)
			SDPrensadoMermaKg.Call(&PrensadoId)
		endif
        endif
        
        //Reset (Estado - Notificaciones - Variable GAM)
	Produccion.SDLimpiarNotificaciones.Call(&PrensadoId, NotificacionTipo.Carrera)
        SetEstadoPrensado.Call(&PrensadoId, Produccion.EstadoPrensado.Terminado)
	SetGAMAttribute.Call('PrensadoID','0')
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&ProductoId, out:&isOK);
```

