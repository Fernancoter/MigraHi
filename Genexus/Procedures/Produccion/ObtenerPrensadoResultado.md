# Procedure: ObtenerPrensadoResultado

- **Module:** Produccion
- **Description:** Obtener Prensado Resultado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PaletEstatus | Variable | VARCHAR |  | Palet Estatus |
| CantidadPalets | Variable | NUMERIC |  | Cantidad Palets |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| CarreteEstado | Variable | VARCHAR |  | Carrete Estado |
| CarretesEnPalet | Variable | NUMERIC |  | Carretes En Palet |
| CarretesMolino | Variable | NUMERIC |  | Carretes Molino |
| CarretesSobrantes | Variable | NUMERIC |  | Carretes Sobrantes |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensadoResultado | Variable | GX_BUSCOMP |  | Prensado Resultado |
| PRId | Parameter | NUMERIC | out | PRId |
| CarreteMillar | Variable | NUMERIC |  | Carrete Millar |
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


for each DB.PrensadoResultado
	where DB.PrensadoResultadoId > 0
	where PrensadoId = &PrensadoId
	&PRId = PrensadoResultadoId
	Exit
when none
	
	do 'ResumenCarretes'
	do 'ResumenPalets'
	
	&PrensadoResultado = New()
	&PrensadoResultado.PrensadoId = &PrensadoId
	&PrensadoResultado.PrensadoResultadoPiezasBuenas = &CarretesEnPalet
	&PrensadoResultado.PrensadoResultadoPiezasMolino = &CarretesMolino
	&PrensadoResultado.PrensadoResultadoNoPalets = &CantidadPalets
	&PrensadoResultado.PrensadoResultadoCarretesSobrantes = &CarretesSobrantes
	&PrensadoResultado.Save()
	
	if(&PrensadoResultado.Success())
		&PRId = &PrensadoResultado.PrensadoResultadoId
		commit
	endif
	
endfor

Sub 'ResumenCarretes'
	
	&CarretesMolino = 0
	&CarretesEnPalet = 0
	
	for each
		where CarreraId > 0
		where InicioPBPrensadoId = &PrensadoId
		&CarreraId = CarreraId
	        
		for each
			where CarreteId > 0
			where DB.CarreteCarreraId = &CarreraId
			&CarreteEstado = CarreteEstado
			
			Do Case 
			        Case &CarreteEstado = EstadoCarrete.EnPalet
				         &CarretesEnPalet += 1
			        Case &CarreteEstado = EstadoCarrete.Molino
				         &CarretesMolino += 1
			EndCase
		endfor
	endfor

        &CarreteMillar = ObtenerCarreteMillar.Udp(&PrensadoId)
	
	if(&CarreteMillar > 0)
		&CarretesEnPalet *= &CarreteMillar
		&CarretesMolino *= &CarreteMillar
	endif

EndSub

Sub 'ResumenPalets'
	
	&CantidadPalets = 0
	&CarretesSobrantes = 0
	
	for each
		where PaletId > 0
		where PaletPrensadoFinId = &PrensadoId
		&PaletEstatus = PaletEstatus
		
		Do Case 
		        Case &PaletEstatus in (EstatusPalet.Terminado, EstatusPalet.Embarcado)
			         &CantidadPalets += 1
		        Case &PaletEstatus = EstatusPalet.EnEnsamble
			         &CarretesSobrantes += PaletNoCarretes
		EndCase	
	endfor
EndSub
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&PRId);
```

