# Procedure: SDTroquelMantenimiento

- **Module:** Produccion
- **Description:** SDTroquel Mantenimiento
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| TroquelId | Variable | NUMERIC |  | Troquel Id |
| PTId | Variable | NUMERIC |  | PTId |
| EliminarPrensaTroquel | Variable | GX_BUSCOMP |  | Eliminar Prensa Troquel |
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

        &PTId = 0
	for each DB.PrensaTroquel
		where PrensaTroquelId > 0
		where TroquelId > 0
		where PrensaId = &PrensaId
		&PTId = PrensaTroquelId
		&TroquelId = TroquelId
		Exit
	endfor

        if(&PTId > 0)
		
	        //Eliminar referencia del troquel desmontado
		&EliminarPrensaTroquel.Load(&PTId)
		&EliminarPrensaTroquel.Delete()
		commit
		
		//Habilitar el troquel desmontado a estado de registrado
		SetEstadoTroquel.Call(&TroquelId,EstadoTroquel.Registrado)
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensaId);
```

