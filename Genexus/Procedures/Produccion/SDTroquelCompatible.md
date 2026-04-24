# Procedure: SDTroquelCompatible

- **Module:** Produccion
- **Description:** SDTroquel Compatible
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Compatible | Parameter | Boolean | out | Compatible |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| TroquelId | Variable | NUMERIC |  | Troquel Id |
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
	&TroquelId = &Prensado.PrensadoTroquelId
	
	&Compatible = false
		
	for each DB.Troquel.Producto
		where TroquelId = &TroquelId
		where ProductoId = &ProductoId
		&Compatible = true
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&ProductoId, out:&Compatible);
```

