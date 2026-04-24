# DataProvider: BobinaDP

- **Module:** Produccion
- **Description:** Bobina DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaEstado | Parameter | VARCHAR | in | Bobina Estado |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ProductoId | Parameter | NUMERIC | in | Producto Id |
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
	where BobinaEstado = &BobinaEstado when Not &BobinaEstado.IsEmpty()
	where BobinaProductoId = &ProductoId when &ProductoId > 0
	{
		BobinaId = BobinaId
		ExtrusionId = ExtrusionId
		BobinaOrigen = BobinaOrigen
		BobinaHoraInicio = BobinaHoraInicio
		HoraInicio = BobinaHoraInicio
		BobinaHoraSalida = BobinaHoraSalida
		HoraSalida = BobinaHoraSalida
		BobinaNo = BobinaNo
		BobinaDesviacionEstandar = BobinaDesviacionEstandar
		BobinaColorEstacion = BobinaColorEstacion
		BobinaKg = BobinaKg
		BobinaKgTexto = trim(BobinaKg.ToString())
		BobinaMermaKg = BobinaMermaKg
		BobinaMermaKgTexto = trim(BobinaMermaKg.ToString())
		BobinaEspesor = BobinaEspesor
		BobinaObservaciones = BobinaObservaciones
		BobinaNoSerie = BobinaNoSerie
		BobinaEstado = BobinaEstado
		BobinaMotivoMolino = BobinaMotivoMolino
		MotivoObservaciones = iif(BobinaMotivoMolino = MotivoMolino.NoAplica,'',BobinaMotivoMolino) + ' ' + BobinaObservaciones
		BobinaProductoId = BobinaProductoId
		BobinaProductoNombre = BobinaProductoNombre
		BobinaCarreras = BobinaCarreras
		BobinaIniciaReposo = BobinaIniciaReposo
		BobinaMinutosEnReposo = BobinaMinutosEnReposo
		BobinaEtiqueta = '<b>' + BobinaNo.ToFormattedString() + BobinaOrigen.Trim() + '</b>'
	}
}
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, in:&BobinaEstado, in:&ProductoId);
```

