# Procedure: SetEstadoBobina

- **Module:** Produccion
- **Description:** Set Estado Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaEstado | Parameter | VARCHAR | in | Bobina Estado |
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
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
	 &Bobina.BobinaEstado = &BobinaEstado
	 &Bobina.Save()
	 
	 if(&Bobina.Success())
		 commit
         endif
```

### Rules (Rules)

```genexus
parm(in:&BobinaId, in:&BobinaEstado);
```

