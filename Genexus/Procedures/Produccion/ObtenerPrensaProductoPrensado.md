# Procedure: ObtenerPrensaProductoPrensado

- **Module:** Produccion
- **Description:** Obtener Prensa Producto Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Parameter | NUMERIC | out | Prensa Id |
| ProductoId | Parameter | NUMERIC | out | Producto Id |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
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
&Prensado.Load(&PrensadoId)
&PrensaId = &Prensado.PrensadoPrensaId
&ProductoId = &Prensado.PrensadoProductoId
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId,out:&PrensaId,out:&ProductoId);
```

