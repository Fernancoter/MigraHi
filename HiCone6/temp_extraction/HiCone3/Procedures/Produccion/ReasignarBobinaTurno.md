# Procedure: ReasignarBobinaTurno

- **Module:** Produccion
- **Description:** Reasignar Bobina Turno
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionFecha | Variable | DATETIME |  | Fecha |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| NextExtId | Parameter | NUMERIC | in | Next Ext Id |
| SDTBobinaItem | Variable | GX_SDT |  | SDTBobina Item |
| SDTBobinaPendiente | Parameter | GX_SDT | in | SDTBobina Pendiente |
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
        
        //Reasignar Bobinas sgte turno
	for &SDTBobinaItem in &SDTBobinaPendiente
		&Bobina.Load(&SDTBobinaItem.BobinaId)
		&Bobina.ExtrusionId = &NextExtId
		&Bobina.Save()
		commit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&NextExtId, in:&SDTBobinaPendiente);
```

