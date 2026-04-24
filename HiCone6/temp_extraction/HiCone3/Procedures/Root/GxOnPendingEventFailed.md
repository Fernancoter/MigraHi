# Procedure: GxOnPendingEventFailed

- **Module:** 
- **Description:** Gx On Pending Event Failed
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| PendingEvent | Parameter | GX_SDT | in | Pending Event |
| BCName | Parameter | VARCHAR | in | BCName |
| BCJson | Parameter | LONGVARCHAR | in | BCJson |
| Continue | Parameter | Boolean | out | Continue |
| EventResult | Parameter | GX_SDT | in | Event Result |
| GxSyncroInfo | Parameter | GX_SDT | in | Gx Syncro Info |
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
&Continue = true
```

### Rules (Rules)

```genexus
parm(in: &PendingEvent, in: &BCName, in: &BCJson, in: &EventResult, in:&GxSyncroInfo, out: &Continue);
```

