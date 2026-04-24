# Procedure: ValidarMedicion

- **Module:** Produccion
- **Description:** Validar Medicion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EnMedicion | Variable | NUMERIC |  | En Medicion |
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
	
	For &SDTBobinaItem in &SDTBobina	
		if(&SDTBobinaItem.BobinaEstado = EstadoBobina.EnMedicion)
			&SDTBobinaItem.BobinaEstado = EstadoBobina.Molino
			
			if(&SDTBobinaItem.BobinaMotivoMolino = MotivoMolino.NoAplica)
				&SDTBobinaItem.BobinaEstado = EstadoBobina.Reposo
				//&SDTBobinaItem.BobinaIniciaReposo = Now()
			endif
			
		        GuardarBobina.Call(&SDTBobinaItem)
		endif	
	Endfor
```

### Rules (Rules)

```genexus
parm(in:&SDTBobina);
```

