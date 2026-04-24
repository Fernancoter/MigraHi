# Procedure: SDPGetProductData

- **Module:** 
- **Description:** SDPGet Product Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDPProductDataListAll | Variable | GX_SDT |  | SDPProduct Data List All |
| SDPProductData | Parameter | GX_SDT | out | SDPProduct Data |
| ProductId | Parameter | VARCHAR | in | Product Id |
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
&SDPProductDataListAll = WorkWithPlus.NativeMobile.SDPProductsListDP()

For &SDPProductData in &SDPProductDataListAll
	If &SDPProductData.Id = &ProductId
		exit
	EndIf	
EndFor
```

### Rules (Rules)

```genexus
Parm(in:&ProductId, out:&SDPProductData);
```

