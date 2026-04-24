# Procedure: SDTerminarCarrera

- **Module:** Produccion
- **Description:** SDTerminar Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| isOK | Variable | Boolean |  | is OK |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
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
	&isOK = SDCheckeoCarreras.Udp(&PrensadoId, EstadoCarrera.Terminada)
	
	if(&isOK)
		SDTerminarCarreraDB.Call()
	else
		&Msj = New()
		&Msj.Id = !'Validar carrera'
		&Msj.Description = 'Debe validar la carrera terminada'
		&Msj.Type = MessageTypes.Warning
		&Mensajes.Add(&Msj)
	endif
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&Mensajes);
```

