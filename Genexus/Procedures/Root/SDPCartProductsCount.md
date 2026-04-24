# Procedure: SDPCartProductsCount

- **Module:** Root
- **Description:** SDPCart Products Count
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Count | Parameter | NUMERIC | out | Count |
| ProductsInCart | Variable | GX_SDT |  | Products In Cart |
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
&ProductsInCart = SDPCartProductsList()
&Count = &ProductsInCart.Count
```

### Rules (Rules)

```genexus
Parm(out:&Count);
```

