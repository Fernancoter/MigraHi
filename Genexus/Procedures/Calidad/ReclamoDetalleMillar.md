# Procedure: ReclamoDetalleMillar

- **Module:** Calidad
- **Description:** Reclamo Detalle Millar
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteMillar | Parameter | NUMERIC | out | Carrete Millar |
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
        &CarreteMillar = 0
	for each DB.ProductoTerminado
		where ProductoTerminadoId > 0
		where TerminadoProductoId = &ProductoId
		&CarreteMillar = ProductoTerminadoCarreteMillar
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&ProductoId, out:&CarreteMillar);
```

