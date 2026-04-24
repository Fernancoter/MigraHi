# Procedure: VincularCarretePalet

- **Module:** Produccion
- **Description:** Vincular Carrete Palet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| CantCarretes | Variable | NUMERIC |  | Cant Carretes |
| CantFaltante | Variable | NUMERIC |  | Cant Faltante |
| CantPalet | Variable | NUMERIC |  | Cant Palet |
| Capacidad | Variable | NUMERIC |  | Capacidad |
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
| CarreraId | Parameter | NUMERIC | in | Carrera Id |
| CarreteEstado | Variable | VARCHAR |  | Carrete Estado |
| CarreteId | Variable | NUMERIC |  | Carrete Id |
| FechaHoy | Variable | DATE |  | Fecha Hoy |
| FechaInicioEnsamble | Variable | DATE |  | Fecha Inicio Ensamble |
| NewPaletId | Variable | NUMERIC |  | Palet Id |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletCarrete | Variable | GX_BUSCOMP |  | Palet Carrete |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PaletNoSerie | Variable | VARCHAR |  | Palet No Serie |
| POFecha | Variable | DATE |  | POFecha |
| POId | Variable | NUMERIC |  | POId |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensadoOrigen | Variable | GX_BUSCOMP |  | Prensado Origen |
| SavePalet | Variable | GX_BUSCOMP |  | Save Palet |
| SDTCarrete | Variable | GX_SDT |  | SDTCarrete |
| SDTCarreteItem | Variable | GX_SDT |  | SDTCarrete Item |
| SPPaletNo | Variable | NUMERIC |  | Palet No |
| SPPrensaId | Variable | NUMERIC |  | Prensa Id |
| SPTurnoId | Variable | NUMERIC |  | Turno Id |
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
	&Palet.Load(&PaletId)
	&PaletNoSerie = &Palet.PaletNoSerie
	
	&CantPalet = 0
	&Capacidad = &Palet.PaletCapacidad
	&CantCarretes = &Palet.PaletNoCarretes
	&CantFaltante = &Capacidad - &CantCarretes 
	
	&SDTCarrete = CarreteDP.Udp(&CarreraId, Orden.Ascendente)
	
	for &SDTCarreteItem in &SDTCarrete
		&CarreteId = &SDTCarreteItem.CarreteId
		&CarreteEstado = &SDTCarreteItem.CarreteEstado
		
		if(&CarreteEstado = EstadoCarrete.EnProceso)
		        
			if(&CantFaltante > 0) 
				
				do 'CarretePalet'
				&CantFaltante -= 1
				
				if(&CantFaltante = 0)
					do 'CarreteTerminaPalet'
					do 'TerminarEnsamble'
					do 'CarreraPaletTerminado'
					
				endif
			else	
				do 'TerminarEnsamble'
				
				&NewPaletId = ObtenerPalet.Udp(&PrensadoId)
				VincularCarretePalet.Call(&CarreraId, &NewPaletId, &PrensadoId)	
			endif
			
		endif
	endfor

        if(&CantPalet > 0)
		
		&SavePalet.Load(&PaletId)
		&SavePalet.PaletNoCarretes = &CantCarretes + &CantPalet
		&SavePalet.Save()
		
		if(&SavePalet.Success())
			commit
		endif
	endif

        
	Sub 'CarretePalet'
				
		&PaletCarrete = New()
		&PaletCarrete.CarreteId = &CarreteId
		&PaletCarrete.PaletId = &PaletId
		&PaletCarrete.Save()
		
		if(&PaletCarrete.Success())
			commit
			
			&CantPalet += 1 
			SetCarretePalet.Call(&CarreteId, EstadoCarrete.EnPalet, &PaletNoSerie)
		endif
	EndSub

Sub 'TerminarEnsamble'
		
		&FechaHoy = Today()
		
		&SavePalet.Load(&PaletId)
		&POId = &SavePalet.PaletPrensadoId
		&PrensadoOrigen.Load(&POId)
		&POFecha = &PrensadoOrigen.PrensadoFecha.ToDate()
		/*
		if(&FechaHoy <> &POFecha)
			&Prensado.Load(&PrensadoId)
			
			&SPPrensaId = &SavePalet.PaletPrensaId
			&SPTurnoId = &Prensado.PrensadoTurnoId
			&SPPaletNo = &SavePalet.PaletNo
			&PaletNoSerie = PaletNoSerie.Udp(&SPPrensaId, &SPTurnoId, &FechaHoy, &SPPaletNo)
			&SavePalet.PaletNoSerie = &PaletNoSerie
		endif
		*/
		&SavePalet.PaletEstatus = EstatusPalet.Terminado
		&SavePalet.PaletPrensadoFinId = &PrensadoId
		&SavePalet.PaletHoraFinEnsamble = Now()
		&SavePalet.PaletNoCarretes = &Capacidad
		&SavePalet.Save()
		
		if(&Palet.Success())
			commit
		endif
	
	EndSub

        Sub 'CarreteTerminaPalet'
		
		&Carrete.Load(&CarreteId)
		&Carrete.CarreteTerminaPalet = true
		&Carrete.Save()
		
		if(&Carrete.Success())
			commit
		endif
	Endsub

         Sub 'CarreraPaletTerminado'
		
		&Carrera.Load(&CarreraId)
		&Carrera.CarreraPaletTerminado = &PaletNoSerie
		&Carrera.Save()
		
		if(&Carrera.Success())
			commit
		endif
	Endsub
```

### Rules (Rules)

```genexus
parm(in:&CarreraId, in:&PaletId, in:&PrensadoId);
```

