# DataProvider: SDPHomeSampleMapLocations

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPHome Sample Map Locations
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
SDPHomeSampleMapLocations
{
	SDPMapLocationData
	{
		Id = 1
		Title = !"Music"
		Description = !"Music school"		
		&Image.FromImage(sdpressampleproduct1)
		Image = &Image
		//&Image.FromImage(SDPResMapPin)
		&Image.FromImage(sdpressampleproduct7)
		PinImage = &Image
		Location = !"-34.878997, -56.085912"
		InfoField1 = !"$ 4.99 per class"
	}
	SDPMapLocationData
	{
		Id = 2
		Title = !"Dance"
		Description = !"Modern dance school"		
		&Image.FromImage(sdpressampleproduct2)
		Image = &Image
		&Image.FromImage(sdpressampleproduct7)
		PinImage = &Image
		Location = !"-34.881248, -56.068440"
		InfoField1 = !"$ 100 per month"
	}
	SDPMapLocationData
	{
		Id = 3
		Title = !"Makeup"
		Description = !"Modern makeup school"
		&Image.FromImage(sdpressampleproduct3)
		Image = &Image
		&Image.FromImage(sdpressampleproduct3)
		PinImage = &Image
		Location = !"-34.883343, -56.084748"
		InfoField1 = !"$ 49.9 per month"
	}
	SDPMapLocationData
	{
		Id = 4
		Title = !"Driving"
		Description = !"Stunts driver school"
		&Image.FromImage(sdpressampleproduct4)
		Image = &Image
		//&Image.FromImage(SDPResMapPin)
		&Image.FromImage(sdpressampleproduct8)
		PinImage = &Image
		Location = !"-34.880055, -56.078902"
		InfoField1 = !"$ 4.99 per class"
	}
	SDPMapLocationData
	{
		Id = 5
		Title = !"Football"
		Description = !"Football school"
		&Image.FromImage(sdpressampleproduct5)
		Image = &Image
		&Image.FromImage(sdpressampleproduct7)
		PinImage = &Image
		Location = !"-34.880777, -56.088051"
		InfoField1 = !"$ 4.99 per class"
	}
	SDPMapLocationData
	{
		Id = 6
		Title = !"History"
		Description = !"History teachers"
		&Image.FromImage(sdpressampleproduct6)
		Image = &Image
		&Image.FromImage(sdpressampleproduct8)
		PinImage = &Image
		Location = !"-34.895053, -56.085141"
		InfoField1 = !"$ 4.99 per class"
	}
}
```

