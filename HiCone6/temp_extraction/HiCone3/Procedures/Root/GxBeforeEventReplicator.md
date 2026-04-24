# Procedure: GxBeforeEventReplicator

- **Module:** 
- **Description:** Gx Before Event Replicator
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| EventResults | Parameter | GX_SDT | inout | Event Results |
| GxPendingEvents | Parameter | GX_SDT | inout | Gx Pending Events |
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
// Empty block or parsing failed
```

### Rules (Rules)

```genexus
parm(inout:&GxPendingEvents, in:&GxSyncroInfo, inout:&EventResults);
```

