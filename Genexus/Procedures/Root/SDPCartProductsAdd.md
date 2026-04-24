# Procedure: SDPCartProductsAdd

- **Module:** Root
- **Description:** SDPCart Products Add
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| Count | Parameter | NUMERIC | in | Count |
| ProductId | Parameter | VARCHAR | in | Product Id |
| ProductsInCart | Variable | GX_SDT |  | Products In Cart |
| ProductsInCartItem | Variable | GX_SDT |  | Products In Cart Item |
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
&ProductsInCartItem = new()
&ProductsInCartItem.ProductId = &ProductId
&ProductsInCartItem.Count = &Count

&ProductsInCartTxt = &WebSession.Get(!"ProductsInCart")
&ProductsInCart.FromJson(&ProductsInCartTxt)
&ProductsInCart.Add(&ProductsInCartItem)
&ProductsInCartTxt = &ProductsInCart.ToJson()
&WebSession.Set(!"ProductsInCart", &ProductsInCartTxt)
```

### Rules (Rules)

```genexus
Parm(in:&ProductId, in:&Count);
```

