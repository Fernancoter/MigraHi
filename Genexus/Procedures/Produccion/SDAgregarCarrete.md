# Procedure: SDAgregarCarrete

- **Module:** Produccion
- **Description:** SDAgregar Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| isOK | Variable | Boolean |  | is OK |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| PaletId | Variable | NUMERIC |  | Palet Id |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| CantFaltante | Variable | NUMERIC |  | Cant Faltante |
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
	    &PaletId = ObtenerPalet.Udp(&PrensadoId)
        &isOK = SDVincularCarrete.Udp(&PrensadoId, &PaletId, &CarreteId,&CantFaltante)
	    
		if(&CantFaltante = 1)
			  &Msj = New()
		      &Msj.Id = !'CantidadFaltanteUno'
		      &Msj.Description = 'El siguiente carrete cierra el pallet y NO SE PUEDE CANCELAR LA OPERACIÓN'
		      &Msj.Type = MessageTypes.Info
		      &Mensajes.Add(&Msj)
		endif
	
		  
	    if(&isOK)
		      &Msj = New()
		      &Msj.Id = !'Carrete agregado'
		      &Msj.Description = 'Carrete agregado con éxito'
		      &Msj.Type = MessageTypes.Info
		      &Mensajes.Add(&Msj)
	    else
		      &Msj = New()
		      &Msj.Id = !'Carrete no vinculado'
		      &Msj.Description = 'El carrete no se ha podido agregar al palet'
		      &Msj.Type = MessageTypes.Error
		      &Mensajes.Add(&Msj)
	    endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&CarreteId, out:&Mensajes);
```

