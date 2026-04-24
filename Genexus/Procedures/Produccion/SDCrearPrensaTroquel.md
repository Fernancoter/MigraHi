# Procedure: SDCrearPrensaTroquel

- **Module:** Produccion
- **Description:** SDCrear Prensa Troquel
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensaTroquel | Variable | GX_BUSCOMP |  | Prensa Troquel |
| TroquelId | Parameter | NUMERIC | in | Troquel Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| isOK | Parameter | Boolean | out | is OK |
| Troquel | Variable | GX_BUSCOMP |  | Troquel |
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
	
        SDTroquelMantenimiento.Call(&PrensaId)
	
	&isOK = false
	&PrensaTroquel = New()
        &PrensaTroquel.PrensaId = &PrensaId
        &PrensaTroquel.TroquelId = &TroquelId
        &PrensaTroquel.Save()

	if(&PrensaTroquel.Success())
		&isOK = true
		commit
	endif
	
        if(&isOK)
		SetEstadoTroquel.Call(&TroquelId, EstadoTroquel.EnPrensa)
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensaId, in:&TroquelId, out:&isOK);
```

