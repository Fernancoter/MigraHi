# DataProvider: ExtrusionDP

- **Module:** Produccion
- **Description:** Extrusion DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Asignado | Parameter | Boolean | in | Asignado |
| ExtrusoraId | Parameter | NUMERIC | in | Extrusora Id |
| Fecha | Parameter | DATE | in | Fecha |
| OperadorId | Parameter | NUMERIC | in | Operador Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTExtrusion
{        
//	SDTExtrusionItem
//        Where ExtrusionId > 0
//        where ExtrusionOperadorId = &OperadorId and ExtrusionEstado in (EstadoExtrusion.Programada) when &Asignado = true and &OperadorId > 0
//	where (ExtrusionOperadorId.IsNull() or ExtrusionOperadorId <> &OperadorId) and ExtrusionEstado in (EstadoExtrusion.Programada, EstadoExtrusion.Intermedia) when &Asignado = false
//	where ExtrusionExtrusoraId = &ExtrusoraId when &ExtrusoraId > 0 and &Asignado = false
//	where ExtrusionTurnoId = &TurnoId when &TurnoId > 0 and &Asignado = false
//	where ExtrusionFecha.ToDate() = &Fecha.ToDate() when not &Fecha.IsEmpty()

        SDTExtrusionItem
        Where ExtrusionId > 0
	where ExtrusionEstado in (EstadoExtrusion.Programada, EstadoExtrusion.Intermedia)
	where ExtrusionExtrusoraId = &ExtrusoraId when &ExtrusoraId > 0
	where ExtrusionTurnoId = &TurnoId when &TurnoId > 0
	where ExtrusionFecha.ToDate() = &Fecha

	{
		ExtrusionId = ExtrusionId
		ExtrusionExtrusoraId = ExtrusionExtrusoraId
		ExtrusionExtrusoraNombre = ExtrusionExtrusoraNombre
		ExtrusionTurnoId = ExtrusionTurnoId
		ExtrusionTurnoNombre = Notifications.ExtrusionTurnoNombre
		ExtrusionFecha = ExtrusionFecha
		ExtrusionCalibre = ExtrusionCalibre
		ExtrusionAncho = ExtrusionAncho
		ExtrusionLongitud = ExtrusionLongitud

		ExtrusionProductoId = ExtrusionProductoId
		ExtrusionProductoNombre = ExtrusionProductoNombre
		ExtrusionProductoTipoMaterial = Produccion.ExtrusionProductoTipoMaterial
		ExtrusionEstado = ExtrusionEstado
		ExtrusionLotePaqueteAditivos = ExtrusionLotePaqueteAditivos
		
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
//parm(in:&OperadorId, in:&ExtrusoraId, in:&TurnoId, in:&Fecha, in:&Asignado);
parm(in:&ExtrusoraId, in:&TurnoId, in:&Fecha);
```

