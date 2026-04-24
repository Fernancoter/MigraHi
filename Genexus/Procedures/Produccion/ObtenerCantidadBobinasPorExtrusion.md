# Procedure: ObtenerCantidadBobinasPorExtrusion

- **Module:** Produccion
- **Description:** Obtener Cantidad Bobinas Por Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionBobinas | Parameter | NUMERIC | out | Extrusion Bobinas |
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
&ExtrusionBobinas = count(BobinaId, ExtrusionId = &ExtrusionId)
```

### Rules (Rules)

```genexus
parm(In:&ExtrusionId, Out:&ExtrusionBobinas);
```

