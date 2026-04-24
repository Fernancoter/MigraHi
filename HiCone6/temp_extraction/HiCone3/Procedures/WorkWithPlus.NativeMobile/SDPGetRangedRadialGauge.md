# Procedure: SDPGetRangedRadialGauge

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Ranged Radial Gauge
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| GaugeRegions | Parameter | LONGVARCHAR | out | Gauge Regions |
| SDPGaugeConfig | Variable | GX_SDT |  | SDPGauge Config |
| Value | Parameter | NUMERIC | in | Value |
| Text | Parameter | VARCHAR | in | Text |
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
	&SDPGaugeConfig = new()
	&SDPGaugeConfig.Value = &Value
	If &Text.Length() > 0
		&SDPGaugeConfig.Text = &Text
	Else
		&SDPGaugeConfig.Text = &Value.ToString().Trim() + !"%"
	EndIf
	
	&SDPGaugeConfig.Width = 200
	&SDPGaugeConfig.Height = 200
	&SDPGaugeConfig.Range1ColorStart = !"#007700" 
	&SDPGaugeConfig.Range1ColorEnd = !"#009900" 
	&SDPGaugeConfig.Range2ColorStart = !"#009900" 
	&SDPGaugeConfig.Range2ColorEnd = !"#00ff00" 
	&SDPGaugeConfig.Range3ColorStart = !"#00ff00" 
	&SDPGaugeConfig.Range3ColorEnd = !"#ffff00" 
	&SDPGaugeConfig.Range4ColorStart = !"#ffff00" 
	&SDPGaugeConfig.Range4ColorEnd = !"#ff0000" 
	&SDPGaugeConfig.Range5ColorStart = !"#ff0000" 
	&SDPGaugeConfig.Range5ColorEnd = !"#aa0000" 
	&GaugeRegions = WorkWithPlus.NativeMobile.SDPGetRangedRadialGaugeFromConfig(&SDPGaugeConfig)
```

### Rules (Rules)

```genexus
Parm(in:&Value, in:&Text, out:&GaugeRegions);
```

