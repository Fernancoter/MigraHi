# Procedure: GuardarExistenciaProducto

- **Module:** Existencia
- **Description:** Guardar Existencia Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EPItem | Variable | GX_SDT |  | EPItem |
| ExistenciaProducto | Variable | GX_BUSCOMP |  | Existencia Producto |
| SDTExistenciaProducto | Parameter | GX_SDT | in | SDTExistencia Producto |
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


    for &EPItem in &SDTExistenciaProducto
	   
	    &ExistenciaProducto.Load(&EPItem.ExistenciaProductoId) 
	    &ExistenciaProducto.ProductoId = &EPItem.ProductoId
	    &ExistenciaProducto.ExistenciaId = &EPItem.ExistenciaId
	    &ExistenciaProducto.ExistenciaProductoCantidad = &EPItem.ExistenciaProductoCantidad
	    &ExistenciaProducto.ExistenciaProductoCantidadSistema = &EPItem.ExistenciaProductoCantidadSistema
	    &ExistenciaProducto.ExistenciaProductoMillarReal = &EPItem.ExistenciaProductoMillarReal
	    &ExistenciaProducto.ExistenciaProductoMillarSistema = &EPItem.ExistenciaProductoMillarSistema
	    
	    &ExistenciaProducto.ExistenciaProductoCantidadTurno = &EPItem.ExistenciaProductoCantidadTurno
	    &ExistenciaProducto.ExistenciaProductoCantidadTurnoSistema = &EPItem.ExistenciaProductoCantidadTurnoSistema
	    
	    &ExistenciaProducto.Save()
	  
	    if(&ExistenciaProducto.Success())
		    commit
	    endif
    endfor
```

### Rules (Rules)

```genexus
parm(in:&SDTExistenciaProducto);
```

