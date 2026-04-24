# DataProvider: SDPUserInformationSampleDP

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPUser Information Sample DP
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| SDPMenuOptions | Variable | GX_SDT |  | SDPMenu Options |
| Image | Variable | BITMAP |  | Image |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
SDPMenuOptions
{
	SDPMenuOptionsItem
	{
		Title = "Product management"
		&Image.FromImage(SDPResUserProduct)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?1"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		Title = "Warehouse management"
		&Image.FromImage(SDPResUserWarehouse)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?2"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		Title = "Logistics management"
		&Image.FromImage(SDPResUserLogistics)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		Title = ""				
		ComponentToCall = !""
		Type = SDPMenuOptionType.ItemSeparator
	}
	SDPMenuOptionsItem
	{
		Title = "Customer management"
		&Image.FromImage(SDPResUserCustomer)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?4"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		Title = "Supplier management"
		&Image.FromImage(SDPResUserSupplier)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?5"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		Title = "Account management"
		&Image.FromImage(SDPResUserAccount)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?6"
		Type = SDPMenuOptionType.Item
	}
}
```

