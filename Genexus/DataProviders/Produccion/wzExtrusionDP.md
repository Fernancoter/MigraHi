# DataProvider: wzExtrusionDP

- **Module:** Produccion
- **Description:** Wizard Extrusion DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Asignado | Variable | Boolean |  | Asignado |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| Fecha | Parameter | DATE | in | Fecha |
| OperadorId | Variable | NUMERIC |  | Operador Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTExtrusion
{        
	SDTExtrusionItem
        Where ExtrusionId > 0
	where ExtrusionExtrusoraId = &ExtrusoraId when &ExtrusoraId > 0
	where ExtrusionTurnoId = &TurnoId when &TurnoId > 0
	where ExtrusionFecha.ToDate() = &Fecha
	where ExtrusionEstado = EstadoExtrusion.Programada
	{
		ExtrusionId = ExtrusionId
		ExtrusionExtrusoraId = ExtrusionExtrusoraId
		ExtrusionExtrusoraNombre = ExtrusionExtrusoraNombre
		ExtrusionTurnoId = ExtrusionTurnoId
		ExtrusionTurnoNombre = ExtrusionTurnoNombre
		ExtrusionFecha = ExtrusionFecha
		ExtrusionCalibre = ExtrusionCalibre
		ExtrusionAncho = ExtrusionAncho
		ExtrusionLongitud = ExtrusionLongitud

		ExtrusionProductoId = ExtrusionProductoId
		ExtrusionProductoNombre = ExtrusionProductoNombre
		ExtrusionProductoTipoMaterial = ExtrusionProductoTipoMaterial
		ExtrusionEstado = ExtrusionEstado
		
		
//		ExtrusionVirgenKg = ExtrusionVirgenKg
//		ExtrusionMolidoKg = ExtrusionMolidoKg
//		ExtrusionOperadorId = ExtrusionOperadorId
//		ExtrusionOperadorNombre = ExtrusionOperadorNombre
//		ExtrusionMeta = ExtrusionMeta
//		ExtrusionLoteSilo = ExtrusionLoteSilo
//		ExtrusionHoraIniciaProceso = ExtrusionHoraIniciaProceso
//		ExtrusionHoraFinProceso = ExtrusionHoraFinProceso
//		ExtrusionSiloId = ExtrusionSiloId
//		ExtrusionSiloNombre = ExtrusionSiloNombre
//		ExtrusionSiloMolidoId = ExtrusionSiloMolidoId
//		ExtrusionSiloMolidoNombre = ExtrusionSiloMolidoNombre
//		ExtrusionRevHusilloVirgen = ExtrusionRevHusilloVirgen
//		ExtrusionRevHusilloMolido = ExtrusionRevHusilloMolido
	}
}
```

### Rules (Rules)

```genexus
parm(in:&ExtrusoraId, in:&TurnoId, in:&Fecha);
```

