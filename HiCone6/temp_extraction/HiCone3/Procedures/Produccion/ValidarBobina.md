# Procedure: ValidarBobina

- **Module:** Produccion
- **Description:** Validar Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| BobinaItem | Variable | GX_SDT |  | Bobina Item |
| SDTBobinaItem | Parameter | GX_SDT | in | SDTBobina Item |
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

	&BobinaItem.FromJson(&SDTBobinaItem.ToJson())
	&BobinaItem.BobinaEstado = EstadoBobina.Molino
			
	if(&BobinaItem.BobinaMotivoMolino = MotivoMolino.NoAplica)
		&BobinaItem.BobinaEstado = EstadoBobina.Reposo
	endif
	
        GuardarBobina.Call(&BobinaItem)
        Produccion.SDEliminarNotificacion.Call(&SDTBobinaItem.BobinaId, NotificacionTipo.Bobina)
```

### Rules (Rules)

```genexus
parm(in:&SDTBobinaItem);
```

