# DataProvider: DPExtrusionResultado

- **Module:** Produccion
- **Description:** DPExtrusion Resultado
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
SDTExtrusionResultado
Where ExtrusionId = &ExtrusionId
{
	ExtrusionResultadoId  = WWPBaseObjects.ExtrusionResultadoId 
ExtrusionResultadoVelLaminadora  = ExtrusionResultadoVelLaminadora 
ExtrusionResultadoVelHusillo  = ExtrusionResultadoVelHusillo 
ExtrusionResultadoBobinasMolino  = DB.ExtrusionResultadoBobinasMolino 
ExtrusionResultadoBobinasReposo  = ExtrusionResultadoBobinasReposo 
ExtrusionResultadoTotalKg  = ExtrusionResultadoTotalKg 
ExtrusionResultadoTotalMermaKg  = ExtrusionResultadoTotalMermaKg 
ExtrusionResultadoCOMBA  = ExtrusionResultadoCOMBA 
ExtrusionResultadoObservaciones  = WWPBaseObjects.ExtrusionResultadoObservaciones 
ExtrusionId  = Notifications.ExtrusionId 
ExtrusionLoteSilo  = ExtrusionLoteSilo 
ExtrusionSiloId  = ExtrusionSiloId 
ExtrusionSiloNombre  = ExtrusionSiloNombre 
ExtrusionRevHusilloVirgen  = ExtrusionRevHusilloVirgen 
ExtrusionRevHusilloMolido  = ExtrusionRevHusilloMolido 
ExtrusionVirgenKg  = ExtrusionVirgenKg 
ExtrusionMolidoKg  = ExtrusionMolidoKg 

}
```

### Rules (Rules)

```genexus
parm(&ExtrusionId);
```

