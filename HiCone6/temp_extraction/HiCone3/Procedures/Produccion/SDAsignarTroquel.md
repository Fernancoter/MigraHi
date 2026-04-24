# Procedure: SDAsignarTroquel

- **Module:** Produccion
- **Description:** SDAsignar Troquel
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| isOK | Variable | Boolean |  | is OK |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| Troquel | Variable | GX_BUSCOMP |  | Troquel |
| TroquelEstado | Variable | VARCHAR |  | Troquel Estado |
| TroquelId | Parameter | NUMERIC | in | Troquel Id |
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
	&isOK = true
	&Troquel.Load(&TroquelId)
	&TroquelEstado = &Troquel.TroquelEstado
	
	//Validar estado del troquel
	if(&TroquelEstado = EstadoTroquel.EnPrensa)
		&isOK = false
		&Msj = New()
		&Msj.Id = !'TroquelOcupado'
		&Msj.Description = 'El troquel se encuentra ocupado en otra prensa. Seleccione otro disponible.'
		&Msj.Type = MessageTypes.Warning
		&Mensajes.Add(&Msj)
	endif

        if(&isOK)
		//Montar el troquel seleccionado en prensa
		&isOK = SDCrearPrensaTroquel.Udp(&PrensaId, &TroquelId)
		
		if(Not &isOK)
			&Msj = New()
			&Msj.Id = !'PrensaTroquelFallido'
			&Msj.Description = 'No se ha podido vincular el troquel a la prensa.'
			&Msj.Type = MessageTypes.Error
			&Mensajes.Add(&Msj)
		endif
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensaId, in:&TroquelId, out:&Mensajes);
```

