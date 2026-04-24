# Procedure: SDPGetRadialGaugeLight

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Radial Gauge Light
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HTML | Parameter | LONGVARCHAR | out | HTML |
| ProgressColor | Parameter | CHARACTER | in | Progress Color |
| Value | Parameter | NUMERIC | in | Value |
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
 &HTML = SDPGetRadialGauge(&Value, !"", &ProgressColor, !"", !"", true)
```

### Rules (Rules)

```genexus
Parm(in:&Value, in:&ProgressColor, out:&HTML);
```

