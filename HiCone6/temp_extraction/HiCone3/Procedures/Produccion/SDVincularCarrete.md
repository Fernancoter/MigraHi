# Procedure: SDVincularCarrete

- **Module:** Produccion
- **Description:** SDVincular Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| CantCarretes | Variable | NUMERIC |  | Cant Carretes |
| CantFaltante | Parameter | NUMERIC | out | Cant Faltante |
| CantPalet | Variable | NUMERIC |  | Cant Palet |
| Capacidad | Variable | NUMERIC |  | Capacidad |
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| CarreteEstado | Variable | VARCHAR |  | Carrete Estado |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
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
| isOK | Parameter | Boolean | out | is OK |
| PaletNoCarretes | Variable | NUMERIC |  | Palet No Carretes |
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

   &isOK = false
   &Carrete.Load(&CarreteId)
   if(&Carrete.CarreteEstado = EstadoCarrete.EnRevision)
		&Palet.Load(&PaletId)
		&PaletNoSerie = &Palet.PaletNoSerie
		
		&CantPalet = 0
		&Capacidad = &Palet.PaletCapacidad
		&CantCarretes = &Palet.PaletNoCarretes
		&CantFaltante = &Capacidad - &CantCarretes 
		
		if(&CantFaltante > 0) 
				
			do 'CarretePalet'
			&CantFaltante -= 1
			
			if(&CantFaltante = 0)
				do 'TerminarEnsamble'
				do 'CarreteTerminaPalet'
				do 'CarreraPaletTerminado'	
				&NewPaletId = ObtenerPalet.Udp(&PrensadoId)
			endif
		
			
		else	
			do 'TerminarEnsamble'
			
			&NewPaletId = ObtenerPalet.Udp(&PrensadoId)
			SDVincularCarrete.Call(&PrensadoId, &NewPaletId, &CarreteId,&CantFaltante)
			
		endif
		
		if(&CantPalet > 0)
			
			&SavePalet.Load(&PaletId)
			&SavePalet.PaletNoCarretes = &CantCarretes + &CantPalet
			&SavePalet.Save()
			
			if(&SavePalet.Success())
				commit
			endif
		endif
    endif
 
	ValidarCarreraCompleta.Call(&Carrete.CarreteCarreraId)
	 
	 
	Sub 'CarretePalet'
				
		&PaletCarrete = New()
		&PaletCarrete.CarreteId = &CarreteId
		&PaletCarrete.PaletId = &PaletId
		&PaletCarrete.Save()
		
		if(&PaletCarrete.Success())
			commit
			
			&isOK = true
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
	&CarreraId = &Carrete.CarreteCarreraId
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
parm(in:&PrensadoId, in:&PaletId, in:&CarreteId, out:&CantFaltante, out:&isOK);
```

