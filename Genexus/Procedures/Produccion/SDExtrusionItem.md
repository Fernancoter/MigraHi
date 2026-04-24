# Procedure: SDExtrusionItem

- **Module:** Produccion
- **Description:** SDExtrusion Item
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Extrusion | Variable | GX_BUSCOMP |  | Extrusion |
| ExtrusionId | Parameter | NUMERIC | in | Extrusion Id |
| SDTExtrusionItem | Parameter | GX_SDT | out | SDTExtrusion Item |
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
    &Extrusion.Load(&ExtrusionId)
    &SDTExtrusionItem.FromJson(&Extrusion.ToJson())
```

### Rules (Rules)

```genexus
parm(in:&ExtrusionId, out:&SDTExtrusionItem);
```

