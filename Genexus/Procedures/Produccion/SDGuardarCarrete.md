# Procedure: SDGuardarCarrete

- **Module:** Produccion
- **Description:** SDGuardar Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| Carrete | Parameter | GX_BUSCOMP | in | Carrete |
| GuardarCarrete | Variable | GX_BUSCOMP |  | Guardar Carrete |
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
        
	&GuardarCarrete.Load(&CarreteId)
	
	if(&Carrete.CarreteId > 0)
		&GuardarCarrete.CarreteObservacion = &Carrete.CarreteObservacion
	        &GuardarCarrete.CarreteMolino = &Carrete.CarreteMolino
	        &GuardarCarrete.CarreteMermaMolino = &Carrete.CarreteMermaMolino
		&GuardarCarrete.CarreteMermaKg = &Carrete.CarreteMermaKg
	else
		&GuardarCarrete.CarreteObservacion.SetEmpty()
	        &GuardarCarrete.CarreteMolino = Produccion.MolinoCarrete.NoAplica
	        &GuardarCarrete.CarreteMermaMolino = false
		&GuardarCarrete.CarreteMermaKg.SetEmpty()
	endif
	
	&GuardarCarrete.Save()
	
	if(&GuardarCarrete.Success())
		commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&CarreteId, in:&Carrete);
```

