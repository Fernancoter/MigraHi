# Procedure: SDProductoCarrera

- **Module:** Produccion
- **Description:** SDProducto Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Parameter | NUMERIC | in | Carrera Id |
| ProductoId | Parameter | NUMERIC | out | Producto Id |
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
| PBId | Variable | NUMERIC |  | PBId |
| PrensadoBobina | Variable | GX_BUSCOMP |  | Prensado Bobina |
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
&Carrera.Load(&CarreraId)
&PBId = &Carrera.InicioPrensadoBobinaId
&PrensadoBobina.Load(&PBId)
&ProductoId = &PrensadoBobina.PrensadoProductoId
```

### Rules (Rules)

```genexus
parm(in:&CarreraId, out:&ProductoId);
```

