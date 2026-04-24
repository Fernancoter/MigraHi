# Procedure: GuardarExtrusionResultado

- **Module:** Produccion
- **Description:** Guardar Extrusion Resultado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtResultado | Variable | GX_BUSCOMP |  | Ext Resultado |
| ExtrusionResultado | Variable | GX_BUSCOMP |  | Extrusion Resultado |
| isOK | Parameter | Boolean | out | is OK |
| ExtResultadoId | Variable | NUMERIC |  | Ext Resultado Id |
| SDTExtrusionResultado | Parameter | GX_SDT | in | SDTExtrusion Resultado |
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
	
	&ExtrusionResultado.Load(&SDTExtrusionResultado.ExtrusionResultadoId)
	&ExtrusionResultado.FromJson(&SDTExtrusionResultado.ToJson())
	&ExtrusionResultado.Save()
	
	if(&ExtrusionResultado.Success())
		commit
		&isOK = true
		
		msg('Operación de guardado exitosa')
	endif
```

### Rules (Rules)

```genexus
parm(in:&SDTExtrusionResultado, out:&isOK);
```

