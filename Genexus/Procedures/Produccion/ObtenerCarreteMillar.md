# Procedure: ObtenerCarreteMillar

- **Module:** Produccion
- **Description:** Obtener Carrete Millar
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreteMillar | Parameter | NUMERIC | out | Carrete Millar |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| PrensaNombre | Variable | VARCHAR |  | Prensa Nombre |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| ProductoNombre | Variable | VARCHAR |  | Producto Nombre |
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
	//&PrensaId = &Prensado.PrensadoPrensaId
	//&PrensaNombre = &Prensado.PrensadoPrensaNombre
	&ProductoId = &Prensado.PrensadoProductoId
	//&ProductoNombre = &Prensado.PrensadoProductoNombre
	
	&CarreteMillar = 0
	
	
	for each DB.ProductoTerminado
		where ProductoTerminadoId > 0
		where TerminadoProductoId = &ProductoId
	endfor
//	for each
//		where PrensaProductoId > 0
//		where PrensaId = &PrensaId
//		where ComercialProductoId = &ProductoId
//		&CarreteMillar = PrensaProductoCarreteMillar
//		Exit
//	when none
//				
//		msg('Debe configurar los millares para el producto ' + &ProductoNombre.ToString() + 'para la prensa ' + &PrensaNombre.ToString())
//	endfor
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&CarreteMillar);
```

