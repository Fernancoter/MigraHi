# Procedure: PaletNoSerie

- **Module:** Produccion
- **Description:** No Serie Palet
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| Day | Variable | NUMERIC |  | Day |
| Month | Variable | NUMERIC |  | Month |
| NoSerie | Parameter | VARCHAR | out | No Serie |
| PaletNo | Parameter | NUMERIC | in | Palet No |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoFecha | Parameter | DATE | in | Prensado Fecha |
| PrensadoId | Variable | NUMERIC |  | Prensado Id |
| PrensaId | Parameter | NUMERIC | in | Prensa Id |
| TurnoId | Parameter | NUMERIC | in | Turno Id |
| Year | Variable | NUMERIC |  | Year |
| YearFormat | Variable | CHARACTER |  | Year Format |
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
	
	&Day = Day(&PrensadoFecha)
	&Month = Month(&PrensadoFecha)
	&Year = Year(&PrensadoFecha)
	&YearFormat = &Year.ToFormattedString()
	&YearFormat = &YearFormat.Substring(3,2)
	
	&NoSerie.SetEmpty()
	&NoSerie = 'P' + &PrensaId.ToString().Trim() + 'T' + &TurnoId.ToString().Trim() + '-' + &Day.ToFormattedString() + &Month.ToFormattedString() + &YearFormat + '-' + 'N' + &PaletNo.ToString().Trim()
```

### Rules (Rules)

```genexus
parm(in:&PrensaId, in:&TurnoId, in:&PrensadoFecha, in:&PaletNo, out:&NoSerie);
```

