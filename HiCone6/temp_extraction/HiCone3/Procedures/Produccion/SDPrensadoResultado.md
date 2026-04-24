# Procedure: SDPrensadoResultado

- **Module:** Produccion
- **Description:** SDPrensado Resultado
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PTId | Variable | NUMERIC |  | PTId |
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| BobinaKg | Variable | NUMERIC |  | Bobina Kg |
| BobinaMermakg | Variable | NUMERIC |  | Bobina Merma Kg |
| BobinasMolino | Variable | NUMERIC |  | Bobinas Molino |
| BobinasReposo | Variable | NUMERIC |  | Bobinas Reposo |
| CantidadPalets | Variable | NUMERIC |  | Cantidad Palets |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| CarreteEstado | Variable | VARCHAR |  | Carrete Estado |
| CarreteId | Variable | NUMERIC |  | Carrete Id |
| CarreteMermaKg | Variable | NUMERIC |  | Carrete Merma Kg |
| CarreteMermaMolino | Variable | Boolean |  | Carrete Merma Molino |
| CarreteMillar | Variable | NUMERIC |  | Carrete Millar |
| CarretePeso | Variable | NUMERIC |  | Carrete Peso |
| CarretesEnPalet | Variable | NUMERIC |  | Carretes En Palet |
| CarretesMolino | Variable | NUMERIC |  | Carretes Molino |
| CarretesSobrantes | Variable | NUMERIC |  | Carretes Sobrantes |
| ERId | Variable | NUMERIC |  | ERId |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| ExtrusionResultado | Variable | GX_BUSCOMP |  | Extrusion Resultado |
| PaletEstatus | Variable | VARCHAR |  | Palet Estatus |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensadoMermaKg | Variable | NUMERIC |  | Prensado Merma Kg |
| PrensadoResultado | Variable | GX_BUSCOMP |  | Prensado Resultado |
| PRId | Variable | NUMERIC |  | PRId |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| ProductoTerminado | Variable | GX_BUSCOMP |  | Producto Terminado |
| SDTExtrusionResultado | Variable | GX_SDT |  | SDTExtrusion Resultado |
| SDTPrensadoResultado | Parameter | GX_SDT | out | SDTPrensado Resultado |
| TotalKg | Variable | NUMERIC |  | Total Kg |
| TotalMermaKg | Variable | NUMERIC |  | Total Merma Kg |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| Porcentaje | Variable | NUMERIC |  | Porcentaje |
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
		where PrensadoResultadoId > 0
		where PrensadoId = &PrensadoId
		&PRId = PrensadoResultadoId
		&PrensadoResultado.Load(&PRId)
		Exit
	when none
		
		&Prensado.Load(&PrensadoId)
		&ProductoId = &Prensado.PrensadoProductoId
		
		do 'ProductoTerminado'
		
		&CarreteMillar = &ProductoTerminado.ProductoTerminadoCarreteMillar
		&CarretePeso = &ProductoTerminado.ProductoTerminadoPesoCarrete
		
		do 'ResumenCarretes'
	        do 'ResumenPalets'
		
		&PrensadoResultado = New()
		&PrensadoResultado.DB.PrensadoId = &PrensadoId
		&PrensadoResultado.PrensadoResultadoPiezasBuenas = &CarretesEnPalet
		&PrensadoResultado.PrensadoResultadoPiezasMolino = &CarretesMolino
		&PrensadoResultado.PrensadoResultadoNoPalets = &CantidadPalets
		&PrensadoResultado.PrensadoResultadoMermaKg = &PrensadoMermaKg
		&PrensadoResultado.PrensadoResultadoCarretesSobrantes = &CarretesSobrantes
		&PrensadoResultado.Save()
		
		if(&PrensadoResultado.Success())
			commit
		endif
		
	endfor

        &SDTPrensadoResultado = New()
	&SDTPrensadoResultado.FromJson(&PrensadoResultado.ToJson())

	Sub 'ResumenCarretes'
		
		&CarretesMolino = 0
		&CarretesEnPalet = 0
		
		for each
			where CarreraId > 0
			where InicioPBPrensadoId = &PrensadoId
			&CarreraId = CarreraId
			
			for each
				where CarreteId > 0
				where CarreteCarreraId = &CarreraId
				&CarreteEstado = CarreteEstado
				&CarreteMermaMolino = CarreteMermaMolino
				&CarreteMermaKg = CarreteMermaKg
				
				Do Case 
					Case &CarreteEstado = EstadoCarrete.EnPalet
						&CarretesEnPalet += 1
					Case &CarreteEstado = EstadoCarrete.Molino
						&CarretesMolino += 1
					        
						if(&CarreteMermaMolino)
							&PrensadoMermaKg += &CarreteMermaKg
							&Porcentaje = (&CarreteMermaKg/&CarretePeso)
							&CarretesMolino += &Porcentaje * &CarreteMillar
						else
							&CarretesMolino += &CarreteMillar
							&PrensadoMermaKg += &CarretePeso
						endif
				EndCase
			endfor
		endfor
	
		if(&CarreteMillar > 0)
			&CarretesEnPalet *= &CarreteMillar
			//&CarretesMolino *= &CarreteMillar
		endif
	
	EndSub
	
	Sub 'ResumenPalets'
		
		&CantidadPalets = 0
		&CarretesSobrantes = 0
		
		for each
			where PaletId > 0
			//where PaletPrensadoId = &PrensadoId
			where PaletPrensadoFinId = &PrensadoId
			&PaletEstatus = PaletEstatus
			
			Do Case 
				Case &PaletEstatus = EstatusPalet.Terminado
					&CantidadPalets += 1
				Case &PaletEstatus = EstatusPalet.EnEnsamble
					&CarretesSobrantes += PaletNoCarretes
			EndCase	
		endfor
	EndSub
        
	
	Sub 'ProductoTerminado'
		for each DB.ProductoTerminado
		     where ProductoTerminadoId > 0
		     where TerminadoProductoId = &ProductoId
		     &PTId = ProductoTerminadoId
		     &ProductoTerminado.Load(&PTId)
		     Exit
	        endfor
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&SDTPrensadoResultado);
```

