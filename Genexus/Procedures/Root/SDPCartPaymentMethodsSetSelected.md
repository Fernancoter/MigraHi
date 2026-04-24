# Procedure: SDPCartPaymentMethodsSetSelected

- **Module:** Root
- **Description:** SDPCart Payment Methods Set Selected
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Selected | Parameter | VARCHAR | in | Selected |
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
WorkWithPlus.NativeMobile.SDPWebServerSessionSet(!"SelectedPayment", &Selected)
```

### Rules (Rules)

```genexus
Parm(in:&Selected);
```

