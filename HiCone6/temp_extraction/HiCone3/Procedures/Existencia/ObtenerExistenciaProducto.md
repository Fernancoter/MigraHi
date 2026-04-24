# Procedure: ObtenerExistenciaProducto

- **Module:** Existencia
- **Description:** Obtener Existencia Producto
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Existencia | Variable | GX_BUSCOMP |  | Existencia |
| Categoria | Parameter | VARCHAR | in | Categoria |
| Count | Variable | NUMERIC |  | Count |
| CountBobina | Variable | GX_BUSCOMP |  | Count Bobina |
| CountPallet | Variable | NUMERIC |  | Count Pallet |
| EPId | Variable | NUMERIC |  | EPId |
| EPItem | Variable | GX_SDT |  | EPItem |
| ExistenciaFecha | Variable | DATETIME |  | Existencia Fecha |
| ExistenciaId | Parameter | NUMERIC | in | Existencia Id |
| MillarSistema | Variable | NUMERIC |  | Millar Sistema |
| PaletMillar | Variable | NUMERIC |  | Palet Millar |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| ProductoNombre | Variable | VARCHAR |  | Producto Nombre |
| SDTExistenciaProducto | Parameter | GX_SDT | out | SDTExistencia Producto |
| TipoProducto | Parameter | VARCHAR | in | Tipo Producto |
| ExistenciaFechaAnterior | Variable | DATETIME |  | Existencia Fecha Anterior |
| ExistenciaTurnoId | Variable | NUMERIC |  | Existencia Turno Id |
| ExistenciaProductoCantidadTurnoSistema | Variable | NUMERIC |  | Existencia Producto Cantidad Turno Sistema |
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

&SDTExistenciaProducto.Clear()
&Existencia.Load(&ExistenciaId)
&ExistenciaFecha = &Existencia.ExistenciaFechaHora
&ExistenciaTurnoId = &Existencia.ExistenciaTurnoId


for each DB.Producto
	where ProductoId > 0
	where ProductoCategoriaNombre = &Categoria
	where ProductoActivo = true
	
	&ProductoId = ProductoId
	&ProductoNombre = ProductoNombre
	
	for each DB.ExistenciaProducto
		where ExistenciaProductoId > 0
		where ProductoId = &ProductoId
		where ExistenciaId = &ExistenciaId
		
		&EPId = ExistenciaProductoId
		
		//SIEMPRES ACTUALIZAR DE BD
		Do Case
		 Case &TipoProducto = TipoProducto.Bobina
		      
			 &ExistenciaProductoCantidadTurnoSistema = ExistenciaBobinasPorTurnoId.Udp(&ExistenciaTurnoId,&ProductoId,&ExistenciaFecha)
		  	
		 Case &TipoProducto = TipoProducto.Pallet
		       
		   	&ExistenciaProductoCantidadTurnoSistema = ExistenciaPalletPorTurnoId.Udp(&ExistenciaTurnoId,&ProductoId,&ExistenciaFecha)
	      
        EndCase
		
		&EPItem = New()
		&EPItem.ExistenciaProductoId = &EPId
		&EPItem.ProductoId = &ProductoId
		&EPItem.ProductoNombre = &ProductoNombre
		&EPItem.ExistenciaId = &ExistenciaId
		&EPItem.ExistenciaProductoCantidad = ExistenciaProductoCantidad
		&EPItem.ExistenciaProductoCantidadSistema = ExistenciaProductoCantidadSistema
		&EPItem.ExistenciaProductoCantidadTurno = ExistenciaProductoCantidadTurno
		&EPItem.ExistenciaProductoCantidadTurnoSistema = &ExistenciaProductoCantidadTurnoSistema
		&EPItem.ExistenciaProductoMillarReal = ExistenciaProductoMillarReal
		&EPItem.ExistenciaProductoMillarSistema = ExistenciaProductoMillarSistema
		&SDTExistenciaProducto.Add(&EPItem)
		Exit
		
	when none
		do 'ObtenerCantidadSistema'
		
		&EPItem = New()
		&EPItem.ExistenciaProductoId = 0
		&EPItem.ProductoId = &ProductoId
		&EPItem.ProductoNombre = &ProductoNombre
		&EPItem.ExistenciaId = &ExistenciaId
		&EPItem.ExistenciaProductoCantidad = 0
		&EPItem.ExistenciaProductoCantidadSistema = &Count
		&EPItem.ExistenciaProductoCantidadTurnoSistema = &ExistenciaProductoCantidadTurnoSistema
		
		&EPItem.ExistenciaProductoMillarReal = 0
		&EPItem.ExistenciaProductoMillarSistema = &MillarSistema
		&SDTExistenciaProducto.Add(&EPItem)
	
        endfor
	
endfor


Sub 'ObtenerCantidadSistema'
	&Count = 0
	&MillarSistema = 0
	&PaletMillar = 0
	
	Do Case
		 Case &TipoProducto = TipoProducto.Bobina
		      
		      for each DB.Bobina
			      where BobinaId > 0
			      where BobinaProductoId = &ProductoId
			      where  BobinaHoraSalida.ToDate() <= &ExistenciaFecha.ToDate()
			      where  BobinaEstado in (EstadoBobina.Reposo,EstadoBobina.Disponible, EstadoBobina.Desmontada )
			      &Count += 1
		      endfor
		  	 
			 &ExistenciaProductoCantidadTurnoSistema = ExistenciaBobinasPorTurnoId.Udp(&ExistenciaTurnoId,&ProductoId,&ExistenciaFecha)
		  	
		      
		 Case &TipoProducto = TipoProducto.Pallet
		     
		      for each DB.Palet
			      where PaletId > 0
			      where PaletProductoId = &ProductoId
			      where PaletEstatus in (EstatusPalet.Terminado)
			      //where PaletHoraFinEnsamble > &ExistenciaFechaAnterior and PaletHoraFinEnsamble <= &ExistenciaFecha when Not &ExistenciaFechaAnterior.IsEmpty()
			      where PaletHoraFinEnsamble <= &ExistenciaFecha 
			      &Count += 1
		      endfor
		  
		   &ExistenciaProductoCantidadTurnoSistema = ExistenciaPalletPorTurnoId.Udp(&ExistenciaTurnoId,&ProductoId,&ExistenciaFecha)
	      
        EndCase
EndSub
```

### Rules (Rules)

```genexus
parm(in:&TipoProducto, in:&Categoria, in:&ExistenciaId, out:&SDTExistenciaProducto);
```

