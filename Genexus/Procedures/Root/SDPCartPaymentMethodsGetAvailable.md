# Procedure: SDPCartPaymentMethodsGetAvailable

- **Module:** Root
- **Description:** SDPCart Payment Methods Get Available
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| SDPCartPayment | Variable | GX_SDT |  | SDPCart Payment |
| SDPCartPaymentCollection | Parameter | GX_SDT | out | SDPCart Payment Collection |
| SessionTxt | Variable | VARCHAR |  | Session Txt |
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
&SessionTxt = &WebSession.Get(!"PaymentMethods")
&SDPCartPaymentCollection.FromJson(&SessionTxt)

If &SDPCartPaymentCollection.Count = 0
	&SDPCartPayment	= new()
	&SDPCartPayment.Id = !"1"
	&SDPCartPayment.VisibleName = !"Visa *****1234"
	&SDPCartPayment.Owner = !"Jhon Doe"
	&SDPCartPayment.Valid = !"Expires on 11/2022"
	&SDPCartPayment.Selected = true
	&SDPCartPaymentCollection.Add(&SDPCartPayment)
	
	&SDPCartPayment	= new()
	&SDPCartPayment.Id = !"2"
	&SDPCartPayment.VisibleName = !"Master *****1234"
	&SDPCartPayment.Owner = !"Jhon Doe"
	&SDPCartPayment.Valid = !"Expires on 10/2022"
	&SDPCartPaymentCollection.Add(&SDPCartPayment)
EndIf
```

### Rules (Rules)

```genexus
Parm(out:&SDPCartPaymentCollection);
```

