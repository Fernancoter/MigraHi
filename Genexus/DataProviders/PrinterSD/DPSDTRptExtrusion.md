# DataProvider: DPSDTRptExtrusion

- **Module:** PrinterSD
- **Description:** DPSDTRpt Extrusion
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
SDTRptExtrusion
Where ExtrusionId = &ExtrusionId
{
	ExtrusionId  = ExtrusionId 
	ExtrusionExtrusoraId  = ExtrusionExtrusoraId 
	ExtrusionExtrusoraNombre  = ExtrusionExtrusoraNombre 
	ExtrusionTurnoId  = ExtrusionTurnoId 
	ExtrusionTurnoNombre  = ExtrusionTurnoNombre 
	ExtrusionProductoId  = ExtrusionProductoId 
	ExtrusionProductoNombre  = WWPBaseObjects.Notifications.ExtrusionProductoNombre 
	ExtrusionProductoTipoMaterial  = ExtrusionProductoTipoMaterial 
	ExtrusionFecha  = ExtrusionFecha 
	ExtrusionCalibre  = ExtrusionCalibre 
	ExtrusionAncho  = ExtrusionAncho 
	ExtrusionLongitud  = ExtrusionLongitud 
	ExtrusionVirgenKg  = ExtrusionVirgenKg 
	ExtrusionMeta  = ExtrusionMeta 
	ExtrusionMolidoKg  = ExtrusionMolidoKg 
	ExtrusionRevHusilloVirgen  = ExtrusionRevHusilloVirgen 
	ExtrusionRevHusilloMolido  = ExtrusionRevHusilloMolido 
	ExtrusionEstado  = ExtrusionEstado 
	ExtrusionOperadorId  = ExtrusionOperadorId 
	ExtrusionOperadorNombre  = ExtrusionOperadorNombre 
	ExtrusionHoraIniciaProceso  = ExtrusionHoraIniciaProceso 
	ExtrusionHoraFinProceso  = ExtrusionHoraFinProceso 
	ExtrusionLoteSilo  = ExtrusionLoteSilo 
	ExtrusionMotivoAnticipado  = ExtrusionMotivoAnticipado 
	ExtrusionResultadoBobinasReposoTotales  = ExtrusionResultadoBobinasReposoTotales 
	ExtrusionSiloId  = ExtrusionSiloId 
	ExtrusionSiloNombre  = ExtrusionSiloNombre 
	ExtrusionSiloMolidoId  = ExtrusionSiloMolidoId 
	ExtrusionSiloMolidoNombre  = ExtrusionSiloMolidoNombre 
	ExtrusionBobinas  = ExtrusionBobinas 

}
```

### Rules (Rules)

```genexus
parm(&ExtrusionId);
```

