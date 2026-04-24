# Procedure: SDEscanearBobina

- **Module:** Produccion
- **Description:** SDEscanear Bobina
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Variable | NUMERIC |  | Bobina Id |
| BobinaItem | Parameter | GX_SDT | out | Bobina Item |
| BobinaNoSerie | Parameter | VARCHAR | in | Bobina No Serie |
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
	
	for each DB.Bobina
		where BobinaId > 0
		where BobinaNoSerie.Trim() = &BobinaNoSerie.Trim()
		where BobinaEstado in (EstadoBobina.Reposo, EstadoBobina.Disponible, Produccion.EstadoBobina.Desmontada)
		&BobinaId = BobinaId
		ReposoTranscurridoBobina.Call(&BobinaId)
		
		&Bobina.Load(&BobinaId)
		&BobinaItem = New()
		&BobinaItem.FromJson(&Bobina.ToJson())
		Exit
	endfor
```

### Rules (Rules)

```genexus
parm(in:&BobinaNoSerie, out:&BobinaItem);
```

