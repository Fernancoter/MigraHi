# Procedure: SDPCartProductsRemove

- **Module:** Root
- **Description:** SDPCart Products Remove
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
| Index | Variable | NUMERIC |  | Index |
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
&Index = 0
For &ProductsInCartItem in &ProductsInCart
	&Index = &Index + 1
	If &ProductId = &ProductsInCartItem.ProductId
		&ProductsInCart.Remove(&Index)
		exit
	EndIf
EndFor
&ProductsInCartTxt = &ProductsInCart.ToJson()
&WebSession.Set(!"ProductsInCart", &ProductsInCartTxt)
```

### Rules (Rules)

```genexus
Parm(in:&ProductId, in:&Count);
```

