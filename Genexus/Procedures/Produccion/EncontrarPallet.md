# Procedure: EncontrarPallet

- **Module:** Produccion
- **Description:** Encontrar Pallet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| isValid | Variable | Boolean |  | is Valid |
| DeleteEmbarquePallet | Variable | GX_BUSCOMP |  | Delete Embarque Pallet |
| EmbarqueDetalleId | Variable | NUMERIC |  | Embarque Detalle Id |
| Encontrado | Variable | Boolean |  | Encontrado |
| Externo | Variable | Boolean |  | Externo |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| NoPallet | Parameter | VARCHAR | in | No Pallet |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PaletEstatus | Variable | VARCHAR |  | Palet Estatus |
| PaletExterno | Variable | GX_BUSCOMP |  | Palet Externo |
| PaletId | Variable | NUMERIC |  | Palet Id |
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
	&PaletId = 0
	&Encontrado = false
	&isValid = true
	&Mensajes.Clear()

	for each DB.Palet
		where PaletId > 0
		where PaletNoSerie.Trim() = &NoPallet.Trim()
		
		if(PaletProductoId = &ProductoId)
			&Encontrado = true
			&PaletId = PaletId
		else
			&Msj = New()
			&Msj.Id = !'Producto no compatible'
			&Msj.Description = 'Palet no compatible con el producto del embarque.'
			&Msj.Type = MessageTypes.Warning
			&Mensajes.Add(&Msj)
			&isValid = false
		endif
	
	        Exit
	When none
		&Externo = EscaneoPaletExterno.Udp()
		
		if(&Externo)
			&PaletExterno = New()
			&PaletExterno.Subscriptions.PaletPrensadoId.SetNull()
			&PaletExterno.PaletOperadorId.SetNull()
			&PaletExterno.PaletPrensaId.SetNull()
			&PaletExterno.PaletNoSerie = &NoPallet.Trim()
			&PaletExterno.PaletProductoId = &ProductoId
	
			&PaletExterno.PaletPrensadoFinId.SetNull()
			&PaletExterno.PaletTipo = TipoPalet.Externo
			&PaletExterno.DB.PaletCapacidad = 0
			&PaletExterno.PaletEstatus = EstatusPalet.Terminado
			&PaletExterno.PaletHoraInicioEnsamble = Today()
			&PaletExterno.PaletHoraFinEnsamble = Today()
			&PaletExterno.Save()
			&PaletId = &PaletExterno.PaletId
			commit
			
			if(&isValid)
		             SetEstatusPalet.Call(&PaletId, EstatusPalet.Embarcado)
	          endif
		else
			&Msj = New()
			&Msj.Id = !'Pallet no registrado'
			&Msj.Description = 'Palet no encontrado en sistema. Si desea agregarlo, habilite el escaneo de pallets externos.'
			&Msj.Type = MessageTypes.Warning
			&Mensajes.Add(&Msj)
			&isValid = false
		endif
	endfor
        
	if(&Encontrado)
		&Palet.Load(&PaletId)
		&PaletEstatus = &Palet.PaletEstatus
		
		Do Case
			Case &PaletEstatus = EstatusPalet.EnEnsamble
			     &Msj = New()
			     &Msj.Id = !'Pallet en ensamble'
			     &Msj.Description = 'El pallet se encuentra en ensamble.'
			     &Msj.Type = MessageTypes.Info
			     &Mensajes.Add(&Msj)
			     &isValid = false
			     
			Case &PaletEstatus = EstatusPalet.Embarcado
				
			     &Msj = New()
			     &Msj.Id = !'Pallet embarcado'
			     &Msj.Description = 'El pallet ya se encuentra embarcado.'
			     &Msj.Type = MessageTypes.Info
			     &Mensajes.Add(&Msj)
			     &isValid = false
		EndCase
	
	        if(&isValid)
		     Produccion.SetEstatusPalet.Call(&PaletId, EstatusPalet.Embarcado)
	        endif
	endif
```

### Rules (Rules)

```genexus
parm(in:&NoPallet, in:&ProductoId, out:&Mensajes);
```

