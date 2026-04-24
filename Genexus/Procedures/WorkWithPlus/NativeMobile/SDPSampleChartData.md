# Procedure: SDPSampleChartData

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPSample Chart Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDPlusChartDataSample | Variable | GX_SDT |  | SDPlus Chart Data Sample |
| SDPlusChartDataSampleCollection | Parameter | GX_SDT | out | SDPlus Chart Data Sample Collection |
| UseRandom | Parameter | Boolean | in | Use Random |
| Random | Variable | NUMERIC |  | Random |
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
	&Random = 1
	
	if &UseRandom
		&Random = Random()
	EndIf
	&SDPlusChartDataSample = new()
	&SDPlusChartDataSample.Category = !"Uruguay"
	&SDPlusChartDataSample.Serie1 = 120 * &Random
	&SDPlusChartDataSampleCollection.Add(&SDPlusChartDataSample)
	
	if &UseRandom
		&Random = Random()
	EndIf
	&SDPlusChartDataSample = new()
	&SDPlusChartDataSample.Category = !"Brasil"
	&SDPlusChartDataSample.Serie1 = 140 * &Random
	&SDPlusChartDataSampleCollection.Add(&SDPlusChartDataSample)
	
	if &UseRandom
		&Random = Random()
	EndIf
	&SDPlusChartDataSample = new()
	&SDPlusChartDataSample.Category = !"Spain"
	&SDPlusChartDataSample.Serie1 = 100 * &Random
	&SDPlusChartDataSampleCollection.Add(&SDPlusChartDataSample)
	
	if &UseRandom
		&Random = Random()
	EndIf
	&SDPlusChartDataSample = new()
	&SDPlusChartDataSample.Category = !"Argentina"
	&SDPlusChartDataSample.Serie1 = 90 * &Random
	&SDPlusChartDataSampleCollection.Add(&SDPlusChartDataSample)
```

### Rules (Rules)

```genexus
Parm(in:&UseRandom, out:&SDPlusChartDataSampleCollection);
```

