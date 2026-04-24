# Procedure: ReposoTranscurrido

- **Module:** Produccion
- **Description:** Reposo Transcurrido
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoId | Variable | NUMERIC |  | Producto Id |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| TiempoReposo | Variable | NUMERIC |  | Tiempo Reposo |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| AuxExtrusionId | Variable | NUMERIC |  | Extrusion Id |
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

&ExtrusionId = 0
&TiempoReposo = 0

for each DB.Bobina
	Order ExtrusionId
	where BobinaId > 0
	where ExtrusionId > 0
	where BobinaEstado in (EstadoBobina.Reposo)
	&BobinaId = BobinaId
	&AuxExtrusionId = ExtrusionId
	
	if(&ExtrusionId <> &AuxExtrusionId)
		&ExtrusionId = &AuxExtrusionId
		&TiempoReposo = ObtenerTiempoReposo.Udp(&ExtrusionId)
	endif
	
	if(&TiempoReposo > 0)
		BobinaTiempoReposo.Call(&BobinaId, &TiempoReposo)
	endif
endfor


//for each DB.Extrusion
//	where ExtrusionId > 0	
//	&ExtrusionId = ExtrusionId
//	&TiempoReposo = ObtenerTiempoReposo.Udp(&ExtrusionId)
//	
//	if(&TiempoReposo > 0)
//		for each DB.Bobina
//			where BobinaId > 0
//			where ExtrusionId = &ExtrusionId
//			where BobinaEstado in (EstadoBobina.Reposo, EstadoBobina.Disponible)
//			
//			&BobinaId = BobinaId
//			BobinaTiempoReposo.Call(&BobinaId, &TiempoReposo)
//	        endfor
//	endif
//endfor
```

