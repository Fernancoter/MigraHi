# Procedure: SDCarreteItem

- **Module:** Produccion
- **Description:** SDCarrete Item
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Carrete | Variable | GX_BUSCOMP |  | Carrete |
| CarreteId | Parameter | NUMERIC | in | Carrete Id |
| CarreteItem | Parameter | GX_SDT | out | Carrete Item |
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
&Carrete.Load(&CarreteId)
&CarreteItem.FromJson(&Carrete.ToJson())
```

### Rules (Rules)

```genexus
parm(in:&CarreteId, out:&CarreteItem);
```

