# Procedure: CarreteNoSerie

- **Module:** Produccion
- **Description:** Carrete No Serie
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CarreraId | Variable | NUMERIC |  | Carrera Id |
| CarreteNoSerie | Variable | VARCHAR |  | Carrete No Serie |
| Day | Variable | NUMERIC |  | Day |
| DayFormat | Variable | CHARACTER |  | Day Format |
| Fecha | Variable | DATE |  | Fecha |
| FechaFormato | Variable | CHARACTER |  | Fecha Formato |
| Month | Variable | NUMERIC |  | Month |
| MonthFormat | Variable | CHARACTER |  | Month Format |
| NoCarrera | Parameter | NUMERIC | in | No Carrera |
| NoLinea | Parameter | NUMERIC | in | No Linea |
| NoPalet | Variable | NUMERIC |  | No Palet |
| NoSerie | Parameter | VARCHAR | out | No Serie |
| PaletId | Variable | NUMERIC |  | Palet Id |
| Prensado | Variable | GX_BUSCOMP |  | Prensado |
| PrensadoFecha | Variable | DATETIME |  | Prensado Fecha |
| PrensadoId | Parameter | NUMERIC | in | Prensado Id |
| PrensaId | Variable | NUMERIC |  | Prensa Id |
| TurnoId | Variable | NUMERIC |  | Turno Id |
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
	
	&Prensado.Load(&PrensadoId)
	&PrensaId  = &Prensado.PrensadoPrensaId
	&TurnoId = &Prensado.PrensadoTurnoId
	&Fecha = &Prensado.PrensadoFecha.ToDate()
	
	&Day = Day(&Fecha)
	&Month = Month(&Fecha)
	&Year = Year(&Fecha)
	&YearFormat = &Year.ToFormattedString()
	&YearFormat = &YearFormat.Substring(3,2)
	
	&NoSerie.SetEmpty()
	&NoSerie = 'P' + &PrensaId.ToString().Trim() + 'T' + &TurnoId.ToString().Trim() + '-' + &Day.ToFormattedString() + &Month.ToFormattedString() + &YearFormat + '-' + 'C' + &NoCarrera.ToString().Trim() + 'L' + &NoLinea.ToString().Trim()
```

### Rules (Rules)

```genexus
parm(in:&PrensadoId, in:&NoCarrera, in:&NoLinea, out:&NoSerie);
```

