# Procedure: SDInventarioItem

- **Module:** Produccion
- **Description:** SD Inventario Item
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Inventario | Variable | GX_BUSCOMP |  | Inventario |
| InventarioFecha | Variable | DATETIME |  | Inventario Fecha |
| InventarioId | Variable | NUMERIC |  | Inventario Id |
| InventarioItem | Parameter | GX_SDT | out | Inventario Item |
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
 
		for each Order (InventarioFechaHora)
			where InventarioId > 0
			//where InventarioProductoId = &ProductoId
			&InventarioId = InventarioId
			Exit
		when none
			&InventarioFecha = Today()
			
			&Inventario = New()
			&Inventario.InventarioProductoId.SetNull()
			&Inventario.InventarioFechaHora = &InventarioFecha
			&Inventario.InventarioInicioConsecutivo =  #20-01-01 00:00#
			&Inventario.Save()
			
			if(&Inventario.Success())
				&InventarioId = &Inventario.InventarioId
				commit
			endif
			
		endfor
	
	    &Inventario.Load(&InventarioId)
		&InventarioItem.FromJson(&Inventario.ToJson())
```

### Rules (Rules)

```genexus
parm(in:&ProductoId,out:&InventarioItem);
```

