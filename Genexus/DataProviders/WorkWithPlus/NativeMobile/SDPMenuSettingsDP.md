# DataProvider: SDPMenuSettingsDP

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPMenu Settings DP
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
		Title = !"Stores and employees"
		&Image.FromImage(SDPResSampleOption1)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?1"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 2
		Title = !"Permissions"
		&Image.FromImage(SDPResSampleOption2)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?2"
		Type = WorkWithPlus.NativeMobile.SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 3
		Type = SDPMenuOptionType.ItemSeparator
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 4
		Title = !"System config"
		&Image.FromImage(SDPResSampleOption3)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 5
		Title = !"Print settings"		
		&Image.FromImage(SDPResSampleOption4)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?4"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 6
		Type = SDPMenuOptionType.ItemSeparator
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 7
		Title = !"Scanner settings"
		&Image.FromImage(SDPResSampleOption5)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?5"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 8
		Title = !"Support us"
		&Image.FromImage(SDPResSampleOption6)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?6"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 9
		Type = SDPMenuOptionType.ItemSeparator
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 10
		Title = !"Recommend"
		&Image.FromImage(SDPResSampleOption7)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?7"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 11
		Title = !"Feedback"
		&Image.FromImage(SDPResSampleOption8)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?8"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 12
		Title = !"About"
		&Image.FromImage(SDPResSampleOption9)
		Icon = &Image
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?9"
		Type = SDPMenuOptionType.Item
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 13
		Type = SDPMenuOptionType.ItemSeparator
	}
	SDPMenuOptionsItem
	{
		OrderIndex = 14
		Title = !"Sign out"		
		ComponentToCall = !"sub:Logout"
		Type = WorkWithPlus.NativeMobile.SDPMenuOptionType.Link
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

