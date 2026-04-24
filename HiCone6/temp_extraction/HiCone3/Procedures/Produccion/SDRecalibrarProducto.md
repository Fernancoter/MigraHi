# Procedure: SDRecalibrarProducto

- **Module:** Produccion
- **Description:** SDRecalibrar Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| Fecha | Variable | DATE |  | Fecha |
| InitExtrusion | Parameter | Boolean | in | Init Extrusion |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
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
	&Fecha = Today()
	
	if(&InitExtrusion)
		for each DB.Extrusion
			where ExtrusionId > 0
		        where ExtrusionExtrusoraId = &ExtrusoraId
		        where ExtrusionTurnoId = &TurnoId
		        where ExtrusionFecha.ToDate() = &Fecha
		        where ExtrusionEstado = EstadoExtrusion.Programada
			&ExtrusionId = ExtrusionId
			
			SDRecalibrarExtrusion.Call(&ExtrusionId,&ProductoId)
		endfor
        else
		
		for each DB.Prensado
		        where PrensadoId > 0
			where PrensadoPrensaId = &PrensaId
			where PrensadoTurnoId = &TurnoId
			where PrensadoFecha.ToDate() = &Fecha
			where DB.PrensadoEstado = EstadoPrensado.Programado
			&PrensadoId = PrensadoId
			
			&Prensado.Load(&PrensadoId)
			&Prensado.PrensadoProductoId = &ProductoId
			&Prensado.Save()
			commit
		endfor
        endif
```

### Rules (Rules)

```genexus
parm(in:&TurnoId, in:&ExtrusoraId, in:&PrensaId, in:&ProductoId, in:&InitExtrusion);
```

