# Procedure: SDPCartProductsList

- **Module:** 
- **Description:** SDPCart Products List
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| ProductsInCart | Parameter | GX_SDT | out | Products In Cart |
| ProductsInCartTxt | Variable | VARCHAR |  | Products In Cart Txt |
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
&ProductsInCartTxt = &WebSession.Get(!"ProductsInCart")
&ProductsInCart.FromJson(&ProductsInCartTxt)
```

### Rules (Rules)

```genexus
Parm(out:&ProductsInCart);
```

