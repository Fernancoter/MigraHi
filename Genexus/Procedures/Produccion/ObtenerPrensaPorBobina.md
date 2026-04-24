# Procedure: ObtenerPrensaPorBobina

- **Module:** Produccion
- **Description:** Obtener Prensa Por Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| PrensadoPrensaNombre | Parameter | VARCHAR | out | Prensa Nombre |
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
	Where PrensadoBobinaId>0
	Where BobinaId = &BobinaId
	&PrensadoPrensaNombre = PrensadoPrensaNombre
When None
	&PrensadoPrensaNombre.SetEmpty()
EndFor
```

### Rules (Rules)

```genexus
parm(In:&BobinaId, Out:&PrensadoPrensaNombre);
```

