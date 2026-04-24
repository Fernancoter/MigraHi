# Procedure: SDAgregarCarrera

- **Module:** Produccion
- **Description:** SDAgregar Carrera
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| agregar | Variable | Boolean |  | agregar |
| BobinaItem | Variable | GX_SDT |  | Bobina Item |
| Factor | Variable | NUMERIC |  | Factor |
| isOK1 | Variable | Boolean |  | is OK1 |
| isOK2 | Variable | Boolean |  | is OK2 |
| Mensajes | Parameter | GX_SDT | out | Mensajes |
| Msj | Variable | GX_SDT |  | Msj |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
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
        //1. Bobina en prensado (validar)
	//2. Carreras terminadas y procesadas al mismo tiempo (validar)
	//3. Bobina con 3 carreras procesadas (confirmacion)
	
	&Mensajes.Clear()
	do 'BobinaMontada'
	
	Sub 'BobinaMontada'
		&BobinaItem = SDBobinaEnPrensado.Udp(&PrensadoId)
		
		if(&BobinaItem.BobinaId > 0)
			do 'CheckeoCarreras'
		else
			&Msj = New()
			&Msj.Id = !'Bobina requerida'
			&Msj.Description = 'Debe montar una bobina en la prensa'
			&Msj.Type = MessageTypes.Warning
			&Mensajes.Add(&Msj)
	        endif
		
        EndSub
        
	
	Sub 'CheckeoCarreras'
		
		&isOK1 = SDCheckeoCarreras.Udp(&PrensadoId, EstadoCarrera.EnProceso)
		&isOK2 = SDCheckeoCarreras.Udp(&PrensadoId, EstadoCarrera.Terminada)
		
		Do case
			//No tiene en proceso
			//Si tiene terminadas
			Case (&isOK1 = true) and (&isOK2 = false)
				&agregar = true
				
				//Si tiene carreras en proceso
				//No tiene terminadas
			Case (&isOK1 = false) and (&isOK2 = true)
				&agregar = true
				
				//No tiene en proceso
				//No tiene terminadas
			Case (&isOK1 = true) and (&isOK2 = true)
				&agregar = true
			Otherwise
				&agregar = true
		EndCase
		
		if(&agregar)
			do 'FactorConsumoKg'
		else
			&Msj = New()
		        &Msj.Id = !'Prensa ocupada'
		        &Msj.Description = 'La prensa esta ocupada con 2 carreras. Debe validar la carrera terminada'
		        &Msj.Type = MessageTypes.Warning
		        &Mensajes.Add(&Msj)
		endif
        EndSub

        Sub 'FactorConsumoKg'
			
		&Factor = Produccion.SDFactorConsumoKg.Udp(&BobinaItem.BobinaKg)
		if(&BobinaItem.BobinaCarreras = &Factor)
			&Msj = New()
			&Msj.Id = !'Bobina consumida'
			&Msj.Description = 'La bobina ha alcanzado su límite de carreras producidas. Sustituir.'
			&Msj.Type = MessageTypes.Warning
			&Mensajes.Add(&Msj)
		else
			if(Not &isOK1)
				SDTerminarCarreraDB.Call()
			endif
		        
			IniciarCarrera.Call(&PrensadoId)
		endif	
		
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, out:&Mensajes);
```

