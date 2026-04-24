# Procedure: SDInterrupcionEnCurso

- **Module:** Produccion
- **Description:** SDInterrupcion En Curso
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Interrupcion | Variable | GX_BUSCOMP |  | Interrupcion |
| Temporizador | Variable | NUMERIC |  | Temporizador |
| Id | Variable | NUMERIC |  | Id |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| IntEnCurso | Parameter | NUMERIC | out | Int En Curso |
| Now | Variable | DATETIME |  | Now |
| HoraInicio | Variable | DATETIME |  | Hora Inicio |
| Maquina | Parameter | NUMERIC | in | Maquina |
| MaquinaId | Variable | NUMERIC |  | Maquina Id |
| ProcesoId | Parameter | NUMERIC | in | Proceso Id |
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

	&IntEnCurso = 0
	Do Case
		Case &Maquina = AreaMaquina.Extrusora
			For each DB.ExtrusionInterrupcion order (ExtrusionId)
				where ExtrusionId > 0
				where ExtrusionId = &ProcesoId
				where InterrupcionId > 0
				where InterrupcionConcluida = False
				&HoraInicio = InterrupcionHoraInicio
				&IntEnCurso = InterrupcionId
				Exit
			EndFor

		Case &Maquina = AreaMaquina.Prensa
			For each DB.PrensadoInterrupcion order (PrensadoId)
				where PrensadoId > 0
				where PrensadoId = &ProcesoId
				where InterrupcionId > 0
				where InterrupcionConcluida = False
				&HoraInicio = InterrupcionHoraInicio
				&IntEnCurso = InterrupcionId
				Exit
			EndFor
	EndCase
```

### Rules (Rules)

```genexus
parm(in:&Maquina, in:&ProcesoId, out:&IntEnCurso);
```

