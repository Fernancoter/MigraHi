# Procedure: GuardarBobina

- **Module:** Produccion
- **Description:** Guardar Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTBobinaItem | Parameter | GX_SDT | in | SDTBobina Item |
| Correcto | Parameter | Boolean | out | Correcto |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| Id | Variable | NUMERIC |  | Id |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| IsNew | Variable | Boolean |  | Is New |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
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
	&Id = &SDTBobinaItem.BobinaId
	&ExtrusionId = &SDTBobinaItem.ExtrusionId
	&Extrusion.Load(&ExtrusionId)

	if(&Id > 0)
		&Bobina.Load(&SDTBobinaItem.BobinaId)
		&Bobina.BobinaMotivoMolino = &SDTBobinaItem.BobinaMotivoMolino
		&IsNew = false
	else
		&Bobina = New()
		&Bobina.BobinaMotivoMolino = MotivoMolino.NoAplica
		&Bobina.BobinaProductoId = &Extrusion.ExtrusionProductoId
		&Bobina.BobinaSiloVirgenId = &SDTBobinaItem.BobinaSiloVirgenId
	        &Bobina.BobinaLoteVirgen = &SDTBobinaItem.BobinaLoteVirgen
	        &Bobina.BobinaSiloMolidoId = &SDTBobinaItem.BobinaSiloMolidoId
		&Bobina.BobinaColorEstacion = ColorEstacion.SinAsignar
		&IsNew = true
	endif

	&Bobina.ExtrusionId = &SDTBobinaItem.ExtrusionId
	&Bobina.BobinaOrigen = &SDTBobinaItem.BobinaOrigen
	&Bobina.BobinaHoraInicio = &SDTBobinaItem.BobinaHoraInicio
	&Bobina.BobinaHoraSalida = &SDTBobinaItem.BobinaHoraSalida
	&Bobina.BobinaNo = &SDTBobinaItem.BobinaNo
	&Bobina.BobinaKg = &SDTBobinaItem.BobinaKg
	&Bobina.BobinaMermaKg = &SDTBobinaItem.BobinaMermaKg
	&Bobina.BobinaEspesor = &SDTBobinaItem.BobinaEspesor
	&Bobina.BobinaColorEstacion = &SDTBobinaItem.BobinaColorEstacion
	&Bobina.BobinaDesviacionEstandar = &SDTBobinaItem.BobinaDesviacionEstandar
	&Bobina.BobinaObservaciones = &SDTBobinaItem.BobinaObservaciones
	&Bobina.BobinaEstado = &SDTBobinaItem.BobinaEstado
	&Bobina.BobinaCarreras = &SDTBobinaItem.BobinaCarreras
	&Bobina.BobinaIniciaReposo = &SDTBobinaItem.BobinaIniciaReposo
	&Bobina.BobinaMinutosEnReposo = &SDTBobinaItem.BobinaMinutosEnReposo
	&Bobina.Save()

	if(&Bobina.Success())
		&BobinaId = &Bobina.BobinaId
		commit

		//Generar NoSerie de la Bobina
		if(&IsNew)
			BobinaNoSerie.Call(&BobinaId, &ExtrusionId)
		endif

		&Correcto = true
	endif
```

### Rules (Rules)

```genexus
parm(in:&SDTBobinaItem,out:&Correcto);
```

