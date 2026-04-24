# Procedure: SDExtrusionInterrupcion

- **Module:** Produccion
- **Description:** SDExtrusion Interrupcion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionInterrupcion | Variable | GX_BUSCOMP |  | Extrusion Interrupcion |
| Id | Parameter | NUMERIC | in | Id |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
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
	
	&ExtrusionInterrupcion = New()
	&ExtrusionInterrupcion.InterrupcionId = &Id
	&ExtrusionInterrupcion.ExtrusionId = &ExtrusionId
	&ExtrusionInterrupcion.Save()
	
	if(&ExtrusionInterrupcion.Success())
		commit
	else
		msg(&ExtrusionInterrupcion.GetMessages().ToJson())
	endif
```

### Rules (Rules)

```genexus
parm(in:&Id, in:&ExtrusionId);
```

