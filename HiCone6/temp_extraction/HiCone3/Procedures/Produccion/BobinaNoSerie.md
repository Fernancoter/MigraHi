# Procedure: BobinaNoSerie

- **Module:** Produccion
- **Description:** Bobina No Serie
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaConsecutivo | Variable | NUMERIC |  | Bobina Consecutivo |
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| Day | Variable | NUMERIC |  | Day |
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionFecha | Variable | DATETIME |  | Fecha |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| ExtrusoraId | Variable | NUMERIC |  | Extrusora Id |
| Fecha | Variable | DATE |  | Fecha |
| Month | Variable | NUMERIC |  | Month |
| NoSerie | Variable | VARCHAR |  | No Serie |
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
	
	&NoSerie.SetEmpty()
	&Extrusion.Load(&ExtrusionId)
	&ExtrusoraId = &Extrusion.ExtrusionExtrusoraId
	&Fecha = &Extrusion.ExtrusionFecha.ToDate()
	
	&Day = Day(&Fecha)
	&Month = Month(&Fecha)
	&Year = Year(&Fecha)
	&YearFormat = &Year.ToFormattedString()
	&YearFormat = &YearFormat.Substring(3,2)
	
	&NoSerie = 'B' + '-' + &Day.ToFormattedString() + &Month.ToFormattedString() + &YearFormat + '-' + &ExtrusoraId.ToFormattedString()
	
	//Debugger.Call(NivelDebug.Informativo,'AnioFormatted', &YearFormat)
	
	&Bobina.Load(&BobinaId)
	&BobinaConsecutivo = &Bobina.BobinaNo
	&Bobina.BobinaNoSerie = &NoSerie.Trim() + '-' + &BobinaConsecutivo.ToFormattedString() + &Bobina.BobinaOrigen.Trim()
	&Bobina.Save()
	
	if(&Bobina.Success())
	      //Debugger.Call(NivelDebug.Informativo,'Save' + &Bobina.BobinaNoSerie)
	      commit
	endif
```

### Rules (Rules)

```genexus
parm(in:&BobinaId, in:&ExtrusionId);
```

