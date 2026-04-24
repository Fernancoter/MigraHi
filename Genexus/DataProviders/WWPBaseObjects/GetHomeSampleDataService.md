# DataProvider: GetHomeSampleDataService

- **Module:** WWPBaseObjects
- **Description:** Get Home Sample Data Service
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| HomeSampleData | Variable | GX_SDT |  | Home Sample Data |
| HomeSampleDataItem | Variable | GX_SDT |  | Home Sample Data Item |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
HomeSampleData
{
  &HomeSampleData = GetHomeSampleData()
	HomeSampleDataItem Input &HomeSampleDataItem in &HomeSampleData
	{
		ProductName = &HomeSampleDataItem.ProductName
		ProductPrice = &HomeSampleDataItem.ProductPrice
		ProductVolume = &HomeSampleDataItem.ProductVolume
		ProductWeight = &HomeSampleDataItem.ProductWeight
		ProductDiscount = &HomeSampleDataItem.ProductDiscount
		ProductStatus = &HomeSampleDataItem.ProductStatus
	}
}
```

