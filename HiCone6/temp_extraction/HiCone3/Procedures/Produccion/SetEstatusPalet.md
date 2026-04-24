# Procedure: SetEstatusPalet

- **Module:** Produccion
- **Description:** Set Estatus Palet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| EstatusPalet | Parameter | VARCHAR | in | Estatus Palet |
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
        
	&Palet.Load(&PaletId)
	&Palet.PaletEstatus = &EstatusPalet
	&Palet.Save()
	
	if(&Palet.Success())
		commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&PaletId, in:&EstatusPalet);
```

