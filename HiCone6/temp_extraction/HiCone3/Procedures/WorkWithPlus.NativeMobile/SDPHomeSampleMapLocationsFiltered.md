# Procedure: SDPHomeSampleMapLocationsFiltered

- **Module:** WorkWithPlus.NativeMobile
- **Description:** SDPHome Sample Map Locations Filtered
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CityRegion | Parameter | NUMERIC | in | City Region |
| LocationItem | Variable | GX_SDT |  | Location Item |
| LocationsList | Parameter | GX_SDT | out | Locations List |
| PricePerClass | Parameter | Boolean | in | Price Per Class |
| PricePerMonth | Parameter | Boolean | in | Price Per Month |
| TimeFrom | Parameter | DATETIME | in | Time From |
| TimeTo | Parameter | DATETIME | in | Time To |
| LocationsListAux | Variable | GX_SDT |  | Locations List Aux |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus
//Get Locations and filter

&LocationsListAux = NativeMobile.SDPHomeSampleMapLocations()

For &LocationItem in &LocationsListAux
	If &CityRegion < 2 OR &LocationItem.Id > 3
		&LocationsList.Add(&LocationItem)
	EndIf
EndFor
```

### Rules (Rules)

```genexus
Parm(in:&CityRegion, in:&TimeFrom, in:&TimeTo, in:&PricePerClass, in:&PricePerMonth, out:&LocationsList);
```

