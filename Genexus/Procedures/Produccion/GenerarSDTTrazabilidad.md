# Procedure: GenerarSDTTrazabilidad

- **Module:** Produccion
- **Description:** Generar SDTTrazabilidad
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTTrazabilidad | Parameter | GX_SDT | out | SDTTrazabilidad |
| SDTTrazabilidadItem | Variable | GX_SDT |  | SDTTrazabilidad Item |
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
&SDTTrazabilidad = DPSDTTrazabilidad.Udp()
For &SDTTrazabilidadItem In &SDTTrazabilidad
	
	For each
		Where CarreteId = &SDTTrazabilidadItem.CarreteId
		&SDTTrazabilidadItem.PaletNoSerie = PaletNoSerie
		&SDTTrazabilidadItem.PaletNo = PaletNo
		&SDTTrazabilidadItem.PaletHoraInicioEnsamble = PaletHoraInicioEnsamble
		&SDTTrazabilidadItem.PaletHoraFinEnsamble = PaletHoraFinEnsamble
		&SDTTrazabilidadItem.PaletEstatus = PaletEstatus
	EndFor

	
EndFor
```

### Rules (Rules)

```genexus
parm(Out:&SDTTrazabilidad);
```

