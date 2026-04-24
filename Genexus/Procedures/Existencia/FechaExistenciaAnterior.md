# Procedure: FechaExistenciaAnterior

- **Module:** Existencia
- **Description:** Fecha Existencia Anterior
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| RegistroFechaHora | Variable | DATETIME |  | Registro Fecha Hora |
| FechaHoraAnterior | Parameter | DATETIME | out | Fecha Hora Anterior |
| ExistenciaId | Parameter | NUMERIC | in | Existencia Id |
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
	
	for each DB.Existencia
		Order (ExistenciaFechaHora)
		where ExistenciaId > 0
		where Not ExistenciaId = &ExistenciaId
		&FechaHoraAnterior = ExistenciaFechaHora
		Exit
	when none
		&FechaHoraAnterior.SetEmpty()
	endfor
```

### Rules (Rules)

```genexus
parm(in:&ExistenciaId, out:&FechaHoraAnterior);
```

