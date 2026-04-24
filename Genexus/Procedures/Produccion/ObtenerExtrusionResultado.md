# Procedure: ObtenerExtrusionResultado

- **Module:** Produccion
- **Description:** Obtener Extrusion Resultado
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
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensadoResultado | Variable | GX_BUSCOMP |  | Prensado Resultado |
| PRId | Variable | NUMERIC |  | PRId |
| CarreteMillar | Variable | NUMERIC |  | Carrete Millar |
| ERId | Parameter | NUMERIC | out | ERId |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| TotalKg | Variable | NUMERIC |  | Total Kg |
| TotalMermaKg | Variable | NUMERIC |  | Total Merma Kg |
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| BobinaMermakg | Variable | NUMERIC |  | Bobina Merma Kg |
| BobinaKg | Variable | NUMERIC |  | Bobina Kg |
| ExtrusionResultado | Variable | GX_BUSCOMP |  | Extrusion Resultado |
| BobinasReposo | Variable | NUMERIC |  | Bobinas Reposo |
| BobinasMolino | Variable | NUMERIC |  | Bobinas Molino |
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
	
	
	for each DB.ExtrusionResultado
		where ExtrusionResultadoId > 0
		where ExtrusionId = &ExtrusionId
		&ERId = ExtrusionResultadoId
		Exit
	when none
		
		do 'ResumenBobinas'
		
		&ExtrusionResultado = New()
		&ExtrusionResultado.ExtrusionId = &ExtrusionId
		&ExtrusionResultado.ExtrusionResultadoBobinasMolino = &BobinasMolino
		&ExtrusionResultado.ExtrusionResultadoBobinasReposo = &BobinasReposo
		&ExtrusionResultado.ExtrusionResultadoTotalKg = &TotalKg
		&ExtrusionResultado.ExtrusionResultadoTotalMermaKg = &TotalMermaKg
		&ExtrusionResultado.Save()
		
		if(&ExtrusionResultado.Success())
			&ERId = &ExtrusionResultado.ExtrusionResultadoId
			commit
		endif
		
	endfor

	Sub 'ResumenBobinas'
		
		&BobinasMolino = 0
		&BobinasReposo = 0
		&TotalKg = 0
		&TotalMermaKg = 0
		
		for each DB.Bobina
			where BobinaId > 0
			where DB.ExtrusionId = &ExtrusionId
			&BobinaEstado = BobinaEstado
			&BobinaKg = BobinaKg
			&BobinaMermaKg = BobinaMermaKg
			
			Do Case 
				Case &BobinaEstado = EstadoBobina.Molino
					&BobinasMolino += 1
					&TotalMermaKg += &BobinaMermaKg
				Case &BobinaEstado = EstadoBobina.Reposo
					&BobinasReposo += 1
					&TotalKg += &BobinaKg
			EndCase
		endfor
	
	EndSub
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out:&ERId);
```

