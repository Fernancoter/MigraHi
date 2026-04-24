# DataProvider: SDPProductsListDP

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPProducts List DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Image | Variable | BITMAP |  | Image |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
//Type:
//		0 = 2 items per row (information for both options must be provided)
//		1 = 1 item full row
//		2 = only left option
//
//ComponentToCall: 
//	https://wiki.genexus.com/commwiki/servlet/wiki?17411,Dynamic+Calls+in+Smart+Devices,
SDPProductsListDP
{
	SDPProductData
	{
		Id = !"cookies"
		Title = !"Cookies"	
		&Image.FromImage(sdpressampleproduct1)
		Image = &Image
		Subtitle = !"Special organic cookies"	
		Information1 = !"$12.00"
		Information2 = !"$15.00"
		ComponentToCall =  !"sd:MyProductsProductDetail?cookies"
	}
	SDPProductData
	{	
		Id = !"ricesoup"
		Title = !"Rice Soup"		
		&Image.FromImage(sdpressampleproduct2)
		Image = &Image
		Subtitle = !"Rice soup infusion"
		Information1 = !"$19.99"
		Information2 = !"$25.00"
		ComponentToCall =  !"sd:MyProductsProductDetail?ricesoup"
	}
	SDPProductData
	{
		Id = !"makeup"
		Title = !"Makeup"	
		&Image.FromImage(sdpressampleproduct3)
		Image = &Image
		Subtitle = !"Beautiful makeup-set with 10 pieces"
		Information1 = !"$9.99"
		Information2 = !"$15.00"
		ComponentToCall =  !"sd:MyProductsProductDetail?makeup"
	}
	SDPProductData
	{		
		Id = !"men"
		Title = !"Men's clothing"
		&Image.FromImage(sdpressampleproduct4)
		Image = &Image
		Subtitle = !"New collection of men's clothing"	
		Information1 = !"$19.99"
		Information2 = !"$25.00"
		ComponentToCall =  !"sd:MyProductsProductDetail?men"
	}
	SDPProductData
	{
		Id = !"baby"
		Title = !"Baby products"
		&Image.FromImage(sdpressampleproduct6)
		Image = &Image
		Subtitle = !"Bag full of baby products for the newborn"
		Information1 = !"$21.00"
		Information2 = !"$30.00"
		ComponentToCall =  !"sd:MyProductsProductDetail?baby"
		
	}
	SDPProductData
	{	
		Id = !"bag"
		Title = !"Fashion bag"
		&Image.FromImage(sdpressampleproduct7)
		Image = &Image
		Subtitle = !"Bag from the lates fashion collection"
		Information1 = !"$19.99"
		Information2 = !"$25.00"
		ComponentToCall =  !"sd:MyProductsProductDetail?bag"
	}
}
```

