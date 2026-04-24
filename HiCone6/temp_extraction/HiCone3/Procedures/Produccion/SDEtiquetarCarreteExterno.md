# Procedure: SDEtiquetarCarreteExterno

- **Module:** Produccion
- **Description:** SDEtiquetarCarreteExterno
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Capacidad | Variable | NUMERIC |  | Capacidad |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| Count | Variable | NUMERIC |  | Count |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletCapacidad | Variable | NUMERIC |  | Palet Capacidad |
| PaletCarrete | Variable | GX_BUSCOMP |  | Palet Carrete |
| PaletEstatus | Variable | VARCHAR |  | Palet Estatus |
| PaletExterno | Variable | GX_BUSCOMP |  | Palet Externo |
| PaletExternoId | Variable | NUMERIC |  | Palet Externo Id |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PCId | Variable | NUMERIC |  | PCId |
| TieneCapacidad | Variable | Boolean |  | Tiene Capacidad |
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
        
	&Mensajes.Clear()
	&Palet.Load(&PaletId)
	&PaletCapacidad = &Palet.PaletCapacidad
	
	do 'ValidarCapacidad'
	
	if(&TieneCapacidad)
		do 'MoverCarrete'
	else
		&Msj = New()
		&Msj.Id = !'ExcedeCapacidad'
		&Msj.Description = 'El Pallet esta al límite de su capacidad.'
		&Msj.Type = MessageTypes.Info
		&Mensajes.Add(&Msj)
	endif
	
	Sub 'MoverCarrete'
		&PCId = 0
		
		for each DB.PaletCarrete
			where PaletCarreteId > 0
			where CarreteId = &CarreteId
			where PaletId > 0
			&PCId = PaletCarreteId
			&PaletExternoId = PaletId
			&PaletEstatus = PaletEstatus
			
				if(&PaletEstatus = EstatusPalet.Terminado)
					SetEstatusPalet.Call(&PaletExternoId, EstatusPalet.Incompleto)
				endif
		        Exit
		endfor
	
		if(&PCId > 0)
			//Actualizar referencia al Pallet (Etiquetando)
			&PaletCarrete.Load(&PCId)
			&PaletCarrete.PaletId = &PaletId
			&PaletCarrete.Save()
			commit
			
			//Restar carrete transferido
			&PaletExterno.Load(&PaletExternoId)
			&PaletExterno.PaletNoCarretes -= 1
			&PaletExterno.Save()
			commit
			
			//Actualizar estado del Carrete (Etiquetar)
			SetEstadoCarrete.Call(&CarreteId, EstadoCarrete.Etiquetar, false)
		endif
	EndSub

	Sub 'ValidarCapacidad'
		
		&Count = 0
		&TieneCapacidad = true
		
		for each DB.PaletCarrete
			where PaletCarreteId > 0
			where PaletId = &PaletId
			where CarreteId > 0
			&Count += 1
	        endfor
 
		if(&Count = &PaletCapacidad)
			&TieneCapacidad = false
		endif
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&PaletId, in:&CarreteId, out:&Mensajes);
```

