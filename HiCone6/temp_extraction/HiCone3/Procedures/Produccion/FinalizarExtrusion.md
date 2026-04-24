# Procedure: FinalizarExtrusion

- **Module:** Produccion
- **Description:** Finalizar Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| ExtId | Variable | NUMERIC |  | Ext Id |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| EnMedicion | Variable | NUMERIC |  | En Medicion |
| EnProceso | Variable | NUMERIC |  | En Proceso |
| isOK | Parameter | Boolean | out | is OK |
| SDTBobina | Parameter | GX_SDT | in | SDTBobina |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SDTBobinaPendiente | Variable | GX_SDT |  | SDTBobina Pendiente |
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
	
	&isOK = true
	&EnMedicion = 0
	&EnProceso = 0
	&SDTBobinaPendiente.Clear()
	
        For &SDTBobinaItem in &SDTBobina
		
		&BobinaEstado = &SDTBobinaItem.BobinaEstado
		Do Case
			
			Case &BobinaEstado = EstadoBobina.EnMedicion
				&EnMedicion += 1
				
			Case &BobinaEstado = EstadoBobina.EnProceso
			        &EnProceso += 1
				&SDTBobinaPendiente.Add(&SDTBobinaItem)
		EndCase
        	
	Endfor

        if(&EnMedicion = 0)
		if(&EnProceso > 0)
			&ExtId = SgteTurnoExtrusora.Udp(&ExtrusionId)
			
			if(&ExtId > 0)
				ReasignarBobinaTurno.Call(&ExtId, &SDTBobinaPendiente)
				SetEstadoExtrusion.Call(&ExtId, EstadoExtrusion.EnProceso)
			else
				&isOK = false
				msg('No se ha podido encontrar el sgte turno')
			endif	
		endif
        else
		&isOK = false
		msg('Debe validar las bobinas que se encuentran En Medición')
	endif
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&SDTBobina, out:&isOK);
```

