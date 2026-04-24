# Procedure: SDInitExtrusion

- **Module:** Produccion
- **Description:** SDInit Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoEstado | Variable | VARCHAR |  | Prensado Estado |
| CurrentItem | Parameter | GX_SDT | in | Current Item |
| ExtrusionEstado | Parameter | VARCHAR | in | Extrusion Estado |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| isOK | Variable | Boolean |  | is OK |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
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
	&isOK = GuardarExtrusion.Udp(&CurrentItem)
	
	if(&isOK)
		
		if(&ExtrusionEstado = EstadoExtrusion.Programada)
			Produccion.SDExtrusoraBobina.Call(&ExtrusionId)
		endif

		SetGAMAttribute.Call('ExtrusionID', &ExtrusionId.ToString())
	else
		&Msj = New()
		&Msj.Id = !'GuardarExtrusionFallida'
		&Msj.Description = 'No se ha podido realizar el guardado de la Extrusion (' +  &ExtrusionEstado.ToUpper().ToString() +')'
		&Msj.Type = MessageTypes.Error
		&Mensajes.Add(&Msj)
	endif
```

### Rules (Rules)

```genexus
parm(in:&CurrentItem, in:&ExtrusionId, in:&ExtrusionEstado, out:&Mensajes);
```

