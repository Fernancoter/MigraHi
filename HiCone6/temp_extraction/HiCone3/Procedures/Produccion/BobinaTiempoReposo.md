# Procedure: BobinaTiempoReposo

- **Module:** Produccion
- **Description:** Bobina Tiempo Reposo
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| Diferencia | Variable | NUMERIC |  | Diferencia |
| EPId | Variable | NUMERIC |  | EPId |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionId | Variable | NUMERIC |  | Extrusion Id |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| HoraIniciaReposo | Variable | DATETIME |  | Hora Inicia Reposo |
| Now | Variable | DATETIME |  | Now |
| ProductoId | Variable | NUMERIC |  | Producto Id |
| TiempoReposo | Parameter | NUMERIC | in | Tiempo Reposo |
| ReposoEnMinutos | Variable | NUMERIC |  | Reposo En Minutos |
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
	&Now = Now()
	
	&Bobina.Load(&BobinaId)
	&HoraIniciaReposo = &Bobina.BobinaIniciaReposo
	&Diferencia = &Now.Difference(&HoraIniciaReposo)
	&ReposoEnMinutos = &Diferencia / 60
		
	if(&ReposoEnMinutos >= &TiempoReposo)
		&Bobina.BobinaEstado = EstadoBobina.Disponible
	endif

        &Bobina.BobinaMinutosEnReposo = &ReposoEnMinutos
	&Bobina.Save()
	
	if(&Bobina.Success())
	        commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&BobinaId, in:&TiempoReposo);
```

