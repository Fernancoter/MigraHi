# DataProvider: EmbarqueDetalleDP

- **Module:** Embarques
- **Description:** Embarque Detalle DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EmbarqueId | Parameter | NUMERIC | inout | Embarque Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
EmbarqueDetalleSDT
{
	EmbarqueDetalleSDTItem
	Where EmbarqueId = &EmbarqueId
	{
		EmbarqueDetalleId = EmbarqueDetalleId
		EmbarqueId = EmbarqueId
		EmbarqueDetalleProducto = EmbarqueDetalleProducto
		EmbarqueDetalleCantidadPallets = EmbarqueDetalleCantidadPallets
		EmbarqueProductoId = EmbarqueProductoId
		EmbarqueProductoNombre = EmbarqueProductoNombre
	}
}
```

### Rules (Rules)

```genexus
parm(&EmbarqueId);
```

