# Procedure: SDPrensaTroquel

- **Module:** Produccion
- **Description:** SDPrensa Troquel
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| isOK | Variable | Boolean |  | is OK |
| TroquelId | Parameter | NUMERIC | out | Troquel Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| AuxTroquelId | Variable | NUMERIC |  | Troquel Id |
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
		
	&TroquelId = 0
	
	for each DB.PrensaTroquel
		 where PrensaTroquelId > 0
		 where PrensaId = &PrensaId
		 where TroquelId > 0
		 where TroquelEstado = EstadoTroquel.EnPrensa
		 &AuxTroquelId = TroquelId
		 
		 for each DB.Troquel.Producto
			  where TroquelId = &AuxTroquelId
			  where ProductoId = &ProductoId
			  &TroquelId = TroquelId
			  Exit
		 endfor
	         
		 Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensaId, in:&ProductoId, out:&TroquelId);
```

