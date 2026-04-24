# Procedure: SDPrensadoMermaKg

- **Module:** Produccion
- **Description:** SDPrensado Merma Kg
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
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
	&Prensado.PrensadoBobinaMermaKg += 5.9
	&Prensado.Save()
	
	if(&Prensado.Success())
		commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId);
```

