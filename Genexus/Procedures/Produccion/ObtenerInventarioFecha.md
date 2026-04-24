# Procedure: ObtenerInventarioFecha

- **Module:** Produccion
- **Description:** Obtener Inventario Fecha
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Inventario | Variable | GX_BUSCOMP |  | Inventario |
| InventarioFecha | Parameter | DATETIME | out | Inventario Fecha |
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
			&InventarioFecha = InventarioFechaHora
			Exit
		when none
			//&InventarioFecha = #23-01-01 00:00#
			
			&Inventario = New()
			&Inventario.InventarioProductoId.SetNull()
			&Inventario.InventarioFechaHora = Today()
			//&Inventario.InventarioInicioConsecutivo = Today()
			&Inventario.Save()
			
			if(&Inventario.Success())
				commit
			endif
			
		endfor
```

### Rules (Rules)

```genexus
parm(in:&ProductoId,out:&InventarioFecha);
```

