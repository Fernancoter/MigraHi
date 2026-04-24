# DataProvider: DPBobinaPorExtrusion

- **Module:** Produccion
- **Description:** DPBobina Por Extrusion
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ExtrusionId | Parameter | NUMERIC | inout | Extrusion Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTBobina
Where ExtrusionId = &ExtrusionId
{
	SDTBobinaItem
	{
		BobinaId  = BobinaId 
		ExtrusionId  = ExtrusionId 
		BobinaOrigen  = BobinaOrigen 
		BobinaHoraInicio  = BobinaHoraInicio 
		BobinaHoraSalida  = BobinaHoraSalida 
		BobinaNo  = BobinaNo 
		BobinaNoSerie  = BobinaNoSerie 
		BobinaKg  = BobinaKg 
		BobinaMermaKg  = BobinaMermaKg 
		BobinaEspesor  = BobinaEspesor 
		BobinaObservaciones  = BobinaObservaciones 
		BobinaEstado  = BobinaEstado 
		BobinaMotivoMolino  = BobinaMotivoMolino 
		BobinaProductoId  = BobinaProductoId 
		BobinaProductoNombre  = BobinaProductoNombre 
		BobinaCarreras  = BobinaCarreras 
		BobinaIniciaReposo  = BobinaIniciaReposo 
		BobinaMinutosEnReposo  = BobinaMinutosEnReposo 
		//BobinaMolino  = BobinaMolino 
		//BobinaEtiqueta  = BobinaEtiqueta 

	}
}
```

### Rules (Rules)

```genexus
parm(&ExtrusionId);
```

