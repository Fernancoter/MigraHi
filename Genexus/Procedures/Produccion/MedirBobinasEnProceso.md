# Procedure: MedirBobinasEnProceso

- **Module:** Produccion
- **Description:** Medir Bobinas En Proceso
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTBobina | Parameter | GX_SDT | in | SDTBobina |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
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
	
	//Cambiar estado de las bobinas En Proceso -: En Medición
	For &SDTBobinaItem in &SDTBobina
		
	      if(&SDTBobinaItem.BobinaEstado = EstadoBobina.EnProceso)
		      &SDTBobinaItem.BobinaEstado = EstadoBobina.EnMedicion
		      &SDTBobinaItem.BobinaHoraSalida = Now()
		      GuardarBobina.Call(&SDTBobinaItem)
	      endif
      
	Endfor
```

### Rules (Rules)

```genexus
parm(in:&SDTBobina);
```

