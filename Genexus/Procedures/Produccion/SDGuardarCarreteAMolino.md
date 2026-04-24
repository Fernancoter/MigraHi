# Procedure: SDGuardarCarreteAMolino

- **Module:** Produccion
- **Description:** SDGuardar Carrete AMolino
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| Carrete | Parameter | GX_BUSCOMP | in | Carrete |
| GuardarCarrete | Variable | GX_BUSCOMP |  | Guardar Carrete |
| AplicarATodo | Parameter | Boolean | in | Aplicar ATodo |
| AplicarATodoCarreraId | Variable | NUMERIC |  | Carrera Id |
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
&AplicarATodoCarreraId = &Carrete.CarreteCarreraId


For each 
	WHERE CarreteCarreraId = &AplicarATodoCarreraId
	WHERE CarreteId  =&CarreteId when &AplicarATodo = False
	Where CarreteEstado = EstadoCarrete.EnRevision
	&CarreteId = CarreteId
	&GuardarCarrete.Load(&CarreteId)
	
	if(&Carrete.CarreteId > 0)
		&GuardarCarrete.CarreteObservacion = &Carrete.CarreteObservacion
        &GuardarCarrete.CarreteMolino = &Carrete.CarreteMolino
        &GuardarCarrete.CarreteMermaMolino = &Carrete.CarreteMermaMolino
		&GuardarCarrete.CarreteMermaKg = &Carrete.WWPBaseObjects.CarreteMermaKg
	else
		&GuardarCarrete.CarreteObservacion.SetEmpty()
        &GuardarCarrete.CarreteMolino = MolinoCarrete.NoAplica
        &GuardarCarrete.CarreteMermaMolino = false
		&GuardarCarrete.CarreteMermaKg.SetEmpty()
	endif
	&GuardarCarrete.WWPBaseObjects.CarreteEstado = EstadoCarrete.Molino
	&GuardarCarrete.Save()
	
	if(&GuardarCarrete.Success())
		commit
		
	endif
endfor

Produccion.ValidarCarreraCompleta.Call(&AplicarATodoCarreraId)
```

### Rules (Rules)

```genexus
parm(in:&CarreteId, in:&Carrete, in:&AplicarATodo);
```

