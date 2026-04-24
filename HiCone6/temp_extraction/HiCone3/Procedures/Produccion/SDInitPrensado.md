# Procedure: SDInitPrensado

- **Module:** Produccion
- **Description:** SDInit Prensado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CurrentItem | Parameter | GX_SDT | in | Current Item |
| isOK | Variable | Boolean |  | is OK |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensadoEstado | Parameter | VARCHAR | in | Prensado Estado |
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
	&isOK = GuardarPrensado.Udp(&CurrentItem)
	
	if(&isOK)
		
		if(&PrensadoEstado = EstadoPrensado.Programado)
			SDPrensaCarrera.Call(&PrensadoId)
		endif
	
		ObtenerPalet.Call(&PrensadoId, 0)
		SetGAMAttribute.Call('PrensadoID', &PrensadoId.ToString())
	else
		&Msj = New()
		&Msj.Id = !'GuardarPrensadoFallido'
		&Msj.Description = 'No se ha podido realizar el guardado del Prensado (' +  &PrensadoEstado.ToUpper().ToString() +')'
		&Msj.Type = MessageTypes.Error
		&Mensajes.Add(&Msj)
	endif
```

### Rules (Rules)

```genexus
parm(in:&CurrentItem, in:&PrensadoId, in:&PrensadoEstado, out:&Mensajes);
```

