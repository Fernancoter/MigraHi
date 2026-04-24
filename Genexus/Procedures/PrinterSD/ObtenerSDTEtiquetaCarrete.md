# Procedure: ObtenerSDTEtiquetaCarrete

- **Module:** PrinterSD
- **Description:** Obtener SDTEtiqueta Carrete
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| EnPalet | Variable | Boolean |  | En Palet |
| EtiquetaCarreteSDT | Parameter | GX_SDT | out | Etiqueta Carrete SDT |
| PaletProductoNombre | Variable | VARCHAR |  | Palet Producto Nombre |
| PaletProductoId | Variable | NUMERIC |  | Palet Producto Id |
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
&EtiquetaCarreteSDT = New()

do 'CarreteEnPallet'

For each
	Where CarreteId = &CarreteId
	&EtiquetaCarreteSDT.CarreteId = CarreteId
	&EtiquetaCarreteSDT.CarreteNoSerie = CarreteNoSerie
	&EtiquetaCarreteSDT.InicioPBPrensadoId = InicioPBPrensadoId
	
	//Asignar el producto del prensado o del palet segun corresponda
	//Aplica para los escenarios donde el producto del palet es tipo etiqueta
	if(&EnPalet)
		&EtiquetaCarreteSDT.PrensadoProductoId = &PaletProductoId
	        &EtiquetaCarreteSDT.PrensadoProductoNombre = &PaletProductoNombre
	else
		&EtiquetaCarreteSDT.PrensadoProductoId = PrensadoProductoId
	        &EtiquetaCarreteSDT.PrensadoProductoNombre = PrensadoProductoNombre
	endif

	&EtiquetaCarreteSDT.PrensadoProductoDescripcion = PrensadoProductoDescripcion
	&EtiquetaCarreteSDT.CarreteNoLinea = CarreteNoLinea
	&EtiquetaCarreteSDT.CarreraNo = CarreraNo
	&EtiquetaCarreteSDT.CarreteCarreraId = CarreteCarreraId
	Do 'ObtenerTurno'
	
	exit
	
EndFor
debugger.Call(niveldebug.Informativo, &Pgmname, '&EtiquetaCarreteSDT.CarreteCarreraId Linea 18 ' + &EtiquetaCarreteSDT.CarreteCarreraId.ToString())
Sub 'ObtenerTurno'
	For Each
		Where CarreraId = &EtiquetaCarreteSDT.CarreteCarreraId
		&PrensadoId = InicioPBPrensadoId
		
		&EtiquetaCarreteSDT.PrensadoHoraIniciaProceso = CarreraFechaRegistro
		&EtiquetaCarreteSDT.PrensadoHoraFinProceso = CarreraFechaValidacion
		
		
	EndFor
	
	For Each
		Where PrensadoId = &PrensadoId
		&EtiquetaCarreteSDT.TurnoId = PrensadoTurnoId
		&EtiquetaCarreteSDT.TurnoNombre = PrensadoTurnoNombre	
		&EtiquetaCarreteSDT.PrensaNombre = PrensadoPrensaNombre
		&EtiquetaCarreteSDT.PrensadoLevasGradosEntrada = PrensadoLevasGradosEntrada
		&EtiquetaCarreteSDT.PrensadoLevasGradosSalida = PrensadoLevasGradosSalida
	
		&EtiquetaCarreteSDT.PrensadoOperadorNombre = PrensadoOperadorNombre
		&EtiquetaCarreteSDT.PrensadoTroquelNombre = PrensadoTroquelNombre
		exit
	EndFor
	
EndSub


Sub 'CarreteEnPallet'
	
	&EnPalet = false
	for each DB.PaletCarrete
		where PaletId > 0
	        where CarreteId = &CarreteId
		&PaletProductoId = PaletProductoId
                &PaletProductoNombre = PaletProductoNombre
		&EnPalet = true
		Exit
	endfor
EndSub
```

### Rules (Rules)

```genexus
parm(in:&CarreteId, out:&EtiquetaCarreteSDT);
```

