# Procedure: SetEstadoCarrete

- **Module:** Produccion
- **Description:** Set Estado Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| CarreteEstado | Parameter | VARCHAR | in | Carrete Estado |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| CarreteEnMolino | Parameter | Boolean | in | Carrete En Molino |
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
         
	 &Carrete.Load(&CarreteId)
	 &Carrete.CarreteEstado = &CarreteEstado
	 &Carrete.CarreteEnMolino = &CarreteEnMolino
	 &Carrete.Save()
	 
	 if(&Carrete.Success())
		 commit
         endif
```

### Rules (Rules)

```genexus
parm(in:&CarreteId, in:&CarreteEstado, in:&CarreteEnMolino);
```

