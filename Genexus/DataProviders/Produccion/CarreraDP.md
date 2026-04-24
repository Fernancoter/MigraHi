# DataProvider: CarreraDP

- **Module:** Produccion
- **Description:** Carrera DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PBobinaId | Variable | NUMERIC |  | Bobina Id |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDTCarrera
{
   SDTCarreraItem
   where CarreraId > 0
   where InicioPrensadoBobinaId > 0
   where InicioPBPrensadoId = &PrensadoId when &PrensadoId > 0
   {

	CarreraId = CarreraId
	CarreraNo = CarreraNo
	CarreraEstado = CarreraEstado
	CarreraPaletTerminado = CarreraPaletTerminado
	CarreraFechaRegistro = CarreraFechaRegistro
	CarreraFechaValidacion = WWPBaseObjects.CarreraFechaValidacion
	CarreraTroquel = Notifications.CarreraTroquel
	InicioPrensadoBobinaId = InicioPrensadoBobinaId
	InicioPBPrensadoId = InicioPBPrensadoId
   }	
}
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId);
```

