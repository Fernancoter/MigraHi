# DataProvider: BobinaDisponibleDP

- **Module:** Produccion
- **Description:** Bobina Disponible DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaEstado | Variable | VARCHAR |  | Bobina Estado |
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
	where BobinaEstado in (EstadoBobina.Reposo, EstadoBobina.Disponible, EstadoBobina.Desmontada)
	where WWPBaseObjects.BobinaProductoId = &ProductoId when &ProductoId > 0
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
		BobinaMotivoMolino = BobinaMotivoMolino
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
parm(in:&ExtrusionId, in:&ProductoId);
```

