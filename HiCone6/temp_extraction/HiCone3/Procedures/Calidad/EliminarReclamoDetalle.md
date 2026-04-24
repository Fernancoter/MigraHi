# Procedure: EliminarReclamoDetalle

- **Module:** Calidad
- **Description:** Eliminar Reclamo Detalle
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ReclamoDetalle | Variable | GX_BUSCOMP |  | Reclamo Detalle |
| ReclamoId | Parameter | NUMERIC | in | Reclamo Id |
| Reclamo | Variable | GX_BUSCOMP |  | Reclamo |
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
        
	&ReclamoDetalle.Load(&ReclamoId)
	&ReclamoDetalle.Delete()
	commit
	
	&Reclamo.Load(&ReclamoId)
	&Reclamo.Check()
	&Reclamo.Save()
	commit
```

### Rules (Rules)

```genexus
parm(in:&ReclamoId);
```

