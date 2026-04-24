# Procedure: SDPCartAddressGetAvailable

- **Module:** Root
- **Description:** SDPCart Address Get Available
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| WebSession | Variable | GX_USRDEFTYP |  | Web Session |
| SDPCartUserAddress | Variable | GX_SDT |  | SDPCart User Address |
| SDPUserAddressCollection | Parameter | GX_SDT | out | SDPUser Address Collection |
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
&SessionTxt = &WebSession.Get(!"UserAddressList")
&SDPUserAddressCollection.FromJson(&SessionTxt)

If &SDPUserAddressCollection.Count = 0
	&SDPCartUserAddress	= new()
	&SDPCartUserAddress.Id = !"1"
	&SDPCartUserAddress.PersonName = !"Jhon Doe"
	&SDPCartUserAddress.AddressLine1 = !"Evergreen Terrace 1234"
	&SDPCartUserAddress.AddressLine2 = !"Ap. 101"
	&SDPCartUserAddress.CountryName = !"United States"
	&SDPCartUserAddress.StateName = !"Florida"
	&SDPCartUserAddress.PhoneNumber = !"5-555-555-5555"	
	&SDPUserAddressCollection.Add(&SDPCartUserAddress)	
EndIf
```

### Rules (Rules)

```genexus
Parm(out:&SDPUserAddressCollection);
```

