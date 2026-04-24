# Procedure: GenerarBobinaNo

- **Module:** Produccion
- **Description:** Generar Bobina No
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaNo | Parameter | NUMERIC | out | Bobina No |
| ExtId | Variable | NUMERIC |  | Ext Id |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| Inventario | Variable | GX_BUSCOMP |  | Inventario |
| InventarioFecha | Variable | DATETIME |  | Inventario Fecha |
| InventarioItem | Variable | GX_SDT |  | Inventario Item |
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

	&BobinaNo = 0
	&InventarioItem = SDInventarioItem.Udp(&ProductoId)
	
	for each DB.Bobina
		where BobinaId > 0
		where BobinaProductoId = &ProductoId
		where ExtrusionId > 0
		where ExtrusionExtrusoraId = &ExtrusoraId
		where BobinaHoraInicio > &InventarioItem.InventarioFechaHora
		where BobinaOrigen = OrigenBobina.A
		&BobinaNo += 1	
	endfor	



//      &InventarioItem = SDInventarioItem.Udp(&ProductoId)
//	for each DB.Extrusion
//		where ExtrusionId > 0
//		where ExtrusionExtrusoraId = &ExtrusoraId
//		where ExtrusionProductoId = &ProductoId 
//		where ExtrusionFecha >= &InventarioItem.InventarioFechaHora
//
//		
//		&ExtId = ExtrusionId
		
//		for each DB.Bobina
//			where BobinaId > 0
//			where BobinaProductoId = &ProductoId
//			where ExtrusionId = &ExtId
//			where ExtrusionId > 0
//			where BobinaOrigen = OrigenBobina.A
//			&BobinaNo += 1	
//		endfor	
//	endfor
```

### Rules (Rules)

```genexus
parm(in:&ExtrusoraId, in:&ProductoId, out:&BobinaNo);
```

