# Procedure: ReposoTranscurridoBobina

- **Module:** Produccion
- **Description:** Reposo Transcurrido Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoId | Variable | NUMERIC |  | Producto Id |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| TiempoReposo | Variable | NUMERIC |  | Tiempo Reposo |
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
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

	&Bobina.Load(&BobinaId)
	&ExtrusionId = &Bobina.ExtrusionId
	&TiempoReposo = ObtenerTiempoReposo.Udp(&ExtrusionId)
		
	if(&TiempoReposo > 0 and &Bobina.DB.BobinaEstado in (EstadoBobina.Reposo, EstadoBobina.Disponible))
	       BobinaTiempoReposo.Call(&BobinaId, &TiempoReposo)
	endif
```

### Rules (Rules)

```genexus
parm(in:&BobinaId);
```

