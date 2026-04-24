# Procedure: SDPCartPaymentMethodsAddNew

- **Module:** 
- **Description:** SDPCart Payment Methods Add New
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CardInformation | Variable | GX_SDT |  | Card Information |
| CardInformationJson | Parameter | VARCHAR | in | Card Information Json |
| SDPCartPayment | Variable | GX_SDT |  | SDPCart Payment |
| SDPCartPaymentCollection | Variable | GX_SDT |  | SDPCart Payment Collection |
| SessionTxt | Variable | VARCHAR |  | Session Txt |
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
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
&CardInformation.FromJson(&CardInformationJson)

&SDPCartPaymentCollection = SDPCartPaymentMethodsGetAvailable()

&SDPCartPayment	= new()
&SDPCartPayment.Id = &CardInformation.CardNumber
&SDPCartPayment.VisibleName = &CardInformation.CardType.ToFormattedString() + !" ***** " + &CardInformation.CardNumber.Substring(13)
&SDPCartPayment.Owner = &CardInformation.CardHolderName
&SDPCartPayment.Valid = !"Expires on " + &CardInformation.ExpiryMonth.ToFormattedString() + !"/" + &CardInformation.ExpiryYear.ToFormattedString()
&SDPCartPaymentCollection.Add(&SDPCartPayment)

&SessionTxt = &SDPCartPaymentCollection.ToJson()
&WebSession.Set(!"PaymentMethods", &SessionTxt)
```

### Rules (Rules)

```genexus
Parm(in:&CardInformationJson);
```

