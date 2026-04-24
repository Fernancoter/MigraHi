# Procedure: SDPCartAddressGetSelected

- **Module:** Root
- **Description:** SDPCart Address Get Selected
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDPUserAddressCollection | Variable | GX_SDT |  | SDPUser Address Collection |
| SDPCartUserAddress | Parameter | GX_SDT | out | SDPCart User Address |
| Selected | Variable | VARCHAR |  | Selected |
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
&Selected = SDPWebServerSessionGet(!"SelectedAddress")
&SDPUserAddressCollection = SDPCartAddressGetAvailable()
For &SDPCartUserAddress in &SDPUserAddressCollection
	If &Selected = &SDPCartUserAddress.Id
		exit
	EndIf
EndFor
```

### Rules (Rules)

```genexus
Parm(out:&SDPCartUserAddress);
```

