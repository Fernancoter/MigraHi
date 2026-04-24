# Procedure: LimpiarPalletError

- **Module:** Produccion
- **Description:** Limpiar Pallet Error
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EmbarqueDetalleId | Parameter | NUMERIC | in | Embarque Detalle Id |
| EmbarqueId | Variable | NUMERIC |  | Embarque Id |
| DeleteEmbarquePallet | Variable | GX_BUSCOMP |  | Delete Embarque Pallet |
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
for each DB.EmbarquePallet
	where EmbarqueDetalleId = &EmbarqueDetalleId 
	where Not EmbarquePalletNoPallet.IsEmpty()
	where EmbarqueId > 0
	where EmbarquePalletValido = false
	
	&DeleteEmbarquePallet.Load(&EmbarqueDetalleId, EmbarquePalletNoPallet)
	&DeleteEmbarquePallet.Delete()
	commit
endfor
```

### Rules (Rules)

```genexus
parm(in:&EmbarqueDetalleId);
```

