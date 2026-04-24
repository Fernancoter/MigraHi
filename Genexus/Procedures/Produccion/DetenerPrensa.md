# Procedure: DetenerPrensa

- **Module:** Produccion
- **Description:** Detener Prensa
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDTCarrera | Parameter | GX_SDT | in | SDTCarrera |
| SDTCarreraItem | Variable | GX_SDT |  | SDTCarrera Item |
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
parm(in:&SDTCarrera);
```

