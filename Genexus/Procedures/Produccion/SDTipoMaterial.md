# Procedure: SDTipoMaterial

- **Module:** Produccion
- **Description:** SDTipo Material
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ProductoId | Parameter | NUMERIC | in | Producto Id |
| TipoMaterial | Parameter | VARCHAR | out | Tipo Material |
| Producto | Variable | GX_BUSCOMP |  | Producto |
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
&Producto.Load(&ProductoId)
&TipoMaterial = &Producto.ProductoTipoMaterial
```

### Rules (Rules)

```genexus
parm(in:&ProductoId, out:&TipoMaterial);
```

