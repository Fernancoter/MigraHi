# Procedure: ObtenerPalet

- **Module:** Produccion
- **Description:** Obtener Palet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Encontrado | Variable | Boolean |  | Encontrado |
| OperadorId | Variable | NUMERIC |  | Operador Id |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletId | Parameter | NUMERIC | out | Palet Id |
| PaletNo | Variable | NUMERIC |  | Palet No |
| PFecha | Variable | DATE |  | PFecha |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoFecha | Variable | DATETIME |  | Prensado Fecha |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| TurnoId | Variable | NUMERIC |  | Turno Id |
| PaletCapacidad | Variable | NUMERIC |  | Palet Capacidad |
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
	&ProductoId = &Prensado.PrensadoProductoId
	&PrensaId = &Prensado.PrensadoPrensaId
	&TurnoId = &Prensado.PrensadoTurnoId
	&PrensadoFecha = &Prensado.PrensadoFecha
	&OperadorId = &Prensado.PrensadoOperadorId
	
	for each DB.Palet
		where PaletId > 0
		where PaletPrensadoId = &PrensadoId
		where PaletTipo = TipoPalet.Interno
		where PaletEstatus = EstatusPalet.EnEnsamble
		&PaletId = PaletId
		&Encontrado = true
		Exit
	when none
		&Encontrado = false
	endfor

        if(Not &Encontrado)
	        
		for each DB.Palet
			where PaletId > 0
			where PaletPrensaId = &PrensaId
			where PaletProductoId = &ProductoId
			where PaletEstatus = EstatusPalet.EnEnsamble
			&PaletId = PaletId
			Exit
		when none
			
	            &PaletNo = GenerarPaletNo.Udp(&PrensaId,&ProductoId)
			&PFecha = &PrensadoFecha.ToDate()
			&PaletNo += 1
			
			&Palet = New()
			&Palet.PaletNo = &PaletNo
			&Palet.PaletEstatus = EstatusPalet.EnEnsamble
			&Palet.PaletHoraInicioEnsamble = Now()
			&Palet.PaletHoraFinEnsamble = Now()
			&Palet.PaletNoSerie = PaletNoSerie.Udp(&PrensaId, &TurnoId, &PFecha, &PaletNo)
			&Palet.PaletOperadorId = &OperadorId
			&Palet.PaletPrensaId = &PrensaId
			&Palet.PaletTipo = TipoPalet.Interno
			&Palet.PaletProductoId = &ProductoId
			&Palet.PaletPrensadoId = &PrensadoId
			&Palet.PaletPrensadoFinId = &PrensadoId
			
			DO 'ObtenerCapacidad'
			
			&Palet.PaletCapacidad = &PaletCapacidad
			&Palet.PaletNoCarretes = 0
			&Palet.Save()
			
			if(&Palet.Success())
				&PaletId = &Palet.PaletId
				commit
			endif
			
		endfor
	        
	endif
        		
	sub 'ObtenerCapacidad'
		&PaletCapacidad = 32
		For each DB.ProductoTerminado
			Where TerminadoProductoId = 	&ProductoId
			&PaletCapacidad = ProductoTerminadoPalets 
			exit
		endfor
	
	endsub
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&PaletId);
```

