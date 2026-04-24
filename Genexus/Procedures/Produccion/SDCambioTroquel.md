# Procedure: SDCambioTroquel

- **Module:** Produccion
- **Description:** SDCambio Troquel
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
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
    
    &Prensado.Load(&PrensadoId)
    &Prensado.PrensadoTroquelId = &TroquelId
    &Prensado.Save()
    
    if(&Prensado.Success())
	    commit
    endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&TroquelId);
```

