# Procedure: SDPGetCalendarDateFromNr

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPGet Calendar Date From Nr
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CurrentDate | Variable | GX_SDT |  | Current Date |
| DateJson | Parameter | VARCHAR | out | Date Json |
| Day | Parameter | NUMERIC | in | Day |
| Month | Parameter | NUMERIC | in | Month |
| Year | Parameter | NUMERIC | in | Year |
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
&CurrentDate.Year = &Year
&CurrentDate.Month = &Month
&CurrentDate.Day = &Day
&DateJson = &CurrentDate.ToJson()
```

### Rules (Rules)

```genexus
Parm(in:&Year, in:&Month, in:&Day, out:&DateJson);
```

