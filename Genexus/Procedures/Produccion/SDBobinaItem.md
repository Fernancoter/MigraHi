# Procedure: SDBobinaItem

- **Module:** Produccion
- **Description:** SDBobina Item
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Bobina | Variable | GX_BUSCOMP |  | Bobina |
| BobinaId | Parameter | NUMERIC | in | Bobina Id |
| SDTBobinaItem | Parameter | GX_SDT | out | SDTBobina Item |
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
&Bobina.Load(&BobinaId)
&SDTBobinaItem.FromJson(&Bobina.ToJson())
```

### Rules (Rules)

```genexus
parm(in:&BobinaId, out:&SDTBobinaItem);
```

