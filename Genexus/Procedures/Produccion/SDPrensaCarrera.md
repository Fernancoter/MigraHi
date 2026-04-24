# Procedure: SDPrensaCarrera

- **Module:** Produccion
- **Description:** SDPrensa Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaAuxId | Variable | NUMERIC |  | Bobina Aux Id |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
| CarreraEstado | Variable | VARCHAR |  | Carrera Estado |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| CarreraPrensado | Variable | GX_BUSCOMP |  | Carrera Prensado |
| CarreraPrensadoId | Variable | NUMERIC |  | Prensado Id |
| CarreraProductoId | Variable | NUMERIC |  | Producto Id |
| DeletePrensaCarrera | Variable | GX_BUSCOMP |  | Delete Prensa Carrera |
| PBId | Variable | NUMERIC |  | PBId |
| PCId | Variable | NUMERIC |  | PCId |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensadoProductoId | Variable | NUMERIC |  | Prensado Producto Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
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
	&PrensadoProductoId = &Prensado.PrensadoProductoId
	&PrensaId = &Prensado.PrensadoPrensaId
	&BobinaId = 0
	&BobinaAuxId = 0
	
	
	for each DB.PrensaCarrera
		where PrensaCarreraId > 0
		where PrensaId = &PrensaId
		where CarreraId > 0
		&PCId = PrensaCarreraId
		&CarreraId = CarreraId
		&CarreraEstado = CarreraEstado
		&CarreraPrensadoId = InicioPBPrensadoId
		&BobinaId = InicioPrensadoBobinaBoninaId
		
		if(&BobinaAuxId <> &BobinaId)
			&BobinaAuxId = &BobinaId
			&PBId = CrearPrensadoBobina.Udp(&PrensadoId, &BobinaAuxId)
		endif
		
		Do Case
			Case &CarreraEstado = EstadoCarrera.EnProceso
			     do 'TransferirCarrera'
			     do 'EliminarRegistro'
				
			Case &CarreraEstado = EstadoCarrera.Terminada
			     do 'TransferirCarrera'
			     do 'EliminarRegistro'
		EndCase
	Endfor

        do 'RecalibrarProducto'

        Sub 'TransferirCarrera'
		&Carrera.Load(&CarreraId)
		&Carrera.InicioPrensadoBobinaId = &PBId
		&Carrera.Save()
		
		if(&Carrera.Success())
			commit
		endif
	EndSub

        Sub 'EliminarRegistro'
		&DeletePrensaCarrera.Load(&PCId)
		&DeletePrensaCarrera.Delete()
		commit
	EndSub

        Sub 'RecalibrarProducto'
	     
	     if(&CarreraPrensadoId > 0)
		   &CarreraPrensado.Load(&CarreraPrensadoId)
		   &CarreraProductoId = &CarreraPrensado.PrensadoProductoId
		
		   if(&CarreraProductoId <> &PrensadoProductoId)
			&Prensado.PrensadoProductoId = &CarreraProductoId
			&Prensado.Save()
			commit
		   endif
		
	     endif
   
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId);
```

