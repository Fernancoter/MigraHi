# DataProvider: HICONESDHomeBannerDP

- **Module:** Root
- **Description:** SDPHome Banner DP
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
		&Image.FromImage(sdpresbannersample1)
		Icon = &Image
		ComponentToCall = !""
	}
	SDPMenuOptionsItem
	{
		&Image.FromImage(sdpresbannersample2)
		Icon = &Image
		ComponentToCall = !""
	}
	SDPMenuOptionsItem
	{
		&Image.FromImage(sdpresbannersample3)
		Icon = &Image
		//Add ComponentToCall to allow banner tap
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
	}
	SDPMenuOptionsItem
	{
		&Image.FromImage(sdpresbannersample4)
		Icon = &Image
		//Add ComponentToCall to allow banner tap
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
	}
}
```

