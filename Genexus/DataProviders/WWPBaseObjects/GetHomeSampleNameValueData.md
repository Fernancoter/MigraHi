# DataProvider: GetHomeSampleNameValueData

- **Module:** WWPBaseObjects
- **Description:** Get Home Sample Name Value Data
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
HomeSampleNameValueData
{
&HomeSampleData = GetHomeSampleData()
HomeSampleNameValueDataItem  [Count=6] Input &HomeSampleDataItem in &HomeSampleData
{
	Name = &HomeSampleDataItem.ProductName
	Value = &HomeSampleDataItem.ProductPrice
}
}
```

