# Procedure: SDConcluirEtiquetado

- **Module:** Produccion
- **Description:** SDConcluir Etiquetado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Palet | Variable | GX_BUSCOMP |  | Palet |
| Capacidad | Variable | NUMERIC |  | Capacidad |
| CarreteId | Variable | NUMERIC |  | Carrete Id |
| Count | Variable | NUMERIC |  | Count |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| PaletId | Parameter | NUMERIC | in | Palet Id |
| PaletCarrete | Variable | GX_BUSCOMP |  | Palet Carrete |
| PCId | Variable | NUMERIC |  | PCId |
| PaletCapacidad | Parameter | NUMERIC | in | Palet Capacidad |
| CarreteEstado | Variable | VARCHAR |  | Carrete Estado |
| Diff | Variable | NUMERIC |  | Diff |
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
        
	&Count = 0
	&Mensajes.Clear()
	
	for each DB.PaletCarrete
		Order (CarreteEstado)
		where PaletCarreteId > 0
		where PaletId = &PaletId
		where CarreteId > 0
		&CarreteEstado = WWPBaseObjects.CarreteEstado
		
		Do Case 
			Case &CarreteEstado = EstadoCarrete.Etiquetado
			     &Count += 1
				
			Case &CarreteEstado = Produccion.EstadoCarrete.Etiquetar
			     &Msj = New()
		             &Msj.Id = !'CarreteEtiquetar'
		             &Msj.Description = 'El Pallet contiene carretes por etiquetar.'
		             &Msj.Type = MessageTypes.Info
		             &Mensajes.Add(&Msj)
			     Exit
				
			Case &CarreteEstado = EstadoCarrete.Molino
			     &Msj = New()
		             &Msj.Id = !'CarreteMolino'
		             &Msj.Description = 'El Pallet contiene carretes a molino. Elimine las referencias.'
		             &Msj.Type = GeneXus.MessageTypes.Info
		             &Mensajes.Add(&Msj)
			     Exit
	        EndCase
	endfor
        
	if(&Count = &PaletCapacidad)
		SetEstatusPalet.Call(&PaletId, EstatusPalet.Terminado)
	else
		if(&Mensajes.Count = 0)
			&Diff = &PaletCapacidad - &Count
			&Msj = New()
			&Msj.Id = !'FaltanteEnPallet'
			&Msj.Description = 'Falta(n) ' + &Diff.ToString() + ' carrete(s) para completar el Pallet.'
			&Msj.Type = MessageTypes.Info
			&Mensajes.Add(&Msj)
		endif
        endif
```

### Rules (Rules)

```genexus
parm(in:&PaletId, in:&PaletCapacidad, out:&Mensajes);
```

