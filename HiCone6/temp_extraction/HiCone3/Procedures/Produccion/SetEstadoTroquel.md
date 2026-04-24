# Procedure: SetEstadoTroquel

- **Module:** Produccion
- **Description:** Set Estado Troquel
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Troquel | Variable | GX_BUSCOMP |  | Troquel |
| TroquelEstado | Parameter | VARCHAR | in | Troquel Estado |
| TroquelId | Parameter | NUMERIC | in | Troquel Id |
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
         
	 &Troquel.Load(&TroquelId)
	 &Troquel.TroquelEstado = &TroquelEstado
	 &Troquel.Save()
	 
	 if(&Troquel.Success())
		 commit
         endif
```

### Rules (Rules)

```genexus
parm(in:&TroquelId, in:&TroquelEstado);
```

