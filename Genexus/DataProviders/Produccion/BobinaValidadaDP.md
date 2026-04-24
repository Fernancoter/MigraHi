# DataProvider: BobinaValidadaDP

- **Module:** Produccion
- **Description:** Bobina Validada DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
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
	where not BobinaEstado in (EstadoBobina.EnProceso, EstadoBobina.EnMedicion)
	{
		BobinaId = Notifications.DB.BobinaId
		ExtrusionId = ExtrusionId
		BobinaOrigen = DB.BobinaOrigen
		BobinaHoraInicio = BobinaHoraInicio
		BobinaHoraSalida = BobinaHoraSalida
		BobinaNo = BobinaNo
		BobinaKg = BobinaKg
		BobinaMermaKg = BobinaMermaKg
		BobinaEspesor = BobinaEspesor
		BobinaObservaciones = BobinaObservaciones
		BobinaNoSerie = WWPBaseObjects.DB.BobinaNoSerie
		BobinaEstado = BobinaEstado
		BobinaMotivoMolino = BobinaMotivoMolino
		BobinaProductoId = BobinaProductoId
		BobinaProductoNombre = BobinaProductoNombre
		BobinaCarreras = Notifications.BobinaCarreras
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
parm(in:&ExtrusionId);
```

