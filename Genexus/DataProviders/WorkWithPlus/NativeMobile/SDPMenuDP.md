# DataProvider: SDPMenuDP

- **Module:** WorkWithPlus.NativeMobile
- **Description:** Menu Data Provider
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
		OrderIndex = 1
		Title = "Home"		
		&Image.FromImage(SDPResSampleOption1)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?1"
		Type = SDPMenuOptionType.ItemSeparator
		BadgeCount = 1
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 2
		Title = "Account balance"		
		&Image.FromImage(SDPResSampleOption2)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?2"
		Type = SDPMenuOptionType.Item
		Information = !"$ 1.000"
		BadgeCount = 3
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 3
		Title = "Settings"
		&Image.FromImage(SDPResSampleOption3)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
		Type = WorkWithPlus.NativeMobile.SDPMenuOptionType.Item		
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 4
		Title = "Credit"		
		&Image.FromImage(SDPResSampleOption4)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?4"
		Type = SDPMenuOptionType.Item
		Information = !"$ 990"
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 5
		Title = "Share"
		&Image.FromImage(SDPResSampleOption5)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?5"
		Type = WorkWithPlus.NativeMobile.SDPMenuOptionType.ItemSeparator
		BadgeCount = 5
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 6
		Title = "Web site"
		&Image.FromImage(SDPResSampleOption1)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?6"
		Type = SDPMenuOptionType.Link
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 7
		Title = "Twitter"
		&Image.FromImage(SDPResSampleOption1)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?7"
		Type = SDPMenuOptionType.Link
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 8
		Title = "Other"
		&Image.FromImage(SDPResSampleOption1)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?8"
		Type = SDPMenuOptionType.Link
	}
	//SDPMenuOptionsItem
	//{
	//	Title = !"SAMPLE WW"	
	//	&Image.FromImage(ProductCustomIcon)
	//	Icon = &Image
	//	ComponentToCall = !"sd:WorkWithDevicesProducto.Producto.List?4"
	//}
	// For more options:
	// https://wiki.genexus.com/commwiki/servlet/wiki?17411,Dynamic+Calls+in+Smart+Devices,
}
```

