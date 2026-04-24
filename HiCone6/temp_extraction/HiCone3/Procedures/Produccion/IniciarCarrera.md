# Procedure: IniciarCarrera

- **Module:** Produccion
- **Description:** Iniciar Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Carrera | Variable | GX_BUSCOMP |  | Carrera |
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| NoCarrera | Variable | NUMERIC |  | No Carrera |
| NoLinea | Variable | NUMERIC |  | No Linea |
| NoPalet | Variable | NUMERIC |  | No Palet |
| PrensadoBobina | Variable | GX_BUSCOMP |  | Prensado Bobina |
| PrensadoBobinaId | Variable | NUMERIC |  | Prensado Bobina Id |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| CarreraNo | Variable | NUMERIC |  | Carrera No |
| PBId | Variable | NUMERIC |  | PBId |
| PaletId | Variable | NUMERIC |  | Palet Id |
| Palet | Variable | GX_BUSCOMP |  | Palet |
| PBobinaId | Variable | NUMERIC |  | Bobina Id |
| isOK | Variable | Boolean |  | is OK |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| CarreraTroquel | Variable | VARCHAR |  | Carrera Troquel |
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

	&isOK = SDCheckeoCarreras.Udp(&PrensadoId, EstadoCarrera.EnProceso)

	if(&isOK)

		//Obtener troquel calibrado en prensado
		&Prensado.Load(&PrensadoId)
		&CarreraTroquel = &Prensado.PrensadoTroquelNombre

		//Obtener PrensadoBobina en uso
	        &PBobinaId = ObtenerPrensadoBobina.Udp(&PrensadoId)

		//Obtener NoCarrera
	        &NoCarrera = ObtenerCarreraNo.Udp(&PrensadoId)
		&NoCarrera += 1

	        //Instanciar Carrera
		&Carrera = New()
		&Carrera.CarreraNo = &NoCarrera
		&Carrera.CarreraEstado = EstadoCarrera.EnProceso
		&Carrera.CarreraFechaRegistro = Now()
		&Carrera.CarreraFechaValidacion.SetNull()
		&Carrera.CarreraPaletTerminado.SetEmpty()
		&Carrera.InicioPrensadoBobinaId = &PBobinaId
		&Carrera.CarreraTroquel = &CarreraTroquel
		&Carrera.CarreraInterrupcionId.SetNull()
		&Carrera.Save()

		if(&Carrera.Success())
			&CarreraId = &Carrera.CarreraId
			commit

			//Generar 6 carretes
			do 'GenerarCarretes'

			//Carreras del PrensadoBobina
			do 'PBobinaCarrera'

		endif
	endif

        Sub 'GenerarCarretes'

		&NoLinea = 6
		Do while &NoLinea >= 1

			&Carrete = New()
			&Carrete.CarreteNoLinea = &NoLinea
			&Carrete.DB.CarreteNoSerie = CarreteNoSerie.Udp(&PrensadoId, &NoCarrera, &NoLinea)
			&Carrete.CarreteEstado = EstadoCarrete.EnProceso
			&Carrete.CarreteMolino = MolinoCarrete.NoAplica
			&Carrete.CarreteTerminaPalet = false
			&Carrete.CarretePaletSerie.SetEmpty()
			&Carrete.CarreteCarreraId = &CarreraId
			&Carrete.Save()

			if(&Carrete.Success())
				commit
			endif

		        &NoLinea -= 1
		EndDo

	EndSub

        Sub 'PBobinaCarrera'

		//Carretes de la Bobina en el Prensado
		&PrensadoBobina.Load(&PBobinaId)
		&BobinaId = &PrensadoBobina.BobinaId
	        &PrensadoBobina.PrensadoBobinaCantCarrera += 1
	        &PrensadoBobina.Save()

		if(&PrensadoBobina.Success())
			commit

			//Carretes totales de la Bobina
			&Bobina.Load(&BobinaId)
			&Bobina.BobinaCarreras += 1
			&Bobina.Save()
			commit
		endif
	Endsub
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId);
```

