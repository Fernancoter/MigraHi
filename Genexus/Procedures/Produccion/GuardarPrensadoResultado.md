# Procedure: GuardarPrensadoResultado

- **Module:** Produccion
- **Description:** Guardar Prensado Resultado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoResultado | Variable | GX_BUSCOMP |  | Prensado Resultado |
| isOK | Parameter | Boolean | out | is OK |
| SDTPrensadoResultado | Parameter | GX_SDT | in | SDTPrensado Resultado |
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
	
	&isOK = false
	
	&PrensadoResultado.Load(&SDTPrensadoResultado.PrensadoResultadoId)
	&PrensadoResultado.FromJson(&SDTPrensadoResultado.ToJson())
	&PrensadoResultado.Save()
	
	if(&PrensadoResultado.Success())
		commit
		&isOK = true
		
		msg('Operación de guardado exitosa')
	else
		msg('PrensadoResultado: ' + &PrensadoResultado.GetMessages().ToJson())
	endif
```

### Rules (Rules)

```genexus
parm(in:&SDTPrensadoResultado, out:&isOK);
```

