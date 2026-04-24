# DataProvider: DPInterrupcionesPorExtrusion

- **Module:** Produccion
- **Description:** DPInterrupciones Por Extrusion
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
SDTInterrupciones
Where ExtrusionId = &ExtrusionId
{
	SDTInterrupcionesItem
	{
		ExtrusionId = ExtrusionId
		InterrupcionId = InterrupcionId
		InterrupcionMotivo = InterrupcionMotivo
		DownTimeCodeId = DownTimeCodeId
		DownTimeCodeName = WWPBaseObjects.DownTimeCodeName
		InterrupcionHoraInicio = InterrupcionHoraInicio
		InterrupcionHoraFin = Subscriptions.InterrupcionHoraFin
		InterrupcionConcluida = InterrupcionConcluida
		InterrupcionTiempo = InterrupcionTiempo
	}
}
```

### Rules (Rules)

```genexus
parm(&ExtrusionId);
```

