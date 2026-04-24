# Procedure: ObtenerSDTEtiquetaBobina

- **Module:** PrinterSD
- **Description:** Obtener SDTEtiqueta Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| EtiquetaBobinaSDT | Parameter | GX_SDT | out | Etiqueta Bobina SDT |
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
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


For each
	Where BobinaId = &BobinaId

	&EtiquetaBobinaSDT.BobinaId = BobinaId
	&EtiquetaBobinaSDT.ExtrusionId = ExtrusionId
	&EtiquetaBobinaSDT.ExtrusionFecha = ExtrusionFecha
	&EtiquetaBobinaSDT.ExtrusionOperadorNombre = ExtrusionOperadorNombre
	&EtiquetaBobinaSDT.BobinaNoSerie = BobinaNoSerie
	&EtiquetaBobinaSDT.BobinaOrigen = BobinaOrigen
	&EtiquetaBobinaSDT.BobinaHoraInicio = BobinaHoraInicio
	&EtiquetaBobinaSDT.BobinaHoraSalida = BobinaHoraSalida
	&EtiquetaBobinaSDT.BobinaNo = BobinaNo
	&EtiquetaBobinaSDT.BobinaKg = BobinaKg
	&EtiquetaBobinaSDT.BobinaMermaKg = BobinaMermaKg
	&EtiquetaBobinaSDT.BobinaEspesor = BobinaEspesor
	&EtiquetaBobinaSDT.BobinaObservaciones = BobinaObservaciones
	&EtiquetaBobinaSDT.BobinaEstado = BobinaEstado
	&EtiquetaBobinaSDT.BobinaCarreras = BobinaCarreras
	&EtiquetaBobinaSDT.BobinaIniciaReposo = BobinaIniciaReposo
	&EtiquetaBobinaSDT.BobinaMinutosEnReposo = BobinaMinutosEnReposo
	&EtiquetaBobinaSDT.BobinaMotivoMolino = BobinaMotivoMolino
	&EtiquetaBobinaSDT.BobinaProductoId = BobinaProductoId
	&EtiquetaBobinaSDT.BobinaProductoNombre = BobinaProductoNombre
	&EtiquetaBobinaSDT.ExtrusionExtrusoraNombre = ExtrusionExtrusoraNombre
	&EtiquetaBobinaSDT.ExtrusionExtrusoraIdTexto = ExtrusionExtrusoraId.ToString().Trim()
	&EtiquetaBobinaSDT.ExtrusionLoteSilo = ExtrusionLoteSilo
	&EtiquetaBobinaSDT.ExtrusionSiloNombre = ExtrusionSiloNombre
	&EtiquetaBobinaSDT.BobinaDesviacionEstandar = BobinaDesviacionEstandar
	&EtiquetaBobinaSDT.BobinaColorEstacion = BobinaColorEstacion

	exit
endfor
```

### Rules (Rules)

```genexus
parm(in:&BobinaId, out:&EtiquetaBobinaSDT);
```

