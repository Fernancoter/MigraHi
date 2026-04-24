# DataProvider: SDPHomeCarouselOptionsDP

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPHome Carousel Options DP
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
		&Image.FromImage(sdpressampleactivity1)
		Icon = &Image
		Title = !"Run"
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
	}
	SDPMenuOptionsItem
	{
		&Image.FromImage(sdpressampleactivity2)
		Icon = &Image
		Title = !"Pose"
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
	}
	SDPMenuOptionsItem
	{
		&Image.FromImage(sdpressampleactivity3)
		Icon = &Image
		Title = !"Photo"
		//Add ComponentToCall to allow banner tap
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
	}
	SDPMenuOptionsItem
	{
		&Image.FromImage(sdpressampleproduct6)
		Icon = &Image
		Title = !"Play"
		//Add ComponentToCall to allow banner tap
		ComponentToCall = !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
	}
	SDPMenuOptionsItem
	{		
		Title = !"More"
		Id = !"more"		
	}
}
```

