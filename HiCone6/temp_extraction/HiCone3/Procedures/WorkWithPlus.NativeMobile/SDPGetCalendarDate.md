# Procedure: SDPGetCalendarDate

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Calendar Date
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CurrentDate | Variable | GX_SDT |  | Current Date |
| Date | Parameter | DATE | in | Date |
| DateJson | Parameter | VARCHAR | out | Date Json |
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

&CurrentDate = new()
&CurrentDate.Year = &Date.Year()
&CurrentDate.Month = &Date.Month()
&CurrentDate.Day = &Date.Day()
&DateJson = &CurrentDate.ToJson()
```

### Rules (Rules)

```genexus
Parm(in:&Date, out:&DateJson);
```

