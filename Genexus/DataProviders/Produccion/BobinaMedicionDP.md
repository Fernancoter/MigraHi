# DataProvider: BobinaMedicionDP

- **Module:** Produccion
- **Description:** Bobina Medicion DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaMolino | Parameter | Boolean | in | Bobina Molino |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTBobina
{
	SDTBobinaItem
	where ExtrusionId = &ExtrusionId when &ExtrusionId > 0
	where BobinaEstado = EstadoBobina.EnMedicion
	{
		BobinaId = BobinaId
		ExtrusionId = ExtrusionId
		BobinaOrigen = BobinaOrigen
		BobinaHoraInicio = BobinaHoraInicio
		BobinaHoraSalida = BobinaHoraSalida
		BobinaNo = BobinaNo
		BobinaKg = BobinaKg
		BobinaMermaKg = BobinaMermaKg
		BobinaEspesor = BobinaEspesor
		BobinaObservaciones = BobinaObservaciones
		BobinaNoSerie = BobinaNoSerie
		BobinaEstado = BobinaEstado
		BobinaMolino = &BobinaMolino
		BobinaMotivoMolino = BobinaMotivoMolino
		BobinaProductoId = BobinaProductoId
		BobinaProductoNombre = BobinaProductoNombre
		BobinaCarreras = BobinaCarreras
		BobinaDesviacionEstandar = BobinaDesviacionEstandar
		BobinaColorEstacion = BobinaColorEstacion
		BobinaIniciaReposo = BobinaIniciaReposo
		BobinaMinutosEnReposo = BobinaMinutosEnReposo
		BobinaEtiqueta = '<b>' + BobinaNo.ToFormattedString() + BobinaOrigen.Trim() + '</b>'
	}
}
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&BobinaMolino);
```

