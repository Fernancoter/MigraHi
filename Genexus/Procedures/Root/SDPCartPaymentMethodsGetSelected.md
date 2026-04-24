# Procedure: SDPCartPaymentMethodsGetSelected

- **Module:** Root
- **Description:** SDPCart Payment Methods Get Selected
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Selected | Variable | VARCHAR |  | Selected |
| SDPCartPayment | Parameter | GX_SDT | out | SDPCart Payment |
| SDPCartPaymentCollection | Variable | GX_SDT |  | SDPCart Payment Collection |
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
&Selected = SDPWebServerSessionGet(!"SelectedPayment")
&SDPCartPaymentCollection = SDPCartPaymentMethodsGetAvailable()
For &SDPCartPayment in &SDPCartPaymentCollection
	If &Selected = &SDPCartPayment.Id
		exit
	EndIf
EndFor
```

### Rules (Rules)

```genexus
Parm(out:&SDPCartPayment);
```

