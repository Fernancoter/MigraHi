# DataProvider: GetHomeSampleData

- **Module:** WWPBaseObjects
- **Description:** Get Home Sample Data
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |

## Business Logic

### Source (Source)

```genexus
HomeSampleData
{

ProductName = "Beer"
ProductPrice = 1200
ProductVolume = 2000
ProductWeight = 400
ProductDiscount = 10
ProductStatus = HomeSampleDataStatus.Available
}

HomeSampleData
{

ProductName = "Wine"
ProductPrice = 890
ProductVolume = 100
ProductWeight = 3000
ProductDiscount = 12
ProductStatus = HomeSampleDataStatus.Missing
}

HomeSampleData
{

ProductName = "Lollipop"
ProductPrice = 200
ProductVolume = 3098
ProductWeight = 250
ProductDiscount = 20
ProductStatus = HomeSampleDataStatus.Soon
}

HomeSampleData
{

ProductName = "Apple"
ProductPrice = 48
ProductVolume = 879
ProductWeight = 235
ProductDiscount = 42
ProductStatus = HomeSampleDataStatus.Available
}

HomeSampleData
{

ProductName = "Cherries"
ProductPrice = 232
ProductVolume = 6788
ProductWeight = 213
ProductDiscount = 34
ProductStatus = HomeSampleDataStatus.Ordered
}

HomeSampleData
{

ProductName = "Steak"
ProductPrice = 345
ProductVolume = 370
ProductWeight = 230
ProductDiscount = 0
ProductStatus = HomeSampleDataStatus.Available
}

HomeSampleData
{

ProductName = "Cupcake"
ProductPrice = 340
ProductVolume = 1200
ProductWeight = 230
ProductDiscount = 10
ProductStatus = HomeSampleDataStatus.Ordered
}

HomeSampleData
{

ProductName = "Strawberry"
ProductPrice = 120
ProductVolume = 600
ProductWeight = 239
ProductDiscount = 10
ProductStatus = HomeSampleDataStatus.Available
}

HomeSampleData
{

ProductName = "Ice cream"
ProductPrice = 70
ProductVolume = 1200
ProductWeight = 120
ProductDiscount = 8
ProductStatus = HomeSampleDataStatus.Missing
}

HomeSampleData
{

ProductName = "Frapuccino"
ProductPrice = 670
ProductVolume = 124
ProductWeight = 489
ProductDiscount = 5
ProductStatus = HomeSampleDataStatus.Available
}

HomeSampleData
{

ProductName = "Candy"
ProductPrice = 1200
ProductVolume = 2000
ProductWeight = 400
ProductDiscount = 10
ProductStatus = HomeSampleDataStatus.Available
}

HomeSampleData
{

ProductName = "Pizza"
ProductPrice = 3400
ProductVolume = 120
ProductWeight = 320
ProductDiscount = 8
ProductStatus = HomeSampleDataStatus.Ordered
}
```

