# Procedure: SDPCartProductImages

- **Module:** 
- **Description:** SDPCart Product Images
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Image | Variable | BITMAP |  | Image |
| ProductId | Parameter | VARCHAR | in | Product Id |
| SDPProductDataImage | Variable | GX_SDT |  | SDPProduct Data Image |
| SDPProductDataImages | Parameter | GX_SDT | out | SDPProduct Data Images |
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
// In this sample we will hardcode some product images
if &ProductId = !"cookies"	
	&SDPProductDataImage = new()
	&SDPProductDataImage.Image = sdpressampleproduct1.Link()
	&SDPProductDataImages.Add(&SDPProductDataImage)
	
	&SDPProductDataImage = new()
	&SDPProductDataImage.Image = sdpressampleproduct1_v1.Link()
	&SDPProductDataImages.Add(&SDPProductDataImage)
	
	&SDPProductDataImage = new()
	&SDPProductDataImage.Image = sdpressampleproduct1_v2.Link()
	&SDPProductDataImages.Add(&SDPProductDataImage)
	
	&SDPProductDataImage = new()
	&SDPProductDataImage.Image = sdpressampleproduct1_v3.Link()
	&SDPProductDataImages.Add(&SDPProductDataImage)
EndIf
```

### Rules (Rules)

```genexus
Parm(in:&ProductId, out:&SDPProductDataImages);
```

