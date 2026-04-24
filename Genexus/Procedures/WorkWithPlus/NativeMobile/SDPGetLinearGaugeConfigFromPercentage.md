# Procedure: SDPGetLinearGaugeConfigFromPercentage

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Linear Gauge Config From Percentage
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GaugeData | Parameter | VARCHAR | out | Gauge Data |
| Percentage | Parameter | NUMERIC | in | Percentage |
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
	/*
	&GaugeSDT.Height = 12
	&GaugeSDT.MaxValue = 100
	&GaugeSDT.MinValue = 0
	&GaugeSDT.Value = &Percentage
	&GaugeSDT.ShowValue = false
	&GaugeSDT.ShowMinMax = false
	
	&GaugeSDTRange = new()
	&GaugeSDTRange.Color = !"#9a9a9a"
	&GaugeSDTRange.Length = &Percentage
	&GaugeSDT.Ranges.Add(&GaugeSDTRange)
	
	&GaugeSDTRange = new()
	&GaugeSDTRange.Color = !"#e4e4e4"
	&GaugeSDTRange.Length = 100 - &Percentage
	&GaugeSDT.Ranges.Add(&GaugeSDTRange)
	
	&GaugeData = &GaugeSDT.ToJson()	
	*/

	&GaugeData = format(!'{"Type":"","Title":"","Height":12,"Width":0,"MaxValue":100,"MinValue":0,"Value":%1,"Thickness":0,"ShowMinMax":false,"ShowValue":false,"Ranges":[{"Color":"#9a9a9a","Name":"","Length":%1},{"Color":"#e4e4e4","Name":"","Length":%2}]}', &Percentage, 100-&Percentage)
```

### Rules (Rules)

```genexus
Parm(in:&Percentage, out:&GaugeData);
```

