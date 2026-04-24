# DataProvider: SDPCategoryListDP

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPCategory List DP
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
SDPMultiColumnOptions
{
	SDPMultiColumnOptionsItem
	{
		Column1 
		{
			TitleInfo = !"Common"
		}
	}
	SDPMultiColumnOptionsItem
	{	
		Column2
		{
			TitleInfo = !"Food"
			&Image.FromImage(sdpressampleproduct1)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?1"
		}
		Column3
		{
			TitleInfo = !"Men's festival"
			&Image.FromImage(sdpressampleproduct4)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?2"
		}
		Column4
		{
			TitleInfo = !"Women day"
			&Image.FromImage(sdpressampleproduct5)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?3"
		}		
	}
	SDPMultiColumnOptionsItem
	{
		Column1 
		{
			TitleInfo = !"Top"
		}
	}
	SDPMultiColumnOptionsItem
	{
		Column2
		{
			TitleInfo = !"Makup"
			&Image.FromImage(sdpressampleproduct3)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?4"
		}
		Column3
		{
			TitleInfo = !"Daily Products"
			&Image.FromImage(sdpressampleproduct10)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?5"
		}
		Column4
		{
			TitleInfo = !"Furniture"
			&Image.FromImage(sdpressampleproduct9)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?6"
		}		
	}
	SDPMultiColumnOptionsItem
	{
		Column2
		{
			TitleInfo = !"Baby products"
			&Image.FromImage(sdpressampleproduct6)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?7"
		}
		Column3
		{
			TitleInfo = !"Women's bags"
			&Image.FromImage(sdpressampleproduct7)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?7"
		}
		Column4
		{
			TitleInfo = !"Men's bags"
			&Image.FromImage(sdpressampleproduct8)
			Image = &Image
			ComponentToCall =  !"sd:WorkWithPlus.NativeMobile.SDPSampleOptionScreen?8"
		}		
	}
}
```

