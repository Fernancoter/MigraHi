# Procedure: SDPausarBobinas

- **Module:** Produccion
- **Description:** SDPausar Bobinas
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| ExtrusoraBobina | Variable | GX_BUSCOMP |  | Extrusora Bobina |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
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
	&ExtrusoraId = &Extrusion.ExtrusionExtrusoraId
	
	for each DB.Bobina
		where BobinaId > 0
		where ExtrusionId = &ExtrusionId
		where BobinaEstado = EstadoBobina.EnProceso
		&BobinaId = BobinaId
	        
		SetEstadoBobina.Call(&BobinaId, EstadoBobina.Pausada)
		
		do 'ExtrusoraBobina'
	Endfor

        Sub 'ExtrusoraBobina'
		
		&ExtrusoraBobina = New()
		&ExtrusoraBobina.BobinaId = &BobinaId
		&ExtrusoraBobina.ExtrusoraId = &ExtrusoraId
		&ExtrusoraBobina.Save()
		
		if(&ExtrusoraBobina.Success())
			commit
		endif
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId);
```

