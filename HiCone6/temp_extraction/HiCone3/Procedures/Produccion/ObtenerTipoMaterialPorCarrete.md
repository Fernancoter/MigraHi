# Procedure: ObtenerTipoMaterialPorCarrete

- **Module:** Produccion
- **Description:** Obtener Tipo Material Por Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| TipoMaterial | Parameter | VARCHAR | out | Tipo Material |
| CarreraId | Parameter | NUMERIC | in | Carrera Id |
| InicioPBPrensadoId | Variable | NUMERIC |  | Inicio PBPrensado Id |
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
For Each
	Where CarreraId = &CarreraId
	&InicioPBPrensadoId = InicioPBPrensadoId
When None
	&InicioPBPrensadoId = 0
EndFor

For Each
	Where PrensadoId = &InicioPBPrensadoId
	&TipoMaterial = PrensadoProductoTipoMaterial
EndFor
```

### Rules (Rules)

```genexus
parm(In:&CarreraId, Out:&TipoMaterial);
```

