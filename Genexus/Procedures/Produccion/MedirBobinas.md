# Procedure: MedirBobinas

- **Module:** Produccion
- **Description:** Medir Bobinas
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
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
	for each DB.Bobina
		where BobinaId > 0
		where ExtrusionId = &ExtrusionId
		where BobinaEstado = EstadoBobina.EnProceso
		&BobinaId = BobinaId
		
		&Bobina.Load(&BobinaId)
		&Bobina.BobinaEstado = EstadoBobina.EnMedicion
		&Bobina.BobinaIniciaReposo = Now()
		&Bobina.BobinaHoraSalida = Now()
		&Bobina.Save()
		
		if(&Bobina.Success())
			commit
			
			//SDPAddNotification(&BobinaId, 1)
			SDPAddNotification(&BobinaId, NotificacionTipo.Bobina)
		endif
	endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId);
```

