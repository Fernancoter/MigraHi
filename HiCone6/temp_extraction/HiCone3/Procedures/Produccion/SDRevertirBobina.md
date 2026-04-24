# Procedure: SDRevertirBobina

- **Module:** Produccion
- **Description:** SDRevertir Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaEstado | Parameter | VARCHAR | in | Bobina Estado |
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
  
  &Bobina.Load(&BobinaId)
  &Bobina.BobinaEspesor = 0
  &Bobina.BobinaEstado = EstadoBobina.EnMedicion
  
  Do Case
	  Case &BobinaEstado = EstadoBobina.Molino
	       &Bobina.BobinaMermaKg = 0 
	       &Bobina.BobinaMotivoMolino = MotivoMolino.NoAplica
	       &Bobina.BobinaObservaciones.SetEmpty()
	      
	  Otherwise
	       &Bobina.BobinaKg = 0       
  EndCase
  
  &Bobina.Save()
  
  if(&Bobina.Success())
	  commit
  endif
```

### Rules (Rules)

```genexus
parm(in:&BobinaId, in:&BobinaEstado);
```

