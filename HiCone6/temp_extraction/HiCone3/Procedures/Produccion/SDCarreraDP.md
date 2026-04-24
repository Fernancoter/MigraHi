# Procedure: SDCarreraDP

- **Module:** Produccion
- **Description:** SDCarrera DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Prensadoid | Parameter | NUMERIC | in | Prensado Id |
| SDCarreraItem | Variable | GX_SDT |  | SDCarrera Item |
| SDTCarreraSD | Parameter | GX_SDT | out | SDTCarrera SD |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
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
&SDTCarreraSD.Clear()

for each
	Order (CarreraId)
	where CarreraId > 0
	where InicioPrensadoBobinaId > 0
	where InicioPBPrensadoId = &PrensadoId when &PrensadoId > 0
	&CarreraId = CarreraId
	
	&SDCarreraItem = New()
	&SDCarreraItem.CarreraId = CarreraId
	&SDCarreraItem.CarreraNo = CarreraNo
	&SDCarreraItem.CarreraEstado = CarreraEstado
	&SDCarreraItem.CarreraPaletTerminado = CarreraPaletTerminado
	&SDCarreraItem.InicioPrensadoBobinaId = InicioPrensadoBobinaId
	&SDCarreraItem.InicioPBPrensadoId = InicioPBPrensadoId
	&SDCarreraItem.EtiquetaCarrera = '<b>C' + CarreraNo.ToString().Trim() +'</b>'
	
	do 'VincularCarretes'
	
	&SDTCarreraSD.Add(&SDCarreraItem)
	
endfor

Sub 'VincularCarretes'
	
	for each
		where CarreteId > 0
		where CarreteCarreraId = &CarreraId
		
		if(CarreteEstado = EstadoCarrete.Molino)
			Do Case
				case CarreteNoLinea = 1
				     &SDCarreraItem.CarreteL1 = true
				case CarreteNoLinea = 2
				     &SDCarreraItem.CarreteL2 = true
				case DB.CarreteNoLinea = 3
				     &SDCarreraItem.CarreteL3 = true
				case CarreteNoLinea = 4
				     &SDCarreraItem.CarreteL4 = true
				case CarreteNoLinea = 5
				     &SDCarreraItem.CarreteL5 = true
				case WWPBaseObjects.CarreteNoLinea = 6
				     &SDCarreraItem.CarreteL6 = true
			EndCase
	        endif
	
	        if(CarreteTerminaPalet)
			&SDCarreraItem.CarreteTerminal = 'Termina en L' + CarreteNoLinea.ToString().Trim()
		endif
	endfor
EndSub
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&SDTCarreraSD);
```

